import type { MetadataRoute } from "next"
import { dicas } from "@/content/dicas"
import { site } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/orcamento", "/politica-de-privacidade", "/termos-de-servico"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }))
  const dicaRoutes = dicas.map((d) => ({
    url: `${site.url}/dicas/${d.slug}`,
    lastModified: new Date(),
  }))
  return [...routes, ...dicaRoutes]
}
