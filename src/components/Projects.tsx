import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/resume";
import { useTilt } from "../hooks/useTilt";
import SectionHeader from "./SectionHeader";
import styles from "./Projects.module.css";

function ProjectCard({ proj, index, onOpen }: { proj: typeof projects[0]; index: number; onOpen: () => void }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(10);

  return (
    <motion.div
      ref={ref}
      className={styles.card}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ transition: "transform 0.1s ease, border-color 0.3s", willChange: "transform" }}
      onClick={onOpen}
    >
      <div className={styles.glow} style={{ background: `radial-gradient(circle at 50% 0%, ${proj.color}22, transparent 70%)` }} />
      <div className={styles.iconWrap} style={{ background: `${proj.color}18`, border: `1px solid ${proj.color}33` }}>
        <span className={styles.icon}>{proj.icon}</span>
      </div>
      <h3 className={styles.title}>{proj.title}</h3>
      <p className={styles.desc}>{proj.description}</p>
      <div className={styles.tags}>
        {proj.tags.map((t) => (
          <span key={t} className={styles.tag} style={{ color: proj.color, borderColor: `${proj.color}33`, background: `${proj.color}0d` }}>
            {t}
          </span>
        ))}
      </div>
      <div className={styles.more} style={{ color: proj.color }}>
        View details →
      </div>
    </motion.div>
  );
}

function Modal({ proj, onClose }: { proj: typeof projects[0]; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
          style={{ borderColor: `${proj.color}44` }}
        >
          <button className={styles.close} onClick={onClose} aria-label="Close">✕</button>
          <div className={styles.modalIcon} style={{ background: `${proj.color}18`, border: `1px solid ${proj.color}33` }}>
            {proj.icon}
          </div>
          <h2 className={styles.modalTitle} style={{ color: proj.color }}>{proj.title}</h2>
          <p className={styles.modalDetail}>{proj.detail}</p>
          <div className={styles.tags} style={{ marginTop: "1.5rem" }}>
            {proj.tags.map((t) => (
              <span key={t} className={styles.tag} style={{ color: proj.color, borderColor: `${proj.color}44`, background: `${proj.color}12` }}>
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<typeof projects[0] | null>(null);

  return (
    <section id="projects" className="section">
      <SectionHeader
        tag="// 05. projects"
        title="Things I've"
        accent="Built"
        subtitle="Production-grade infrastructure and platform engineering projects."
      />

      <div className={styles.grid}>
        {projects.map((proj, i) => (
          <ProjectCard key={proj.title} proj={proj} index={i} onOpen={() => setSelected(proj)} />
        ))}
      </div>

      <AnimatePresence>
        {selected && <Modal proj={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
