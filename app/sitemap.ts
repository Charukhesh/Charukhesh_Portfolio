import type { MetadataRoute } from "next";
import { flagshipProjects } from "@/data/projects";

const BASE_URL =
  "https://charukhesh.github.io/Charukhesh_Portfolio";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      priority: 1,
    },

    ...flagshipProjects.map((project) => ({
      url: `${BASE_URL}/projects/${project.slug}/`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}