export interface Publication {
  title: string;
  authors: string;
  venue: string;
  status: "Under review" | "Accepted" | "Published";
  link?: string;
}

export const publications: Publication[] = [
  {
    title:
      "Contractual and resource-aware capacity optimization for hybrid renewable energy systems (HRES) with storage",
    authors: "Rakesh, Charukhesh Balaji and Srinivasan, Ranganathan and Dandoria, Prakash and Tomar, Atul and Rengaswamy, R.",
    venue: "Applied Energy (Elsevier)",
    status: "Under review"
  },
  {
    title: "Same body of work — accepted for virtual presentation",
    authors: "Rakesh, Charukhesh Balaji and Srinivasan, Ranganathan and Rengaswamy, R.",
    venue: "Global Academic Research Institute (GARI) Conference, Lisbon, Portugal, 2026",
    status: "Accepted"
  },
  {
    title: "Endogenous Multi-Objective Optimization and Risk Assessment of Hybrid Renewable Energy Systems via GMM and Conditional Clustering",
    authors: "Rakesh, Charukhesh Balaji and Srinivasan, Ranganathan and Rengaswamy, R.",
    venue: "International Conference on Renewable Energy Research and Applications (ICRERA) 2026, Paris, France",
    status: "Accepted"
  }
];
