import type { MetadataRoute } from "next";
import { createAdminClient } from "@/lib/supabase/admin";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://am-constructora.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/sobre-nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/galeria`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/servicios/estructuras`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/servicios/terminaciones`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/servicios/obra-completa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  let proyectoRoutes: MetadataRoute.Sitemap = [];

  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("proyectos")
      .select("slug, created_at")
      .eq("publicado", true);

    proyectoRoutes = (data ?? []).map((p) => ({
      url: `${BASE_URL}/proyectos/${p.slug}`,
      lastModified: new Date(p.created_at),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  }

  return [...staticRoutes, ...proyectoRoutes];
}
