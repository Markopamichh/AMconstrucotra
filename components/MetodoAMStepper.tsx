"use client";
import { useEffect, useRef } from "react";

const ETAPAS = [
  {
    numero: "01",
    titulo: "Base y estructura",
    descripcion:
      "Platea de hormigón H21, muros de ladrillo macizo, columnas, encadenados y cubierta liviana. La base para que todo lo demás funcione.",
  },
  {
    numero: "02",
    titulo: "Instalaciones",
    descripcion:
      "Electricidad, agua fría y caliente, cloacas y gas. Todo según el diseño y gusto del propietario.",
  },
  {
    numero: "03",
    titulo: "Interior de la vivienda",
    descripcion:
      "Tabiquería en seco con perfilería de acero galvanizado, aislante termoacústico y placas de yeso. Cielorraso y carpeta niveladora.",
  },
  {
    numero: "04",
    titulo: "Terminaciones finales",
    descripcion:
      "Revestimientos, artefactos, pintura y todo lo necesario para dejar la vivienda completamente funcional.",
  },
];

function StepItem({
  etapa,
  isLast,
}: {
  etapa: (typeof ETAPAS)[0];
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex gap-6">
      {/* Line + circle */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-white flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">{etapa.numero}</span>
        </div>
        {!isLast && <div className="w-px flex-1 bg-white/20 mt-2 min-h-[40px]" />}
      </div>

      {/* Content */}
      <div
        ref={ref}
        className="fade-in pb-10"
        style={{ transitionDelay: `${parseInt(etapa.numero) * 100}ms` }}
      >
        <h3 className="text-xl font-bold text-white mb-2">{etapa.titulo}</h3>
        <p className="text-blue-200 leading-relaxed">{etapa.descripcion}</p>
      </div>
    </div>
  );
}

export default function MetodoAMStepper() {
  return (
    <div>
      {ETAPAS.map((etapa, i) => (
        <StepItem key={etapa.numero} etapa={etapa} isLast={i === ETAPAS.length - 1} />
      ))}
    </div>
  );
}
