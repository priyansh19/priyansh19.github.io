/* ============================================================
   PRIYANSH.AI — CASE FILE INTERACTIONS
   Shared vanilla JS for /projects pages (no CDN dependencies).
   Mirrors the homepage feel: comic cursor, web trail, click
   bursts, scroll reveals, tilt panels, magnetic buttons.
============================================================ */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover:hover) and (pointer:fine)').matches;

/* ---------- scroll progress + HUD ---------- */
const progFill = document.getElementById('progFill');
const hudScroll = document.getElementById('hudScroll');
addEventListener('scroll', () => {
  const h = document.documentElement;
  const p = h.scrollTop / ((h.scrollHeight - h.clientHeight) || 1);
  if (progFill) progFill.style.width = (p * 100) + '%';
  if (hudScroll) hudScroll.textContent = String(Math.round(p * 100)).padStart(3, '0') + '%';
}, { passive: true });

/* ---------- scroll reveals ---------- */
const revealEls = document.querySelectorAll('.reveal,.flip3d');
if (reduceMotion || new URLSearchParams(location.search).has('static')) {
  revealEls.forEach(el => el.classList.add('in'));
} else {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => io.observe(el));
}

/* ---------- animated counters (.num[data-count]) ---------- */
document.querySelectorAll('.num[data-count]').forEach(el => {
  const target = +el.dataset.count;
  const suffix = el.dataset.suffix !== undefined ? el.dataset.suffix : '+';
  el.textContent = target + suffix; // no-JS / final state
  if (reduceMotion) return;
  const io2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      io2.disconnect();
      const t0 = performance.now(), dur = 1800;
      (function step(t) {
        const p = Math.min(1, (t - t0) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    });
  }, { threshold: .4 });
  io2.observe(el);
});

/* ---------- text scramble (.issue-tag[data-scramble]) ---------- */
const CHARS = '!<>-_\\/[]{}—=+*^?#01';
function scrambleText(el) {
  const original = el.textContent;
  let frame = 0; const total = 40;
  const timer = setInterval(() => {
    frame++;
    el.textContent = original.split('').map((ch, i) => {
      if (ch === ' ') return ' ';
      if (i < (frame / total) * original.length) return ch;
      return CHARS[Math.floor(Math.random() * CHARS.length)];
    }).join('');
    if (frame >= total) { el.textContent = original; clearInterval(timer); }
  }, 30);
}
if (!reduceMotion) document.querySelectorAll('[data-scramble]').forEach(scrambleText);

/* ---------- custom cursor ---------- */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const label = document.getElementById('cursorLabel');
if (finePointer && !reduceMotion && dot && ring) {
  let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
  addEventListener('pointermove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    if (label) { label.style.left = mx + 'px'; label.style.top = my + 'px'; }
  });
  (function ringLoop() {
    rx += (mx - rx) * .18; ry += (my - ry) * .18;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(ringLoop);
  })();
  document.querySelectorAll('.hoverable,a,button').forEach(el => {
    el.addEventListener('pointerenter', () => {
      ring.classList.add('hovering');
      if (label && el.dataset.label) { label.textContent = el.dataset.label; label.style.opacity = 1; }
    });
    el.addEventListener('pointerleave', () => { ring.classList.remove('hovering'); if (label) label.style.opacity = 0; });
  });
}

/* ---------- electric web trail ---------- */
const trailC = document.getElementById('webTrail');
if (trailC && finePointer && !reduceMotion) {
  const tx = trailC.getContext('2d');
  function sizeTrail() { trailC.width = innerWidth; trailC.height = innerHeight; }
  sizeTrail(); addEventListener('resize', sizeTrail);
  const trail = [];
  addEventListener('pointermove', e => { trail.unshift({ x: e.clientX, y: e.clientY }); if (trail.length > 26) trail.pop(); });
  (function trailLoop() {
    tx.clearRect(0, 0, trailC.width, trailC.height);
    if (trail.length > 2) {
      for (let i = 1; i < trail.length; i++) {
        const f = 1 - i / trail.length;
        tx.strokeStyle = `rgba(255,46,99,${f * .55})`;
        tx.lineWidth = f * 3;
        tx.beginPath(); tx.moveTo(trail[i - 1].x, trail[i - 1].y); tx.lineTo(trail[i].x, trail[i].y); tx.stroke();
        if (i % 5 === 0) {
          tx.strokeStyle = `rgba(0,229,255,${f * .45})`; tx.lineWidth = 1;
          const dx = trail[i].x - trail[i - 1].x, dy = trail[i].y - trail[i - 1].y, L = Math.hypot(dx, dy) || 1;
          const nx = -dy / L * 7 * f, ny = dx / L * 7 * f;
          tx.beginPath(); tx.moveTo(trail[i].x - nx, trail[i].y - ny); tx.lineTo(trail[i].x + nx, trail[i].y + ny); tx.stroke();
        }
      }
    }
    requestAnimationFrame(trailLoop);
  })();
}

/* ---------- comic click burst + web splat ----------
   Each Avenger page sets window.BURST_WORDS + window.BURST_COLORS
   so clicks shout in that hero's voice. */
const WORDS = window.BURST_WORDS || ['THWIP!', 'BZZT!', 'WHAM!', 'VENOM STRIKE!', 'SHIPPED!'];
const BURST_COLORS = window.BURST_COLORS || ['#FF2E63', '#B537F2'];
function comicBurst(x, y) {
  const el = document.createElement('div');
  el.className = 'burst';
  el.style.left = x + 'px'; el.style.top = y + 'px';
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const col = BURST_COLORS[Math.floor(Math.random() * BURST_COLORS.length)];
  const rim = BURST_COLORS.find(c => c !== col) || '#00E5FF';
  el.innerHTML = `<svg viewBox="0 0 100 100"><polygon points="50,2 58,30 88,12 70,38 98,46 70,56 86,84 56,68 50,98 42,68 14,86 30,56 2,48 30,40 12,12 42,30" fill="${col}" stroke="${rim}" stroke-width="2.5"/></svg><b>${word}</b>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1400);
}
function webSplat(x, y) {
  const el = document.createElement('div');
  el.className = 'websplat';
  el.style.left = x + 'px'; el.style.top = y + 'px';
  let spokes = '', rings = '';
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; spokes += `<line x1="60" y1="60" x2="${60 + Math.cos(a) * 56}" y2="${60 + Math.sin(a) * 56}"/>`; }
  for (let r = 14; r <= 52; r += 13) {
    let d = '';
    for (let i = 0; i <= 10; i++) { const a = i / 10 * Math.PI * 2; d += (i === 0 ? 'M' : 'L') + (60 + Math.cos(a) * r) + ',' + (60 + Math.sin(a) * r); }
    rings += `<path d="${d}Z" fill="none"/>`;
  }
  el.innerHTML = `<svg width="120" height="120" viewBox="0 0 120 120" stroke="#F4F2FF" stroke-width="1.6" opacity=".7">${spokes}${rings}</svg>`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}
if (!reduceMotion) addEventListener('pointerdown', e => { comicBurst(e.clientX, e.clientY); webSplat(e.clientX, e.clientY); });

/* ---------- 3D tilt panels ([data-tilt]) ---------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty('--mx', px * 100 + '%'); card.style.setProperty('--my', py * 100 + '%');
      card.style.transition = 'transform .15s ease-out';
      card.style.transform = `perspective(1000px) rotateY(${(px - .5) * 14}deg) rotateX(${(.5 - py) * 14}deg)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transition = 'transform .7s cubic-bezier(.2,1.8,.4,1)';
      card.style.transform = '';
    });
  });
}

/* ---------- magnetic buttons ---------- */
if (finePointer && !reduceMotion) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    let base = null;
    btn.addEventListener('pointerenter', () => { btn.style.transform = ''; base = btn.getBoundingClientRect(); });
    btn.addEventListener('pointermove', e => {
      if (!base) return;
      btn.style.transition = 'transform .18s ease-out';
      btn.style.transform = `translate(${(e.clientX - base.left - base.width / 2) * .3}px,${(e.clientY - base.top - base.height / 2) * .3}px)`;
    });
    btn.addEventListener('pointerleave', () => {
      btn.style.transition = 'transform .6s cubic-bezier(.2,2.4,.4,1)';
      btn.style.transform = '';
      base = null;
    });
  });
}

/* ---------- mobile hamburger menu ---------- */
const burger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
if (burger && mobileMenu) {
  function setMenu(open) {
    burger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-locked', open);
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  burger.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  addEventListener('resize', () => { if (innerWidth > 860) setMenu(false); });
}
