import type { Metadata, Viewport } from "next";
import { Press_Start_2P, VT323, DM_Sans } from "next/font/google";
import { palette } from "@/lib/palette";
import "./globals.css";

// Pixel face for titles and labels.
const pixel = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pixel",
  display: "swap",
});

// Terminal face for interface text.
const term = VT323({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-term",
  display: "swap",
});

// Readable face for long paragraphs.
const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
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

export const viewport: Viewport = {
  themeColor: palette.night900,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixel.variable} ${term.variable} ${body.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
