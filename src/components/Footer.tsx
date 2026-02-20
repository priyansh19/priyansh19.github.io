import styles from "./Footer.module.css";
import { personal } from "../data/resume";
import { navItems } from "../data/resume";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.angle}>&lt;</span>PG<span className={styles.angle}>/&gt;</span>
          </div>
          <p>Building resilient cloud infrastructure,<br />one pipeline at a time.</p>
        </div>
        <nav className={styles.nav}>
          <div className={styles.navTitle}>Navigation</div>
          {navItems.map((n) => (
            <a key={n.href} href={n.href}>{n.label}</a>
          ))}
        </nav>
        <div className={styles.contact}>
          <div className={styles.navTitle}>Contact</div>
          <a href={`mailto:${personal.email}`}>{personal.email}</a>
          <a href={`tel:${personal.phone.replace(/\s/g, "")}`}>{personal.phone}</a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} {personal.name}. All rights reserved.</span>
        <span>Built with React · TypeScript · GSAP · Three.js</span>
      </div>
    </footer>
  );
}
