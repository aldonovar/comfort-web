"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const ROTATING_TAGS = [
  "DISEÑO + OBRA INTEGRAL",
  "EXTERIORES DE LUJO",
  "PAISAJISMO URBANO",
  "TERRAZAS PREMIUM",
  "CONFORT Y ESTILO",
  "ARQUITECTURA VIVA",
  "ESPACIOS ÚNICOS"
];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const stampRef = useRef<SVGSVGElement>(null);

  // Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Rotating Tag State
  const [currentTagIndex, setCurrentTagIndex] = useState(0);
  const [isTagVisible, setIsTagVisible] = useState(true);

  // Background Slideshow State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Background Slideshow Interval
    const imageInterval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(imageInterval);
  }, []);

  useEffect(() => {
    // Rotating Tag Interval
    const interval = setInterval(() => {
      setIsTagVisible(false);
      setTimeout(() => {
        setCurrentTagIndex((prev) => (prev + 1) % ROTATING_TAGS.length);
        setIsTagVisible(true);
      }, 500); // Wait for fade out
    }, 7000); // 7 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Entrance Animation (Simplified for Headline)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Headline: Simple fade in, no stagger/movement
    tl.fromTo(textRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5 }
    );

    // Stats Card: Slide in from right
    if (cardRef.current) {
      tl.fromTo(cardRef.current,
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, delay: 0.5 },
        "-=1.0"
      );
    }

    // Parallax Effect for Background
    if (bgRef.current) {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });
    }

    // Rotate Stamp
    if (stampRef.current) {
      gsap.to(stampRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "linear"
      });
    }

  }, []);

  // Global 3D Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate tilt based on distance from center of the SECTION, not just the card
    // Invert X/Y for natural feel
    const rotateX = ((y - centerY) / centerY) * -5; // Reduced intensity for global effect
    const rotateY = ((x - centerX) / centerX) * 5;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-primary text-primary flex items-center transition-colors duration-500"
    >

      {/* Background Images Slideshow (Parallax Wrapper) */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform scale-110">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url('${img}')` }}
          />
        ))}

        {/* Global Overlay for Contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Navbar Gradient (Top) */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent z-10 pointer-events-none" />

        {/* Text Gradient (Left) - Stronger for White Text */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-linear-to-r from-black/90 via-black/50 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content Grid */}
      <div className="relative z-20 h-full max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 items-center gap-12 md:gap-20 pt-32 pb-20 md:py-0">

        {/* Left: Text Content */}
        <div ref={textRef} className="md:col-span-7 flex flex-col justify-center space-y-8">
          <div className="w-20 h-px bg-terracota mb-4" />

          <h1 className="font-serif text-5xl md:text-8xl leading-[1.1] md:leading-[0.9] tracking-tight text-white mb-6 md:mb-0">
            Terrazas que se <br />
            <span className="italic text-terracota">sienten hogar</span> <br />
            desde el inicio.
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl font-light leading-relaxed">
            Transformamos terrazas, azoteas y patios en espacios diseñados
            con luz cálida, materiales premium y arquitectura pensada para ser vivida.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Link href="/cotiza" className="group relative px-8 py-4 bg-terracota rounded-full overflow-hidden shadow-lg shadow-terracota/20 hover:shadow-terracota/40 transition-all duration-500 hover:-translate-y-1">
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10 font-bold uppercase tracking-widest text-sm flex items-center gap-2 text-white">
                Cotizar Proyecto
                <svg className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>

            <Link href="/contacto" className="group relative px-8 py-4 overflow-hidden rounded-full transition-all duration-500 hover:-translate-y-1 bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40">
              <span className="relative z-10 font-bold uppercase tracking-widest text-sm flex items-center gap-2 text-white">
                Agendar Reunión
                <svg className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Right: Stats Card (3D Tilt) */}
        <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end relative perspective-1000 mt-8 md:mt-0">
          <div
            ref={cardRef}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transition: "transform 0.1s ease-out"
            }}
            className="w-full max-w-[400px] bg-secondary/80 backdrop-blur-xl border border-primary/10 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group transition-colors duration-500"
          >
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between mb-12 h-6">
              <span className={`text-[0.65rem] uppercase tracking-[0.3em] text-terracota font-bold flex items-center gap-2 transition-all duration-500 ${isTagVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {ROTATING_TAGS[currentTagIndex]}
              </span>
            </div>

            <h3 className="font-serif text-3xl leading-tight mb-8 text-primary transition-colors duration-500">
              De la idea al espacio real: <br />
              <span className="italic text-primary/60">terrazas que venden confianza.</span>
            </h3>

            <div className="grid grid-cols-2 gap-8 border-t border-primary/10 pt-8">
              <div>
                <span className="block text-4xl font-bold mb-1 text-primary">80+</span>
                <span className="text-xs text-primary/40 uppercase tracking-wider">Terrazas <br />Construidas</span>
              </div>
              <div>
                <span className="block text-4xl font-bold mb-1 text-primary">12 <span className="text-lg font-normal">años</span></span>
                <span className="text-xs text-primary/40 uppercase tracking-wider">Experiencia <br />Diseñando exteriores</span>
              </div>
            </div>

            {/* Decorative Stamp */}
            <div className="absolute -bottom-12 -right-12 w-40 h-40 opacity-100 transition-opacity duration-500">
              <svg ref={stampRef} viewBox="0 0 100 100" className="w-full h-full">
                <path id="curve" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                <text className="text-[10px] uppercase font-bold tracking-widest fill-terracota transition-colors duration-500">
                  <textPath href="#curve">
                    Comfort Studio • Comfort Studio •
                  </textPath>
                </text>
              </svg>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
