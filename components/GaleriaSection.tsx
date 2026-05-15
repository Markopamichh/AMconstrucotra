"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import type { GaleriaItem } from "@/lib/types";

interface Props {
  items: GaleriaItem[];
}

export default function GaleriaSection({ items }: Props) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const isOpen = lightboxIdx !== null;

  const prev = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i - 1 + items.length) % items.length : null)),
    [items.length]
  );

  const next = useCallback(() =>
    setLightboxIdx((i) => (i !== null ? (i + 1) % items.length : null)),
    [items.length]
  );

  const close = useCallback(() => setLightboxIdx(null), []);

  // Navegación por teclado
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, prev, next, close]);

  // Bloquear scroll cuando el lightbox está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-4xl mb-4">🏗️</p>
        <p className="text-am-primary font-bold text-lg">Próximamente</p>
        <p className="text-am-muted text-sm mt-2 max-w-xs">
          Estamos cargando nuestros trabajos. Volvé pronto.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => setLightboxIdx(i)}
            className="group text-left focus:outline-none focus:ring-2 focus:ring-am-secondary focus:ring-offset-2 rounded-2xl"
            aria-label={`Ver ${item.titulo}`}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              {/* Imagen con proporción fija */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <Image
                  src={item.imagen}
                  alt={item.titulo}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                />
                {/* Overlay con ícono al hover */}
                <div className="absolute inset-0 bg-am-primary/0 group-hover:bg-am-primary/20 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <h3 className="font-bold text-am-text text-sm leading-snug">
                  {item.titulo}
                </h3>
                {item.descripcion && (
                  <p className="text-am-muted text-xs mt-1 leading-relaxed line-clamp-2">
                    {item.descripcion}
                  </p>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Galería de imágenes"
        >
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/90"
            onClick={close}
          />

          {/* Controles superiores */}
          <div className="relative z-10 flex items-center justify-between px-4 py-3 text-white/60">
            <span className="text-sm font-medium">
              {lightboxIdx + 1} / {items.length}
            </span>
            <button
              onClick={close}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Cerrar"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Contenedor central — imagen + flechas */}
          <div className="relative z-10 flex-1 flex items-center justify-center px-12 md:px-20">
            {/* Flecha izquierda */}
            {items.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 md:left-4 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            )}

            {/* Imagen */}
            <div
              className="relative w-full max-w-4xl"
              style={{ maxHeight: "calc(100vh - 140px)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="relative w-full"
                style={{ height: "calc(100vh - 140px)" }}
              >
                <Image
                  key={lightboxIdx}
                  src={items[lightboxIdx].imagen}
                  alt={items[lightboxIdx].titulo}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            </div>

            {/* Flecha derecha */}
            {items.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 md:right-4 p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </button>
            )}
          </div>

          {/* Info inferior */}
          <div
            className="relative z-10 px-4 py-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-white font-semibold text-base leading-snug">
              {items[lightboxIdx].titulo}
            </p>
            {items[lightboxIdx].descripcion && (
              <p className="text-white/60 text-sm mt-1">
                {items[lightboxIdx].descripcion}
              </p>
            )}
            {/* Dots de navegación */}
            {items.length > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-3">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === lightboxIdx
                        ? "bg-white w-4 h-1.5"
                        : "bg-white/30 hover:bg-white/60 w-1.5 h-1.5"
                    }`}
                    aria-label={`Ir a imagen ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
