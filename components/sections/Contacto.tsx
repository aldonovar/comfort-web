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
      className="relative bg-(--bg-primary) text-(--text-primary) py-20 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-terracota/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10">

        {/* The Business Card */}
        <div className="max-w-5xl mx-auto bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-(--text-primary)/5 rounded-3xl p-8 shadow-2xl shadow-black/5 dark:shadow-black/50 transition-all duration-500 hover:shadow-black/10 dark:hover:shadow-black/70 hover:-translate-y-1">

          {/* Header */}
          <div className="text-center mb-8">
            <span className="block text-terracota text-[9px] tracking-[0.3em] uppercase font-bold mb-2">
              Concierge
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-(--text-primary) mb-2">
              Conexión Directa
            </h2>
            <p className="text-(--text-primary)/60 text-xs md:text-sm max-w-md mx-auto">
              Canales exclusivos para iniciar tu proyecto.
            </p>
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-3 gap-4">

            {/* WhatsApp */}
            <a
              href="https://wa.me/51936230958?text=Hola%20Comfort%20Studio,%20quisiera%20m%C3%A1s%20informaci%C3%B3n"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row items-center md:items-start justify-between p-5 rounded-xl bg-(--text-primary)/5 hover:bg-(--text-primary)/10 border border-(--text-primary)/10 hover:border-(--text-primary)/20 transition-all duration-300 text-center md:text-left gap-3 md:gap-0"
            >
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#25D366] group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-(--text-primary)">WhatsApp</h4>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-(--text-primary)/80">Respuesta Inmediata</p>
                </div>
              </div>
              <span className="text-(--text-primary) font-bold opacity-60 group-hover:opacity-100 group-hover:text-terracota transition-all">→</span>
            </a>

            {/* Email */}
            <a
              href="mailto:contacto@comfortstudioperu.com"
              className="group flex flex-col md:flex-row items-center md:items-start justify-between p-5 rounded-xl bg-(--text-primary)/5 hover:bg-(--text-primary)/10 border border-(--text-primary)/10 hover:border-(--text-primary)/20 transition-all duration-300 text-center md:text-left gap-3 md:gap-0"
            >
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-(--text-primary)">Email</h4>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-(--text-primary)/80">Propuestas Formales</p>
                </div>
              </div>
              <span className="text-(--text-primary) font-bold opacity-60 group-hover:opacity-100 group-hover:text-terracota transition-all">→</span>
            </a>

            {/* Calendar */}
            <a
              href="https://calendly.com/comfortstudioperu/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row items-center md:items-start justify-between p-5 rounded-xl bg-terracota/5 hover:bg-terracota/10 border border-terracota/20 hover:border-terracota/40 transition-all duration-300 text-center md:text-left gap-3 md:gap-0"
            >
              <div className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-terracota/10 flex items-center justify-center text-terracota group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-serif text-lg font-medium text-(--text-primary)">Agendar</h4>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-terracota">Videollamada</p>
                </div>
              </div>
              <span className="text-terracota font-bold group-hover:text-(--text-primary) transition-colors">Reservar</span>
            </a>

          </div>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-(--text-primary)/5 text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-(--text-primary)/30">
              Lima, Perú • Proyectos Integrales
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
