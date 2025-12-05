"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative bg-(--bg-primary) text-(--text-primary) py-32 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracota/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* The Business Card */}
        <div className="max-w-2xl mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-(--text-primary)/5 rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/5 dark:shadow-black/50 transition-all duration-500 hover:shadow-black/10 dark:hover:shadow-black/70 hover:-translate-y-1">

          {/* Header */}
          <div className="text-center mb-10">
            <span className="block text-terracota text-[9px] tracking-[0.3em] uppercase font-bold mb-3">
              Concierge
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-(--text-primary) mb-4">
              Conexión Directa
            </h2>
            <p className="text-(--text-primary)/60 text-sm max-w-md mx-auto">
              Canales exclusivos para iniciar tu proyecto.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid gap-4">

            {/* WhatsApp */}
            <a
              href="https://wa.me/51936230958"
              target="_blank"
              rel="noopener noreferrer"
              <h4 className="font-serif text-lg text-(--text-primary)">Email</h4>
            <p className="text-[10px] uppercase tracking-wider text-(--text-primary)/50">Propuestas Formales</p>
          </div>
        </div>
        <span className="text-(--text-primary)/20 group-hover:text-terracota transition-colors">→</span>
      </a>

      {/* Calendar */}
      <a
        href="https://calendly.com/comfortstudioperu/30min"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between p-5 rounded-2xl bg-terracota/5 hover:bg-terracota/10 border border-terracota/10 hover:border-terracota/20 transition-all duration-300"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center text-terracota group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <div>
            <h4 className="font-serif text-lg text-(--text-primary)">Agendar Reunión</h4>
            <p className="text-[10px] uppercase tracking-wider text-terracota">Videollamada 30 min</p>
          </div>
        </div>
        <span className="text-terracota group-hover:text-(--text-primary) transition-colors">Reservar</span>
      </a>

    </div>

      {/* Footer */ }
  <div className="mt-8 pt-8 border-t border-(--text-primary)/5 text-center">
    <p className="text-[10px] uppercase tracking-[0.2em] text-(--text-primary)/30">
      Lima, Perú • Proyectos Integrales
    </p>
  </div>

    </div >
  </div >
</section >
  );
}
