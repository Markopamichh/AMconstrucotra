const LABELS: Record<string, string> = {
  estructuras: "Estructuras",
  terminaciones: "Terminaciones",
  obra_completa: "Obra completa",
};

export function formatCategoria(cat: string): string {
  return LABELS[cat] ?? cat;
}

export const CATEGORIA_COLORS: Record<string, string> = {
  estructuras: "bg-blue-100 text-blue-800",
  terminaciones: "bg-green-100 text-green-800",
  obra_completa: "bg-orange-100 text-orange-800",
};
