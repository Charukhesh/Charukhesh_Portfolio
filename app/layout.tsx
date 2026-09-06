import type { Metadata } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display"
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono"
});

export const metadata: Metadata = {
  title: "Charukhesh B R — AI/ML Research Engineer",
  description:
    "Charukhesh B R — AI/ML Research Engineer. Robot learning, generative models, stochastic control and state estimation. IIT Madras.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Charukhesh B R — AI/ML Research Engineer",
    description:
      "Research and engineering at the intersection of robotics, machine learning and real-world systems.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-[16.5px] leading-relaxed text-ink antialiased">
        <Loader />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
