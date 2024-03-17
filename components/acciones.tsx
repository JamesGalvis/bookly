"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Edit, MoreVertical, Trash } from "lucide-react";
import { toast } from "sonner";
import { eliminarLibro } from "@/operaciones-crud";
import { useRouter } from "next/navigation";

interface AccionesProps {
  libroId: string;
}

function Acciones({ libroId }: AccionesProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const { success, error } = await eliminarLibro(libroId);

      if (error) {
        toast.error(error);
      }

      if (success) {
        toast.success(success);
      }
    } catch (error) {
      toast.error("Algo salio mal");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/${libroId}`)}
        >
          <Edit className="h-4 w-4 mr-3" />
          <span>Actualizar</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-rose-500 cursor-pointer"
          onClick={handleDelete}
        >
          <Trash className="h-4 w-4 mr-3" />
          <span>Eliminar</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default Acciones;
