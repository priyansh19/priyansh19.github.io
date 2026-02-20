import { motion } from "framer-motion";
import { education, certifications } from "../data/resume";
import SectionHeader from "./SectionHeader";
import styles from "./Education.module.css";

export default function Education() {
  return (
    <section id="education" className="section">
      <SectionHeader
        tag="// 06. education"
        title="Academic"
        accent="Background"
      />

      <div className={styles.grid}>
        {education.map((edu, i) => (
          <motion.div
            key={edu.degree}
            className={styles.card}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ borderColor: "var(--indigo)", y: -4 }}
          >
            <div className={styles.top}>
              <div className={styles.degreeRow}>
                <span className={styles.degree}>{edu.degree}</span>
                {edu.current && <span className={styles.badge}>Pursuing</span>}
              </div>
              <div className={styles.period}>{edu.period}</div>
            </div>
            <div className={styles.field}>{edu.field}</div>
            <div className={styles.school}>{edu.school} — <span>{edu.location}</span></div>
            {edu.gpa && <div className={styles.gpa}>GPA: {edu.gpa}</div>}
            <ul className={styles.highlights}>
              {edu.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <motion.div
        className={styles.certsWrap}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.certsTitle}>// Certifications</div>
        <div className={styles.certs}>
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.code}
              className={styles.cert}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              whileHover={{ y: -4, borderColor: cert.color }}
            >
              <div className={styles.certCode} style={{ color: cert.color, borderColor: `${cert.color}44`, background: `${cert.color}12` }}>
                {cert.code}
              </div>
              <div>
                <div className={styles.certName}>{cert.name}</div>
                <div className={styles.certIssuer}>{cert.issuer}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
