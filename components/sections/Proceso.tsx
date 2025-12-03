"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  const [activeStep, setActiveStep] = useState(0);

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

      // Scroll Spy for Steps
      steps.forEach((step, index) => {
        ScrollTrigger.create({
          trigger: `#process-step-${index}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStep(index),
          onEnterBack: () => setActiveStep(index),
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="proceso"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

          {/* Sticky Command Center (Left) */}
          <div className="hidden lg:block sticky top-32 h-auto">
            <div className="process-header-reveal mb-12">
              <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
                Metodología
              </span>
              <h2 className="font-serif text-4xl leading-[1.1] mb-6">
                Del caos al <br />
                <span className="text-white/40 italic">orden estético.</span>
              </h2>
            </div>

            <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl p-8 overflow-hidden">
              {/* Dynamic Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-terracota/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/50">Fase Actual</span>
                  <span className="text-2xl font-serif text-terracota">0{activeStep + 1}</span>
                </div>

                <div className="space-y-8">
                  <div className="transition-all duration-500">
                    <h3 className="text-3xl font-serif mb-2">{steps[activeStep].title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {steps[activeStep].description}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Foco</span>
                      <span className="text-sm font-medium">{steps[activeStep].meta.focus}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Duración</span>
                      <span className="text-sm font-medium">{steps[activeStep].meta.duration}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Resultado</span>
                      <span className="text-sm font-medium">{steps[activeStep].meta.outcome}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Steps (Right) */}
          <div className="space-y-24 lg:pt-32">
            {/* Mobile Header (Visible only on mobile) */}
            <div className="lg:hidden mb-12">
              <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
                Metodología
              </span>
              <h2 className="font-serif text-4xl leading-[1.1]">
                Del caos al <br />
                <span className="text-white/40 italic">orden estético.</span>
              </h2>
            </div>

            {steps.map((step, index) => (
              <div
                key={step.id}
                id={`process-step-${index}`}
                className={`group transition-all duration-500 ${activeStep === index ? 'opacity-100' : 'opacity-30 lg:opacity-30'}`}
              >
                <div className="flex items-start gap-6 md:gap-10">
                  <div className="flex-shrink-0 pt-2">
                    <span className={`
                      flex items-center justify-center w-12 h-12 rounded-full border text-sm font-bold transition-all duration-500
                      ${activeStep === index ? 'border-terracota text-terracota bg-terracota/10' : 'border-white/20 text-white/40'}
                    `}>
                      0{index + 1}
                    </span>
                    <div className={`w-px h-32 mx-auto my-4 transition-colors duration-500 ${activeStep === index ? 'bg-terracota/50' : 'bg-white/10'}`} />
                  </div>

                  <div className="pt-2">
                    <span className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-2">
                      {step.label}
                    </span>
                    <h3 className="text-2xl md:text-4xl font-serif mb-4 group-hover:text-terracota transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl">
                      {step.description}
                    </p>

                    {/* Mobile Meta (Visible only on mobile) */}
                    <div className="lg:hidden grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Foco</span>
                        <span className="text-xs font-medium">{step.meta.focus}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase tracking-wider text-white/40 mb-1">Duración</span>
                        <span className="text-xs font-medium">{step.meta.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
