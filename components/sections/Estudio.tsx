"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    id: "enfoque",
    label: "Enfoque",
    title: "Extensión, no anexo.",
    text: "La terraza no es un satélite. Es la continuación lógica de tu sala, tu comedor y tu vida.",
    colSpan: "md:col-span-2",
    bg: "bg-white/5"
  },
  {
    id: "detalle",
    label: "Obsesión",
    title: "El detalle invisible.",
    text: "La temperatura de la luz, la textura del piso descalzo. Lo que no se ve, pero se siente.",
    colSpan: "md:col-span-1",
    bg: "bg-[#151515]"
  },
  {
    id: "rol",
    label: "Rol",
    title: "Orquestadores.",
    text: "Coordinamos permisos, proveedores y tiempos. Tú disfrutas, nosotros resolvemos.",
    colSpan: "md:col-span-1",
    bg: "bg-[#151515]"
  },
  {
    id: "stats",
    label: "Trayectoria",
    type: "stats",
    stats: [
      { value: "+30", label: "Proyectos" },
      { value: "4 Años", label: "Experiencia" },
      { value: "100%", label: "Personalizado" }
    ],
    colSpan: "md:col-span-2",
    bg: "bg-white/5"
  }
];

export default function Estudio() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(".studio-header-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Grid Reveal
      gsap.from(".studio-card-reveal", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".studio-grid",
          start: "top 85%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="estudio"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

          {/* Header (Left) */}
          <div className="studio-header-reveal lg:sticky lg:top-32">
            <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
              El Estudio
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-8">
              No hacemos terrazas. <br />
              <span className="text-white/40 italic">Creamos escenarios de vida.</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-md mb-8">
              Comfort Studio nace de una obsesión: tratar el exterior con el mismo rigor, lujo y calidez que el interior más exclusivo.
            </p>

            <button className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300">
              <span className="uppercase tracking-widest text-xs font-bold">Conocer al equipo</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>

          {/* Bento Grid (Right) */}
          <div className="studio-grid grid grid-cols-1 md:grid-cols-3 gap-4">
            {principles.map((item) => (
              <div
                key={item.id}
                className={`
                  studio-card-reveal relative rounded-3xl p-8 border border-white/5 overflow-hidden group hover:border-white/20 transition-colors duration-500
                  ${item.colSpan}
                  ${item.bg}
                `}
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-terracota/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 h-full flex flex-col justify-between gap-8">
                  <div className="flex justify-between items-start">
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-black/20 text-[10px] uppercase tracking-widest text-white/60">
                      {item.label}
                    </span>
                    {item.type === 'stats' && (
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-terracota animate-pulse" />
                      </div>
                    )}
                  </div>

                  {item.type === 'stats' ? (
                    <div className="grid grid-cols-3 gap-4">
                      {item.stats?.map((stat, i) => (
                        <div key={i}>
                          <span className="block text-2xl md:text-3xl font-serif text-white mb-1">{stat.value}</span>
                          <span className="block text-[10px] uppercase tracking-wider text-white/40">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-2xl font-serif mb-3 group-hover:text-terracota transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
