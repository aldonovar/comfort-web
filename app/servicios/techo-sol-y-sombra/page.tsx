"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(ScrollTrigger, Draggable);

export default function TechoSolSombraPage() {
    const container = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const knobRef = useRef<HTMLDivElement>(null);
    const assemblyRef = useRef<HTMLDivElement>(null);

    // State for lighting control (0 = Day, 0.5 = Sunset, 1 = Night)
    const [lightingState, setLightingState] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. "Control the Sun" Slider Logic
            Draggable.create(knobRef.current, {
                type: "x",
                bounds: sliderRef.current,
                inertia: true,
                onDrag: function () {
                    // Normalize value between 0 and 1
                    const progress = this.x / (this.maxX);
                    setLightingState(progress);

                    // Update background opacities based on slider
                    // Day fades out as we go to 0.5
                    gsap.to(".day-bg", { opacity: 1 - (progress * 2), overwrite: true });

                    // Sunset peaks at 0.5
                    const sunsetOpacity = 1 - Math.abs(progress - 0.5) * 2;
                    gsap.to(".sunset-bg", { opacity: sunsetOpacity, overwrite: true });

                    // Night fades in from 0.5 to 1
                    gsap.to(".night-bg", { opacity: (progress - 0.5) * 2, overwrite: true });
                }
            });

            // 2. Structural Assembly Animation
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: assemblyRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1
                }
            });

            // Beams fly in from sides
            tl.from(".beam-left", { x: -200, opacity: 0, duration: 1 })
                .from(".beam-right", { x: 200, opacity: 0, duration: 1 }, "<")
                // Roof sheets slide down
                .from(".roof-sheet", { y: -100, opacity: 0, stagger: 0.2, duration: 1 })
                // Connectors pop in
                .from(".connector", { scale: 0, opacity: 0, stagger: 0.1, duration: 0.5 });


            // 3. Infinite Marquee
            gsap.to(".marquee-content", {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "linear"
            });

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative min-h-[300vh] bg-black text-white overflow-x-hidden">

            {/* --- DYNAMIC BACKGROUNDS (Controlled by Slider) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Day Layer (Default Visible) */}
                <div className="day-bg absolute inset-0 opacity-100 transition-opacity duration-500">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="object-cover w-full h-full"
                        src="https://videos.pexels.com/video-files/3205633/3205633-hd_1920_1080_25fps.mp4" // Placeholder sunny terrace video
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Sunset Layer */}
                <div className="sunset-bg absolute inset-0 opacity-0 transition-opacity duration-500">
                    <Image
                        src="https://images.unsplash.com/photo-1507643179173-39db4f92c827?q=80&w=1920&auto=format&fit=crop"
                        alt="Sunset Terrace"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-orange-900/30 mix-blend-overlay" />
                </div>

                {/* Night Layer */}
                <div className="night-bg absolute inset-0 opacity-0 transition-opacity duration-500">
                    <Image
                        src="https://images.unsplash.com/photo-1633505899104-44f3e3e09093?q=80&w=1920&auto=format&fit=crop"
                        alt="Night Terrace"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
            </div>

            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex flex-col items-center justify-center z-10 px-6">
                <h1 className="font-serif text-[12vw] leading-[0.8] text-center drop-shadow-2xl">
                    TECHO SOL <br /> <span className="italic text-terracota">& SOMBRA</span>
                </h1>

                {/* INTERACTIVE SLIDER */}
                <div className="mt-16 w-full max-w-md bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
                    <div className="flex justify-between text-xs uppercase tracking-widest mb-2 px-4 text-white/70">
                        <span>Día</span>
                        <span>Atardecer</span>
                        <span>Noche</span>
                    </div>
                    <div ref={sliderRef} className="relative h-8 bg-black/30 rounded-full cursor-pointer overflow-hidden">
                        <div ref={knobRef} className="absolute top-1 left-1 h-6 w-6 bg-terracota rounded-full shadow-[0_0_15px_rgba(255,107,0,0.8)] cursor-grab active:cursor-grabbing" />
                    </div>
                    <p className="text-center text-xs mt-2 text-white/50">Arrastra para controlar el tiempo</p>
                </div>
            </section>

            {/* --- STRUCTURAL ASSEMBLY SECTION --- */}
            <section ref={assemblyRef} className="relative min-h-screen flex items-center justify-center z-10 py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-serif mb-6">Ingeniería de Precisión</h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">Cada pieza encaja perfectamente. Un sistema diseñado para durar toda la vida.</p>
                    </div>

                    {/* Assembly Visualization (Abstract Representation) */}
                    <div className="relative h-[600px] w-full max-w-4xl mx-auto border border-white/10 rounded-xl bg-black/40 backdrop-blur-sm overflow-hidden p-10">
                        {/* Beams */}
                        <div className="beam-left absolute top-1/2 left-10 w-[40%] h-4 bg-amber-800 rounded-full shadow-lg" />
                        <div className="beam-right absolute top-1/2 right-10 w-[40%] h-4 bg-amber-800 rounded-full shadow-lg" />

                        {/* Cross Beams */}
                        <div className="beam-left absolute top-1/3 left-20 w-[30%] h-3 bg-amber-700 rounded-full shadow-lg" />
                        <div className="beam-right absolute top-1/3 right-20 w-[30%] h-3 bg-amber-700 rounded-full shadow-lg" />

                        {/* Roof Sheets */}
                        <div className="absolute inset-0 flex justify-center items-center gap-4">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className="roof-sheet w-16 h-[80%] bg-white/10 border border-white/20 backdrop-blur-md rounded-sm" />
                            ))}
                        </div>

                        {/* Connectors */}
                        <div className="connector absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-terracota rounded-full shadow-[0_0_20px_rgba(255,107,0,0.5)]" />
                    </div>
                </div>
            </section>

            {/* --- INFINITE MARQUEE GALLERY --- */}
            <section className="relative py-32 z-10 bg-black/80 border-y border-white/10 overflow-hidden">
                <div className="flex w-[200%] marquee-content">
                    {[1, 2, 3, 4, 1, 2, 3, 4].map((item, i) => (
                        <div key={i} className="w-[25vw] aspect-[4/5] relative mx-4 shrink-0 grayscale hover:grayscale-0 transition-all duration-500">
                            <Image
                                src={`https://images.unsplash.com/photo-${item === 1 ? '1596230529625-7ee541fb33f6' : item === 2 ? '1633505899104-44f3e3e09093' : item === 3 ? '1533090161767-e6ffed986c88' : '1513694203232-719a280e022f'}?q=80&w=800&auto=format&fit=crop`}
                                alt="Project"
                                fill
                                className="object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="footer-section relative h-[80vh] flex items-center justify-center bg-terracota text-black overflow-hidden z-30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 mix-blend-overlay" />

                <div className="footer-cta text-center relative z-10 px-6">
                    <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-tight">
                        Transforma <br /> tu espacio.
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
