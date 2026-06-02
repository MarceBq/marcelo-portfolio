"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Rocket } from "lucide-react";
import SectionHeading from "./SectionHeading";

const socials = [
  { label: "GitHub", href: "https://github.com", icon: Github },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { label: "Email", href: "mailto:hello@marcelo.dev", icon: Mail },
];

export default function Contact() {
  const [launched, setLaunched] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !email || !message) return;

    setLaunched(true);
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    setTimeout(() => {
      window.location.href = `mailto:hello@marcelo.dev?subject=${subject}&body=${body}`;
    }, 600);
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 px-5 max-w-6xl mx-auto">
      <SectionHeading
        index="06 — contact"
        title="Launch a message"
        subtitle="Got a problem to solve? Let's build something."
      />

      <div className="grid lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-stellar-muted text-lg mb-8">
            Based in Lima, open to remote. Whether you&apos;re hiring, collaborating, or just want
            to talk tech — I&apos;d love to hear from you.
          </p>
          <div className="space-y-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={label !== "Email" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 glass-card rounded-lg hover:border-stellar-cyan/30 hover:translate-x-1 transition-all group"
              >
                <Icon size={18} className="text-stellar-cyan group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm text-stellar-muted group-hover:text-stellar-text">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass-card rounded-xl overflow-hidden border border-stellar-cyan/20"
        >
          <div className="px-4 py-3 border-b border-space-border bg-space-void/80 font-mono text-[0.65rem] text-stellar-muted">
            transmit.sh — open channel
          </div>
          <div className="p-6 space-y-5">
            <div>
              <label htmlFor="name" className="font-mono text-[0.65rem] uppercase tracking-wider text-stellar-cyan/80 block mb-2">
                name
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Jane Doe"
                className="w-full bg-space-deep border border-space-border rounded-lg px-4 py-3 font-mono text-sm text-stellar-text placeholder:text-stellar-muted/50 focus:outline-none focus:border-stellar-cyan/50 focus:ring-2 focus:ring-stellar-cyan/10"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-mono text-[0.65rem] uppercase tracking-wider text-stellar-cyan/80 block mb-2">
                email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@company.com"
                className="w-full bg-space-deep border border-space-border rounded-lg px-4 py-3 font-mono text-sm text-stellar-text placeholder:text-stellar-muted/50 focus:outline-none focus:border-stellar-cyan/50 focus:ring-2 focus:ring-stellar-cyan/10"
              />
            </div>
            <div>
              <label htmlFor="message" className="font-mono text-[0.65rem] uppercase tracking-wider text-stellar-cyan/80 block mb-2">
                message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Describe the mission..."
                className="w-full bg-space-deep border border-space-border rounded-lg px-4 py-3 font-mono text-sm text-stellar-text placeholder:text-stellar-muted/50 focus:outline-none focus:border-stellar-cyan/50 focus:ring-2 focus:ring-stellar-cyan/10 resize-y"
              />
            </div>

            <motion.button
              type="submit"
              animate={launched ? { y: -8, opacity: 0.9 } : { y: 0 }}
              className="w-full flex items-center justify-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider py-4 rounded-lg bg-stellar-cyan text-space-deep hover:shadow-glow transition-shadow"
            >
              <Rocket size={16} className={launched ? "animate-bounce" : ""} />
              {launched ? "Launching..." : "Send transmission"}
            </motion.button>

            {launched && (
              <p className="font-mono text-xs text-stellar-cyan text-center" role="status">
                ✓ Opening your mail client — thanks for reaching out!
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}
