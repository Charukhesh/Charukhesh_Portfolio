import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft py-16">
      <div className="mx-auto max-w-wide px-6">
        <h2 className="font-display text-3xl font-semibold leading-tight text-[#f2f4f6] sm:text-4xl">
          BUILDING INTELLIGENT SYSTEMS
          <br />
          FOR THE PHYSICAL WORLD.
        </h2>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6 border-t border-border-soft pt-8">
          <div>
            <div className="font-display text-lg text-[#f2f4f6]">{profile.name}</div>
            <div className="mt-1 font-mono text-xs text-muted">IIT Madras</div>
          </div>
          <div className="flex gap-5 font-mono text-[12.5px]">
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-accent">
              GitHub
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-accent">
              LinkedIn
            </a>
            <a href={profile.links.researchGate} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-accent">
              ResearchGate
            </a>
            {profile.links.resume && (
              <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="text-ink-dim hover:text-accent">
                Resume
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
