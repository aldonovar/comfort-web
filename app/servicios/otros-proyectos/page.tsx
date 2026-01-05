"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
    { src: "/services/otros/item-1.mp4", speed: 0.5, type: "video" },
    { src: "/services/otros/item-2.mp4", speed: 1.2, type: "video" },
    { src: "/services/otros/item-3.mp4", speed: 0.8, type: "video" },
    { src: "/services/otros/item-4.mp4", speed: 1.5, type: "video" },
    { src: "/services/otros/item-5.mp4", speed: 0.6, type: "video" },
    { src: "/services/otros/item-6.mp4", speed: 1.0, type: "video" },
];

const PROCESS_STEPS = [
    { title: "Escuchar", desc: "Entendemos tus necesidades específicas más allá de lo estándar." },
    { title: "Adaptar", desc: "Ajustamos nuestros recursos y experiencia a tu requerimiento." },
    { title: "Ejecutar", desc: "Implementación con la misma calidad que nuestros proyectos principales." },
];

export default function OtrosProyectosPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const masonryRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial setup to avoid FOUC
        gsap.set(".process-step", { opacity: 0, y: 50 });

        const ctx = gsap.context(() => {
            // 1. Hero Floating Elements
            gsap.to(".hero-floater", {
                y: -20,
                rotation: 5,
                duration: 3,
                yoyo: true,
                repeat: -1,
                ease: "sine.inOut",
                stagger: 0.5
            });

            // 2. Masonry Scroll
            const mediaItems = gsap.utils.toArray(".masonry-media");
            mediaItems.forEach((media: any, i) => {
                const speed = GALLERY_ITEMS[i].speed;
                gsap.to(media, {
                    y: -150 * speed, // Slightly reduced for smoother video motion
                    ease: "none",
                    scrollTrigger: {
                        trigger: masonryRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // 3. Card Process Reveal
            // Use fromTo to be explicit about start/end states
            const steps = gsap.utils.toArray(".process-step");
            gsap.to(steps, {
                y: 0,
                opacity: 1,
                stagger: 0.2,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: processRef.current,
                    start: "top 80%", // Trigger earlier
                    end: "bottom center",
                    toggleActions: "play none none reverse"
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
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[var(--bg-primary)]">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="hero-floater absolute top-1/4 left-1/4 w-64 h-64 bg-terracota rounded-full blur-[100px]" />
                    <div className="hero-floater absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 text-center px-6">
                    <p className="text-sm tracking-[0.5em] uppercase font-bold mb-8 text-[var(--text-primary)]">
                        Versatilidad & Alcance
                    </p>
                    <h1 className="font-serif text-[10vw] leading-none tracking-tighter text-[var(--text-primary)]">
                        OTROS <br /> SERVICIOS
                    </h1>
                    <p className="text-xl md:text-2xl text-[var(--text-primary)]/80 mt-8 max-w-2xl mx-auto font-light">
                        Soluciones que complementan tu experiencia <br /> al aire libre.
                    </p>
                </div>
            </section>

            {/* --- MASONRY SCROLL CONCEPT --- */}
            <section ref={masonryRef} className="relative py-32 px-6 md:px-12 bg-[var(--bg-secondary)] min-h-[150vh]">
                <div className="max-w-7xl mx-auto relative">
                    <div className="absolute top-0 left-0 z-10 mb-24">
                        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                            Servicios <br /> <span className="text-terracota italic">Complementarios</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-48">
                        {GALLERY_ITEMS.map((item, i) => (
                            <div key={i} className={`relative aspect-3/4 w-full rounded-lg overflow-hidden group border border-[var(--text-primary)]/5 ${i % 2 === 0 ? 'mt-0' : 'mt-24'}`}>
                                <video
                                    src={item.src}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    className="masonry-media w-full h-[120%] object-cover absolute top-[-10%] transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- ARCHITECTURAL PROCESS CARDS --- */}
            <section ref={processRef} className="relative py-48 px-6 md:px-12 flex flex-col items-center justify-center overflow-hidden">
                {/* Background Image with Blur */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2500&auto=format&fit=crop"
                        alt="Process Background"
                        fill
                        className="object-cover opacity-30 blur-xl scale-110"
                    />
                    <div className="absolute inset-0 bg-[var(--bg-primary)]/80" />
                </div>

                <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
                    {PROCESS_STEPS.map((step, i) => (
                        <div key={i} className="process-step group relative p-12 border border-[var(--text-primary)]/5 bg-[var(--text-primary)]/2 backdrop-blur-sm hover:bg-[var(--text-primary)]/5 hover:border-terracota/30 transition-all duration-500 overflow-hidden">
                            {/* Large Background Number */}
                            <span className="absolute -right-4 -bottom-8 font-serif text-[12rem] leading-none text-[var(--text-primary)]/3 group-hover:text-terracota/5 transition-colors duration-500 select-none pointer-events-none">
                                {i + 1}
                            </span>

                            <div className="relative z-10">
                                <span className="text-terracota text-sm font-bold tracking-[0.2em] mb-6 block">FASE 0{i + 1}</span>
                                <h3 className="text-3xl font-serif text-[var(--text-primary)] mb-6 group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                                <div className="w-12 h-px bg-[var(--text-primary)]/20 mb-6 group-hover:w-24 group-hover:bg-terracota transition-all duration-500" />
                                <p className="text-[var(--text-primary)]/80 font-light leading-relaxed max-w-xs group-hover:text-[var(--text-primary)] transition-colors">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- DETAILS LIST --- */}
            <section className="py-32 px-6 md:px-24 bg-[var(--bg-primary)] border-t border-[var(--text-primary)]/5">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-primary)]/70 mb-12">Gama de Servicios</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {["Paisajismo", "Pintura", "Mobiliario Custom", "Iluminación Escénica", "Mantenimiento", "Consultoría"].map((tag, i) => (
                            <span key={i} className="px-6 py-3 rounded-full border border-[var(--text-primary)]/10 text-lg hover:bg-terracota hover:text-white hover:border-terracota transition-all duration-300 cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="footer-section relative h-[80vh] flex items-center justify-center bg-terracota text-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 mix-blend-overlay" />

                <div className="footer-cta text-center relative z-10 px-6">
                    <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-tight">
                        ¿Buscas algo <br /> más?
                    </h2>
                    <Link
                        href="/cotiza?tipo=Otro%20tipo%20de%20proyecto%20al%20aire%20libre"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full text-lg uppercase tracking-widest hover:scale-105 transition-transform duration-300"
                    >
                        <span>Cuéntanos tu idea</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </section>

        </div>
    );
}
