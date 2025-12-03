"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Video Scale-in
      tl.from(videoRef.current, { scale: 1.2, opacity: 0, duration: 2, ease: "expo.out" }, 0);

      // 2. Title Reveal (Staggered)
      tl.from(".hero-word", {
        y: 150,
        opacity: 0,
        duration: 1.5,
        stagger: 0.15,
        skewY: 7,
        ease: "power3.out"
      }, 0.5);

      // 3. CTA Reveal
      tl.from(".hero-cta", { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, 1.2);

      // 4. Parallax on Scroll
      gsap.to(videoRef.current, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 5. Mouse Parallax (Subtle)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; // -10 to 10
        const y = (clientY / window.innerHeight - 0.5) * 20;
        gsap.to(titleRef.current, { x: x, y: y, duration: 1, ease: "power2.out" });
      };
      window.addEventListener("mousemove", handleMouseMove);

      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-madera text-crema flex flex-col justify-center items-center text-center"
    >
      {/* --- Background Video --- */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
          src="https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-[1800px] mx-auto px-6 flex flex-col items-center gap-6 md:gap-10">

        {/* Brand Tag */}
        <div className="overflow-hidden">
          <p className="hero-word text-xs md:text-sm uppercase tracking-[0.4em] text-terracota font-bold mb-2">
            Comfort Studio
          </p>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="font-serif text-[15vw] leading-[0.8] tracking-tighter flex flex-col items-center mix-blend-overlay opacity-90 select-none">
          <div className="overflow-hidden"><span className="hero-word block">Espacios</span></div>
          <div className="overflow-hidden"><span className="hero-word block italic text-white/90">Vivos</span></div>
        </h1>

        {/* Description */}
        <div className="overflow-hidden">
          <p className="hero-word text-lg md:text-2xl text-crema/90 max-w-xl font-light tracking-wide mt-4 md:mt-8">
            Arquitectura sensorial que transforma terrazas en experiencias de vida.
          </p>
        </div>

        {/* Magnetic CTA */}
        <div className="mt-8 overflow-hidden p-4">
          <a
            href="#cotiza"
            className="hero-cta group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-110 hover:bg-terracota hover:border-terracota"
          >
            <span className="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-white group-hover:hidden">
              Explora
            </span>
            <svg
              className="hidden group-hover:block w-6 h-6 md:w-8 md:h-8 text-white animate-bounce"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-12 left-12 hidden md:block hero-word opacity-50">
        <p className="text-xs uppercase tracking-[0.3em] text-crema">Lima, Perú — 2025</p>
      </div>
      <div className="absolute bottom-12 right-12 hidden md:block hero-word opacity-50">
        <p className="text-xs uppercase tracking-[0.3em] text-crema">Scroll to Discover</p>
      </div>

    </section>
  );
}
