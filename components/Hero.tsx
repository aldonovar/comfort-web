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

      // 1. Video Scale-in & Fade-in
      tl.from(videoRef.current, { scale: 1.1, opacity: 0, duration: 2.5, ease: "expo.out" }, 0);

      // 2. Title Reveal (Staggered & Cinematic)
      tl.from(".hero-char", {
        y: 100,
        opacity: 0,
        rotateX: -45,
        duration: 1.8,
        stagger: 0.05,
        ease: "power3.out"
      }, 0.5);

      // 3. Subtitle & Meta Reveal
      tl.from(".hero-meta", {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power2.out"
      }, 1.5);

      // 4. CTA Reveal
      tl.from(".hero-cta", { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.7)" }, 1.8);

      // 5. Parallax on Scroll
      gsap.to(videoRef.current, {
        yPercent: 20,
        scale: 1.1, // Slight zoom on scroll
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 6. Mouse Parallax (Refined)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 30;
        const y = (clientY / window.innerHeight - 0.5) * 30;

        gsap.to(titleRef.current, {
          x: x,
          y: y,
          rotationY: x * 0.5,
          rotationX: -y * 0.5,
          duration: 1.5,
          ease: "power2.out"
        });

        gsap.to(".hero-meta", {
          x: x * 0.5,
          y: y * 0.5,
          duration: 1.5,
          ease: "power2.out"
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-black text-crema flex flex-col justify-center items-center text-center perspective-1000"
    >
      {/* --- Background Video --- */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-70"
          src="https://videos.pexels.com/video-files/3205634/3205634-uhd_2560_1440_25fps.mp4"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 flex flex-col items-center gap-8 md:gap-12">

        {/* Brand Tag */}
        <div className="hero-meta overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-12 bg-white/50"></div>
            <p className="text-xs md:text-sm uppercase tracking-[0.5em] text-white/90 font-light">
              Comfort Studio
            </p>
            <div className="h-[1px] w-12 bg-white/50"></div>
          </div>
        </div>

        {/* Title */}
        <h1 ref={titleRef} className="font-serif text-[16vw] md:text-[14vw] leading-[0.8] tracking-tighter flex flex-col items-center text-white mix-blend-overlay select-none drop-shadow-2xl">
          <div className="overflow-hidden flex">
            {"Espacios".split("").map((char, i) => (
              <span key={i} className="hero-char inline-block origin-bottom">{char}</span>
            ))}
          </div>
          <div className="overflow-hidden flex">
            {"Vivos".split("").map((char, i) => (
              <span key={i} className="hero-char inline-block italic text-terracota-light origin-bottom">{char}</span>
            ))}
          </div>
        </h1>

        {/* Description */}
        <div className="hero-meta overflow-hidden max-w-2xl">
          <p className="text-lg md:text-2xl text-white/80 font-light tracking-wide leading-relaxed">
            Arquitectura sensorial que transforma <span className="text-white font-normal">terrazas</span> en experiencias de vida.
          </p>
        </div>

        {/* Magnetic CTA */}
        <div className="hero-cta mt-8">
          <a
            href="#cotiza"
            className="group relative flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/5 backdrop-blur-sm border border-white/20 transition-all duration-500 hover:scale-110 hover:bg-white/10 hover:border-white/40"
          >
            <div className="absolute inset-0 rounded-full border border-white/10 animate-ping opacity-20"></div>
            <span className="text-[0.6rem] md:text-xs font-bold uppercase tracking-widest text-white group-hover:opacity-0 transition-opacity duration-300">
              Explora
            </span>
            <svg
              className="absolute w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-12 left-12 hidden md:flex hero-meta items-center gap-4 opacity-60">
        <div className="w-2 h-2 bg-terracota rounded-full animate-pulse"></div>
        <p className="text-xs uppercase tracking-[0.3em] text-white">Lima, Perú — 2025</p>
      </div>

      <div className="absolute bottom-12 right-12 hidden md:block hero-meta opacity-60">
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] uppercase tracking-widest text-white rotate-90 origin-right translate-x-4">Scroll</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </div>

    </section>
  );
}
