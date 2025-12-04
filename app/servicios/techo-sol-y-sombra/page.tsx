"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
    {
        title: "Estructura",
        subtitle: "Madera Huayruro",
        desc: "Densidad superior. Resistencia natural.",
    },
    {
        title: "Protección",
        subtitle: "Policarbonato Alveolar",
        desc: "Filtrado UV avanzado. Luz suave.",
    },
    {
        title: "Acabado",
        subtitle: "Barniz Marino",
        desc: "Escudo invisible. Brillo satinado.",
    }
];

export default function TechoSolSombraPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const dayNightRef = useRef<HTMLDivElement>(null);
    const xrayRef = useRef<HTMLDivElement>(null);



    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. Day-to-Night Transition (Image Crossfade)
            // The 'Night' layer sits on top and fades in
            gsap.to(".night-bg", {
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });

            // 2. Hero Title Reveal
            gsap.from(".hero-char", {
                y: 100,
                opacity: 0,
                stagger: 0.05,
                duration: 1.5,
                ease: "power4.out"
            });

            // 3. X-Ray / Layer Peel Effect (Sticky Dissolve)
            const layers = gsap.utils.toArray(".xray-layer");

            ScrollTrigger.create({
                trigger: xrayRef.current,
                start: "top top",
                end: "+=300%", // Pin for 3 screens worth of scroll
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress * (layers.length - 1);
                    const activeIndex = Math.floor(progress);
                    const layerProgress = progress - activeIndex;

                    layers.forEach((layer: any, i) => {
                        if (i === activeIndex) {
                            // Current layer fading out
                            gsap.to(layer, { opacity: 1 - layerProgress, overwrite: "auto" });
                        } else if (i === activeIndex + 1) {
                            // Next layer fading in
                            gsap.to(layer, { opacity: layerProgress, overwrite: "auto" });
                        } else if (i < activeIndex) {
                            // Previous layers hidden
                            gsap.to(layer, { opacity: 0, overwrite: "auto" });
                        } else {
                            // Future layers hidden
                            gsap.to(layer, { opacity: 0, overwrite: "auto" });
                        }
                    });
                }
            });

            // 4. Footer Reveal
            gsap.from(".footer-cta", {
                yPercent: 50,
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
        <div ref={container} className="relative min-h-[300vh] bg-black">

            {/* --- FIXED BACKGROUNDS (Day to Night) --- */}
            <div className="fixed inset-0 z-0">
                {/* Day Layer */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1596230529625-7ee541fb33f6?q=80&w=1920&auto=format&fit=crop"
                        alt="Day Terrace"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Night Layer (Starts invisible) */}
                <div className="night-bg absolute inset-0 opacity-0">
                    <Image
                        src="https://images.unsplash.com/photo-1633505899104-44f3e3e09093?q=80&w=1920&auto=format&fit=crop"
                        alt="Night Terrace"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </div>
            </div>

            {/* --- HERO SECTION (Interactive Light) --- */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10">


                <div className="relative z-30 text-center text-white mix-blend-overlay">
                    <p className="text-xs uppercase tracking-[0.5em] font-bold mb-8 drop-shadow-lg">Experiencia Comfort</p>
                    <h1 className="font-serif text-[10vw] leading-[0.85] tracking-tighter drop-shadow-2xl">
                        {"LUZ &".split("").map((c, i) => (
                            <span key={i} className="hero-char inline-block">{c === " " ? "\u00A0" : c}</span>
                        ))}
                        <br />
                        {"SOMBRA".split("").map((c, i) => (
                            <span key={i + 10} className="hero-char inline-block">{c === " " ? "\u00A0" : c}</span>
                        ))}
                    </h1>
                </div>
            </section>

            {/* --- SPACER FOR SCROLL EFFECT --- */}
            <div className="h-[50vh] relative z-10 flex items-center justify-center">
                <p className="text-white/80 text-xl md:text-3xl font-serif italic max-w-2xl text-center px-6 drop-shadow-md">
                    "El sol se oculta, pero tu espacio cobra vida."
                </p>
            </div>

            {/* --- X-RAY / LAYER PEEL (Sticky Dissolve) --- */}
            <section ref={xrayRef} className="relative h-screen w-full z-20 bg-black/80 backdrop-blur-sm border-y border-white/10">
                {/* Layer 1: Structure */}
                <div className="xray-layer absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <Image src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1920&auto=format&fit=crop" alt="Structure" fill className="object-cover opacity-50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <span className="text-terracota text-sm uppercase tracking-widest mb-4">Capa 01</span>
                            <h2 className="font-serif text-6xl md:text-8xl">Estructura</h2>
                            <p className="mt-4 text-xl text-white/60">Madera Huayruro Sólida</p>
                        </div>
                    </div>
                </div>

                {/* Layer 2: Finish */}
                <div className="xray-layer absolute inset-0 flex items-center justify-center opacity-0">
                    <div className="relative w-full h-full">
                        <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop" alt="Finish" fill className="object-cover opacity-50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <span className="text-terracota text-sm uppercase tracking-widest mb-4">Capa 02</span>
                            <h2 className="font-serif text-6xl md:text-8xl">Acabado</h2>
                            <p className="mt-4 text-xl text-white/60">Barniz Marino UV</p>
                        </div>
                    </div>
                </div>

                {/* Layer 3: Cover */}
                <div className="xray-layer absolute inset-0 flex items-center justify-center opacity-0">
                    <div className="relative w-full h-full">
                        <Image src="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=1920&auto=format&fit=crop" alt="Cover" fill className="object-cover opacity-50" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <span className="text-terracota text-sm uppercase tracking-widest mb-4">Capa 03</span>
                            <h2 className="font-serif text-6xl md:text-8xl">Cobertura</h2>
                            <p className="mt-4 text-xl text-white/60">Policarbonato Alveolar</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="footer-section relative h-[80vh] flex items-center justify-center bg-terracota text-black overflow-hidden z-30">
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
