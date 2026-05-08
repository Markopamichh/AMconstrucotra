import Link from "next/link";
import { Plus } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import ProyectosTable from "@/components/admin/ProyectosTable";

export const dynamic = "force-dynamic";

export default async function AdminProyectosPage() {
  const supabase = createServerClient();
  const { data: proyectos } = await supabase
    .from("proyectos")
    .select("id, titulo, slug, categoria, imagen_portada, destacado, orden")
    .order("orden", { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-am-primary">Proyectos</h1>
        <Link
          href="/admin/proyectos/nuevo"
          className="flex items-center gap-2 bg-am-primary text-white font-semibold px-4 py-2 rounded-xl hover:bg-am-secondary transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          Nuevo proyecto
        </Link>
      </div>

      <ProyectosTable proyectos={proyectos ?? []} />
    </div>
  );
}
