import InformacionDeLibro from "@/components/informacion-de-libro";
import { Separator } from "@/components/ui/separator";
import { obtenerTodosLosLibros } from "@/operaciones-crud";

async function PaginaInicio() {
  const libros = await obtenerTodosLosLibros();

  return (
    <div className="h-full">
      <div className="px-6 py-4">
        <h1 className="text-3xl font-bold">Mi Biblioteca de Lecturas</h1>
        <p className="text-muted-foreground">
          Explora tu colección de libros leídos
        </p>
      </div>
      <Separator />
      <div className="px-6 py-5">
        {libros.length === 0 ? (
          <div className="text-center">
            <p className="text-xl font-semibold">
              ¡Tu biblioteca de lecturas está vacía por ahora!
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
            {libros.map((libro) => (
              <InformacionDeLibro key={libro.id} libro={libro} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginaInicio;
