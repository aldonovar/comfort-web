"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import ThemeToggle from "../ui/ThemeToggle";

const NAV_ITEMS = [
  { id: "servicios", label: "Servicios", href: "/servicios" },
  { id: "proyectos", label: "Proyectos", href: "/proyectos" },
  { id: "estudio", label: "Estudio", href: "/estudio" },
  { id: "contacto", label: "Contacto", href: "/contacto" },
];

const MEGA_CONTENT: any = {
  servicios: {
    defaultImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
    items: [
      {
        label: "Techo sol y sombra",
        href: "/servicios/techo-sol-y-sombra",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop",
        desc: "Estructuras que combinan luz y protección."
      },
      {
        label: "Diseño y ejecución de proyecto de terraza",
        href: "/servicios/diseno-ejecucion-terrazas",
        image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920&auto=format&fit=crop",
        desc: "Transformación integral de espacios exteriores."
      },
      {
        label: "Proyecto Estación de parrilla",
        href: "/servicios/estacion-parrilla",
        image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1920&auto=format&fit=crop",
        desc: "El corazón de tu terraza, diseñado para compartir."
      },
      {
        label: "Otro tipo de proyecto al aire libre",
        href: "/servicios/otros-proyectos",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop",
        desc: "Paisajismo, piscinas y zonas de relax."
      }
    ]
  },
  proyectos: {
    defaultImage: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1920&auto=format&fit=crop",
    items: [
      {
        label: "Casa Miraflores",
        href: "/proyectos/miraflores",
        image: "https://images.unsplash.com/photo-1600607687644-c7171b42498b?q=80&w=1920&auto=format&fit=crop",
        desc: "Reforma integral de azotea frente al mar."
      },
      {
        label: "Loft Barranco",
        href: "/proyectos/barranco",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1920&auto=format&fit=crop",
        desc: "Minimalismo cálido en espacio histórico."
      },
      {
        label: "Oficinas San Isidro",
        href: "/proyectos/san-isidro",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop",
        desc: "Terraza ejecutiva de alto tránsito."
      },
    ]
  },
  estudio: {
    defaultImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop",
    items: [
      {
        label: "Estilo",
        href: "/estudio/estilo",
        image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1920&auto=format&fit=crop",
        desc: "Nuestra firma visual y conceptual."
      },
      {
        label: "Equipo",
        href: "/estudio/equipo",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop",
        desc: "Conoce a los arquitectos detrás de cada proyecto."
      },
      {
        label: "Proceso",
        href: "/estudio/proceso",
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920&auto=format&fit=crop",
        desc: "Cómo llevamos tu idea a la realidad."
      }
    ]
  },
  contacto: {
    defaultImage: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1920&auto=format&fit=crop",
    items: [
      {
        label: "Agendar Cita",
        href: "/contacto",
        image: "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1920&auto=format&fit=crop",
        desc: "Reserva una reunión con nuestro equipo."
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/51919693180",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1920&auto=format&fit=crop",
        desc: "Chat directo: +51 919 693 180"
      },
      {
        label: "Ubicación",
        href: "/contacto#mapa",
        image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop",
        desc: "Visítanos en nuestras oficinas en Lima."
      }
    ]
  }
};

export default function Navbar() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Image State
  const [currentImage, setCurrentImage] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Scroll Listener
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
  }, [pathname]);

  // Mega Menu Open/Close Animation
  useEffect(() => {
    if (!megaRef.current) return;

    if (activeMega) {
      // Opening
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(megaRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.6,
        overwrite: true
      });

      // Set initial image immediately
      const initialImg = MEGA_CONTENT[activeMega]?.defaultImage;
      if (initialImg) {
        setCurrentImage(initialImg);
        setIsAnimating(true); // Trigger fade in
        setTimeout(() => setIsAnimating(false), 50); // Small delay to ensure transition happens
      }

    } else {
      // Closing
      gsap.to(megaRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power3.inOut",
        overwrite: true
      });
      setActiveSubItem(null);
      setCurrentImage("");
      setIsAnimating(false);
    }
  }, [activeMega]);

  // Content Transition (List Items)
  useEffect(() => {
    if (activeMega && contentRef.current) {
      gsap.fromTo(contentRef.current.querySelectorAll(".mega-link, .mega-title"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", overwrite: true }
      );
    }
  }, [activeMega]);

  // Image Switching Logic (CSS Based)
  useEffect(() => {
    if (!activeMega) return;

    const targetImage = activeSubItem?.image || MEGA_CONTENT[activeMega]?.defaultImage;

    if (targetImage && targetImage !== currentImage) {
      // Start fade out
      setIsAnimating(true);

      // Wait for fade out, then swap and fade in
      const timer = setTimeout(() => {
        setCurrentImage(targetImage);
        setIsAnimating(false);
      }, 300); // Match CSS transition duration

      return () => clearTimeout(timer);
    }
  }, [activeSubItem, activeMega, currentImage]);

  // Text Transition (Title & Desc)
  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", overwrite: true }
      );
    }
  }, [activeSubItem, activeMega]);

  const handleMouseEnter = (id: string) => {
    if (MEGA_CONTENT[id]) {
      if (activeMega !== id) {
        setActiveSubItem(null); // Reset subitem when switching categories
      }
      setActiveMega(id);
    } else {
      setActiveMega(null);
    }
  };

  const handleMouseLeave = () => {
    setActiveMega(null);
  };

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 right-0 z-100 transition-all duration-700 will-change-transform ${scrolled || activeMega || mobileOpen
          ? "bg-[var(--bg-primary)] py-4 border-b border-primary/5 shadow-sm"
          : "bg-transparent py-8 border-b border-transparent"
          }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">

          {/* Logo */}
          <Link href="/" className="group relative z-50 flex items-center gap-3">
            <Image
              src="/comfort-logo-light.png"
              alt="Comfort Studio"
              width={50}
              height={50}
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              priority
            />
            <span className={`font-serif text-xl tracking-tight transition-colors duration-500 ${activeMega || scrolled ? "text-primary" : "text-white"}`}>
              COMFORT STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="relative group" onMouseEnter={() => handleMouseEnter(item.id)}>
                <Link
                  href={item.href}
                  className={`relative text-[0.7rem] font-bold uppercase tracking-[0.25em] py-4 transition-colors duration-500 block ${activeMega === item.id || scrolled ? "text-primary" : "text-white/80 hover:text-white"}`}
                >
                  {item.label}
                  <span className={`absolute bottom-2 left-0 w-full h-px bg-terracota transition-transform duration-500 origin-left ease-out ${activeMega === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />

                  {/* Glow Effect */}
                  <span className={`absolute inset-0 bg-terracota/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150 pointer-events-none`} />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Side: CTA */}
          <div className="hidden md:flex items-center gap-6">
            <ThemeToggle />

            <div className="flex flex-col items-end">
              <span className="text-[0.6rem] text-primary/60 uppercase tracking-widest mb-1">Atención</span>
              <a
                href="https://wa.me/51919693180"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 text-xs font-bold transition-colors duration-300 ${scrolled || activeMega ? "text-primary hover:text-terracota" : "text-white hover:text-terracota"
                  }`}
              >
                <svg className="w-4 h-4 text-terracota" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                <span>+51 919 693 180</span>
              </a>
            </div>

            <Link href="/cotiza" className={`
              relative px-8 py-3 rounded-full overflow-hidden transition-all duration-500 group
              ${scrolled || activeMega ? "bg-primary text-primary border border-primary/10" : "bg-white/10 text-white backdrop-blur-sm border border-white/20"}
            `}>
              <span className="absolute inset-0 w-full h-full bg-terracota scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ease-out" />
              <span className="relative z-10 text-[0.7rem] font-bold uppercase tracking-[0.2em] flex items-center gap-2 group-hover:text-white transition-colors duration-300">
                Cotizar <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-50 w-10 h-10 flex flex-col justify-center gap-1.5"
            >
              <span className={`w-full h-px bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""} ${scrolled || activeMega ? "bg-primary" : "bg-white"}`} />
              <span className={`w-full h-px bg-current transition-all ${mobileOpen ? "opacity-0" : ""} ${scrolled || activeMega ? "bg-primary" : "bg-white"}`} />
              <span className={`w-full h-px bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""} ${scrolled || activeMega ? "bg-primary" : "bg-white"}`} />
            </button>
          </div>
        </div>

        {/* --- MEGA MENU --- */}
        <div
          ref={megaRef}
          className="absolute top-full left-0 w-full bg-[var(--bg-primary)] border-t border-primary/5 overflow-hidden shadow-2xl h-0 opacity-0"
        >
          {activeMega && MEGA_CONTENT[activeMega] && (
            <div className="relative w-full h-[50vh] flex max-w-[1800px] mx-auto">

              {/* Left: Navigation List */}
              <div ref={contentRef} className="w-1/3 h-full z-10 p-12 flex flex-col justify-center space-y-2 border-r border-primary/5">
                <p className="mega-title text-[0.65rem] uppercase tracking-[0.3em] text-terracota mb-8 font-bold">Explora {activeMega}</p>
                {MEGA_CONTENT[activeMega].items.map((sub: any) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onMouseEnter={() => setActiveSubItem(sub)}
                    className="mega-link group flex items-center justify-between py-4 border-b border-primary/5 hover:border-primary/20 transition-colors"
                  >
                    <span className="font-serif text-2xl text-primary/50 group-hover:text-primary transition-colors duration-500">
                      {sub.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-500 text-terracota">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Right: Immersive Image Preview (CSS Transition) */}
              <div className="w-2/3 h-full relative overflow-hidden bg-black">
                {currentImage && (
                  <Image
                    src={currentImage}
                    alt="Preview"
                    fill
                    className={`object-cover transition-opacity duration-300 ${isAnimating ? "opacity-0" : "opacity-40"}`}
                    priority
                  />
                )}

                {/* Overlay Content */}
                <div ref={textRef} className="absolute bottom-0 left-0 w-full p-16 bg-linear-to-t from-black via-black/50 to-transparent z-20">
                  <h3 className="text-white font-serif text-5xl mb-4">
                    {activeSubItem?.label || "Experiencia Comfort"}
                  </h3>
                  <p className="text-white/70 text-lg max-w-lg font-light leading-relaxed">
                    {activeSubItem?.desc || "Diseñamos espacios que conectan con tus sentidos."}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 z-40 bg-primary transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "translate-x-full"} md:hidden pt-32 px-8`}>
        <div className="flex flex-col space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-4xl text-primary border-b border-primary/10 pb-4"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/51919693180"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-primary text-lg font-medium mt-8"
          >
            <svg className="w-6 h-6 text-terracota" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            <span>+51 919 693 180</span>
          </a>
          <Link
            href="/cotiza"
            onClick={() => setMobileOpen(false)}
            className="mt-8 w-full py-4 bg-terracota text-white text-center rounded-full font-bold uppercase tracking-widest"
          >
            Cotizar Proyecto
          </Link>
        </div>
      </div>
    </>
  );
}