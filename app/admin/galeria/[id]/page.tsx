import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import GaleriaForm from "@/components/admin/GaleriaForm";

export const dynamic = "force-dynamic";

export default async function EditarGaleriaPage({ params }: { params: { id: string } }) {
  const supabase = createServerClient();
  const { data: item } = await supabase
    .from("galeria")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!item) notFound();

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/galeria" className="text-am-muted hover:text-am-secondary transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-extrabold text-am-primary">Editar imagen</h1>
      </div>
      <GaleriaForm item={item} />
    </div>
  );
}
