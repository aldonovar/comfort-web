"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contacto() {
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Header Animation
      tl.from(".contact-eyebrow", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" })
        .from(".contact-title", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.6")
        .from(".contact-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6");

      // Cards Animation
      tl.from(".contact-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
      }, "-=0.4");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isModalOpen]);

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-[#0a0a0a] text-crema overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Background Noise & Gradient */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">

        {/* Header */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <div className="contact-eyebrow flex items-center justify-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-terracota" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-terracota">
              Contacto
            </span>
            <span className="h-[1px] w-12 bg-terracota" />
          </div>
          <h2 className="contact-title font-serif text-5xl md:text-7xl leading-[1.1] mb-8 text-crema">
            Hablemos de tu <br />
            <span className="italic text-terracota/80">próximo espacio.</span>
          </h2>
          <p className="contact-desc text-lg text-crema/60 max-w-xl mx-auto leading-relaxed font-light">
            Estamos listos para escuchar tus ideas. Elige el canal que prefieras para iniciar la conversación.
          </p>
        </div>

        {/* Unified Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* 1. WhatsApp */}
          <a
            href="https://wa.me/51936230958"
            target="_blank"
            className="contact-card group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-8 h-8 text-terracota" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.57 2 2.21 6.21 2.21 11.57c0 1.92.54 3.7 1.49 5.24L2 22l5.34-1.67a9.9 9.9 0 0 0 4.7 1.2h.01c5.47 0 9.83-4.21 9.83-9.57C21.88 6.21 17.51 2 12.04 2Zm0 17.35c-1.53 0-3.03-.41-4.34-1.2l-.31-.18-3.17.99.98-3.02-.2-.31a7.42 7.42 0 0 1-1.16-3.9c0-4.1 3.39-7.44 7.57-7.44 4.17 0 7.57 3.34 7.57 7.44 0 4.1-3.4 7.44-7.57 7.44Zm4.12-5.59c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.16-.48.05-.22-.11-.93-.36-1.78-1.14-.65-.59-1.09-1.32-1.22-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.27-.02-.38-.06-.11-.5-1.2-.69-1.64-.18-.44-.37-.38-.5-.39h-.43c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.83 0 1.08.79 2.13.9 2.28.11.15 1.55 2.43 3.77 3.31.53.22.94.35 1.27.45.53.17 1.02.15 1.4.09.43-.06 1.3-.53 1.48-1.05.18-.52.18-.96.13-1.05-.05-.09-.2-.15-.42-.26Z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracota mb-3">Chat Rápido</p>
              <h3 className="font-serif text-2xl text-crema">WhatsApp</h3>
            </div>
            <div className="mt-8">
              <p className="text-sm text-crema/60 mb-4">Respuesta inmediata para consultas breves.</p>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-terracota transition-colors">
                Iniciar Chat <span className="text-lg">→</span>
              </span>
            </div>
          </a>

          {/* 2. Email */}
          <a
            href="mailto:contacto@comfortstudio.pe"
            className="contact-card group p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 flex flex-col justify-between min-h-[280px] relative overflow-hidden"
          >
            <div className="absolute top-6 right-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-8 h-8 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracota mb-3">Documentación</p>
              <h3 className="font-serif text-2xl text-crema">Email</h3>
            </div>
            <div className="mt-8">
              <p className="text-sm text-crema/60 mb-4">Para planos, cotizaciones formales y detalles.</p>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-terracota transition-colors">
                Enviar Correo <span className="text-lg">→</span>
              </span>
            </div>
          </a>

          {/* 3. Calendly Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="contact-card group p-8 rounded-[2rem] bg-terracota border border-terracota hover:bg-terracota/90 transition-all duration-500 flex flex-col justify-between min-h-[280px] relative overflow-hidden text-left"
          >
            <div className="absolute top-6 right-6 text-white opacity-40 group-hover:opacity-100 transition-opacity duration-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-3">Reunión Virtual</p>
              <h3 className="font-serif text-2xl text-white">Agendar Cita</h3>
            </div>
            <div className="mt-8">
              <p className="text-sm text-white/80 mb-4">Videollamada de 30 min con un arquitecto.</p>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:translate-x-1 transition-transform">
                Reservar Ahora <span className="text-lg">→</span>
              </span>
            </div>
          </button>

          {/* 4. Location */}
          <div className="contact-card p-8 rounded-[2rem] bg-white/5 border border-white/10 flex flex-col justify-between min-h-[280px]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-terracota mb-3">Ubicación</p>
              <h3 className="font-serif text-2xl text-crema">Lima, Perú</h3>
            </div>
            <div className="mt-8">
              <p className="text-sm text-crema/60">
                Atendemos proyectos integrales en toda Lima Metropolitana y alrededores.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Calendly Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl h-[80vh] bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#1a1a1a]">
              <h3 className="font-serif text-xl text-crema">Agenda tu Reunión</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-crema/60 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Iframe Container */}
            <div className="flex-1 bg-white">
              <iframe
                src="https://calendly.com/tu-usuario/consulta-terraza"
                title="Agenda tu reunión con Comfort Studio"
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
