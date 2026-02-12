import "./globals.css"; // Importación única de estilos globales
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard de Biblioteca",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}