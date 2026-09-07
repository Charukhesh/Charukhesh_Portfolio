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
  | "Optimization"
  | "System Identification";

export type ProjectType = "Research" | "Professional" | "Course" | "Personal";

export type ProjectStatus =
  | "active"
  | "completed"
  | "validated"
  | "industry"
  | "research";

export interface RepoLink {
  /** Set only when the public repository has been verified to exist. */
  url: string | null;
  /** Human-readable note shown when url is null. */
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
    institution:
      "Purdue — Summer Undergraduate Research Fellowship (SURF)",
    advisor: "Prof. Aniket B",
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
    repo: {
      url: "https://github.com/Charukhesh/flow-latentWM-mpc.git"
    },
    hasCaseStudy: true
  },

  {
    slug: "llm-scene-planner",
    title: "LLM Planner over 3D Scene Graphs for Long-Horizon Manipulation",
    institution:
      "National University of Singapore — Internships & Research Immersion @ Singapore",
    advisor: "Prof. Guillaume A S",
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
    repo: {
      url: "https://github.com/Charukhesh/Hierarchical_SGPlanner.git"
    },
    hasCaseStudy: true
  },

  {
    slug: "thesis-tail-risk",
    title:
      "Dynamic Tail-Risk Hedging & Stochastic Control for Non-Stationary Energy Systems",
    institution: "IIT Madras — Master's Thesis (ongoing)",
    advisor: "Prof. Raghunathan R",
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
    result:
      "Ongoing thesis work — forecast and parameter updates via sequential Bayesian inference.",
    repo: {
      url: null,
      note: "Ongoing Master's thesis"
    },
    hasCaseStudy: true
  },

  {
    slug: "hres-optimization",
    title:
      "Contractual & Resource-Aware Capacity Optimization for Hybrid Renewable Energy Systems",
    institution: "IIT Madras, with Hero Future Energies",
    advisor: "Prof. Raghunathan R",
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
    repo: {
      url: null,
      note: "Research collaboration — no public repository"
    },
    hasCaseStudy: true
  },

  // -------------------------------------------------------------------------
  // RISK-AWARE STOCHASTIC MPC
  // -------------------------------------------------------------------------
  {
    slug: "risk-aware-stochastic-mpc",
    title: "Risk-Aware MPC for UAV Motion Planning",
    institution: "IIT Madras",
    advisor: "Prof. Guruprasad K R",
    category: ["Control", "Aerospace", "Robotics"],
    type: "Personal",
    status: "validated",
    featured: true,
    summary:
      "A hierarchical UAV navigation and control framework combining local perception, occupancy-grid mapping, A* global planning and nonlinear receding-horizon MPC, extended with probabilistic chance constraints to explicitly account for uncertain obstacle detections.",
    methods: [
      "Occupancy-grid perception",
      "A* global path planning",
      "Nonlinear MPC",
      "Gaussian perception uncertainty",
      "Probabilistic chance constraints",
      "Risk-aware trajectory optimization"
    ],
    result:
      "In simulated corridor navigation with anisotropic sensor noise, the Risk-Aware MPC achieved approximately 12% lower completion time and 20% lower control effort than the conservatively tuned deterministic baseline.",
    repo: {
      url: "https://github.com/Charukhesh/UAVMotionPlanning_MPC"
    },
    hasCaseStudy: true
  },

  // -------------------------------------------------------------------------
  // ADAPTIVE KALMAN FILTERING + RLS
  // -------------------------------------------------------------------------
  {
    slug: "adaptive-kalman-rls",
    title: "Adaptive Kalman Filtering + RLS",
    institution: "IIT Madras",
    advisor: "Prof. Srikrishna B",
    category: ["State Estimation", "Control"],
    type: "Personal",
    status: "validated",
    featured: true,
    summary:
      "An adaptive state-estimation framework investigating Kalman-filter failure under model mismatch, comparing a conventional KF and RLS-inspired Adaptive KF against a physics-informed Targeted Injection Kalman Filter for unmodeled impulsive disturbances.",
    methods: [
      "Standard Kalman Filter",
      "RLS-inspired forgetting factor",
      "Innovation-based adaptation",
      "Chi-squared hypothesis testing",
      "Physics-informed covariance injection",
      "State-selective uncertainty modeling"
    ],
    result:
      "TI-KF detects the unmodeled collision and selectively increases velocity uncertainty, recovering substantially faster with less overshoot than both the Standard KF and Adaptive KF.",
    repo: {
      url: "https://github.com/Charukhesh/AdaptiveKF_RLS"
    },
    hasCaseStudy: true
  },

  // -------------------------------------------------------------------------
  // SINDY-RLS
  // -------------------------------------------------------------------------
  {
    slug: "sindy-rls-cart-pendulum",
    title: "SINDy-RLS — Data-Driven Discovery under Feedback Control",
    institution: "IIT Madras",
    advisor: "Prof. Aniket K",
    category: ["State Estimation", "Control", "System Identification"],
    type: "Personal",
    status: "validated",
    featured: true,
    summary:
      "A hybrid system-identification framework addressing the Ghost Controller problem, combining implicit SINDy structural discovery with Recursive Least Squares to disentangle physical plant parameters from hidden feedback-controller gains in closed-loop data.",
    methods: [
      "SINDy-PI",
      "Two-pass STLSQ",
      "Implicit sparse identification",
      "LQR-controlled cart-pendulum",
      "Recursive Least Squares",
      "Plant-controller parameter decoupling"
    ],
    result:
      "Controller gains converge to their true values within seconds with less than 4% identification error, while the decoupled model correctly predicts uncontrolled large-angle and chaotic pendulum dynamics.",
    repo: {
      url: "https://github.com/Charukhesh/CartPendulum_SINDyC"
    },
    hasCaseStudy: true
  },

  // -------------------------------------------------------------------------
  // PLUTUS
  // -------------------------------------------------------------------------
  {
    slug: "plutus-market-maker",
    title: "Plutus — Algorithmic Market Maker for Binary Options",
    institution: "Akuna Capital — 2026 Quantitative Trading Challenge",
    category: ["Finance", "Optimization"],
    type: "Personal",
    status: "validated",
    featured: true,
    summary:
      "An algorithmic market-making system for binary event contracts combining statistical reverse-engineering, Monte Carlo pricing, toxicity-aware FOK filtering and inventory-aware RFQ quoting under continuous solvency constraints.",
    methods: [
      "Statistical parameter inference",
      "Monte Carlo option pricing",
      "RFQ / FOK execution",
      "Kelly-inspired risk filtering",
      "Inventory-aware quote skew",
      "Capital-aware position sizing"
    ],
    result:
      "Survived all 20 adversarial simulation stages without bankruptcy while dynamically managing inventory, capital utilization and adverse-selection risk.",
    repo: {
      url: "https://github.com/Charukhesh/plutus-market-maker.git"
    },
    hasCaseStudy: true
  },

  // -------------------------------------------------------------------------
  // QUALITYCAST MLOPS
  // -------------------------------------------------------------------------
  {
    slug: "qualitycast-mlops",
    title: "QualityCast-MLOps — Production-Grade Casting-Defect Detection",
    institution: "IIT Madras",
    advisor: "Prof. Sudarsan S",
    category: ["MLOps", "Computer Vision"],
    type: "Course",
    status: "industry",
    featured: true,
    summary:
      "An industrial-grade, production-oriented computer-vision MLOps platform for real-time casting-defect detection, built around microservices-oriented Clean Architecture and a reproducible data-to-inference pipeline.",
    methods: [
      "PyTorch",
      "Apache Airflow",
      "DVC",
      "MLflow",
      "FastAPI",
      "Docker / Docker Compose",
      "Prometheus / Grafana",
      "Human-in-the-loop retraining"
    ],
    result:
      "End-to-end reproducible workflow spanning data validation, augmentation, training, experiment tracking, model registration, production inference, monitoring, human feedback and retraining, with formal Pytest validation checkpoints.",
    repo: {
      url: "https://github.com/Charukhesh/QualityCast-MLOPs.git"
    },
    hasCaseStudy: true
  }
];

// ---------------------------------------------------------------------------
// ADVANCED ENGINEERING — compact projects without dedicated case studies
// ---------------------------------------------------------------------------
export const advancedProjects: Project[] = [
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
    result:
      "Single backbone serving recognition, localization and segmentation heads.",
    repo: {
      url: "https://github.com/Charukhesh/multitask-vision-pipeline.git"
    },
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
    result:
      "From-scratch encoder-decoder Transformer for German-English translation.",
    repo: {
      url: "https://github.com/Charukhesh/pure-pytorch-transformer-nmt.git"
    },
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
    result:
      "Calibrated gated MoE ensemble outperforming single-regressor baselines.",
    repo: {
      url: "https://github.com/Charukhesh/MetricLearning"
    },
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
    result:
      "Guidance law simulated for a constrained powered-descent landing scenario.",
    repo: {
      url: "https://github.com/Charukhesh/SMC_Landing"
    },
    hasCaseStudy: false
  },

  {
    slug: "multimodal-return-forecasting",
    title:
      "Multi-Dimensional Return Forecasting & Dynamic Portfolio Management",
    institution: "Course project — Data Science & AI in Finance",
    category: ["Finance"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Multi-modal return forecasting framework combining market, fundamental, macroeconomic and financial-news sentiment signals for systematic portfolio construction and out-of-sample evaluation.",
    methods: [
      "OHLCV features",
      "Fundamental signals",
      "Macroeconomic variables",
      "FinBERT sentiment",
      "Walk-forward backtesting"
    ],
    result:
      "Leakage-aware multi-modal forecasting and portfolio construction evaluated using out-of-sample risk-adjusted performance.",
    repo: {
      url: "https://github.com/Charukhesh/multimodal-return-forecasting.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "shrinkage-hrp-portfolio",
    title:
      "Advanced Portfolio Optimization — Statistical & Structural Regularization",
    institution: "Course project — Data Science & AI in Finance",
    category: ["Finance", "Optimization"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Robust portfolio-construction study combining Ledoit-Wolf covariance shrinkage with Hierarchical Risk Parity to reduce covariance estimation error and improve allocation stability.",
    methods: [
      "Ledoit-Wolf covariance shrinkage",
      "Bootstrap resampling",
      "Hierarchical Risk Parity",
      "Out-of-sample evaluation"
    ],
    result:
      "Compared covariance stability, turnover and out-of-sample behavior against conventional Markowitz optimization.",
    repo: {
      url: "https://github.com/Charukhesh/shrinkage-hrp-portfolio.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "ensemble-learning",
    title: "Ensemble Learning",
    institution: "Course / independent project",
    category: ["Finance"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Comparative implementation and evaluation of ensemble-learning methods for predictive modeling.",
    methods: ["Ensemble Learning", "Python"],
    result:
      "Implemented and evaluated ensemble-based predictive models.",
    repo: {
      url: "https://github.com/Charukhesh/EnsembleLearning.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "roc-prc-analysis",
    title: "ROC / PRC Analysis",
    institution: "Course / independent project",
    category: ["Computer Vision"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Evaluation framework for binary classification models using ROC and Precision-Recall analysis across operating thresholds.",
    methods: ["ROC curves", "Precision-Recall curves", "Threshold analysis"],
    result:
      "Systematic threshold-based comparison of classifier operating characteristics.",
    repo: {
      url: "https://github.com/Charukhesh/ROC_PRC_Analysis.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "manifold-learning",
    title: "Manifold Learning",
    institution: "Course / independent project",
    category: ["Computer Vision"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Implementation and exploration of nonlinear dimensionality-reduction techniques for discovering low-dimensional structure in high-dimensional data.",
    methods: ["Manifold Learning", "Dimensionality Reduction", "Python"],
    result:
      "Visual and structural comparison of manifold-based representations.",
    repo: {
      url: "https://github.com/Charukhesh/ManifoldLearning.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "gmm-based-sampling",
    title: "GMM-Based Sampling",
    institution: "Course / independent project",
    category: ["Optimization"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Gaussian Mixture Model-based sampling framework for representing and generating samples from multimodal distributions.",
    methods: ["Gaussian Mixture Models", "Probabilistic Sampling", "Python"],
    result:
      "Generated samples capturing multimodal distribution structure using fitted mixture models.",
    repo: {
      url: "https://github.com/Charukhesh/GMMbasedSampling.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "data-driven-mor",
    title: "Data-Driven Model Order Reduction Techniques for Dynamic Systems",
    institution: "Course / independent project",
    category: ["Control", "System Identification", "Optimization"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Data-driven model-order reduction study for extracting compact dynamic representations from higher-order system behavior.",
    methods: [
      "Data-driven model reduction",
      "Dynamic-system identification",
      "Reduced-order modeling"
    ],
    result:
      "Constructed reduced-order representations while preserving relevant system dynamics.",
    repo: {
      url: "https://github.com/Charukhesh/DataDrivenMORs.git"
    },
    hasCaseStudy: false
  }
];

// ---------------------------------------------------------------------------
// ALL PROJECTS
// ---------------------------------------------------------------------------
export const allProjects = [...flagshipProjects, ...advancedProjects];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}