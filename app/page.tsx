import { createServerClient } from "@/lib/supabase/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GaleriaGrid from "@/components/GaleriaGrid";
import GaleriaSection from "@/components/GaleriaSection";
import TestimoniosGrid from "@/components/TestimoniosGrid";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import HeroSection from "@/components/sections/HeroSection";
import ServiciosSection from "@/components/sections/ServiciosSection";
import MetodoSection from "@/components/sections/MetodoSection";
import FormaSection from "@/components/sections/FormaSection";
import ContactoSection from "@/components/sections/ContactoSection";
import Link from "next/link";

export const revalidate = 0;

async function getProyectos() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  const supabase = createServerClient();
  const { data } = await supabase
    .from("proyectos")
    .select("id, titulo, slug, descripcion_corta, categoria, imagen_portada, destacado, orden")
    .eq("destacado", true)
    .order("orden", { ascending: true })
    .limit(6);
  return data ?? [];
}

async function getGaleriaPreview() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return [];
  const supabase = createServerClient();
  const { data } = await supabase
    .from("galeria")
    .select("*")
    .order("orden", { ascending: true })
    .limit(6);
  return data ?? [];
}

export default async function Home() {
  const [proyectos, galeriaItems] = await Promise.all([
    getProyectos(),
    getGaleriaPreview(),
  ]);

  return (
    <>
      <Navbar />
      <main id="inicio">
        <HeroSection />
        <ServiciosSection />
        <MetodoSection />
        <FormaSection />

        {/* Proyectos */}
        <section id="proyectos" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-10 text-center">
              <h2 className="text-3xl md:text-4xl font-extrabold text-am-primary">
                Proyectos realizados
              </h2>
              <p className="text-am-muted mt-3 max-w-xl mx-auto">
                Cada obra es distinta. Estas son algunas de las nuestras.
              </p>
            </div>
            <GaleriaGrid proyectos={proyectos} />
          </div>
        </section>

        {/* Galería */}
        {galeriaItems.length > 0 && (
          <section id="galeria" className="py-20 bg-am-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <h2 className="text-3xl md:text-4xl font-extrabold text-am-primary">
                  Galería
                </h2>
                <p className="text-am-muted mt-3 max-w-xl mx-auto">
                  Detalles y momentos de nuestras obras.
                </p>
              </div>
              <GaleriaSection items={galeriaItems} />
              <div className="text-center mt-10">
                <Link
                  href="/galeria"
                  className="inline-flex items-center gap-2 bg-am-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-am-secondary transition-colors"
                >
                  Ver galería completa →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Testimonios */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-extrabold text-am-primary text-center mb-12">
              Lo que dicen nuestros clientes
            </h2>
            <TestimoniosGrid />
          </div>
        </section>

        <ContactoSection />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
