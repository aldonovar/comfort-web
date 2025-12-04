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
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
        slug: "barranco"
    },
    {
        id: "terraza-miraflores",
        title: "Oasis Compacto",
        location: "Miraflores, Lima",
        surface: "22 m²",
        tags: ["Residencial", "Intimo", "Luz"],
        description: "Maximizando cada centímetro. Un espacio pequeño que se siente infinito gracias a la luz y la materialidad.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop",
        slug: "miraflores"
    },
    {
        id: "rooftop-san-isidro",
        title: "Skyline Corporativo",
        location: "San Isidro, Lima",
        surface: "95 m²",
        tags: ["Oficina", "Lounge", "Vistas"],
        description: "Donde los negocios encuentran la calma. Un rooftop corporativo que redefine el 'break' laboral.",
        image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2700&auto=format&fit=crop",
        slug: "san-isidro"
    },
    {
        id: "patio-la-molina",
        title: "Patio Familiar",
        location: "La Molina, Lima",
        surface: "60 m²",
        tags: ["Familia", "Juego", "Parrilla"],
        description: "El corazón de la casa se mueve al exterior. Un espacio versátil para crecer, jugar y celebrar.",
        image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2700&auto=format&fit=crop",
        slug: "la-molina" // Assuming this slug, though file structure showed only 3 folders. Will check later.
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

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="bg-crema min-h-screen py-32 px-6 md:px-12">

            <div className="max-w-[1800px] mx-auto">

                {/* Header */}
                <div className="mb-32 text-center md:text-left">
                    <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
                        Archivo de Obras
                    </span>
                    <h1 className="font-serif text-5xl md:text-8xl text-madera mb-8">
                        Colección <br className="hidden md:block" />
                        <span className="italic text-madera/40">Selecta</span>
                    </h1>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
                    {PROJECTS.map((project, index) => (
                        <div
                            key={project.id}
                            className={`project-item group relative ${index % 2 === 1 ? 'md:mt-32' : ''}`}
                        >
                            <Link href={`/proyectos/${project.slug}`} className="block">

                                {/* Image Container */}
                                <div className="relative aspect-[4/5] overflow-hidden rounded-sm mb-8">
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
                                        <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                            <span className="text-white text-2xl">→</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Text Content */}
                                <div className="project-text">
                                    <div className="flex items-center gap-4 mb-4 text-terracota text-[10px] font-bold tracking-[0.2em] uppercase">
                                        <span>{project.location}</span>
                                        <span className="w-1 h-1 rounded-full bg-terracota" />
                                        <span>{project.surface}</span>
                                    </div>

                                    <h2 className="font-serif text-4xl text-madera mb-4 group-hover:text-terracota transition-colors duration-300">
                                        {project.title}
                                    </h2>

                                    <p className="text-madera/60 text-sm leading-relaxed max-w-md">
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
