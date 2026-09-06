export interface ExperienceEntry {
  when: string;
  title: string;
  where: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    when: "Ongoing",
    title: "M.Tech Thesis — Dynamic Tail-Risk Hedging & Stochastic Control",
    where: "IIT Madras · Prof. Raghunathan R",
    bullets: [
      "Developing a real-time stochastic control framework integrating CVaR, MPC and dynamic state estimation for uncertain physical assets",
      "Designing adaptive state-space models with sequential Bayesian inference to estimate risk states and update forecasts"
    ]
  },
  {
    when: "Research collaboration",
    title: "Contractual & Resource-Aware HRES Capacity Optimization",
    where: "IIT Madras · Prof. Raghunathan R, with Hero Future Energies",
    bullets: [
      "Formulated a multi-objective optimization framework embedding IRR, PPA penalties, tax shields and degradation into HRES sizing",
      "Built a Delta-Distribution Mixture of Gaussians to generate noise-free synthetic renewable generation profiles",
      "Validated 25-year reliability via Monte Carlo simulation with KL-divergence convergence checks"
    ]
  },
  {
    when: "Internship",
    title: "Flow-Latent MPC for Robotic Manipulation",
    where: "Purdue SURF · Prof. Raghunathan S",
    bullets: [
      "Designed a Flow-Latent MPC loop replanning over 16 candidate 7D trajectories against latent-space goal predictions",
      "Mitigated autoregressive drift via short-horizon rollouts, validated on Robomimic manipulation tasks"
    ]
  },
  {
    when: "Internship",
    title: "LLM Planner over 3D Scene Graphs",
    where: "NUS IRIS · Prof. Guillaume A S",
    bullets: [
      "Built a long-horizon, instruction-following LLM planner in RoboCasa, converting the MobiPi framework",
      "Constructed hierarchical 3D scene graphs from ground-truth depth scans for spatial grounding"
    ]
  },
  {
    when: "Research project",
    title: "Physics-Data Reconciliation for Digital-Twin Process Identification",
    where: "IIT Madras · Prof. Kalluri R",
    bullets: [
      "Reconciled physics-based and data-driven models using real experimental process data",
      "Applied Recursive Least Squares and Kalman Filtering for system identification under uncertainty",
      "Built a four-tank digital twin in Simulink for reconciliation, diagnosis and prognosis"
    ]
  },
  {
    when: "Internship",
    title: "Edge-Enabled HIL Control for Precision Drone Spraying",
    where: "EF Group · UTM–RP",
    bullets: [
      "Built hardware-in-the-loop simulations around an ESP32-based real-time control interface",
      "Integrated control logic with PLCs and ThingSpeak for remote monitoring"
    ]
  }
];
