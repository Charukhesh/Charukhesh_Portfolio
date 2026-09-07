import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";

export const metadata: Metadata = {
  title: "Charukhesh B R | AI/ML Research Engineer",
  description:
    "Charukhesh B R | AI/ML Research Engineer. Robot learning, generative models, stochastic control and state estimation. IIT Madras.",
  metadataBase: new URL("https://charukhesh.github.io/Charukhesh_Portfolio/"),
  openGraph: {
    title: "Charukhesh B R | AI/ML Research Engineer",
    description:
      "Research and engineering at the intersection of robotics, machine learning and real-world systems.",
    type: "website"
  }
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