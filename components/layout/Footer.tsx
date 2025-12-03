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
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y Condiciones", href: "/terminos" },
      { label: "Política de Privacidad", href: "/privacidad" },
      { label: "Libro de Reclamaciones", href: "/reclamaciones" },
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
    <footer ref={footerRef} className="bg-[#050505] text-white pt-32 pb-12 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-24">

          {/* Brand Column */}
          <div className="md:col-span-4 space-y-8 footer-reveal">
            <Link href="/" className="block mb-6">
              <img
                src="/comfort-logo-light.png"
                alt="Comfort Studio"
                className="h-16 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
            <p className="text-white/50 max-w-sm font-light leading-relaxed">
              Transformamos espacios exteriores en experiencias de vida.
              Diseño arquitectónico y ejecución integral en Lima.
            </p>

            {/* Social Links - Premium Icons (No LinkedIn) */}
            <div className="flex gap-4">
              {[
                { d: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m4.4 3a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 3 3 3 3 0 0 0-3-3m6.5-3a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z", href: "https://www.instagram.com/comfortstudioperu/" },
                { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", href: "https://www.facebook.com/comfortstudioperu" },
                { d: "M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 22a6.34 6.34 0 0 0 6.34-6.34V6.92c2.45.49 4.78 2.39 5.26 5.43h3.5v-.5a4.94 4.94 0 0 1-4.51-5.16z", href: "https://www.tiktok.com/@comfortstudioperu" },
                { d: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z", href: "https://wa.me/51919693180" }
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white hover:bg-white/5 transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                +51 919 693 180
              </li>
              <li className="text-sm text-white/70">
                <span className="block text-white/30 text-xs mb-1">Email</span>
                contacto@comfortstudioperu.com
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30 footer-reveal">
          <p>© {new Date().getFullYear()} Comfort Studio. Todos los derechos reservados.</p>
          <p>Diseñado por ALLYX</p>
        </div>

      </div>
    </footer>
  );
}
