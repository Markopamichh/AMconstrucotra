"use client";
import { useState } from "react";
import VisitaTecnicaModal from "./VisitaTecnicaModal";

export default function CTAFinalProyecto() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="bg-am-primary py-16 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
            ¿Querés un proyecto similar?
          </h2>
          <p className="text-blue-200 mb-8">
            Contanos tu idea y coordinamos una visita técnica gratuita.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="bg-white text-am-primary font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
          >
            Pedí tu visita técnica
          </button>
        </div>
      </section>

      <VisitaTecnicaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
