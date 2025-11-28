"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial Reveal Animation
      tl.from(".hero-bg-video", { scale: 1.1, duration: 2, ease: "power2.out" }, 0)
        .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 }, 0.3)
        .from(".hero-title-line", { y: 50, opacity: 0, duration: 1, stagger: 0.15 }, 0.4)
        .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8 }, 0.8)
        .from(".hero-cta-group", { y: 20, opacity: 0, duration: 0.8 }, 1.0)
        .from(".hero-card-container", { x: 40, opacity: 0, duration: 1.2 }, 0.6);

      // 2. Mouse Parallax Effect for the Card
      const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; // range -10 to 10
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(cardRef.current, {
          rotateY: x,
          rotateX: -y,
          duration: 1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 3. Scroll Parallax
      gsap.to(".hero-bg-video", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-madera text-crema flex items-center"
    >
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-bg-video w-full h-[120%] object-cover opacity-50"
          src="https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4"
        />
        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
        {/* Noise Texture for Film Grain Feel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center h-full pt-20 lg:pt-0">

        {/* Left Column: Typography & CTAs */}
        <div className="space-y-10">

          {/* Eyebrow / Tag */}
          <div className="hero-eyebrow flex items-center gap-4">
            <div className="h-[1px] w-12 bg-terracota/60" />
            <span className="text-xs uppercase tracking-[0.3em] text-crema/70 font-medium">
              Arquitectura Exterior · Lima
            </span>
          </div>

          {/* Title with Split Lines for Animation */}
          <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-crema">
            <div className="overflow-hidden"><span className="hero-title-line block">Terrazas que se</span></div>
}
