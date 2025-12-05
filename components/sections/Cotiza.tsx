"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "51936230958";

// --- DATA ---
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
  { label: "Menos de $5,000", code: "5K-" },
  { label: "$5,000 - $10,000", code: "5K" },
  { label: "$10,000 - $20,000", code: "10K" },
  { label: "Más de $20,000", code: "20K+" },
  { label: "Cotizar durante el contacto", code: "CTC" }
];

// --- UTILS ---
const generateSmartID = (
  type: string,
  area: string,
  district: string,
  budgetCode: string,
  name: string,
  company: string,
  ticketNum: number
) => {
  const typeCode = type ? type.substring(0, 2).toUpperCase() : "XX";
  const areaCode = area ? area : "00";
  const distCode = district ? district.substring(0, 2).toUpperCase() : "XX";
  const budCode = budgetCode || "XX";
  const nameCode = name ? name.substring(0, 2).toUpperCase() : "XX";
  const compCode = company ? company.substring(0, 3).toUpperCase() : "000";
  return `${ticketNum}${typeCode}${areaCode}${distCode}${budCode}${nameCode}${compCode}`.replace(/\s/g, '');
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
  options: { label: string, value: string }[] | string[],
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

  const displayValue = Array.isArray(options) && typeof options[0] === 'object'
    ? (options as { label: string, value: string }[]).find(o => o.value === value)?.label
    : value;

  return (
    <div className="group relative z-50" ref={containerRef}>
      <label className="block text-[10px] uppercase tracking-widest text-white/60 mb-2 group-focus-within:text-terracota transition-colors font-medium pl-1">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 text-sm md:text-base cursor-pointer flex justify-between items-center transition-all duration-300 border border-white/10 backdrop-blur-sm
          ${isOpen ? 'ring-1 ring-terracota border-terracota/50' : ''}
        `}
      >
        <span className={`truncate mr-2 ${value ? "text-white" : "text-white/40"}`}>
          {displayValue || placeholder}
        </span>
        <span className={`text-[10px] text-white/40 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      <div className={`
        absolute left-0 right-0 top-full mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden z-[100] shadow-[0_10px_40px_rgba(0,0,0,0.5)] origin-top transition-all duration-300 max-h-60 overflow-y-auto ring-1 ring-white/5
        ${isOpen ? 'opacity-100 scale-y-100 translate-y-0' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
      `}>
        {options.map((opt) => {
          const optValue = typeof opt === 'string' ? opt : opt.value;
          const optLabel = typeof opt === 'string' ? opt : opt.label;
          return (
            <div
              key={optValue}
              onClick={() => {
                onChange(optValue);
                setIsOpen(false);
              }}
              className={`
                px-4 py-3 text-sm cursor-pointer transition-colors border-b border-white/5 last:border-0
                ${value === optValue ? 'bg-terracota text-white' : 'text-white/70 hover:bg-white/5 hover:text-white'}
              `}
            >
              {optLabel}
            </div>
          );
        })}
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
    <label className="block text-[10px] uppercase tracking-widest text-white/60 mb-2 group-focus-within:text-terracota transition-colors font-medium pl-1">
      {label} {optional && <span className="text-white/30 normal-case tracking-normal ml-1">(Opcional)</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/5 hover:bg-white/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-terracota focus:border-terracota/50 transition-all duration-300 placeholder-white/20 text-white border border-white/10 backdrop-blur-sm"
    />
  </div>
);

export default function Cotiza() {
  const searchParams = useSearchParams();
  const sectionRef = useRef<HTMLElement>(null);

  // Form State
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetCode, setBudgetCode] = useState("");

  // Contact Info
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  // System State
  const [ticketNumber, setTicketNumber] = useState(101);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load Ticket Number
  useEffect(() => {
    const stored = localStorage.getItem("comfort_ticket_counter");
    if (stored) {
      setTicketNumber(parseInt(stored));
    }
  }, []);

  // Prefill
  useEffect(() => {
    if (!searchParams) return;
    const tipo = searchParams.get("tipo");
    if (tipo && !projectType) setProjectType(tipo);
  }, [searchParams]);

  // Slideshow
  useEffect(() => {
    if (!projectType) return;
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % (SERVICE_IMAGES[projectType]?.length || 1));
    }, 5000);
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

  // Smart ID Calculation
  const smartID = useMemo(() => {
    return generateSmartID(projectType, area, district, budgetCode, name, company, ticketNumber);
  }, [projectType, area, district, budgetCode, name, company, ticketNumber]);

  const isFormReady = useMemo(() => {
    return projectType && area && district && name && (phone || email);
  }, [projectType, area, district, name, phone, email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formData = {
      ticketNumber,
      smartID,
      projectType,
      area,
      district,
      budget,
      name,
      phone,
      email,
      company,
      notes,
      timestamp: new Date().toISOString()
    };

    const message = `*NUEVA SOLICITUD - TICKET #${ticketNumber}*
              ID: ${smartID}

              *PROYECTO*
              • Tipo: ${projectType}
              • Área: ${area} m²
              • Zona: ${district}
              • Inversión: ${budget || "No especificado"}

              *CLIENTE*
              • Nombre: ${name}
              • Empresa: ${company || "N/A"}
              • Contacto: ${phone} / ${email}

              *NOTAS*
              ${notes || "Sin notas adicionales"}
              `;
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const nextTicket = ticketNumber + 1;
      setTicketNumber(nextTicket);
      localStorage.setItem("comfort_ticket_counter", nextTicket.toString());

      window.open(waUrl, "_blank");
      setIsSuccess(true);

    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un error al procesar la solicitud. Por favor intenta nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setProjectType("");
    setArea("");
    setDistrict("");
    setBudget("");
    setBudgetCode("");
    setName("");
    setPhone("");
    setEmail("");
    setCompany("");
    setNotes("");
  };

  if (isSuccess) {
    return (
      <section className="relative bg-black text-white min-h-[80vh] flex items-center justify-center border-t border-white/5">
        <div className="text-center max-w-lg px-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-20 h-20 rounded-full bg-terracota/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Solicitud Enviada</h2>
          <p className="text-white/60 text-lg mb-10">
            Hemos recibido tu ticket correctamente. Se ha abierto WhatsApp para completar el proceso.
          </p>
          <button
            onClick={handleReset}
            className="group px-8 py-4 rounded-full border border-white/20 hover:border-terracota hover:bg-terracota transition-all duration-300 flex items-center gap-3 mx-auto"
          >
            <span className="uppercase tracking-widest text-xs font-bold">Enviar otra solicitud</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="cotiza"
      className="relative bg-black text-white min-h-screen flex items-center py-24 overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        {projectType && SERVICE_IMAGES[projectType] ? (
          <Image
            src={SERVICE_IMAGES[projectType][currentImageIndex]}
            alt="Background"
            fill
            className="object-cover opacity-30 blur-sm scale-105 transition-transform duration-[10s]"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-24 items-start">

          {/* Left: The Form (Glass Monolith) */}
          <div className="quote-content bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-terracota/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

            <div className="mb-10">
              <span className="block text-terracota text-[10px] tracking-[0.4em] uppercase font-bold mb-4">
                Concierge
              </span>
              <h2 className="font-serif text-4xl md:text-5xl leading-tight text-white">
                Diseñemos tu <br />
                <span className="text-terracota italic">próximo escenario.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* 01. Proyecto */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-bold border-b border-white/10 pb-2">
                  01. El Proyecto
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <CustomSelect
                      label="Tipo de Espacio"
                      value={projectType}
                      onChange={setProjectType}
                      options={Object.keys(SERVICE_IMAGES)}
                    />
                  </div>
                  <CustomInput
                    label="Área (m²)"
                    value={area}
                    onChange={setArea}
                    placeholder="00"
                    type="number"
                  />
                  <CustomInput
                    label="Distrito"
                    value={district}
                    onChange={setDistrict}
                    placeholder="Ej. Miraflores"
                  />
                  <div className="md:col-span-2">
                    <CustomSelect
                      label="Rango de Inversión (USD)"
                      value={budget}
                      onChange={(val) => {
                        setBudget(val);
                        const code = BUDGET_RANGES.find(b => b.label === val)?.code || "XX";
                        setBudgetCode(code);
                      }}
                      options={BUDGET_RANGES.map(b => ({ label: b.label, value: b.label }))}
                    />
                  </div>
                </div>
              </div>

              {/* 02. Datos */}
              <div className="space-y-6">
                <h3 className="text-[10px] uppercase tracking-widest text-white/40 font-bold border-b border-white/10 pb-2">
                  02. Tus Datos
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <CustomInput
                    label="Nombre"
                    value={name}
                    onChange={setName}
                    placeholder="Tu nombre"
                  />
                  <CustomInput
                    label="Empresa"
                    value={company}
                    onChange={setCompany}
                    placeholder="Nombre empresa"
                    optional
                  />
                  <CustomInput
                    label="Teléfono"
                    value={phone}
                    onChange={setPhone}
                    placeholder="+51..."
                    type="tel"
                  />
                  <CustomInput
                    label="Email"
                    value={email}
                    onChange={setEmail}
                    placeholder="correo@..."
                    type="email"
                  />
                </div>
                <div className="group">
                  <label className="block text-[10px] uppercase tracking-widest text-white/60 mb-2 group-focus-within:text-terracota transition-colors font-medium pl-1">
                    Notas
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Detalles adicionales..."
                    rows={2}
                    className="w-full bg-white/5 hover:bg-white/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-terracota transition-all duration-300 placeholder-white/20 resize-none text-white border border-white/10 backdrop-blur-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isFormReady || isSubmitting}
                className={`
                  group w-full py-5 rounded-xl transition-all duration-500 flex items-center justify-center gap-3 mt-4
                  ${isFormReady && !isSubmitting
                    ? 'bg-terracota text-white shadow-lg shadow-terracota/20 hover:shadow-terracota/40 hover:scale-[1.01] cursor-pointer'
                    : 'bg-white/5 text-white/20 cursor-not-allowed border border-white/5'}
                `}
              >
                <span className="uppercase tracking-widest text-xs font-bold">
                  {isSubmitting ? "Procesando..." : "Generar Ticket y Enviar"}
                </span>
                {!isSubmitting && <span className="transform group-hover:translate-x-1 transition-transform">→</span>}
              </button>
            </form>
          </div>

          {/* Right: The Ticket (Sticky) */}
          <div className="hidden lg:block sticky top-32">
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-[2.5rem] bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl flex flex-col group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(204,88,3,0.15)]">

              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20 mix-blend-overlay" />

              {/* Image Area */}
              <div className="relative h-[60%] overflow-hidden bg-black">
                {projectType && SERVICE_IMAGES[projectType] ? (
                  <Image
                    src={SERVICE_IMAGES[projectType][currentImageIndex]}
                    alt="Preview"
                    fill
                    className="object-cover transition-transform duration-[2000ms] ease-in-out scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                    <span className="text-white/20 text-xs uppercase tracking-widest">Vista Previa</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-8 left-8 z-30">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-terracota mb-2 font-bold">Ticket #{ticketNumber}</span>
                  <h3 className="font-serif text-4xl text-white leading-none">
                    {projectType || "Nuevo Proyecto"}
                  </h3>
                </div>
              </div>

              {/* Details Area */}
              <div className="flex-1 p-8 bg-zinc-900 relative z-10 flex flex-col justify-between border-t border-white/5">
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-white/40 mb-1 font-medium">Cliente</span>
                    <p className="text-sm text-white font-medium truncate">{name || "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-white/40 mb-1 font-medium">Ubicación</span>
                    <p className="text-sm text-white font-medium truncate">{district || "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-white/40 mb-1 font-medium">Dimensión</span>
                    <p className="text-sm text-white font-medium">{area ? `${area} m²` : "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-white/40 mb-1 font-medium">Inversión</span>
                    <p className="text-sm text-white font-medium truncate">{budgetCode !== "XX" ? budgetCode : "—"}</p>
                  </div>
                </div>

                <div className="pt-6 flex justify-between items-end border-t border-white/5 mt-6">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-white/40 font-medium">ID de Atención</p>
                    <p className="font-mono text-[10px] text-white/30 mt-1 tracking-widest">
                      {smartID}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center ml-auto">
                      <div className="w-1.5 h-1.5 bg-terracota rounded-full animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
