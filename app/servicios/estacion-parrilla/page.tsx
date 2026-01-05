"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        title: "Funcionalidad",
        desc: "Diseño funcional de cocina exterior optimizando el triángulo de trabajo entre preparación, cocción y servicio. Ergonomía perfecta para el chef anfitrión.",
        img: "/services/parrilla/feature-1.jpg"
    },
    {
        title: "Materialidad",
        desc: "Acabados premium para exteriores: combinación de piedra natural y acero inoxidable grado marino resistente a la corrosión y rayos UV.",
        img: "/services/parrilla/feature-2.jpg"
    },
    {
        title: "Equipamiento",
        desc: "Parrillas profesionales con control de temperatura de precisión y sistemas de ventilación avanzados para cocción ahumada y grill.",
        img: "/services/parrilla/feature-3.jpg"
    }
];

const EQUIPMENT = [
    { name: "Kamado Joe", img: "/services/parrilla/equipment-1.jpg" },
    { name: "Parrilla Inox", img: "/services/parrilla/equipment-2.jpg" },
    { name: "Horno Leña", img: "/services/parrilla/equipment-3.jpg" },
    { name: "Frigobar", img: "/services/parrilla/equipment-4.png" },
];

export default function ParrillaPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const equipmentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero Reveal
            const tl = gsap.timeline();
            tl.from(".hero-title", {
                filter: "blur(20px)",
                opacity: 0,
                scale: 1.1,
                duration: 2,
                ease: "power2.out"
            })
                .from(".hero-subtitle", {
                    y: 20,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1.5");

            // 2. Zig-Zag Sticky Features
            const featureSections = gsap.utils.toArray(".feature-section");
            featureSections.forEach((section: any) => {
                const img = section.querySelector(".feature-img");
                const text = section.querySelector(".feature-text");

                ScrollTrigger.create({
                    trigger: section,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => {
                        gsap.to(img, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.out" });
                        gsap.to(text, { opacity: 1, y: 0, duration: 1, delay: 0.2 });
                    },
                    onLeaveBack: () => {
                        // Optional: Reset animation on scroll up
                    }
                });
            });

            // 3. Equipment Horizontal Drag
            const eqTrack = equipmentRef.current?.querySelector(".equipment-track");
            if (eqTrack) {
                gsap.to(eqTrack, {
                    x: () => -(eqTrack.scrollWidth - window.innerWidth),
                    ease: "none",
                    scrollTrigger: {
                        trigger: equipmentRef.current,
                        pin: true,
                        scrub: 1,
                        end: () => "+=" + eqTrack.scrollWidth
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

            {/* --- HERO SECTION --- */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        src="/services/parrilla/hero-main.mp4"
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/60 via-transparent to-[var(--bg-primary)]" />
                    {/* Reduced opacity of radial overlay to prevent "washed out" look */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-primary)_100%)] opacity-20 dark:opacity-60" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <p className="hero-subtitle text-terracota text-sm tracking-[0.5em] uppercase font-bold mb-8">
                        Diseño & Equipamiento
                    </p>
                    <h1 className="hero-title font-serif text-5xl md:text-8xl tracking-tight text-white drop-shadow-lg">
                        ESTACIÓN DE <br /> PARRILLA
                    </h1>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-pulse">
                    <span className="text-[10px] uppercase tracking-widest text-white">Descubre</span>
                    <div className="w-px h-12 bg-white" />
                </div>
            </section>

            {/* --- ZIG-ZAG FEATURES --- */}
            <div ref={featuresRef} className="py-24 space-y-32">
                {FEATURES.map((feature, i) => (
                    <section key={i} className={`feature-section relative flex flex-col md:flex-row items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-1/2 h-[60vh] md:h-[80vh] relative px-6 md:px-12">
                            <div className="feature-img absolute inset-6 md:inset-12 overflow-hidden" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
                                <Image
                                    src={feature.img}
                                    alt={feature.title}
                                    fill
                                    className="object-cover transition-all duration-700 hover:scale-105 hover:brightness-110"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-6 md:px-24 py-12">
                            <div className="feature-text opacity-0 translate-y-10">
                                <span className="text-terracota text-xs uppercase tracking-[0.3em] mb-4 block">0{i + 1}</span>
                                <h2 className="font-serif text-4xl md:text-5xl mb-6">{feature.title}</h2>
                                <p className="text-[var(--text-primary)]/60 text-lg md:text-xl leading-relaxed max-w-md">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* --- EQUIPMENT SLIDER --- */}
            <section ref={equipmentRef} className="relative h-screen bg-[var(--bg-secondary)] flex flex-col justify-center overflow-hidden">
                <div className="absolute top-12 left-12 z-20">
                    <span className="text-xs uppercase tracking-[0.3em] text-[var(--text-primary)]/40 border-b border-[var(--text-primary)]/10 pb-2">Equipamiento Premium</span>
                </div>

                <div className="equipment-track flex gap-12 px-[10vw] items-center">
                    <div className="shrink-0 w-[80vw] md:w-[25vw] pr-12">
                        <h3 className="font-serif text-4xl md:text-6xl leading-tight">
                            El Corazón <br /> de tu <span className="text-terracota italic">Terraza</span>
                        </h3>
                    </div>
                    {EQUIPMENT.map((item, i) => (
                        <div key={i} className="shrink-0 w-[70vw] md:w-[30vw] aspect-4/5 relative group overflow-hidden border border-[var(--text-primary)]/10 bg-[var(--bg-primary)]">
                            <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                className="object-cover opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-linear-to-t from-black to-transparent">
                                <p className="font-serif text-2xl text-white">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- DETAILS GRID --- */}
            <section className="py-32 px-6 md:px-24 bg-[var(--bg-primary)]">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[var(--text-primary)]/10 border border-[var(--text-primary)]/10">
                    {[
                        { label: "Espacio Mínimo", val: "6 m²" },
                        { label: "Materiales", val: "Granito / Acero 304" },
                        { label: "Tiempo de Entrega", val: "Menor" },
                        { label: "Equipamiento", val: "A Consultar" },
                    ].map((item, i) => (
                        <div key={i} className="bg-[var(--bg-primary)] p-12 hover:bg-[var(--bg-secondary)] transition-colors group">
                            <span className="block text-xs uppercase tracking-widest text-[var(--text-primary)]/40 mb-4 group-hover:text-terracota transition-colors">{item.label}</span>
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
                        Tu pasión merece <br /> el mejor escenario.
                    </h2>
                    <Link
                        href="/cotiza?tipo=Proyecto%20Estación%20de%20Parrilla"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full text-lg uppercase tracking-widest hover:scale-105 transition-transform duration-300"
                    >
                        <span>Cotizar Estación</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </section>

        </div>
    );
}
