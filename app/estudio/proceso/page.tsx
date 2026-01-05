"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
    {
        num: "01",
        title: "Descubrimiento",
        subtitle: "Entender para Crear",
        desc: "Nos sumergimos en tu visión. Analizamos el espacio, la luz y tus necesidades específicas para establecer las bases sólidas del proyecto.",
        image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1000&auto=format&fit=crop"
    },
    {
        num: "02",
        title: "Concepto",
        subtitle: "La Esencia Visual",
        desc: "Traducimos ideas en lenguaje visual. Moodboards, materialidad y bocetos preliminares que definen la atmósfera y el carácter del espacio.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1000&auto=format&fit=crop"
    },
    {
        num: "03",
        title: "Desarrollo",
        subtitle: "Rigor Técnico",
        desc: "Arquitectura de detalle. Desarrollamos planos constructivos, cortes y especificaciones técnicas precisas para garantizar una ejecución impecable.",
        image: "https://images.unsplash.com/photo-1664124976451-248641979b9a?q=80&w=1000&auto=format&fit=crop"
    },
    {
        num: "04",
        title: "Ejecución",
        subtitle: "Materialización",
        desc: "Supervisión obsesiva. Acompañamos cada etapa de la construcción, asegurando que la realidad supere a la expectativa.",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1000&auto=format&fit=crop"
    }
];

export default function ProcesoPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".proceso-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Step Animations
            const sections = gsap.utils.toArray<HTMLElement>(".step-section");
            sections.forEach((section) => {
                const img = section.querySelector(".step-img-container");
                const text = section.querySelector(".step-text");

                ScrollTrigger.create({
                    trigger: section,
                    start: "top 70%",
                    onEnter: () => {
                        gsap.fromTo(img,
                            { clipPath: "inset(0% 100% 0% 0%)", scale: 1.1 },
                            { clipPath: "inset(0% 0% 0% 0%)", scale: 1, duration: 1.5, ease: "power4.out" }
                        );
                        gsap.fromTo(text,
                            { y: 50, opacity: 0 },
                            { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
                        );
                    }
                });
            });

        }, containerRef);

        const timer = setTimeout(() => ScrollTrigger.refresh(), 500);
        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <main ref={containerRef} className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)]">

            {/* --- HERO --- */}
            <section className="proceso-hero relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <Image
                        src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1920&auto=format&fit=crop"
                        alt="Process Hero"
                        fill
                        className="hero-bg object-cover opacity-30 blur-sm scale-110"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-[var(--bg-primary)]/80 via-[var(--bg-primary)]/20 to-[var(--bg-primary)]" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <span className="block text-terracota text-sm tracking-[0.5em] uppercase font-bold mb-8 animate-fade-in-up">
                        Metodología
                    </span>
                    <h1 className="font-serif text-6xl md:text-9xl mb-6 animate-fade-in-up delay-100">
                        El Proceso
                    </h1>
                    <p className="text-xl md:text-2xl font-light text-[var(--text-primary)]/60 max-w-2xl mx-auto animate-fade-in-up delay-200">
                        Del caos de las ideas al orden de la arquitectura.
                    </p>
                </div>
            </section>

            {/* --- STEPS --- */}
            <div className="pb-32 px-6 md:px-24">
                <div className="max-w-[1400px] mx-auto space-y-32 md:space-y-48">
                    {STEPS.map((step, i) => (
                        <section key={i} className={`step-section flex flex-col md:flex-row gap-12 md:gap-24 items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>

                            {/* Image Side */}
                            <div className="w-full md:w-1/2 aspect-square md:aspect-4/3 relative">
                                <div className="step-img-container absolute inset-0 overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-800 shadow-2xl">
                                    <Image
                                        src={step.image}
                                        alt={step.title}
                                        fill
                                        className="object-cover transition-transform duration-1000 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 border border-white/10 pointer-events-none" />
                                </div>

                                {/* Floating Number */}
                                <span className="absolute -top-12 -left-6 md:-left-12 font-serif text-[8rem] md:text-[12rem] leading-none text-terracota/10 select-none z-[-1]">
                                    {step.num}
                                </span>
                            </div>

                            {/* Text Side */}
                            <div className="step-text w-full md:w-1/2 text-center md:text-left opacity-0">
                                <span className="text-terracota text-xs uppercase tracking-[0.3em] font-bold block mb-4">
                                    Fase {step.num}
                                </span>
                                <h2 className="font-serif text-4xl md:text-6xl mb-4 text-[var(--text-primary)]">
                                    {step.title}
                                </h2>
                                <h3 className="text-lg md:text-xl font-light italic text-[var(--text-primary)]/50 mb-8 border-l-2 border-terracota/30 pl-4 py-2">
                                    {step.subtitle}
                                </h3>
                                <p className="text-lg md:text-xl text-[var(--text-primary)]/80 leading-relaxed max-w-md mx-auto md:mx-0 font-light">
                                    {step.desc}
                                </p>
                            </div>

                        </section>
                    ))}
                </div>
            </div>

            {/* --- FOOTER CTA --- */}
            <section className="py-24 text-center border-t border-[var(--text-primary)]/5">
                <p className="text-sm uppercase tracking-widest mb-8 text-[var(--text-primary)]/50">¿Listo para comenzar?</p>
                <a href="/contacto" className="inline-block px-12 py-5 bg-terracota text-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-black transition-colors duration-300">
                    Iniciar Proyecto
                </a>
            </section>

        </main>
    );
}
