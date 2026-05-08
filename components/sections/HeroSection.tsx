"use client";
import { useState } from "react";
import VisitaTecnicaModal from "@/components/VisitaTecnicaModal";

export default function HeroSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')",
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-am-primary/65" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight text-balance">
            Construimos de forma clara, ordenada y a tu ritmo
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed text-balance">
            En AM Soluciones Constructivas entendemos que construir puede ser
            abrumador. Por eso trabajamos de una manera distinta: acompañamos
            cada proyecto desde el inicio, explicando y ordenando para que el
            proceso sea simple y posible.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-am-primary font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors text-base"
            >
              Pedí tu visita técnica
            </button>
            <a
              href="#proyectos"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </section>

      <VisitaTecnicaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
