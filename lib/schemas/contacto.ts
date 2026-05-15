import { z } from "zod";

export const contactoSchema = z.object({
  nombre: z.string().min(2, "Mínimo 2 caracteres").max(80, "Máximo 80 caracteres"),
  telefono: z
    .string()
    .regex(
      /^(\+?54|0)?[1-9]\d{8,10}$/,
      "Ingresá un número argentino válido (ej: 2994226380)"
    ),
  localidad: z.string().min(2, "Mínimo 2 caracteres").max(80, "Máximo 80 caracteres"),
  descripcion: z
    .string()
    .min(10, "Describí un poco tu proyecto (mínimo 10 caracteres)")
    .max(1000, "Máximo 1000 caracteres"),
  disponibilidad: z
    .array(z.string())
    .min(1, "Seleccioná al menos una disponibilidad"),
  origen: z.enum(["whatsapp_jeni", "whatsapp_silvia"]),
});

export type ContactoInput = z.infer<typeof contactoSchema>;
