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
  { id: "estudio", label: "Estudio", href: "/estudio", hasMega: true },
  { id: "contacto", label: "Contacto", href: "/contacto", hasMega: true },
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
  },
  estudio: {
    defaultVideo: "https://cdn.coverr.co/videos/coverr-architect-working-on-plans-4602/1080p.mp4",
    items: [
      {
        label: "Filosofía",
        href: "/estudio#filosofia",
        video: "https://cdn.coverr.co/videos/coverr-architect-working-on-plans-4602/1080p.mp4",
        desc: "Nuestra visión de la arquitectura sensorial."
      },
      {
        label: "Equipo",
        href: "/estudio#equipo",
        video: "https://cdn.coverr.co/videos/coverr-team-working-together-4851/1080p.mp4",
        desc: "Conoce a los arquitectos detrás de cada proyecto."
      },
      {
        label: "Proceso",
        href: "/estudio#proceso",
        video: "https://cdn.coverr.co/videos/coverr-hands-drawing-on-paper-4604/1080p.mp4",
        desc: "Cómo llevamos tu idea a la realidad."
      }
    ]
  },
  contacto: {
    defaultVideo: "https://cdn.coverr.co/videos/coverr-typing-on-keyboard-4600/1080p.mp4",
    items: [
      {
        label: "Agendar Cita",
        href: "/contacto",
        video: "https://cdn.coverr.co/videos/coverr-typing-on-keyboard-4600/1080p.mp4",
        desc: "Reserva una reunión con nuestro equipo."
      },
      {
        label: "WhatsApp",
        href: "https://wa.me/51919693180",
        video: "https://cdn.coverr.co/videos/coverr-person-typing-on-phone-4601/1080p.mp4",
        desc: "Chat directo: +51 919 693 180"
      },
      {
        label: "Ubicación",
        href: "/contacto#mapa",
        video: "https://cdn.coverr.co/videos/coverr-walking-in-city-4605/1080p.mp4",
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

  const headerRef = useRef<HTMLElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const pathname = usePathname();

  // Scroll Listener (Optimized)
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

  // Mega Menu Animation (Optimized)
  useEffect(() => {
    if (!megaRef.current) return;

    if (activeMega) {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.to(megaRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        overwrite: true
      })
        .fromTo(megaRef.current.querySelectorAll(".mega-link"),
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, stagger: 0.03 },
          "-=0.2"
        );
    } else {
      gsap.to(megaRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power3.in",
        overwrite: true
      });
      setActiveSubItem(null);
    }
  }, [activeMega]);

  // Video Transition (Optimized)
  useEffect(() => {
    if (videoRef.current && activeMega) {
      const newSrc = activeSubItem?.video || MEGA_CONTENT[activeMega]?.defaultVideo;
      if (newSrc && videoRef.current.src !== newSrc) {
        // Simple fade out/in for better performance
        gsap.to(videoRef.current, {
          opacity: 0,
          duration: 0.2,
          overwrite: true,
          onComplete: () => {
            if (videoRef.current) {
              videoRef.current.src = newSrc;
              videoRef.current.load();
              const playPromise = videoRef.current.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => { }); // Prevent play interruption errors
              }
              gsap.to(videoRef.current, { opacity: 0.6, duration: 0.3 });
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
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 will-change-transform ${scrolled || activeMega || mobileOpen
          ? "bg-[#0a0a0a]/90 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-8"
          }`}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className={`w-10 h-10 bg-terracota rounded-sm flex items-center justify-center transition-transform duration-500 group-hover:rotate-90`}>
              <span className="text-white font-serif font-bold text-xl">C</span>
            </div>
            <span className={`font-serif text-xl tracking-tight transition-colors duration-300 text-white`}>
              COMFORT STUDIO
            </span>
          </Link>

          {/* Desktop Nav - Centered & Reactive */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="relative group" onMouseEnter={() => handleMouseEnter(item.id)}>
                <Link
                  href={item.href}
                  className="relative text-[0.7rem] font-bold uppercase tracking-[0.25em] py-4 text-white/70 hover:text-white transition-colors duration-300 block"
                >
                  {item.label}
                  <span className="absolute bottom-2 left-0 w-full h-[1px] bg-terracota scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Side: CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/cotiza" className="group relative px-6 py-2.5 rounded-full overflow-hidden bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10">
              <span className="relative z-10 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white flex items-center gap-2">
                Cotizar <span className="text-terracota group-hover:translate-x-1 transition-transform">↗</span>
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center gap-1.5"
          >
            <span className={`w-full h-[1px] bg-white transition-all ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`w-full h-[1px] bg-white transition-all ${mobileOpen ? "opacity-0" : ""}`} />
            <span className={`w-full h-[1px] bg-white transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>

        {/* --- MEGA MENU --- */}
        <div
          ref={megaRef}
          className="absolute top-full left-0 w-full bg-[#0a0a0a] border-t border-white/5 overflow-hidden shadow-2xl h-0 opacity-0"
        >
          {activeMega && MEGA_CONTENT[activeMega] && (
            <div className="relative w-full h-[50vh] flex max-w-[1800px] mx-auto">

              {/* Left: Navigation List */}
              <div className="w-1/3 h-full z-10 p-12 flex flex-col justify-center space-y-2 border-r border-white/5">
                <p className="text-[0.65rem] uppercase tracking-[0.3em] text-terracota mb-8 font-bold">Explora {activeMega}</p>
                {MEGA_CONTENT[activeMega].items.map((sub: any) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onMouseEnter={() => setActiveSubItem(sub)}
                    className="mega-link group flex items-center justify-between py-4 border-b border-white/5 hover:border-white/20 transition-colors"
                  >
                    <span className="font-serif text-2xl text-white/50 group-hover:text-white transition-colors duration-300">
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
                  className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-500"
                  src={MEGA_CONTENT[activeMega].defaultVideo}
                />

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 w-full p-16 bg-gradient-to-t from-black via-black/50 to-transparent">
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
      <div className={`fixed inset-0 z-40 bg-[#0a0a0a] transition-transform duration-500 ${mobileOpen ? "translate-x-0" : "translate-x-full"} md:hidden pt-32 px-8`}>
        <div className="flex flex-col space-y-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-serif text-4xl text-white border-b border-white/10 pb-4"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.me/51919693180"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-white text-lg font-medium mt-8"
          >
            <svg className="w-6 h-6 text-terracota" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
            +51 919 693 180
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