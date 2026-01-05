"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NEXT_PROJECT = {
    label: "Siguiente Proyecto",
    title: "Terraza El Polo",
    href: "/proyectos/el-polo", // Loop back to start
    image: "/projects/project-1.jpg"
};

export default function DameroPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".project-hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".project-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            gsap.from(".reveal-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".content-section",
                    start: "top 80%"
                }
            });

            ScrollTrigger.batch(".gallery-item", {
                onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.15, overwrite: true }),
                start: "top 85%"
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-[var(--bg-primary)] min-h-screen">

            {/* --- HERO --- */}
            <section className="project-hero relative h-[85vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/projects/project-4.jpg"
                        alt="Damero Sol y Sombra Hero"
                        fill
                        className="project-hero-bg object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-linear-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 flex flex-col items-start justify-end z-10">
                    <span className="text-terracota text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block animate-fade-in">
                        Arquitectura · Patrones
                    </span>
                    <h1 className="font-serif text-6xl md:text-9xl text-[var(--text-primary)] mix-blend-difference text-white mb-2 animate-fade-in delay-100">
                        Damero Sol & Sombra
                    </h1>
                    <p className="text-white/80 text-xl font-light tracking-wide animate-fade-in delay-200">
                        La Molina, Lima
                    </p>
                </div>
            </section>

            {/* --- INFO BAR (Hidden until data is confirmed) ---
            <div className="border-b border-[var(--text-primary)]/10">
                <div className="max-w-[1800px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-24 py-12">
                    {[
                        { label: "Cliente", val: "Corporativo" },
                        { label: "Superficie", val: "120 m²" },
                        { label: "Año", val: "2024" },
                        { label: "Servicio", val: "Consultoría & Ejecución" },
                    ].map((item, i) => (
                        <div key={i}>
                            <span className="block text-xs uppercase text-terracota tracking-widest mb-2">{item.label}</span>
                            <span className="block text-lg font-serif text-[var(--text-primary)]">{item.val}</span>
                        </div>
                    ))}
                </div>
            </div>
            --- */}

            {/* --- NARRATIVE --- */}
            <section className="content-section py-24 md:py-32 px-6 md:px-24">
                <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
                    <h2 className="reveal-text font-serif text-4xl md:text-6xl text-[var(--text-primary)] leading-tight">
                        Geometría que danza con el sol. <br /> Ritmo, sombra y frescura.
                    </h2>
                    <div className="reveal-text w-12 h-1 bg-terracota mx-auto md:mx-0" />
                    <p className="reveal-text text-lg md:text-xl text-[var(--text-primary)]/70 leading-relaxed font-light">
                        En La Molina, el sol puede ser implacable. Nuestra respuesta fue arquitectónica: una estructura de 'sol y sombra' con un patrón de damero (ajedrezado) que filtra la luz de manera rítmica.
                    </p>
                    <p className="reveal-text text-lg md:text-xl text-[var(--text-primary)]/70 leading-relaxed font-light">
                        El blanco puro de las vigas contrasta con el cielo azul, creando un lienzo en constante cambio según la hora del día. Más que una cobertura, es una escultura habitable que reduce la temperatura térmica sin perder la conexión con el entorno.
                    </p>
                </div>
            </section>

            {/* --- GALLERY --- */}
            <section className="py-12 px-6 md:px-12">
                <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="gallery-item opacity-0 translate-y-12">
                        <div className="relative aspect-video overflow-hidden rounded-sm group">
                            <Image src="https://images.unsplash.com/photo-1598371307616-24ca1a50d268?q=80&w=1200" alt="Vista General" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                    </div>
                    <div className="gallery-item opacity-0 translate-y-12 md:mt-24">
                        <div className="relative aspect-3/4 overflow-hidden rounded-sm group">
                            <Image src="https://images.unsplash.com/photo-1592505676307-e4392f58e658?q=80&w=1200" alt="Detalle Geométrico" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                    </div>
                    <div className="gallery-item opacity-0 translate-y-12">
                        <div className="relative aspect-square overflow-hidden rounded-sm group">
                            <Image src="https://images.unsplash.com/photo-1599380695034-78db0e2718e8?q=80&w=1200" alt="Sombras" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                    </div>
                    <div className="gallery-item opacity-0 translate-y-12 md:-mt-24">
                        <div className="relative aspect-video overflow-hidden rounded-sm group">
                            <Image src="https://images.unsplash.com/photo-1520697830682-bbb6e85e2b0b?q=80&w=1200" alt="Perspectiva" fill className="object-cover transition-transform duration-1000 group-hover:scale-105" />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- NEXT PROJECT --- */}
            <section className="h-[60vh] md:h-[80vh] bg-black relative group overflow-hidden">
                <Link href={NEXT_PROJECT.href} className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center">
                        <span className="block text-white/50 text-xs tracking-widest uppercase mb-4 group-hover:text-terracota transition-colors">{NEXT_PROJECT.label}</span>
                        <h2 className="font-serif text-5xl md:text-8xl text-white group-hover:scale-105 transition-transform duration-700">{NEXT_PROJECT.title}</h2>
                    </div>
                </Link>
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 scale-105 group-hover:scale-100">
                    <Image src={NEXT_PROJECT.image} alt="Next Project" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/20" />
            </section>

        </main>
    );
}
