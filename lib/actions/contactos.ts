"use server";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function toggleLeido(id: string, leido: boolean) {
  const supabase = getServiceClient();
  const { error } = await supabase
    .from("contactos")
    .update({ leido })
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/contactos");
  return { success: true };
}
