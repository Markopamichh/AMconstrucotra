import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import GaleriaForm from "@/components/admin/GaleriaForm";

export default function NuevaGaleriaPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/galeria" className="text-am-muted hover:text-am-secondary transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-extrabold text-am-primary">Agregar imagen</h1>
      </div>
      <GaleriaForm />
    </div>
  );
}
