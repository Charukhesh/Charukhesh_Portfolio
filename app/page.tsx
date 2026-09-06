import HeroSim from "@/components/HeroSim";
import ResearchMap from "@/components/ResearchMap";
import ProjectPanel from "@/components/ProjectPanel";
import AdvancedItem from "@/components/AdvancedItem";
import Timeline from "@/components/Timeline";
import { Tag } from "@/components/Tag";
import { profile } from "@/data/profile";
import { flagshipProjects, advancedProjects, otherWork } from "@/data/projects";
import { publications } from "@/data/publications";

export default function HomePage() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="border-b border-border-soft px-6 pb-16 pt-32 sm:pt-40">
        <div className="mx-auto grid max-w-wide grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="animate-rise mb-4 font-mono text-[13px] tracking-widest text-accent">
              ROBOTICS · MACHINE LEARNING · CONTROL · INTELLIGENT SYSTEMS
            </div>
            <h1
              className="animate-rise mb-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight text-[#f2f4f6] sm:text-6xl"
              style={{ animationDelay: "0.05s" }}
            >
              CHARUKHESH
              <br />B R
            </h1>
            <div className="animate-rise mb-6 font-mono text-base text-ink-dim" style={{ animationDelay: "0.1s" }}>
              AI / ML RESEARCH ENGINEER
            </div>
            <p className="animate-rise mb-8 max-w-[52ch] text-ink-dim" style={{ animationDelay: "0.15s" }}>
              {profile.statement}
            </p>
            <div className="animate-rise flex flex-wrap gap-3" style={{ animationDelay: "0.2s" }}>
              <a
                href="#projects"
                className="rounded-full border border-accent bg-accent px-4 py-2 font-mono text-xs tracking-wide text-bg transition-colors hover:bg-transparent hover:text-accent"
              >
                VIEW RESEARCH →
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
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-4 py-2 font-mono text-xs tracking-wide text-ink-dim hover:border-accent hover:text-accent"
              >
                LINKEDIN
              </a>
            </div>
          </div>
          <HeroSim />
        </div>
      </section>

      {/* ============ RESEARCH ============ */}
      <section id="research" className="scroll-mt-24 border-b border-border-soft px-6 py-20">
        <div className="mx-auto max-w-wide">
          <SectionHeading num="01" title="Research map" note="hover to explore" />
          <p className="mb-8 max-w-[62ch] text-ink-dim">
            Work spans learned policies for robotic manipulation, language-grounded planning over structured scene
            representations, and stochastic control / estimation for physical and financial systems operating under
            uncertainty.
          </p>
          <ResearchMap />
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section id="projects" className="scroll-mt-24 border-b border-border-soft px-6 py-20">
        <div className="mx-auto max-w-wide">
          <SectionHeading num="02" title="Flagship research" note={`${flagshipProjects.length} projects`} />
          <div>
            {flagshipProjects.map((p, i) => (
              <ProjectPanel key={p.slug} project={p} index={i + 1} />
            ))}
          </div>

          <div className="mt-20">
            <h3 className="mb-2 font-display text-xl font-semibold text-[#f2f4f6]">Advanced engineering</h3>
            <p className="mb-6 max-w-[62ch] text-ink-dim">
              Systems-level work spanning MLOps, computer vision, sequence modeling, control and estimation —
              implemented end-to-end rather than notebook-only.
            </p>
            {advancedProjects.map((p) => (
              <AdvancedItem key={p.slug} project={p} />
            ))}
          </div>

          <div className="mt-14">
            <h3 className="mb-4 font-display text-lg font-semibold text-[#f2f4f6]">Other work</h3>
            <div className="flex flex-wrap gap-2.5">
              {otherWork.map((w) => (
                <Tag key={w}>{w}</Tag>
              ))}
            </div>
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
