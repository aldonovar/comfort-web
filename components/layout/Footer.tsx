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
            <Link href="/" className="block">
              <span className="font-serif text-3xl tracking-tight">COMFORT STUDIO</span>
            </Link>
            <p className="text-white/50 max-w-sm font-light leading-relaxed">
              Transformamos espacios exteriores en experiencias de vida.
              Diseño arquitectónico y ejecución integral en Lima.
            </p>

            {/* Social Links - Premium Icons (No LinkedIn) */}
            <div className="flex gap-4">
              {[
                { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z", href: "#" },
                { d: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.12-.01 2.92.02 5.84-.02 8.75-.08 3.12-2.5 5.48-5.6 5.54-3.01.06-5.53-2.27-5.61-5.23-.1-3.45 3.24-5.99 6.35-4.8.27.1.53.22.78.36v4.2c-.43-.26-.88-.49-1.38-.54-.75-.07-1.46.33-1.65 1.04-.27 1.03.56 1.96 1.58 2.04.92.07 1.76-.67 1.75-1.58-.03-3.96-.01-7.92-.02-11.89h4.22c.03-1.58.02-3.16.02-4.74z", href: "#" },
                { d: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", href: "#" },
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
