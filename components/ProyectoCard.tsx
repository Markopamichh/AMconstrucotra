import Image from "next/image";
import Link from "next/link";
import { formatCategoria, CATEGORIA_COLORS } from "@/lib/utils/formatCategoria";
import type { Proyecto } from "@/lib/types";

type Props = Pick<
  Proyecto,
  "slug" | "titulo" | "descripcion_corta" | "categoria" | "imagen_portada"
>;

export default function ProyectoCard({
  slug,
  titulo,
  descripcion_corta,
  categoria,
  imagen_portada,
}: Props) {
  const badgeColor = categoria
    ? CATEGORIA_COLORS[categoria] ?? "bg-gray-100 text-gray-800"
    : "bg-gray-100 text-gray-800";

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
      <div className="relative aspect-[4/3] bg-gray-100">
        {imagen_portada ? (
          <Image
            src={imagen_portada}
            alt={titulo}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
            Sin imagen
          </div>
        )}
        {categoria && (
          <span
            className={`absolute top-3 left-3 text-xs font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${badgeColor}`}
          >
            {formatCategoria(categoria)}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-bold text-am-text text-base leading-snug mb-2">
          {titulo}
        </h3>
        {descripcion_corta && (
          <p className="text-am-muted text-sm leading-relaxed flex-1">
            {descripcion_corta}
          </p>
        )}
        <Link
          href={`/proyectos/${slug}`}
          className="mt-4 inline-flex items-center text-am-secondary text-sm font-semibold hover:underline"
        >
          Ver proyecto →
        </Link>
      </div>
    </div>
  );
}
