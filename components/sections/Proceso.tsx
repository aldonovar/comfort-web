"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    id: 1,
    label: "01 · Diagnóstico",
    title: "Lectura del Espacio",
    description: "Analizamos luz, viento y estructura. Entendemos lo que el espacio pide antes de imponer una idea.",
    meta: {
      focus: "Análisis",
      duration: "1 Visita",
      outcome: "Viabilidad"
    }
  },
  {
    id: 2,
    label: "02 · Concepto",
    title: "Diseño de Experiencia",
    description: "No solo muebles, sino flujos. Diseñamos cómo te moverás, dónde cocinarás y dónde descansarás.",
    meta: {
      focus: "Estrategia",
      duration: "2 Semanas",
      outcome: "Masterplan"
    }
  },
  {
    id: 3,
    label: "03 · Materialidad",
    title: "Selección Curada",
    description: "Elegimos texturas que envejecen con dignidad. Maderas, piedras y metales que resisten el clima de Lima.",
    meta: {
      focus: "Tangibilidad",
      duration: "1 Semana",
      outcome: "Look & Feel"
    }
  },
  {
    id: 4,
    label: "04 · Ejecución",
    title: "Obra y Entrega",
    description: "Coordinación total. Desde la demolición hasta la última luz encendida, nosotros nos encargamos.",
    meta: {
      focus: "Precisión",
      duration: "Según Proyecto",
      outcome: "Llave en Mano"
    }
  },
];

export default function Proceso() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Reveal
      gsap.from(".process-header-reveal", {
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
      gsap.from(".process-card-reveal", {
        y: 50,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".process-grid",
          start: "top 90%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative bg-[var(--bg-primary)] text-[var(--text-primary)] py-16 md:py-32 overflow-hidden transition-colors duration-500"
    >
      {/* Background Image - Balanced visibility */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2669&auto=format&fit=crop"
          alt="Architectural Background"
          fill
          className="object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-primary)]/60 to-[var(--bg-primary)]" />
      </div>

      {/* Background Noise used to add texture */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Vibrant Gradient Orbs - Adjusted for subtlety/premium feel */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-terracota/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-10000" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="process-header-reveal text-center mb-12 md:mb-24">
          <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">
            Metodología
          </span>
          <h2 className="font-serif text-3xl md:text-7xl leading-none mb-8 text-[var(--text-primary)]">
            Del caos al <br />
            <span className="text-terracota italic">orden estético.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="process-card-reveal relative rounded-3xl overflow-hidden group transition-all duration-500 min-h-[280px] md:min-h-[400px] border border-[var(--text-primary)]/5 hover:border-terracota/50 hover:shadow-2xl hover:shadow-terracota/10"
            >
              {/* Glass Background - Lighter for visibility */}
              <div className="absolute inset-0 bg-[var(--bg-secondary)]/40 backdrop-blur-md group-hover:bg-[var(--bg-secondary)]/60 transition-colors duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full p-6 md:p-8 flex flex-col justify-between">

                {/* Top Label */}
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-[var(--text-primary)]/10 bg-[var(--text-primary)]/5 text-[var(--text-primary)]/70 group-hover:border-terracota/30 group-hover:text-terracota transition-colors duration-500">
                    {step.label.split(" · ")[1]}
                  </span>
                  <span className="text-4xl font-serif text-[var(--text-primary)]/5 group-hover:text-terracota/20 transition-colors duration-500">
                    0{step.id}
                  </span>
                </div>

                {/* Main Text */}
                <div className="mt-6 mb-6 md:mt-8 md:mb-8">
                  <h3 className="font-serif text-xl md:text-2xl mb-4 text-[var(--text-primary)] group-hover:text-terracota transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-primary)]/60 group-hover:text-[var(--text-primary)]/80 transition-colors duration-500">
                    {step.description}
                  </p>
                </div>

                {/* Meta Data (Bottom) */}
                <div className="mt-auto pt-6 border-t border-[var(--text-primary)]/5 group-hover:border-terracota/20 transition-colors duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-[var(--text-primary)]/50 mb-1">Duración</span>
                      <span className="text-xs font-medium text-[var(--text-primary)]">{step.meta.duration}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-[var(--text-primary)]/50 mb-1">Resultado</span>
                      <span className="text-xs font-medium text-[var(--text-primary)]">{step.meta.outcome}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
