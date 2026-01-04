"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
    {
        id: "estilo",
        title: "Estilo",
        subtitle: "Nuestra Firma",
        desc: "Minimalismo cálido. Arquitectura sensorial. Espacios que respiran.",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop",
        href: "/estudio/estilo"
    },
    {
        id: "proceso",
        title: "Proceso",
        subtitle: "De la Idea a la Realidad",
        desc: "Un viaje colaborativo. Rigor técnico y libertad creativa.",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop",
        href: "/estudio/proceso"
    }
];

export default function EstudioPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {

            // Hero Text Stagger
            gsap.from(".hero-line", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.15,
                ease: "power4.out",
                delay: 0.2
            });

            // Sections Reveal Parallax
            const cards = gsap.utils.toArray<HTMLElement>(".studio-card");
            cards.forEach((card, i) => {
                gsap.fromTo(card,
                    { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
                    {
                        clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
                        duration: 1.2,
                        ease: "power3.inOut",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                        }
                    }
                );
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-[#050505] min-h-screen text-white selection:bg-terracota selection:text-white">

            {/* --- HERO SECTION --- */}
            <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6">

                {/* Background Atmosphere */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2560&auto=format&fit=crop"
                        alt="Studio Atmosphere"
                        fill
                        className="object-cover opacity-40 blur-sm scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-[#050505]/90 via-[#050505]/50 to-[#050505]" />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-[90vw] w-full text-center flex flex-col items-center">
                    <div className="overflow-hidden mb-6">
                        <span className="hero-line block text-terracota text-[10px] md:text-sm tracking-[0.5em] uppercase font-bold border border-terracota/30 px-4 py-2 rounded-full bg-terracota/5 backdrop-blur-md">
                            Philosophy & Method
                        </span>
                    </div>

                    <h1 className="font-serif text-6xl md:text-8xl lg:text-[10rem] leading-[0.9] text-white mix-blend-screen">
                        <div className="overflow-hidden"><span className="hero-line block">El Estudio</span></div>
                    </h1>

                    <div className="mt-8 md:mt-12 max-w-2xl mx-auto overflow-hidden">
                        <p className="hero-line text-white/70 text-lg md:text-2xl font-light leading-relaxed text-balance">
                            Más que arquitectura, creamos atmósferas. <br />
                            Un laboratorio donde la <span className="text-white italic">luz</span>, el <span className="text-white italic">material</span> y el <span className="text-white italic">espacio</span> convergen.
                        </p>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="hero-line absolute bottom-[-15vh] md:bottom-[-20vh] animate-bounce">
                        <svg className="w-6 h-6 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                    </div>
                </div>
            </section>

            {/* --- SECTIONS GRID (2 COLUMNS) --- */}
            <section className="py-12 pb-32 px-4 md:px-8 max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 min-h-[80vh]">
                    {SECTIONS.map((section, index) => (
                        <Link
                            key={section.id}
                            href={section.href}
                            className={`
                studio-card group relative block overflow-hidden rounded-[2rem] h-[60vh] lg:h-[85vh] w-full
                ${index === 1 ? 'lg:mt-32' : ''} 
              `}
                        >
                            {/* Image Layer */}
                            <div className="absolute inset-0 bg-gray-900">
                                <Image
                                    src={section.image}
                                    alt={section.title}
                                    fill
                                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
                                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/90 opacity-80" />
                            </div>

                            {/* Content Layer */}
                            <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-end items-start text-left z-20">
                                <span className="block text-terracota text-xs md:text-sm tracking-[0.3em] uppercase font-bold mb-4 md:mb-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    {section.subtitle}
                                </span>

                                <h2 className="font-serif text-5xl md:text-8xl text-white mb-6 transform transition-transform duration-500 origin-left group-hover:scale-105">
                                    {section.title}
                                </h2>

                                <p className="text-white/80 text-base md:text-xl max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 leading-relaxed">
                                    {section.desc}
                                </p>

                                <div className="mt-10 md:mt-16 w-16 h-16 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-terracota group-hover:border-terracota transition-all duration-300">
                                    <span className="text-2xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-500">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

        </main>
    );
}
