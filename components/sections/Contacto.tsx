"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Contacto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"menu" | "calendar">("menu");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split Screen Reveal
      gsap.from(".contact-left", {
        x: -50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      gsap.from(".contact-right", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

      // Stagger Menu Items
      gsap.from(".contact-right", {
        x: 50,
        opacity: 0,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="relative bg-[#050505] text-white min-h-screen flex items-center overflow-hidden py-20"
    >
      <div className="container mx-auto px-6 md:px-12 h-full">
        <div className="grid lg:grid-cols-2 gap-0 h-full min-h-[80vh] border border-white/10 rounded-3xl overflow-hidden bg-[#0a0a0a]">

          {/* LEFT: THE CONCIERGE (Visual Ambience) */}
          <div className="contact-left relative hidden lg:block h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop"
              alt="Comfort Studio Ambience"
              fill
              className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-[2s] scale-105 hover:scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

            <div className="absolute bottom-12 left-12 z-10">
              <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
                Concierge
              </span>
              <h2 className="font-serif text-5xl leading-tight mb-6">
                Tu visión, <br />
                <span className="text-white/50 italic">nuestra misión.</span>
              </h2>
              <p className="text-white/60 max-w-sm text-sm leading-relaxed">
                Estamos listos para escuchar. Elige tu canal preferido y comencemos a diseñar.
              </p>
            </div>
          </div>

          {/* RIGHT: THE INTERFACE (Interactive Menu) */}
          <div className="contact-right relative h-full bg-[#0f0f0f] flex flex-col">

            {/* Header */}
            <div className="p-8 md:p-12 border-b border-white/5 flex justify-between items-center">
              <h3 className="text-xs uppercase tracking-widest text-white/40">Conexión Directa</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-green-500 font-medium">En Línea</span>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 relative overflow-hidden">

              {/* MENU VIEW */}
              <div className={`absolute inset-0 p-8 md:p-12 flex flex-col justify-center transition-all duration-500 ${activeTab === 'menu' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 -translate-x-10 pointer-events-none'}`}>
                <div className="contact-menu space-y-4">

                  {/* 1. WhatsApp (Priority) */}
                  <a href="https://wa.me/51936230958" target="_blank" rel="noopener noreferrer" className="contact-item group block p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                        </div>
                        <div>
                          <h4 className="font-serif text-xl">WhatsApp Directo</h4>
                          <p className="text-xs text-white/50">Respuesta inmediata</p>
                        </div>
                      </div>
                      <span className="text-white/20 group-hover:text-white transition-colors">→</span>
                    </div>
                  </a>

                  {/* 2. Schedule (Hero Interaction) */}
                  <button onClick={() => setActiveTab('calendar')} className="contact-item group w-full text-left p-6 rounded-xl bg-terracota/10 border border-terracota/20 hover:bg-terracota/20 hover:border-terracota/40 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-terracota/20 flex items-center justify-center text-terracota">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                          <h4 className="font-serif text-xl text-white">Agendar Reunión</h4>
                          <p className="text-xs text-terracota">Videollamada de 30 min</p>
                        </div>
                      </div>
                      <span className="text-terracota group-hover:text-white transition-colors">Reservar</span>
                    </div>
                  </button>

                  {/* 3. Email */}
                  <a href="mailto:contacto@comfortstudio.pe" className="contact-item group block p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                        </div>
                        <div>
                          <h4 className="font-serif text-xl">Correo Electrónico</h4>
                          <p className="text-xs text-white/50">Propuestas formales</p>
                        </div>
                      </div>
                      <span className="text-white/20 group-hover:text-white transition-colors">→</span>
                    </div>
                  </a>

                </div>
              </div>

              {/* CALENDAR VIEW (Inline Expansion) */}
              <div className={`absolute inset-0 bg-[#0f0f0f] flex flex-col transition-all duration-500 ${activeTab === 'calendar' ? 'opacity-100 translate-x-0 pointer-events-auto' : 'opacity-0 translate-x-10 pointer-events-none'}`}>
                <div className="p-6 border-b border-white/5 flex items-center gap-4">
                  <button onClick={() => setActiveTab('menu')} className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors">
                    ← Volver
                  </button>
                  <h4 className="font-serif text-lg">Selecciona tu horario</h4>
                </div>
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

            {/* Footer */}
            <div className="p-8 border-t border-white/5 text-center md:text-left">
              <p className="text-[10px] uppercase tracking-widest text-white/30">
                Lima, Perú • Proyectos Integrales
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
