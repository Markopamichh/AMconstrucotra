"use client";
import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import {
  toggleDestacado,
  deleteProyecto,
  updateOrden,
} from "@/lib/actions/proyectos";
import { formatCategoria, CATEGORIA_COLORS } from "@/lib/utils/formatCategoria";
import type { Proyecto } from "@/lib/types";

const PAGE_SIZE = 10;

interface Props {
  proyectos: Pick<
    Proyecto,
    "id" | "titulo" | "slug" | "categoria" | "imagen_portada" | "destacado" | "orden"
  >[];
}

export default function ProyectosTable({ proyectos: initial }: Props) {
  const [items, setItems] = useState(initial);
  const [page, setPage] = useState(0);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const pages = Math.ceil(items.length / PAGE_SIZE);
  const visible = items.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleToggle(id: string, value: boolean) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, destacado: value } : p))
    );
    startTransition(() => { void toggleDestacado(id, value); });
  }

  function handleOrden(id: string, value: string) {
    const num = parseInt(value, 10);
    if (isNaN(num)) return;
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, orden: num } : p))
    );
    startTransition(() => { void updateOrden(id, num); });
  }

  async function confirmDelete() {
    if (!deleteId) return;
    await deleteProyecto(deleteId);
    setItems((prev) => prev.filter((p) => p.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Imagen
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Título
              </th>
              <th className="px-4 py-3 text-left text-xs uppercase tracking-wide text-am-muted font-semibold">
                Categoría
              </th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-am-muted font-semibold">
                Destacado
              </th>
              <th className="px-4 py-3 text-center text-xs uppercase tracking-wide text-am-muted font-semibold">
                Orden
              </th>
              <th className="px-4 py-3 text-right text-xs uppercase tracking-wide text-am-muted font-semibold">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {visible.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-10 text-center text-am-muted"
                >
                  No hay proyectos todavía.
                </td>
              </tr>
            )}
            {visible.map((p) => {
              const badgeColor = p.categoria
                ? CATEGORIA_COLORS[p.categoria] ?? "bg-gray-100 text-gray-800"
                : "bg-gray-100 text-gray-800";
              return (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {p.imagen_portada ? (
                        <Image
                          src={p.imagen_portada}
                          alt={p.titulo}
                          fill
                          className="object-cover"
                          sizes="56px"
                        />
                      ) : (
                        <span className="flex items-center justify-center h-full text-gray-300 text-xs">
                          —
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-medium text-am-text">
                    {p.titulo}
                  </td>
                  <td className="px-4 py-3">
                    {p.categoria && (
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeColor}`}
                      >
                        {formatCategoria(p.categoria)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleToggle(p.id, !p.destacado)}
                      disabled={isPending}
                      className={`w-10 h-6 rounded-full transition-colors relative ${
                        p.destacado ? "bg-am-primary" : "bg-gray-200"
                      }`}
                      aria-label={p.destacado ? "Quitar destacado" : "Destacar"}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          p.destacado ? "left-4.5 translate-x-0" : "left-0.5"
                        }`}
                        style={{
                          transform: p.destacado
                            ? "translateX(18px)"
                            : "translateX(0)",
                        }}
                      />
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="number"
                      defaultValue={p.orden}
                      onBlur={(e) => handleOrden(p.id, e.target.value)}
                      className="w-16 border border-gray-200 rounded-lg px-2 py-1 text-center text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary"
                    />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/proyectos/${p.id}`}
                        className="p-1.5 rounded-lg text-am-muted hover:text-am-secondary hover:bg-blue-50 transition-colors"
                        aria-label="Editar"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(p.id)}
                        className="p-1.5 rounded-lg text-am-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
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

      {/* Modal confirmación eliminar */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="font-bold text-am-text text-lg mb-2">
              ¿Eliminar proyecto?
            </h3>
            <p className="text-am-muted text-sm mb-6">
              Esta acción no se puede deshacer. Las imágenes en Storage no se
              borran automáticamente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 border border-gray-200 text-am-text rounded-xl py-2.5 text-sm font-medium hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-500 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
