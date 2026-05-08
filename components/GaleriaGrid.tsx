"use client";
import { useState } from "react";
import ProyectoCard from "./ProyectoCard";
import { formatCategoria } from "@/lib/utils/formatCategoria";
import type { Proyecto } from "@/lib/types";

type FilterKey = "todos" | "estructuras" | "terminaciones" | "obra_completa";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "estructuras", label: "Estructuras" },
  { key: "terminaciones", label: "Terminaciones" },
  { key: "obra_completa", label: "Obra completa" },
];

interface Props {
  proyectos: Pick<
    Proyecto,
    "id" | "slug" | "titulo" | "descripcion_corta" | "categoria" | "imagen_portada"
  >[];
}

export default function GaleriaGrid({ proyectos }: Props) {
  const [active, setActive] = useState<FilterKey>("todos");

  const filtered =
    active === "todos"
      ? proyectos
      : proyectos.filter((p) => p.categoria === active);

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setActive(f.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              active === f.key
                ? "bg-am-primary text-white"
                : "bg-white text-am-text border border-gray-300 hover:border-am-secondary"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-am-muted text-center py-12">
          No hay proyectos en esta categoría todavía.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProyectoCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
}
