import { Cormorant_Garamond, Libre_Baskerville, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const libre = Libre_Baskerville({
  subsets: ["latin"],
  variable: "--font-libre",
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["400", "500", "700"],
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
});

export const metadata = {
  title: "Audio Planet | Premium Hi-Fi Audio & Acoustic Consulting",
  description: "Bangalore's premier audio consultancy since 1999. Specializing in bespoke home theater systems, acoustic room design, and premium Hi-Fi calibration.",
  keywords: ["Audio Planet", "Hi-Fi Audio Bangalore", "Home Theater Bangalore", "Acoustic Design Bangalore", "Audio Consultants"],
  authors: [{ name: "Audio Planet Team" }],
  openGraph: {
    title: "Audio Planet | Premium Hi-Fi Audio & Acoustic Consulting",
    description: "Bangalore's premier audio consultancy since 1999. Specializing in bespoke home theater systems, acoustic room design, and premium Hi-Fi calibration.",
    type: "website",
    locale: "en_IN",
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${libre.variable} ${dmSans.variable} ${spaceMono.variable}`}>
      <body className="antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
