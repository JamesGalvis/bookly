import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import BarraDeNavegacion from "@/components/barra-de-navegacion";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bookly",
  description: "Administrador de libros leidos y por leer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors />
        <BarraDeNavegacion />
        {children}
      </body>
    </html>
  );
}
