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
    authors: "Rakesh · Charukhesh B R · Srinivasan N · Dandaria P · Tamat A · Rengaswamy R",
    venue: "Applied Energy (Elsevier)",
    status: "Under review"
  },
  {
    title: "Same body of work — accepted for presentation",
    authors: "Charukhesh B R, et al.",
    venue: "SGAI Conference, Lisbon, Portugal, 2026",
    status: "Accepted"
  }
];
