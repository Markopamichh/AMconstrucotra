import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CTAFinalProyecto from "@/components/CTAFinalProyecto";

export const metadata: Metadata = {
  title: "Terminaciones y Obra por Etapas en Neuquén | AM Soluciones",
  description:
    "Terminaciones de obra, instalaciones y trabajos puntuales en Neuquén. Nos sumamos donde nos necesités, por etapas o en sectores específicos.",
  openGraph: {
    title: "Terminaciones y Obra por Etapas en Neuquén | AM Soluciones",
    description:
      "Revestimientos, instalaciones, terminaciones y trabajos puntuales en Neuquén. Avanzá de a poco y con orden. Consultanos.",
    locale: "es_AR",
    type: "website",
  },
};

export default function TerminacionesPage() {
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
              <span className="text-am-text font-medium">
                Terminaciones y obra por etapas
              </span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold text-am-primary">
              Terminaciones y obra por etapas en Neuquén
            </h1>
            <p className="mt-4 text-am-muted leading-relaxed max-w-2xl">
              Si ya empezaste o querés avanzar de a poco, trabajamos por etapas
              o en trabajos específicos. Nos sumamos donde nos necesités, sin
              necesidad de encarar toda la obra de una vez.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                Revestimientos y terminaciones en Neuquén
              </h2>
              <p className="text-am-muted leading-relaxed">
                Colocación de cerámicos, porcelanatos, revestimientos de
                paredes y cielorrasos. Trabajamos con terminaciones prolijas que
                elevan la calidad percibida de cada espacio, sin importar si es
                una habitación o toda la vivienda.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                Instalaciones eléctricas, sanitarias y de gas en Neuquén
              </h2>
              <p className="text-am-muted leading-relaxed">
                Realizamos instalaciones completas o parciales coordinando los
                distintos oficios. Planteamos el esquema antes de cerrar las
                paredes para evitar roturas innecesarias y asegurar que todo
                quede bien integrado.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-4">
                Trabajos puntuales: nos sumamos donde nos necesités
              </h2>
              <p className="text-am-muted leading-relaxed">
                No hace falta encarar toda la obra. Podemos trabajar en un
                sector específico, retomar una obra parada, o avanzar por etapas
                según tu presupuesto. La clave es ordenar bien cada paso para
                no tener que rehacer nada después.
              </p>
            </div>

            <div className="bg-am-bg rounded-2xl p-8 text-center">
              <p className="text-am-primary font-bold text-xl mb-2">
                ¿Querés avanzar con tu obra?
              </p>
              <p className="text-am-muted mb-6">
                Contanos en qué etapa estás y cómo podemos sumarnos.
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
                href="/servicios/estructuras"
                className="text-am-muted font-medium hover:text-am-secondary hover:underline transition-colors"
              >
                Ver Estructuras →
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
