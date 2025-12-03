```
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
                playPromise.catch(() => {}); // Prevent play interruption errors
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
        className={`fixed top - 0 left - 0 right - 0 z - [100] transition - all duration - 300 will - change - transform ${
  scrolled || activeMega || mobileOpen
    ? "bg-crema/95 backdrop-blur-sm py-3 border-b border-madera/5 shadow-sm"
    : "bg-transparent py-6"
} `}
      >
        <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className={`w - 8 h - 8 md: w - 10 md: h - 10 bg - terracota rounded - full flex items - center justify - center transition - transform duration - 500 group - hover: rotate - 180`}>
              <span className="text-white font-serif font-bold text-lg md:text-xl">C</span>
            </div>
            <span className={`font - serif text - lg md: text - xl tracking - tight transition - colors duration - 300 ${ scrolled || activeMega || mobileOpen ? "text-madera" : "text-crema" } `}>
              COMFORT STUDIO
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-12">
            {NAV_ITEMS.map((item) => (
              <div key={item.id} className="relative group h-full flex items-center" onMouseEnter={() => handleMouseEnter(item.id)}>
                <Link
                  href={item.href}
                  className={`relative text - xs lg: text - sm font - bold uppercase tracking - [0.2em] py - 4 transition - colors duration - 300 ${
  scrolled || activeMega ? "text-madera/60 hover:text-madera" : "text-crema/80 hover:text-white"
} `}
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

          {/* Right Side: WhatsApp & CTA */}
          <div className="hidden md:flex items-center gap-6">
             {/* WhatsApp Number */}
             <a 
              href="https://wa.me/51919693180" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex items - center gap - 2 text - xs font - medium tracking - widest transition - colors duration - 300 ${
  scrolled || activeMega ? "text-madera/80 hover:text-terracota" : "text-crema/90 hover:text-white"
} `}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              <span>+51 919 693 180</span>
            </a>

            <Link href="/cotiza" className={`
px - 6 py - 2.5 rounded - full text - xs font - bold uppercase tracking - [0.2em] transition - all duration - 300 border
              ${
  scrolled || activeMega
  ? "border-madera text-madera hover:bg-madera hover:text-crema"
  : "border-crema/30 text-crema hover:bg-crema hover:text-madera"
}
`}>
              Cotizar
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col justify-center gap-1.5"
          >
            <span className={`w - full h - [2px] bg - current transition - all ${ mobileOpen ? "rotate-45 translate-y-2" : "" } ${ scrolled || mobileOpen ? "text-madera" : "text-crema" } `} />
            <span className={`w - full h - [2px] bg - current transition - all ${ mobileOpen ? "opacity-0" : "" } ${ scrolled || mobileOpen ? "text-madera" : "text-crema" } `} />
            <span className={`w - full h - [2px] bg - current transition - all ${ mobileOpen ? "-rotate-45 -translate-y-2" : "" } ${ scrolled || mobileOpen ? "text-madera" : "text-crema" } `} />
          </button>
        </div>

        {/* --- VIDEO MEGA MENU --- */}
        <div
          ref={megaRef}
          className="absolute top-full left-0 w-full bg-crema overflow-hidden shadow-2xl h-0 opacity-0"
        >
          {activeMega && MEGA_CONTENT[activeMega] && (
            <div className="relative w-full h-[50vh] flex">

              {/* Left: Navigation List */}
              <div className="w-1/3 h-full bg-crema z-10 p-12 flex flex-col justify-center space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-terracota mb-6 font-bold">Explora {activeMega}</p>
                {MEGA_CONTENT[activeMega].items.map((sub: any) => (
                  <Link
                    key={sub.label}
                    href={sub.href}
                    onMouseEnter={() => setActiveSubItem(sub)}
                    className="mega-link group flex items-center justify-between py-3 border-b border-madera/10 hover:border-madera transition-colors"
                  >
                    <span className="font-serif text-2xl text-madera/40 group-hover:text-madera transition-colors duration-300">
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
                <div className="absolute bottom-0 left-0 w-full p-12 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-crema font-serif text-4xl mb-3">
                    {activeSubItem?.label || "Experiencia Comfort"}
                  </h3>
                  <p className="text-crema/80 text-base max-w-md font-light">
                    {activeSubItem?.desc || "Diseñamos espacios que conectan con tus sentidos."}
                  </p>
                </div>
              </div>

            </div>
          )}
        </div>
      </header>

      {/* --- MOBILE MENU OVERLAY --- */}
      <div className={`fixed inset - 0 z - 40 bg - crema transition - transform duration - 500 ${ mobileOpen ? "translate-x-0" : "translate-x-full" } md:hidden pt - 32 px - 8`}>
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
          <a
             href="https://wa.me/51919693180" 
             target="_blank" 
             rel="noopener noreferrer"
             className="flex items-center gap-3 text-madera text-lg font-medium"
          >
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
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
```