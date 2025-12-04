"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MATERIALS = [
    {
        id: "wood",
        title: "Madera Huayruro",
        subtitle: "Densidad & Resistencia",
        desc: "Seleccionada por su densidad superior y resistencia natural a la intemperie. Cada viga es tratada para perdurar décadas.",
        specs: ["Densidad: 900 kg/m³", "Origen: Selva Peruana", "Garantía: 20 Años"],
        img: "https://images.unsplash.com/photo-1610312278520-bcc19387bcba?q=80&w=1920&auto=format&fit=crop",
        color: "text-amber-500"
    },
    {
        id: "varnish",
        title: "Barniz Marino UV",
        subtitle: "Escudo Invisible",
        desc: "Tecnología de protección avanzada que bloquea el 99% de radiación UV, manteniendo el color vivo y la madera nutrida.",
        specs: ["Filtro UV: 99%", "Acabado: Satinado/Mate", "Capas: Triple Aplicación"],
        img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop",
        color: "text-blue-400"
    },
    {
        id: "poly",
        title: "Policarbonato Alveolar",
        subtitle: "Luz Sin Calor",
        desc: "Filtrado inteligente de luz. Permite el paso de la claridad mientras bloquea el calor radiante, creando un ambiente fresco.",
        specs: ["Transmisión Luz: 85%", "Reducción Calor: 40%", "Espesor: 8mm - 10mm"],
        img: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=1920&auto=format&fit=crop",
        color: "text-cyan-300"
    }
];

const HERO_SCENES = [
    {
        id: "day",
        label: "Proyecto: Casa de Playa - Asia",
        img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
    },
    {
        id: "sunset",
        label: "Proyecto: Penthouse - Miraflores",
        img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1920&auto=format&fit=crop"
    },
    {
        id: "night",
        label: "Proyecto: Terraza - San Isidro",
        img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop"
    }
];

const BENEFITS = [
    { title: "Valor Inmobiliario", desc: "Incrementa el valor de tu propiedad con un diseño de alta gama.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Confort Térmico", desc: "Hasta 5°C menos de temperatura gracias a nuestra tecnología de ventilación.", icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" },
    { title: "Durabilidad", desc: "Materiales seleccionados para resistir el clima de Lima por más de 20 años.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
];

export default function TechoSolSombraPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroPinRef = useRef<HTMLDivElement>(null);
    const anatomyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // 1. HERO: "Perfect Scroll" Day-to-Night Transition
            ScrollTrigger.create({
                trigger: heroPinRef.current,
                start: "top top",
                end: "+=200%",
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress;

                    // Opacity Logic for 3 layers
                    // Layer 0 (Day): 0 -> 0.3 fade out
                    // Layer 1 (Sunset): 0.2 -> 0.5 fade in, 0.5 -> 0.8 fade out
                    // Layer 2 (Night): 0.7 -> 1.0 fade in

                    gsap.to(".hero-layer-0", { opacity: 1 - p * 2, overwrite: true });

                    const layer1Opacity = p < 0.2 ? 0 : p > 0.8 ? 0 : 1 - Math.abs(p - 0.5) * 2;
                    gsap.to(".hero-layer-1", { opacity: layer1Opacity, overwrite: true });

                    const layer2Opacity = p < 0.5 ? 0 : (p - 0.5) * 2;
                    gsap.to(".hero-layer-2", { opacity: layer2Opacity, overwrite: true });

                    // Label Transition
                    if (p < 0.33) {
                        gsap.to(".hero-label-0", { opacity: 1, y: 0, overwrite: true });
                        gsap.to([".hero-label-1", ".hero-label-2"], { opacity: 0, y: 20, overwrite: true });
                    } else if (p < 0.66) {
                        gsap.to(".hero-label-1", { opacity: 1, y: 0, overwrite: true });
                        gsap.to([".hero-label-0", ".hero-label-2"], { opacity: 0, y: 20, overwrite: true });
                    } else {
                        gsap.to(".hero-label-2", { opacity: 1, y: 0, overwrite: true });
                        gsap.to([".hero-label-0", ".hero-label-1"], { opacity: 0, y: 20, overwrite: true });
                    }
                }
            });

            // 2. ANATOMY: Split View Sticky
            const sections = gsap.utils.toArray(".anatomy-section");
            ScrollTrigger.create({
                trigger: anatomyRef.current,
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const total = sections.length;
                    const progress = self.progress * total;
                    const index = Math.floor(progress);

                    sections.forEach((section: any, i) => {
                        const img = section.querySelector(".anatomy-img");
                        const content = section.querySelector(".anatomy-content");

                        if (i === index) {
                            gsap.to(section, { opacity: 1, zIndex: 10, overwrite: true });
                            gsap.to(img, { scale: 1.1, overwrite: true }); // Zoom effect
                            gsap.fromTo(content, { y: 50, opacity: 0 }, { y: 0, opacity: 1, overwrite: true });
                        } else {
                            gsap.to(section, { opacity: 0, zIndex: 0, overwrite: true });
                        }
                    });
                }
            });

            // 3. Infinite Marquee
            gsap.to(".marquee-content", {
                xPercent: -50,
                repeat: -1,
                duration: 40,
                ease: "linear"
            });

        }, container);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={container} className="relative bg-black text-white">

            {/* --- HERO: PERFECT SCROLL --- */}
            <div ref={heroPinRef} className="relative h-screen w-full overflow-hidden">

                {/* Background Layers */}
                <div className="absolute inset-0 z-0">
                    {HERO_SCENES.map((scene, i) => (
                        <div key={scene.id} className={`hero-layer-${i} absolute inset-0 transition-opacity duration-0`}>
                            <Image
                                src={scene.img}
                                alt={scene.label}
                                fill
                                className="object-cover"
                                priority={i === 0}
                            />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                    ))}
                </div>

                {/* Hero Content (Pinned) */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="text-sm uppercase tracking-[0.5em] mb-6 font-medium drop-shadow-md text-terracota">Experiencia Comfort</p>
                    <h1 className="font-serif text-[12vw] leading-[0.8] drop-shadow-2xl mb-12">
                        TECHO SOL <br /> <span className="italic text-white/90">& SOMBRA</span>
                    </h1>

                    {/* Dynamic Labels */}
                    <div className="relative h-10 w-full max-w-md overflow-hidden">
                        {HERO_SCENES.map((scene, i) => (
                            <div key={scene.id} className={`hero-label-${i} absolute inset-0 flex items-center justify-center opacity-0 translate-y-5`}>
                                <span className="text-sm md:text-base uppercase tracking-widest border border-white/30 px-6 py-2 rounded-full backdrop-blur-md bg-white/10">
                                    {scene.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="absolute bottom-10 animate-bounce">
                        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                </div>
            </div>

            {/* --- ANATOMY OF QUALITY (Split View) --- */}
            <section ref={anatomyRef} className="relative h-screen bg-neutral-900 overflow-hidden">
                {MATERIALS.map((mat, i) => (
                    <div key={mat.id} className="anatomy-section absolute inset-0 flex flex-col md:flex-row opacity-0">
                        {/* Left: Image Zoom */}
                        <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden">
                            <Image
                                src={mat.img}
                                alt={mat.title}
                                fill
                                className="anatomy-img object-cover scale-100 transition-transform duration-[2s]"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>

                        {/* Right: Glass Content */}
                        <div className="w-full md:w-1/2 h-1/2 md:h-full relative bg-neutral-900 flex items-center justify-center p-8 md:p-20">
                            {/* Background Blur Blob */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 ${mat.color.replace('text-', 'bg-')}`} />

                            <div className="anatomy-content relative z-10 w-full max-w-lg">
                                <span className={`text-sm uppercase tracking-widest mb-4 block font-bold ${mat.color}`}>
                                    Componente 0{i + 1}
                                </span>
                                <h2 className="text-5xl md:text-7xl font-serif mb-6 leading-tight">{mat.title}</h2>
                                <p className="text-xl text-white/80 mb-8 font-light leading-relaxed">
                                    {mat.desc}
                                </p>

                                {/* Tech Specs */}
                                <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-8">
                                    {mat.specs.map((spec, j) => (
                                        <div key={j} className="flex items-center gap-3 text-sm text-white/60 uppercase tracking-wider">
                                            <div className={`w-2 h-2 rounded-full ${mat.color.replace('text-', 'bg-')}`} />
                                            {spec}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- BENEFITS GRID --- */}
            <section className="py-32 px-6 bg-black border-t border-white/10">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {BENEFITS.map((benefit, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-terracota/50 group-hover:bg-terracota/10 transition-all duration-500">
                                    <svg className="w-8 h-8 text-white group-hover:text-terracota transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={benefit.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-serif mb-4">{benefit.title}</h3>
                                <p className="text-white/60 leading-relaxed max-w-xs mx-auto">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- INFINITE MARQUEE --- */}
            <section className="relative py-20 bg-black overflow-hidden border-y border-white/10">
                <div className="flex w-[200%] marquee-content">
                    {[1, 2, 3, 4, 1, 2, 3, 4].map((item, i) => (
                        <div key={i} className="w-[25vw] aspect-[4/5] relative mx-4 shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer group">
                            <Image
                                src={`https://images.unsplash.com/photo-${item === 1 ? '1600607687939-ce8a6c25118c' : item === 2 ? '1600566753190-17f0baa2a6c3' : item === 3 ? '1600210492486-724fe5c67fb0' : '1610312278520-bcc19387bcba'}?q=80&w=800&auto=format&fit=crop`}
                                alt="Project"
                                fill
                                className="object-cover rounded-lg"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white uppercase tracking-widest text-sm border border-white px-4 py-2 rounded-full">Ver Proyecto</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="footer-section relative h-[80vh] flex items-center justify-center bg-terracota text-black overflow-hidden z-30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 mix-blend-overlay" />

                <div className="footer-cta text-center relative z-10 px-6">
                    <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-tight">
                        Hazlo <br /> Realidad.
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
