"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SeamlessVideo from "@/components/ui/SeamlessVideo";

gsap.registerPlugin(ScrollTrigger);

const NEXT_PROJECT = {
    label: "Siguiente Proyecto",
    title: "Luminaria Cálida",
    href: "/proyectos/luminaria-calida",
    image: "/projects/project-3.jpg"
};

const GALLERY_ITEMS = [
    { src: "/projects/techo-led/gallery-1.png", alt: "Vista Nocturna - Fotografía Real", aspect: "aspect-video", type: "image" },
    { src: "/projects/techo-led/gallery-2.png", alt: "Detalle Iluminación - Fotografía Real", aspect: "aspect-3/4", type: "image" },
    { src: "", alt: "Quote", aspect: "aspect-square", type: "text", content: "La luz define la arquitectura tanto como el material mismo." },
    { src: "/projects/techo-led/gallery-3.jpg", alt: "Plano de Distribución 1", aspect: "aspect-square", type: "image" },
    { src: "/projects/techo-led/gallery-4.jpg", alt: "Plano de Detalles Teka", aspect: "aspect-video", type: "image" },
];

export default function TechoLedPage() {
    const containerRef = useRef<HTMLDivElement>(null);

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
                        src="/projects/techo-led/hero.jpg"
                        alt="Techo LED Hero"
                        fill
                        className="project-hero-bg object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 flex flex-col items-start justify-end z-10">
                    <span className="text-white/90 text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block animate-fade-in drop-shadow-md">
                        Residencial · Modern
                    </span>
                    <h1 className="font-serif text-6xl md:text-9xl text-[var(--text-primary)] mix-blend-difference text-white mb-2 animate-fade-in delay-100">
                        Techo Luz LED
                    </h1>
                    <p className="text-white/80 text-xl font-light tracking-wide animate-fade-in delay-200">
                        San Borja, Lima
                    </p>
                </div>
            </section>

            {/* --- NARRATIVE --- */}
            <section className="content-section py-24 md:py-32 px-6 md:px-24">
                <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
                    <h2 className="reveal-text font-serif text-4xl md:text-6xl text-[var(--text-primary)] leading-tight">
                        Innovación lumínica <br /> integrada a la estructura.
                    </h2>
                    <div className="reveal-text w-12 h-1 bg-terracota mx-auto md:mx-0" />
                    <p className="reveal-text text-lg md:text-xl text-[var(--text-primary)]/70 leading-relaxed font-light">
                        Este proyecto se centró en la fusión de tecnología y calidez. Incorporamos perfiles LED regulables directamente en la viguería Sol y Sombra, permitiendo a los propietarios transitar de una iluminación funcional a una atmósfera íntima con un solo toque.
                    </p>
                </div>
            </section>

            {/* --- GALLERY (Compact) --- */}
            <section className="py-24 px-6 md:px-12 bg-[#080808]">
                <div className="max-w-[1400px] mx-auto">
                    <div className="mb-16 text-center">
                        <span className="text-terracota text-xs tracking-widest uppercase block mb-4">Detalles Técnicos</span>
                        <h3 className="font-serif text-3xl md:text-5xl text-[var(--text-primary)]">Galería Selecta</h3>
                    </div>

                    import {DynamicGalleryItem} from "@/components/ui/DynamicGalleryItem";

                    // ... (in component)
                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                        {GALLERY_ITEMS.map((item, index) => (
                            <DynamicGalleryItem
                                key={index}
                                src={item.src}
                                type={item.type as any}
                                alt={item.alt}
                                content={item.content}
                                aspect={item.aspect}
                                className="break-inside-avoid w-full mb-6"
                            />
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
