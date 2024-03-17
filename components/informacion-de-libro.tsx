import Acciones from "./acciones";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Libro } from "@prisma/client";

interface InformacionDeLibroProps {
  libro: Libro;
}

function InformacionDeLibro({ libro }: InformacionDeLibroProps) {
  const { titulo, descripcion, autor, genero } = libro;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{titulo}</CardTitle>
          <Acciones libroId={libro.id} />
        </div>
        <CardDescription>{descripcion}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex max-sm:flex-col max-sm:space-y-3 sm:items-center items-start text-sm sm:space-x-3">
          <span className="py-1.5 px-2 rounded-full bg-lime-200 text-lime-800 w-fit">
            {autor}
          </span>
          <span className="text-[13px] py-1.5 px-2 rounded-full bg-indigo-200 text-indigo-800 w-fit">
            {genero}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default InformacionDeLibro;
