"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import VisitaTecnicaModal from "./VisitaTecnicaModal";

const LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Método AM", href: "#metodo" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Galería", href: "/galeria" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function resolveHref(href: string) {
    if (href.startsWith("#")) {
      return isHome ? href : `/${href}`;
    }
    return href;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <Image
                src="/img/logo-am.jpg"
                alt="Logo AM Soluciones Constructivas"
                width={40}
                height={40}
                className="h-10 w-auto mix-blend-multiply"
              />
              <span className="text-am-muted text-sm font-medium hidden sm:block">
                Soluciones Constructivas
              </span>
            </a>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={resolveHref(l.href)}
                  className="text-sm font-medium text-am-text hover:text-am-secondary transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="hidden sm:inline-flex items-center bg-am-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-am-secondary transition-colors"
              >
                Pedí tu visita técnica
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Menú"
              >
                {menuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={resolveHref(l.href)}
                className="block text-sm font-medium text-am-text hover:text-am-secondary py-1"
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setModalOpen(true);
              }}
              className="w-full bg-am-primary text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-am-secondary transition-colors"
            >
              Pedí tu visita técnica
            </button>
          </div>
        )}
      </header>

      <VisitaTecnicaModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
