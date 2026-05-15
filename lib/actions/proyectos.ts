"use server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { proyectoSchema, type ProyectoInput } from "@/lib/schemas/proyecto";

export type { ProyectoInput };

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function createProyecto(data: ProyectoInput) {
  const parsed = proyectoSchema.safeParse(data);
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
  const parsed = proyectoSchema.safeParse(data);
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
