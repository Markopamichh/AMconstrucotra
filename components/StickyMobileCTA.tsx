"use client";
import { useState } from "react";
import VisitaTecnicaModal from "./VisitaTecnicaModal";

const WA_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_JENI ?? "5492994226380";

export default function StickyMobileCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-2px_12px_rgba(0,0,0,0.08)] px-4 py-3 flex gap-3">
        <a
          href={`https://wa.me/${WA_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-am-whatsapp text-white font-semibold text-sm py-3 rounded-xl"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.534 5.86L0 24l6.34-1.508A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.775-.523-5.35-1.437L2 22l1.47-4.535A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
          </svg>
          WhatsApp
        </a>
        <button
          onClick={() => setModalOpen(true)}
          className="flex-1 bg-am-primary text-white font-semibold text-sm py-3 rounded-xl hover:bg-am-secondary transition-colors"
        >
          Pedí tu visita
        </button>
      </div>
      <VisitaTecnicaModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
