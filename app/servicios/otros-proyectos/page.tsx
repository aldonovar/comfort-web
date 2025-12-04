"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MASONRY_IMAGES = [
    { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop", speed: 0.5 },
    { src: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=800&auto=format&fit=crop", speed: 1.2 },
    { src: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?q=80&w=800&auto=format&fit=crop", speed: 0.8 },
    { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop", speed: 1.5 },
    { src: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800&auto=format&fit=crop", speed: 0.6 },
    { src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800&auto=format&fit=crop", speed: 1.0 },
];

const PROCESS_STEPS = [
    { title: "Idea", desc: "Todo empieza con un boceto, una referencia o un sueño." },
    { title: "Diseño", desc: "Traducimos lo abstracto en planos, vistas y materiales tangibles." },
    { title: "Realidad", desc: "Ejecución precisa para que el resultado supere la imaginación." },
];

export default function OtrosProyectosPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const masonryRef = useRef<HTMLDivElement>(null);
    const processRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
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
            const images = gsap.utils.toArray(".masonry-img");
            images.forEach((img: any, i) => {
                const speed = MASONRY_IMAGES[i].speed;
                gsap.to(img, {
                    y: -200 * speed,
                    ease: "none",
                    scrollTrigger: {
                        trigger: masonryRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            });

            // 3. Circular Process Reveal
            const steps = gsap.utils.toArray(".process-step");
            gsap.from(steps, {
                opacity: 0,
                scale: 0.5,
                rotation: -45,
                stagger: 0.3,
                duration: 1,
                scrollTrigger: {
                    trigger: processRef.current,
                    start: "top center",
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
        <div ref={container} className="bg-[#050505] text-white overflow-hidden">

            {/* --- HERO SECTION (Abstract Minimalist) --- */}
            <section ref={heroRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="hero-floater absolute top-1/4 left-1/4 w-64 h-64 bg-terracota rounded-full blur-[100px]" />
                    <div className="hero-floater absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 text-center px-6 mix-blend-difference">
                    <p className="text-sm tracking-[0.5em] uppercase font-bold mb-8 text-white/60">
                        Sin Límites
                    </p>
                    <h1 className="font-serif text-[12vw] leading-none tracking-tighter text-white">
                        A MEDIDA
                    </h1>
                    <p className="text-xl md:text-2xl text-white/50 mt-8 max-w-2xl mx-auto font-light">
                        Cuando tu visión no cabe en un catálogo, <br /> nosotros la construimos.
                    </p>
                </div>
            </section>

            {/* --- MASONRY SCROLL CONCEPT --- */}
            <section ref={masonryRef} className="relative py-32 px-6 md:px-12 bg-[#0a0a0a] min-h-[150vh]">
                <div className="max-w-7xl mx-auto relative">
                    <div className="absolute top-0 left-0 z-10 mb-24">
                        <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                            El arte de lo <br /> <span className="text-terracota italic">imposible</span>.
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 pt-48">
                        {MASONRY_IMAGES.map((item, i) => (
                            <div key={i} className={`masonry-img relative aspect-[3/4] w-full rounded-lg overflow-hidden ${i % 2 === 0 ? 'mt-0' : 'mt-24'}`}>
                                <Image
                                    src={item.src}
                                    alt={`Bespoke ${i}`}
                                    fill
                                    className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CIRCULAR PROCESS --- */}
            <section ref={processRef} className="relative py-48 px-6 md:px-12 bg-[#050505] flex flex-col items-center justify-center">
                <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {PROCESS_STEPS.map((step, i) => (
                        <div key={i} className="process-step flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center mb-8 bg-[#0a0a0a]">
                                <span className="font-serif text-4xl text-terracota">{i + 1}</span>
                            </div>
                            <h3 className="text-2xl font-serif mb-4">{step.title}</h3>
                            <p className="text-white/50 max-w-xs">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- DETAILS LIST --- */}
            <section className="py-32 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-12">Alcance</p>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {["Piscinas", "Jacuzzis", "Jardines Verticales", "Remodelaciones", "Mobiliario Custom", "Domótica"].map((tag, i) => (
                            <span key={i} className="px-6 py-3 rounded-full border border-white/10 text-lg hover:bg-white hover:text-black transition-colors cursor-default">
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
                        ¿Tienes una idea <br /> única?
                    </h2>
                    <Link
                        href="/cotiza?tipo=Proyecto%20A%20Medida"
                        className="inline-flex items-center gap-4 px-12 py-6 bg-black text-white rounded-full text-lg uppercase tracking-widest hover:scale-105 transition-transform duration-300"
                    >
                        <span>Hablemos</span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                </div>
            </section>

        </div>
    );
}
