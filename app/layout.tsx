import type { Metadata } from "next";
import { Orbitron, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Marcelo · Full Stack Developer & AI Engineer",
  description:
    "Portfolio of Marcelo — Full Stack Developer and AI Automation Engineer from Lima, Peru. Building real solutions with code, AI, and automation.",
  keywords: [
    "Full Stack Developer",
    "AI Engineer",
    "Python",
    "Next.js",
    "Automation",
    "Lima Peru",
  ],
  authors: [{ name: "Marcelo" }],
  openGraph: {
    title: "Marcelo · Full Stack & AI Engineer",
    description:
      "Building real solutions with code and AI — from Lima to the universe.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcelo · Full Stack & AI Engineer",
    description: "Portfolio — Full Stack Developer & AI Automation Engineer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${dmSans.variable} ${jetbrains.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="custom-cursor min-h-screen">
        {/* Nebula ambient layers */}
        <div className="fixed inset-0 bg-nebula-tl pointer-events-none z-0" aria-hidden />
        <div className="fixed inset-0 bg-nebula-br pointer-events-none z-0" aria-hidden />
        {children}
      </body>
    </html>
  );
}
