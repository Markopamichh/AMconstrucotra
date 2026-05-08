"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FolderOpen, MessageSquare, LogOut, Menu, X, Images } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  contactosNoLeidos: number;
}

const NAV = [
  { label: "Proyectos", href: "/admin/proyectos", icon: FolderOpen },
  { label: "Galería", href: "/admin/galeria", icon: Images },
  { label: "Contactos", href: "/admin/contactos", icon: MessageSquare },
];

export default function Sidebar({ contactosNoLeidos }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 md:hidden bg-am-primary text-white p-2 rounded-lg shadow"
        aria-label="Abrir menú"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-am-primary flex flex-col z-50 transition-transform duration-300 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-blue-800">
          <div>
            <span className="text-white font-extrabold text-xl">AM</span>
            <p className="text-blue-300 text-xs mt-0.5">Admin Panel</p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="md:hidden text-white p-1"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => {
            const isActive = pathname.startsWith(href);
            const badge =
              href === "/admin/contactos" && contactosNoLeidos > 0;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors relative ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "text-blue-200 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {label}
                {badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {contactosNoLeidos > 9 ? "9+" : contactosNoLeidos}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-blue-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-blue-200 hover:bg-white/10 hover:text-white text-sm font-medium transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}
