import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { personal } from "../data/resume";
import SectionHeader from "./SectionHeader";
import styles from "./About.module.css";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 25);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About() {
  const avatarRef = useRef<HTMLDivElement>(null);

  // Tilt effect on avatar
  useEffect(() => {
    const el = avatarRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * 16;
      const y = ((e.clientY - top) / height - 0.5) * -16;
      el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    };
    const onLeave = () => { el.style.transform = "perspective(600px) rotateX(0) rotateY(0)"; };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <section id="about" className="section">
      <SectionHeader tag="// 01. about" title="The Person" accent="Behind the Pipeline" />
      <div className={styles.grid}>
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div ref={avatarRef} className={styles.avatarWrap} style={{ transition: "transform 0.1s ease" }}>
            <div className={styles.avatar}>PG</div>
            <div className={styles.ring1} />
            <div className={styles.ring2} />
          </div>
          <div className={styles.location}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            {personal.location}
          </div>
        </motion.div>

        <motion.div
          className={styles.text}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          <p className={styles.bio}>{personal.bio}</p>

          <div className={styles.highlights}>
            {[
              { icon: "🚀", label: "Current Focus", value: "AIOps & Platform Engineering" },
              { icon: "📍", label: "Location", value: personal.location },
              { icon: "📧", label: "Email", value: personal.email },
            ].map((h) => (
              <div key={h.label} className={styles.highlight}>
                <span className={styles.highlightIcon}>{h.icon}</span>
                <div>
                  <div className={styles.highlightLabel}>{h.label}</div>
                  <div className={styles.highlightValue}>{h.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.counters}>
            {[
              { target: 5, suffix: "+", label: "Years Experience" },
              { target: 3, suffix: "", label: "Cloud Platforms" },
              { target: 6, suffix: "", label: "Certifications" },
              { target: 10, suffix: "+", label: "K8s Clusters" },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                className={styles.counter}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -4, borderColor: "var(--indigo)" }}
              >
                <div className={styles.counterNum}>
                  <Counter target={c.target} suffix={c.suffix} />
                </div>
                <div className={styles.counterLabel}>{c.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
