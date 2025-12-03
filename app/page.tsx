// app/page.js
import { Suspense } from "react";

import Hero from "../components/Hero";
import Servicios from "../components/Servicios";
import Proyectos from "../components/Proyectos";
import Proceso from "../components/Proceso";
import Estudio from "../components/Estudio";
import Cotiza from "../components/Cotiza";
import Contacto from "../components/Contacto";

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
