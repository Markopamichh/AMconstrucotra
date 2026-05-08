"use server";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { revalidatePath } from "next/cache";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const ProyectoSchema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  descripcion_corta: z.string().max(150).optional().nullable(),
  descripcion: z.string().optional().nullable(),
  categoria: z.enum(["estructuras", "terminaciones", "obra_completa"]),
  imagenes: z.array(z.string()).default([]),
  imagen_portada: z.string().optional().nullable(),
  imagen_antes: z.string().optional().nullable(),
  imagen_despues: z.string().optional().nullable(),
  destacado: z.boolean().default(false),
  orden: z.number().int().default(0),
});

export type ProyectoInput = z.infer<typeof ProyectoSchema>;

export async function createProyecto(data: ProyectoInput) {
  const parsed = ProyectoSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const supabase = getServiceClient();
  const { error } = await supabase.from("proyectos").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  return { success: true };
}

export async function updateProyecto(id: string, data: ProyectoInput) {
  const parsed = ProyectoSchema.safeParse(data);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("proyectos")
    .update(parsed.data)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  revalidatePath(`/proyectos/${parsed.data.slug}`);
  return { success: true };
}

export async function deleteProyecto(id: string) {
  const supabase = getServiceClient();
  const { error } = await supabase.from("proyectos").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  return { success: true };
}

export async function toggleDestacado(id: string, destacado: boolean) {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("proyectos")
    .update({ destacado })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/admin/proyectos");
  return { success: true };
}

export async function updateOrden(id: string, orden: number) {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("proyectos")
    .update({ orden })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/proyectos");
  return { success: true };
}
