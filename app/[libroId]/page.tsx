import FormularioDeLibro from "@/components/formulario-de-libro";
import { Separator } from "@/components/ui/separator";
import { obtenerLibroPorId } from "@/operaciones-crud";

interface PaginaActualizarLibroProps {
  params: { libroId: string };
}

async function PaginaActualizarLibro({ params }: PaginaActualizarLibroProps) {
  const libro = await obtenerLibroPorId(params.libroId);

  return (
    <div className="h-full">
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold">Actualiza tu libro</h1>
        <p>
          En esta página, puedes editar la información de tu libro, desde el
          título, la descripcion y el autor hasta el género.
        </p>
      </div>
      <Separator />
      <FormularioDeLibro type="Actualizar" DatosIniciales={libro} />
    </div>
  );
}

export default PaginaActualizarLibro;
