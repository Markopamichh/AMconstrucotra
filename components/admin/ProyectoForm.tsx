"use client";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { X, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { slugify } from "@/lib/utils/slugify";
import { createProyecto, updateProyecto } from "@/lib/actions/proyectos";
import type { Proyecto, Categoria } from "@/lib/types";

type ProyectoPartial = Partial<
  Pick<
    Proyecto,
    | "id"
    | "titulo"
    | "slug"
    | "descripcion_corta"
    | "descripcion"
    | "categoria"
    | "imagenes"
    | "imagen_portada"
    | "imagen_antes"
    | "imagen_despues"
    | "destacado"
    | "orden"
  >
>;

interface Props {
  proyecto?: ProyectoPartial;
}

export default function ProyectoForm({ proyecto }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!proyecto?.id;

  const [titulo, setTitulo] = useState(proyecto?.titulo ?? "");
  const [slug, setSlug] = useState(proyecto?.slug ?? "");
  const [descCorta, setDescCorta] = useState(proyecto?.descripcion_corta ?? "");
  const [desc, setDesc] = useState(proyecto?.descripcion ?? "");
  const [categoria, setCategoria] = useState<Categoria | "">(
    proyecto?.categoria ?? ""
  );
  const [destacado, setDestacado] = useState(proyecto?.destacado ?? false);
  const [orden, setOrden] = useState(proyecto?.orden ?? 0);
  const [imagenes, setImagenes] = useState<string[]>(
    proyecto?.imagenes ?? []
  );
  const [imagenPortada, setImagenPortada] = useState(
    proyecto?.imagen_portada ?? ""
  );
  const [imagenAntes, setImagenAntes] = useState(
    proyecto?.imagen_antes ?? ""
  );
  const [imagenDespues, setImagenDespues] = useState(
    proyecto?.imagen_despues ?? ""
  );
  const [uploadingImages, setUploadingImages] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  function handleTituloChange(val: string) {
    setTitulo(val);
    if (!isEditing) setSlug(slugify(val));
  }

  async function uploadFile(file: File, proyectoId: string): Promise<string> {
    const supabase = createClient();
    const fileName = `${proyectoId}/${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const { data, error } = await supabase.storage
      .from("proyectos-imagenes")
      .upload(fileName, file, { cacheControl: "3600", upsert: false });
    if (error) throw new Error(error.message);
    return supabase.storage
      .from("proyectos-imagenes")
      .getPublicUrl(data.path).data.publicUrl;
  }

  async function handleImagenes(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploadingImages(true);
    const id = proyecto?.id ?? crypto.randomUUID();
    try {
      const uploaded = await Promise.all(
        Array.from(files).map((f) => uploadFile(f, id))
      );
      setImagenes((prev) => {
        const next = [...prev, ...uploaded];
        if (!imagenPortada && next.length > 0) setImagenPortada(next[0]);
        return next;
      });
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Error al subir imágenes");
    } finally {
      setUploadingImages(false);
    }
  }

  async function handleSingleUpload(
    file: File,
    setter: (url: string) => void
  ) {
    const id = proyecto?.id ?? crypto.randomUUID();
    try {
      const url = await uploadFile(file, id);
      setter(url);
    } catch (e: unknown) {
      setServerError(e instanceof Error ? e.message : "Error al subir imagen");
    }
  }

  function removeImagen(url: string) {
    setImagenes((prev) => prev.filter((u) => u !== url));
    if (imagenPortada === url) {
      const remaining = imagenes.filter((u) => u !== url);
      setImagenPortada(remaining[0] ?? "");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(null);

    if (!categoria) {
      setServerError("Seleccioná una categoría");
      return;
    }

    const data = {
      titulo,
      slug,
      descripcion_corta: descCorta || null,
      descripcion: desc || null,
      categoria: categoria as Categoria,
      imagenes,
      imagen_portada: imagenPortada || null,
      imagen_antes: imagenAntes || null,
      imagen_despues: imagenDespues || null,
      destacado,
      orden,
    };

    startTransition(async () => {
      const result = isEditing
        ? await updateProyecto(proyecto!.id!, data)
        : await createProyecto(data);

      if (result?.error) {
        setServerError(
          typeof result.error === "string"
            ? result.error
            : JSON.stringify(result.error)
        );
        return;
      }
      router.push("/admin/proyectos");
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {serverError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">
          {serverError}
        </div>
      )}

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Título
        </label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => handleTituloChange(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary"
          placeholder="Ej: Platea y estructura en Plottier"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Slug (URL)
        </label>
        <input
          type="text"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary font-mono"
          placeholder="platea-estructura-plottier"
        />
        <p className="text-xs text-am-muted mt-1">
          URL pública: /proyectos/{slug || "..."}
        </p>
      </div>

      {/* Descripción corta */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Descripción corta{" "}
          <span className="text-am-muted">
            ({descCorta.length}/150)
          </span>
        </label>
        <input
          type="text"
          value={descCorta}
          onChange={(e) => setDescCorta(e.target.value.slice(0, 150))}
          maxLength={150}
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary"
          placeholder="Aparece en las cards de la galería"
        />
      </div>

      {/* Descripción completa */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Descripción completa
        </label>
        <textarea
          rows={5}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary resize-y"
          placeholder="Descripción detallada para la página del proyecto"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-1">
          Categoría
        </label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as Categoria | "")}
          required
          className="w-full border border-gray-300 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary bg-white"
        >
          <option value="">Seleccioná una categoría</option>
          <option value="estructuras">Estructuras</option>
          <option value="terminaciones">Terminaciones</option>
          <option value="obra_completa">Obra completa</option>
        </select>
      </div>

      {/* Destacado + Orden */}
      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={destacado}
            onChange={(e) => setDestacado(e.target.checked)}
            className="w-4 h-4 accent-am-primary"
          />
          <span className="text-sm font-medium text-am-text">Destacado</span>
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-am-text">Orden:</label>
          <input
            type="number"
            value={orden}
            onChange={(e) => setOrden(parseInt(e.target.value, 10) || 0)}
            className="w-20 border border-gray-300 rounded-xl px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-am-secondary text-center"
          />
        </div>
      </div>

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-am-text mb-2">
          Imágenes del proyecto
        </label>
        <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-xl px-4 py-6 hover:border-am-secondary transition-colors justify-center text-am-muted text-sm">
          <Upload className="w-5 h-5" />
          {uploadingImages ? "Subiendo..." : "Clic para subir imágenes (jpg, png, webp)"}
          <input
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => handleImagenes(e.target.files)}
            disabled={uploadingImages}
          />
        </label>

        {imagenes.length > 0 && (
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {imagenes.map((url) => (
              <div key={url} className="relative group">
                <div
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-colors ${
                    imagenPortada === url
                      ? "border-am-primary"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeImagen(url)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Eliminar imagen"
                >
                  <X className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={() => setImagenPortada(url)}
                  className={`mt-1 w-full text-xs py-0.5 rounded-lg transition-colors ${
                    imagenPortada === url
                      ? "bg-am-primary text-white"
                      : "bg-gray-100 text-am-muted hover:bg-gray-200"
                  }`}
                >
                  {imagenPortada === url ? "Portada ✓" : "Portada"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Antes / Después */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-am-text mb-2">
            Imagen Antes
            <span className="text-am-muted font-normal ml-1">(opcional)</span>
          </label>
          {imagenAntes && (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
              <Image src={imagenAntes} alt="Antes" fill className="object-cover" sizes="200px" />
              <button
                type="button"
                onClick={() => setImagenAntes("")}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-200 rounded-xl px-3 py-3 hover:border-am-secondary transition-colors text-am-muted text-xs">
            <Upload className="w-4 h-4" />
            Subir
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleSingleUpload(f, setImagenAntes);
              }}
            />
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-am-text mb-2">
            Imagen Después
            <span className="text-am-muted font-normal ml-1">(opcional)</span>
          </label>
          {imagenDespues && (
            <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
              <Image src={imagenDespues} alt="Después" fill className="object-cover" sizes="200px" />
              <button
                type="button"
                onClick={() => setImagenDespues("")}
                className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
          <label className="flex items-center justify-center gap-2 cursor-pointer border-2 border-dashed border-gray-200 rounded-xl px-3 py-3 hover:border-am-secondary transition-colors text-am-muted text-xs">
            <Upload className="w-4 h-4" />
            Subir
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleSingleUpload(f, setImagenDespues);
              }}
            />
          </label>
        </div>
      </div>

      {/* Acciones */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.push("/admin/proyectos")}
          className="flex-1 border border-gray-200 text-am-text font-medium rounded-xl py-3 text-sm hover:bg-gray-50 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending || uploadingImages}
          className="flex-1 bg-am-primary text-white font-semibold rounded-xl py-3 text-sm hover:bg-am-secondary transition-colors disabled:opacity-60"
        >
          {isPending
            ? "Guardando..."
            : isEditing
            ? "Actualizar proyecto"
            : "Crear proyecto"}
        </button>
      </div>
    </form>
  );
}
