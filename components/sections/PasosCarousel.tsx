"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  { src: "/img/pasos/img carousele1.png", alt: "01. Escuchamos — Entendemos tu idea y tus necesidades", fit: "object-cover" },
  { src: "/img/pasos/img carousele2.png", alt: "02. Ordenamos la idea — Transformamos la información en una propuesta clara y posible", fit: "object-cover" },
  { src: "/img/pasos/img carousele 3.png", alt: "03. Construimos — Ejecutamos el proyecto con calidad y compromiso", fit: "object-cover" },
  { src: "/img/pasos/img carousele 4.png", alt: "04. Entregamos — Aseguramos la calidad y el cumplimiento del proyecto", fit: "object-cover" },
  { src: "/img/pasos/img carousele 5.png", alt: "05. Mantenemos — Brindamos soporte y servicio postventa", fit: "object-cover" },
];

function getOffset(i: number, current: number, n: number) {
  let o = i - current;
  if (o > Math.floor(n / 2)) o -= n;
  if (o <= -Math.ceil(n / 2)) o += n;
  return o;
}

export default function PasosCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = SLIDES.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prev = () => setCurrent((c) => (c - 1 + n) % n);
  const next = () => setCurrent((c) => (c + 1) % n);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, 7000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [paused, current]);

  return (
    <section
      className="w-full py-10 bg-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Escenario: el slide activo es el centro, los adyacentes asoman a los lados */}
      <div className="relative mx-auto max-w-3xl">
        <div className="relative aspect-[3/2]">
          {SLIDES.map((slide, i) => {
            const o = getOffset(i, current, n);
            const isActive = o === 0;
            const isNext = o === 1;
            const isPrev = o === -1;
            const visible = isActive || isNext || isPrev;

            const transform = isActive
              ? "translateX(0%) scale(1)"
              : isNext
              ? "translateX(90%) scale(0.78)"
              : "translateX(-90%) scale(0.78)";

            return (
              <div
                key={slide.src}
                className="absolute inset-0 rounded-2xl overflow-hidden border border-gray-200 transition-all duration-500 ease-in-out"
                style={{
                  transform,
                  opacity: isActive ? 1 : visible ? 0.5 : 0,
                  zIndex: isActive ? 10 : visible ? 5 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  boxShadow: isActive ? "0 8px 32px rgba(0,0,0,0.18)" : "0 2px 8px rgba(0,0,0,0.10)",
                }}
              >
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className={`${slide.fit} bg-[#F5F7FA]`}
                  priority={isActive}
                />
              </div>
            );
          })}
        </div>

        {/* Flechas */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Ir a slide ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? "bg-am-primary scale-125" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
