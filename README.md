# Charukhesh B R | Portfolio Repository 🚀

This is the source code for my personal portfolio, built for high performance, static deployment, and rich technical storytelling. It is designed to bridge the gap between academic research and software engineering.

**Live Site:** [charukhesh.github.io/Charukhesh_Portfolio](https://charukhesh.github.io/Charukhesh_Portfolio/)

---

## 🛠 Tech Stack
- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion & HTML5 Canvas
- **Content:** MDX (via `next-mdx-remote/rsc` with LaTeX & Math support)
- **Deployment:** GitHub Pages (Static HTML Export)

---

## 💻 Quick Start (Local Development)

If you are cloning this from scratch to work on it on your local machine:

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the local development server:**
   ```bash
   npm run dev
   ```
3. **View the site:** Open `http://localhost:3000/Charukhesh_Portfolio/` in your browser.

> ⚠️ **IMPORTANT LOCALHOST NOTE:** Because this site is configured for GitHub Pages under the repository name `Charukhesh_Portfolio`, Next.js automatically applies a `basePath`. To view your site locally, you **must** go to `localhost:3000/Charukhesh_Portfolio/` (not just `localhost:3000`).

---

## 📂 Project Architecture (Where everything lives)

- `/app` → Page routing, layouts, and SEO configurations (`page.tsx`, `layout.tsx`).
- `/components` → React components (Nav, HeroSim, ProjectPanel, SuasSection, etc.).
- `/data` → **(EDIT THIS MOST OFTEN)** TypeScript files containing profile info, text, and project lists.
- `/content/case-studies` → The `.mdx` files containing the deep-dive technical articles for flagship projects.
- `/public` → Static assets (Images, PDFs, Logos).

---

## 📝 How to Update the Portfolio

### 1. Updating General Profile Info & Text
If you get a new degree, join a new company, or want to change your bio, do not hunt through the UI components.
* Go to **`data/profile.ts`**.
* Edit your statement, institution, links, and achievements there. The whole website will update automatically.

### 2. Adding a New "Advanced Engineering" Project
To add a small project (without a dedicated case-study page):
1. Open **`data/projects.ts`**.
2. Scroll to the `advancedProjects` array.
3. Add a new object following the existing format. It will automatically populate in the dropdown on the homepage!

### 3. Adding a New "Flagship" Project (With a Case Study)
To add a massive research project that gets its own dedicated page (e.g., `projects/my-new-research`):

**Step 1:** Add the metadata to `data/projects.ts` under the `flagshipProjects` array.
```typescript
{
  slug: "my-new-research", // IMPORTANT: Remember this slug!
  title: "My New Research Project",
  hasCaseStudy: true,
  // ... fill out the rest of the fields
}
```

**Step 2:** Create the MDX content file.
* Go to `content/case-studies/`.
* Create a new file named EXACTLY after your slug: **`my-new-research.mdx`**.
* Write your content using standard Markdown, HTML, or LaTeX (e.g., `$x^2$`).

### 4. Adding Images
If you want to add a new image to the site (like a new profile photo or a diagram for an MDX file):
1. Drop the image into the **`public/`** folder (e.g., `new-chart.png`).
2. When referencing it in code or Markdown, you **MUST** include the base path:
   ```html
   <!-- Correct -->
   <img src="/Charukhesh_Portfolio/new-chart.png" alt="Chart" />
   
   <!-- Incorrect (Will break on GitHub Pages) -->
   <img src="/new-chart.png" alt="Chart" />
   ```

---

## 🎨 Interactive Components

* **Hero Simulation (`HeroSim.tsx`):** A custom HTML5 Canvas rendering mathematical path-tracing algorithms (Spiderman vs. Batman) with MPC rollouts, PD control, and adaptive Kalman filter covariance spikes on click.
* **Research Map (`ResearchMap.tsx`):** An interactive SVG/HTML node graph powered by `lucide-react` icons. Hovering nodes highlights connections and dynamically filters associated project work.
* **SUAS Section (`SuasSection.tsx`):** A `framer-motion` powered automated slideshow showcasing robotics leadership.

---

## 🌐 Deployment & SEO

### Deploying to GitHub Pages
This project uses `"output": "export"` in `next.config.mjs`. 
To deploy an update:
1. Push your changes to the `main` branch on GitHub.
2. Ensure you have a GitHub Actions workflow setup for Next.js (usually under `.github/workflows/nextjs.yml`). GitHub will automatically build and deploy the static HTML to your `.github.io` domain!

### SEO (Google Search)
The site is optimized for Google Search via:
- Metadata in `app/layout.tsx`
- Auto-generated `sitemap.ts` and `robots.ts`
*If you change your base URL, remember to update the URL in `layout.tsx` and `sitemap.ts` and resubmit to Google Search Console.*
