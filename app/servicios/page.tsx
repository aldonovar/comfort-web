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
    title: "Residencial",
    subtitle: "Refugio Privado",
    desc: "Transformamos terrazas de departamento en extensiones vitales de tu hogar. Privacidad, confort y estética en altura.",
    video: "https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4",
    slug: "residencial",
    stats: ["Penthouse", "Duplex", "Flat"]
  },
  {
    id: "02",
    title: "Corporativo",
    subtitle: "Espacios de Poder",
    desc: "Diseñamos rooftops y áreas comunes que redefinen la cultura laboral. Espacios que inspiran y conectan.",
    video: "https://cdn.coverr.co/videos/coverr-modern-office-space-4853/1080p.mp4",
    slug: "corporativo",
    stats: ["Oficinas", "Hoteles", "Retail"]
  },
  {
    id: "03",
    title: "Campo & Playa",
    subtitle: "Vida Exterior",
    desc: "Arquitectura que dialoga con el paisaje. Estructuras robustas para climas exigentes, sin sacrificar elegancia.",
    video: "https://cdn.coverr.co/videos/coverr-sunlight-hitting-a-plant-4610/1080p.mp4",
    slug: "patios",
    stats: ["Casas de Playa", "Casas de Campo", "Clubes"]
  },
  {
    id: "04",
    title: "Integral",
    subtitle: "Llave en Mano",
    desc: "Desde el boceto hasta el último detalle. Gestionamos todo el proceso constructivo para tu tranquilidad.",
    video: "https://cdn.coverr.co/videos/coverr-modern-architecture-building-4606/1080p.mp4",
    slug: "integral",
    stats: ["Diseño", "Permisos", "Construcción"]
  }
];

export default function ServicesLensPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {

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
    const nextService = SERVICES[index];

    // 1. Animate Out Current
    gsap.to(`.service-slide-${currentIndex} .service-content`, {
      y: direction * -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.inOut"
    });

    // 2. Reveal Next Slide (Curtain Effect)
    const nextSlide = document.querySelector(`.service-slide-${index}`);

    gsap.set(nextSlide, { zIndex: 10, clipPath: direction === 1 ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)" });

    gsap.to(nextSlide, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1.2,
      ease: "expo.inOut",
      onComplete: () => {
        // Reset Previous Slide
        gsap.set(`.service-slide-${currentIndex}`, { zIndex: 0, clipPath: "inset(0 0 0 0)" });
        gsap.set(`.service-slide-${currentIndex} .service-content`, { y: 0, opacity: 1 }); // Reset for next time

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
          className={`service-slide-${i} absolute inset-0 w-full h-full ${i === 0 ? 'z-10' : 'z-0'}`}
        >
          {/* Video Background */}
          <div className="absolute inset-0">
            <video
              src={service.video}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover opacity-60"
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

            <h1 className="font-serif text-[12vw] md:text-[10vw] leading-[0.8] text-white mix-blend-overlay opacity-90 mb-8">
              {service.title.split("").map((char, charIndex) => (
                <span key={charIndex} className="service-title-char inline-block">{char}</span>
              ))}
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
