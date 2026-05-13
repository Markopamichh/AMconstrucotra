import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CTAFinalProyecto from "@/components/CTAFinalProyecto";
import MetodoAMStepper from "@/components/MetodoAMStepper";

export const metadata: Metadata = {
  title: "Obra Completa en Neuquén — Método AM | AM Soluciones Constructivas",
  description:
    "Construí tu casa en Neuquén con el Método AM: 4 etapas ordenadas, sin improvisar ni rehacer. Sistema mixto, steel frame y acompañamiento completo.",
  openGraph: {
    title: "Obra Completa en Neuquén — Método AM | AM Soluciones",
    description:
      "Obra completa para tu vivienda en Neuquén. Método AM: 4 etapas ordenadas según tu presupuesto. Sistema mixto y steel frame. Consultanos.",
    locale: "es_AR",
    type: "website",
  },
};

export default function ObraCompletaPage() {
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
              <span className="text-am-text font-medium">Obra Completa</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold text-am-primary">
              Obra completa en Neuquén — Método AM
            </h1>
            <p className="mt-4 text-am-muted leading-relaxed max-w-2xl">
              Si estás por construir tu casa, te acompañamos en todo el proceso
              con nuestro Método AM: 4 etapas ordenadas según tu presupuesto,
              sin improvisar ni rehacer. Desde la platea hasta las terminaciones.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                El Método AM: construir sin improvisar
              </h2>
              <p className="text-am-muted leading-relaxed">
                Dividimos la obra completa en 4 etapas lógicas que podés
                financiar de forma independiente. Cada etapa deja la casa lista
                para seguir, sin romper ni volver atrás. Sabés cuánto cuesta
                cada paso antes de arrancarlo.
              </p>
            </div>

            <MetodoAMStepper variant="light" />

            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                Sistema mixto y steel frame en Neuquén
              </h2>
              <p className="text-am-muted leading-relaxed">
                Combinamos construcción tradicional con sistema en seco (steel
                frame) para lograr obras más eficientes, con mejor aislación
                térmica y tiempos de ejecución más cortos. El sistema mixto nos
                permite adaptar la técnica a cada proyecto y presupuesto.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                4 etapas ordenadas según tu presupuesto
              </h2>
              <p className="text-am-muted leading-relaxed">
                No hace falta tener todo el dinero antes de empezar. Con el
                Método AM podés avanzar etapa por etapa según tus posibilidades.
                Planificamos juntos el ritmo de la obra para que cada peso que
                invertís se use de la manera más eficiente.
              </p>
            </div>

            <div className="bg-am-bg rounded-2xl p-8 text-center">
              <p className="text-am-primary font-bold text-xl mb-2">
                ¿Querés construir tu casa con el Método AM?
              </p>
              <p className="text-am-muted mb-6">
                Contanos tu proyecto y coordinamos una visita técnica gratuita
                en Neuquén.
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
                href="/servicios/terminaciones"
                className="text-am-muted font-medium hover:text-am-secondary hover:underline transition-colors"
              >
                Ver Terminaciones →
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
