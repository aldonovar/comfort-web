// app/contacto/page.js

import Contacto from "../../components/Contacto";

export default function ContactoPage() {
  return (
    <main className="bg-crema min-h-screen">
      {/* Encabezado específico de la página de contacto */}
      <section className="pt-28 pb-10 px-6 border-b border-madera/10 bg-crema/95">
        <div className="max-w-6xl mx-auto space-y-3">
          <p className="text-[0.72rem] tracking-[0.26em] uppercase text-madera/55">
            Contacto
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-madera">
            Coordina una reunión con el estudio o resuelve tus dudas.
          </h1>
          <p className="text-sm md:text-base text-madera/75 max-w-3xl">
            Si ya tienes un espacio identificado o estás evaluando la viabilidad
            de tu terraza, aquí puedes escribirnos, agendar una reunión y
            encontrar los datos de contacto directo del estudio en Lima
            Metropolitana.
          </p>
        </div>
      </section>

      {/* Sección completa de contacto (mapa, datos, agenda, etc.) */}
      <Contacto />
    </main>
  );
}
