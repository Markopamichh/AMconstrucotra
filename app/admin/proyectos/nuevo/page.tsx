import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import ProyectoForm from "@/components/admin/ProyectoForm";

export default function NuevoProyectoPage() {
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
          Nuevo proyecto
        </h1>
      </div>
      <ProyectoForm />
    </div>
  );
}
