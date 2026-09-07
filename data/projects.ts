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
    title: "Endogenous Multi-Objective Optimization and Risk Assessment of HRES",
    institution: "IIT Madras, with Hero Future Energies",
    advisor: "Prof. Raghunathan Rengaswamy",
    category: ["Optimization", "Finance"],
    type: "Research",
    status: "industry",
    featured: true,
    summary: "A two-stage framework for sizing hybrid renewable energy systems that embeds IRR, asymmetric PPA penalties, and battery degradation directly into the optimization, rigorously stress tested via a high fidelity probabilistic weather generator.",
    methods: [
      "Endogenous NSGA-II Sizing",
      "Delta-Distribution GMM",
      "Conditional Probabilistic Clustering",
      "15-year Monte Carlo Simulation",
      "Kullback-Leibler Convergence"
    ],
    result: "Demonstrated that deterministic sizing creates an efficiency trap, whereas probabilistic risk assessment quantifies the exact financial value of excess generation buffers.",
    repo: {
      url: null,
      note: "Research collaboration (Proprietary)"
    },
    hasCaseStudy: true
  },

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

  {
    slug: "adaptive-kalman-rls",
    title: "An Adaptive Kalman Filter Integrating RLS-Inspired and Physics-Informed Methods",
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

// ADVANCED ENGINEERING — compact projects without dedicated case studies
export const advancedProjects: Project[] = [
  // --- DEFAULT VISIBLE (TOP 3) ---
  {
    slug: "shrinkage-hrp-portfolio",
    title: "Advanced Portfolio Optimization | Statistical & Structural Regularization",
    institution: "Course project — Data Science & AI in Finance",
    category: ["Finance", "Optimization"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Implemented a robust portfolio allocation framework that mitigates covariance estimation error by integrating Ledoit-Wolf shrinkage with Hierarchical Risk Parity (HRP).",
    methods: [
      "Ledoit-Wolf covariance shrinkage",
      "Hierarchical Risk Parity",
      "Bootstrap resampling"
    ],
    result:
      "Demonstrated superior out-of-sample stability and lower portfolio turnover compared to standard Markowitz mean-variance optimization.",
    repo: {
      url: "https://github.com/Charukhesh/shrinkage-hrp-portfolio.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "transformer-from-scratch",
    title: "Transformer from Scratch | German → English NMT",
    institution: "Course project — Deep Learning",
    advisor: "Prof. Ganapathy S",
    category: ["LLM/NLP"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Built the original 'Attention Is All You Need' architecture purely in PyTorch, featuring custom 8-head causal/cross attention, sinusoidal positional encodings, and a WordPiece tokenizer.",
    methods: ["PyTorch", "Multi-Head Attention", "WordPiece Tokenizer"],
    result:
      "Trained a compact 256-dimensional encoder-decoder model achieving stable cross-entropy convergence for German-to-English translation.",
    repo: {
      url: "https://github.com/Charukhesh/pure-pytorch-transformer-nmt.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "smc-landing",
    title: "Thrust-Limited Sliding-Mode Guidance for safe & precision landing",
    institution: "Independent / coursework",
    category: ["Control", "Aerospace"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Developed a nonlinear Sliding-Mode Control (SMC) guidance law for planetary powered-descent, explicitly handling strict actuator thrust-saturation constraints.",
    methods: ["Sliding-Mode Control", "Nonlinear Dynamics", "MATLAB"],
    result:
      "Simulated in MATLAB to achieve precision pinpoint landing with zero terminal velocity and zero altitude steady-state error.",
    repo: {
      url: "https://github.com/Charukhesh/SMC_Landing"
    },
    hasCaseStudy: false
  },

  // --- HIDDEN BEHIND DROPDOWN ---
  {
    slug: "unified-multitask-vision",
    title: "Unified Multi-Task Vision | recognition, localization & segmentation",
    institution: "Course project — Deep Learning",
    advisor: "Prof. Ganapathy S",
    category: ["Computer Vision"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Architected a single-backbone vision model using a shared VGG16 encoder branched into multiple specialized heads for 37-class recognition, bounding-box localization, and U-Net style dense segmentation.",
    methods: ["PyTorch", "VGG16", "U-Net", "IoU/Dice loss"],
    result:
      "Optimized a joint loss function (Cross-Entropy, MSE, and IoU/Dice) to achieve efficient multi-task inference without separate networks.",
    repo: {
      url: "https://github.com/Charukhesh/multitask-vision-pipeline.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "embedding-quality-moe",
    title: "Embedding-Based Quality Prediction | Mixture-of-Experts",
    institution: "Course project — Data Analytics Laboratory",
    advisor: "Prof. Sudarsan S",
    category: ["MLOps"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Engineered a response-metric quality predictor by generating negative samples across multi-modal embeddings using cosine similarity thresholds.",
    methods: ["LightGBM", "Mixture-of-Experts", "Embeddings"],
    result:
      "Trained a calibrated, gated Mixture-of-Experts (MoE) ensemble of LightGBM regressors, outperforming single global baselines.",
    repo: {
      url: "https://github.com/Charukhesh/MetricLearning"
    },
    hasCaseStudy: false
  },

  {
    slug: "multimodal-return-forecasting",
    title: "Multi-Dimensional Return Forecasting & Dynamic Portfolio Management",
    institution: "Course project — Data Science & AI in Finance",
    category: ["Finance"],
    type: "Course",
    status: "completed",
    featured: false,
    summary:
      "Constructed a systematic trading strategy leveraging OHLCV momentum, macro-economic indicators, and FinBERT-extracted news sentiment.",
    methods: [
      "OHLCV features",
      "Macroeconomic signals",
      "FinBERT sentiment",
      "Walk-forward backtesting"
    ],
    result:
      "Evaluated alpha generation using walk-forward backtesting to ensure strict avoidance of look-ahead bias and data leakage.",
    repo: {
      url: "https://github.com/Charukhesh/multimodal-return-forecasting.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "ensemble-learning",
    title: "Ensemble Regression for Bike Share Demand",
    institution: "Course / independent project",
    category: ["Finance"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Modeled highly seasonal urban mobility demand by evaluating advanced tree-based ensemble regressors (Random Forest, Gradient Boosting, XGBoost).",
    methods: ["Ensemble Learning", "XGBoost", "Python"],
    result:
      "Captured nonlinear temporal features and weather interactions to minimize cross-validated RMSE against linear baselines.",
    repo: {
      url: "https://github.com/Charukhesh/EnsembleLearning.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "roc-prc-analysis",
    title: "Landsat Classification | ROC & PRC Analysis",
    institution: "Course / independent project",
    category: ["Computer Vision"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Built an evaluation pipeline for remote sensing (Landsat) binary classification, analyzing operational threshold sensitivity via ROC and Precision-Recall characteristics.",
    methods: ["ROC curves", "Precision-Recall curves", "Threshold analysis"],
    result:
      "Quantified model trade-offs in highly imbalanced spatial datasets where standard accuracy metrics fail.",
    repo: {
      url: "https://github.com/Charukhesh/ROC_PRC_Analysis.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "manifold-learning",
    title: "Manifold Learning on Yeast Gene Expression",
    institution: "Course / independent project",
    category: ["Computer Vision"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Applied nonlinear dimensionality reduction (PCA, t-SNE, ISOMAP, LLE) to high-dimensional genomic expression datasets.",
    methods: ["Manifold Learning", "Dimensionality Reduction", "Python"],
    result:
      "Extracted underlying low-dimensional topological manifolds to discover localized functional gene clusters.",
    repo: {
      url: "https://github.com/Charukhesh/ManifoldLearning.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "gmm-based-sampling",
    title: "GMM-Based Synthetic Sampling for Fraud Detection",
    institution: "Course / independent project",
    category: ["Optimization"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Addressed severe class imbalance in financial fraud datasets by fitting Expectation-Maximization Gaussian Mixture Models (GMM) to minority distributions.",
    methods: ["Gaussian Mixture Models", "Probabilistic Sampling", "Python"],
    result:
      "Generated statistically coherent synthetic fraud samples to stabilize downstream classifier decision boundaries.",
    repo: {
      url: "https://github.com/Charukhesh/GMMbasedSampling.git"
    },
    hasCaseStudy: false
  },

  {
    slug: "data-driven-mor",
    title: "Data-Driven Model Order Reduction for Dynamic Systems",
    institution: "Course / independent project",
    category: ["Control", "System Identification", "Optimization"],
    type: "Personal",
    status: "completed",
    featured: false,
    summary:
      "Extracted compact, low-dimensional dynamic representations from high-order systems using data-driven subspace identification and Proper Orthogonal Decomposition (POD).",
    methods: [
      "Data-driven model reduction",
      "Dynamic-system identification",
      "Proper Orthogonal Decomposition"
    ],
    result:
      "Preserved dominant transient dynamics and frequency responses while drastically reducing computational simulation complexity.",
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