"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    id: "enfoque",
    label: "Enfoque",
    title: "Extensión, no anexo.",
    text: "La terraza no es un satélite. Es la continuación lógica de tu sala, tu comedor y tu vida.",
    colSpan: "md:col-span-2",
    bg: "bg-primary/5"
  },
  {
    id: "detalle",
    label: "Obsesión",
    title: "El detalle invisible.",
    text: "La temperatura de la luz, la textura del piso descalzo. Lo que no se ve, pero se siente.",
    colSpan: "md:col-span-1",
    bg: "bg-secondary"
  },
  {
    id: "rol",
    label: "Rol",
    title: "Orquestadores.",
    text: "Coordinamos permisos, proveedores y tiempos. Tú disfrutas, nosotros resolvemos.",
    colSpan: "md:col-span-1",
    bg: "bg-secondary"
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
    bg: "bg-primary/5"
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
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".studio-grid",
          start: "top 95%", // Trigger earlier
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="estudio"
      className="relative bg-primary text-primary py-24 md:py-32 overflow-hidden transition-colors duration-500"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop"
          alt="Studio Background"
          fill
          className="object-cover opacity-10 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
      </div>

      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>



      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

          {/* Header (Left) */}
          <div className="studio-header-reveal lg:sticky lg:top-32">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-terracota"></span>
              <span className="text-terracota text-xs tracking-[0.3em] uppercase font-bold">
                El Estudio
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-7xl leading-[1] mb-8">
              No hacemos <br />
              <span className="text-terracota italic">terrazas.</span> <br />
              <span className="text-primary/40">Creamos escenarios.</span>
            </h2>

            <p className="text-primary/70 text-lg leading-relaxed max-w-md mb-10 transition-colors duration-500">
              <span className="text-terracota font-bold">Comfort Studio</span> nace de una obsesión: tratar el exterior con el mismo <span className="text-primary font-medium">rigor, lujo y calidez</span> que el interior más exclusivo.
            </p>

            <button className="group relative px-8 py-4 bg-transparent border border-terracota text-terracota rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-terracota/20 hover:scale-105 active:scale-95">
              <div className="absolute inset-0 bg-terracota translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                Conocer al equipo
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </button>
          </div>

          {/* Bento Grid (Right) */}
          <div className="studio-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((item) => (
              <div
                key={item.id}
                className={`
                  studio-card-reveal relative rounded-3xl overflow-hidden group transition-all duration-500
                  ${item.colSpan}
                  min-h-[300px] md:min-h-[350px]
                  border border-transparent hover:border-terracota/50 hover:shadow-2xl hover:shadow-terracota/10
                `}
              >
                {/* Background Image (for specific cards) */}
                {item.id === 'enfoque' && (
                  <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                )}

                {item.id === 'detalle' && (
                  <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop" className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                  </div>
                )}

                {/* Glass Background for others */}
                {item.id !== 'enfoque' && item.id !== 'detalle' && (
                  <div className="absolute inset-0 bg-white/90 dark:bg-black/60 backdrop-blur-xl group-hover:bg-white/95 dark:group-hover:bg-black/70 transition-colors duration-500" />
                )}

                {/* Content */}
                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <span className={`
                      px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border transition-colors duration-500
                      ${(item.id === 'enfoque' || item.id === 'detalle') ? 'border-white/20 bg-white/10 text-white' : 'border-primary/10 bg-primary/5 text-primary/60 group-hover:border-terracota/30 group-hover:text-terracota'}
                    `}>
                      {item.label}
                    </span>
                    {item.type === 'stats' && (
                      <span className="w-2 h-2 rounded-full bg-terracota animate-pulse" />
                    )}
                  </div>

                  {item.type === 'stats' ? (
                    <div className="grid grid-cols-3 gap-4 mt-auto">
                      {item.stats?.map((stat, i) => (
                        <div key={i}>
                          <span className="block text-3xl md:text-5xl font-serif text-primary mb-2 transition-colors duration-500 group-hover:text-terracota">{stat.value}</span>
                          <span className="block text-[10px] uppercase tracking-wider text-primary/40 transition-colors duration-500">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-auto">
                      <h3 className={`font-serif text-3xl mb-4 transition-colors duration-300 ${(item.id === 'enfoque' || item.id === 'detalle') ? 'text-white' : 'text-primary group-hover:text-terracota'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-colors duration-500 ${(item.id === 'enfoque' || item.id === 'detalle') ? 'text-white/80' : 'text-primary/60'}`}>
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
