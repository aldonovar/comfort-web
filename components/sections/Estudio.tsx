"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Estudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const sections = gsap.utils.toArray<HTMLElement>(".horizontal-panel");

      if (window.innerWidth >= 1024) { // Only enable horizontal scroll on desktop
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            scrub: 1,
            // Compact: Faster scroll (2000px instead of container width)
            end: "+=2000",
            snap: 1 / (sections.length - 1),
            invalidateOnRefresh: true,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="estudio" className="relative bg-black text-white overflow-hidden">

      {/* Horizontal Container */}
      <div ref={containerRef} className="flex flex-col lg:flex-row lg:w-[300vw] h-auto lg:h-screen">

        {/* PANEL 1: MANIFESTO */}
        <div className="horizontal-panel w-full lg:w-[75vw] h-screen flex flex-col justify-center items-center bg-primary text-primary relative z-10 shrink-0 border-r border-white/5">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

          <div className="max-w-5xl px-6 text-center relative z-10">
            <div className="flex justify-center items-center gap-4 mb-12">
              <span className="w-12 h-px bg-terracota"></span>
              <span className="text-terracota text-xs tracking-[0.4em] uppercase font-bold">
                El Estudio
              </span>
              <span className="w-12 h-px bg-terracota"></span>
            </div>

            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl leading-[0.9] mb-12">
              No hacemos <br />
              <span className="text-terracota italic">terrazas.</span>
            </h2>

            <p className="text-xl md:text-3xl text-primary/60 max-w-2xl mx-auto leading-relaxed">
              Creamos escenarios donde la vida sucede. <br />
              <span className="text-primary">Comfort Studio</span> es la obsesión por el detalle invisible.
            </p>

            <div className="mt-12 animate-bounce lg:hidden">
              <span className="text-xs uppercase tracking-widest opacity-50">Scroll Down</span>
            </div>
            <div className="mt-12 hidden lg:block animate-pulse">
              <span className="text-xs uppercase tracking-widest opacity-50">Scroll &rarr;</span>
            </div>
          </div>
        </div>

        {/* PANEL 2: ENFOQUE */}
        <div className="horizontal-panel w-full lg:w-[75vw] h-screen flex flex-col justify-end pb-24 bg-black relative z-20 shrink-0 border-r border-white/5">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
            alt="Enfoque"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 relative z-10">
            <span className="inline-block px-4 py-2 mb-6 rounded-full text-xs uppercase tracking-widest border border-white/30 bg-white/10 text-white backdrop-blur-md">
              Enfoque
            </span>
            <h3 className="font-serif text-5xl md:text-7xl mb-6 text-white">
              Extensión, no anexo.
            </h3>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              La terraza no es un satélite. Es la continuación lógica de tu sala, tu comedor y tu vida. Diseñamos espacios que fluyen, donde el límite entre interior y exterior se disuelve.
            </p>
          </div>
        </div>

        {/* PANEL 3: OBSESIÓN */}
        <div className="horizontal-panel w-full lg:w-[75vw] h-screen flex flex-col justify-end pb-24 bg-zinc-900 relative z-30 shrink-0 border-r border-white/5">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop"
            alt="Obsesión"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 relative z-10">
            <span className="inline-block px-4 py-2 mb-6 rounded-full text-xs uppercase tracking-widest border border-white/30 bg-white/10 text-white backdrop-blur-md">
              Obsesión
            </span>
            <h3 className="font-serif text-5xl md:text-7xl mb-6 text-white">
              El detalle invisible.
            </h3>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl leading-relaxed">
              La temperatura de la luz, la textura del piso descalzo. Lo que no se ve, pero se siente. Cada material es seleccionado no solo por cómo se ve, sino por cómo envejece.
            </p>
          </div>
        </div>

        {/* PANEL 4: ROL & STATS */}
        <div className="horizontal-panel w-full lg:w-[75vw] h-screen flex flex-col justify-center bg-terracota text-white relative z-40 shrink-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

          <div className="max-w-[1800px] w-full mx-auto px-6 md:px-12 relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-2 mb-8 rounded-full text-xs uppercase tracking-widest border border-white/30 bg-white/10 text-white backdrop-blur-md">
                Rol
              </span>
              <h3 className="font-serif text-5xl md:text-7xl mb-8">
                Orquestadores.
              </h3>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed mb-12">
                Coordinamos permisos, proveedores y tiempos. Tú disfrutas, nosotros resolvemos. Gestionamos la complejidad para que tu única preocupación sea disfrutar el resultado.
              </p>

              <button className="group relative px-8 py-4 bg-white text-terracota rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                  Conocer al equipo
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-8 md:gap-16">
              <div>
                <span className="block text-6xl md:text-8xl font-serif mb-2">+30</span>
                <span className="block text-sm uppercase tracking-widest opacity-70">Proyectos</span>
              </div>
              <div>
                <span className="block text-6xl md:text-8xl font-serif mb-2">4</span>
                <span className="block text-sm uppercase tracking-widest opacity-70">Años de Exp.</span>
              </div>
              <div className="col-span-2">
                <span className="block text-6xl md:text-8xl font-serif mb-2">100%</span>
                <span className="block text-sm uppercase tracking-widest opacity-70">Personalizado</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
