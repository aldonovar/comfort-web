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
          start: "top 60%",
        },
      });

      // Simple Fade Up for Header
      tl.from(".contact-content", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
      });

      // Cards are static to ensure visibility

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
      className="relative py-40 text-crema overflow-hidden min-h-screen flex flex-col justify-center"
    >
      {/* Animated Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] via-[#2a2522] to-[#151515] bg-[length:400%_400%] animate-gradient-slow" />
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />

        {/* Floating Orbs for extra life */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-terracota/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-madera/20 rounded-full blur-[100px] animate-float-slow pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">

        {/* Header - Centered & Refined */}
        <div className="contact-content mb-24 text-center max-w-3xl mx-auto space-y-6">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.4em] text-terracota/80">
            Inicia la conversación
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl leading-tight text-crema font-light">
            Diseñemos el espacio <br />
            <span className="italic text-white/40">donde quieres estar.</span>
          </h2>
          <p className="text-sm md:text-base text-crema/50 max-w-lg mx-auto leading-relaxed font-light">
            Cada proyecto comienza con una idea. Elige el canal que mejor se adapte a ti para dar el primer paso.
          </p>
        </div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">

          {/* 1. WhatsApp */}
          <a
            href="https://wa.me/51936230958"
            target="_blank"
            className="contact-card group p-8 rounded-3xl bg-white/[0.08] border border-white/10 hover:border-white/20 hover:bg-white/[0.12] transition-all duration-500 flex flex-col justify-between min-h-[260px] relative overflow-hidden backdrop-blur-sm"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-full bg-white/5 text-terracota group-hover:scale-110 transition-transform duration-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.04 2C6.57 2 2.21 6.21 2.21 11.57c0 1.92.54 3.7 1.49 5.24L2 22l5.34-1.67a9.9 9.9 0 0 0 4.7 1.2h.01c5.47 0 9.83-4.21 9.83-9.57C21.88 6.21 17.51 2 12.04 2Zm0 17.35c-1.53 0-3.03-.41-4.34-1.2l-.31-.18-3.17.99.98-3.02-.2-.31a7.42 7.42 0 0 1-1.16-3.9c0-4.1 3.39-7.44 7.57-7.44 4.17 0 7.57 3.34 7.57 7.44 0 4.1-3.4 7.44-7.57 7.44Zm4.12-5.59c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.16-.48.05-.22-.11-.93-.36-1.78-1.14-.65-.59-1.09-1.32-1.22-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.27-.02-.38-.06-.11-.5-1.2-.69-1.64-.18-.44-.37-.38-.5-.39h-.43c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.83 0 1.08.79 2.13.9 2.28.11.15 1.55 2.43 3.77 3.31.53.22.94.35 1.27.45.53.17 1.02.15 1.4.09.43-.06 1.3-.53 1.48-1.05.18-.52.18-.96.13-1.05-.05-.09-.2-.15-.42-.26Z" /></svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">Chat</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl text-crema/90">WhatsApp</h3>
              <p className="text-xs text-crema/60 font-light leading-relaxed">
                Respuesta rápida para consultas puntuales.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-[10px] uppercase tracking-widest text-terracota opacity-90 group-hover:opacity-100 transition-opacity">
              Iniciar <span className="text-sm">→</span>
            </div>
          </a>

          {/* 2. Email */}
          <a
            href="mailto:contacto@comfortstudio.pe"
            className="contact-card group p-8 rounded-3xl bg-white/[0.08] border border-white/10 hover:border-white/20 hover:bg-white/[0.12] transition-all duration-500 flex flex-col justify-between min-h-[260px] relative overflow-hidden backdrop-blur-sm"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-full bg-white/5 text-terracota group-hover:scale-110 transition-transform duration-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white/70 transition-colors">Mail</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl text-crema/90">Correo</h3>
              <p className="text-xs text-crema/60 font-light leading-relaxed">
                Para envío de planos y formalidades.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-[10px] uppercase tracking-widest text-terracota opacity-90 group-hover:opacity-100 transition-opacity">
              Enviar <span className="text-sm">→</span>
            </div>
          </a>

          {/* 3. Calendly Trigger */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="contact-card group p-8 rounded-3xl bg-terracota/15 border border-terracota/30 hover:bg-terracota/25 hover:border-terracota/40 transition-all duration-500 flex flex-col justify-between min-h-[260px] relative overflow-hidden text-left backdrop-blur-sm"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-full bg-terracota/20 text-terracota group-hover:scale-110 transition-transform duration-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-terracota/70 group-hover:text-terracota transition-colors">Video</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl text-crema/90">Reunión Virtual</h3>
              <p className="text-xs text-crema/60 font-light leading-relaxed">
                Agenda 30 min con un arquitecto del equipo.
              </p>
            </div>

            <div className="pt-6 border-t border-terracota/20 flex items-center gap-2 text-[10px] uppercase tracking-widest text-terracota opacity-100 group-hover:translate-x-1 transition-transform">
              Reservar <span className="text-sm">→</span>
            </div>
          </button>

          {/* 4. Location */}
          <div className="contact-card p-8 rounded-3xl bg-white/[0.08] border border-white/10 flex flex-col justify-between min-h-[260px] backdrop-blur-sm">
            <div className="flex justify-between items-start">
              <div className="p-3 rounded-full bg-white/5 text-terracota">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span className="text-[10px] uppercase tracking-widest text-white/40">Studio</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl text-crema/90">Lima, Perú</h3>
              <p className="text-xs text-crema/60 font-light leading-relaxed">
                Proyectos integrales en Lima Metropolitana.
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 cursor-default">
              Sede Central
            </div>
          </div>

        </div>
      </div>

      {/* Calendly Modal - Refined */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div
            className="absolute inset-0 bg-[#050505]/90 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative w-full max-w-4xl h-[85vh] bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#111]">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-terracota animate-pulse" />
                <h3 className="font-serif text-lg text-crema/90">Agenda del Estudio</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-crema/40 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

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

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          animation: gradient-slow 15s ease infinite;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
