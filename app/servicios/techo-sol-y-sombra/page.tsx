"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        title: "Estructura",
        subtitle: "Madera Huayruro",
        desc: "Densidad superior. Resistencia natural. La base sólida de tu refugio.",
        img: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "Protección",
        subtitle: "Policarbonato Alveolar",
        desc: "Filtrado UV avanzado. Luz suave sin el calor abrasador.",
        img: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=1920&auto=format&fit=crop"
    },
    {
        title: "Acabado",
        subtitle: "Barniz Marino",
        desc: "Escudo invisible. Brillo satinado que perdura años.",
        img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
    }
];

export default function TechoSolSombraPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const lightBeamRef = useRef<HTMLDivElement>(null);
    const dayNightRef = useRef<HTMLDivElement>(null);

    // Mouse tracking for Light Beam
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!lightBeamRef.current) return;
            const { clientX, clientY } = e;
            gsap.to(lightBeamRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.8,
                ease: "power2.out"
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Day-to-Night Transition
            // We animate CSS variables or background colors on the main container based on scroll
            const tlColor = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });

            tlColor.to(dayNightRef.current, {
                backgroundColor: "#050505", // Night
                color: "#ffffff",
                ease: "none"
            });

            // 2. Hero Title Reveal (Reacts to Light Beam concept - simplified for perf)
            gsap.from(".hero-char", {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1.5,
                ease: "power4.out"
            });

            // 3. 3D Stacked Cards
            const cards = gsap.utils.toArray(".stack-card");
            const stackSection = document.querySelector(".stack-section");

            if (stackSection && cards.length > 0) {
                ScrollTrigger.create({
                    trigger: stackSection,
                    start: "top top",
                    end: "+=300%", // Drag out the scroll distance
                    pin: true,
                    scrub: 1,
                    onUpdate: (self) => {
                        const progress = self.progress * (cards.length - 1);
                        const activeIndex = Math.floor(progress);
                        const cardProgress = progress - activeIndex;

                        cards.forEach((card: any, i) => {
                            if (i === activeIndex) {
                                // Current card animating out
                                gsap.to(card, {
                                    scale: 1 - cardProgress * 0.1,
                                    opacity: 1 - cardProgress * 0.5,
                                    yPercent: -10 * cardProgress,
                                    filter: `blur(${cardProgress * 10}px)`,
                                    overwrite: "auto"
                                });
                            } else if (i === activeIndex + 1) {
                                // Next card animating in
                                gsap.to(card, {
                                    scale: 0.9 + cardProgress * 0.1,
                                    opacity: 0.5 + cardProgress * 0.5,
                                    yPercent: 0,
                                    filter: `blur(${(1 - cardProgress) * 10}px)`,
                                    overwrite: "auto"
                                });
                            } else if (i > activeIndex + 1) {
                                // Future cards
                                gsap.to(card, { scale: 0.9, opacity: 0, yPercent: 100, overwrite: "auto" });
                            } else {
                                // Past cards
                                gsap.to(card, { opacity: 0, yPercent: -50, overwrite: "auto" });
                            }
                        });
                    }
                });
            }

            // 4. X-Ray / Layer Peel Effect
            const layers = gsap.utils.toArray(".layer-panel");
            if (layers.length > 0) {
                gsap.to(layers, {
                    xPercent: -100 * (layers.length - 1),
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".layer-section",
                        pin: true,
                        scrub: 1,
                        end: "+=3000"
                    }
                });
            }

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative min-h-screen">
            {/* Dynamic Background Container */}
            <div ref={dayNightRef} className="fixed inset-0 z-[-1] bg-[#e6e1d3] transition-colors duration-500" />

            {/* --- HERO SECTION (Interactive Light) --- */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden cursor-none">
                {/* Light Beam Follower */}
                <div
                    ref={lightBeamRef}
                    className="fixed top-0 left-0 w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 mix-blend-soft-light"
                    style={{
                        background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)"
                    }}
                />

                <div className="absolute inset-0 z-0 opacity-20">
                    <Image
                        src="https://images.unsplash.com/photo-1590756254933-2413310a7779?q=80&w=1920&auto=format&fit=crop"
                        alt="Texture"
                        fill
                        className="object-cover grayscale"
                    />
                </div>

                <div className="relative z-20 text-center mix-blend-difference text-[#1a1a1a]">
                    <p className="text-xs uppercase tracking-[0.5em] font-bold mb-8">Experiencia Comfort</p>
                    <h1 className="font-serif text-[10vw] leading-[0.85] tracking-tighter">
                        {"LUZ &".split("").map((c, i) => (
                            <span key={i} className="hero-char inline-block">{c === " " ? "\u00A0" : c}</span>
                        ))}
                        <br />
                        {"SOMBRA".split("").map((c, i) => (
                            <span key={i + 10} className="hero-char inline-block">{c === " " ? "\u00A0" : c}</span>
                        ))}
                    </h1>
                    <p className="mt-8 text-xl max-w-xl mx-auto font-light">
                        El equilibrio perfecto entre la calidez del sol y el refugio de la sombra.
                    </p>
                </div>
            </section>

            {/* --- 3D STACKED CARDS --- */}
            <section className="stack-section relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute top-12 left-12 z-20 mix-blend-difference text-white">
                    <span className="text-xs uppercase tracking-[0.3em] border-b border-current pb-2">Componentes</span>
                </div>

                <div className="relative w-[80vw] max-w-4xl h-[60vh]">
                    {FEATURES.map((feat, i) => (
                        <div
                            key={i}
                            className="stack-card absolute inset-0 bg-[#0a0a0a] text-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row origin-bottom"
                            style={{ zIndex: FEATURES.length - i }}
                        >
                            <div className="w-full md:w-1/2 h-full relative">
                                <Image src={feat.img} alt={feat.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-black/20" />
                            </div>
                            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                                <span className="text-terracota text-xs uppercase tracking-widest mb-4">0{i + 1}</span>
                                <h2 className="font-serif text-5xl mb-2">{feat.title}</h2>
                                <h3 className="text-xl text-white/50 mb-8 italic">{feat.subtitle}</h3>
                                <p className="text-lg leading-relaxed text-white/80">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- X-RAY / LAYER PEEL --- */}
            <section className="layer-section relative h-screen flex overflow-hidden bg-black text-white">
                <div className="flex w-[300%] h-full">
                    {/* Layer 1: Structure */}
                    <div className="layer-panel w-screen h-full relative flex items-center justify-center border-r border-white/10">
                        <div className="absolute inset-0 opacity-30">
                            <Image src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1920&auto=format&fit=crop" alt="Structure" fill className="object-cover" />
                        </div>
                        <div className="relative z-10 text-center">
                            <h2 className="font-serif text-8xl mb-4">Estructura</h2>
                            <p className="text-xl tracking-widest uppercase text-white/50">Sólida & Eterna</p>
                        </div>
                    </div>

                    {/* Layer 2: Finish */}
                    <div className="layer-panel w-screen h-full relative flex items-center justify-center border-r border-white/10">
                        <div className="absolute inset-0 opacity-30">
                            <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop" alt="Finish" fill className="object-cover" />
                        </div>
                        <div className="relative z-10 text-center">
                            <h2 className="font-serif text-8xl mb-4">Acabado</h2>
                            <p className="text-xl tracking-widest uppercase text-white/50">Protección Marina</p>
                        </div>
                    </div>

                    {/* Layer 3: Cover */}
                    <div className="layer-panel w-screen h-full relative flex items-center justify-center">
                        <div className="absolute inset-0 opacity-30">
                            <Image src="https://images.unsplash.com/photo-1596230529625-7ee541fb33f6?q=80&w=1920&auto=format&fit=crop" alt="Cover" fill className="object-cover" />
                        </div>
                        <div className="relative z-10 text-center">
                            <h2 className="font-serif text-8xl mb-4">Cobertura</h2>
                            <p className="text-xl tracking-widest uppercase text-white/50">Luz Controlada</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="footer-section relative h-[80vh] flex items-center justify-center bg-terracota text-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 mix-blend-overlay" />

                <div className="footer-cta text-center relative z-10 px-6">
                    <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-tight">
                        Diseño que <br /> perdura.
                    </h2>
                    <Link
                        href="/cotiza?tipo=Techo%20Sol%20y%20Sombra"
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
