import { Genero } from "@prisma/client";
import * as z from "zod";

export const NuevoLibroSchema = z.object({
  titulo: z.string().min(3, {
    message: "El titulo es requerido",
  }),
  descripcion: z.string().min(3, {
    message: "La descripción es requerida",
  }),
  genero: z.nativeEnum(Genero),
  autor: z.string().optional(),
});
