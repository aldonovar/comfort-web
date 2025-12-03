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

const BUDGET_RANGES = [
  "S/ 20k - 40k  ($5k - 10k)",
  "S/ 40k - 80k  ($10k - 20k)",
  "+ S/ 80k  (+$20k)",
  "Prefiero no decir"
];

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
      <label className="block text-[9px] uppercase tracking-widest text-white/40 mb-1 group-focus-within:text-terracota transition-colors">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-transparent border-b py-2 text-base cursor-pointer flex justify-between items-center transition-colors
          ${isOpen ? 'border-terracota' : 'border-white/20 hover:border-white/40'}
        `}
      >
        <span className={value ? "text-white" : "text-white/30"}>
          {value || placeholder}
        </span>
        <span className={`text-[10px] text-white/40 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      <div className={`
        absolute left-0 right-0 top-full mt-2 bg-[#1a1a1a] border border-white/10 rounded-lg overflow-hidden z-50 shadow-2xl origin-top transition-all duration-300 max-h-60 overflow-y-auto
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
              px-4 py-2.5 text-sm cursor-pointer transition-colors border-b border-white/5 last:border-0
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
  type = "text",
  optional = false
}: {
  label: string,
  value: string,
  onChange: (val: string) => void,
  placeholder: string,
  type?: string,
  optional?: boolean
}) => (
  <div className="group">
    <label className="block text-[9px] uppercase tracking-widest text-white/40 mb-1 group-focus-within:text-terracota transition-colors">
      {label} {optional && <span className="text-white/20">(Opcional)</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-transparent border-b border-white/20 py-2 text-base focus:outline-none focus:border-terracota transition-colors placeholder-white/10"
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

  // Contact Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

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
    }, 4000); // Slower transition
    return () => clearInterval(interval);
  }, [projectType]);

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
    return projectType && area && district && name && (phone || email);
  }, [projectType, area, district, name, phone, email]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hola Comfort Studio, soy ${name}.
    
Quisiera cotizar un proyecto:
• Tipo: ${projectType}
• Área: ${area} m²
• Zona: ${district}
• Presupuesto: ${budget || "Por definir"}

Contacto:
• Tel: ${phone}
• Email: ${email}
• Empresa: ${company || "N/A"}

Notas: ${notes || "Ninguna"}
`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      ref={sectionRef}
      id="cotiza"
      className="relative bg-[#0a0a0a] text-white py-24 border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-24 items-start">

          {/* Form Side - Compact & Professional */}
          <div className="quote-content">
            <div className="mb-8">
              <span className="block text-terracota text-[9px] tracking-[0.3em] uppercase font-bold mb-3">
                Concierge
              </span>
              <h2 className="font-serif text-3xl md:text-4xl leading-tight">
                Diseñemos tu <br />
                <span className="text-white/40 italic">próximo escenario.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-lg">

              {/* Project Details */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">
                  01. El Proyecto
                </h3>

                <CustomSelect
                  label="Tipo de Espacio"
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
                  label="Rango de Inversión (Estimado)"
                  value={budget}
                  onChange={setBudget}
                  options={BUDGET_RANGES}
                  placeholder="Seleccionar rango..."
                />
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest text-white/30 border-b border-white/5 pb-2">
                  02. Tus Datos
                </h3>

                <CustomInput
                  label="Nombre Completo"
                  value={name}
                  onChange={setName}
                  placeholder="Tu nombre"
                />

                <div className="grid grid-cols-2 gap-6">
                  <CustomInput
                    label="Teléfono / WhatsApp"
                    value={phone}
                    onChange={setPhone}
                    placeholder="+51 999..."
                    type="tel"
                  />
                  <CustomInput
                    label="Correo Electrónico"
                    value={email}
                    onChange={setEmail}
                    placeholder="nombre@empresa.com"
                    type="email"
                  />
                </div>

                <CustomInput
                  label="Empresa"
                  value={company}
                  onChange={setCompany}
                  placeholder="Nombre de la empresa"
                  optional
                />

                <div className="group">
                  <label className="block text-[9px] uppercase tracking-widest text-white/40 mb-2 group-focus-within:text-terracota transition-colors">
                    Detalles Adicionales
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Cuéntanos más sobre tu visión..."
                    rows={3}
                    className="w-full bg-white/5 rounded-lg border border-white/10 p-3 text-sm focus:outline-none focus:border-terracota transition-colors placeholder-white/10 resize-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormReady}
                className={`
                  group w-full py-4 rounded-lg border transition-all duration-300 flex items-center justify-center gap-3 mt-6
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

          {/* Ticket Preview Side - Redesigned & Compact */}
          <div className="hidden lg:block sticky top-32 quote-content delay-100">
            <div className="relative rounded-2xl bg-[#111] border border-white/10 overflow-hidden shadow-2xl w-full max-w-md mx-auto">

              {/* Image Header (Compact) */}
              <div className="relative h-48 overflow-hidden">
                {projectType && SERVICE_IMAGES[projectType]?.map((img, index) => (
                  <div
                    key={img}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent opacity-90" />
                  </div>
                ))}

                {!projectType && (
                  <div className="absolute inset-0 bg-[#151515]">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent" />
                  </div>
                )}

                <div className="absolute bottom-4 left-6 z-10">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-white/60 mb-1">Ticket #001</span>
                  <h3 className="font-serif text-xl text-white">
                    {projectType || "Nuevo Proyecto"}
                  </h3>
                </div>
              </div>

              {/* Ticket Body */}
              <div className="p-6 space-y-6 bg-[#111]">

                {/* Client Info */}
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{name || "Cliente"}</p>
                    <p className="text-xs text-white/40">{company || "Particular"}</p>
                  </div>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <span className="block text-[9px] uppercase tracking-wider text-white/40 mb-1">Ubicación</span>
                    <span className="text-sm text-white/90">{district || "—"}</span>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <span className="block text-[9px] uppercase tracking-wider text-white/40 mb-1">Área</span>
                    <span className="text-sm text-white/90">{area ? `${area} m²` : "—"}</span>
                  </div>
                  <div className="col-span-2 bg-white/5 rounded-lg p-3 border border-terracota/20">
                    <span className="block text-[9px] uppercase tracking-wider text-terracota/80 mb-1">Inversión Estimada</span>
                    <span className="text-sm text-terracota font-medium">{budget || "—"}</span>
                  </div>
                </div>

                {/* Status Footer */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider text-white/40">Sistema Online</span>
                  </div>
                  <span className="text-[10px] text-white/30">ID: {Math.random().toString(36).substr(2, 6).toUpperCase()}</span>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
