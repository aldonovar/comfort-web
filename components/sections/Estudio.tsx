"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Estudio() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>(".horizontal-panel");
      const totalSections = sections.length;

      // UNIVERSAL HORIZONTAL SCROLL (Optimized for Mobile)
      const scrollTween = gsap.to(sections, {
        xPercent: -100 * (totalSections - 1),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 0.3, // Tighter scrub for more response
          start: "top top",
          end: () => `+=${window.innerWidth * (window.innerWidth < 768 ? 2.5 : 3)}`,
          snap: {
            snapTo: 1 / (totalSections - 1),
            duration: { min: 0.4, max: 0.7 }, // Forced, magnetic snap
            delay: 0, // Instant snap start (no waiting)
            ease: "power2.inOut"
          },
          invalidateOnRefresh: true,
          anticipatePin: 1,
        }
      });

      // Internal Animations
      sections.forEach((section, index) => {
        // Skip Panel 1 (Index 0) generally to prevent "Black Screen" bug on rapid reverse
        if (index === 0) return;

        const anims = section.querySelectorAll(".panel-anim");
        if (anims.length > 0) {
          gsap.from(anims, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: section,
              containerAnimation: scrollTween,
              start: "left center",
              toggleActions: "play none reverse none"
            }
          });
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="estudio" className="relative bg-black text-white overflow-hidden">

      {/* 
        Container: Always Horizontal row, h-[100dvh] for mobile browser address bar stability.
        Added 'will-change-transform' to help rendering performance.
      */}
      <div ref={containerRef} className="flex flex-row w-[400vw] h-[100dvh] will-change-transform">

        {/* --- PANEL 1: MANIFESTO --- */}
        {/* REMOVED 'panel-anim' from main elements to fix Black Screen bug on scroll back */}
        <div className="horizontal-panel w-screen h-[100dvh] flex flex-col justify-center items-center bg-primary text-primary relative z-10 shrink-0 border-r border-white/5">
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>

          <div className="max-w-5xl px-8 md:px-6 text-center relative z-10 flex flex-col items-center">

            <div className="flex justify-center items-center gap-4 mb-6 lg:mb-12">
              <span className="w-8 lg:w-12 h-px bg-terracota"></span>
              <span className="text-terracota text-[10px] lg:text-xs tracking-[0.4em] uppercase font-bold">
                El Estudio
              </span>
              <span className="w-8 lg:w-12 h-px bg-terracota"></span>
            </div>

            <h2 className="font-serif text-4xl md:text-8xl lg:text-9xl leading-[1.1] md:leading-[0.9] mb-6 lg:mb-12">
              No hacemos <br />
              <span className="text-terracota italic">terrazas.</span>
            </h2>

            <p className="text-lg md:text-3xl text-primary/60 max-w-sm md:max-w-2xl mx-auto leading-relaxed text-balance">
              Creamos escenarios donde la vida sucede. <br className="hidden md:block" />
              <span className="text-primary font-medium">Comfort Studio</span> es la obsesión por lo que no se ve.
            </p>

            <div className="mt-8 md:mt-12 animate-pulse panel-anim">
              <span className="text-[10px] md:text-xs uppercase tracking-widest opacity-50 flex items-center gap-2">
                Scroll <span className="text-xl">→</span>
              </span>
            </div>
          </div>
        </div>

        {/* --- PANEL 2: ENFOQUE --- */}
        <div className="horizontal-panel w-screen h-[100dvh] flex flex-col justify-center md:justify-end pb-0 md:pb-24 bg-black relative z-20 shrink-0 border-r border-white/5 overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop"
            alt="Enfoque"
            fill
            className="object-cover opacity-50 md:opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 md:via-black/50 md:to-transparent" />

          <div className="max-w-[1800px] w-full mx-auto px-8 md:px-12 relative z-10 text-center md:text-left">
            <span className="panel-anim inline-block px-3 py-1.5 lg:px-4 lg:py-2 mb-4 lg:mb-6 rounded-full text-[10px] lg:text-xs uppercase tracking-widest border border-white/30 bg-white/10 text-white backdrop-blur-md">
              Enfoque
            </span>
            <h3 className="panel-anim font-serif text-3xl md:text-7xl mb-4 lg:mb-6 text-white leading-tight">
              Extensión, <br className="md:hidden" /> <span className="text-white/50 italic">no anexo.</span>
            </h3>
            <p className="panel-anim text-base md:text-2xl text-white/80 max-w-sm md:max-w-2xl mx-auto md:mx-0 leading-relaxed text-balance">
              La terraza no es un satélite. Es la continuación lógica de tu sala, tu comedor y tu vida.
            </p>
          </div>
        </div>

        {/* --- PANEL 3: OBSESIÓN --- */}
        <div className="horizontal-panel w-screen h-[100dvh] flex flex-col justify-center md:justify-end pb-0 md:pb-24 bg-zinc-900 relative z-30 shrink-0 border-r border-white/5 overflow-hidden group">
          <Image
            src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop"
            alt="Obsesión"
            fill
            className="object-cover opacity-50 md:opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 md:via-black/50 md:to-transparent" />

          <div className="max-w-[1800px] w-full mx-auto px-8 md:px-12 relative z-10 text-center md:text-left">
            <span className="panel-anim inline-block px-3 py-1.5 lg:px-4 lg:py-2 mb-4 lg:mb-6 rounded-full text-[10px] lg:text-xs uppercase tracking-widest border border-white/30 bg-white/10 text-white backdrop-blur-md">
              Obsesión
            </span>
            <h3 className="panel-anim font-serif text-3xl md:text-7xl mb-4 lg:mb-6 text-white leading-tight">
              El detalle <br className="md:hidden" /> <span className="text-white/50 italic">invisible.</span>
            </h3>
            <p className="panel-anim text-base md:text-2xl text-white/80 max-w-sm md:max-w-2xl mx-auto md:mx-0 leading-relaxed text-balance">
              La temperatura de la luz, la textura del piso descalzo. Lo que no se ve, pero se siente.
            </p>
          </div>
        </div>

        {/* --- PANEL 4: ROL & STATS --- */}
        <div className="horizontal-panel w-screen h-[100dvh] flex flex-col justify-center bg-terracota text-white relative z-40 shrink-0">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>

          <div className="max-w-[1800px] w-full mx-auto px-8 md:px-12 relative z-10 grid md:grid-cols-2 gap-8 md:gap-16 items-center text-center md:text-left">
            <div>
              <span className="panel-anim inline-block px-4 py-2 mb-4 md:mb-8 rounded-full text-[10px] lg:text-xs uppercase tracking-widest border border-white/30 bg-white/10 text-white backdrop-blur-md">
                Rol
              </span>
              <h3 className="panel-anim font-serif text-4xl md:text-7xl mb-4 md:mb-8">
                Orquestadores.
              </h3>
              <p className="panel-anim text-base md:text-2xl text-white/90 leading-relaxed mb-8 md:mb-12 text-balance max-w-sm mx-auto md:mx-0">
                Coordinamos permisos, proveedores y tiempos. Tú disfrutas, nosotros resolvemos.
              </p>

              <Link href="/nosotros" className="panel-anim group relative inline-flex px-8 py-4 bg-white text-terracota rounded-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest">
                  Conocer al equipo
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
            </div>

            <div className="panel-anim grid grid-cols-2 gap-y-8 gap-x-4 md:gap-16 border-t md:border-t-0 border-white/20 pt-8 md:pt-0">
              <div>
                <span className="block text-4xl md:text-8xl font-serif mb-2">+30</span>
                <span className="block text-[9px] md:text-sm uppercase tracking-widest opacity-70">Proyectos Ejecutados</span>
              </div>
              <div>
                <span className="block text-4xl md:text-8xl font-serif mb-2">4</span>
                <span className="block text-[9px] md:text-sm uppercase tracking-widest opacity-70">Años de Expertise</span>
              </div>
              <div className="col-span-2">
                <span className="block text-4xl md:text-8xl font-serif mb-2">100%</span>
                <span className="block text-[9px] md:text-sm uppercase tracking-widest opacity-70"> Diseño Personalizado</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
