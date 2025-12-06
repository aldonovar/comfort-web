import "./globals.css";
import ClientLayout from "../components/layout/ClientLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comfort Studio | Arquitectura de Terrazas",
  description: "Especialistas en diseño y ejecución de terrazas, azoteas y patios en Lima. Transformamos espacios en experiencias de vida.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-terracota selection:text-white">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
