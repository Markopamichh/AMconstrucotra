import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatCategoria, CATEGORIA_COLORS } from "@/lib/utils/formatCategoria";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CTAFinalProyecto from "@/components/CTAFinalProyecto";
import GaleriaLightbox from "@/components/GaleriaLightbox";
import StructuredData from "@/components/seo/StructuredData";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  const supabase = createAdminClient();
  const { data } = await supabase.from("proyectos").select("slug");
  return data?.map(({ slug }: { slug: string }) => ({ slug })) ?? [];
}

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://am-constructora.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return {};
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("proyectos")
    .select("titulo, descripcion_corta, imagen_portada, categoria")
    .eq("slug", params.slug)
    .single();

  if (!data) return {};

  const categoriaLabel = data.categoria ? formatCategoria(data.categoria) : "Proyecto";
  const description =
    data.descripcion_corta ??
    `${categoriaLabel} en Neuquén ejecutado por AM Soluciones Constructivas. Mirá el resultado.`;
  const title = `${data.titulo} — ${categoriaLabel} en Neuquén | AM Soluciones`;
  const image = data.imagen_portada ?? `${BASE_URL}/img/logosinfondo.jpeg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      locale: "es_AR",
      type: "website",
      url: `${BASE_URL}/proyectos/${params.slug}`,
      siteName: "AM Soluciones Constructivas",
      images: [{ url: image, alt: data.titulo }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function ProyectoDetallePage({
  params,
}: {
  params: { slug: string };
}) {
  const supabase = createServerClient();
  const { data: proyecto } = await supabase
    .from("proyectos")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!proyecto) notFound();

  const badgeColor = proyecto.categoria
    ? CATEGORIA_COLORS[proyecto.categoria] ?? "bg-gray-100 text-gray-800"
    : "";

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Proyectos", item: `${BASE_URL}/#proyectos` },
      { "@type": "ListItem", position: 3, name: proyecto.titulo, item: `${BASE_URL}/proyectos/${proyecto.slug ?? params.slug}` },
    ],
  };

  const projectLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: proyecto.titulo,
    description: proyecto.descripcion_corta ?? proyecto.descripcion ?? undefined,
    image: proyecto.imagen_portada ?? undefined,
    provider: {
      "@type": "GeneralContractor",
      name: "AM Soluciones Constructivas",
      url: BASE_URL,
    },
    locationCreated: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Neuquén", addressCountry: "AR" } },
  };

  return (
    <>
      <StructuredData data={breadcrumbLd} />
      <StructuredData data={projectLd} />
      <Navbar />
      <main className="pt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-am-muted mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-am-secondary transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/#proyectos"
              className="hover:text-am-secondary transition-colors"
            >
              Proyectos
            </Link>
            <span>/</span>
            <span className="text-am-text font-medium truncate">{proyecto.titulo}</span>
          </nav>

          {/* Header */}
          <div className="mb-8">
            <div className="flex items-start gap-3 flex-wrap">
              <h1 className="text-3xl md:text-4xl font-extrabold text-am-primary flex-1">
                {proyecto.titulo}
              </h1>
              {proyecto.categoria && (
                <span
                  className={`text-xs font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full flex-shrink-0 ${badgeColor}`}
                >
                  {formatCategoria(proyecto.categoria)}
                </span>
              )}
            </div>
            {proyecto.descripcion && (
              <p className="mt-4 text-am-muted leading-relaxed text-base max-w-3xl">
                {proyecto.descripcion}
              </p>
            )}
          </div>

          {/* Galería */}
          {proyecto.imagenes && proyecto.imagenes.length > 0 && (
            <div className="mb-12">
              <GaleriaLightbox imagenes={proyecto.imagenes} titulo={proyecto.titulo} />
            </div>
          )}

          {/* Antes / Después */}
          {proyecto.imagen_antes && proyecto.imagen_despues && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-am-primary mb-4">
                Antes y Después
              </h2>
              <BeforeAfterSlider
                antes={proyecto.imagen_antes}
                despues={proyecto.imagen_despues}
              />
            </div>
          )}

          {/* Back */}
          <div className="flex items-center justify-between flex-wrap gap-4 mt-10 pt-8 border-t border-gray-100">
            <Link
              href="/#proyectos"
              className="text-am-secondary font-semibold hover:underline flex items-center gap-1"
            >
              ← Volver a proyectos
            </Link>
          </div>
        </div>

        {/* CTA final */}
        <CTAFinalProyecto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
