"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import ProjectVisual from "@/components/ProjectVisual";
import StatusDot from "@/components/StatusDot";

export default function ProjectPanel({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group grid grid-cols-1 items-center gap-8 border-b border-border-soft py-14 lg:grid-cols-2 lg:gap-12"
    >
      <div className={reversed ? "lg:order-2" : ""}>
        <div className="transition-transform duration-500 group-hover:scale-[1.015]">
          <ProjectVisual slug={project.slug} />
        </div>
      </div>

      <div className={reversed ? "lg:order-1" : ""}>
        <div className="mb-3 flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-accent">{String(index).padStart(2, "0")}</span>
          <StatusDot status={project.status} />
        </div>
        <h3 className="mb-2 font-display text-2xl font-semibold leading-snug text-[#f2f4f6] sm:text-[28px]">
          {project.title}
        </h3>
        <div className="mb-4 font-mono text-xs text-accent2">
          {project.institution}
          {project.advisor ? ` · ${project.advisor}` : ""}
        </div>
        <p className="mb-5 max-w-[60ch] text-ink-dim">{project.summary}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.methods.map((m) => (
            <span key={m} className="rounded-full border border-border px-2.5 py-1 font-mono text-[11px] text-ink-dim">
              {m}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {project.hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 font-mono text-[12px] tracking-wide text-accent transition-colors hover:bg-accent hover:text-bg"
            >
              EXPLORE PROJECT →
            </Link>
          )}
          {project.repo.url ? (
            <a
              href={project.repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-accent2 underline decoration-dotted underline-offset-4"
            >
              GitHub ↗
            </a>
          ) : (
            <span className="font-mono text-xs text-muted">{project.repo.note}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
