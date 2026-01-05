"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        num: "01",
        title: "Descubrimiento",
        desc: "Nos reunimos para entender tu visión, necesidades y el potencial de tu espacio."
    },
    {
        num: "02",
        title: "Concepto",
        desc: "Desarrollamos una propuesta visual y conceptual. Moodboards, bocetos y primeras ideas."
    },
    {
        num: "03",
        title: "Desarrollo",
        desc: "Planos técnicos, detalles constructivos y selección de materiales. Todo listo para construir."
    },
    {
        num: "04",
        title: "Ejecución",
        desc: "Supervisión de obra y construcción. Cuidamos cada detalle hasta la entrega final."
    }
];

export default function ProcesoPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const steps = gsap.utils.toArray<HTMLElement>(".process-step");

            steps.forEach((step, i) => {
                gsap.from(step, {
                    x: i % 2 === 0 ? -50 : 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: step,
                        start: "top 80%"
                    }
                });
            });

        }, containerRef);


        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <main ref={containerRef} className="relative bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] pt-48 pb-24 overflow-hidden">

            {/* Background Ambience */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-linear-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)] opacity-50" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-terracota/5 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse duration-10000" />
                <div className="absolute bottom-0 left-0 w-[60vw] h-[60vw] md:w-[500px] md:h-[500px] bg-[var(--text-primary)]/5 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-24">
                    <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">
                        Metodología
                    </span>
                    <h1 className="font-serif text-6xl md:text-8xl mb-8">
                        El Proceso
                    </h1>
                </div>

                <div className="space-y-24 relative">
                    {/* Central Line */}
                    <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[var(--text-primary)]/10 hidden md:block" />

                    {STEPS.map((step, i) => (
                        <div key={i} className={`process-step flex flex-col md:flex-row gap-8 md:gap-24 items-center ${i % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}>

                            <div className="flex-1 w-full p-8 md:p-0 rounded-2xl md:rounded-none bg-[var(--bg-secondary)]/50 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-[var(--text-primary)]/5 md:border-none">
                                <span className="text-6xl font-serif text-terracota/20 font-bold block mb-4">{step.num}</span>
                                <h3 className="text-3xl font-serif mb-4">{step.title}</h3>
                                <p className="text-[var(--text-primary)]/70 leading-relaxed">{step.desc}</p>
                            </div>

                            <div className="flex-1 hidden md:block" /> {/* Spacer */}

                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
