import { createServerClient } from "@/lib/supabase/server";
import ContactosTable from "@/components/admin/ContactosTable";

export const dynamic = "force-dynamic";

export default async function AdminContactosPage() {
  const supabase = createServerClient();
  const { data: contactos } = await supabase
    .from("contactos")
    .select("*")
    .order("created_at", { ascending: false });

  const sinLeer = (contactos ?? []).filter((c: { leido: boolean }) => !c.leido).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-extrabold text-am-primary">Consultas</h1>
        {sinLeer > 0 && (
          <span className="bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {sinLeer} sin leer
          </span>
        )}
      </div>
      <ContactosTable contactos={contactos ?? []} />
    </div>
  );
}
