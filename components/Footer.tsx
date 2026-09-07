import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg px-6 py-12">
      <div className="mx-auto flex max-w-wide flex-col gap-8 md:flex-row md:items-end md:justify-between">
        
        {/* Identity & Email */}
        <div>
          <div className="mb-1 text-lg text-[#f2f4f6]">Charukhesh B R</div>
          <div className="mb-2 font-mono text-sm text-ink-dim">IIT Madras</div>
          <a 
            href="mailto:ae22b028@smail.iitm.ac.in" 
            className="font-mono text-sm text-accent transition-colors hover:text-[#f2f4f6]"
          >
            ae22b028@smail.iitm.ac.in
          </a>
        </div>
        
        {/* Social Links */}
        <div className="flex flex-wrap gap-6 font-mono text-sm text-[#f2f4f6]">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">LinkedIn</a>
          <a href={profile.links.researchGate} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-accent">ResearchGate</a>
        </div>
        
      </div>
    </footer>
  );
}