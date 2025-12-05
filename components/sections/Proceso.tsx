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
      className="relative bg-primary text-primary py-24 md:py-32 overflow-hidden transition-colors duration-500"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2669&auto=format&fit=crop"
          alt="Architectural Background"
          fill
          className="object-cover opacity-10 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]" />
      </div>

      {/* Background Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* Vibrant Gradient Orbs (Matching Estudio) */}
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-terracota/10 blur-[120px] rounded-full pointer-events-none mix-blend-screen animate-pulse duration-10000" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header */}
        <div className="process-header-reveal text-center mb-24">
          <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">
            Metodología
          </span>
          <h2 className="font-serif text-5xl md:text-7xl leading-none mb-8">
            Del caos al <br />
            <span className="text-terracota italic">orden estético.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="process-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.id}
              className="process-card-reveal relative rounded-3xl overflow-hidden group transition-all duration-500 min-h-[400px] border border-transparent hover:border-terracota/50 hover:shadow-2xl hover:shadow-terracota/10"
            >
              {/* Glass Background - Improved Visibility */}
              <div className="absolute inset-0 bg-white/60 dark:bg-white/5 backdrop-blur-md group-hover:bg-white/80 dark:group-hover:bg-white/10 transition-colors duration-500" />

              {/* Content */}
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">

                {/* Top Label */}
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-primary/10 bg-primary/5 text-primary/60 group-hover:border-terracota/30 group-hover:text-terracota transition-colors duration-500">
                    {step.label.split(" · ")[1]}
                  </span>
                  <span className="text-4xl font-serif text-primary/10 group-hover:text-terracota/20 transition-colors duration-500">
                    0{step.id}
                  </span>
                </div>

                {/* Main Text */}
                <div className="mt-8 mb-8">
                  <h3 className="font-serif text-2xl mb-4 text-primary group-hover:text-terracota transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-primary/60 transition-colors duration-500">
                    {step.description}
                  </p>
                </div>

                {/* Meta Data (Bottom) */}
                <div className="mt-auto pt-6 border-t border-primary/5 group-hover:border-terracota/20 transition-colors duration-500">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-primary/40 mb-1">Duración</span>
                      <span className="text-xs font-medium text-primary">{step.meta.duration}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase tracking-wider text-primary/40 mb-1">Resultado</span>
                      <span className="text-xs font-medium text-primary">{step.meta.outcome}</span>
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
