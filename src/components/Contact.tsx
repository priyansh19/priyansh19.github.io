import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiMapPin } from "react-icons/fi";
import { personal } from "../data/resume";
import SectionHeader from "./SectionHeader";
import styles from "./Contact.module.css";

const links = [
  { icon: <FiMail />, label: "Email", value: personal.email, href: `mailto:${personal.email}`, color: "var(--indigo)" },
  { icon: <FiPhone />, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}`, color: "var(--emerald)" },
  { icon: <FiGithub />, label: "GitHub", value: "github.com/priyansh19", href: personal.github, color: "var(--text)" },
  { icon: <FiLinkedin />, label: "LinkedIn", value: "priyansh-gupta", href: personal.linkedin, color: "#0a66c2" },
  { icon: <FiMapPin />, label: "Location", value: personal.location, href: "#", color: "var(--amber)" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="section">
      <SectionHeader
        tag="// 08. contact"
        title="Let's"
        accent="Connect"
        subtitle="Open to DevOps consulting, freelance projects, and full-time opportunities."
      />

      <div className={styles.grid}>
        {/* Contact links */}
        <motion.div
          className={styles.linksCol}
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65 }}
        >
          <p className={styles.intro}>
            I'm always happy to chat about DevOps challenges, cloud architecture, or
            new opportunities. Drop me a message or reach out directly.
          </p>

          <div className={styles.links}>
            {links.map((l) => (
              <motion.a
                key={l.label}
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={styles.link}
                whileHover={{ x: 6, borderColor: l.color }}
                transition={{ duration: 0.2 }}
              >
                <span className={styles.linkIcon} style={{ color: l.color, background: `${l.color}18` }}>
                  {l.icon}
                </span>
                <div>
                  <div className={styles.linkLabel}>{l.label}</div>
                  <div className={styles.linkValue}>{l.value}</div>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Contact form */}
        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          <div className={styles.field}>
            <label htmlFor="name">Name</label>
            <input
              id="name" type="text" placeholder="Your name" required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              id="email" type="email" placeholder="your@email.com" required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="msg">Message</label>
            <textarea
              id="msg" rows={5} placeholder="Tell me about your project..." required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <motion.button
            type="submit"
            className={styles.submit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {sent ? "✓ Message Sent!" : "Send Message"}
          </motion.button>
          {sent && (
            <motion.p
              className={styles.success}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            >
              Thanks! I'll get back to you shortly.
            </motion.p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
