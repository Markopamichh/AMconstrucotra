"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Upload, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { createGaleriaItem, updateGaleriaItem } from "@/lib/actions/galeria";
import type { GaleriaItem } from "@/lib/types";

interface Props {
  item?: Partial<GaleriaItem>;
}

export default function GaleriaForm({ item }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!item?.id;

  const [titulo, setTitulo] = useState(item?.titulo ?? "");
  const [descripcion, setDescripcion] = useState(item?.descripcion ?? "");
  const [imagen, setImagen] = useState(item?.imagen ?? "");
  const [orden, setOrden] = useState(item?.orden ?? 0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const id = item?.id ?? crypto.randomUUID();
      const fileName = `galeria/${id}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const { data, error: upErr } = await supabase.storage
        .from("proyectos-imagenes")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
      if (upErr) throw new Error(upErr.message);
      const url = supabase.storage
        .from("proyectos-imagenes")
        .getPublicUrl(data.path).data.publicUrl;
      setImagen(url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Error al subir imagen");
    } finally {
      setUploading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!imagen) { setError("Subí una imagen"); return; }

    const data = { titulo, descripcion: descripcion || null, imagen, orden };

    startTransition(async () => {
      const result = isEditing
        ? await updateGaleriaItem(item!.id!, data)
        : await createGaleriaItem(data);

      if (result?.error) {
        setError(typeof result.error === "string" ? result.error : JSON.stringify(result.error));
        return;
      }
      router.push("/admin/galeria");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-lg">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {error}
        </div>
      )}

      {/* Imagen */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-2">
          Imagen
        </label>
        {imagen ? (
          <div className="relative group">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200">
              <Image src={imagen} alt="Preview" fill className="object-cover" sizes="400px" />
            </div>
            <button
              type="button"
              onClick={() => setImagen("")}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl px-4 py-10 hover:border-am-secondary transition-colors text-am-muted text-sm">
            <Upload className="w-8 h-8 opacity-40" />
            {uploading ? "Subiendo..." : "Clic para subir imagen"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              disabled={uploading}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleUpload(f);
              }}
            />
          </label>
        )}
      </div>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Título
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary"
          placeholder="Ej: Terminación de quincho en Plottier"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Descripción breve{" "}
          <span className="text-am-muted font-normal">(opcional)</span>
        </label>
        <textarea
          rows={3}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary resize-none"
          placeholder="Ej: Revestimiento de paredes + colocación de piso de porcellanato"
        />
      </div>

      {/* Orden */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Orden
        </label>
        <input
          type="number"
          value={orden}
          onChange={(e) => setOrden(parseInt(e.target.value, 10) || 0)}
          className="w-24 border border-gray-300 rounded-xl px-3 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-am-secondary"
        />
      </div>

      {/* Acciones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/galeria")}
          className="flex-1 border border-gray-200 text-am-text font-medium rounded-xl py-3 text-sm hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending || uploading}
          className="flex-1 bg-am-primary text-white font-semibold rounded-xl py-3 text-sm hover:bg-am-secondary transition-colors disabled:opacity-60"
        >
          {isPending ? "Guardando..." : isEditing ? "Actualizar" : "Agregar"}
        </button>
      </div>
    </form>
  );
}
