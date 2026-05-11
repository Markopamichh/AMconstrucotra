import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CTAFinalProyecto from "@/components/CTAFinalProyecto";

export const metadata: Metadata = {
  title: "Construcción de Plateas y Fundaciones en Neuquén | AM Soluciones",
  description:
    "Plateas de hormigón, fundaciones, muros y cubiertas en Neuquén. Ejecutamos la base de tu vivienda con criterio técnico y planificación desde el inicio.",
  openGraph: {
    title: "Construcción de Plateas y Fundaciones en Neuquén | AM Soluciones",
    description:
      "Construcción de plateas, fundaciones y estructuras en Neuquén. Trabajo técnico, planificado y sin improvisaciones. Consultanos.",
    locale: "es_AR",
    type: "website",
  },
};

export default function EstructurasPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        <section className="bg-am-bg py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="text-sm text-am-muted mb-6 flex items-center gap-1.5">
              <Link href="/" className="hover:text-am-secondary transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <span className="text-am-text font-medium">Estructuras</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold text-am-primary">
              Construcción de plateas y fundaciones en Neuquén
            </h1>
            <p className="mt-4 text-am-muted leading-relaxed max-w-2xl">
              La base de tu vivienda es lo más importante. Hacemos fundaciones,
              muros, estructuras y cubiertas ejecutadas con criterio técnico y
              planificadas desde el inicio para que todo lo demás funcione bien.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                Fundaciones en Neuquén: la decisión más importante de tu obra
              </h2>
              <p className="text-am-muted leading-relaxed">
                Una fundación bien hecha define el comportamiento de toda la
                estructura. Trabajamos con platea de hormigón H21, encadenados
                y columnas dimensionados según el terreno y la carga de la
                vivienda. Sin improvisaciones, sin atajos.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                Muros y estructura resistente
              </h2>
              <p className="text-am-muted leading-relaxed">
                Levantamos muros de ladrillo macizo o hueco según el proyecto,
                con columnas de hormigón y encadenados que dan rigidez y
                resistencia a toda la construcción. Cada etapa queda lista para
                continuar sin romper ni rehacer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                Cubiertas livianas para tu vivienda
              </h2>
              <p className="text-am-muted leading-relaxed">
                Completamos la estructura con cubierta liviana pensada para
                compatibilizar con la segunda etapa de instalaciones. Así
                avanzás de manera ordenada y sin gastos innecesarios.
              </p>
            </div>

            <div className="bg-am-bg rounded-2xl p-8 text-center">
              <p className="text-am-primary font-bold text-xl mb-2">
                ¿Querés arrancar con la estructura de tu casa?
              </p>
              <p className="text-am-muted mb-6">
                Coordinamos una visita técnica gratuita a tu terreno en Neuquén.
              </p>
              <a
                href="https://wa.me/5492994226380"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-am-whatsapp text-white font-bold px-8 py-4 rounded-xl hover:brightness-90 transition-all"
              >
                Consultá por WhatsApp
              </a>
            </div>

            <div className="pt-4 border-t border-gray-100 flex gap-6">
              <Link
                href="/"
                className="text-am-secondary font-semibold hover:underline"
              >
                ← Volver al inicio
              </Link>
              <Link
                href="/servicios/obra-completa"
                className="text-am-muted font-medium hover:text-am-secondary hover:underline transition-colors"
              >
                Ver Obra Completa →
              </Link>
            </div>
          </div>
        </section>

        <CTAFinalProyecto />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
