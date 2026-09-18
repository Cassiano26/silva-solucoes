import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { SITE_URL } from "@/lib/site";

interface SlugDoc {
  slug: string;
  _updatedAt: string;
}

async function fetchSlugs(type: "category" | "product"): Promise<SlugDoc[]> {
  try {
    return await client.fetch(
      `*[_type == $type && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
      { type },
      { next: { revalidate: 3600 } }
    );
  } catch {
    // Sanity indisponível no build: o sitemap sai só com as rotas estáticas.
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${SITE_URL}/sobre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/bombas-e-motores`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const [categories, products] = await Promise.all([
    fetchSlugs("category"),
    fetchSlugs("product"),
  ]);

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/produtos/${c.slug}`,
    lastModified: new Date(c._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/produto/${p.slug}`,
    lastModified: new Date(p._updatedAt),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
