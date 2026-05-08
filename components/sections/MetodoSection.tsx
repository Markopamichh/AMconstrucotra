"use client";
import { useState } from "react";
import MetodoAMStepper from "@/components/MetodoAMStepper";
import VisitaTecnicaModal from "@/components/VisitaTecnicaModal";

export default function MetodoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="metodo" className="py-20 bg-am-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Obra completa desde cero – Método AM
            </h2>
            <p className="mt-4 text-blue-200 leading-relaxed">
              Una forma de trabajar que divide la obra en 4 etapas para que
              puedas avanzar de manera ordenada y según tu presupuesto, sin
              improvisar ni tener que rehacer cosas después.
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <MetodoAMStepper />
          </div>

          <div className="mt-12 text-center space-y-6">
            <p className="text-white font-bold text-lg">
              Cada etapa deja la casa lista para seguir, sin romper ni volver
              atrás.
            </p>
            <button
              onClick={() => setOpen(true)}
              className="bg-white text-am-primary font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Quiero construir con el Método AM
            </button>
          </div>
        </div>
      </section>

      <VisitaTecnicaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
