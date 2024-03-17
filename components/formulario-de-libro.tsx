"use client";

import * as z from "zod";
import { Genero, Libro } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { NuevoLibroSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { actualizarLibro, crearLibro } from "@/operaciones-crud";

interface FormularioDeLibroProps {
  type?: "Crear" | "Actualizar";
  DatosIniciales?: Libro | null;
}

function FormularioDeLibro({
  DatosIniciales,
  type = "Crear",
}: FormularioDeLibroProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof NuevoLibroSchema>>({
    resolver: zodResolver(NuevoLibroSchema),
    defaultValues: {
      titulo: DatosIniciales?.titulo || "",
      descripcion: DatosIniciales?.descripcion || "",
      autor: DatosIniciales?.autor || "",
      genero: DatosIniciales?.genero || Genero.FICCION,
    },
  });

  const { isSubmitting, isValid } = form.formState;

  const handleSubmit = async (values: z.infer<typeof NuevoLibroSchema>) => {
    try {
      if (type === "Crear") {
        const { error, success } = await crearLibro(values);

        if (error) {
          toast.error(error);
        }

        if (success) {
          router.push("/");
          toast.success(success);
          form.reset();
        }
      } else if (type === "Actualizar" && DatosIniciales) {
        const { error, success } = await actualizarLibro(
          values,
          DatosIniciales.id
        );

        if (error) {
          toast.error(error);
        }

        if (success) {
          router.push("/");
          toast.success(success);
          form.reset();
        }
      }
    } catch (error) {
      toast.error("Algo fue mal con el proceso!");
    }
  };

  return (
    <div className="h-full px-6 py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mb-5">
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="descripcion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripcion</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="autor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="genero"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genero</FormLabel>
                  <Select
                    disabled={isSubmitting}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecciona un genero..."
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem
                        key={Genero.FICCION}
                        value={Genero.FICCION}
                        className="cursor-pointer"
                      >
                        {Genero.FICCION}
                      </SelectItem>
                      <SelectItem
                        key={Genero.FANTASIA}
                        value={Genero.FANTASIA}
                        className="cursor-pointer"
                      >
                        {Genero.FANTASIA}
                      </SelectItem>
                      <SelectItem
                        key={Genero.MISTERIO}
                        value={Genero.MISTERIO}
                        className="cursor-pointer"
                      >
                        {Genero.MISTERIO}
                      </SelectItem>
                      <SelectItem
                        key={Genero.DRAMA}
                        value={Genero.DRAMA}
                        className="cursor-pointer"
                      >
                        {Genero.DRAMA}
                      </SelectItem>
                      <SelectItem
                        key={Genero.HISTORIA}
                        value={Genero.HISTORIA}
                        className="cursor-pointer"
                      >
                        {Genero.HISTORIA}
                      </SelectItem>
                      <SelectItem
                        key={Genero.SUSPENSE}
                        value={Genero.SUSPENSE}
                        className="cursor-pointer"
                      >
                        {Genero.SUSPENSE}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" disabled={isSubmitting || !isValid}>
            {isSubmitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
            Agregar
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default FormularioDeLibro;
