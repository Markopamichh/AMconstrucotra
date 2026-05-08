export default function Footer() {
  return (
    <footer className="bg-am-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Col 1 */}
          <div>
            <span className="text-2xl font-extrabold tracking-tight">AM</span>
            <p className="text-sm text-blue-200 mt-3 leading-relaxed">
              Cerca tuyo en todo el proceso
            </p>
            <p className="text-xs text-blue-300 mt-2">
              Soluciones Constructivas — Neuquén, Argentina
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-4">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-blue-100">
              {[
                ["Inicio", "#inicio"],
                ["Servicios", "#servicios"],
                ["Método AM", "#metodo"],
                ["Proyectos", "#proyectos"],
                ["Contacto", "#contacto"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="hover:text-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-blue-300 font-semibold mb-4">
              Contacto
            </h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>
                <a
                  href="mailto:amsoluciones.nqn@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  amsoluciones.nqn@gmail.com
                </a>
              </li>
              <li>Córdoba 478, Neuquén</li>
              <li>
                <a
                  href="https://wa.me/5492994226380"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Jeni: +54 9 2994 22-6380
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5492995230772"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Silvia: +54 9 2995 23-0772
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/am_soluciones.nqn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @am_soluciones.nqn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-10 pt-6 text-center text-xs text-blue-300">
          © 2026 AM Soluciones Constructivas. Neuquén, Argentina.
        </div>
      </div>
    </footer>
  );
}
