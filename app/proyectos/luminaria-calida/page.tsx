"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NEXT_PROJECT = {
    label: "Siguiente Proyecto",
    title: "Damero Sol & Sombra",
    href: "/proyectos/damero",
    image: "/projects/project-4.jpg"
};

// Exact filenames from directory check
const GALLERY_ITEMS = [
    { src: "/projects/luminaria-calida/gallery-1.MP4", alt: "Recorrido Vertical", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-2.MP4", alt: "Detalle Iluminación 1", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-11.JPEG", alt: "Foto Detalle Estructura", aspect: "aspect-[3/4]", span: "md:row-span-1", type: "image" },
    { src: "/projects/luminaria-calida/gallery-3.MP4", alt: "Ambiente Nocturno", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-4.MP4", alt: "Perspectiva Luz", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "quote", type: "text", content: "La calidez de la luz transforma la madera en un elemento vivo.", aspect: "aspect-square", span: "md:row-span-1" },
    { src: "/projects/luminaria-calida/gallery-5.MP4", alt: "Juego de Sombras", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-6.MP4", alt: "Vista General Video", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-7.MP4", alt: "Detalle Constructivo Video", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-8.MP4", alt: "Ambiente Deck Video", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-10.MP4", alt: "Iluminación Focal Video", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-9.MP4", alt: "Vista General 2", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
    { src: "/projects/luminaria-calida/gallery-12.MP4", alt: "Cierre Visual Video", aspect: "aspect-[9/16]", span: "md:row-span-2", type: "video" },
];

function InteractiveVideo({ src, aspect, isPlaying, onToggle }: { src: string, aspect: string, isPlaying: boolean, onToggle: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.play().catch(e => console.error("Play failed", e));
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPlaying]);

    return (
        <div className="relative w-full h-full cursor-pointer group" onClick={onToggle}>
            <video
                ref={videoRef}
                src={src}
                className="w-full h-full object-cover"
                playsInline
                loop
                muted // Muted by default to ensure playability and non-intrusive. Can remove if sound is desired.
            />
            {/* Play Button Overlay - Visible when paused */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            </div>

            {/* Playing Indicator - Optional */}
            {isPlaying && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
        </div>
    );
}

export default function LuminariaCalidaPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [playingIndex, setPlayingIndex] = useState<number | null>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Parallax
            gsap.to(".project-hero-bg", {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: ".project-hero",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });

            // Text Reveal
            gsap.from(".reveal-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".content-section",
                    start: "top 80%"
                }
            });

            // Gallery Stagger
            ScrollTrigger.batch(".gallery-item", {
                onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1, overwrite: true }),
                start: "top 90%"
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleVideoClick = (index: number) => {
        setPlayingIndex(prev => prev === index ? null : index);
    };

    return (
        <main ref={containerRef} className="bg-[var(--bg-primary)] min-h-screen">

            {/* --- HERO --- */}
            <section className="project-hero relative h-[85vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/projects/luminaria-calida/hero.jpg"
                        alt="Luminaria Cálida Hero"
                        fill
                        className="project-hero-bg object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 flex flex-col items-start justify-end z-10">
                    <span className="text-white/90 text-xs md:text-sm tracking-[0.4em] uppercase font-bold mb-6 block animate-fade-in drop-shadow-md">
                        Residencial · Lighting
                    </span>
                    <h1 className="font-serif text-6xl md:text-9xl text-[var(--text-primary)] mix-blend-difference text-white mb-2 animate-fade-in delay-100">
                        Luminaria Cálida
                    </h1>
                    <p className="text-white/80 text-xl font-light tracking-wide animate-fade-in delay-200">
                        La Molina, Lima
                    </p>
                </div>
            </section>

            {/* --- NARRATIVE --- */}
            <section className="content-section py-24 md:py-32 px-6 md:px-24">
                <div className="max-w-4xl mx-auto space-y-12 text-center md:text-left">
                    <h2 className="reveal-text font-serif text-4xl md:text-6xl text-[var(--text-primary)] leading-tight">
                        Atmósferas que cobran vida <br /> al caer la noche.
                    </h2>
                    <div className="reveal-text w-12 h-1 bg-terracota mx-auto md:mx-0" />
                    <p className="reveal-text text-lg md:text-xl text-[var(--text-primary)]/70 leading-relaxed font-light">
                        Más allá de la estructura, este proyecto explora cómo la luz esculpe el espacio. Utilizando temperaturas de color cálidas (2700K) y luminarias estratégicamente ocultas, logramos que la terraza mantenga su acogedora intimidad incluso en la oscuridad total.
                    </p>
                </div>
            </section>

            {/* --- CREATIVE GALLERY (Bento/Masonry) --- */}
            <section className="py-24 px-4 md:px-12 bg-[#080808]">
                <div className="max-w-[1600px] mx-auto">
                    <div className="mb-20 text-center">
                        <span className="text-terracota text-xs tracking-widest uppercase block mb-4">Experiencia Visual</span>
                        <h3 className="font-serif text-3xl md:text-5xl text-[var(--text-primary)]">Galería de Detalles</h3>
                    </div>

                    {/* Grid Layout that respects verticality */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                        {GALLERY_ITEMS.map((item, index) => (
                            <div
                                key={index}
                                className={`gallery-item relative overflow-hidden rounded-sm group bg-neutral-900 ${item.span || ""}`}
                            >
                                {item.type === "text" ? (
                                    <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#111] text-center border border-white/5 h-full">
                                        <p className="font-serif text-xl md:text-2xl text-white/80 italic leading-relaxed">
                                            &ldquo;{item.content}&rdquo;
                                        </p>
                                    </div>
                                ) : item.type === "video" ? (
                                    <InteractiveVideo
                                        src={item.src}
                                        aspect={item.aspect}
                                        isPlaying={playingIndex === index}
                                        onToggle={() => handleVideoClick(index)}
                                    />
                                ) : (
                                    <>
                                        <Image
                                            src={item.src}
                                            alt={item.alt || "Project Image"}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- NEXT PROJECT --- */}
            <section className="h-[60vh] md:h-[80vh] bg-black relative group overflow-hidden">
                <Link href={NEXT_PROJECT.href} className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="text-center">
                        <span className="block text-white/50 text-xs tracking-widest uppercase mb-4 group-hover:text-terracota transition-colors">{NEXT_PROJECT.label}</span>
                        <h2 className="font-serif text-5xl md:text-8xl text-white group-hover:scale-105 transition-transform duration-700">{NEXT_PROJECT.title}</h2>
                    </div>
                </Link>
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700 scale-105 group-hover:scale-100">
                    <Image src={NEXT_PROJECT.image} alt="Next Project" fill className="object-cover" />
                </div>
                <div className="absolute inset-0 bg-black/20" />
            </section>

        </main>
    );
}
