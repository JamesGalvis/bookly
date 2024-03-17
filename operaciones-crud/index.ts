"use server";

import * as z from "zod"
import { database } from "@/utils/database";
import { revalidatePath } from "next/cache";
import { NuevoLibroSchema } from "@/schemas";

export const obtenerTodosLosLibros = async () => {
  const libros = await database.libro.findMany();

  return libros;
};

export const obtenerLibroPorId = async (libroId: string) => {
  const libro = await database.libro.findUnique({
    where: {
      id: libroId,
    },
  });

  return libro;
};

export const crearLibro = async (values: z.infer<typeof NuevoLibroSchema>) => {
  const { titulo, genero, descripcion, autor } = values
  
  try {
    await database.libro.create({
      data: {
        titulo,
        descripcion,
        autor,
        genero
      },
    });

    revalidatePath("/");
    return { success: "Libro agregado!" };
  } catch (error) {
    return { error: "Algo salio mal!" };
  }
};

export const actualizarLibro = async (
  values: z.infer<typeof NuevoLibroSchema>,
  idLibro: string
) => {
  const { titulo, genero, descripcion, autor } = values

  try {
    await database.libro.update({
      where: {
        id: idLibro,
      },
      data: {
        titulo,
        descripcion,
        autor,
        genero
      },
    });

    revalidatePath("/");
    return { success: "Libro actualizado!" };
  } catch (error) {
    return { error: "Algo salio mal!" };
  }
};

export const eliminarLibro = async (idLibro: string) => {
  try {
    await database.libro.delete({
      where: {
        id: idLibro,
      },
    });

    revalidatePath("/");
    return { success: "Libro eliminado!" };
  } catch (error) {
    return { error: "Algo salio mal!" };
  }
};
