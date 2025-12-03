"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from "next/navigation";

// --- Configuration ---
const NAV_ITEMS = [
  { id: "inicio", label: "Inicio", href: "/" },
  { id: "servicios", label: "Servicios", href: "/servicios", hasMega: true },
  { id: "proyectos", label: "Proyectos", href: "/proyectos", hasMega: true },
  { id: "estudio", label: "Estudio", href: "/estudio" },
  { id: "contacto", label: "Contacto", href: "/contacto" },
];

const MEGA_CONTENT: any = {
  servicios: {
    defaultVideo: "https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4",
    items: [
      {
        label: "Terrazas Residenciales",
        href: "/servicios/residencial",
        video: "https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4",
        desc: "Espacios íntimos para la vida diaria."
      },
      {
        label: "Azoteas Corporativas",
        href: "/servicios/corporativo",
        video: "https://cdn.coverr.co/videos/coverr-modern-office-space-4853/1080p.mp4",
        desc: "Áreas de descanso que potencian la productividad."
      },
      {
        label: "Patios Interiores",
        href: "/servicios/patios",
        video: "https://cdn.coverr.co/videos/coverr-sunlight-hitting-a-plant-4610/1080p.mp4",
        desc: "Oasis de luz y vegetación dentro de casa."
      },
      {
        label: "Diseño Paisajista",
        href: "/servicios/paisajismo",
        video: "https://cdn.coverr.co/videos/coverr-leaves-blowing-in-the-wind-4598/1080p.mp4",
        desc: "Integración natural con arquitectura viva."
      },
    ]
  },
  proyectos: {
    defaultVideo: "https://cdn.coverr.co/videos/coverr-modern-architecture-building-4606/1080p.mp4",
    items: [
      {
        label: "Casa Miraflores",
        href: "/proyectos/miraflores",
        video: "https://cdn.coverr.co/videos/coverr-modern-architecture-building-4606/1080p.mp4",
        desc: "Reforma integral de azotea frente al mar."
      },
      {
        label: "Loft Barranco",
        href: "/proyectos/barranco",
        video: "https://cdn.coverr.co/videos/coverr-walking-inside-a-modern-home-4612/1080p.mp4",
        desc: "Minimalismo cálido en espacio histórico."
      },
      {
        label: "Oficinas San Isidro",
        href: "/proyectos/san-isidro",
        video: "https://cdn.coverr.co/videos/coverr-people-working-in-office-4855/1080p.mp4",
        desc: "Terraza ejecutiva de alto tránsito."
      },
    ]
  }
};

export default function Navbar() {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [activeSubItem, setActiveSubItem] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  // Scroll Listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
  }, [pathname]);

  // Mega Menu Animation
  useEffect(() => {
    if (!megaRef.current) return;

    if (activeMega) {
      const tl = gsap.timeline();
      tl.to(megaRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power4.out"
      })
        .fromTo(megaRef.current.querySelectorAll(".mega-link"),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
          "-=0.2"
        );
    } else {
      gsap.to(megaRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.inOut"
      });
      setActiveSubItem(null);
    }
  }, [activeMega]);

  // Video Transition
  useEffect(() => {
    if (videoRef.current && activeMega) {
      const newSrc = activeSubItem?.video || MEGA_CONTENT[activeMega]?.defaultVideo;
      if (newSrc && videoRef.current.src !== newSrc) {
        gsap.to(videoRef.current, {
          opacity: 0, duration: 0.2, onComplete: () => {
            if (videoRef.current) {
              videoRef.current.src = newSrc;
              videoRef.current.load();
              videoRef.current.play();
              gsap.to(videoRef.current, { opacity: 0.6, duration: 0.4 });
            }
          }
        });
      }
    }
  }, [activeSubItem, activeMega]);

  const handleMouseEnter = (id: string) => {
    if (MEGA_CONTENT[id]) setActiveMega(id);
    else setActiveMega(null);
  };

  const handleMouseLeave = () => {
    setActiveMega(null);
  };

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled || activeMega || mobileOpen ? "bg-crema/95 backdrop-blur-md py-4 border-b border-madera/5" : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className={`w-10 h-10 bg-terracota rounded-full flex items-center justify-center transition-transform duration-500 group-hover:rotate-180`}>
              <span className="text-white font-serif font-bold text-xl">C</span>
            </div>
            <span className={`font-serif text-xl tracking-tight transition-colors duration-300 ${scrolled || activeMega || mobileOpen ? "text-madera" : "text-crema"}`}>
              COMFORT STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="relative group h-full flex items-center" onMouseEnter={() => handleMouseEnter(item.id)}>
                <Link
                  href={item.href}
                  className={`relative text-sm font-bold uppercase tracking-[0.2em] py-4 transition-colors duration-300 ${scrolled || activeMega ? "text-madera/60 hover:text-madera" : "text-crema/80 hover:text-white"
                    }`}
                >
                  {/* Reactive Title Effect */}
                  <span className="block overflow-hidden relative">
                    <span className="block transition-transform duration-300 group-hover:-translate-y-full">{item.label}</span>
                    <span className="absolute top-0 left-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-terracota">
                      {item.label}
                    </span>
                  </span>
                </Link>
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <Link href="/cotiza" className={`
              px-8 py-3 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 border
              ${scrolled || activeMega
                ? "border-madera text-madera hover:bg-madera hover:text-crema"
                : "border-crema/30 text-crema hover:bg-crema hover:text-madera"}
            `}>
              Cotizar
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center gap-1.5"
          >
            <span className={`w-full h-[2px] bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""} ${scrolled || mobileOpen ? "text-madera" : "text-crema"}`} />
            <span className={`w-full h-[2px] bg-current transition-all ${mobileOpen ? "opacity-0" : ""} ${scrolled || mobileOpen ? "text-madera" : "text-crema"}`} />
            <span className={`w-full h-[2px] bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""} ${scrolled || mobileOpen ? "text-madera" : "text-crema"}`} />
          </button>
        </div>

        {/* --- VIDEO MEGA MENU --- */}
        <div
          ref={megaRef}
          className="absolute top-full left-0 w-full bg-crema overflow-hidden shadow-2xl h-0 opacity-0"
        >
          {activeMega && MEGA_CONTENT[activeMega] && (
            <div className="relative w-full h-[60vh] flex">

              {/* Left: Navigation List */}
              <div className="w-1/3 h-full bg-crema z-10 p-16 flex flex-col justify-center space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-terracota mb-8 font-bold">Explora {activeMega}</p>
                {MEGA_CONTENT[activeMega].items.map((sub: any) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onMouseEnter={() => setActiveSubItem(sub)}
                    className="mega-link group flex items-center justify-between py-4 border-b border-madera/10 hover:border-madera transition-colors"
                  >
                    <span className="font-serif text-3xl text-madera/40 group-hover:text-madera transition-colors duration-300">
                      {sub.label}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-terracota">
                      →
                    </span>
                  </Link>
                ))}
              </div>

              {/* Right: Immersive Video Preview */}
              <div className="w-2/3 h-full relative overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60 transition-opacity duration-500"
                  src={MEGA_CONTENT[activeMega].defaultVideo}
                />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-16 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-crema font-serif text-5xl mb-4">
                    {activeSubItem?.label || "Experiencia Comfort"}
                  </h3>
                  <p className="text-crema/80 text-lg max-w-md font-light">
                    {activeSubItem?.desc || "Diseñamos espacios que conectan con tus sentidos."}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset-0 z-40 bg-crema transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "translate-x-full"} md:hidden pt-32 px-8`}>
        <div className="flex flex-col space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-4xl text-madera border-b border-madera/10 pb-4"
            >
              {item.label}
            </Link>
          ))}
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