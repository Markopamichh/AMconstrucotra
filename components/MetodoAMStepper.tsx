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

const STYLES = {
  dark: {
    circleBg: "bg-white/20",
    circleBorder: "border-white",
    numberText: "text-white",
    connector: "bg-white/20",
    title: "text-white",
    description: "text-blue-200",
  },
  light: {
    circleBg: "bg-am-primary/10",
    circleBorder: "border-am-primary",
    numberText: "text-am-primary",
    connector: "bg-am-primary/20",
    title: "text-am-primary",
    description: "text-am-muted",
  },
};

function StepItem({
  etapa,
  isLast,
  styles,
}: {
  etapa: (typeof ETAPAS)[0];
  isLast: boolean;
  styles: (typeof STYLES)["dark"];
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
      {/* Línea + círculo */}
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-full ${styles.circleBg} border-2 ${styles.circleBorder} flex items-center justify-center flex-shrink-0`}
        >
          <span className={`${styles.numberText} font-bold text-sm`}>
            {etapa.numero}
          </span>
        </div>
        {!isLast && (
          <div className={`w-px flex-1 ${styles.connector} mt-2 min-h-[40px]`} />
        )}
      </div>

      {/* Contenido */}
      <div
        ref={ref}
        className="fade-in pb-10"
        style={{ transitionDelay: `${parseInt(etapa.numero) * 100}ms` }}
      >
        <h3 className={`text-xl font-bold ${styles.title} mb-2`}>
          {etapa.titulo}
        </h3>
        <p className={`${styles.description} leading-relaxed`}>
          {etapa.descripcion}
        </p>
      </div>
    </div>
  );
}

export default function MetodoAMStepper({
  variant = "dark",
}: {
  variant?: "dark" | "light";
}) {
  const styles = STYLES[variant];
  return (
    <div>
      {ETAPAS.map((etapa, i) => (
        <StepItem
          key={etapa.numero}
          etapa={etapa}
          isLast={i === ETAPAS.length - 1}
          styles={styles}
        />
      ))}
    </div>
  );
}
