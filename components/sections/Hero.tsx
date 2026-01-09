"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import Button from "../ui/Button";

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
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg"
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<SVGSVGElement>(null);

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
    }, containerRef); // Scope to container

    return () => ctx.revert(); // Cleanup GSAP
  }, []);

  // Performance Optimized Tilt Logic (Vanilla JS + rAF)
  useEffect(() => {
    if (!containerRef.current || !cardRef.current) return;

    const container = containerRef.current;
    const card = cardRef.current;

    let bounds = container.getBoundingClientRect();
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const onResize = () => {
      bounds = container.getBoundingClientRect();
    };
    // Use passive listener for better scroll performance
    window.addEventListener('resize', onResize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX - bounds.left;
      mouseY = e.clientY - bounds.top;

      if (!rafId) {
        rafId = requestAnimationFrame(updateCard);
      }
    };

    const updateCard = () => {
      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // Invert X/Y for natural feel
      const rotateX = ((mouseY - centerY) / centerY) * -5;
      const rotateY = ((mouseX - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      rafId = 0;
    };

    const onMouseLeave = () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
    };

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    container.addEventListener('mouseleave', onMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100dvh] w-full overflow-hidden bg-primary text-primary flex items-center transition-colors duration-500"
    >

      {/* Background Images Slideshow (Parallax Wrapper) */}
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform scale-110">
        {HERO_IMAGES.map((img, index) => (
          <div
            key={img}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={img}
              alt="Comfort Studio Hero Background"
              fill
              priority={index === 0} // Prioritize first image for LCP
              className="object-cover object-center md:object-center"
              quality={90}
              placeholder="empty" // Could add blur data props if generated
            />
          </div>
        ))}

        {/* Global Overlay for Contrast */}
        <div className="absolute inset-0 bg-black/40 z-10" />

        {/* Navbar Gradient (Top) */}
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent z-10 pointer-events-none" />

        {/* Global Dark Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Content Grid */}
      <div className="relative z-20 h-full max-w-[1800px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 items-center gap-12 md:gap-20 pt-32 pb-20 md:py-0">

        {/* Left: Text Content */}
        <div ref={textRef} className="md:col-span-7 flex flex-col justify-center space-y-8">
          <div className="w-20 h-px bg-terracota mb-4" />

          <h1 className="font-serif text-4xl md:text-8xl leading-[1.1] md:leading-[0.9] tracking-tight text-white mb-6 md:mb-0">
            Terrazas que se <br />
            <span className="italic text-terracota">sienten hogar</span> <br />
            desde el inicio.
          </h1>

          <p className="text-lg md:text-xl text-white/80 max-w-xl font-light leading-relaxed">
            Transformamos terrazas, azoteas y patios en espacios diseñados
            con luz cálida, materiales premium y arquitectura pensada para ser vivida.
          </p>

          <div className="flex flex-wrap gap-6 pt-4">
            <Button href="/cotiza" variant="primary">
              Cotizar Proyecto
            </Button>

            <Button href="https://calendly.com/comfortstudioperu/30min" variant="outline" target="_blank">
              Agendar Reunión
            </Button>
          </div>
        </div>

        {/* Right: Stats Card (3D Tilt) */}
        <div className="col-span-1 md:col-span-5 flex justify-center md:justify-end relative perspective-1000 mt-8 md:mt-0">
          <div
            ref={cardRef}
            className="w-full max-w-[400px] bg-black/40 backdrop-blur-xl border border-white/10 p-6 md:p-10 rounded-3xl shadow-2xl relative overflow-hidden group transition-transform duration-100 ease-out will-change-transform"
          >
            {/* Glossy Reflection */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="flex items-center justify-between mb-12 h-6">
              <span className={`text-[0.65rem] uppercase tracking-[0.3em] text-terracota font-bold flex items-center gap-2 transition-all duration-500 ${isTagVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}`}>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {ROTATING_TAGS[currentTagIndex]}
              </span>
            </div>

            <h3 className="font-serif text-3xl leading-tight mb-8 text-white transition-colors duration-500">
              De la idea al espacio real: <br />
              <span className="italic text-white/80">terrazas que venden confianza.</span>
            </h3>

            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
              <div>
                <span className="block text-4xl font-bold mb-1 text-white">80+</span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Terrazas <br />Construidas</span>
              </div>
              <div>
                <span className="block text-4xl font-bold mb-1 text-white">12 <span className="text-lg font-normal">años</span></span>
                <span className="text-xs text-white/60 uppercase tracking-wider">Experiencia <br />Diseñando exteriores</span>
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
