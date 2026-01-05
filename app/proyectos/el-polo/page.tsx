"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NEXT_PROJECT = {
    label: "Siguiente Proyecto",
    title: "Techo con Luz LED",
    href: "/proyectos/techo-led",
    image: "/projects/project-2.jpg"
};

const GALLERY_ITEMS = [
    { src: "/projects/el-polo/gallery-1.jpg", alt: "Vista General Parrilla", aspect: "aspect-video" },
    { src: "/projects/el-polo/gallery-2.jpg", alt: "Detalle Materiales", aspect: "aspect-3/4" },
    { src: "/projects/el-polo/gallery-3.jpg", alt: "Iluminación Nocturna", aspect: "aspect-square" },
    { src: "/projects/el-polo/gallery-4.jpg", alt: "Zona de Estar", aspect: "aspect-4/5" },
    { src: "/projects/el-polo/gallery-5.jpg", alt: "Detalle Granito", aspect: "aspect-square" },
    { src: "/projects/el-polo/gallery-6.jpg", alt: "Perspectiva Lateral", aspect: "aspect-video" },
    { src: "/projects/el-polo/gallery-7.jpg", alt: "Ambiente General", aspect: "aspect-3/4" },
    { src: "/projects/el-polo/gallery-8.jpg", alt: "Detalle Techo", aspect: "aspect-video" },
];

export default function ElPoloPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Parallax
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

            // Text Reveal
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

            // Video Scale
            gsap.from(".video-reel", {
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".video-section",
                    start: "top 70%"
                }
            });

            // Gallery Stagger
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
                        src="/projects/el-polo/hero.jpg"
                        alt="Terraza El Polo Hero"
                        fill
                        className="project-hero-bg object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 flex flex-col items-start justify-end z-10">
                    <span className="text-white/90 text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block animate-fade-in drop-shadow-md">
                        Residencial · Luxury
                    </span>
                    <h1 className="font-serif text-6xl md:text-9xl text-[var(--text-primary)] mix-blend-difference text-white mb-2 animate-fade-in delay-100">
                        Terraza El Polo
                    </h1>
                    <p className="text-white/80 text-xl font-light tracking-wide animate-fade-in delay-200">
                        Santiago de Surco, Lima
                    </p>
                </div>
            </section>

            {/* --- NARRATIVE --- */}
            <section className="content-section py-24 md:py-32 px-6 md:px-24">
                <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
                    <h2 className="reveal-text font-serif text-4xl md:text-6xl text-[var(--text-primary)] leading-tight">
                        Un oasis de sofisticación urbana <br /> en el corazón de El Polo.
                    </h2>
                    <div className="reveal-text w-12 h-1 bg-terracota mx-auto md:mx-0" />
                    <p className="reveal-text text-lg md:text-xl text-[var(--text-primary)]/70 leading-relaxed font-light">
                        El desafío principal fue integrar una zona de parrilla de alto rendimiento con un área social elegante, sin sacrificar la amplitud visual. Utilizamos una paleta de materiales nobles —granito negro, madera Cumarú y estructuras de acero negro— para crear un lenguaje visual coherente.
                    </p>
                </div>
            </section>

            {/* --- VIDEO REEL --- */}
            <section className="video-section py-12 px-0 md:px-12">
                <div className="video-reel w-full h-[60vh] md:h-[80vh] relative overflow-hidden rounded-sm bg-black">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover opacity-90"
                        autoPlay
                        muted
                        loop
                        src="/projects/el-polo/reel.mp4"
                        playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <span className="text-white/50 tracking-widest text-sm uppercase">Experiencia Inmersiva</span>
                    </div>
                </div>
            </section>

            {/* --- EXPANDED GALLERY --- */}
            <section className="py-24 px-6 md:px-12 bg-[#080808]"> {/* Slightly darker bg for gallery */}
                <div className="max-w-[1800px] mx-auto">
                    <div className="mb-16 text-center">
                        <span className="text-terracota text-xs tracking-widest uppercase block mb-4">Detalles & Atmósfera</span>
                        <h3 className="font-serif text-3xl md:text-5xl text-[var(--text-primary)]">Galería del Proyecto</h3>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {GALLERY_ITEMS.map((item, index) => (
                            <div key={index} className={`gallery-item break-inside-avoid relative ${item.aspect} overflow-hidden rounded-sm group bg-neutral-900`}>
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        ))}
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
