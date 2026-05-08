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

const GaleriaSchema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  descripcion: z.string().optional().nullable(),
  imagen: z.string().min(1, "La imagen es requerida"),
  orden: z.number().int().default(0),
});

export type GaleriaInput = z.infer<typeof GaleriaSchema>;

export async function createGaleriaItem(data: GaleriaInput) {
  const parsed = GaleriaSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const supabase = getServiceClient();
  const { error } = await supabase.from("galeria").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/galeria");
  revalidatePath("/admin/galeria");
  return { success: true };
}

export async function updateGaleriaItem(id: string, data: GaleriaInput) {
  const parsed = GaleriaSchema.safeParse(data);
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  const supabase = getServiceClient();
  const { error } = await supabase.from("galeria").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/galeria");
  revalidatePath("/admin/galeria");
  return { success: true };
}

export async function deleteGaleriaItem(id: string) {
  const supabase = getServiceClient();
  const { error } = await supabase.from("galeria").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/");
  revalidatePath("/galeria");
  revalidatePath("/admin/galeria");
  return { success: true };
}

export async function updateGaleriaOrden(id: string, orden: number) {
  const supabase = getServiceClient();
  const { error } = await supabase.from("galeria").update({ orden }).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/galeria");
  return { success: true };
}
