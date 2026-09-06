export const profile = {
  name: "Charukhesh B R",
  role: "AI/ML Research Engineer",
  statement:
    "Building intelligent systems at the intersection of robotics, machine learning and engineering — from latent-space planners for manipulation to stochastic control for physical assets under uncertainty.",
  institution: "Indian Institute of Technology Madras",
  program: "B.Tech Aerospace Engineering + M.Tech Data Science (Dual Degree), 9.14 CGPA, 2027",
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
      degree: "B.Tech Aerospace Engineering + M.Tech Data Science (Dual Degree), IIT Madras",
      detail: "9.14 CGPA · 2027"
    },
    { degree: "Class XII, CBSE", detail: "97.6%" },
    { degree: "Class X, CBSE", detail: "95.2%" }
  ],
  achievements: [
    "2nd runner-up, nationwide — James Dyson Award 2024, for a 5-stage UV filtration bottle with kinetic charging",
    "Selected for NUS IRIS and Purdue SURF — both top-5% international research internship programs",
    "Co-founded IIT Madras' SUAS team; led autonomous systems development to 8th of 70 international teams at SUAS 2025",
    "Top 2% (of 1,500 teams) — 2025 Caterpillar Tech Challenge, for an ML-based P&D sizing system",
    "CBSE Merit Certificate — top 0.1% nationwide in Mathematics, Class XII boards"
  ],
  positions: [
    "Co-founder, SUAS — IIT Madras' unmanned autonomous vehicle development team",
    "Teaching Assistant — Artificial Intelligence in Predictive Maintenance, Online M.Tech, Prof. Kalluri R",
    "Lead, Pravahan/CoCAS — student autonomous UAV development for navigation and delivery"
  ],
  aboutNarrative:
    "Dual-degree student at IIT Madras (B.Tech Aerospace Engineering + M.Tech Data Science), working across robot learning, generative world models, and stochastic control for physical and energy systems. Current focus is on connecting learned representations — latent world models, language-grounded scene graphs — to classical control and estimation theory, rather than treating them as separate toolkits."
};
