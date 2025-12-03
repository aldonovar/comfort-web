"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FOOTER_LINKS = [
  {
    title: "Explora",
    links: [
      { label: "Inicio", href: "/" },
      { label: "Servicios", href: "/servicios" },
      { label: "Proyectos", href: "/proyectos" },
      { label: "Estudio", href: "/estudio" },
    ]
  },
  {
    title: "Servicios",
    links: [
      { label: "Techo sol y sombra", href: "/servicios/techo-sol-y-sombra" },
      { label: "Diseño y ejecución de proyecto de terraza", href: "/servicios/diseno-ejecucion-terrazas" },
      { label: "Proyecto Estación de parrilla", href: "/servicios/estacion-parrilla" },
      { label: "Otro tipo de proyecto al aire libre", href: "/servicios/otros-proyectos" },
    ]
  }
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".footer-reveal",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#050505] text-white pt-32 pb-24 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8 footer-reveal">
            <Link href="/" className="flex items-center gap-4 mb-6 group">
              <img
                src="/comfort-logo-light.png"
                alt="Comfort Studio"
                className="h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="font-serif text-xl tracking-tight text-white group-hover:text-terracota transition-colors duration-300">COMFORT STUDIO</span>
            </Link>
            <p className="text-white/50 max-w-sm font-light leading-relaxed">
              Transformamos espacios exteriores en experiencias de vida.
              Diseño arquitectónico y ejecución integral en Lima.
            </p>

            {/* Social Links - Premium Icons (No LinkedIn) */}
            <div className="flex gap-4">
              {[
                { d: "M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,5A1,1 0 0,1 19,6A1,1 0 0,1 17,6A1,1 0 0,1 18,5Z", href: "https://www.instagram.com/comfortstudioperu/" },
                { d: "M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.16L15.72 14.96H13.38V21.96C18.16 21.21 21.82 17.06 21.82 12.06C21.82 6.53 17.32 2.04 12 2.04Z", href: "https://www.facebook.com/comfortstudioperu" },
                { d: "M16.6 5.82C15.6 5.82 14.7 5.32 14.1 4.52V14.62C14.1 17.22 12 19.32 9.4 19.32C6.8 19.32 4.7 17.22 4.7 14.62C4.7 12.02 6.8 9.92 9.4 9.92C9.9 9.92 10.4 10.02 10.9 10.22V13.22C10.4 13.02 9.9 12.92 9.4 12.92C8.5 12.92 7.7 13.72 7.7 14.62C7.7 15.52 8.5 16.32 9.4 16.32C10.3 16.32 11.1 15.52 11.1 14.62V2.02H14.1C14.1 3.42 15.2 4.52 16.6 4.52V5.82Z", href: "https://www.tiktok.com/@comfortstudioperu" },
                { d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67M16.91 13.38C16.64 13.24 15.31 12.59 15.06 12.5C14.81 12.41 14.63 12.36 14.45 12.63C14.27 12.9 13.76 13.5 13.61 13.68C13.46 13.86 13.31 13.88 13.04 13.75C12.77 13.61 11.9 13.33 10.87 12.41C10.07 11.7 9.53 10.82 9.38 10.56C9.23 10.3 9.36 10.16 9.5 10.03C9.62 9.91 9.77 9.72 9.9 9.57C10.03 9.42 10.08 9.31 10.17 9.13C10.26 8.95 10.21 8.8 10.14 8.65C10.07 8.5 9.53 7.18 9.31 6.64C9.09 6.12 8.87 6.19 8.7 6.19C8.54 6.19 8.36 6.19 8.18 6.19C8 6.19 7.7 6.26 7.45 6.53C7.2 6.8 6.5 7.45 6.5 8.77C6.5 10.09 7.46 11.36 7.6 11.55C7.74 11.74 9.59 14.59 12.42 15.81C13.1 16.11 13.63 16.28 14.05 16.41C14.73 16.63 15.35 16.6 15.85 16.53C16.41 16.45 17.57 15.83 17.81 15.15C18.05 14.47 18.05 13.89 17.98 13.78C17.91 13.67 17.73 13.61 17.46 13.47", href: "https://wa.me/51919693180" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d={social.d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {FOOTER_LINKS.map((section, idx) => (
            <div key={section.title} className="md:col-span-2 footer-reveal">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">{section.title}</h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-terracota transition-colors duration-300 block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="md:col-span-2 footer-reveal">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-8">Contacto</h4>
            <ul className="space-y-4">
              <li className="text-sm text-white/70">
                <span className="block text-white/30 text-xs mb-1">Teléfono</span>
                <a
                  href="https://wa.me/51919693180"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-terracota transition-colors duration-300"
                >
                  +51 919 693 180
                </a>
              </li>
              <li className="text-sm text-white/70">
                <span className="block text-white/30 text-xs mb-1">Email</span>
                <a
                  href="mailto:contacto@comfortstudioperu.com"
                  className="hover:text-terracota transition-colors duration-300"
                >
                  contacto@comfortstudioperu.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-xs text-white/30 footer-reveal pb-20 md:pb-0">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p>© {new Date().getFullYear()} Comfort Studio.</p>
            <div className="hidden md:block w-px h-3 bg-white/20"></div>
            <div className="flex gap-6">
              <Link href="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
              <Link href="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            </div>
          </div>

          <div className="flex items-center gap-1 uppercase tracking-wider text-[10px]">
            <span>EXPERIENCIA DIGITAL DESARROLLADA POR</span>
            <a href="https://allyxorb.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors font-bold text-white/50 hover:text-white ml-1">
              ALLYX
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
