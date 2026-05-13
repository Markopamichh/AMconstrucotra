import { Layers, Wrench, Home } from "lucide-react";

const ITEMS = [
  {
    icon: Layers,
    titulo: "Fundaciones",
    descripcion: "Bases sólidas para construcciones seguras y duraderas.",
  },
  {
    icon: Wrench,
    titulo: "Servicios",
    descripcion: "Instalaciones eficientes y seguras que hacen posible tu proyecto.",
  },
  {
    icon: Home,
    titulo: "Obra Completa",
    descripcion: "Nos encargamos de todo el proceso para que vos solo disfrutes el resultado.",
  },
];

export default function ServiciosRapidos() {
  return (
    <section className="bg-[#F5F7FA] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          {ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.titulo}
                className="flex items-start gap-4 sm:gap-5 px-4 sm:px-8 py-8 sm:py-10"
              >
                <div className="shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-am-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-am-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-am-text uppercase tracking-widest mb-1.5">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-am-muted leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
