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

        // Force refresh for sticky positioning
        const timer = setTimeout(() => ScrollTrigger.refresh(), 500);

        return () => {
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

        </div >
    );
}
