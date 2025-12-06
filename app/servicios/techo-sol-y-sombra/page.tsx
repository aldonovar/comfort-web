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

            // 2. NEW MATERIALITY REVEAL
            const anatomySections = gsap.utils.toArray(".anatomy-section");
            anatomySections.forEach((section: any) => {
                const img = section.querySelector(".anatomy-img");
                const content = section.querySelector(".anatomy-content");

                gsap.fromTo(img,
                    { scale: 1.1 },
                    {
                        scale: 1,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );

                gsap.fromTo(content,
                    { y: 100, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        scrollTrigger: {
                            trigger: section,
                            start: "top center",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // 3. Footer Reveal (Standard)
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


        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={container} className="relative bg-[var(--bg-primary)] text-[var(--text-primary)]">

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
                            {/* Overlay stays dark for text contrast over images, or you can make it dynamic */}
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                    ))}
                </div>

                {/* Hero Content (Pinned) */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="text-sm uppercase tracking-[0.5em] mb-6 font-medium drop-shadow-md text-terracota">Experiencia Comfort</p>
                    <h1 className="font-serif text-[12vw] leading-[0.8] drop-shadow-2xl mb-12 text-white">
                        TECHO SOL <br /> <span className="italic text-white/90">& SOMBRA</span>
                    </h1>

                    {/* Dynamic Labels */}
                    <div className="relative h-10 w-full max-w-md overflow-hidden">
                        {HERO_SCENES.map((scene, i) => (
                            <div key={scene.id} className={`hero-label-${i} absolute inset-0 flex items-center justify-center opacity-0 translate-y-5`}>
                                <span className="text-sm md:text-base uppercase tracking-widest border border-white/30 px-6 py-2 rounded-full backdrop-blur-md bg-white/10 text-white">
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

            {/* --- MATERIALITY: IMMERSIVE SCROLL --- */}
            <section ref={anatomyRef} className="relative bg-[var(--bg-primary)]">
                {MATERIALS.map((mat, i) => (
                    <div key={mat.id} className="anatomy-section h-screen w-full flex items-center justify-center overflow-hidden sticky top-0">
                        {/* Background Image */}
                        <div className="absolute inset-0 z-0">
                            <Image
                                src={mat.img}
                                alt={mat.title}
                                fill
                                className="anatomy-img object-cover transition-transform duration-[3s] ease-out scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="absolute inset-0 bg-linear-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
                        </div>

                        {/* Content Card */}
                        <div className="anatomy-content relative z-10 max-w-6xl w-full px-6 md:px-12 grid md:grid-cols-2 gap-12 items-end">
                            <div className="md:col-start-1">
                                <span className={`inline-block px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs uppercase tracking-widest mb-6 ${mat.color}`}>
                                    Componente 0{i + 1}
                                </span>
                                <h2 className="text-6xl md:text-8xl font-serif mb-6 leading-none text-white">
                                    {mat.title.split(" ")[0]} <br />
                                    <span className="italic text-white/50">{mat.title.split(" ").slice(1).join(" ")}</span>
                                </h2>
                            </div>

                            <div className="md:col-start-2 bg-[var(--bg-secondary)]/80 backdrop-blur-xl p-8 md:p-12 border border-[var(--text-primary)]/10 rounded-sm">
                                <h3 className="text-2xl font-serif mb-4 text-[var(--text-primary)]">{mat.subtitle}</h3>
                                <p className="text-[var(--text-primary)]/70 text-lg leading-relaxed mb-8 font-light">
                                    {mat.desc}
                                </p>
                                <div className="space-y-4">
                                    {mat.specs.map((spec, j) => (
                                        <div key={j} className="flex items-center justify-between border-b border-[var(--text-primary)]/10 pb-2 text-sm text-[var(--text-primary)]/60 uppercase tracking-wider">
                                            <span>{spec.split(":")[0]}</span>
                                            <span className="text-[var(--text-primary)]">{spec.split(":")[1]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </section>

            {/* --- ENGINEERING: HIGH TECH --- */}
            <section className="py-32 px-6 md:px-24 bg-[var(--bg-secondary)] border-t border-[var(--text-primary)]/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-terracota text-xs uppercase tracking-[0.3em] font-bold">Ingeniería</span>
                        <h2 className="text-4xl md:text-6xl font-serif mt-4 text-[var(--text-primary)]">Rendimiento Superior</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {BENEFITS.map((benefit, i) => (
                            <div key={i} className="group p-8 border border-[var(--text-primary)]/5 bg-[var(--bg-primary)]/2 hover:bg-[var(--bg-primary)]/5 transition-colors duration-500">
                                <div className="mb-8 opacity-50 group-hover:opacity-100 transition-opacity text-terracota">
                                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d={benefit.icon} /></svg>
                                </div>
                                <h3 className="text-2xl font-serif mb-4 text-[var(--text-primary)]">{benefit.title}</h3>
                                <p className="text-[var(--text-primary)]/50 leading-relaxed">
                                    {benefit.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- GALLERY: MASONRY --- */}
            <section className="py-32 bg-[var(--bg-primary)]">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-end mb-16">
                        <h2 className="text-4xl md:text-6xl font-serif text-[var(--text-primary)]">Inspiración</h2>
                        <Link href="/proyectos" className="hidden md:block text-sm uppercase tracking-widest text-[var(--text-primary)]/50 hover:text-[var(--text-primary)] transition-colors">Ver Todo →</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-[80vh]">
                        <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop" alt="Gallery 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                        </div>
                        <div className="relative group overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" alt="Gallery 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="relative group overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop" alt="Gallery 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <div className="md:col-span-2 relative group overflow-hidden">
                            <Image src="https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=1200&auto=format&fit=crop" alt="Gallery 4" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                    </div>
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
