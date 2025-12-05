"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface Principle {
  id: string;
  label: string;
  title?: string;
  text?: string;
  image?: string;
  type?: "image" | "text" | "stats";
  stats?: { value: string; label: string }[];
}

const principles: Principle[] = [
  {
    id: "enfoque",
    label: "Enfoque",
    title: "Extensión, no anexo.",
    text: "La terraza no es un satélite. Es la continuación lógica de tu sala, tu comedor y tu vida. Diseñamos espacios que fluyen, donde el límite entre interior y exterior se disuelve.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    type: "image"
  },
  {
    id: "detalle",
    label: "Obsesión",
    title: "El detalle invisible.",
    text: "La temperatura de la luz, la textura del piso descalzo. Lo que no se ve, pero se siente. Cada material es seleccionado no solo por cómo se ve, sino por cómo envejece y cómo se siente al tacto.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop",
    type: "image"
  },
  {
    id: "rol",
    label: "Rol",
    title: "Orquestadores.",
    text: "Coordinamos permisos, proveedores y tiempos. Tú disfrutas, nosotros resolvemos. Gestionamos la complejidad para que tu única preocupación sea disfrutar el resultado.",
    type: "text"
  },
  {
    id: "stats",
    label: "Trayectoria",
    type: "stats",
    stats: [
      { value: "+30", label: "Proyectos" },
      { value: "4 Años", label: "Experiencia" },
      { value: "100%", label: "Personalizado" }
    ]
  }
];

export default function Estudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the manifesto text on scroll
      gsap.from(".manifesto-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Animate right column blocks as they enter view
      const blocks = gsap.utils.toArray<HTMLElement>(".studio-block");
      blocks.forEach((block) => {
        gsap.from(block, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 85%",
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="estudio"
      className="relative bg-primary text-primary py-24 md:py-32 overflow-hidden"
    >
      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left Column - Sticky Manifesto */}
          <div className="lg:w-5/12 lg:h-[calc(100vh-8rem)] lg:sticky lg:top-32 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-8">
              <span className="w-12 h-px bg-terracota"></span>
              <span className="text-terracota text-xs tracking-[0.3em] uppercase font-bold">
                El Estudio
              </span>
            </div>

            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-12 manifesto-text">
              No hacemos <br />
              <span className="text-terracota italic">terrazas.</span> <br />
              <span className="text-primary/40">Creamos escenarios.</span>
            </h2>

            <p className="text-primary/80 text-lg md:text-xl leading-relaxed max-w-md mb-12 manifesto-text">
              <span className="text-terracota font-bold">Comfort Studio</span> nace de una obsesión: tratar el exterior con el mismo <span className="text-primary font-medium">rigor, lujo y calidez</span> que el interior más exclusivo.
            </p>

            <div className="manifesto-text">
              <button className="group relative px-8 py-4 bg-transparent border border-terracota text-terracota rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-terracota/20 hover:scale-105 active:scale-95">
                <div className="absolute inset-0 bg-terracota translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                  Conocer al equipo
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
            </div>
          </div>

          {/* Right Column - Immersive Scroll */}
          <div ref={rightColumnRef} className="lg:w-7/12 flex flex-col gap-12 lg:gap-24 pt-12 lg:pt-0">
            {principles.map((item) => (
              <div
                key={item.id}
                className="studio-block relative group"
              >
                {item.type === 'image' ? (
                  <div className="relative aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                      src={item.image || ""}
                      alt={item.title || ""}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                      <span className="inline-block px-3 py-1 mb-4 rounded-full text-[10px] uppercase tracking-widest border border-white/30 bg-white/10 text-white backdrop-blur-md">
                        {item.label}
                      </span>
                      <h3 className="font-serif text-3xl md:text-5xl text-white mb-4">
                        {item.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
                        {item.text}
                      </p>
                    </div>
                  </div>
                ) : item.type === 'stats' ? (
                  <div className="bg-secondary/50 dark:bg-secondary/10 backdrop-blur-xl border border-primary/5 dark:border-white/5 rounded-3xl p-8 md:p-12 shadow-xl">
                    <span className="inline-block px-3 py-1 mb-8 rounded-full text-[10px] uppercase tracking-widest border border-primary/10 bg-primary/5 text-primary">
                      {item.label}
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {item.stats?.map((stat, i) => (
                        <div key={i} className="relative">
                          <span className="block text-5xl md:text-6xl font-serif text-primary mb-2">{stat.value}</span>
                          <span className="block text-xs uppercase tracking-wider text-primary/60">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-terracota text-white rounded-3xl p-8 md:p-12 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <span className="inline-block px-3 py-1 mb-6 rounded-full text-[10px] uppercase tracking-widest border border-white/20 bg-white/10 text-white">
                      {item.label}
                    </span>
                    <h3 className="font-serif text-3xl md:text-5xl mb-6 relative z-10">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-lg leading-relaxed relative z-10">
                      {item.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
