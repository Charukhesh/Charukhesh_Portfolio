export type ProjectCategory =
  | "Robotics"
  | "Robot Learning"
  | "LLM/NLP"
  | "Control"
  | "State Estimation"
  | "Finance"
  | "MLOps"
  | "Computer Vision"
  | "Aerospace"
  | "Optimization";

export type ProjectType = "Research" | "Professional" | "Course" | "Personal";

export type ProjectStatus = "active" | "completed" | "validated" | "industry" | "research";

export interface RepoLink {
  /** Set only when the public repository has been verified to exist. */
  url: string | null;
  /** Human-readable note shown when url is null (e.g. "institutional, not public"). */
  note?: string;
}

export interface Project {
  slug: string;
  title: string;
  institution: string;
  advisor?: string;
  year?: string;
  category: ProjectCategory[];
  type: ProjectType;
  status: ProjectStatus;
  featured: boolean;
  summary: string;
  methods: string[];
  result: string;
  repo: RepoLink;
  hasCaseStudy: boolean;
}

// ---------------------------------------------------------------------------
// FLAGSHIP — dedicated case studies live in /content/case-studies/{slug}.mdx
// ---------------------------------------------------------------------------
export const flagshipProjects: Project[] = [
  {
    slug: "flow-latent-mpc",
    title: "Flow-Latent MPC for Fast, Precise Robotic Manipulation",
    institution: "Purdue — Summer Undergraduate Research Fellowship (SURF)",
    advisor: "Prof. Aniket Bera",
    category: ["Robotics", "Robot Learning"],
    type: "Research",
    status: "validated",
    featured: true,
    summary:
      "A generate-and-verify trajectory planner combining a Flow Matching action generator with a V-JEPA latent world model, evaluating candidate manipulation trajectories against predicted latent goals rather than raw pixels.",
    methods: [
      "Flow Matching action generation",
      "V-JEPA latent world model",
      "Flow-Latent MPC",
      "short-horizon rollouts"
    ],
    result:
      "16 candidate 7D trajectories scored per step against latent-space goal predictions; short-horizon rollouts mitigate autoregressive drift, validated on Robomimic manipulation tasks.",
    repo: { url: "https://github.com/Charukhesh/flow-latentWM-mpc.git"},
    hasCaseStudy: true
  },
  {
    slug: "llm-scene-planner",
    title: "LLM Planner over 3D Scene Graphs for Long-Horizon Manipulation",
    institution: "National University of Singapore — Internships & Research Immersion @ Singapore",
    advisor: "Prof. Guillaume Adrien Sartoretti",
    category: ["Robotics", "LLM/NLP"],
    type: "Research",
    status: "validated",
    featured: true,
    summary:
      "A long-horizon, instruction-following planner grounding natural-language commands in hierarchical, semantically rich 3D scene graphs built from ground-truth depth scans, converting the MobiPi framework for use inside RoboCasa.",
    methods: [
      "LLM-based hierarchical task planning",
      "3D scene graph construction from depth scans",
      "RoboCasa simulation",
      "MobiPi conversion"
    ],
    result:
      "Spatially consistent, multi-step action plans generated from natural-language instructions and executed autonomously in simulation.",
    repo: { url: "https://github.com/Charukhesh/Hierarchical_SGPlanner.git" },
    hasCaseStudy: true
  },
  {
    slug: "thesis-tail-risk",
    title: "Dynamic Tail-Risk Hedging & Stochastic Control for Non-Stationary Energy Systems",
    institution: "IIT Madras — Master's Thesis (ongoing)",
    advisor: "Prof. Raghunathan Rengaswamy",
    category: ["Control", "State Estimation", "Finance"],
    type: "Research",
    status: "active",
    featured: true,
    summary:
      "A real-time stochastic control framework unifying Conditional Value-at-Risk (CVaR), Model Predictive Control and dynamic state estimation for physical assets whose risk dynamics are non-stationary.",
    methods: [
      "CVaR-constrained MPC",
      "adaptive state-space models",
      "sequential Bayesian inference over latent risk states"
    ],
    result: "Ongoing thesis work — forecast and parameter updates via sequential Bayesian inference.",
    repo: { url: null, note: "Ongoing Master's thesis" },
    hasCaseStudy: true
  },
  {
    slug: "hres-optimization",
    title: "Contractual & Resource-Aware Capacity Optimization for Hybrid Renewable Energy Systems",
    institution: "IIT Madras, with Hero Future Energies",
    advisor: "Prof. Raghunathan Rengaswamy",
    category: ["Optimization", "Finance"],
    type: "Research",
    status: "industry",
    featured: true,
    summary:
      "A multi-objective sizing framework for hybrid renewable + storage systems embedding IRR, PPA penalties, tax shields and degradation directly into the optimization, backed by a synthetic renewable-generation model and long-horizon Monte Carlo reliability testing.",
    methods: [
      "Multi-objective HRES sizing",
      "Delta-Distribution Mixture of Gaussians",
      "Conditional Probabilistic Clustering",
      "25-year Monte Carlo simulation",
      "KL-divergence convergence checks"
    ],
    result:
      "Manuscript under review, Applied Energy (Elsevier); accepted for presentation, SGAI Conference, Lisbon 2026.",
    repo: { url: null, note: "Research collaboration — no public repository" },
    hasCaseStudy: true
  }
];

// ---------------------------------------------------------------------------
// ADVANCED ENGINEERING — verified against github.com/Charukhesh where linked
// ---------------------------------------------------------------------------
export const advancedProjects: Project[] = [
  {
    slug: "qualitycast-mlops",
    title: "QualityCast-MLOps — production-grade MLOps for casting-defect detection",
    institution: "Course project — ML Systems Design & Applications",
    advisor: "Prof. Sudarsan S",
    category: ["MLOps", "Computer Vision"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Microservice pipeline with PyTorch, DVC and MLflow for reproducible training; containerized FastAPI + Streamlit stack for high-concurrency inference and human-in-the-loop verification; Prometheus/Grafana monitoring with Pytest checks on schemas, endpoints and model degradation.",
    methods: ["PyTorch", "FastAPI", "Streamlit", "DVC", "MLflow", "Prometheus", "Grafana", "Pytest"],
    result: "End-to-end reproducible MLOps pipeline for automated casting-defect detection.",
    repo: { url: "https://github.com/Charukhesh/QualityCast-MLOPs.git" },
    hasCaseStudy: false
  },
  {
    slug: "unified-multitask-vision",
    title: "Unified Multi-Task Vision — recognition, localization & segmentation",
    institution: "Course project — Deep Learning",
    advisor: "Prof. Ganapathy S",
    category: ["Computer Vision"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Shared VGG16 encoder with task-specific heads for fine-grained multi-task recognition across 37 classes; U-Net-style decoder with skip connections trained with IoU and Dice losses for dense segmentation.",
    methods: ["PyTorch", "VGG16", "U-Net", "IoU/Dice loss"],
    result: "Single backbone serving recognition, localization and segmentation heads.",
    repo: { url: "https://github.com/Charukhesh/multitask-vision-pipeline.git" },
    hasCaseStudy: false
  },
  {
    slug: "transformer-from-scratch",
    title: "Transformer from Scratch — German→English NMT",
    institution: "Course project — Deep Learning",
    advisor: "Prof. Ganapathy S",
    category: ["LLM/NLP"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Original Transformer architecture implemented in PyTorch with 8-head attention, causal masking and sinusoidal positional encoding; custom WordPiece tokenizer with label smoothing, tuned to a compact 256-dim model for limited-data training.",
    methods: ["PyTorch", "WordPiece", "Attention"],
    result: "From-scratch encoder-decoder Transformer for German-English translation.",
    repo: { url: "https://github.com/Charukhesh/pure-pytorch-transformer-nmt.git" },
    hasCaseStudy: false
  },
  {
    slug: "embedding-quality-moe",
    title: "Embedding-Based Quality Prediction + Mixture-of-Experts",
    institution: "Course project — Data Analytics Laboratory",
    advisor: "Prof. Sudarsan S",
    category: ["MLOps"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Negative sampling across four embedding modalities to generate score labels from response-metric cosine similarity; calibrated gated Mixture-of-Experts with regime-specific regressors, and cross-validated LightGBM baselines with gate calibration for the final score.",
    methods: ["LightGBM", "Mixture-of-Experts", "Embeddings"],
    result: "Calibrated gated MoE ensemble outperforming single-regressor baselines.",
    repo: { url: "https://github.com/Charukhesh/MetricLearning" },
    hasCaseStudy: false
  },
  {
    slug: "risk-aware-mpc",
    title: "Risk-Aware Stochastic MPC — UAV motion planning",
    institution: "Independent / coursework",
    category: ["Control", "Aerospace"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Stochastic Model Predictive Control formulation for UAV motion planning under uncertainty, applied to guidance-and-control style trajectory problems.",
    methods: ["Stochastic MPC", "Python"],
    result: "Working MPC controller for uncertain UAV trajectory tracking.",
    repo: { url: "https://github.com/Charukhesh/UAVMotionPlanning_MPC" },
    hasCaseStudy: false
  },
  {
    slug: "adaptive-kf-rls",
    title: "Adaptive Kalman Filtering + RLS",
    institution: "Independent / coursework",
    category: ["State Estimation"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Adaptive Kalman filter combined with Recursive Least Squares for joint state and parameter estimation under evolving physical constraints.",
    methods: ["Kalman Filter", "RLS", "Python"],
    result: "Joint state/parameter estimator validated on a simulated physical system.",
    repo: { url: "https://github.com/Charukhesh/AdaptiveKF_RLS" },
    hasCaseStudy: false
  },
  {
    slug: "sindy-rls",
    title: "SINDy-RLS — system identification (cart-pendulum)",
    institution: "Independent / coursework",
    category: ["State Estimation", "Control"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Sparse Identification of Nonlinear Dynamics combined with Recursive Least Squares for discovering governing equations of a cart-pendulum system from data.",
    methods: ["SINDy", "RLS", "Python"],
    result: "Recovered governing equations of motion directly from simulated cart-pendulum data.",
    repo: { url: "https://github.com/Charukhesh/CartPendulum_SINDyC" },
    hasCaseStudy: false
  },
  {
    slug: "smc-landing",
    title: "Thrust-Limited Sliding-Mode Guidance — landing",
    institution: "Independent / coursework",
    category: ["Control", "Aerospace"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Sliding-mode guidance law for a thrust-limited powered-descent/landing problem, implemented and simulated in MATLAB.",
    methods: ["Sliding-Mode Control", "MATLAB"],
    result: "Guidance law simulated for a constrained powered-descent landing scenario.",
    repo: { url: "https://github.com/Charukhesh/SMC_Landing" },
    hasCaseStudy: false
  }
];

export const allProjects = [...flagshipProjects, ...advancedProjects];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}
