import type { Metadata } from "next";

import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: {
    default: "Charukhesh B R — AI/ML & Robotics Research",
    template: "%s — Charukhesh B R",
  },
  description:
    "AI/ML and robotics research portfolio — learned control, world models, LLM planning, stochastic systems, and intelligent autonomy.",
  metadataBase: new URL(
    "https://charukhesh.github.io/Charukhesh_Portfolio/"
  ),
  openGraph: {
    title: "Charukhesh B R — AI/ML & Robotics Research",
    description:
      "AI/ML and robotics research portfolio — learned control, world models, LLM planning, stochastic systems, and intelligent autonomy.",
    url: "https://charukhesh.github.io/Charukhesh_Portfolio/",
    siteName: "Charukhesh B R",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg text-ink antialiased">
        {children}
      </body>
    </html>
  );
}