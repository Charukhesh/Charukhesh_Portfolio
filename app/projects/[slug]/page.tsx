import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { getCaseStudySource, getAllCaseStudySlugs } from "@/lib/case-studies";
import { getProjectBySlug } from "@/data/projects";
import { mdxComponents } from "@/components/mdx-components";
import StatusDot from "@/components/StatusDot";

export function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Charukhesh B R`,
    description: project.summary
  };
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  const source = getCaseStudySource(params.slug);

  if (!project || !source) notFound();

  return (
    <main className="mx-auto max-w-content px-6 pb-24 pt-32 sm:pt-36">
      <Link href="/#projects" className="mb-8 inline-block font-mono text-xs text-muted hover:text-accent">
        ← back to projects
      </Link>

      <div className="mb-3 flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-wide text-muted">
        <span>
          {project.institution}
          {project.advisor ? ` · ${project.advisor}` : ""}
        </span>
        <StatusDot status={project.status} />
      </div>
      <h1 className="mb-6 font-display text-3xl font-semibold leading-snug text-[#f2f4f6] sm:text-[34px]">
        {source.meta.title}
      </h1>

      {source.meta.badges.length > 0 && (
        <div className="mb-10 flex flex-wrap gap-2">
          {source.meta.badges.map((b) => (
            <span key={b} className="rounded-full border border-accent2 px-3 py-1 font-mono text-[11px] text-accent2">
              {b}
            </span>
          ))}
        </div>
      )}

      <article className="case-study-body">
        <MDXRemote
          source={source.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex]
            }
          }}
        />
      </article>

      <div className="mt-14 rounded-lg border border-border-soft bg-panel p-6">
        <div className="mb-3 font-mono text-xs uppercase tracking-wide text-accent">Implementation</div>
        {project.repo.url ? (
          <a
            href={project.repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-accent2 px-4 py-2 font-mono text-xs text-accent2"
          >
            View repository ↗
          </a>
        ) : (
          <div className="font-mono text-xs text-muted">{project.repo.note}</div>
        )}
      </div>
    </main>
  );
}
