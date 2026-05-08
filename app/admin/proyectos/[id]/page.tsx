import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import ProyectoForm from "@/components/admin/ProyectoForm";

export const dynamic = "force-dynamic";

export default async function EditarProyectoPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createServerClient();
  const { data: proyecto } = await supabase
    .from("proyectos")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!proyecto) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/proyectos"
          className="text-am-muted hover:text-am-secondary transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-extrabold text-am-primary">
          Editar proyecto
        </h1>
      </div>
      <ProyectoForm proyecto={proyecto} />
    </div>
  );
}
