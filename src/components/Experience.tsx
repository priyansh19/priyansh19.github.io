import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { experiences } from "../data/resume";
import SectionHeader from "./SectionHeader";
import styles from "./Experience.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState<number | null>(0);

  // GSAP draws the timeline line on scroll
  useEffect(() => {
    const line = lineRef.current;
    const section = sectionRef.current;
    if (!line || !section) return;

    gsap.fromTo(
      line,
      { scaleY: 0, transformOrigin: "top" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section id="experience" className="section" ref={sectionRef}>
      <SectionHeader
        tag="// 03. experience"
        title="Where I've"
        accent="Made Impact"
        subtitle="Building production infrastructure and leveling up DevOps culture at every stop."
      />

      <div className={styles.timeline}>
        <div ref={lineRef} className={styles.line} />

        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            className={styles.item}
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Timeline dot */}
            <div
              className={`${styles.dot} ${exp.current ? styles.dotCurrent : ""}`}
              style={{ borderColor: exp.color, boxShadow: `0 0 0 3px ${exp.color}22` }}
            >
              <div style={{ background: exp.current ? exp.color : "transparent" }} className={styles.dotInner} />
            </div>

            {/* Card */}
            <motion.div
              className={`${styles.card} ${expanded === i ? styles.cardOpen : ""}`}
              onClick={() => setExpanded(expanded === i ? null : i)}
              whileHover={{ borderColor: exp.color }}
              style={{ "--accent-color": exp.color } as React.CSSProperties}
            >
              <div className={styles.cardHead}>
                <div className={styles.cardLeft}>
                  <div className={styles.period} style={{ color: exp.color }}>
                    {exp.period}
                    {exp.current && <span className={styles.badge}>Current</span>}
                  </div>
                  <div className={styles.role}>{exp.role}</div>
                  <div className={styles.company}>{exp.company}</div>
                  <div className={styles.type}>{exp.type}</div>
                </div>
                <motion.div
                  className={styles.chevron}
                  animate={{ rotate: expanded === i ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.div>
              </div>

              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={styles.details}
                  >
                    <ul>
                      {exp.points.map((p, j) => (
                        <motion.li
                          key={j}
                          initial={{ x: -10, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: j * 0.07 }}
                        >
                          {p}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
