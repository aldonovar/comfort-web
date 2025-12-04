"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
  // Format: 101TR60JM5KALCOM

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
    <div className="group relative" ref={containerRef}>
      <label className="block text-[10px] uppercase tracking-widest text-primary/70 mb-2 group-focus-within:text-terracota transition-colors font-medium pl-1">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-primary/5 hover:bg-primary/10 rounded-xl px-4 py-3 text-sm md:text-base cursor-pointer flex justify-between items-center transition-all duration-300 border border-transparent
          ${isOpen ? 'ring-1 ring-terracota bg-primary/10' : 'hover:border-primary/10'}
        `}
      >
        <span className={`truncate mr-2 ${value ? "text-primary" : "text-primary/40"}`}>
          {displayValue || placeholder}
        </span>
        <span className={`text-[10px] text-primary/40 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      <div className={`
        absolute left-0 right-0 top-full mt-2 bg-secondary border border-primary/10 rounded-xl overflow-hidden z-50 shadow-[0_10px_40px_rgba(0,0,0,0.2)] origin-top transition-all duration-300 max-h-60 overflow-y-auto ring-1 ring-white/5
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
                px-4 py-3 text-sm cursor-pointer transition-colors border-b border-primary/5 last:border-0
                ${value === optValue ? 'bg-terracota text-white' : 'text-primary/70 hover:bg-primary/5 hover:text-primary'}
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
    <label className="block text-[10px] uppercase tracking-widest text-primary/70 mb-2 group-focus-within:text-terracota transition-colors font-medium pl-1">
      {label} {optional && <span className="text-primary/40 normal-case tracking-normal ml-1">(Opcional)</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-primary/5 hover:bg-primary/10 rounded-xl px-4 py-3 text-sm md:text-base focus:outline-none focus:ring-1 focus:ring-terracota focus:bg-primary/10 transition-all duration-300 placeholder-primary/30 text-primary border border-transparent hover:border-primary/10"
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
    }, 5000); // Slower, more cinematic
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

    // 1. Prepare Data
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

    // 2. WhatsApp Logic
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
      // 3. API Call (Simulate Email/Sheet)
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // 4. Update Counter
      const nextTicket = ticketNumber + 1;
      setTicketNumber(nextTicket);
      localStorage.setItem("comfort_ticket_counter", nextTicket.toString());

      // 5. Open WhatsApp
      window.open(waUrl, "_blank");

      // 6. Show Success State
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
      <section className="relative bg-primary text-primary min-h-[80vh] flex items-center justify-center border-t border-primary/5 transition-colors duration-500">
        <div className="text-center max-w-lg px-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-20 h-20 rounded-full bg-terracota/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Solicitud Enviada</h2>
          <p className="text-primary/60 text-lg mb-10 transition-colors duration-500">
            Hemos recibido tu ticket correctamente. Se ha abierto WhatsApp para completar el proceso.
          </p>
          <button
            onClick={handleReset}
            className="group px-8 py-4 rounded-full border border-primary/20 hover:border-terracota hover:bg-terracota transition-all duration-300 flex items-center gap-3 mx-auto"
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
      className="relative bg-primary text-primary min-h-screen flex items-center py-4 transition-colors duration-500 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-terracota/5 rounded-full blur-[120px] mix-blend-screen animate-pulse duration-3000" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full relative z-10">

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">

          {/* Form Side */}
          <div className="quote-content">
            <div className="mb-6 quote-item">
              <span className="block text-terracota text-[9px] tracking-[0.3em] uppercase font-bold mb-2">
                Concierge
              </span>
              <h2 className="font-serif text-4xl md:text-6xl leading-tight">
                Diseñemos tu <br />
                <span className="text-primary/40 italic transition-colors duration-500">próximo escenario.</span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

              {/* 01. Proyecto */}
              <div className="space-y-3 quote-item">
                <h3 className="text-[10px] uppercase tracking-widest text-primary/40 font-bold transition-colors duration-500 mb-2">
                  01. El Proyecto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <div className="space-y-3 quote-item">
                <h3 className="text-[10px] uppercase tracking-widest text-primary/40 font-bold transition-colors duration-500 mb-2">
                  02. Tus Datos
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  <label className="block text-[10px] uppercase tracking-widest text-primary/70 mb-1 group-focus-within:text-terracota transition-colors font-medium pl-1">
                    Notas
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Detalles adicionales..."
                    rows={2}
                    className="w-full bg-primary/5 hover:bg-primary/10 rounded-xl p-4 text-sm focus:outline-none focus:ring-1 focus:ring-terracota transition-all duration-300 placeholder-primary/30 resize-none text-primary"
                  />
                </div>
              </div>

              <div className="quote-item pt-2">
                <button
                  type="submit"
                  disabled={!isFormReady || isSubmitting}
                  className={`
                    group w-full py-4 rounded-xl transition-all duration-500 flex items-center justify-center gap-3
                    ${isFormReady && !isSubmitting
                      ? 'bg-terracota text-white shadow-lg shadow-terracota/20 hover:shadow-terracota/40 hover:scale-[1.02] cursor-pointer'
                      : 'bg-primary/5 text-primary/20 cursor-not-allowed'}
                  `}
                >
                  <span className="uppercase tracking-widest text-[10px] font-bold">
                    {isSubmitting ? "Procesando..." : "Generar Ticket y Enviar"}
                  </span>
                  {!isSubmitting && <span className="transform group-hover:translate-x-1 transition-transform">→</span>}
                </button>
              </div>

            </form>
          </div>

          {/* Ticket Preview Side - Ultra Premium */}
          <div className="flex justify-center items-center quote-content delay-100 h-full mt-8 lg:mt-0 perspective-1000">
            <div
              className="relative w-full max-w-sm aspect-3/4 rounded-[2rem] bg-white/5 backdrop-blur-2xl overflow-hidden shadow-2xl flex flex-col group transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-2"
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* Holographic/Glass Effect Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none z-20 transition-colors duration-500 mix-blend-overlay" />

              {/* Image Area - Cinematic Transition */}
              <div className="relative h-[55%] overflow-hidden bg-black">
                {projectType && SERVICE_IMAGES[projectType]?.map((img, index) => (
                  <div
                    key={img}
                    className={`
                      absolute inset-0 transition-all duration-2000 ease-in-out
                      ${index === currentImageIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}
                    `}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                    {/* Dark Overlay for Text Legibility */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-colors duration-500" />
                  </div>
                ))}

                {!projectType && (
                  <div className="absolute inset-0 bg-secondary transition-colors duration-500">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/5 to-transparent transition-colors duration-500" />
                  </div>
                )}

                <div className="absolute top-6 left-6 z-30">
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-terracota rounded-full animate-pulse" />
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 z-30 drop-shadow-md">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-white/80 mb-1">Ticket #{ticketNumber}</span>
                  <h3 className="font-serif text-3xl text-white leading-none">
                    {projectType || "Nuevo Proyecto"}
                  </h3>
                </div>
              </div>

              {/* Ticket Details */}
              <div className="flex-1 p-8 bg-white/5 backdrop-blur-xl relative z-10 flex flex-col justify-between transition-colors duration-500">

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-primary/40 mb-1 font-medium">Cliente</span>
                    <p className="text-sm text-primary font-medium truncate">{name || "—"}</p>
                    <p className="text-[10px] text-primary/40 truncate">{company || "Particular"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-primary/40 mb-1 font-medium">Ubicación</span>
                    <p className="text-sm text-primary font-medium truncate">{district || "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-primary/40 mb-1 font-medium">Dimensión</span>
                    <p className="text-sm text-primary font-medium">{area ? `${area} m²` : "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-primary/40 mb-1 font-medium">Inversión</span>
                    <p className="text-sm text-primary font-medium truncate">{budgetCode !== "XX" ? budgetCode : "—"}</p>
                  </div>
                </div>

                {/* Footer with Stealth ID */}
                <div className="pt-6 flex justify-between items-end">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-primary/40 font-medium">ID de Atención</p>
                    <p className="font-mono text-[10px] text-primary/30 mt-1 tracking-widest select-all hover:text-terracota transition-colors cursor-help" title="Código interno de seguimiento">
                      {smartID}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] uppercase tracking-widest text-primary/40 font-medium">Fecha</p>
                    <p className="text-[10px] text-primary/40 mt-1">{new Date().toLocaleDateString()}</p>
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
