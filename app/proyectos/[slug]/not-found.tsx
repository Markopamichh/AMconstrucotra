import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-extrabold text-am-primary mb-4">
        Proyecto no encontrado
      </h1>
      <p className="text-am-muted mb-8">
        El proyecto que buscás no existe o fue eliminado.
      </p>
      <Link
        href="/#proyectos"
        className="bg-am-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-am-secondary transition-colors"
      >
        Ver todos los proyectos
      </Link>
    </div>
  );
}
