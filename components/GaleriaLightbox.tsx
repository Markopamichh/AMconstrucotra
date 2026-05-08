"use client";
import { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  imagenes: string[];
  titulo: string;
}

export default function GaleriaLightbox({ imagenes, titulo }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = () =>
    setLightboxIdx((i) =>
      i !== null ? (i - 1 + imagenes.length) % imagenes.length : null
    );

  const next = () =>
    setLightboxIdx((i) =>
      i !== null ? (i + 1) % imagenes.length : null
    );

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {imagenes.map((src, i) => (
          <button
            key={i}
            onClick={() => setLightboxIdx(i)}
            className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-am-secondary"
            aria-label={`Ver imagen ${i + 1} de ${titulo}`}
          >
            <Image
              src={src}
              alt={`${titulo} — imagen ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIdx(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
            aria-label="Cerrar"
          >
            <X className="w-7 h-7" />
          </button>
          {imagenes.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 text-white hover:text-gray-300 p-2"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
              <button
                onClick={next}
                className="absolute right-4 text-white hover:text-gray-300 p-2"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            </>
          )}
          <div className="relative w-full max-w-4xl aspect-video">
            <Image
              src={imagenes[lightboxIdx]}
              alt={`${titulo} — imagen ${lightboxIdx + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <span className="absolute bottom-4 text-white/60 text-sm">
            {lightboxIdx + 1} / {imagenes.length}
          </span>
        </div>
      )}
    </>
  );
}
