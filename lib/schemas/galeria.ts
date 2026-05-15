import { z } from "zod";

export const galeriaSchema = z.object({
  titulo: z.string().min(1, "El título es requerido"),
  descripcion: z.string().optional().nullable(),
  imagen: z.string().min(1, "La imagen es requerida"),
  orden: z.number().int().default(0),
});

export type GaleriaInput = z.infer<typeof galeriaSchema>;
