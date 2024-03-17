"use client";

import { PlusIcon, SquareLibrary } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

function BarraDeNavegacion() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between border-b py-3 px-6">
      <Link href="/" className="flex items-center">
        <SquareLibrary className="h-6 w-6 mr-2" />
        <span className="text-lg font-semibold">Bookly</span>
      </Link>

      <Button
        onClick={() => router.push("/nuevo-libro")}
        className={cn(
          "bg-emerald-200 text-emerald-800 hover:bg-emerald-300/70",
          pathname === "/nuevo-libro" && "hidden"
        )}
      >
        <PlusIcon className="h-4 w-4 sm:mr-2" />
        <span>Agregar libro</span>
      </Button>
    </div>
  );
}

export default BarraDeNavegacion;
