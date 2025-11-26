// app/layout.js
import "./globals.css";

import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import SmoothScroller from "../components/SmoothScroller";
import FloatingCTA from "../components/FloatingCTA";
import PageTransition from "../components/PageTransition";

export const metadata = {
  title: "Comfort Studio — Terrazas, azoteas y patios habitables en Lima",
  description:
    "Estudio especializado en diseño y ejecución de terrazas, azoteas y patios habitables en Lima. Terrazas que se sienten hogar desde la primera noche.",
  metadataBase: new URL("https://comfortstudio.pe"),
  openGraph: {
    title: "Comfort Studio — Outdoor Living en Lima",
    description:
      "Terrazas, azoteas y patios diseñados y ejecutados con detalle arquitectónico, materiales honestos y luz cálida.",
    url: "https://comfortstudio.pe",
    siteName: "Comfort Studio",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      {/* 
        body con tipografía sans unificada, fondo crema y texto madera.
        El serif se controla con la clase .font-serif definida en globals.css
      */}
      <body className="font-sans bg-crema text-madera antialiased">
        {/* Preloader con logo + textura */}
        <Preloader />

        {/* Scroll suave para anclas internas */}
        <SmoothScroller />

        {/* Navbar con logo light/dark según scroll */}
        <Navbar />

        {/* CTA flotante hacia WhatsApp */}
        <FloatingCTA />

        {/* Contenido principal con transición global de opacidad */}
        <main className="pt-20">
          <PageTransition>{children}</PageTransition>
        </main>
      </body>
    </html>
  );
}
