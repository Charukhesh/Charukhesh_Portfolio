import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CASE_STUDIES_DIR = path.join(process.cwd(), "content", "case-studies");

export interface CaseStudyMeta {
  slug: string;
  title: string;
  subtitle: string;
  badges: string[];
}

/** Returns the raw MDX body + parsed frontmatter for a given project slug. */
export function getCaseStudySource(slug: string): { meta: CaseStudyMeta; content: string } | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: data.title ?? slug,
      subtitle: data.subtitle ?? "",
      badges: data.badges ?? []
    },
    content
  };
}

/** Slugs for every MDX file present, used for generateStaticParams. */
export function getAllCaseStudySlugs(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];
  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
