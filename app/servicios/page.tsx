"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(ScrollTrigger, Observer);

const SERVICES = [
  {
    id: "01",
    title: "Techo Sol y Sombra",
    subtitle: "Control de Luz y Clima",
    desc: "Estructuras que doman el sol y la lluvia sin perder la conexión con el cielo. Madera, aluminio y tecnología.",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-sunlight-through-trees-in-forest-4467/1080p.mp4",
    slug: "techo-sol-y-sombra",
    stats: ["Madera", "Aluminio", "Retráctil"]
  },
  {
    id: "02",
    title: "Diseño de Terrazas",
    subtitle: "Proyecto Integral",
    desc: "Desde el primer trazo hasta la última luz. Un solo equipo, una visión unificada para tu espacio exterior.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-modern-architecture-with-pool-5686/1080p.mp4",
    slug: "diseno-ejecucion-terrazas",
    stats: ["Diseño", "Planos", "Ejecución"]
  },
  {
    id: "03",
    title: "Estación de Parrilla",
    subtitle: "Outdoor Kitchen",
    desc: "El corazón de la reunión. Fuego, sabor y diseño para el chef anfitrión. Acabados premium y funcionalidad.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=2670&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-grilling-meat-on-barbecue-4462/1080p.mp4",
    slug: "estacion-parrilla",
    stats: ["Acero", "Granito", "Equipamiento"]
  },
  {
    id: "04",
    title: "Otros Proyectos",
    subtitle: "A Medida",
    desc: "Fogateros, lounges, decks. Soluciones únicas para espacios que desafían lo estándar.",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
    video: "https://cdn.coverr.co/videos/coverr-fire-pit-in-the-evening-4465/1080p.mp4",
    slug: "otros-proyectos",
    stats: ["Fogateros", "Decks", "Lounges"]
  }
];

export default function ServicesLensPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Initial State: Hide all except first
      SERVICES.forEach((_, i) => {
        if (i !== 0) {
          gsap.set(`.service-slide-${i}`, { autoAlpha: 0 });
        } else {
          gsap.set(`.service-slide-${i}`, { autoAlpha: 1, zIndex: 10 });
        }
      });

      // Initial Reveal
      gsap.from(".service-title-char", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.05,
        ease: "power4.out",
        delay: 0.5
      });

    }, containerRef);

    // Observer for Scroll Jacking
    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => !isAnimating && goToService(currentIndex - 1),
      onDown: () => !isAnimating && goToService(currentIndex + 1),
      tolerance: 10,
      preventDefault: true
    });

    return () => {
      ctx.revert();
      observer.kill();
    };
  }, [currentIndex, isAnimating]);

  const goToService = (index: number) => {
    if (index < 0 || index >= SERVICES.length || isAnimating) return;

    setIsAnimating(true);
    const direction = index > currentIndex ? 1 : -1;

    // 1. Animate Out Current
    gsap.to(`.service-slide-${currentIndex} .service-content`, {
      y: direction * -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    });

    // 2. Reveal Next Slide
    const nextSlide = document.querySelector(`.service-slide-${index}`);

    // Make sure next slide is visible for animation
    gsap.set(nextSlide, { autoAlpha: 1, zIndex: 10, clipPath: direction === 1 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)" });

    gsap.to(nextSlide, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.2,
      ease: "expo.inOut",
      onComplete: () => {
        // Hide Previous Slide
        gsap.set(`.service-slide-${currentIndex}`, { autoAlpha: 0, zIndex: 0, clipPath: "inset(0 0 0 0)" });
        gsap.set(`.service-slide-${currentIndex} .service-content`, { y: 0, opacity: 1 });

        setCurrentIndex(index);
        setIsAnimating(false);
      }
    });

    // 3. Animate In Next Content
    gsap.fromTo(`.service-slide-${index} .service-content`,
      { y: direction * 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: "power3.out" }
    );

  };

  return (
    <main ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">

      {/* --- SLIDES --- */}
      {SERVICES.map((service, i) => (
        <div
          key={service.id}
          className={`service-slide-${i} absolute inset-0 w-full h-full`}
        >
          {/* Background Media */}
          <div className="absolute inset-0">
            {/* Image Fallback/Poster */}
            <img
              src={service.image}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            {/* Video Overlay */}
            <video
              src={service.video}
              autoPlay
              muted
              loop
              playsInline
              poster={service.image}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-black/40" />
            {/* Noise Overlay */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          </div>

          {/* Content */}
          <div className="service-content absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-20">

            <div className="mb-6 overflow-hidden">
              <span className="inline-block text-terracota text-xs md:text-sm tracking-[0.5em] uppercase font-bold border-b border-terracota/30 pb-2">
                {service.subtitle}
              </span>
            </div>

            <h1 className="font-serif text-[10vw] md:text-[8vw] leading-[0.9] text-white mix-blend-overlay opacity-90 mb-8 max-w-5xl">
              {service.title}
            </h1>

            <p className="max-w-xl text-white/80 text-lg md:text-xl font-light leading-relaxed mb-12">
              {service.desc}
            </p>

            <Link
              href={`/servicios/${service.slug}`}
              className="group relative inline-flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <span className="text-sm uppercase tracking-widest text-white">Explorar Servicio</span>
              <span className="w-8 h-8 rounded-full bg-terracota flex items-center justify-center text-black group-hover:scale-110 transition-transform">
                →
              </span>
            </Link>

            {/* Quick Stats */}
            <div className="absolute bottom-32 md:bottom-20 flex gap-8 md:gap-16">
              {service.stats.map((stat, s) => (
                <div key={s} className="text-center">
                  <span className="block w-1 h-1 bg-white/50 rounded-full mx-auto mb-2" />
                  <span className="text-[10px] uppercase tracking-widest text-white/40">{stat}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      ))}

      {/* --- UI OVERLAYS --- */}

      {/* Timeline / Progress */}
      <div className="absolute bottom-10 left-0 w-full px-12 z-50 flex items-center justify-between pointer-events-none">
        <span className="text-xs font-mono text-white/30">0{currentIndex + 1}</span>

        <div className="flex-1 mx-8 h-[1px] bg-white/10 relative">
          <div
            className="absolute top-0 left-0 h-full bg-terracota transition-all duration-1000 ease-out"
            style={{ width: `${((currentIndex + 1) / SERVICES.length) * 100}%` }}
          />
        </div>

        <span className="text-xs font-mono text-white/30">0{SERVICES.length}</span>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-12 z-50 flex flex-col items-center gap-2 animate-pulse-slow">
        <span className="text-[9px] uppercase tracking-widest text-white/30 rotate-90 origin-right translate-x-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
      </div>

    </main>
  );
}
