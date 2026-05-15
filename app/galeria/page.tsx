import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import GaleriaSection from "@/components/GaleriaSection";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Galería de Obras | AM Soluciones Constructivas — Neuquén",
  description:
    "Mirá obras reales en Neuquén: plateas, revestimientos, steel frame y obras completas ejecutadas por AM Soluciones Constructivas.",
  openGraph: {
    title: "Galería de Obras | AM Soluciones Constructivas",
    description:
      "Mirá obras reales en Neuquén: plateas, revestimientos, steel frame y obras completas ejecutadas por AM Soluciones Constructivas.",
    locale: "es_AR",
    type: "website",
  },
};

export default async function GaleriaPage() {
  const supabase = createAdminClient();
  const { data: items } = await supabase
    .from("galeria")
    .select("*")
    .order("orden", { ascending: true });

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-am-primary">
              Galería de trabajos
            </h1>
            <p className="text-am-muted mt-3 max-w-xl mx-auto">
              Cada imagen refleja el cuidado y la dedicación que ponemos en cada
              obra.
            </p>
          </div>
          <GaleriaSection items={items ?? []} />
        </div>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
