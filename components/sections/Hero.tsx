"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial State
      gsap.set(".hero-text-reveal", { y: 100, opacity: 0 });
      gsap.set(cardRef.current, { x: 100, opacity: 0 });
      gsap.set(".hero-btn", { y: 20, opacity: 0 });

      // 2. Entrance Animation
      tl.to(".hero-text-reveal", {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.1,
        delay: 0.2
      })
        .to(cardRef.current, {
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out"
        }, "-=1")
        .to(".hero-btn", {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1
        }, "-=0.8");

      // 3. Mouse Parallax Effect
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20;
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(cardRef.current, {
          x: -x,
          y: -y,
          duration: 1,
          ease: "power2.out"
        });

        gsap.to(titleRef.current, {
          x: x * 0.5,
          y: y * 0.5,
          duration: 1,
          ease: "power2.out"
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden flex items-center pt-24 md:pt-0"
    >
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.03)_0%,transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* --- Left Column: Content --- */}
        <div className="lg:col-span-7 space-y-10">

          {/* Tagline */}
          <div className="hero-text-reveal flex items-center gap-4">
            <div className="h-[1px] w-8 bg-terracota"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60 font-medium">
              Arquitectura Exterior · Lima
            </p>
          </div>

          {/* Main Title */}
          <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] tracking-tight">
            <span className="block hero-text-reveal">Terrazas que se</span>
            <span className="block hero-text-reveal">
              sienten <span className="text-terracota italic">hogar</span>
            </span>
            <span className="block hero-text-reveal">desde el inicio.</span>
          </h1>

          {/* Description */}
          <p className="hero-text-reveal text-lg text-white/60 max-w-xl leading-relaxed font-light">
            Transformamos terrazas, azoteas y patios en espacios diseñados con luz cálida, materiales premium y arquitectura pensada para ser vivida.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/cotiza"
              className="hero-btn group relative px-8 py-4 bg-terracota rounded-full overflow-hidden flex items-center justify-center gap-3 transition-transform hover:scale-105"
            >
              <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em] text-white">
                Cotizar Proyecto
              </span>
              <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform">↗</span>
            </Link>

            <Link
              href="/contacto"
              className="hero-btn group px-8 py-4 rounded-full border border-white/10 hover:bg-white/5 flex items-center justify-center gap-3 transition-all"
            >
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">
                Agendar Reunión
              </span>
              <svg className="w-4 h-4 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </Link>
          </div>
        </div>

        {/* --- Right Column: Stats Card --- */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end relative">
          <div
            ref={cardRef}
            className="w-full max-w-md bg-[#141414] border border-white/5 rounded-[2rem] p-8 md:p-10 relative overflow-hidden shadow-2xl"
          >
            {/* Active Indicator */}
            <div className="absolute top-8 right-8 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[0.6rem] uppercase tracking-widest text-white/40">Active</span>
            </div>

            <p className="text-[0.65rem] uppercase tracking-[0.25em] text-terracota mb-6 font-bold">
              Diseño + Obra Integral
            </p>

            <h3 className="font-serif text-3xl text-white mb-2">
              De la idea al espacio real:
            </h3>
            <p className="font-serif text-3xl text-white/50 italic mb-12">
              terrazas que venden confianza.
            </p>

            <div className="grid grid-cols-2 gap-y-8 border-t border-white/5 pt-8">
              <div>
                <span className="block text-4xl font-light text-white mb-1">80+</span>
                <span className="text-xs text-white/40 uppercase tracking-wider">Terrazas</span>
                <p className="text-[0.65rem] text-white/20 mt-1">Construidas en Lima</p>
              </div>

              <div className="relative">
                {/* Stamp Effect */}
                <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center animate-[spin_10s_linear_infinite]">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-2">
                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                    <text className="text-[11px] uppercase font-bold fill-white/30 tracking-[0.1em]">
                      <textPath href="#curve">
                        Comfort Studio • Design • Build •
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-3xl font-light text-white">4.9</span>
                  <span className="text-terracota">★</span>
                </div>
                <span className="text-xs text-white/40 uppercase tracking-wider">Satisfacción</span>
                <p className="text-[0.65rem] text-white/20 mt-1">Promedio en procesos</p>
              </div>

              <div>
                <span className="block text-3xl font-light text-white mb-1">12 <span className="text-sm">años</span></span>
                <span className="text-xs text-white/40 uppercase tracking-wider">Experiencia</span>
                <p className="text-[0.65rem] text-white/20 mt-1">Diseñando exteriores</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Floating Chat Button (Bottom Right) */}
      <div className="absolute bottom-8 right-8 hidden md:block">
        <button className="w-12 h-12 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-white/10 text-white hover:bg-terracota transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        </button>
      </div>
    </section>
  );
}
