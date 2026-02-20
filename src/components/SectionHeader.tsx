import { motion } from "framer-motion";
import styles from "./SectionHeader.module.css";

interface Props {
  tag: string;
  title: string;
  accent: string;
  subtitle?: string;
}

export default function SectionHeader({ tag, title, accent, subtitle }: Props) {
  return (
    <motion.div
      className={styles.wrap}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.tag}>{tag}</div>
      <h2 className={styles.title}>
        {title} <span className={styles.accent}>{accent}</span>
      </h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      <div className={styles.line} />
    </motion.div>
  );
}
