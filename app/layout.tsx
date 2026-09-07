import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  metadataBase: new URL("https://charukhesh.github.io/Charukhesh_Portfolio"),
  title: "Charukhesh B R | AI / ML Research Engineer",
  description: "Portfolio of Charukhesh B R, AI/ML Research Engineer at IIT Madras. Specializing in Robotics, Stochastic Control, Generative Models, and Quantitative Systems.",
  keywords: [
    "Charukhesh", 
    "Charukhesh B R", 
    "Charukhesh IIT Madras", 
    "Charukhesh Rakesh",
    "AI Research Engineer", 
    "Machine Learning", 
    "Robotics", 
    "SUAS IITM"
  ],
  openGraph: {
    title: "Charukhesh B R | AI / ML Research Engineer",
    description: "Building intelligent systems at the intersection of robotics, machine learning, and control.",
    url: "https://charukhesh.github.io/Charukhesh_Portfolio/",
    siteName: "Charukhesh B R Portfolio",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg font-sans text-[16.5px] leading-relaxed text-ink antialiased">
        <Loader />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}