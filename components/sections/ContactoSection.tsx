"use client";
import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import VisitaTecnicaModal from "@/components/VisitaTecnicaModal";

export default function ContactoSection() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section id="contacto" className="py-20 bg-am-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-am-primary">
              ¿Hablamos?
            </h2>
            <p className="text-am-muted mt-3">
              Estamos en Neuquén y trabajamos en toda la región.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Datos */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-am-secondary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:amsoluciones.nqn@gmail.com"
                  className="text-am-text hover:text-am-secondary transition-colors"
                >
                  amsoluciones.nqn@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-am-secondary mt-0.5 flex-shrink-0" />
                <span className="text-am-text">Córdoba 478, Neuquén</span>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-am-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <a
                    href="https://wa.me/5492994226380"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-am-text hover:text-am-secondary transition-colors"
                  >
                    Jeni: +54 9 2994 22-6380
                  </a>
                  <a
                    href="https://wa.me/5492995230772"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-am-text hover:text-am-secondary transition-colors mt-1"
                  >
                    Silvia: +54 9 2995 23-0772
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-am-secondary mt-0.5 flex-shrink-0 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <a
                  href="https://instagram.com/am_soluciones.nqn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-am-text hover:text-am-secondary transition-colors"
                >
                  @am_soluciones.nqn
                </a>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-am-primary text-white font-bold px-8 py-4 rounded-xl hover:bg-am-secondary transition-colors w-full sm:w-auto"
                >
                  Pedí tu visita técnica gratuita
                </button>
              </div>
            </div>

            {/* Mapa */}
            <div className="rounded-2xl overflow-hidden h-72 lg:h-auto min-h-[280px] border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3074.1234567890!2d-68.9587!3d-38.9516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960a336a2c4f0d3d%3A0x0!2sCórdoba+478%2C+Neuquén%2C+Argentina!5e0!3m2!1ses!2sar!4v1699999999999!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "280px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación AM Soluciones Constructivas"
              />
            </div>
          </div>
        </div>
      </section>

      <VisitaTecnicaModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
