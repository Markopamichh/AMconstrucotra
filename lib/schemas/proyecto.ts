import { z } from "zod";

export const proyectoSchema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  descripcion_corta: z.string().max(150).optional().nullable(),
  descripcion: z.string().optional().nullable(),
  categoria: z.enum(["estructuras", "terminaciones", "obra_completa"]),
  imagenes: z.array(z.string()).default([]),
  imagen_portada: z.string().optional().nullable(),
  imagen_antes: z.string().optional().nullable(),
  imagen_despues: z.string().optional().nullable(),
  destacado: z.boolean().default(false),
  publicado: z.boolean().default(true),
  orden: z.number().int().default(0),
});

export type ProyectoInput = z.infer<typeof proyectoSchema>;
