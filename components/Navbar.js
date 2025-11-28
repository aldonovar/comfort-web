"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const mainSections = [
  { id: "inicio", key: "inicio", label: "Inicio", href: "/" },
  { id: "servicios", key: "servicios", label: "Servicios", href: "/servicios" },
  { id: "proyectos", key: "proyectos", label: "Proyectos", href: "/proyectos" },
  { id: "cotiza", key: "cotiza", label: "Cotiza", href: "/cotiza" },
  { id: "contacto", key: "contacto", label: "Contacto", href: "/contacto" },
];

const megaConfig = {
  servicios: {
    eyebrow: "Portafolio de servicios",
    title: "Diseño y ejecución de terrazas según el tipo de espacio.",
    text: "Desde terrazas en departamentos hasta azoteas completas y patios interiores. Cada categoría tiene una lógica de uso, materiales y nivel de inversión distinto.",
    links: [
      { label: "Terraza de departamento", href: "/servicios/terraza-de-departamento" },
      { label: "Azotea completa", href: "/servicios/azotea-completa" },
      { label: "Patio interior", href: "/servicios/patio-interior" },
      { label: "Terraza corporativa", href: "/servicios/terraza-corporativa" },
      { label: "Proyecto integral", href: "/servicios/proyecto-integral" },
    ],
    tag: "Cada subcategoría abre una página propia con el detalle del servicio.",
  },
  proyectos: {
    eyebrow: "Portafolio vivo",
    title: "Proyectos reales en Lima que explican qué podemos lograr contigo.",
    text: "Galería de terrazas, azoteas y patios con fotos, datos técnicos y contexto del cliente. Ideal para mostrar antes/después y nivel de detalle constructivo.",
    links: [
      { label: "Ver proyectos destacados", href: "/proyectos" },
      { label: "Terrazas residenciales", href: "/proyectos?tipo=residencial" },
      { label: "Proyectos corporativos", href: "/proyectos?tipo=corporativo" },
    ],
    tag: "Sección clave para generar confianza inmediata.",
  },
  cotiza: {
    eyebrow: "Formulario inteligente",
    title: "Cotiza tu terraza en 60 segundos, directo a WhatsApp.",
    text: "Un formulario guiado que arma un resumen claro de tu espacio, rango de inversión y objetivos. El estudio recibe toda la información lista para responder.",
    links: [
      { label: "Ir al formulario de cotización", href: "/cotiza" },
      { label: "Ver cómo usamos tu información", href: "/contacto#privacidad" },
    ],
    tag: "Menos fricción, más leads listos para avanzar.",
  },
  contacto: {
    eyebrow: "Contacto y canales",
    title: "Un solo lugar para centralizar WhatsApp, correo y redes.",
    text: "Ideal para clientes que ya están convencidos y solo necesitan hablar con el estudio. Todos los canales en un mismo lugar.",
    links: [
      { label: "Ver sección de contacto", href: "/contacto" },
      { label: "Escribir por WhatsApp", href: "https://wa.me/51936230958" },
    ],
    tag: "Pensado para cerrar la decisión de contacto.",
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);

    // Initial entrance animation
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Mobile Menu Animation
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, { x: "0%", duration: 0.6, ease: "power3.out" });
      gsap.fromTo(".mobile-link",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.2 }
      );
    } else {
      gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.6, ease: "power3.in" });
    }
  }, [mobileMenuOpen]);

  const handleMouseLeaveHeader = () => {
    setActiveMenu(null);
  };

  // --- Dynamic Styles based on Scroll ---
  const logoSrc = scrolled ? "/comfort-logo-dark.png" : "/comfort-logo-light.png";
  const textColor = scrolled ? "text-madera" : "text-crema";
  const headerBg = scrolled
    ? "bg-crema/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.05)] py-3"
    : "bg-gradient-to-b from-black/60 to-transparent py-6";

  // Mega Menu Background Logic
  const megaMenuBg = scrolled
    ? "bg-crema/95 backdrop-blur-xl text-madera border-t border-madera/5"
    : "bg-[#0a0a0a]/95 backdrop-blur-xl text-crema border-t border-white/10";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${headerBg}`}
        onMouseLeave={handleMouseLeaveHeader}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo (Image Based) */}
          <Link href="/" className="relative z-50 group flex items-center gap-3">
            <img
              src={logoSrc}
              alt="Comfort Studio"
              className="h-10 w-auto object-contain transition-all duration-500"
            />
            <div className={`flex flex-col leading-none transition-colors duration-500 ${textColor}`}>
              <span className="font-serif text-lg font-bold tracking-wide">Comfort Studio</span>
              <span className="text-[0.6rem] uppercase tracking-[0.3em] opacity-70">Outdoor Living</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {mainSections.map((item) => (
              <div
                key={item.id}
                className="relative py-4"
                onMouseEnter={() => setActiveMenu(item.key === "inicio" ? null : item.key)}
              >
                <Link
                  href={item.href}
                  className={`text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${activeMenu === item.key
                      ? "text-terracota"
                      : scrolled ? "text-madera/70 hover:text-madera" : "text-crema/80 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
                {activeMenu === item.key && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracota" />
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/cotiza"
              className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 group shadow-sm ${scrolled
                  ? "bg-madera text-crema hover:bg-terracota hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-white/10 border border-white/10 text-crema hover:bg-white/20"
                }`}
            >
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em]">Cotizar</span>
              <svg
                className={`w-3 h-3 transition-transform duration-300 group-hover:rotate-45 ${scrolled ? "text-crema" : "text-terracota"}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            >
              <span className={`w-6 h-[1px] transition-all duration-300 ${scrolled ? "bg-madera" : "bg-crema"} ${mobileMenuOpen ? "rotate-45 translate-y-2 !bg-crema" : ""}`} />
              <span className={`w-6 h-[1px] transition-all duration-300 ${scrolled ? "bg-madera" : "bg-crema"} ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-[1px] transition-all duration-300 ${scrolled ? "bg-madera" : "bg-crema"} ${mobileMenuOpen ? "-rotate-45 -translate-y-2 !bg-crema" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <div
          className={`absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeMenu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {activeMenu && megaConfig[activeMenu] && (
            <div className={`${megaMenuBg} shadow-2xl`}>
              <div className="max-w-[1600px] mx-auto px-12 py-12 grid grid-cols-[1fr_1.5fr_1fr] gap-16">
                {/* Column 1: Intro */}
                <div className="space-y-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-terracota font-bold">
                    {megaConfig[activeMenu].eyebrow}
                  </p>
                  <h3 className={`font-serif text-2xl leading-tight ${scrolled ? "text-madera" : "text-crema"}`}>
                    {megaConfig[activeMenu].title}
                  </h3>
                </div>

                {/* Column 2: Links */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {megaConfig[activeMenu].links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${scrolled ? "hover:bg-madera/5" : "hover:bg-white/5"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${scrolled ? "bg-madera/20 group-hover:bg-terracota" : "bg-white/20 group-hover:bg-terracota"
                        }`} />
                      <span className={`text-sm transition-colors ${scrolled ? "text-madera/70 group-hover:text-madera" : "text-crema/80 group-hover:text-white"
                        }`}>
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Column 3: Context */}
                <div className={`rounded-2xl p-6 border ${scrolled ? "bg-madera/5 border-madera/5" : "bg-white/5 border-white/5"
                  }`}>
                  <p className={`text-[0.65rem] uppercase tracking-[0.2em] mb-3 ${scrolled ? "text-madera/40" : "text-crema/40"
                    }`}>
                    Info
                  </p>
                  <p className={`text-sm leading-relaxed ${scrolled ? "text-madera/70" : "text-crema/70"
                    }`}>
                    {megaConfig[activeMenu].text}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#0a0a0a] translate-x-full md:hidden flex flex-col justify-center px-8"
      >
        <div className="space-y-8">
          {mainSections.map((item) => (
            <div key={item.id} className="overflow-hidden">
              <Link
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-link block font-serif text-4xl text-crema hover:text-terracota transition-colors"
              >
                {item.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-12 border-t border-white/10 space-y-6">
          <Link
            href="/cotiza"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-link w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-terracota text-white font-bold uppercase tracking-[0.2em]"
          >
            Cotizar Proyecto
          </Link>
          <div className="flex justify-center gap-6 text-crema/50">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-white transition-colors">Email</a>
          </div>
        </div>
      </div>
    </>
  );
}