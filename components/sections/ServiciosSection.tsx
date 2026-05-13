"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Building2, PaintBucket, Home, CheckCircle2, ArrowRight } from "lucide-react";
import VisitaTecnicaModal from "@/components/VisitaTecnicaModal";

const SERVICIOS = [
  {
    tag: "Bases Sólidas",
    imagen: "/img/platea.png",
    icon: Building2,
    titulo: "Fundaciones",
    descripcion: "Bases sólidas para proyectos seguros y duraderos.",
    items: ["Plateas", "Fundaciones", "Movimiento de suelo", "Estructuras base"],
    slug: "estructuras",
  },
  {
    tag: "Detalles que Suman",
    imagen: "/img/terminaciones.jpg",
    icon: PaintBucket,
    titulo: "Servicios y terminaciones",
    descripcion: "Resoluciones técnicas y terminaciones cuidadas para cada etapa de la obra.",
    items: ["Pintura", "Revestimientos", "Instalaciones", "Remodelaciones"],
    slug: "terminaciones",
  },
  {
    tag: "Proyectos Integrales",
    imagen: "https://images.unsplash.com/photo-1770756051811-1612ac8bedfa?w=800&q=80",
    icon: Home,
    titulo: "Obra completa",
    descripcion: "Coordinamos diseño, planificación y ejecución para desarrollar tu obra de principio a fin.",
    items: ["Viviendas", "Ampliaciones", "Dirección integral", "Llave en mano"],
    slug: "obra-completa",
  },
];

export default function ServiciosSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="servicios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-14">
            <span className="text-am-secondary text-xs font-bold uppercase tracking-widest">
              ¿Qué hacemos?
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-am-primary leading-tight">
              Soluciones para cada etapa de tu obra
            </h2>
            <p className="mt-4 text-am-muted max-w-2xl mx-auto leading-relaxed">
              Acompañamos proyectos de distintas escalas con un mismo enfoque:
              planificación clara, diseño funcional y ejecución ordenada.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICIOS.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.slug}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col"
                >
                  {/* Imagen con badge */}
                  <div className="relative h-52 shrink-0">
                    <Image
                      src={s.imagen}
                      alt={s.titulo}
                      fill
                      className="object-cover"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-am-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm">
                      {s.tag}
                    </span>
                  </div>

                  {/* Contenido */}
                  <div className="p-7 flex flex-col flex-1">
                    {/* Ícono */}
                    <div className="w-12 h-12 rounded-xl bg-am-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-am-primary" strokeWidth={1.5} />
                    </div>

                    {/* Título y descripción */}
                    <h3 className="text-xl font-bold text-am-text mb-2">{s.titulo}</h3>
                    <p className="text-sm text-am-muted leading-relaxed mb-5">{s.descripcion}</p>

                    {/* Lista de ítems */}
                    <ul className="space-y-2 mb-7">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-am-text">
                          <CheckCircle2 className="w-4 h-4 text-am-secondary shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* CTAs */}
                    <div className="mt-auto flex flex-wrap items-center gap-4 pt-2 border-t border-gray-100">
                      <Link
                        href={`/servicios/${s.slug}`}
                        className="inline-flex items-center gap-1.5 text-am-primary font-bold text-sm uppercase tracking-wide hover:text-am-secondary transition-colors"
                      >
                        Ver proyectos
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setOpen(true)}
                        className="text-sm text-am-muted font-medium hover:text-am-primary transition-colors"
                      >
                        Pedí tu visita técnica
                      </button>
                    </div>
                  </div>
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
