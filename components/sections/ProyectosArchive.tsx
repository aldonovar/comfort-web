"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
    {
        id: "azotea-barranco",
        title: "Azotea Social",
        location: "Barranco, Lima",
        surface: "48 m²",
        tags: ["Rooftop", "Social", "Barra"],
        description: "Un refugio urbano en las alturas. Diseñado para la noche, la conversación y la desconexión total.",
        image: "/projects/project-1.jpg",
        slug: "barranco"
    },
    {
        id: "terraza-miraflores",
        title: "Oasis Compacto",
        location: "Miraflores, Lima",
        surface: "22 m²",
        tags: ["Residencial", "Intimo", "Luz"],
        description: "Maximizando cada centímetro. Un espacio pequeño que se siente infinito gracias a la luz y la materialidad.",
        image: "/projects/project-2.jpg",
        slug: "miraflores"
    },
    {
        id: "rooftop-san-isidro",
        title: "Skyline Corporativo",
        location: "San Isidro, Lima",
        surface: "95 m²",
        tags: ["Oficina", "Lounge", "Vistas"],
        description: "Donde los negocios encuentran la calma. Un rooftop corporativo que redefine el 'break' laboral.",
        image: "/projects/project-3.jpg",
        slug: "san-isidro"
    },
    {
        id: "patio-la-molina",
        title: "Patio Familiar",
        location: "La Molina, Lima",
        surface: "60 m²",
        tags: ["Familia", "Juego", "Parrilla"],
        description: "El corazón de la casa se mueve al exterior. Un espacio versátil para crecer, jugar y celebrar.",
        image: "/projects/project-4.jpg",
        slug: "la-molina"
    }
];

export default function ProyectosArchive() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            const items = gsap.utils.toArray<HTMLElement>(".project-item");

            items.forEach((item, i) => {
                const image = item.querySelector(".project-image");
                const text = item.querySelector(".project-text");

                // Parallax Image
                gsap.fromTo(image,
                    { scale: 1.2, yPercent: -10 },
                    {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );

                // Text Reveal
                gsap.from(text, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: item,
                        start: "top 75%",
                    }
                });
            });

        }, containerRef);

        // Force refresh for sticky positioning and layout
        const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <section ref={containerRef} className="bg-primary min-h-screen pt-48 pb-32 px-6 md:px-12 transition-colors duration-500">

            <div className="max-w-[1800px] mx-auto">

                {/* Header */}
                <div className="mb-24 text-center md:text-left">
                    <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
                        Archivo de Obras
                    </span>
                    <h1 className="font-serif text-5xl md:text-8xl text-primary mb-8 transition-colors duration-500">
                        Colección <br className="hidden md:block" />
                        <span className="italic text-primary/40 transition-colors duration-500">Selecta</span>
                    </h1>
                </div>

                {/* Grid - Single Column for "One at a Time" focus */}
                <div className="flex flex-col gap-24 max-w-5xl mx-auto">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={project.id}
                            className="project-item group relative"
                        >
                            <Link href={`/proyectos/${project.slug}`} className="block">

                                {/* Image Container - Landscape for better viewport fit */}
                                <div className="relative aspect-video overflow-hidden rounded-sm mb-6">
                                    <div className="project-image w-full h-full relative">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                            <span className="text-white text-xl">→</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content - Compact & Centered */}
                                <div className="project-text text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                                    <div>
                                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2 text-terracota text-[10px] font-bold tracking-[0.2em] uppercase">
                                            <span>{project.location}</span>
                                            <span className="w-1 h-1 rounded-full bg-terracota" />
                                            <span>{project.surface}</span>
                                        </div>

                                        <h2 className="font-serif text-3xl md:text-5xl text-primary group-hover:text-terracota transition-colors duration-300">
                                            {project.title}
                                        </h2>
                                    </div>

                                    <p className="text-primary/60 text-sm leading-relaxed max-w-md mx-auto md:mx-0 text-center md:text-right transition-colors duration-500">
                                        {project.description}
                                    </p>
                                </div>

                            </Link>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
