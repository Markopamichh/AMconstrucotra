export type Categoria = "estructuras" | "terminaciones" | "obra_completa";

export interface Proyecto {
  id: string;
  titulo: string;
  slug: string;
  descripcion_corta: string | null;
  descripcion: string | null;
  categoria: Categoria | null;
  imagenes: string[];
  imagen_portada: string | null;
  imagen_antes: string | null;
  imagen_despues: string | null;
  destacado: boolean;
  publicado: boolean;
  orden: number;
  created_at: string;
}

export interface GaleriaItem {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen: string;
  orden: number;
  created_at: string;
}

export interface Contacto {
  id: string;
  nombre: string;
  telefono: string;
  localidad: string;
  descripcion_proyecto: string;
  disponibilidad: string;
  origen: "whatsapp_jeni" | "whatsapp_silvia" | null;
  leido: boolean;
  created_at: string;
}
