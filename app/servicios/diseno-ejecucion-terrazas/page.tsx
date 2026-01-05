"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HERO_DESCRIPTIONS = [
    "Valoriza tu propiedad habilitando nuevos espacios de vida.",
    "Trato directo y ejecución simplificada de tu proyecto de terraza.",
    "Especialistas en techos sol y sombra, zonas de parrilla y paisajismo urbano.",
    "Materiales seleccionados para máxima durabilidad y estética superior.",
    "Transformamos azoteas vacías en áreas sociales funcionales.",
    "Visualiza tu terraza con propuestas de diseño 3D antes de construir.",
    "Construcción rápida, limpia y ordenada sin complicaciones."
];

const CONCEPT_IMAGES = [
    {
        src: "/services/terrazas/concept-1.jpg",
        alt: "Diseño de terraza santuario para desconectar",
        title: "El verdadero lujo es el tiempo",
        text: "Vivimos corriendo. Tu terraza no debería ser solo metros cuadrados extra, sino tu santuario personal para pausar el reloj. Un espacio diseñado deliberadamente para desconectar del caos urbano y reconectar contigo mismo."
    },
    {
        src: "/services/terrazas/concept-2.jpg",
        alt: "Habitar el exterior con confort",
        title: "Habitar el exterior",
        text: "Diseñamos espacios que te invitan a quedarte. No es un lugar de paso o de 'verano'; es donde el café de la mañana sabe mejor y donde los atardeceres se vuelven rituales diarios de descompresión."
    },
    {
        src: "/services/terrazas/concept-3.jpg",
        alt: "Escenario de memorias sociales",
        title: "Escenario de memorias",
        text: "El lugar donde las conversaciones se alargan y las celebraciones cobran vida. Creamos el telón de fondo perfecto para los momentos que realmente importan, priorizando la comodidad y la calidez en cada detalle."
    }
];

const GALLERY_IMAGES = [
    {
        src: "/services/terrazas/gallery-1.jpg",
        alt: "Paisajismo para terrazas: jardines verticales y selección botánica para privacidad.",
        title: "Paisajismo Integrado",
        desc: "Vegetación que respira."
    },
    {
        src: "/services/terrazas/gallery-2.jpg",
        alt: "Iluminación escénica para terrazas y rooftops con sistemas LED de bajo consumo.",
        title: "Iluminación Escénica",
        desc: "Atmósferas nocturnas."
    },
    {
        src: "/services/terrazas/gallery-3.jpg",
        alt: "Mobiliario a medida para exteriores: bancas empotradas y tejidos resistentes.",
        title: "Mobiliario Custom",
        desc: "Diseño a medida."
    },
    {
        src: "/services/terrazas/gallery-4.jpg",
        alt: "Estructuras de techos sol y sombra modernos para control solar en terrazas.",
        title: "Coberturas",
        desc: "Sombra y protección."
    }
];

export default function TerrazasPage() {
    const container = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const conceptRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const [currentDescIndex, setCurrentDescIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentDescIndex((prev) => (prev + 1) % HERO_DESCRIPTIONS.length);
                setIsAnimating(false);
            }, 500);
        }, 7000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Hero Architecture Reveal
            const tl = gsap.timeline();
            tl.from(".hero-title-line", {
                y: 100,
                opacity: 0,
                duration: 1.5,
                stagger: 0.1,
                ease: "power4.out"
            })
                .from(".hero-meta", {
                    opacity: 0,
                    y: 20,
                    duration: 1,
                    ease: "power3.out"
                }, "-=1");

            // 2. Dynamic Philosophy Section with Text switching
            const texts = gsap.utils.toArray(".concept-text-item");
            const images = gsap.utils.toArray(".concept-image");

            ScrollTrigger.create({
                trigger: conceptRef.current,
                start: "top top",
                end: "bottom bottom",
                pin: ".concept-text-col",
            });

            images.forEach((img: any, i) => {
                // Image opacity transition (keeping existing logic for images)
                if (i > 0) {
                    gsap.fromTo(img,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            scrollTrigger: {
                                trigger: img,
                                start: "top center",
                                end: "center center",
                                scrub: true,
                            }
                        }
                    );
                }

                // Text crossfade logic linked to image visibility
                ScrollTrigger.create({
                    trigger: img,
                    start: "top center",
                    end: "bottom center",
                    onEnter: () => setActiveText(i),
                    onEnterBack: () => setActiveText(i),
                });
            });

            function setActiveText(index: number) {
                texts.forEach((text: any, i) => {
                    if (i === index) {
                        gsap.to(text, { opacity: 1, y: 0, duration: 0.5, overwrite: true });
                    } else {
                        gsap.to(text, { opacity: 0, y: 20, duration: 0.5, overwrite: true });
                    }
                });
            }

            // Initialize first text
            setActiveText(0);

            // 3. Parallax Grid
            const col1 = galleryRef.current?.querySelector(".gallery-col-1");
            const col2 = galleryRef.current?.querySelector(".gallery-col-2");

            if (col1 && col2) {
                gsap.to(col1, {
                    yPercent: -20,
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1
                    }
                });

                gsap.to(col2, {
                    yPercent: 10,
                    ease: "none",
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1.5
                    }
                });
            }

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


        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <div ref={container} className="bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">

            {/* --- HERO SECTION (Architectural Layout) --- */}
            <section ref={heroRef} className="relative h-screen w-full px-6 md:px-12 pt-40 md:pt-48 pb-12 flex flex-col justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/services/service-2.jpg"
                        alt="Diseño de terrazas de lujo en azoteas (rooftops) con pérgolas y paisajismo"
                        fill
                        className="object-cover opacity-80"
                        priority
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-black/90" />
                </div>

                <div className="relative z-10 max-w-6xl mt-20">
                    <div className="mb-6">
                        <p className="hero-meta text-terracota text-sm md:text-base tracking-[0.3em] uppercase font-bold">
                            Proyecto Integral
                        </p>
                    </div>
                    <h1 className="font-serif italic text-6xl md:text-9xl leading-none tracking-tight text-white mix-blend-difference">
                        <span className="block">DISEÑO</span>
                        <span className="block text-white/50">DE TERRAZAS</span>
                        <span className="block">& EJECUCIÓN</span>
                    </h1>
                </div>

                <div className="relative z-10 flex justify-end items-end mt-auto">
                    <div className="hero-meta max-w-xl text-right">
                        <div className="h-32 flex items-end justify-end">
                            <p className={`text-white/90 text-xl md:text-2xl leading-relaxed transition-opacity duration-500 ease-in-out ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                                {HERO_DESCRIPTIONS[currentDescIndex]}
                            </p>
                        </div>
                        <div className="mt-8 w-full h-px bg-white/20" />
                        <div className="mt-4 flex justify-end gap-8 text-xs uppercase tracking-widest text-white/40">
                            <span>Lima, Perú</span>
                            <span>Est. 2024</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- STICKY SIDE-BY-SIDE CONCEPT --- */}
            <section ref={conceptRef} className="relative flex flex-col md:flex-row bg-[var(--bg-secondary)]">
                {/* Left: Sticky Text Container */}
                <div className="concept-text-col w-full md:w-1/2 h-screen sticky top-0 flex items-center px-6 md:px-24 z-10 overflow-hidden">
                    <div className="relative w-full h-full flex items-center">
                        {CONCEPT_IMAGES.map((item, i) => (
                            <div key={i} className="concept-text-item absolute top-1/2 -translate-y-1/2 left-0 w-full opacity-0 translate-y-8">
                                <span className="text-terracota text-xs uppercase tracking-[0.3em] mb-6 block">Filosofía {i + 1}</span>
                                <h2 className="font-serif text-4xl md:text-6xl mb-8 leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-[var(--text-primary)]/70 text-lg md:text-xl leading-relaxed max-w-lg">
                                    {item.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Scrolling Images */}
                <div className="w-full md:w-1/2 relative z-0">
                    {CONCEPT_IMAGES.map((item, i) => (
                        <div key={i} className="concept-image h-screen w-full relative sticky top-0 border-l border-[var(--text-primary)]/5">
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className="object-cover transition-all duration-700"
                            />
                            <div className="absolute inset-0 bg-black/20" />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PARALLAX GRID GALLERY --- */}
            <section ref={galleryRef} className="relative py-32 px-6 md:px-12 bg-[var(--bg-primary)] overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                    {/* Column 1 - Moves Up */}
                    <div className="gallery-col-1 flex flex-col gap-12 md:gap-24 pt-24">
                        {GALLERY_IMAGES.slice(0, 2).map((item, i) => (
                            <div key={i} className="relative aspect-[3/4] w-full overflow-hidden rounded-sm group">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h4 className="text-white font-serif text-2xl">{item.title}</h4>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                        <div className="p-8 border border-[var(--text-primary)]/10 bg-[var(--bg-secondary)]">
                            <h3 className="font-serif text-3xl mb-4">Detalles que importan</h3>
                            <p className="text-[var(--text-primary)]/50">Cada textura, cada sombra y cada planta es seleccionada con propósito para tu terraza.</p>
                        </div>
                    </div>

                    {/* Column 2 - Moves Down */}
                    <div className="gallery-col-2 flex flex-col gap-12 md:gap-24">
                        <div className="p-8 border border-[var(--text-primary)]/10 bg-[var(--bg-secondary)] text-right">
                            <h3 className="font-serif text-3xl mb-4">Ejecución Impecable</h3>
                            <p className="text-[var(--text-primary)]/50">Supervisión constante para asegurar que el diseño de tu oasis se haga realidad.</p>
                        </div>
                        {GALLERY_IMAGES.slice(2, 4).map((item, i) => (
                            <div key={i} className="relative aspect-[3/4] w-full overflow-hidden rounded-sm group">
                                <Image
                                    src={item.src}
                                    alt={item.alt}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <h4 className="text-white font-serif text-2xl">{item.title}</h4>
                                    <p className="text-white/60 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- DETAILS LIST --- */}
            <section className="py-24 px-6 md:px-24 bg-[var(--bg-secondary)] border-t border-[var(--text-primary)]/5">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {[
                            { label: "Rango", val: "15 m² - 150 m²" },
                            { label: "Tiempo", val: "3 - 5 Semanas" },
                            { label: "Gestión", val: "Trato Directo" },
                            { label: "Diseño", val: "A Medida" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <span className="block text-xs uppercase tracking-widest text-terracota mb-2">{item.label}</span>
                                <p className="font-serif text-2xl md:text-3xl">{item.val}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER CTA --- */}
            <section className="footer-section relative h-[80vh] flex items-center justify-center bg-terracota text-black overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-10 mix-blend-overlay" />

                <div className="footer-cta text-center relative z-10 px-6">
                    <h2 className="font-serif text-5xl md:text-8xl mb-12 leading-tight">
                        ¿Listo para tu <br /> nuevo oasis?
                    </h2>
                    <Link
                        href="/cotiza?tipo=Diseño%20y%20Ejecución%20de%20Terraza"
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
