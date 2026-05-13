import { MessageCircle, PenLine, ClipboardList, HardHat, KeyRound } from "lucide-react";

const PASOS = [
  { num: "01", label: "Escuchamos",   sub: "Entendemos tu idea y tus necesidades",   icon: MessageCircle },
  { num: "02", label: "Diseñamos",    sub: "Damos forma y orden a tu proyecto",       icon: PenLine },
  { num: "03", label: "Planificamos", sub: "Organizamos cada etapa y los recursos",   icon: ClipboardList },
  { num: "04", label: "Construimos",  sub: "Ejecutamos con calidad y compromiso",     icon: HardHat },
  { num: "05", label: "Entregamos",   sub: "Espacio listo para disfrutar",            icon: KeyRound },
];

export default function PasosStrip() {
  return (
    <section className="bg-white border-y border-gray-100 overflow-x-auto">
      {/* min-w-[640px] evita que el grid colapse en pantallas muy pequeñas; overflow-x-auto del section lo scrollea */}
      <div className="grid grid-cols-5 divide-x divide-gray-100 min-w-[640px]">
        {PASOS.map((paso) => {
          const Icon = paso.icon;
          return (
            <div
              key={paso.num}
              className="flex flex-col gap-2 px-4 sm:px-6 py-6 sm:py-8"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-extrabold text-am-secondary leading-none">
                  {paso.num}.
                </span>
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-am-muted" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-am-text uppercase tracking-wide">
                {paso.label}
              </span>
              <span className="text-xs text-am-muted leading-snug">
                {paso.sub}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
