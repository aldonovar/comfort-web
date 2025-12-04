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
        subtitle: "El Corazón del Proyecto",
        desc: "Seleccionada por su densidad superior y resistencia natural a la intemperie. Cada viga es tratada para perdurar décadas.",
        img: "https://images.unsplash.com/photo-1610312278520-bcc19387bcba?q=80&w=1920&auto=format&fit=crop", // Wood texture
        color: "text-amber-500"
    },
    {
        id: "varnish",
        title: "Barniz Marino UV",
        subtitle: "Escudo Invisible",
        desc: "Tecnología de protección avanzada que bloquea el 99% de radiación UV, manteniendo el color vivo y la madera nutrida.",
        img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1920&auto=format&fit=crop", // Varnish/Liquid texture
        color: "text-blue-400"
    },
    {
        id: "poly",
        title: "Policarbonato Alveolar",
        subtitle: "Luz Sin Calor",
        desc: "Filtrado inteligente de luz. Permite el paso de la claridad mientras bloquea el calor radiante, creando un ambiente fresco.",
        img: "https://images.unsplash.com/photo-1510627489930-0c1b0bfb6785?q=80&w=1920&auto=format&fit=crop", // Polycarbonate/Glass texture
        color: "text-cyan-300"
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
            // Pin the hero section for a long scroll distance
            ScrollTrigger.create({
                trigger: heroPinRef.current,
                start: "top top",
                end: "+=200%", // Scroll distance for the transition
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const p = self.progress;

                    // Day fades out 0 -> 0.3
                    // Sunset fades in 0.2 -> 0.5 -> fades out 0.7
                    // Night fades in 0.6 -> 1.0

                    // Day Opacity
                    gsap.to(".day-layer", { opacity: 1 - p * 2, overwrite: true });

                    // Sunset Opacity (Peak at 0.5)
                    const sunsetOpacity = p < 0.2 ? 0 : p > 0.8 ? 0 : 1 - Math.abs(p - 0.5) * 2;
                    gsap.to(".sunset-layer", { opacity: sunsetOpacity, overwrite: true });

                    // Night Opacity
                    const nightOpacity = p < 0.5 ? 0 : (p - 0.5) * 2;
                    gsap.to(".night-layer", { opacity: nightOpacity, overwrite: true });

                    // Text Color Transition
                    if (p > 0.6) {
                        gsap.to(".hero-title", { color: "#ffffff", textShadow: "0 0 20px rgba(255,255,255,0.5)", overwrite: true });
                    } else {
                        gsap.to(".hero-title", { color: "#ffffff", textShadow: "none", overwrite: true });
                    }
                }
            });

            // 2. ANATOMY: Sticky Stack Cards
            const cards = gsap.utils.toArray(".anatomy-card");
            ScrollTrigger.create({
                trigger: anatomyRef.current,
                start: "top top",
                end: "+=300%",
                pin: true,
                scrub: true,
                onUpdate: (self) => {
                    const total = cards.length;
                    const progress = self.progress * total;
                    const index = Math.floor(progress);

                    cards.forEach((card: any, i) => {
                        if (i === index) {
                            gsap.to(card, { yPercent: 0, scale: 1, opacity: 1, overwrite: true });
                        } else if (i < index) {
                            gsap.to(card, { yPercent: -100, scale: 0.9, opacity: 0, overwrite: true });
                        } else {
                            gsap.to(card, { yPercent: 100, scale: 1.1, opacity: 0, overwrite: true });
                        }
                    });
                }
            });

            // 3. Infinite Marquee
            gsap.to(".marquee-content", {
                xPercent: -50,
                repeat: -1,
                duration: 30,
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
                    {/* Day (Video) */}
                    <div className="day-layer absolute inset-0 opacity-100">
                        <video autoPlay muted loop playsInline className="object-cover w-full h-full"
                            src="https://videos.pexels.com/video-files/3205633/3205633-hd_1920_1080_25fps.mp4"
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Sunset (Image) */}
                    <div className="sunset-layer absolute inset-0 opacity-0">
                        <Image src="https://images.unsplash.com/photo-1507643179173-39db4f92c827?q=80&w=1920&auto=format&fit=crop" alt="Sunset" fill className="object-cover" />
                        <div className="absolute inset-0 bg-orange-900/20 mix-blend-overlay" />
                    </div>

                    {/* Night (Image) */}
                    <div className="night-layer absolute inset-0 opacity-0">
                        <Image src="https://images.unsplash.com/photo-1633505899104-44f3e3e09093?q=80&w=1920&auto=format&fit=crop" alt="Night" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/50" />
                    </div>
                </div>

                {/* Hero Content (Pinned) */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                    <p className="text-sm uppercase tracking-[0.5em] mb-6 font-medium drop-shadow-md">Experiencia Comfort</p>
                    <h1 className="hero-title font-serif text-[12vw] leading-[0.8] transition-colors duration-500 drop-shadow-2xl">
                        TECHO SOL <br /> <span className="italic">& SOMBRA</span>
                    </h1>
                    <div className="mt-12 animate-bounce">
                        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                    </div>
                </div>
            </div>

            {/* --- ANATOMY OF QUALITY (Sticky Stack) --- */}
            <section ref={anatomyRef} className="relative h-screen bg-neutral-900 overflow-hidden">
                <div className="absolute top-10 left-0 w-full text-center z-20">
                    <h2 className="text-4xl md:text-6xl font-serif text-white/20 uppercase tracking-widest">Anatomía</h2>
                </div>

                {/* Cards Container */}
                <div className="relative h-full w-full flex items-center justify-center">
                    {MATERIALS.map((mat, i) => (
                        <div key={mat.id} className="anatomy-card absolute w-[90vw] md:w-[60vw] h-[70vh] bg-neutral-800 rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row">
                            {/* Image Side */}
                            <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                                <Image src={mat.img} alt={mat.title} fill className="object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:bg-gradient-to-r" />
                            </div>
                            {/* Content Side */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full p-8 md:p-16 flex flex-col justify-center bg-neutral-900/95 backdrop-blur-sm">
                                <span className={`text-sm uppercase tracking-widest mb-4 font-bold ${mat.color}`}>Componente 0{i + 1}</span>
                                <h3 className="text-4xl md:text-5xl font-serif mb-6">{mat.title}</h3>
                                <h4 className="text-xl text-white/80 mb-4 italic">{mat.subtitle}</h4>
                                <p className="text-white/60 leading-relaxed">{mat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
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
                        <div key={i} className="w-[25vw] aspect-[4/5] relative mx-4 shrink-0 grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
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
