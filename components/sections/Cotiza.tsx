"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "51936230958";

export default function Cotiza() {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);

  // Form State
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  // Prefill
  useEffect(() => {
    if (!searchParams) return;
    const tipo = searchParams.get("tipo");
    if (tipo && !projectType) setProjectType(tipo);
  }, [searchParams]);

  // Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".quote-header-reveal", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Live Summary Logic
  const isFormReady = useMemo(() => {
    return projectType && area && district && name;
  }, [projectType, area, district, name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Comfort Studio, soy ${name}.
    
Quisiera cotizar un proyecto:
• Tipo: ${projectType}
• Área: ${area} m²
• Zona: ${district}
• Presupuesto: ${budget || "Por definir"}

Notas: ${notes || "Ninguna"}
`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="cotiza"
      className="relative bg-[#0a0a0a] text-white py-24 md:py-32 border-t border-white/5"
    >
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-[1.2fr_1fr] gap-16 lg:gap-32 items-start">

          {/* Form (Left) */}
          <div className="quote-header-reveal">
            <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-4">
              Concierge
            </span>
            <h2 className="font-serif text-4xl md:text-5xl leading-[1.1] mb-12">
              Inicia la <br />
              <span className="text-white/40 italic">conversación.</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-12">

              {/* Group 1: Basics */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
                    Tipo de Proyecto
                  </label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl focus:outline-none focus:border-terracota transition-colors cursor-pointer appearance-none rounded-none"
                  >
                    <option value="" className="bg-black text-white/50">Seleccionar...</option>
                    <option value="Terraza Residencial" className="bg-black">Terraza Residencial</option>
                    <option value="Rooftop Corporativo" className="bg-black">Rooftop Corporativo</option>
                    <option value="Casa de Playa" className="bg-black">Casa de Playa</option>
                    <option value="Otro" className="bg-black">Otro</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
                      Área Aprox (m²)
                    </label>
                    <input
                      type="number"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      placeholder="00"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl focus:outline-none focus:border-terracota transition-colors placeholder-white/10"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
                      Distrito / Zona
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      placeholder="Ej. Miraflores"
                      className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl focus:outline-none focus:border-terracota transition-colors placeholder-white/10"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Details */}
              <div className="space-y-8">
                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
                    Rango de Inversión (Opcional)
                  </label>
                  <select
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl focus:outline-none focus:border-terracota transition-colors cursor-pointer appearance-none rounded-none"
                  >
                    <option value="" className="bg-black text-white/50">Prefiero no decir</option>
                    <option value="S/ 20k - 40k" className="bg-black">S/ 20k - 40k</option>
                    <option value="S/ 40k - 80k" className="bg-black">S/ 40k - 80k</option>
                    <option value="+ S/ 80k" className="bg-black">+ S/ 80k</option>
                  </select>
                </div>

                <div className="group">
                  <label className="block text-xs uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
                    Tu Nombre
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nombre completo"
                    className="w-full bg-transparent border-b border-white/20 py-4 text-xl md:text-2xl focus:outline-none focus:border-terracota transition-colors placeholder-white/10"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormReady}
                className={`
                  group w-full py-6 rounded-full border transition-all duration-300 flex items-center justify-center gap-4
                  ${isFormReady
                    ? 'bg-white text-black border-white hover:bg-terracota hover:border-terracota hover:text-white cursor-pointer'
                    : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed'}
                `}
              >
                <span className="uppercase tracking-widest text-xs font-bold">Enviar Solicitud</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>

            </form>
          </div>

          {/* Ticket Preview (Right) */}
          <div className="hidden lg:block sticky top-32">
            <div className="relative rounded-3xl bg-[#151515] border border-white/10 p-8 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-[#0a0a0a] rounded-b-xl border-b border-x border-white/10" />
              <div className="absolute -left-3 top-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full" />
              <div className="absolute -right-3 top-1/2 w-6 h-6 bg-[#0a0a0a] rounded-full" />
              <div className="absolute top-1/2 left-0 right-0 border-t-2 border-dashed border-white/5" />

              <div className="relative z-10 space-y-8">
                <div className="text-center pb-8">
                  <span className="block text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">Ticket de Servicio</span>
                  <h3 className="font-serif text-2xl text-white">Resumen de Solicitud</h3>
                </div>

                <div className="space-y-6 pt-4">
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-xs uppercase tracking-wider text-white/40">Cliente</span>
                    <span className="text-lg font-serif text-terracota">{name || "..."}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-xs uppercase tracking-wider text-white/40">Proyecto</span>
                    <span className="text-base text-white/80">{projectType || "..."}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-xs uppercase tracking-wider text-white/40">Ubicación</span>
                    <span className="text-base text-white/80">{district || "..."}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-2">
                    <span className="text-xs uppercase tracking-wider text-white/40">Área</span>
                    <span className="text-base text-white/80">{area ? `${area} m²` : "..."}</span>
                  </div>
                </div>

                <div className="pt-8 text-center">
                  <p className="text-[10px] uppercase tracking-widest text-white/30">
                    Tiempo de respuesta estimado
                  </p>
                  <p className="text-sm text-white/60 mt-1">
                    24 Horas Hábiles
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
