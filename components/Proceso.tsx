"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    id: 1,
    etiqueta: "01 · Diagnóstico",
    titulo: "Leemos el espacio y cómo lo quieres usar.",
    descripcion:
      "Analizamos vistas, orientación del sol, vientos, estructuras existentes y normativa del edificio. El objetivo: entender qué es posible sin promesas vacías.",
    meta: {
      paso: "01 · Diagnóstico",
      foco: "Espacio",
      duracion: "1 visita",
    },
  },
  {
    id: 2,
    etiqueta: "02 · Concepto",
    titulo: "Definimos la idea guía de tu terraza.",
    descripcion:
      "No es solo elegir muebles. Diseñamos cómo se vive: recorridos, zonas de estar, parrilla, barra, vegetación e iluminación como un solo sistema.",
    meta: {
      paso: "02 · Concepto",
      foco: "Idea",
      duracion: "1–2 semanas",
    },
  },
  {
    id: 3,
    etiqueta: "03 · Detalle y materiales",
    titulo: "Elegimos materiales que envejecen bien.",
    descripcion:
      "Pisos, cubiertas, luminarias y herrajes pensados para exterior peruano, minimizando mantenimiento y maximizando sensación de calidad.",
    meta: {
      paso: "03 · Detalle y materiales",
      foco: "Calidad",
      duracion: "2–3 semanas",
    },
  },
  {
    id: 4,
    etiqueta: "04 · Ejecución y entrega",
    titulo: "De la obra al primer encuentro en tu terraza.",
    descripcion:
      "Coordinamos con edificio, proveedores y tiempos de obra. Entregamos el espacio listo: limpio, iluminado y preparado para ser vivido.",
    meta: {
      paso: "04 · Ejecución y entrega",
      foco: "Obra pactada",
      duracion: "Según alcance",
    },
  },
];

export default function Proceso() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  // Sincroniza la tarjeta con el scroll usando IntersectionObserver
  useEffect(() => {
    if (!listRef.current) return;

    const items = Array.from(
      listRef.current.querySelectorAll("[data-step-index]")
    );
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            const idx = Number(entry.target.getAttribute("data-step-index"));
            if (!Number.isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        root: null,
        threshold: [0.35, 0.6],
      }
    );

    items.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const active = steps[activeIndex] ?? steps[0];

  return (
    <section
      id="proceso"
      className="bg-crema pt-16 lg:pt-20 pb-32 lg:pb-40 border-t border-madera/10"
    >
      <div className="max-w-6xl mx-auto px-4 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1.6fr)] lg:gap-12 gap-10 items-start">
        {/* Tarjeta 3D fija */}
        <div className="lg:sticky lg:top-28">
          <div className="relative rounded-[32px] bg-madera text-crema px-7 pt-7 pb-8 shadow-[0_26px_80px_rgba(0,0,0,0.65)]">
            {/* Pestañita superior */}
            <div className="absolute left-1/2 top-0 h-[3px] w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-crema/10" />

            <p className="text-[0.65rem] tracking-[0.32em] uppercase text-crema/60 mb-4">
              Vista previa de cómo explicas el servicio
            </p>

            <h3 className="font-serif text-xl md:text-2xl leading-snug mb-3">
              {active.titulo}
            </h3>

            <p className="text-xs md:text-sm text-crema/85 mb-6">
              {active.descripcion}
            </p>

            <div className="grid grid-cols-3 gap-3 text-[0.7rem] md:text-[0.75rem] uppercase tracking-[0.18em] text-crema/70 border-t border-white/5 pt-4">
              <div>
                <p className="text-[0.65rem] mb-1 opacity-60">Paso</p>
                <p>{active.meta.paso}</p>
              </div>
              <div>
                <p className="text-[0.65rem] mb-1 opacity-60">Foco</p>
                <p>{active.meta.foco}</p>
              </div>
              <div>
                <p className="text-[0.65rem] mb-1 opacity-60">Duración</p>
                <p>{active.meta.duracion}</p>
              </div>
            </div>

            <p className="mt-5 text-[0.7rem] text-crema/70">
              A medida que haces scroll, esta “maqueta digital” cambia para
              acompañar la explicación al cliente, igual que en las webs de
              dispositivos electrónicos.
            </p>
          </div>
        </div>

        {/* Lista de pasos */}
        <div ref={listRef} className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.32em] uppercase text-madera/60">
              Cómo se ve trabajar con Comfort Studio
            </p>
            <h2 className="font-serif text-2xl md:text-3xl">
              Del diagnóstico a la última luz encendida.
            </h2>
            <p className="text-sm md:text-base text-madera/70 max-w-xl">
              El proceso está pensado para que puedas explicar el servicio con
              claridad, paso a paso, mientras la tarjeta refuerza la idea
              principal de cada etapa.
            </p>
          </div>

          <ol className="space-y-4">
            {steps.map((step, index) => {
              const isActive = index === activeIndex;
              return (
                <li
                  key={step.id}
                  data-step-index={index}
                  className="scroll-mt-32"
                >
                  <button
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`w-full text-left rounded-[22px] border px-4 py-3 md:px-5 md:py-4 transition-all duration-300 bg-white/70 backdrop-blur-sm ${
                      isActive
                        ? "border-madera/45 shadow-[0_16px_40px_rgba(0,0,0,0.06)]"
                        : "border-madera/15 hover:border-madera/35"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="text-[0.75rem] uppercase tracking-[0.22em] text-madera/60">
                        {step.etiqueta}
                      </span>
                      <span
                        className={`h-1.5 w-12 rounded-full transition-colors ${
                          isActive ? "bg-madera" : "bg-madera/15"
                        }`}
                      />
                    </div>
                    <h3 className="font-semibold text-sm md:text-base">
                      {step.titulo}
                    </h3>
                    <p className="text-xs md:text-sm text-madera/70 mt-1">
                      {step.descripcion}
                    </p>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
