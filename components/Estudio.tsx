"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const highlights = [
  {
    label: "Enfoque",
    title: "Terrazas pensadas como extensión del interior.",
    text: "No diseñamos espacios aislados, sino continuidades: cómo se ve la terraza desde la sala, cómo suena, cómo se siente cuando entras de noche.",
  },
  {
    label: "Detalle",
    title: "Decisiones pequeñas que cambian la experiencia.",
    text: "La altura de una barra, la temperatura de la luz, la textura del piso descalzo. El estudio existe para tomar en serio esos detalles.",
  },
  {
    label: "Rol",
    title: "Un estudio que coordina, no solo dibuja.",
    text: "Coordinamos con edificio, proveedores, permisos y plazos. Buscamos que tú no tengas que hacerlo pieza por pieza.",
  },
];

const facts = [
  {
    label: "Proyectos acompañados",
    value: "+30",
    note: "Entre viviendas, edificios y espacios corporativos.",
  },
  {
    label: "Rango de metros trabajados",
    value: "12 m² – 150 m²",
    note: "Desde terrazas compactas hasta rooftops completos.",
  },
  {
    label: "Modos de trabajo",
    value: "Diseño · Obra · Mixto",
    note: "Podemos solo diseñar, ejecutar o hacer ambas cosas.",
  },
];

export default function Estudio() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header
      const headerAnim = gsap.from(".studio-header", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        animation: headerAnim,
        once: true,
      });

      // Facts / métricas
      gsap.from(".studio-facts-card", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".studio-facts",
          start: "top 85%",
          once: true,
        },
      });

      // Highlights
      gsap.from(".studio-highlight-card", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".studio-highlights",
          start: "top 80%",
          once: true,
        },
      });

      // Parallax de fondo
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".studio-bg", {
            y: self.progress * -30,
            ease: "none",
          });
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="estudio"
      ref={sectionRef}
      className="relative py-20 bg-[#111010] text-crema overflow-hidden"
    >
      {/* Fondo sutil con parallax */}
      <div className="studio-bg pointer-events-none absolute inset-y-[-60px] -left-24 -right-24 bg-[radial-gradient(circle_at_top,_rgba(244,199,171,0.14),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(255,255,255,0.06),_transparent_55%)] opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="studio-header grid gap-8 md:grid-cols-[1.3fr_1fr] items-start">
          <div className="space-y-4">
            <p className="text-xs tracking-[0.32em] uppercase text-crema/50">
              Estudio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              Un estudio dedicado a terrazas que se sienten parte de la casa,
              no un anexo olvidado.
            </h2>
            <p className="text-sm md:text-base text-crema/80 max-w-xl">
              Comfort Studio nace de una pregunta sencilla:{" "}
              <span className="italic">
                ¿qué pasa si tratamos la terraza con el mismo cuidado que el
                interior?
              </span>{" "}
              A partir de ahí, el enfoque se volvió casi obsesivo: luz, uso,
              materiales, mantenimiento y sensación de recibimiento.
            </p>
          </div>

          <div className="studio-facts grid gap-3">
            {facts.map((fact) => (
              <article
                key={fact.label}
                className="studio-facts-card rounded-2xl border border-crema/10 bg-white/5 px-4 py-3 shadow-[0_14px_40px_rgba(0,0,0,0.6)]"
              >
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-crema/70 mb-1">
                  {fact.label}
                </p>
                <p className="text-xl font-semibold">{fact.value}</p>
                <p className="text-[0.75rem] text-crema/70 mt-1">
                  {fact.note}
                </p>
              </article>
            ))}
          </div>
        </div>

        {/* Bloque de highlights (cómo piensa el estudio) */}
        <div className="studio-highlights grid gap-6 md:grid-cols-3 pt-4">
          {highlights.map((item) => (
            <article
              key={item.label}
              className="studio-highlight-card relative rounded-3xl border border-crema/10 bg-white/5 px-4 py-5 shadow-[0_18px_60px_rgba(0,0,0,0.65)] overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 bg-gradient-to-br from-terracota/20 via-transparent to-crema/15 pointer-events-none transition-opacity duration-300 hover:opacity-100" />
              <div className="relative z-10 space-y-2">
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-crema/60">
                  {item.label}
                </p>
                <h3 className="text-sm md:text-base font-semibold">
                  {item.title}
                </h3>
                <p className="text-[0.8rem] text-crema/75">{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Cierre / llamada a la acción suave */}
        <div className="border-t border-crema/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-[0.8rem] text-crema/75 max-w-xl">
            Puedes usar esta sección como punto de partida en la conversación:
            dónde opera el estudio, qué tipo de decisiones toma y por qué es
            distinto a un contratista aislado.
          </p>
          <div className="flex flex-wrap gap-3 text-[0.72rem]">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 rounded-full border border-crema/40 px-4 py-1.5 uppercase tracking-[0.18em] hover:bg-crema/10 transition-colors"
            >
              Ver proyectos de referencia
              <span className="text-xs translate-y-[1px]">↗</span>
            </a>
            <a
              href="#cotiza"
              className="inline-flex items-center gap-2 rounded-full bg-crema text-madera px-4 py-1.5 uppercase tracking-[0.18em] hover:bg-white transition-colors"
            >
              Hablar con el estudio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
