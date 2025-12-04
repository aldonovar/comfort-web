"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        title: "Diseño 3D",
        desc: "Visualización fotorrealista para que vivas tu terraza antes de construirla.",
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "Optimización",
        desc: "Aprovechamos cada metro cuadrado para funcionalidad y flujo.",
        img: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "Mobiliario",
        desc: "Selección curada de piezas resistentes y estéticamente coherentes.",
        img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "Paisajismo",
        desc: "Integración de vegetación que respira y da vida al espacio.",
        img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1920&auto=format&fit=crop"
    }
];

export default function TerrazasPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const horizontalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero Parallax & Reveal
            const tl = gsap.timeline();
            tl.from(".hero-title-char", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.05,
                ease: "power4.out"
            })
                .from(".hero-subtitle", {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1");

            gsap.to(".hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // 2. Sticky Text Section
            ScrollTrigger.create({
                trigger: ".sticky-section",
                start: "top top",
                end: "bottom bottom",
                pin: ".sticky-content",
            });

            gsap.from(".sticky-text", {
                opacity: 0.2,
                stagger: 0.1,
                scrollTrigger: {
                    trigger: ".sticky-section",
                    start: "top center",
                    end: "center center",
                    scrub: true
                }
            });

            // 3. Horizontal Scroll
            const sections = gsap.utils.toArray(".horizontal-item");
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: horizontalRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: () => "+=" + (horizontalRef.current?.offsetWidth || 0)
                }
            });

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

        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="bg-[#050505] text-white overflow-hidden">

            {/* --- HERO SECTION --- */}
            <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
                <div className="hero-bg absolute inset-0 w-full h-[120%] -top-[10%] z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
                        alt="Diseño de Terrazas"
                        fill
                        className="object-cover opacity-40 grayscale-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[#050505]" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <p className="hero-subtitle text-terracota text-sm md:text-base tracking-[0.5em] uppercase font-bold mb-8">
                        Arquitectura Exterior
                    </p>
                    <h1 className="font-serif text-6xl md:text-9xl leading-[0.9] tracking-tight overflow-hidden">
                        {"DISEÑO DE".split("").map((char, i) => (
                            <span key={i} className="hero-title-char inline-block">{char === " " ? "\u00A0" : char}</span>
                        ))}
                        <br />
                        <span className="text-white/30 italic">
                            {"TERRAZAS".split("").map((char, i) => (
                                <span key={i} className="hero-title-char inline-block">{char === " " ? "\u00A0" : char}</span>
                            ))}
                        </span>
                    </h1>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-pulse">
                    <span className="text-[10px] uppercase tracking-widest">Scroll</span>
                    <div className="w-px h-12 bg-white" />
                </div>
            </section>

            {/* --- STICKY MANIFESTO --- */}
            <section className="sticky-section relative min-h-[200vh] flex">
                <div className="sticky-content w-full h-screen sticky top-0 flex items-center justify-center px-6 md:px-24">
                    <div className="max-w-4xl text-center">
                        <p className="font-serif text-3xl md:text-6xl leading-tight text-white sticky-text">
                            Transformamos azoteas y patios en <span className="text-terracota italic">oasis privados</span>.
                        </p>
                        <p className="font-serif text-3xl md:text-6xl leading-tight text-white/50 mt-8 sticky-text">
                            Desde la conceptualización hasta la ejecución, cuidamos cada detalle para crear un espacio de relax y entretenimiento único.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- HORIZONTAL SCROLL FEATURES --- */}
            <section ref={horizontalRef} className="relative h-screen bg-[#0a0a0a] flex overflow-hidden">
                <div className="absolute top-12 left-12 z-20">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2">El Proceso</span>
                </div>

                <div className="flex w-[400%] h-full">
                    {FEATURES.map((feature, i) => (
                        <div key={i} className="horizontal-item w-screen h-full flex-shrink-0 relative flex items-center justify-center px-6 md:px-24 border-r border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full max-w-7xl">
                                <div className="order-2 md:order-1">
                                    <span className="text-terracota text-6xl md:text-9xl font-serif opacity-20 absolute -top-20 -left-10 md:relative md:top-auto md:left-auto md:mb-8 block">
                                        0{i + 1}
                                    </span>
                                    <h3 className="text-4xl md:text-7xl font-serif mb-6">{feature.title}</h3>
                                    <p className="text-xl text-white/60 max-w-md leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                                <div className="order-1 md:order-2 relative aspect-square md:aspect-4/5 w-full overflow-hidden rounded-lg grayscale hover:grayscale-0 transition-all duration-700">
                                    <Image
                                        src={feature.img}
                                        alt={feature.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- DETAILS GRID --- */}
            <section className="py-32 px-6 md:px-24 bg-[#050505]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {[
                        { label: "Rango", val: "15 m² - 150 m²" },
                        { label: "Tipo de Obra", val: "Integral (Diseño + Obra)" },
                        { label: "Duración", val: "6 - 12 Semanas" },
                        { label: "Entregables", val: "Planos + Vistas 3D" },
                        { label: "Gestión", val: "Llave en Mano" },
                        { label: "Garantía", val: "1 Año Post-Entrega" },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#050505] p-12 hover:bg-[#0a0a0a] transition-colors group">
                            <span className="block text-xs uppercase tracking-widest text-white/40 mb-4 group-hover:text-terracota transition-colors">{item.label}</span>
                            <p className="text-2xl font-serif">{item.val}</p>
                        </div>
                    ))}
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
