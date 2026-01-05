"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        num: "01",
        title: "Descubrimiento",
        subtitle: "Entender para Crear",
        desc: "Nos sumergimos en tu visión. Analizamos el espacio, la luz y tus necesidades específicas para establecer las bases sólidas del proyecto."
    },
    {
        num: "02",
        title: "Concepto",
        subtitle: "La Esencia Visual",
        desc: "Traducimos ideas en lenguaje visual. Moodboards, materialidad y bocetos preliminares que definen la atmósfera y el carácter del espacio."
    },
    {
        num: "03",
        title: "Desarrollo",
        subtitle: "Rigor Técnico",
        desc: "Arquitectura de detalle. Desarrollamos planos constructivos, cortes y especificaciones técnicas precisas para garantizar una ejecución impecable."
    },
    {
        num: "04",
        title: "Ejecución",
        subtitle: "Materialización",
        desc: "Supervisión obsesiva. Acompañamos cada etapa de la construcción, asegurando que la realidad supere a la expectativa."
    }
];

export default function ProcesoPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Simple grid reveal
            gsap.from(".process-card", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".process-grid",
                    start: "top 80%"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] pt-32 pb-24">

            <div className="max-w-6xl mx-auto px-6 md:px-12">

                {/* --- COMPACT HEADER --- */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="block text-terracota text-xs tracking-[0.4em] uppercase font-bold mb-4">
                        Metodología
                    </span>
                    <h1 className="font-serif text-5xl md:text-7xl mb-6">
                        El Proceso
                    </h1>
                    <div className="w-px h-16 bg-[var(--text-primary)]/20 mx-auto" />
                </div>

                {/* --- ARCHITECTURAL GRID --- */}
                <div className="process-grid grid grid-cols-1 md:grid-cols-2 border-t border-l border-[var(--text-primary)]/10">
                    {STEPS.map((step, i) => (
                        <div key={i} className="process-card group relative p-12 md:p-16 border-r border-b border-[var(--text-primary)]/10 hover:bg-[var(--text-primary)]/5 transition-colors duration-500">
                            <span className="block text-6xl md:text-8xl font-serif text-[var(--text-primary)]/5 group-hover:text-terracota/10 transition-colors duration-300 mb-8 select-none">
                                {step.num}
                            </span>

                            <h2 className="font-serif text-3xl md:text-4xl mb-2 text-[var(--text-primary)]">
                                {step.title}
                            </h2>
                            <span className="block text-terracota text-xs uppercase tracking-[0.2em] mb-6 font-medium">
                                {step.subtitle}
                            </span>

                            <p className="text-[var(--text-primary)]/70 font-light leading-relaxed max-w-sm">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </div>

                {/* --- FOOTER CTA --- */}
                <div className="mt-24 text-center">
                    <p className="text-sm uppercase tracking-widest mb-8 text-[var(--text-primary)]/40">¿Listo para comenzar?</p>
                    <a href="/contacto" className="inline-block border-b border-terracota text-terracota uppercase tracking-widest text-sm font-bold pb-1 hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-colors duration-300">
                        Iniciar Proyecto
                    </a>
                </div>

            </div>
        </main>
    );
}
