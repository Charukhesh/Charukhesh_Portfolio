import HeroSim from "@/components/HeroSim";
import ResearchMap from "@/components/ResearchMap";
import ProjectPanel from "@/components/ProjectPanel";
// 1. Swap AdvancedItem for the new toggle component
import AdvancedProjectsToggle from "@/components/AdvancedProjectsToggle"; 
import Timeline from "@/components/Timeline";
import { Tag } from "@/components/Tag";
import { profile } from "@/data/profile";
import { flagshipProjects, advancedProjects } from "@/data/projects";
import { publications } from "@/data/publications";

export default function HomePage() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="border-b border-border-soft px-6 pb-16 pt-32 sm:pt-40">
        {/* Changed grid ratio to give the right side (simulation + photo) more width (1.15fr) */}
        <div className="mx-auto grid max-w-wide grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
          
          {/* LEFT COLUMN: Text & Buttons */}
          <div>
            <div className="animate-rise mb-4 font-mono text-[13px] tracking-widest text-accent">
              ROBOTICS · MACHINE LEARNING · CONTROL · INTELLIGENT SYSTEMS
            </div>
            <h1
              className="animate-rise mb-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-[#f2f4f6] sm:text-6xl"
              style={{ animationDelay: "0.05s" }}
            >
              CHARUKHESH B R
            </h1>
            <div className="animate-rise mb-6 font-mono text-base text-ink-dim" style={{ animationDelay: "0.1s" }}>
              AI / ML RESEARCH ENGINEER · IIT MADRAS
            </div>
            <p className="animate-rise mb-8 max-w-[52ch] text-ink-dim" style={{ animationDelay: "0.15s" }}>
              {profile.statement}
            </p>
            
            {/* Buttons including Email and ResearchGate */}
            <div className="animate-rise flex flex-wrap gap-3" style={{ animationDelay: "0.2s" }}>
              <a
                href="#research"
                className="rounded-full border border-accent bg-accent px-4 py-2 font-mono text-xs tracking-wide text-bg transition-colors hover:bg-transparent hover:text-accent"
              >
                VIEW RESEARCH →
              </a>
              <a
                href="mailto:ae22b028@smail.iitm.ac.in"
                className="rounded-full border border-border px-4 py-2 font-mono text-xs tracking-wide text-[#f2f4f6] hover:border-accent hover:text-accent"
              >
                EMAIL
              </a>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 font-mono text-xs tracking-wide text-ink-dim hover:border-accent hover:text-accent"
              >
                GITHUB
              </a>
              <a
                href={profile.links.researchGate}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 font-mono text-xs tracking-wide text-ink-dim hover:border-accent hover:text-accent"
              >
                RESEARCH GATE
              </a>
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 font-mono text-xs tracking-wide text-ink-dim hover:border-accent hover:text-accent"
              >
                LINKEDIN
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Streamlined 2-Box Layout */}
          <div className="animate-rise grid w-full grid-cols-1 gap-4 sm:grid-cols-5 sm:h-[340px]" style={{ animationDelay: "0.3s" }}>
            
            {/* Box 1: HeroSim (Takes up 60% of the space) */}
            <div className="col-span-1 sm:col-span-3 rounded-2xl border border-border-soft bg-panel p-4 flex items-center justify-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <HeroSim />
              </div>
            </div>
            
            {/* Box 2: Photo (Takes up 40% of the space) */}
            <div className="col-span-1 sm:col-span-2 rounded-2xl border border-border-soft overflow-hidden relative group min-h-[250px] sm:min-h-full">
              <img 
                src="/Charukhesh_Portfolio/photo.jpg" 
                alt="Charukhesh B R" 
                className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ============ RESEARCH ============ */}
      <section id="research" className="scroll-mt-24 border-b border-border-soft px-6 py-20">
        <div className="mx-auto max-w-wide">
          <SectionHeading num="01" title="Research map" note="hover to explore" />
          <p className="mb-8 max-w-5xl text-ink-dim leading-7">
            Work spans learned policies for robotic manipulation, language-grounded
            planning over structured scene representations, and stochastic control /
            estimation for physical and financial systems operating under uncertainty.
          </p>
          <ResearchMap />
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" className="scroll-mt-24 border-b border-border-soft px-6 py-20">
        <div className="mx-auto max-w-wide">
          <SectionHeading num="02" title="Selected research & systems" note={`${flagshipProjects.length} projects`} />
          <div>
            {flagshipProjects.map((p, i) => (
              <ProjectPanel key={p.slug} project={p} index={i + 1} />
            ))}
          </div>

          <div className="mt-20">
            <h3 className="mb-2 font-display text-xl font-semibold text-[#f2f4f6]">Applied Research in Engineering Systems</h3>
            <p className="mb-6 max-w-5xl text-ink-dim">
              Supporting work spanning computer vision, sequence modeling, estimation,
              control and quantitative systems implemented end-to-end rather than
              notebook-only.
            </p>
            
            {/* 2. Use the new client component here */}
            <AdvancedProjectsToggle projects={advancedProjects} />
            
          </div>
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section id="experience" className="scroll-mt-24 border-b border-border-soft px-6 py-20">
        <div className="mx-auto max-w-content">
          <SectionHeading num="03" title="Experience timeline" note="click a node" />
          <Timeline />
        </div>
      </section>

      {/* ============ PUBLICATIONS ============ */}
      <section id="publications" className="scroll-mt-24 border-b border-border-soft px-6 py-20">
        <div className="mx-auto max-w-content">
          <SectionHeading num="04" title="Publications" note={`${publications.length} manuscript`} />
          {publications.map((pub, i) => (
            <div key={i} className="border-b border-border-soft py-5">
              <div className="mb-2 text-[16.5px] italic text-[#f2f4f6]">{pub.title}</div>
              <div className="font-mono text-[12px] text-muted">
                {pub.authors} — <i>{pub.venue}</i>
                <span className="ml-2 rounded-full border border-accent2 px-2.5 py-0.5 text-[10.5px] text-accent2">
                  {pub.status}
                </span>
              </div>
            </div>
          ))}
          <p className="mt-5">
            <a
              href={profile.links.researchGate}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent2 underline decoration-dotted underline-offset-4"
            >
              Full profile on ResearchGate →
            </a>
          </p>
        </div>
      </section>

      {/* ============ ABOUT (compact) ============ */}
      <section id="about" className="scroll-mt-24 px-6 py-20">
        <div className="mx-auto max-w-wide">
          <SectionHeading num="05" title="About" note="compact" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr]">
            <div>
              <div className="mb-4 font-mono text-[13px] text-ink-dim">
                <div>{profile.institution}</div>
                <div>{profile.program}</div>
              </div>
              <div className="mb-4 flex flex-wrap gap-2">
                {profile.researchInterests.map((r) => (
                  <Tag key={r.label} active={r.active}>
                    {r.label}
                  </Tag>
                ))}
              </div>
              {profile.links.resume ? (
                <a
                  href={profile.links.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-accent px-4 py-2 font-mono text-xs tracking-wide text-accent hover:bg-accent hover:text-bg"
                >
                  DOWNLOAD RESUME ↓
                </a>
              ) : (
                <span className="font-mono text-xs text-muted">Resume link not yet configured</span>
              )}
            </div>
            <div>
              <h4 className="mb-2.5 font-mono text-xs uppercase tracking-wide text-accent">Key achievements</h4>
              <ul className="text-[14.5px] text-ink-dim">
                {profile.achievements.map((a, i) => (
                  <li key={i} className="mb-2 list-disc pl-4 marker:text-muted">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeading({ num, title, note }: { num: string; title: string; note: string }) {
  return (
    <div className="mb-10 flex items-baseline justify-between border-b border-border-soft pb-4">
      <h2 className="font-display text-2xl font-semibold text-[#f2f4f6] sm:text-[28px]">
        <span className="mr-2 font-mono text-sm text-accent">{num}</span>
        {title}
      </h2>
      <span className="font-mono text-xs text-muted">{note}</span>
    </div>
  );
}