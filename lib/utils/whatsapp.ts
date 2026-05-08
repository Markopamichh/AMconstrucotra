export interface VisitaFormData {
  nombre: string;
  telefono: string;
  localidad: string;
  descripcion: string;
  dias: string[];
  horarios: string[];
}

export function generarLinkWhatsApp(
  numero: string,
  datos: VisitaFormData
): string {
  const mensaje = `Hola AM Soluciones! 👋
Quiero pedir una visita técnica para cotizar mi proyecto.

👤 Nombre: ${datos.nombre}
📞 Contacto: ${datos.telefono}
📍 Localidad: ${datos.localidad}
📋 Proyecto: ${datos.descripcion}
📅 Disponibilidad: ${datos.dias.join(", ")} - ${datos.horarios.join(", ")}`;

  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}
