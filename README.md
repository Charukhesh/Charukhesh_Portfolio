# Charukhesh B R — Portfolio (v2, redesigned)

Next.js 14 (App Router) + TypeScript + Tailwind + Framer Motion. Single-page scroll
experience (interactive robotics-lab aesthetic) with dedicated case-study pages per
flagship project. All real content is unchanged from v1 — this pass is visual/interaction
only, per the redesign brief in `Prompt.txt`.

## What changed from v1

- **Hero** → `components/HeroSim.tsx`, a canvas-based "autonomous system simulation"
  (agent, trajectory trail, predicted path, sensor rays, particles) that gently follows
  the cursor. Renders a static frame under `prefers-reduced-motion`.
- **Intro** → `components/Loader.tsx`, a ~1s skippable boot sequence, shown once per
  session, skipped entirely for reduced-motion users.
- **Navigation** → `components/Nav.tsx`, floating pill nav with scroll-spy (`01 / RESEARCH`
  … `05 / ABOUT`), persistent GitHub link, mobile drawer.
- **Research** → `components/ResearchMap.tsx`, an interactive node-link diagram; hovering
  a research area highlights its edges and lists the connected projects.
- **Projects** → `components/ProjectPanel.tsx` + `components/ProjectVisual.tsx`: each
  flagship project is now a large alternating-layout panel with its own animated,
  concept-accurate SVG diagram (trajectory rollouts for Flow-Latent MPC, scene-graph
  nodes connecting for the LLM planner, uncertainty envelope for the stochastic-control
  thesis, source→optimization→Monte-Carlo for HRES) plus a system-style status dot
  (`ACTIVE` / `VALIDATED` / `INDUSTRY COLLABORATION` / …).
- **Case studies** (`/projects/[slug]`) now auto-number their `##` headings via a CSS
  counter (`.case-study-body` in `globals.css`) instead of hand-edited numbering — so
  the MDX content itself was **not rewritten**, only restyled.
- **Experience** → `components/Timeline.tsx` is now click-to-expand per node.
- **Site structure** → consolidated from separate `/research`, `/projects`, `/about`,
  `/publications` routes into anchor sections on the single home page (`app/page.tsx`),
  matching the nav's scroll-spy behavior. `/projects/[slug]` remains a dedicated page
  per flagship case study.
- **Typography** → Space Grotesk (display/headings) + Inter (body) + IBM Plex Mono
  (technical labels/metadata/status), replacing the all-serif academic-paper look.
- **Footer** → closing statement ("BUILDING INTELLIGENT SYSTEMS FOR THE PHYSICAL WORLD")
  instead of a generic sign-off.

Nothing about the underlying facts changed: no new metrics, deployments, repos, or
publications were invented. `data/*.ts` and `content/case-studies/*.mdx` carry the same
information as v1 — see those files' own history if you want to diff.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build && npm run start   # production build
```

## Project structure

```
app/
  layout.tsx                root layout: fonts, Loader, Nav, Footer
  page.tsx                  single-page scroll experience — hero, research map,
                             flagship panels, advanced/other work, timeline,
                             publications, compact about
  projects/[slug]/page.tsx  MDX case-study reader (auto-numbered sections)
components/
  Loader.tsx                intro boot sequence
  Nav.tsx                   floating scroll-spy navigation
  HeroSim.tsx               canvas autonomous-system hero visualization
  ResearchMap.tsx           interactive research interconnection map
  ProjectPanel.tsx          large alternating-layout flagship project panel
  ProjectVisual.tsx         per-project animated SVG diagrams (switch on slug)
  AdvancedItem.tsx          compact advanced-engineering list row
  Timeline.tsx              expandable experience timeline
  Tag.tsx                   Tag + Badge (tags, status colors)
  StatusDot.tsx             system-metadata status indicator
  mdx-components.tsx        MDX styling overrides (headings, tables, math, code)
  Footer.tsx
data/                       structured content — profile.ts, projects.ts (now
                             includes `status` per project), experience.ts,
                             publications.ts
content/case-studies/       one .mdx file per flagship project (unchanged content)
lib/case-studies.ts         MDX file loader
```

## Editing content

Same as v1 — everything non-case-study lives in `data/*.ts`; flagship case studies are
`content/case-studies/*.mdx`. Section numbering in case studies is automatic (CSS
counter on `.case-study-body h2`), so just add/remove `##` headings in the MDX and the
numbering re-flows — no manual renumbering needed.

## Known TODOs before shipping

1. **`metadataBase`** in `app/layout.tsx` is a placeholder (`https://example.com`) —
   set the real domain.
2. **Resume PDF** — `profile.links.resume` is `null`. Host the PDF (e.g.
   `/public/resume.pdf`) and set the link; the "DOWNLOAD RESUME" button and footer link
   activate automatically once it's non-null.
3. **Unverified repo slugs** — `qualitycast-mlops`, `unified-multitask-vision`,
   `transformer-from-scratch` in `data/projects.ts` have `repo.url: null` pending
   confirmation of exact GitHub repo names.
4. Add `app/sitemap.ts` / `app/robots.ts` once the domain is set.
5. This build hasn't been run through `npm install && npm run build` in this
   environment (no network access to verify) — run it locally before deploying and
   watch for any TypeScript/ESLint nits, per the brief's own QA checklist.
