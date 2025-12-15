"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        title: "El Fuego",
        desc: "Dominamos la técnica. Parrillas a carbón, gas o híbridas integradas con precisión milimétrica.",
        img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "El Humo",
        desc: "Sistemas de extracción silenciosos y eficientes que mantienen el ambiente limpio sin perder la esencia.",
        img: "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "La Piedra",
        desc: "Mesadas de granito, cuarzo o dekton resistentes al calor, manchas y la intemperie.",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
    }
];

const EQUIPMENT = [
    { name: "Kamado", img: "https://images.unsplash.com/photo-1544982503-9f984c14501a?q=80&w=800&auto=format&fit=crop" },
    { name: "Parrilla Argent", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" },
    { name: "Horno Pizza", img: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?q=80&w=800&auto=format&fit=crop" },
    { name: "Caja China", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=800&auto=format&fit=crop" },
];

export default function ParrillaPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const featuresRef = useRef<HTMLDivElement>(null);
    const equipmentRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero "Smoke" Reveal
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
        <div ref={container} className="bg-[#0a0a0a] text-white overflow-hidden">

            {/* --- HERO SECTION (Cinematic Smoke) --- */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1920&auto=format&fit=crop"
                        alt="Estación de Parrilla"
                        fill
                        className="object-cover opacity-40 grayscale-30"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0a0a0a]" />
                    {/* Animated Smoke Overlay (CSS or Video could be used here, using CSS gradient for now) */}
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#0a0a0a_100%)] opacity-80" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <p className="hero-subtitle text-terracota text-sm tracking-[0.5em] uppercase font-bold mb-8">
                        Gastronomía Social
                    </p>
                    <h1 className="hero-title font-serif text-6xl md:text-9xl tracking-tight text-white mix-blend-overlay">
                        FUEGO & <br /> BRASA
                    </h1>
                </div>

                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 animate-pulse">
                    <span className="text-[10px] uppercase tracking-widest">Descubre</span>
                    <div className="w-px h-12 bg-white" />
                </div>
            </section>

            {/* --- ZIG-ZAG FEATURES --- */}
            <div ref={featuresRef} className="py-24 space-y-32">
                {FEATURES.map((feature, i) => (
                    <section key={i} className={`feature-section relative flex flex-col md:flex-row items-center ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="w-full md:w-1/2 h-[80vh] relative px-6 md:px-12">
                            <div className="feature-img absolute inset-6 md:inset-12 overflow-hidden" style={{ clipPath: "inset(0% 100% 0% 0%)" }}>
                                <Image
                                    src={feature.img}
                                    alt={feature.title}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-6 md:px-24 py-12">
                            <div className="feature-text opacity-0 translate-y-10">
                                <span className="text-terracota text-xs uppercase tracking-[0.3em] mb-4 block">0{i + 1}</span>
                                <h2 className="font-serif text-5xl mb-6">{feature.title}</h2>
                                <p className="text-white/60 text-xl leading-relaxed max-w-md">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* --- EQUIPMENT SLIDER --- */}
            <section ref={equipmentRef} className="relative h-screen bg-[#050505] flex flex-col justify-center overflow-hidden">
                <div className="absolute top-12 left-12 z-20">
                    <span className="text-xs uppercase tracking-[0.3em] text-white/40 border-b border-white/10 pb-2">Equipamiento</span>
                </div>

                <div className="equipment-track flex gap-12 px-[10vw] items-center">
                    <div className="flex-shrink-0 w-[30vw] md:w-[20vw] pr-12">
                        <h3 className="font-serif text-4xl md:text-6xl leading-tight">
                            Herramientas <br /> de <span className="text-terracota italic">Chef</span>
                        </h3>
                    </div>
                    {EQUIPMENT.map((item, i) => (
                        <div key={i} className="flex-shrink-0 w-[70vw] md:w-[30vw] aspect-[4/5] relative group overflow-hidden border border-white/10 bg-[#0a0a0a]">
                            <Image
                                src={item.img}
                                alt={item.name}
                                fill
                                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black to-transparent">
                                <p className="font-serif text-2xl">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- DETAILS GRID --- */}
            <section className="py-32 px-6 md:px-24 bg-[#0a0a0a]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
                    {[
                        { label: "Espacio Mínimo", val: "6 m²" },
                        { label: "Instalación", val: "Gas / Carbón" },
                        { label: "Tiempo", val: "3 - 8 Semanas" },
                        { label: "Materiales", val: "Acero 304 / Piedra" },
                        { label: "Iluminación", val: "Escénica / Trabajo" },
                        { label: "Garantía", val: "1 Año Total" },
                    ].map((item, i) => (
                        <div key={i} className="bg-[#0a0a0a] p-12 hover:bg-[#050505] transition-colors group">
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
                        ¿Listo para encender <br /> el fuego?
                    </h2>
                    <Link
                        href="/cotiza?tipo=Proyecto%20Estación%20de%20Parrilla"
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
