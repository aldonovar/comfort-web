// app/proyectos/page.js

import Proyectos from "../../components/sections/Proyectos";

export default function ProyectosPage() {
  return (
    <main className="bg-crema min-h-screen">
      <section className="pt-28 pb-10 px-6 border-b border-madera/10 bg-crema/95">
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="text-[0.72rem] tracking-[0.26em] uppercase text-madera/55">
            Portafolio
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-madera">
            Proyectos de terrazas y azoteas trabajadas por Comfort Studio.
          </h1>
          <p className="text-sm md:text-base text-madera/75 max-w-3xl">
            Explora una selección de proyectos reales en Lima. Cada caso resume
            metros, contexto y tipo de uso para ayudarte a visualizar qué
            podríamos lograr en tu espacio exterior.
          </p>
        </div>
      </section>

      {/* Reutilizamos el showroom global de proyectos */}
      <Proyectos />
    </main>
  );
}
