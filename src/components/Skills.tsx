import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { topSkills, skillGroups, techStack } from "../data/resume";
import SectionHeader from "./SectionHeader";
import styles from "./Skills.module.css";

function Ring({ name, level, icon, color, delay }: {
  name: string; level: number; icon: string; color: string; delay: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const R = 44, C = 2 * Math.PI * R;

  return (
    <motion.div
      ref={ref}
      className={styles.ring}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      <svg width="110" height="110" viewBox="0 0 110 110">
        <circle cx="55" cy="55" r={R} fill="none" stroke="var(--surface2)" strokeWidth="8" />
        <circle
          cx="55" cy="55" r={R}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={inView ? C * (1 - level / 100) : C}
          style={{ transition: `stroke-dashoffset 1.4s ${delay + 0.1}s cubic-bezier(0.22,1,0.36,1)`, transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
        <text x="55" y="50" textAnchor="middle" dominantBaseline="middle" fontSize="20" fill={color}>{icon}</text>
        <text x="55" y="68" textAnchor="middle" fontSize="11" fontWeight="700" fill="white" fontFamily="JetBrains Mono">{level}%</text>
      </svg>
      <div className={styles.ringName}>{name}</div>
    </motion.div>
  );
}

function Bar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div ref={ref} className={styles.bar}>
      <div className={styles.barMeta}>
        <span>{name}</span>
        <span className={styles.barPct} style={{ color }}>{level}%</span>
      </div>
      <div className={styles.barTrack}>
        <div
          className={styles.barFill}
          style={{
            width: inView ? `${level}%` : "0%",
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            transition: `width 1.2s ${delay}s cubic-bezier(0.22,1,0.36,1)`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <SectionHeader
        tag="// 02. skills"
        title="Technical"
        accent="Expertise"
        subtitle="5+ years hands-on with cloud-native tooling, automation, and container orchestration."
      />

      {/* SVG Rings */}
      <div className={styles.rings}>
        {topSkills.map((s, i) => (
          <Ring key={s.name} {...s} delay={i * 0.08} />
        ))}
      </div>

      {/* Bar groups */}
      <div className={styles.groups}>
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.title}
            className={styles.group}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: gi * 0.1, duration: 0.55 }}
          >
            <div className={styles.groupTitle} style={{ color: group.color }}>
              {group.title}
            </div>
            {group.skills.map((s, si) => (
              <Bar key={s.name} name={s.name} level={s.level} color={group.color} delay={gi * 0.1 + si * 0.08} />
            ))}
          </motion.div>
        ))}
      </div>

      {/* Tech Stack chips */}
      <div className={styles.stackWrap}>
        <div className={styles.stackLabel}>// full toolbox</div>
        <div className={styles.stack}>
          {techStack.map((t, i) => (
            <motion.span
              key={t}
              className={styles.chip}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.025, duration: 0.3 }}
              whileHover={{ y: -3, borderColor: "var(--indigo)", color: "var(--white)" }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
