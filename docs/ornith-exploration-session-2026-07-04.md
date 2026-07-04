# Ornith 1.0 Exploration — Session Summary (2026-07-04)

Session goal: explore the **Ornith 1.0 local LLM** (ornith.site), review the
existing product codebase, and identify the **new features Ornith introduced
that can become the competitive edge** of a locally-run coding assistant
built on it.

---

## 1. What was done in this session

1. **Attempted a direct crawl of https://ornith.site/** — blocked by this
   remote environment's network policy (the proxy returns `403` on CONNECT
   to ornith.site, deep-reinforce.com, huggingface.co, simonwillison.net).
   Pivoted to web search, which is allowed, and reconstructed the site's
   content from indexed sources (ornith.site pages, the DeepReinforce blog,
   HuggingFace model cards, the official Ollama library entry, Simon
   Willison's review, MarkTechPost).
2. **Located and cloned the product repo.** The requested
   `priyansh19/ornith-1.0-chat` does not exist; the actual repo is
   **`priyansh19/Ornith-1.0-Code`** ("Ornith-native local coding assistant —
   Next.js/Electron desktop UI for the self-scaffolding ornith:9b model").
   It was added to the session and cloned to `/workspace/ornith-1.0-code`
   (HEAD `3c9348e`).
3. **Reviewed the codebase and its history**: `README.md`,
   `previous_plan.md` (the distilled record of the monorepo era and the
   Ornith-native pivot), and the live integration layer
   (`components/lmchat/liveBackend.ts`, `components/lmchat/ollama.ts`).
4. **Compiled the feature-edge analysis** below, mapping each new Ornith
   capability onto the app's current state and known gaps.

---

## 2. What Ornith 1.0 is

- Open-weights (MIT) model family for **agentic coding**, released
  ~2026-06-25 by **DeepReinforce** — their first model release.
- Family: **9B dense, 31B dense, 35B MoE, 397B MoE (FP8 available)**.
- Every checkpoint exposes the **same OpenAI-compatible interface** and a
  **256K (262,144-token) context window**.
- Headline results: Ornith-1.0-397B scores **77.5 on Terminal-Bench 2.1**
  and **82.4 on SWE-Bench Verified** (reported as surpassing Claude
  Opus 4.7); the 35B MoE scores **64.2 on Terminal-Bench 2.1**, beating
  Qwen 3.5-397B (53.5) at a fraction of the parameters. Also evaluated on
  NL2Repo and OpenClaw/ClawEval.
- Runs locally via **Ollama** (official library: `ollama run ornith` →
  `ornith:9b`, 5.6 GB; `ornith:35b`, 21 GB), **LM Studio** (GGUF), and
  **vLLM**.

### The core innovation: self-scaffolding

Ornith treats the *scaffold* — task plan, tool orchestration, retry and
re-planning policy — as a **learnable object**. Each RL step runs in two
stages: the model first reads the task plus its previous scaffold and
proposes a refined scaffold, then generates the solution rollout using it;
reward flows back to **both** stages (pipeline RL with staleness-weighted
GRPO). The model therefore authors its own orchestration instead of relying
on a human-designed harness — which is why thin native loops outperform
external plan→execute→critic frameworks around it.

### Serving/runtime features introduced with the release

| Feature | Detail |
| --- | --- |
| Native reasoning channel | Turns open with `<think>…</think>`; official recipes parse it into a separate `reasoning_content` field |
| Native tool calls | `<tool_call>` blocks surfaced as OpenAI-style `tool_calls`; vLLM recipe: `--enable-auto-tool-choice --tool-call-parser qwen3_xml --reasoning-parser qwen3` |
| 256K context | `--max-model-len 262144` in the official vLLM recipe |
| Prefix caching | `--enable-prefix-caching` recommended — faster multi-turn agent loops |
| Recommended sampling | `temperature=0.6, top_p=0.95, top_k=20` for real use (1.0 only to reproduce benchmarks) |
| Licensing/access | MIT, no API keys, no regional limitations — fully private local operation |

---

## 3. Current state of the product (`priyansh19/Ornith-1.0-Code`)

A local-first, Ornith-native coding assistant: **Next.js UI wrapped in
Electron**, talking to a FastAPI agent backend (`:8000`, lives in the
`Mach-2-Agent-Harness` repo) over SSE, and to Ollama (`:11434`) directly for
model lifecycle management.

Key facts from the review:

- **Already pivoted Ornith-native.** The app went through a multi-harness
  era (11 orchestration modules) and then deleted the harness concept
  entirely after measuring that Ornith's thin native loop was **3.5× faster
  than the best orchestrated harness on an identical task (98.8s vs
  343.5s)** — external orchestration was fighting the model's
  self-scaffolding training. `harness: "ornith"` survives only as an
  invisible backend-contract field in `liveBackend.ts`.
- Live SSE chat (`thought` / `tool_result` / `span` / `error` / `done`),
  consolidated "Thought for Ns" trace bullets with real durations, real
  unified diffs for file-writing tools, live run timer, honest context
  meter, real Ollama model management (swap which weights are resident,
  observed load phases, no fake progress bars).
- Backend currently runs `num_ctx=32768` with a format-slip guard — both
  added when Ollama's small default context silently truncated prompts and
  collapsed the tool-call format.
- **Known gaps at split time**: approval gating (UI done, backend never
  pauses); picked working folder not threaded into backend tools; pulling
  models from the Ollama registry not wired; stale e2e specs predating the
  harness-free rebuild.

---

## 4. Findings — Ornith features to use as the product's edge

Ranked by edge-per-effort:

1. **Structured reasoning + tool-call parsing** (hardening). Consume the
   official reasoning/tool parsers instead of scraping `<think>` tags —
   makes the thinking trace robust and eliminates the format-slip failure
   class the guard exists for.
2. **Raise context toward 256K.** `num_ctx=32768` was defensive; the model
   supports 8×. Scale per available RAM and point the (already honest)
   context meter at the real ceiling. Unlocks whole-repo tasks and long
   runs; directly shrinks truncation-induced format collapse.
3. **Scaffold/Plan view — the genuinely novel feature.** Render the plan /
   retry / re-plan structure the model authors itself each run as a
   first-class UI tab (natural successor to the deleted Graph tab). No
   other local chat UI surfaces the model's self-built harness live.
4. **Official Ollama library + model tiers.** Close the "pull models" gap
   now that a canonical `ornith` tag exists, and ship a **9B fast / 35B
   deep** two-tier mode on top of the existing one-resident-at-a-time swap
   machinery.
5. **Approval gating at the native tool-call boundary.** The UI is done;
   Ornith's clean OpenAI-style tool calls give the backend a natural
   interception point to pause before destructive-badged tools.
6. **Positioning.** Same OpenAI-compatible API at every model size + MIT +
   fully offline = "frontier-adjacent agentic coding (82.4 SWE-Bench
   Verified at flagship scale) with zero cloud dependency, on your own
   hardware, your code never leaves the machine."
7. **Pin the official sampling recipe** (`temp 0.6 / top_p 0.95 / top_k
   20`) backend-side for reproducible runs, with a Settings override.

Note: items 1, 2 and most of 5 live in the **`Mach-2-Agent-Harness`**
backend repo rather than the UI repo.

---

## 5. Constraints & corrections logged this session

- `ornith.site` (and most external sites) are unreachable from this remote
  environment — network policy blocks the proxy CONNECT; only web search
  works. All Ornith facts above are from indexed/search sources.
- Repo-name correction: `ornith-1.0-chat` → **`Ornith-1.0-Code`**.
- No code changes were made this session; it was exploration + analysis.
  This document is the deliverable.

## 6. Sources

- https://ornith.site/ · https://ornith.site/how-to-run/ · https://ornith.site/benchmarks/
- https://deep-reinforce.com/ornith_1_0.html
- https://simonwillison.net/2026/Jun/29/ornith/
- https://huggingface.co/deepreinforce-ai/Ornith-1.0-9B (+ 9B-GGUF, 35B, 35B-GGUF, 397B, 397B-FP8)
- https://github.com/deepreinforce-ai/Ornith-1
- https://ollama.com/library/ornith
- https://www.marktechpost.com/2026/06/25/deepreinforce-releases-ornith-1-0-an-open-source-coding-model-family-that-learns-its-own-rl-scaffolds/
- https://codersera.com/blog/how-to-run-ornith-1-0-locally-2026/
