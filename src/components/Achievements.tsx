import { motion } from "framer-motion";
import { achievements } from "../data/resume";
import SectionHeader from "./SectionHeader";
import styles from "./Achievements.module.css";

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionHeader
        tag="// 07. achievements"
        title="Notable"
        accent="Milestones"
        subtitle="Highlights from my journey in cloud and DevOps engineering."
      />

      <div className={styles.grid}>
        {achievements.map((a, i) => (
          <motion.div
            key={a.title}
            className={styles.card}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6, borderColor: "var(--indigo)", boxShadow: "0 12px 40px rgba(99,102,241,.12)" }}
          >
            <div className={styles.icon}>{a.icon}</div>
            <div className={styles.title}>{a.title}</div>
            <div className={styles.desc}>{a.desc}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
