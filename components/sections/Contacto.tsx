"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".contact-header-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Cards Animation
      gsap.from(".contact-card", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%",
        }
      });

    }, sectionRef);

  }, sectionRef);

  // Force refresh to ensure start/end positions are correct
  const timer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);

  return () => {
    ctx.revert();
    clearTimeout(timer);
  };
}, []);

return (
  <section
    ref={sectionRef}
    id="contacto"
    className="relative bg-[#050505] text-white py-20 md:py-32 overflow-hidden"
  >
    {/* Background Ambience */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-terracota/5 rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
    </div>

    <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">

      {/* Header */}
      <div className="contact-header-reveal text-center mb-24">
        <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">
          Contacto
        </span>
        <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-8">
          Hablemos de tu <br />
          <span className="text-white/40 italic">próximo espacio.</span>
        </h2>
        <p className="text-white/60 text-lg max-w-xl mx-auto">
          Elige el canal que prefieras. Estamos listos para escuchar tu idea y transformarla en un plan.
        </p>
      </div>

      {/* Grid of Portals */}
      <div className="contact-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">

        {/* WhatsApp */}
        <a
          href="https://wa.me/51936230958"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col justify-between h-[300px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            </div>
            <h3 className="font-serif text-2xl mb-2">WhatsApp</h3>
            <p className="text-white/50 text-sm">Respuesta rápida para consultas puntuales.</p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
            <span>Iniciar Chat</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </a>

        {/* Mail */}
        <a
          href="mailto:contacto@comfortstudio.pe"
          className="contact-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col justify-between h-[300px] overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-serif text-2xl mb-2">Correo</h3>
            <p className="text-white/50 text-sm">Para envío de planos y formalidades.</p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
            <span>Enviar Correo</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </a>

        {/* Calendly */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="contact-card group relative p-8 rounded-3xl bg-terracota/20 border border-terracota/30 hover:bg-terracota/30 hover:border-terracota/50 transition-all duration-500 flex flex-col justify-between h-[300px] overflow-hidden text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-terracota/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-terracota/20 flex items-center justify-center mb-6 text-terracota group-hover:scale-110 transition-transform duration-500">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="font-serif text-2xl mb-2 text-white">Reunión Virtual</h3>
            <p className="text-white/60 text-sm">Agenda 30 min con un arquitecto del equipo.</p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest text-terracota group-hover:text-white transition-colors">
            <span>Reservar Ahora</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </button>

        {/* Studio */}
        <div className="contact-card group relative p-8 rounded-3xl bg-white/5 border border-white/10 flex flex-col justify-between h-[300px] overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h3 className="font-serif text-2xl mb-2">Lima, Perú</h3>
            <p className="text-white/50 text-sm">Proyectos integrales en Lima Metropolitana.</p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest text-white/20 cursor-default">
            <span>Sede Central</span>
          </div>
        </div>

      </div>
    </div>

    {/* Calendly Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={() => setIsModalOpen(false)}
        />

        <div className="relative w-full max-w-5xl h-[85vh] bg-[#111] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-300 flex flex-col">

          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/5 bg-[#111]">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-terracota animate-pulse" />
              <span className="text-sm font-medium tracking-wide text-white/80">Agenda Comfort Studio</span>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Iframe */}
          <div className="flex-1 bg-white">
            <iframe
              src="https://calendly.com/comfortstudioperu/30min"
              width="100%"
              height="100%"
              frameBorder="0"
              title="Calendly"
            ></iframe>
          </div>

        </div>
      </div>
    )}

  </section>
);
}
