"use client";
import { useState } from "react";
import { Building2, Hammer, Home } from "lucide-react";
import Link from "next/link";
import VisitaTecnicaModal from "@/components/VisitaTecnicaModal";

const SERVICIOS = [
  {
    icon: Building2,
    titulo: "Estructuras",
    slug: "estructuras",
    descripcion:
      "Hacemos la base de tu vivienda, lo más importante para que todo lo demás funcione bien. Fundaciones, muros, estructuras y cubiertas, ejecutadas con criterio técnico y planificadas desde el inicio.",
  },
  {
    icon: Hammer,
    titulo: "Servicios de obra y terminaciones",
    slug: "terminaciones",
    descripcion:
      "Si ya empezaste o querés avanzar de a poco, trabajamos por etapas o en trabajos específicos. Terminaciones, instalaciones, revestimientos o sectores puntuales. Nos sumamos donde nos necesités.",
  },
  {
    icon: Home,
    titulo: "Obra completa – Método AM",
    slug: "obra-completa",
    descripcion:
      "Si estás por construir tu casa, te acompañamos en todo el proceso con nuestro Método AM: 4 etapas ordenadas según tu presupuesto, sin improvisar ni rehacer.",
  },
];

export default function ServiciosSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="servicios" className="py-20 bg-am-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-am-primary">
              ¿Cómo podemos ayudarte?
            </h2>
            <p className="text-am-muted mt-3 max-w-xl mx-auto">
              Nos adaptamos a lo que necesités, desde una parte puntual hasta la
              obra completa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICIOS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.titulo}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col"
                >
                  <div className="w-12 h-12 bg-am-primary/10 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-am-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-am-text mb-3">
                    {s.titulo}
                  </h3>
                  <p className="text-am-muted leading-relaxed text-sm flex-1">
                    {s.descripcion}
                  </p>
                  <button
                    onClick={() => setOpen(true)}
                    className="mt-6 text-am-secondary text-sm font-semibold hover:underline text-left"
                  >
                    Pedí tu visita técnica →
                  </button>
                  <Link
                    href={`/servicios/${s.slug}`}
                    className="mt-2 text-am-muted text-sm font-medium hover:text-am-primary hover:underline text-left transition-colors"
                  >
                    Ver más →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <VisitaTecnicaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
