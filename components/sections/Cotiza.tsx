"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "51936230958";

// --- DATA & ASSETS ---
const SERVICE_IMAGES: Record<string, string[]> = {
  "Terraza Residencial": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2574&auto=format&fit=crop"
  ],
  "Rooftop Corporativo": [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2301&auto=format&fit=crop"
  ],
  "Casa de Playa": [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-3ad196bb4a7f?q=80&w=2675&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=2670&auto=format&fit=crop"
  ],
  "Otro": [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2700&auto=format&fit=crop"
  ]
};

// --- CUSTOM COMPONENTS ---

const CustomSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Seleccionar..."
}: {
  label: string,
  value: string,
  onChange: (val: string) => void,
  options: string[],
  placeholder?: string
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="group relative" ref={containerRef}>
      <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-transparent border-b py-3 text-lg cursor-pointer flex justify-between items-center transition-colors
          ${isOpen ? 'border-terracota' : 'border-white/20 hover:border-white/40'}
        `}
      >
        <span className={value ? "text-white" : "text-white/30"}>
          {value || placeholder}
        </span>
        <span className={`text-xs text-white/40 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      {/* Dropdown Menu */}
      <div className={`
        absolute left-0 right-0 top-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl overflow-hidden z-50 shadow-2xl origin-top transition-all duration-300
        ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
      `}>
        {options.map((opt) => (
          <div
            key={opt}
            onClick={() => {
              onChange(opt);
              setIsOpen(false);
            }}
            className={`
              px-4 py-3 text-sm cursor-pointer transition-colors
              ${value === opt ? 'bg-terracota text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}
            `}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
};

const CustomInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}: {
  label: string,
  value: string,
  onChange: (val: string) => void,
  placeholder: string,
  type?: string
}) => (
  <div className="group">
    <label className="block text-[10px] uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-white/20 py-3 text-lg focus:outline-none focus:border-terracota transition-colors placeholder-white/10"
    />
  </div>
);

// --- MAIN COMPONENT ---

export default function Cotiza() {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);

  // Form State
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [budget, setBudget] = useState("");
  const [name, setName] = useState("");

  // Slideshow State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prefill
  useEffect(() => {
    if (!searchParams) return;
    const tipo = searchParams.get("tipo");
    if (tipo && !projectType) setProjectType(tipo);
  }, [searchParams]);

  // Slideshow Interval
  useEffect(() => {
    if (!projectType) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % (SERVICE_IMAGES[projectType]?.length || 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [projectType]);

  // Reset index on type change
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [projectType]);

  // Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".quote-content", {
        y: 30,
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
`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="cotiza"
      className="relative bg-[#0a0a0a] text-white py-20 border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-start">

          {/* Form Side */}
          <div className="quote-content">
            <div className="mb-10">
              <span className="block text-terracota text-[10px] tracking-[0.3em] uppercase font-bold mb-3">
                Concierge
              </span>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                Diseñemos tu <br />
                <span className="text-white/40 italic">próximo escenario.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">

              <CustomSelect
                label="Tipo de Proyecto"
                value={projectType}
                onChange={setProjectType}
                options={Object.keys(SERVICE_IMAGES)}
              />

              <div className="grid grid-cols-2 gap-6">
                <CustomInput
                  label="Área Aprox (m²)"
                  value={area}
                  onChange={setArea}
                  placeholder="00"
                  type="number"
                />
                <CustomInput
                  label="Distrito / Zona"
                  value={district}
                  onChange={setDistrict}
                  placeholder="Ej. Miraflores"
                />
              </div>

              <CustomSelect
                label="Rango de Inversión (Opcional)"
                value={budget}
                onChange={setBudget}
                options={["S/ 20k - 40k", "S/ 40k - 80k", "+ S/ 80k", "Prefiero no decir"]}
                placeholder="Seleccionar rango..."
              />

              <CustomInput
                label="Tu Nombre"
                value={name}
                onChange={setName}
                placeholder="Nombre completo"
              />

              <button
                type="submit"
                disabled={!isFormReady}
                className={`
                  group w-full py-5 rounded-full border transition-all duration-300 flex items-center justify-center gap-3 mt-4
                  ${isFormReady
                    ? 'bg-white text-black border-white hover:bg-terracota hover:border-terracota hover:text-white cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                    : 'bg-white/5 text-white/20 border-white/5 cursor-not-allowed'}
                `}
              >
                <span className="uppercase tracking-widest text-[10px] font-bold">Enviar Solicitud</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>

            </form>
          </div>

          {/* Ticket Preview Side */}
          <div className="hidden lg:block sticky top-32 quote-content delay-100">
            <div className="relative rounded-[2rem] bg-[#111] border border-white/10 overflow-hidden shadow-2xl min-h-[500px] flex flex-col">

              {/* Image Slideshow Background */}
              <div className="absolute inset-0 bg-[#0a0a0a]">
                {projectType && SERVICE_IMAGES[projectType]?.map((img, index) => (
                  <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-60' : 'opacity-0'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/50 to-transparent" />
                  </div>
                ))}

                {/* Default State Background */}
                {!projectType && (
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
                  </div>
                )}
              </div>

              {/* Ticket Content */}
              <div className="relative z-10 p-8 md:p-10 flex-grow flex flex-col justify-between h-full">

                {/* Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="block text-[9px] uppercase tracking-[0.3em] text-white/40 mb-2">Ticket #001</span>
                    <h3 className="font-serif text-2xl text-white">
                      {projectType || "Tu Proyecto"}
                    </h3>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 bg-terracota rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Details Grid */}
                <div className="space-y-6 backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-end border-b border-white/10 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Cliente</span>
                    <span className="text-sm font-medium text-white">{name || "—"}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Ubicación</span>
                    <span className="text-sm font-medium text-white">{district || "—"}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/10 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Dimensiones</span>
                    <span className="text-sm font-medium text-white">{area ? `${area} m²` : "—"}</span>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Inversión</span>
                    <span className="text-sm font-medium text-terracota">{budget || "—"}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="text-center pt-4">
                  <p className="text-[9px] uppercase tracking-widest text-white/30">
                    Respuesta estimada: 24h
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
