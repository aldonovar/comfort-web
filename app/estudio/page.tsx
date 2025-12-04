"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    {
        id: "estilo",
        title: "Estilo",
        subtitle: "Nuestra Firma",
        desc: "Minimalismo cálido. Arquitectura sensorial. Espacios que respiran.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop",
        href: "/estudio/estilo"
    },
    {
        id: "equipo",
        title: "Equipo",
        subtitle: "Mentes Creativas",
        desc: "Arquitectos, diseñadores y artesanos unidos por una visión.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
        href: "/estudio/equipo"
    },
    {
        id: "proceso",
        title: "Proceso",
        subtitle: "De la Idea a la Realidad",
        desc: "Un viaje colaborativo. Rigor técnico y libertad creativa.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop",
        href: "/estudio/proceso"
    }
];

export default function EstudioPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Hero Animation
            gsap.from(".studio-hero-text", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.2
            });

            // Sections Reveal
            const sections = gsap.utils.toArray<HTMLElement>(".studio-section-card");
            sections.forEach((section, i) => {
                gsap.from(section, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    },
                    delay: i * 0.1
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white">

            {/* Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop"
                        alt="Studio Background"
                        fill
                        className="object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black" />
                </div>

                <div className="relative z-10 text-center px-6 studio-hero-text">
                    <span className="block text-terracota text-xs tracking-[0.5em] uppercase font-bold mb-6">
                        Comfort Studio
                    </span>
                    <h1 className="font-serif text-6xl md:text-8xl mb-8">
                        El Estudio
                    </h1>
                    <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                        Más que arquitectura, creamos atmósferas. Un laboratorio de diseño donde la luz, el material y el espacio convergen.
                    </p>
                </div>
            </section>

            {/* Navigation Cards */}
            <section className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    {SECTIONS.map((section) => (
                        <Link
                            key={section.id}
                            href={section.href}
                            className="studio-section-card group relative h-[60vh] overflow-hidden rounded-sm block"
                        >
                            <Image
                                src={section.image}
                                alt={section.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-40"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />

                            <div className="absolute inset-0 p-8 flex flex-col justify-end items-start">
                                <span className="text-terracota text-xs tracking-[0.2em] uppercase font-bold mb-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {section.subtitle}
                                </span>
                                <h2 className="font-serif text-4xl md:text-5xl mb-4 group-hover:text-terracota transition-colors duration-300">
                                    {section.title}
                                </h2>
                                <p className="text-white/70 text-sm max-w-xs opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                    {section.desc}
                                </p>

                                <div className="mt-8 w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-terracota group-hover:border-terracota transition-all duration-300">
                                    <span className="text-xl">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </main>
    );
}
