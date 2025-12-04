"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

            // 2. Background Zoom Effect (Cinematic)
            gsap.to(".bg-image", {
                scale: 1.1,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true
                }
            });

            // 3. Hero Title Reveal (Kinetic)
            const tl = gsap.timeline();
            tl.from(".hero-line", {
                yPercent: 100,
                duration: 1.2,
                ease: "power4.out",
                stagger: 0.1
            }).from(".hero-subtitle", {
                opacity: 0,
                y: 20,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

            // 4. X-Ray / Layer Peel Effect (Sticky Dissolve)
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

            // 5. Footer Reveal
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
        <div ref={container} className="relative min-h-[300vh]">

            {/* --- FIXED BACKGROUNDS (Day to Night) --- */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                {/* Day Layer */}
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1596230529625-7ee541fb33f6?q=80&w=1920&auto=format&fit=crop"
                        alt="Day Terrace"
                        fill
                        className="bg-image object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30" />
                </div>

                {/* Night Layer (Starts invisible) */}
                <div className="night-bg absolute inset-0 opacity-0">
                    <Image
                        src="https://images.unsplash.com/photo-1633505899104-44f3e3e09093?q=80&w=1920&auto=format&fit=crop"
                        alt="Night Terrace"
                        fill
                        className="bg-image object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50" />
                </div>
            </div>

            {/* --- HERO SECTION --- */}
            <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden z-10">
                <div className="relative z-30 text-center text-white">
                    <p className="hero-subtitle text-xs md:text-sm uppercase tracking-[0.5em] font-bold mb-8 drop-shadow-lg text-terracota">
                        Experiencia Comfort
                    </p>
                    <div className="overflow-hidden">
                        <h1 className="hero-line font-serif text-[12vw] leading-[0.85] tracking-tighter drop-shadow-2xl">
                            TECHO SOL
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h1 className="hero-line font-serif text-[12vw] leading-[0.85] tracking-tighter drop-shadow-2xl italic text-white/90">
                            & SOMBRA
                        </h1>
                    </div>
                </div>
            </section>

            {/* --- SPACER FOR SCROLL EFFECT --- */}
            <div className="h-[50vh] relative z-10 flex items-center justify-center">
                <p className="text-white/90 text-2xl md:text-4xl font-serif italic max-w-3xl text-center px-6 drop-shadow-lg leading-relaxed">
                    "El sol se oculta, pero tu espacio <br /> <span className="text-terracota">cobra vida</span>."
                </p>
            </div>

            {/* --- X-RAY / LAYER PEEL (Sticky Dissolve) --- */}
            <section ref={xrayRef} className="relative h-screen w-full z-20 bg-black/60 backdrop-blur-md border-y border-white/10">
                {/* Layer 1: Structure */}
                <div className="xray-layer absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                        <Image src="https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1920&auto=format&fit=crop" alt="Structure" fill className="object-cover opacity-60" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                            <span className="text-terracota text-sm uppercase tracking-widest mb-4">Capa 01</span>
                            <h2 className="font-serif text-6xl md:text-9xl mb-4">Estructura</h2>
                            <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">Madera Huayruro Sólida</p>
                        </div>
                    </div>
                </div>

                {/* Layer 2: Finish */}
                <div className="xray-layer absolute inset-0 flex items-center justify-center opacity-0">
                    <div className="relative w-full h-full">
                        <Image src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop" alt="Finish" fill className="object-cover opacity-60" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                            <span className="text-terracota text-sm uppercase tracking-widest mb-4">Capa 02</span>
                            <h2 className="font-serif text-6xl md:text-9xl mb-4">Acabado</h2>
                            <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">Barniz Marino UV</p>
                        </div>
                    </div>
                </div>

                {/* Layer 3: Cover */}
                <div className="xray-layer absolute inset-0 flex items-center justify-center opacity-0">
                    <div className="relative w-full h-full">
                        <Image src="https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=1920&auto=format&fit=crop" alt="Cover" fill className="object-cover opacity-60" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                            <span className="text-terracota text-sm uppercase tracking-widest mb-4">Capa 03</span>
                            <h2 className="font-serif text-6xl md:text-9xl mb-4">Cobertura</h2>
                            <p className="text-xl md:text-2xl text-white/80 font-light tracking-wide">Policarbonato Alveolar</p>
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
