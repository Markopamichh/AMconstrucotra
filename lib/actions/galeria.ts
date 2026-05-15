"use server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { galeriaSchema, type GaleriaInput } from "@/lib/schemas/galeria";

export type { GaleriaInput };

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function createGaleriaItem(data: GaleriaInput) {
  const parsed = galeriaSchema.safeParse(data);
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
  const parsed = galeriaSchema.safeParse(data);
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
