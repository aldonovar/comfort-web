"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CONCEPT_IMAGES = [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop"
];

const GALLERY_IMAGES = [
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=800&auto=format&fit=crop"
];

export default function TerrazasPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const conceptRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero Architecture Reveal
            const tl = gsap.timeline();
            tl.from(".hero-title-line", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out"
            })
                .from(".hero-meta", {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1");

            // 2. Sticky Concept Section (Side-by-Side)
            ScrollTrigger.create({
                trigger: conceptRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: ".concept-text-col",
            });

            // Image fade transition in concept section
            const conceptImages = gsap.utils.toArray(".concept-image");
            conceptImages.forEach((img: any, i) => {
                if (i === 0) return;
                gsap.fromTo(img,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        scrollTrigger: {
                            trigger: img,
                            start: "top center",
                            end: "center center",
                            scrub: true,
                            toggleActions: "play reverse play reverse"
                        }
                    }
                );
            });

            // 3. Parallax Grid
            const col1 = galleryRef.current?.querySelector(".gallery-col-1");
            const col2 = galleryRef.current?.querySelector(".gallery-col-2");

            if (col1 && col2) {
                gsap.to(col1, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });

                gsap.to(col2, {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            }

            // 4. Footer Reveal
            gsap.from(".footer-cta", {
                yPercent: -50,
                opacity: 0,
                scrollTrigger: {
                    trigger: ".footer-section",
                    start: "top 80%",
                    end: "bottom bottom",
                    scrub: true
                }
            });

        }, container);

        // Force refresh for sticky positioning
        const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

        return () => {
            ctx.revert();
            clearTimeout(timer);
        };
    }, []);

    return (
        <div ref={container} className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">

            {/* --- HERO SECTION (Architectural Layout) --- */}
            <section ref={heroRef} className="relative h-screen w-full px-6 md:px-12 pt-32 pb-12 flex flex-col justify-between">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
                        alt="Diseño de Terrazas"
                        fill
                        className="object-cover opacity-30 grayscale-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-[var(--bg-primary)]/80 via-transparent to-[var(--bg-primary)]" />
                </div>

                <div className="relative z-10 max-w-4xl">
                    <p className="hero-meta text-terracota text-xs md:text-sm tracking-[0.5em] uppercase font-bold mb-6">
                        Proyecto Integral
                    </p>
                    <h1 className="font-serif text-6xl md:text-9xl leading-[0.85] tracking-tight">
                        <div className="overflow-hidden"><span className="hero-title-line block">DISEÑO</span></div>
                        <div className="overflow-hidden"><span className="hero-title-line block text-[var(--text-primary)]/40 italic">DE TERRAZAS</span></div>
                        <div className="overflow-hidden"><span className="hero-title-line block">& EJECUCIÓN</span></div>
                    </h1>
                </div>

                <div className="relative z-10 flex justify-end items-end">
                    <div className="hero-meta max-w-sm text-right">
                        <p className="text-[var(--text-primary)]/60 text-lg leading-relaxed">
                            Transformamos azoteas y patios en oasis privados. Arquitectura exterior pensada desde el concepto hasta el último detalle.
                        </p>
                        <div className="mt-8 w-full h-px bg-[var(--text-primary)]/20" />
                        <div className="mt-4 flex justify-end gap-8 text-xs uppercase tracking-widest text-[var(--text-primary)]/40">
                            <span>Lima, Perú</span>
                            <span>Est. 2024</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STICKY SIDE-BY-SIDE CONCEPT --- */}
            <section ref={conceptRef} className="relative flex flex-col md:flex-row bg-[var(--bg-secondary)]">
                {/* Left: Sticky Text */}
                <div className="concept-text-col w-full md:w-1/2 h-screen sticky top-0 flex items-center px-6 md:px-24 z-10">
                    <div className="max-w-xl">
                        <span className="text-terracota text-xs uppercase tracking-[0.3em] mb-6 block">Filosofía</span>
                        <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
                            Más que un espacio, <br /> <span className="text-[var(--text-primary)]/40 italic">un estilo de vida.</span>
                        </h2>
                        <p className="text-[var(--text-primary)]/60 text-lg leading-relaxed mb-12">
                            No solo diseñamos terrazas; creamos extensiones de tu hogar que invitan a la calma y la celebración. Integramos materiales nobles, vegetación y luz para construir atmósferas únicas.
                        </p>
                        <ul className="space-y-4 border-t border-[var(--text-primary)]/10 pt-8">
                            {["Diseño 3D Fotorrealista", "Selección de Materiales", "Paisajismo Integrado"].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 text-sm uppercase tracking-widest text-[var(--text-primary)]/80">
                                    <span className="w-1.5 h-1.5 bg-terracota rounded-full" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Right: Scrolling Images */}
                <div className="w-full md:w-1/2 relative z-0">
                    {CONCEPT_IMAGES.map((src, i) => (
                        <div key={i} className="concept-image h-screen w-full relative sticky top-0 border-l border-[var(--text-primary)]/5">
                            <Image
                                src={src}
                                alt={`Concepto ${i + 1}`}
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PARALLAX GRID GALLERY --- */}
            <section ref={galleryRef} className="relative py-32 px-6 md:px-12 bg-[var(--bg-primary)] overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Column 1 - Moves Up */}
                    <div className="gallery-col-1 flex flex-col gap-12 md:gap-24 pt-24">
                        {GALLERY_IMAGES.slice(0, 2).map((src, i) => (
                            <div key={i} className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                                <Image
                                    src={src}
                                    alt={`Gallery ${i}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                        <div className="p-8 border border-[var(--text-primary)]/10 bg-[var(--bg-secondary)]">
                            <h3 className="font-serif text-3xl mb-4">Detalles que importan</h3>
                            <p className="text-[var(--text-primary)]/50">Cada textura, cada sombra y cada planta es seleccionada con propósito.</p>
                        </div>
                    </div>

                    {/* Column 2 - Moves Down */}
                    <div className="gallery-col-2 flex flex-col gap-12 md:gap-24">
                        <div className="p-8 border border-[var(--text-primary)]/10 bg-[var(--bg-secondary)] text-right">
                            <h3 className="font-serif text-3xl mb-4">Ejecución Impecable</h3>
                            <p className="text-[var(--text-primary)]/50">Supervisión constante para asegurar que el diseño se haga realidad.</p>
                        </div>
                        {GALLERY_IMAGES.slice(2, 4).map((src, i) => (
                            <div key={i} className="relative aspect-[3/4] w-full overflow-hidden rounded-sm">
                                <Image
                                    src={src}
                                    alt={`Gallery ${i + 2}`}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- DETAILS LIST --- */}
            <section className="py-24 px-6 md:px-24 bg-[var(--bg-secondary)] border-t border-[var(--text-primary)]/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Rango", val: "15 m² - 150 m²" },
                            { label: "Tiempo", val: "6 - 12 Semanas" },
                            { label: "Gestión", val: "Llave en Mano" },
                            { label: "Garantía", val: "1 Año" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <span className="block text-xs uppercase tracking-widest text-terracota mb-2">{item.label}</span>
                                <p className="font-serif text-2xl md:text-3xl">{item.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="footer-section relative h-[80vh] flex items-center justify-center bg-terracota text-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 mix-blend-overlay" />

                <div className="footer-cta text-center relative z-10 px-6">
                    <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-tight">
                        ¿Listo para tu <br /> nuevo oasis?
                    </h2>
                    <Link
                        href="/cotiza?tipo=Diseño%20y%20Ejecución%20de%20Terraza"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full text-lg uppercase tracking-widest hover:scale-105 transition-transform duration-300"
                    >
                        <span>Cotizar Ahora</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </section>

        </div>
    );
}
