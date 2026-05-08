import { createServerClient } from "@/lib/supabase/server";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerClient();

  const { count } = process.env.NEXT_PUBLIC_SUPABASE_URL
    ? await supabase
        .from("contactos")
        .select("*", { count: "exact", head: true })
        .eq("leido", false)
    : { count: 0 };

  return (
    <div className="flex min-h-screen bg-am-bg">
      <Sidebar contactosNoLeidos={count ?? 0} />
      <main className="flex-1 md:ml-64 p-6 md:p-8 pt-16 md:pt-8">
        {children}
      </main>
    </div>
  );
}
