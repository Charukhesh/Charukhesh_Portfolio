export const profile = {
  name: "Charukhesh B R",
  role: "AI/ML Research Engineer",
  statement:
    "Building intelligent systems at the intersection of robotics, machine learning and engineering from latent-space planners for manipulation to stochastic control for physical assets under uncertainty.",
  institution: "Indian Institute of Technology Madras",
  program: "B.Tech Aerospace Engineering + Interdisciplanary M.Tech Data Science, 2027",
  links: {
    github: "https://github.com/Charukhesh",
    linkedin: "https://www.linkedin.com/in/charu2005/",
    researchGate: "https://www.researchgate.net/profile/Charukhesh-B-R",
    // No PDF supplied yet — wire this to a hosted resume file when available.
    resume: null as string | null
  },
  researchInterests: [
    { label: "Robot Learning", active: true },
    { label: "Generative Models", active: true },
    { label: "LLM Planning", active: true },
    { label: "Computer Vision", active: false },
    { label: "Stochastic Control", active: true },
    { label: "State Estimation", active: true },
    { label: "Probabilistic Modeling", active: false },
    { label: "AI for Engineering", active: false }
  ],
  education: [
    {
      degree: "B.Tech Aerospace Engineering + Interdisciplanary M.Tech Data Science, IIT Madras",
    },
  ],
  achievements: [
    "Secured 2nd runner-up nationwide in the 2024 James Dyson Challenge by building a 5-stage UV filtration bottle with kinetic charging",
    "Selected for highly competitive international research internship programs: NUS1 IRIS (Top 1%) and Purdue SURF (Top 3%) globally",
    "Co-founded IIT Madras’ SUAS team and led autonomous systems development, ranking 8th out of 70 international teams in SUAS2 2025  ",
    "Developed and deployed drone-based Computer Vision systems for real-time reconnaissance missions with the Indian Army - J&K Rifles",
    "Ranked Top 2% (of 1500 teams) at the 2025 Caterpillar Tech Challenge for developing an ML-based PID gain tuning system"
  ],
  positions: [
    "Co-founder, SUAS — IIT Madras' unmanned autonomous vehicle development team",
    "Teaching Assistant — Artificial Intelligence in Predictive Maintenance, Online M.Tech, Prof. Kallol R",
    "Lead, Pravahan/CoCAS — student autonomous UAV development for navigation and delivery"
  ],
  aboutNarrative:
    "Dual-degree student at IIT Madras (B.Tech Aerospace Engineering + M.Tech Data Science), working across robot learning, generative world models, and stochastic control for physical and energy systems. Current focus is on connecting learned representations — latent world models, language-grounded scene graphs — to classical control and estimation theory, rather than treating them as separate toolkits."
};
