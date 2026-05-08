"use client";
import { useState, useTransition } from "react";
import { toggleLeido } from "@/lib/actions/contactos";
import type { Contacto } from "@/lib/types";

const PAGE_SIZE = 10;

interface Props {
  contactos: Contacto[];
}

export default function ContactosTable({ contactos: initial }: Props) {
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(0);
  const [isPending, startTransition] = useTransition();

  const pages = Math.ceil(items.length / PAGE_SIZE);
  const visible = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleToggle(id: string, value: boolean) {
    setItems((prev) =>
      prev.map((c) => (c.id === id ? { ...c, leido: value } : c))
    );
    startTransition(() => { void toggleLeido(id, value); });
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Teléfono
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Localidad
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Proyecto
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Disponibilidad
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Fecha
              </th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-am-muted font-semibold">
                Leído
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-10 text-center text-am-muted"
                >
                  No hay consultas todavía.
                </td>
              </tr>
            )}
            {visible.map((c) => (
              <tr
                key={c.id}
                className={`transition-colors ${
                  !c.leido ? "bg-blue-50/50" : "hover:bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-medium text-am-text">
                  {c.nombre}
                </td>
                <td className="px-4 py-3 text-am-muted">
                  <a
                    href={`tel:${c.telefono}`}
                    className="hover:text-am-secondary transition-colors"
                  >
                    {c.telefono}
                  </a>
                </td>
                <td className="px-4 py-3 text-am-muted">{c.localidad}</td>
                <td className="px-4 py-3 text-am-muted max-w-xs">
                  <p className="line-clamp-2 text-xs">{c.descripcion_proyecto}</p>
                </td>
                <td className="px-4 py-3 text-am-muted text-xs">
                  {c.disponibilidad}
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
                    className={`w-10 h-6 rounded-full transition-colors relative ${
                      c.leido ? "bg-am-primary" : "bg-gray-200"
                    }`}
                    aria-label={c.leido ? "Marcar no leído" : "Marcar leído"}
                  >
                    <span
                      className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                      style={{
                        transform: c.leido
                          ? "translateX(18px)"
                          : "translateX(2px)",
                      }}
                    />
                  </button>
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
