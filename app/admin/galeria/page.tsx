import Link from "next/link";
import { Plus } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import GaleriaTable from "@/components/admin/GaleriaTable";

export const dynamic = "force-dynamic";

export default async function AdminGaleriaPage() {
  const supabase = createServerClient();
  const { data: items } = await supabase
    .from("galeria")
    .select("*")
    .order("orden", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-am-primary">Galería</h1>
        <Link
          href="/admin/galeria/nuevo"
          className="flex items-center gap-2 bg-am-primary text-white font-semibold px-4 py-2 rounded-xl hover:bg-am-secondary transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Agregar imagen
        </Link>
      </div>
      <GaleriaTable items={items ?? []} />
    </div>
  );
}
