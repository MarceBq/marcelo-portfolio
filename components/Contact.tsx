"use client";

import { useState } from "react";
import Section from "./ui/Section";
import PixelWindow from "./ui/PixelWindow";

const socials = [
  { label: "GitHub", href: "https://github.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:hello@marcelo.dev" },
];

const fieldClass =
  "font-term text-cream placeholder:text-haze bg-night-900 block w-full border-[length:var(--px)] border-dusk-500 px-u3 py-u2 text-xl focus:border-amber";

export default function Contact() {
  const [launched, setLaunched] = useState(false);

  // No backend: the form hands the message to the visitor's mail client.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
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
    <Section
      id="contact"
      index="06 — contact"
      title="Launch a message"
      subtitle="Got a problem to solve? Let's build something."
    >
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-mist text-lg leading-relaxed">
            Based in Lima, open to remote. Whether you&apos;re hiring, collaborating, or just want
            to talk tech — I&apos;d love to hear from you.
          </p>
          <ul className="mt-u6 space-y-u2">
            {socials.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target={label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="px-box font-term text-cream hover:text-amber flex items-center gap-u3 p-u4 text-2xl leading-none"
                >
                  <span className="text-amber" aria-hidden>
                    &gt;
                  </span>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <PixelWindow title="transmit.sh — open channel">
          <form onSubmit={handleSubmit} className="space-y-u4">
            <div>
              <label htmlFor="name" className="label text-mist mb-u2 block">
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                autoComplete="name"
                placeholder="Jane Doe"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="email" className="label text-mist mb-u2 block">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="message" className="label text-mist mb-u2 block">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                placeholder="Describe the mission..."
                className={`${fieldClass} resize-y`}
              />
            </div>

            <button type="submit" className="px-btn !mx-u w-[calc(100%-var(--px)*2)]">
              {launched ? "Launching..." : "Send transmission"}
            </button>

            <p className="font-term text-teal text-center text-xl" role="status">
              {launched && "Opening your mail client — thanks for reaching out!"}
            </p>
          </form>
        </PixelWindow>
      </div>
    </Section>
  );
}
