// app/cotiza/page.js

import { Suspense } from "react";
import Cotiza from "../../components/sections/Cotiza";

export default function CotizaPage() {
  return (
    <main className="bg-crema min-h-screen">
      {/* Encabezado específico de la página de cotización */}
      <section className="pt-28 pb-10 px-6 border-b border-madera/10 bg-crema/95">
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="text-[0.72rem] tracking-[0.26em] uppercase text-madera/55">
            Cotización
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-madera">
            Cuéntanos tu proyecto y construimos un escenario claro de inversión.
          </h1>
          <p className="text-sm md:text-base text-madera/75 max-w-3xl">
            No necesitas tener todas las medidas ni decisiones cerradas. Con los
            datos de esta página podemos entender el contexto de tu terraza,
            cómo la quieres usar y preparar una primera lectura del proyecto
            antes de cualquier obra.
          </p>
        </div>
      </section>

      {/* Cotiza usa useSearchParams, por eso va dentro de Suspense */}
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
    </main>
  );
}
