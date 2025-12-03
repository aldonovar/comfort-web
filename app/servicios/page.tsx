"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SERVICES = [
  {
    id: "01",
    title: "Residencial",
    desc: "Terrazas de departamento",
    video: "https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4",
    slug: "residencial"
  },
  {
    id: "02",
    title: "Corporativo",
    desc: "Azoteas y oficinas",
    video: "https://cdn.coverr.co/videos/coverr-modern-office-space-4853/1080p.mp4",
    slug: "corporativo"
  },
  {
    id: "03",
    title: "Patios",
    desc: "Interiores y jardines",
    video: "https://cdn.coverr.co/videos/coverr-sunlight-hitting-a-plant-4610/1080p.mp4",
    slug: "patios"
  },
  {
    id: "04",
    title: "Integral",
    desc: "Diseño + Ejecución",
    video: "https://cdn.coverr.co/videos/coverr-modern-architecture-building-4606/1080p.mp4",
    slug: "integral"
  }
];

export default function ServiciosScrollPage() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Horizontal Scroll
      const scrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: () => "+=" + track.scrollWidth,
          invalidateOnRefresh: true,
        }
      });

      // Card Animations on Scroll
      const cards = gsap.utils.toArray(".service-card");
      cards.forEach((card: any) => {
        gsap.from(card.querySelector("video"), {
          scale: 1.2,
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true,
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen bg-crema overflow-hidden flex items-center">

      {/* Header (Absolute) */}
      <div className="absolute top-12 left-12 z-20">
        <h2 className="font-serif text-4xl text-madera">Nuestros Servicios</h2>
        <p className="text-xs uppercase tracking-[0.3em] text-terracota mt-2">Desliza para explorar</p>
      </div>

      {/* Horizontal Track */}
      <div ref={trackRef} className="flex gap-12 px-[10vw] h-[70vh] items-center will-change-transform">
        {SERVICES.map((service) => (
          <Link
            key={service.id}
            href={`/servicios/${service.slug}`}
            className="service-card group relative flex-shrink-0 w-[40vw] md:w-[30vw] h-full rounded-[3rem] overflow-hidden bg-black"
          >
            {/* Video Background */}
            <video
              autoPlay muted loop playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
              src={service.video}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-10 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-4">
              <span className="text-6xl font-serif text-white/20 mb-4 block">{service.id}</span>
              <h3 className="text-4xl font-serif text-crema mb-2">{service.title}</h3>
              <p className="text-sm uppercase tracking-widest text-crema/70 mb-6">{service.desc}</p>

              <div className="inline-flex items-center gap-3 text-terracota text-xs font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                Ver Detalle <span className="text-lg">→</span>
              </div>
            </div>
          </Link>
        ))}

        {/* CTA Card */}
        <div className="flex-shrink-0 w-[25vw] h-full flex items-center justify-center">
          <Link
            href="/cotiza"
            className="group relative w-64 h-64 rounded-full bg-madera flex items-center justify-center overflow-hidden hover:scale-105 transition-transform duration-500"
          >
            <div className="absolute inset-0 bg-terracota translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-xl font-serif text-crema italic">Cotizar Proyecto</span>
          </Link>
        </div>
      </div>

    </section>
  );
}
