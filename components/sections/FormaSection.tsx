import Image from "next/image";

export default function FormaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-am-primary mb-6">
              Nuestra forma de trabajar
            </h2>
            <div className="space-y-4 text-am-muted leading-relaxed">
              <p>
                Combinamos construcción tradicional con sistema en seco para
                lograr algo simple pero clave: una obra más ordenada, más
                eficiente y pensada a futuro.
              </p>
              <p>
                Vas a entender qué se está haciendo, cuánto cuesta y cuáles
                son los próximos pasos. Sin vueltas. Sin sorpresas.
              </p>
            </div>
            <div className="mt-8">
              <p className="text-2xl font-extrabold text-am-secondary">
                Cerca tuyo en todo el proceso
              </p>
              <p className="text-am-muted mt-3 leading-relaxed">
                No solo construimos. Acompañamos, asesoramos y ordenamos cada
                decisión para que puedas avanzar con seguridad. Porque
                construir tu casa debería ser un proceso posible, no un
                problema.
              </p>
            </div>
          </div>

          {/* Imagen */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src="/img/forma-de-trabajo.jpg"
              alt="Obra en construcción AM Soluciones"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
