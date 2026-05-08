"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GaleriaItem } from "@/lib/types";

interface Props {
  items: GaleriaItem[];
}

export default function GaleriaSection({ items }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = () =>
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + items.length) % items.length : null
    );
  const next = () =>
    setLightboxIdx((i) =>
      i !== null ? (i + 1) % items.length : null
    );

  if (items.length === 0) return null;

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setLightboxIdx(i)}
            className="break-inside-avoid w-full text-left group focus:outline-none focus:ring-2 focus:ring-am-secondary rounded-xl"
          >
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="relative w-full overflow-hidden">
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-am-text text-sm leading-snug">
                  {item.titulo}
                </h3>
                {item.descripcion && (
                  <p className="text-am-muted text-xs mt-1 leading-relaxed">
                    {item.descripcion}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-2"
            aria-label="Cerrar"
          >
            <X className="w-7 h-7" />
          </button>

          {items.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-2"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}

          <div
            className="max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[75vh] flex items-center justify-center">
              <Image
                src={items[lightboxIdx].imagen}
                alt={items[lightboxIdx].titulo}
                width={1200}
                height={800}
                className="max-h-[75vh] w-auto h-auto object-contain rounded-xl"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">
                {items[lightboxIdx].titulo}
              </p>
              {items[lightboxIdx].descripcion && (
                <p className="text-white/70 text-sm mt-1">
                  {items[lightboxIdx].descripcion}
                </p>
              )}
              <p className="text-white/40 text-xs mt-2">
                {lightboxIdx + 1} / {items.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
