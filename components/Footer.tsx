import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg px-6 py-16">
      <div className="mx-auto max-w-wide">
        
        {/* Large Header */}
        <h2 className="mb-16 font-display text-3xl font-bold uppercase tracking-wide text-[#f2f4f6] sm:text-4xl md:text-5xl max-w-2xl">
          Building intelligent systems for the physical world.
        </h2>
        
        {/* Bottom Bar */}
        <div className="border-t border-border-soft pt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          
          {/* Identity & Email */}
          <div>
            <div className="text-lg text-[#f2f4f6] mb-1">Charukhesh B R</div>
            <div className="font-mono text-sm text-ink-dim mb-2">IIT Madras</div>
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
      </div>
    </footer>
  );
}