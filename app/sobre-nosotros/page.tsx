import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import CTAFinalProyecto from "@/components/CTAFinalProyecto";

export const metadata: Metadata = {
  title: "Sobre Nosotros | AM Soluciones Constructivas — Constructora en Neuquén",
  description:
    "Conocé el equipo de AM Soluciones Constructivas. Constructora familiar en Neuquén con foco en claridad, orden y acompañamiento en cada obra.",
  openGraph: {
    title: "Sobre Nosotros | AM Soluciones Constructivas",
    description:
      "Somos una constructora familiar en Neuquén. Creemos que construir debería ser posible y ordenado. Conocé nuestra historia y valores.",
    locale: "es_AR",
    type: "website",
  },
};

export default function SobreNosotrosPage() {
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
              <span className="text-am-text font-medium">Sobre Nosotros</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold text-am-primary">
              Quiénes somos
            </h1>
            <p className="mt-4 text-am-muted leading-relaxed max-w-2xl">
              Somos AM Soluciones Constructivas, una constructora familiar con
              base en Neuquén. Trabajamos para que construir tu casa sea un
              proceso claro, ordenado y posible.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Historia */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-2xl font-bold text-am-primary mb-4">
                  Una constructora de Neuquén con foco en las personas
                </h2>
                <p className="text-am-muted leading-relaxed mb-4">
                  Nacimos con la convicción de que construir una vivienda no
                  debería ser una experiencia caótica. Vimos de cerca cómo
                  muchas personas comenzaban su obra sin información clara, sin
                  planificación y sin un equipo que los acompañe de verdad.
                </p>
                <p className="text-am-muted leading-relaxed">
                  Por eso creamos el Método AM: una forma de trabajar que divide
                  la obra en etapas ordenadas, con presupuesto claro en cada
                  paso y sin sorpresas en el camino.
                </p>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/img/Logo 1.png"
                  alt="AM Soluciones Constructivas — Constructora en Neuquén"
                  width={300}
                  height={300}
                  className="rounded-2xl object-contain"
                />
              </div>
            </div>

            {/* Valores */}
            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-8">
                Nuestros valores: claridad, orden y acompañamiento
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    title: "Claridad",
                    description:
                      "Explicamos qué se hace, cuánto cuesta y cuáles son los próximos pasos. Sin vueltas. Sin sorpresas.",
                  },
                  {
                    title: "Orden",
                    description:
                      "Planificamos cada etapa antes de arrancarla para que nada quede a mitad y no haya que rehacer.",
                  },
                  {
                    title: "Acompañamiento",
                    description:
                      "Estamos presentes en todo el proceso. No solo construimos: asesoramos y ordenamos cada decisión.",
                  },
                ].map((v) => (
                  <div
                    key={v.title}
                    className="bg-am-bg rounded-2xl p-6 border border-gray-100"
                  >
                    <h3 className="text-lg font-bold text-am-primary mb-2">
                      {v.title}
                    </h3>
                    <p className="text-am-muted text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Equipo */}
            <div>
              <h2 className="text-2xl font-bold text-am-primary mb-8">
                El equipo
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "Jeni",
                    role: "Coordinación de obra",
                    wa: "https://wa.me/5492994226380",
                    phone: "+54 9 2994 22-6380",
                  },
                  {
                    name: "Silvia",
                    role: "Atención al cliente",
                    wa: "https://wa.me/5492995230772",
                    phone: "+54 9 2995 23-0772",
                  },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="bg-am-bg rounded-2xl p-6 border border-gray-100 flex items-center gap-5"
                  >
                    <div className="w-14 h-14 bg-am-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-am-primary font-extrabold text-xl">
                        {p.name[0]}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-am-text">{p.name}</p>
                      <p className="text-am-muted text-sm">{p.role}</p>
                      <a
                        href={p.wa}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-am-whatsapp text-sm font-medium hover:underline mt-1 inline-block"
                      >
                        {p.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <Link
                href="/"
                className="text-am-secondary font-semibold hover:underline"
              >
                ← Volver al inicio
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
