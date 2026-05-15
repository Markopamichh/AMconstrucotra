"use client";
import { useState } from "react";
import Image from "next/image";
import { CalendarDays, ArrowRight, MapPin } from "lucide-react";
import VisitaTecnicaModal from "@/components/VisitaTecnicaModal";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="flex flex-col lg:flex-row mt-16 lg:h-[calc(100vh-4rem)]">

        {/* Texto — aparece arriba en mobile (order-2), izquierda en desktop */}
        <div className="order-2 lg:order-1 w-full lg:w-[45%] bg-[#F5F7FA] flex flex-col justify-center items-center lg:items-start text-center lg:text-left px-6 sm:px-10 md:px-14 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-0">

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-am-primary leading-[1.08] tracking-tight max-w-lg lg:max-w-none">
            Construimos de forma clara, ordenada y a tu ritmo
          </h1>

          <p className="mt-5 text-am-muted text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
            En AM Soluciones Constructivas entendemos que construir puede ser
            abrumador. Por eso acompañamos cada proyecto desde el inicio,
            explicando y ordenando para que el proceso sea simple y posible.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center gap-2 border-2 border-am-primary text-am-primary font-bold px-6 py-3.5 rounded-xl hover:bg-am-primary hover:text-white transition-all text-sm uppercase tracking-wide"
            >
              <CalendarDays className="w-4 h-4 shrink-0" />
              Pedí tu visita técnica
            </button>
            <a
              href="#proyectos"
              className="inline-flex items-center justify-center gap-2 text-am-primary font-bold px-6 py-3.5 rounded-xl hover:bg-am-primary/10 transition-colors text-sm uppercase tracking-wide"
            >
              Ver proyectos
              <ArrowRight className="w-4 h-4 shrink-0" />
            </a>
          </div>
        </div>

        {/* Foto — aparece arriba en mobile (order-1), derecha en desktop */}
        <div className="order-1 lg:order-2 relative w-full lg:w-[55%] h-60 sm:h-72 md:h-80 lg:h-full overflow-hidden">
          <Image
            src="/img/hero.jpeg"
            alt="Obra de construcción en proceso — AM Soluciones Constructivas Neuquén"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Fade inferior en mobile */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#F5F7FA] pointer-events-none z-10 lg:hidden" />
          {/* Fade izquierdo en desktop — hacia el panel de texto */}
          <div className="absolute inset-y-0 left-0 w-40 xl:w-56 bg-gradient-to-r from-[#F5F7FA] to-transparent pointer-events-none z-10 hidden lg:block" />
          {/* Badge ubicación */}
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center gap-1.5 bg-white/85 backdrop-blur-sm text-am-primary text-xs tracking-widest uppercase font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <MapPin className="w-3 h-3 text-am-secondary shrink-0" />
            Alto Valle — hasta 50 km
          </div>
        </div>

      </section>

      <VisitaTecnicaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
