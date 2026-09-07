import { MetadataRoute } from 'next'
import { flagshipProjects } from '../data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://charukhesh.github.io/Charukhesh_Portfolio'

  // Add the homepage
  const routes = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
  ]

  // Automatically add all your detailed case study pages!
  const projectRoutes = flagshipProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'yearly' as const,
    priority: 0.8,
  }))

  return [...routes, ...projectRoutes]
}