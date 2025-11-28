import ScrollReveal from "./ScrollReveal";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: "https://facebook.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://tiktok.com",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      status: "Próximamente",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-crema border-t border-white/5 relative overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      <ScrollReveal animation="fade-up" duration={0.8} threshold="90%">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-20 pb-12 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

            {/* 1. Brand Column */}
            <div className="space-y-8">
              <Link href="/" className="block">
                <img
                  src="/comfort-logo-light.png"
                  alt="Comfort Studio Logo"
                  className="h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
                />
              </Link>
              <div className="space-y-4">
                <p className="text-sm text-crema/70 leading-relaxed font-light max-w-xs">
                  Transformamos espacios exteriores en experiencias de vida. Diseño arquitectónico y ejecución integral en Lima.
                </p>
                {/* Social Links */}
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target={social.href !== "#" ? "_blank" : undefined}
                      rel="noreferrer"
                      className={`group relative flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/5 transition-all duration-300 ${social.status ? "cursor-default opacity-50" : "hover:bg-terracota hover:border-terracota hover:text-white"
                        }`}
                      title={social.status || social.name}
                    >
                      {social.icon}
                      {social.status && (
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[0.5rem] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          {social.status}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* 2. Navigation Column */}
            <div className="lg:pl-8 space-y-6">
              <h4 className="font-serif text-lg text-white">Explorar</h4>
              <nav className="flex flex-col gap-3">
                {[
                  { label: "Inicio", href: "/" },
                  { label: "Servicios", href: "/servicios" },
                  { label: "Proyectos", href: "/proyectos" },
                  { label: "Cotiza tu Proyecto", href: "/cotiza" },
                  { label: "Contacto", href: "/contacto" }
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-sm text-crema/60 hover:text-terracota transition-colors w-fit flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/20 group-hover:bg-terracota transition-colors" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 3. Services Column */}
            <div className="space-y-6">
              <h4 className="font-serif text-lg text-white">Servicios</h4>
              <nav className="flex flex-col gap-3">
                {[
                  "Terraza de Departamento",
                  "Azotea Completa",
                  "Patio Interior",
                  "Terraza Corporativa",
                  "Proyecto Integral"
                ].map((item) => (
                  <Link
                    key={item}
                    href="/servicios"
                    className="text-sm text-crema/60 hover:text-terracota transition-colors w-fit group"
                  >
                    {item}
                  </Link>
                ))}
              </nav>
            </div>

            {/* 4. Contact Column */}
            <div className="space-y-6">
              <h4 className="font-serif text-lg text-white">Contacto</h4>
              <div className="space-y-5">
                <div className="group">
                  <p className="text-[0.65rem] text-crema/40 uppercase tracking-wider mb-1">WhatsApp</p>
                  <a href="https://wa.me/51936230958" className="text-sm text-crema/90 hover:text-white transition-colors flex items-center gap-2">
                    +51 936 230 958
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-terracota">↗</span>
                  </a>
                </div>
                <div className="group">
                  <p className="text-[0.65rem] text-crema/40 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:contacto@comfortstudio.pe" className="text-sm text-crema/90 hover:text-white transition-colors flex items-center gap-2">
                    contacto@comfortstudio.pe
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-terracota">↗</span>
                  </a>
                </div>
                <div>
                  <p className="text-[0.65rem] text-crema/40 uppercase tracking-wider mb-1">Ubicación</p>
                  <p className="text-sm text-crema/90">
                    Lima, Perú
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <p className="text-xs text-crema/40">
                © {year} Comfort Studio.
              </p>
              <span className="hidden md:block text-crema/20">|</span>
              <div className="flex gap-6">
                <Link href="/privacidad" className="text-xs text-crema/40 hover:text-crema transition-colors">Política de Privacidad</Link>
                <Link href="/terminos" className="text-xs text-crema/40 hover:text-crema transition-colors">Términos y Condiciones</Link>
              </div>
            </div>

            <p className="text-xs text-crema/40 flex items-center gap-1">
              Design by <a href="https://github.com/aldonovar" target="_blank" rel="noreferrer" className="text-crema/60 hover:text-white transition-colors font-medium">ALLYX</a>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
