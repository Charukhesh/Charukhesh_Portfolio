import type { Metadata } from "next";
import { profile } from "@/data/profile";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Charukhesh B R",
  alternateName: ["Charukhesh", "Charukhesh Balaji Rakesh"],
  url: "https://charukhesh.github.io/Charukhesh_Portfolio/",
  jobTitle: "AI/ML Research Engineer",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Indian Institute of Technology Madras",
    alternateName: "IIT Madras",
  },
  sameAs: [
    profile.links.github,
    profile.links.linkedin,
    profile.links.researchGate,
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Charukhesh B R | AI/ML Research Engineer",
    template: "%s | Charukhesh B R",
  },
  description:
    "Charukhesh B R — AI/ML Research Engineer at IIT Madras working on robotics, machine learning, autonomous systems, and intelligent control.",
  metadataBase: new URL(
    "https://charukhesh.github.io/Charukhesh_Portfolio/"
  ),
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Charukhesh B R | AI/ML Research Engineer",
    description:
      "AI/ML Research Engineer at IIT Madras working on robotics, machine learning, autonomous systems, and intelligent control.",
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
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema),
          }}
        />

        {children}
      </body>
    </html>
  );
}