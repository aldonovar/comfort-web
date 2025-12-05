// app/page.js
import { Suspense } from "react";

import Hero from "../components/sections/Hero";
import Servicios from "../components/sections/Servicios";
import Proyectos from "../components/sections/Proyectos";
import Proceso from "../components/sections/Proceso";
import Estudio from "../components/sections/Estudio";
import Cotiza from "../components/sections/Cotiza";
import Contacto from "../components/sections/Contacto";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Servicios />
      <Proyectos />
      <Proceso />
      <Estudio />

      {/* Cotiza usa useSearchParams (client component),
         por eso la envolvemos en Suspense para que Next 14
         pueda prerender la página "/" sin error */}
      <Suspense
        fallback={
          <section
            id="cotiza"
            className="px-6 py-16 bg-crema/80 text-madera/70 text-sm"
          >
            <div className="max-w-4xl mx-auto">
              <p className="tracking-[0.22em] text-[0.72rem] uppercase">
                Cargando sección de cotización…
              </p>
            </div>
          </section>
        }
      >
        <Cotiza />
      </Suspense>

      <Contacto />
    </>
  );
}

// Trigger Vercel Build
