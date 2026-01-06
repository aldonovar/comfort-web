"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Looping back to the first major project or archive
const NEXT_PROJECT = {
    label: "Volver al Inicio",
    title: "Terraza El Polo",
    href: "/proyectos/el-polo",
    image: "/projects/el-polo/hero.jpg"
};

// 11 Assets discovered: 8 Videos, 3 Images (gallery-2.jpg, gallery-9.jpg, gallery-11.JPG)
// Creative "Scatter" Layout Logic:
// We mix spans and offsets to create a "Damero" (Checkerboard/Mosaic) feel.
const GALLERY_ITEMS = [
    // Row 1: Heavy entry
    { src: "/projects/damero/gallery-1.mp4", alt: "Intro Motion", aspect: "aspect-[4/3]", span: "md:col-span-2 md:row-span-2", type: "video" },
    { src: "/projects/damero/gallery-2.jpg", alt: "Detalle Materialidad", aspect: "aspect-[3/4]", span: "md:col-span-1 md:row-span-1", type: "image", offset: "md:translate-y-12" },

    // Row 2: Rhythm change
    { src: "quote", type: "text", content: "La geometría de la sombra es tan importante como la estructura que la proyecta.", aspect: "aspect-square", span: "md:col-span-1 md:row-span-1" },
    { src: "/projects/damero/gallery-3.mp4", alt: "Juego de Luces", aspect: "aspect-square", span: "md:col-span-1 md:row-span-1", type: "video" },
    { src: "/projects/damero/gallery-4.mp4", alt: "Perspectiva Sombra", aspect: "aspect-[3/4]", span: "md:col-span-1 md:row-span-2", type: "video", offset: "md:-translate-y-12" },

    // Row 3: Panoramic break
    { src: "/projects/damero/gallery-5.mp4", alt: "Vista Amplia", aspect: "aspect-video", span: "md:col-span-2 md:row-span-1", type: "video" },
    { src: "/projects/damero/gallery-6.mp4", alt: "Detalle Cenital", aspect: "aspect-[9/16]", span: "md:col-span-1 md:row-span-2", type: "video", offset: "md:translate-y-8" },

    // Row 4: Dense cluster
    { src: "/projects/damero/gallery-7.mp4", alt: "Ambiente General", aspect: "aspect-square", span: "md:col-span-1 md:row-span-1", type: "video" },
    { src: "/projects/damero/gallery-8.mp4", alt: "Close Up", aspect: "aspect-square", span: "md:col-span-1 md:row-span-1", type: "video" },

    // Row 5: Finale
    { src: "/projects/damero/gallery-9.jpg", alt: "Composición Final", aspect: "aspect-[4/5]", span: "md:col-span-1 md:row-span-2", type: "image", offset: "md:-translate-y-16" },
    { src: "/projects/damero/gallery-10.mp4", alt: "Recorrido", aspect: "aspect-video", span: "md:col-span-2 md:row-span-1", type: "video" },
    { src: "/projects/damero/gallery-11.JPG", alt: "Detalle Estructural", aspect: "aspect-square", span: "md:col-span-1 md:row-span-1", type: "image" },
];

import { DynamicGalleryItem } from "@/components/ui/DynamicGalleryItem";

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
            // Note: Batch reveal logic is now internal to DynamicGalleryItem for better per-item control.

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-[var(--bg-primary)] min-h-screen">
            {/* HERO */}
            <section className="project-hero relative h-[85vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/projects/damero/hero.jpg"
                        alt="Damero Sol y Sombra Hero"
                        fill
                        className="project-hero-bg object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 flex flex-col items-start justify-end z-10">
                    <span className="text-white/90 text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block animate-fade-in drop-shadow-md">
                        Exterior · Architecture
                    </span>
                    <h1 className="font-serif text-6xl md:text-9xl text-[var(--text-primary)] mix-blend-difference text-white mb-2 animate-fade-in delay-100">
                        Damero Blanco
                    </h1>
                    <p className="text-white/80 text-xl font-light tracking-wide animate-fade-in delay-200">
                        Asia, Lima
                    </p>
                </div>
            </section>

            {/* NARRATIVE */}
            <section className="content-section py-24 md:py-32 px-6 md:px-24">
                <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
                    <h2 className="reveal-text font-serif text-4xl md:text-6xl text-[var(--text-primary)] leading-tight">
                        Orden, Luz y Geometría.
                    </h2>
                    <div className="reveal-text w-12 h-1 bg-terracota mx-auto md:mx-0" />
                    <p className="reveal-text text-lg md:text-xl text-[var(--text-primary)]/70 leading-relaxed font-light">
                        Una intervención que reinterpreta el clásico sol y sombra mediante una trama tipo damero. La estructura blanca se funde con el cielo costero, creando un juego de sombras cambiante que marca el paso del tiempo sobre la terraza.
                    </p>
                </div>
            </section>

            {/* SCATTER GALLERY */}
            <section className="py-24 px-4 md:px-12 bg-[#050505] overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-24 text-center">
                        <span className="text-terracota text-xs tracking-widest uppercase block mb-4">Composición</span>
                        <h3 className="font-serif text-3xl md:text-5xl text-[var(--text-primary)]">Trama y Materia</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-x-12 md:gap-y-24 auto-rows-min">
                        {GALLERY_ITEMS.map((item, index) => (
                            <DynamicGalleryItem
                                key={index}
                                src={item.src}
                                type={item.type as any}
                                alt={item.alt}
                                content={item.content}
                                aspect={item.aspect}
                                span={item.span}
                                offset={item.offset}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* NEXT PROJECT */}
            <section className="h-[50vh] md:h-[70vh] bg-black relative group overflow-hidden">
                <Link href={NEXT_PROJECT.href} className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center">
                        <span className="block text-white/50 text-xs tracking-widest uppercase mb-4 group-hover:text-terracota transition-colors">{NEXT_PROJECT.label}</span>
                        <h2 className="font-serif text-5xl md:text-7xl text-white group-hover:scale-105 transition-transform duration-700">{NEXT_PROJECT.title}</h2>
                    </div>
                </Link>
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 scale-105 group-hover:scale-100">
                    <Image src={NEXT_PROJECT.image} alt="Next Project" fill className="object-cover" />
                </div>
            </section>
        </main>
    );
}
