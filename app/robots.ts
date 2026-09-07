import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://charukhesh.github.io/Charukhesh_Portfolio/sitemap.xml',
  }
}