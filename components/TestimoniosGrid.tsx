const TESTIMONIOS = [
  {
    nombre: "Nashira Buganém",
    texto:
      "Excelente asesoramiento personalizado. Cumplieron en tiempo y forma con los trabajos pedidos.",
  },
  {
    nombre: "Milcell Neuquén",
    texto:
      "Terminaron antes de tiempo, el trabajo quedó mejor de lo que esperaba. Muy buena comunicación. Muy recomendables.",
  },
  {
    nombre: "Andrés Cerda",
    texto:
      "Se cumplió en tiempo y forma. 55 metros de piso. La verdad, muy conformes.",
  },
  {
    nombre: "Natalia Ramos",
    texto:
      "Realizaron el revestimiento de mi quincho, pisos, pintura y sanitarios. Quedó hermoso todo.",
  },
  {
    nombre: "Ana Bravo",
    texto:
      "Responsabilidad, calidad de materiales y accesibles en presupuestos. La platea quedó excelente. Son de confianza.",
  },
  {
    nombre: "Valén Pino",
    texto:
      "Súper responsables, de confianza. Cumplen con su palabra. No duden en contratarlos.",
  },
];

export default function TestimoniosGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {TESTIMONIOS.map((t) => (
        <div
          key={t.nombre}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <span className="text-5xl font-serif text-am-primary leading-none select-none">
            &ldquo;
          </span>
          <p className="text-am-text leading-relaxed mt-1 text-sm">{t.texto}</p>
          <p className="mt-4 font-bold text-am-primary text-sm">{t.nombre}</p>
        </div>
      ))}
    </div>
  );
}
