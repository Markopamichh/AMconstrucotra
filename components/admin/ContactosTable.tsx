"use client";
import { useState, useTransition } from "react";
import { toggleLeido } from "@/lib/actions/contactos";
import type { Contacto } from "@/lib/types";

const PAGE_SIZE = 10;

const JENI = process.env.NEXT_PUBLIC_WHATSAPP_JENI ?? "5492994226380";
const SILVIA = process.env.NEXT_PUBLIC_WHATSAPP_SILVIA ?? "5492995230772";

type Filtro = "todos" | "sin_leer" | "whatsapp_jeni" | "whatsapp_silvia";

interface Props {
  contactos: Contacto[];
}

function buildWaLink(c: Contacto): string {
  const numero = c.origen === "whatsapp_silvia" ? SILVIA : JENI;
  const mensaje = `Hola AM Soluciones! 👋
Quiero pedir una visita técnica para cotizar mi proyecto.

👤 Nombre: ${c.nombre}
📞 Contacto: ${c.telefono}
📍 Localidad: ${c.localidad}
📋 Proyecto: ${c.descripcion_proyecto}
📅 Disponibilidad: ${c.disponibilidad}`;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export default function ContactosTable({ contactos: initial }: Props) {
  const [items, setItems] = useState(initial);
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const [page, setPage] = useState(0);
  const [isPending, startTransition] = useTransition();

  const filtered = items.filter((c) => {
    if (filtro === "sin_leer") return !c.leido;
    if (filtro === "whatsapp_jeni") return c.origen === "whatsapp_jeni";
    if (filtro === "whatsapp_silvia") return c.origen === "whatsapp_silvia";
    return true;
  });

  const pages = Math.ceil(filtered.length / PAGE_SIZE);
  const visible = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleToggle(id: string, value: boolean) {
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, leido: value } : c)));
    startTransition(() => { void toggleLeido(id, value); });
  }

  function handleFiltro(f: Filtro) {
    setFiltro(f);
    setPage(0);
  }

  const sinLeer = items.filter((c) => !c.leido).length;

  const filtros: { key: Filtro; label: string }[] = [
    { key: "todos", label: "Todos" },
    { key: "sin_leer", label: `Sin leer${sinLeer > 0 ? ` (${sinLeer})` : ""}` },
    { key: "whatsapp_jeni", label: "Jeni" },
    { key: "whatsapp_silvia", label: "Silvia" },
  ];

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filtros.map((f) => (
          <button
            key={f.key}
            onClick={() => handleFiltro(f.key)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filtro === f.key
                ? "bg-am-primary text-white border-am-primary"
                : "bg-white text-am-text border-gray-200 hover:border-am-secondary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">Nombre</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">Teléfono</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">Localidad</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">Proyecto</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">Disponibilidad</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">Origen</th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">Fecha</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-am-muted font-semibold">Leído</th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-am-muted font-semibold">WA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visible.length === 0 && (
              <tr>
                <td colSpan={9} className="px-4 py-10 text-center text-am-muted">
                  No hay consultas en esta categoría.
                </td>
              </tr>
            )}
            {visible.map((c) => (
              <tr
                key={c.id}
                className={`transition-colors ${!c.leido ? "bg-blue-50/50" : "hover:bg-gray-50"}`}
              >
                <td className="px-4 py-3 font-medium text-am-text whitespace-nowrap">
                  {!c.leido && (
                    <span className="inline-block mr-1.5 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                      Nuevo
                    </span>
                  )}
                  {c.nombre}
                </td>
                <td className="px-4 py-3 text-am-muted">
                  <a href={`tel:${c.telefono}`} className="hover:text-am-secondary transition-colors">
                    {c.telefono}
                  </a>
                </td>
                <td className="px-4 py-3 text-am-muted">{c.localidad}</td>
                <td className="px-4 py-3 text-am-muted max-w-xs">
                  <p className="line-clamp-2 text-xs">{c.descripcion_proyecto}</p>
                </td>
                <td className="px-4 py-3 text-am-muted text-xs">{c.disponibilidad}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    c.origen === "whatsapp_silvia"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {c.origen === "whatsapp_silvia" ? "Silvia" : "Jeni"}
                  </span>
                </td>
                <td className="px-4 py-3 text-am-muted text-xs whitespace-nowrap">
                  {new Date(c.created_at).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleToggle(c.id, !c.leido)}
                    disabled={isPending}
                    className={`w-10 h-6 rounded-full transition-colors relative ${c.leido ? "bg-am-primary" : "bg-gray-200"}`}
                    aria-label={c.leido ? "Marcar no leído" : "Marcar leído"}
                  >
                    <span
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                      style={{ transform: c.leido ? "translateX(18px)" : "translateX(2px)" }}
                    />
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <a
                    href={buildWaLink(c)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
                    aria-label="Abrir WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.126 1.534 5.86L0 24l6.34-1.508A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.946 0-3.775-.523-5.35-1.437L2 22l1.47-4.535A9.956 9.956 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-4">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                page === i
                  ? "bg-am-primary text-white"
                  : "bg-white text-am-text border border-gray-200 hover:border-am-secondary"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
