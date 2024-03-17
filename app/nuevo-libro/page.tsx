import FormularioDeLibro from "@/components/formulario-de-libro";
import { Separator } from "@/components/ui/separator";
import { obtenerLibroPorId } from "@/operaciones-crud";

function PaginaNuevoLibro() {
  return (
    <div className="h-full">
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold">
          Agrega un nuevo libro a tu coleccion
        </h1>
        <p>Enriquese tu biblioteca personal con una nueva adición</p>
      </div>
      <Separator />
      <FormularioDeLibro />
    </div>
  );
}

export default PaginaNuevoLibro;
