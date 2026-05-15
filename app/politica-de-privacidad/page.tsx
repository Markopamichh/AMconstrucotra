import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Política de Privacidad | AM Soluciones Constructivas",
  description:
    "Política de privacidad y tratamiento de datos personales de AM Soluciones Constructivas, conforme a la Ley 25.326 de Protección de Datos Personales.",
  robots: { index: false },
};

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <nav className="text-sm text-am-muted mb-6">
            <Link href="/" className="hover:text-am-secondary transition-colors">
              Inicio
            </Link>
            {" / "}
            <span className="text-am-text font-medium">Política de privacidad</span>
          </nav>

          <h1 className="text-3xl font-extrabold text-am-primary mb-8">
            Política de privacidad
          </h1>

          <div className="prose prose-sm max-w-none text-am-text space-y-6 leading-relaxed">
            <p className="text-am-muted">Última actualización: mayo de 2025</p>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">1. Responsable del tratamiento</h2>
              <p>
                AM Soluciones Constructivas, con domicilio en Córdoba 478, Neuquén, Argentina.
                Correo de contacto:{" "}
                <a href="mailto:amsoluciones.nqn@gmail.com" className="text-am-secondary hover:underline">
                  amsoluciones.nqn@gmail.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">2. Datos que recopilamos</h2>
              <p>
                Cuando completás nuestro formulario de contacto o visita técnica, recopilamos:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-am-muted mt-2">
                <li>Nombre y apellido</li>
                <li>Número de teléfono</li>
                <li>Localidad</li>
                <li>Descripción de tu proyecto o consulta</li>
                <li>Disponibilidad horaria para contacto</li>
              </ul>
              <p className="mt-3">
                No recopilamos datos sensibles ni información financiera. Los datos se transmiten
                mediante conexión segura (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">3. Finalidad y uso de los datos</h2>
              <p>
                Los datos que nos proporcionás se utilizan exclusivamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-am-muted mt-2">
                <li>Responder tu consulta o coordinar una visita técnica</li>
                <li>Brindarte presupuestos y asesoramiento sobre nuestros servicios</li>
              </ul>
              <p className="mt-3">
                No compartimos ni vendemos tus datos a terceros. No los utilizamos para
                publicidad ni los cedemos a otras empresas.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">4. Almacenamiento y seguridad</h2>
              <p>
                Los datos se almacenan en servidores seguros provistos por Supabase
                (infraestructura en la nube con cifrado en reposo y en tránsito). Aplicamos
                medidas de acceso restringido al panel administrativo mediante autenticación.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">5. Plazo de conservación</h2>
              <p>
                Conservamos tus datos mientras sean necesarios para gestionar tu consulta y
                durante un período razonable posterior para cumplir obligaciones legales. Podés
                solicitar su eliminación en cualquier momento.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">6. Tus derechos (Ley 25.326)</h2>
              <p>
                Conforme a la Ley 25.326 de Protección de Datos Personales de la República
                Argentina, tenés derecho a:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-am-muted mt-2">
                <li>Acceder a los datos que tenemos sobre vos</li>
                <li>Rectificar datos inexactos o incompletos</li>
                <li>Solicitar la eliminación de tus datos</li>
                <li>Oponerte al tratamiento de tus datos</li>
              </ul>
              <p className="mt-3">
                Para ejercer cualquiera de estos derechos, contactanos por email a{" "}
                <a href="mailto:amsoluciones.nqn@gmail.com" className="text-am-secondary hover:underline">
                  amsoluciones.nqn@gmail.com
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">7. Cookies y analytics</h2>
              <p>
                Este sitio utiliza Vercel Analytics para medir el tráfico de forma agregada y
                anónima. No se instalan cookies de seguimiento ni se comparten datos individuales.
                Podés consultar la política de privacidad de Vercel en su sitio oficial.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-am-primary mt-8 mb-3">8. Contacto</h2>
              <p>
                Ante cualquier consulta sobre el tratamiento de tus datos personales, podés
                comunicarte con nosotros:
              </p>
              <ul className="list-none mt-2 space-y-1 text-am-muted">
                <li>Email: <a href="mailto:amsoluciones.nqn@gmail.com" className="text-am-secondary hover:underline">amsoluciones.nqn@gmail.com</a></li>
                <li>WhatsApp: <a href="https://wa.me/5492994226380" className="text-am-secondary hover:underline">+54 9 2994 22-6380</a></li>
                <li>Domicilio: Córdoba 478, Neuquén, Argentina</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/" className="text-am-secondary font-semibold hover:underline">
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
