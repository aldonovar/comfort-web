"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const WHATSAPP_NUMBER = "51936230958";

// --- DATA ---
// --- DATA ---
const SERVICE_IMAGES: Record<string, string[]> = {
  "Techo sol y sombra": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2700&auto=format&fit=crop"
  ],
  "Diseño y ejecución de proyecto de terraza": [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop"
  ],
  "Proyecto Estación de parrilla": [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2670&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1556910602-38f53e68e15d?q=80&w=2574&auto=format&fit=crop"
  ],
  "Otro tipo de proyecto al aire libre": [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2700&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600596542815-3ad196bb4a7f?q=80&w=2675&auto=format&fit=crop"
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
    <div className={`group relative ${isOpen ? 'z-[60]' : 'z-20'}`} ref={containerRef}>
      <label className="block text-[9px] uppercase tracking-widest text-madera dark:text-crema mb-1 group-focus-within:text-terracota transition-colors font-bold pl-1">
        {label}
      </label>

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full bg-madera/5 dark:bg-crema/5 hover:bg-madera/10 dark:hover:bg-crema/10 rounded-lg px-3 py-2 text-xs md:text-sm cursor-pointer flex justify-between items-center transition-all duration-300 border border-madera/10 dark:border-crema/10 backdrop-blur-sm
          ${isOpen ? 'ring-1 ring-terracota border-terracota/50' : ''}
        `}
      >
        <span className={`truncate mr-2 ${value ? "text-madera dark:text-crema font-medium" : "text-madera/60 dark:text-crema/60"}`}>
          {displayValue || placeholder}
        </span>
        <span className={`text-[9px] text-madera/60 dark:text-crema/60 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      <div className={`
        absolute left-0 right-0 top-full mt-1 bg-white dark:bg-zinc-900 border border-madera/10 dark:border-crema/10 rounded-lg overflow-hidden shadow-xl origin-top transition-all duration-300 max-h-52 overflow-y-auto z-[70]
        ${isOpen ? 'opacity-100 scale-y-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-y-95 -translate-y-2 pointer-events-none'}
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
                px-3 py-2 text-xs md:text-sm cursor-pointer transition-colors border-b border-madera/5 dark:border-madera/5 last:border-0
                ${value === optValue
                  ? 'bg-terracota text-white'
                  : 'text-madera hover:bg-madera/5 dark:hover:bg-crema/5 hover:text-madera dark:text-crema dark:hover:text-crema'}
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
    <label className="block text-[9px] uppercase tracking-widest text-madera dark:text-crema mb-1 group-focus-within:text-terracota transition-colors font-bold pl-1">
      {label} {optional && <span className="text-madera/40 dark:text-crema/40 normal-case tracking-normal ml-1 font-normal">(Opcional)</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-madera/5 dark:bg-crema/5 hover:bg-madera/10 dark:hover:bg-crema/10 rounded-lg px-3 py-2 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-terracota focus:border-terracota/50 transition-all duration-300 placeholder-madera/40 dark:placeholder-crema/40 text-madera dark:text-crema font-medium border border-madera/10 dark:border-crema/10 backdrop-blur-sm"
    />
  </div>
);

export default function Cotiza({ isPage = false }: { isPage?: boolean }) {
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

    const message = `Hola Comfort Studio, mi nombre es *${name}*.
Me gustaría cotizar un proyecto de *${projectType}*.

📍 *Detalles del Espacio:*
• Ubicación: ${district}
• Área: ${area} m²
• Inversión Estimada: ${budget || "A definir"}

📝 *Notas Adicionales:*
${notes || "Sin detalles adicionales."}

-------------------------------------
🔒 *Información Interna para el Estudio:*
• ID: ${smartID}
• Empresa: ${company || "Particular"}
• Ticket: #${ticketNumber}`;
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
      <section className="relative bg-(--bg-primary) text-madera dark:text-crema min-h-[60vh] flex items-center justify-center border-t border-madera/5 dark:border-crema/5 transition-colors duration-500">
        <div className="text-center max-w-lg px-6 animate-in fade-in zoom-in-95 duration-700">
          <div className="w-20 h-20 rounded-full bg-terracota/10 flex items-center justify-center mx-auto mb-8">
            <svg className="w-10 h-10 text-terracota" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl mb-6">Solicitud Enviada</h2>
          <p className="text-madera/60 dark:text-crema/60 text-lg mb-10">
            Hemos recibido tu ticket correctamente. Se ha abierto WhatsApp para completar el proceso.
          </p>
          <button
            onClick={handleReset}
            className="group px-8 py-4 rounded-full border border-madera/20 dark:border-crema/20 hover:border-terracota hover:bg-terracota transition-all duration-300 flex items-center gap-3 mx-auto"
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
      className={`relative bg-(--bg-primary) text-(--text-primary) min-h-screen flex flex-col justify-center overflow-hidden transition-colors duration-500
        ${isPage ? 'pt-32 pb-12 lg:pt-32 lg:pb-0' : 'py-16 md:py-24'}
      `}
    >
      {/* Dynamic Background */}
      {/* Dynamic Background */}
      <div className="absolute inset-0 transition-opacity duration-1000">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop"
          alt="Background"
          fill
          className="object-cover opacity-50 dark:opacity-40 blur-lg scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-(--bg-primary)/80 via-(--bg-primary)/40 to-(--bg-primary)/80 mix-blend-overlay" />
        <div className="absolute inset-0 bg-(--bg-primary)/20" />
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Left: The Form (Glass Monolith) */}
          <div className="quote-content relative rounded-[2rem] shadow-2xl transition-colors duration-500 max-w-2xl mx-auto w-full">

            {/* Background Effects (Clipped) */}
            <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl" />
            </div>

            {/* Content (Not Clipped) */}
            <div className="relative z-10 p-5 md:p-8">
              <div className="mb-3 md:mb-6 flex justify-between items-end">
                <div>
                  <span className="block text-terracota text-[8px] md:text-[9px] tracking-[0.3em] uppercase font-bold mb-1 md:mb-2">
                    Concierge
                  </span>
                  <h2 className="font-serif text-xl md:text-3xl leading-tight text-madera dark:text-crema">
                    Diseñemos tu <br />
                    <span className="text-terracota italic">próximo escenario.</span>
                  </h2>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 md:space-y-5">
                {/* 01. Proyecto */}
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-[8px] md:text-[9px] uppercase tracking-widest text-madera/50 dark:text-crema/50 font-bold border-b border-madera/10 dark:border-crema/10 pb-1">
                    01. El Proyecto
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
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
                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-[8px] md:text-[9px] uppercase tracking-widest text-madera/50 dark:text-crema/50 font-bold border-b border-madera/10 dark:border-crema/10 pb-1">
                    02. Tus Datos
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
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
                    <label className="block text-[9px] uppercase tracking-widest text-madera dark:text-crema mb-1 group-focus-within:text-terracota transition-colors font-bold pl-1">
                      Notas
                    </label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Detalles adicionales..."
                      rows={1}
                      className="w-full bg-madera/5 dark:bg-crema/5 hover:bg-madera/10 dark:hover:bg-crema/10 rounded-lg p-2.5 text-xs md:text-sm focus:outline-none focus:ring-1 focus:ring-terracota transition-all duration-300 placeholder-madera/40 dark:placeholder-crema/40 resize-none text-madera dark:text-crema font-medium border border-madera/10 dark:border-crema/10 backdrop-blur-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!isFormReady || isSubmitting}
                  className={`
                    group w-full py-3 md:py-3.5 rounded-lg md:rounded-xl transition-all duration-500 flex items-center justify-center gap-3 mt-2
                    ${isFormReady && !isSubmitting
                      ? 'bg-terracota text-white shadow-lg shadow-terracota/20 hover:shadow-terracota/40 hover:scale-[1.01] cursor-pointer'
                      : 'bg-madera/5 dark:bg-crema/5 text-madera/20 dark:text-crema/20 cursor-not-allowed border border-madera/5 dark:border-crema/5'}
                  `}
                >
                  <span className="uppercase tracking-widest text-xs font-bold">
                    {isSubmitting ? "Procesando..." : "Solicitar Cotización"}
                  </span>
                  {!isSubmitting && <span className="transform group-hover:translate-x-1 transition-transform">→</span>}
                </button>
              </form>
            </div>
          </div>

          {/* Right: The Ticket (Sticky) */}
          <div className="hidden lg:block sticky top-24">
            <div className="relative w-full max-w-md mx-auto aspect-[3/4] rounded-[2rem] bg-white dark:bg-[#080808] border border-madera/10 dark:border-white/10 overflow-hidden shadow-2xl flex flex-col group transition-all duration-500 hover:shadow-[0_30px_60px_rgba(204,88,3,0.15)]">

              {/* Holographic Overlay */}
              <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none z-20 mix-blend-overlay" />

              {/* Image Area */}
              <div className="relative h-[55%] overflow-hidden bg-black">
                {projectType && SERVICE_IMAGES[projectType] ? (
                  <Image
                    src={SERVICE_IMAGES[projectType][currentImageIndex]}
                    alt="Preview"
                    fill
                    className="object-cover transition-transform duration-2000 ease-in-out scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-white dark:bg-zinc-900 flex items-center justify-center">
                    <span className="text-madera/20 dark:text-crema/20 text-xs uppercase tracking-widest">Vista Previa</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent opacity-60" />

                <div className="absolute bottom-6 left-6 z-30">
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-[#c16e4d] mb-1 font-bold">Ticket #{ticketNumber}</span>
                  <h3 className="font-serif text-3xl text-white leading-none">
                    {projectType || "Nuevo Proyecto"}
                  </h3>
                </div>
              </div>

              {/* Details Area */}
              <div className="flex-1 p-6 bg-white dark:bg-[#080808] relative z-10 flex flex-col justify-between border-t border-madera/5 dark:border-white/5 transition-colors duration-500">
                <div className="grid grid-cols-2 gap-y-4 gap-x-3">
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-madera/40 dark:text-crema/40 mb-0.5 font-medium">Cliente</span>
                    <p className="text-xs text-madera dark:text-crema font-medium truncate">{name || "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-madera/40 dark:text-crema/40 mb-0.5 font-medium">Ubicación</span>
                    <p className="text-xs text-madera dark:text-crema font-medium truncate">{district || "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-madera/40 dark:text-crema/40 mb-0.5 font-medium">Dimensión</span>
                    <p className="text-xs text-madera dark:text-crema font-medium">{area ? `${area} m²` : "—"}</p>
                  </div>
                  <div>
                    <span className="block text-[9px] uppercase tracking-widest text-madera/40 dark:text-crema/40 mb-0.5 font-medium">Inversión</span>
                    <p className="text-xs text-madera dark:text-crema font-medium truncate">{budgetCode !== "XX" ? budgetCode : "—"}</p>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-end border-t border-madera/5 dark:border-crema/5 mt-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-widest text-madera/40 dark:text-crema/40 font-medium">ID de Atención</p>
                    <p className="font-mono text-[10px] text-madera/30 dark:text-crema/30 mt-0.5 tracking-widest">
                      {smartID}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="w-6 h-6 rounded-full border border-madera/10 dark:border-crema/10 flex items-center justify-center ml-auto">
                      <div className="w-1 h-1 bg-[#c16e4d] rounded-full animate-pulse" />
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
