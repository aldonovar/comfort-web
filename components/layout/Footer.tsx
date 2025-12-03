import ScrollReveal from "../ui/ScrollReveal";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/comfortstudiop/",
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
      href: "https://www.facebook.com/comfortstudioperu",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://www.tiktok.com/@comfortstudio7",
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
    {
      name: "WhatsApp",
      href: "https://wa.me/51919693180",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
        </svg>
      ),
    },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-crema border-t border-white/5 relative overflow-hidden">
      {/* Background Noise Texture */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      <ScrollReveal animation="fade-up" duration={0.8} threshold="90%">
        {/* Added pb-24 to prevent overlap with floating CTA button */}
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-20 pb-24 relative z-10">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

            {/* 1. Brand Column */}
            <div className="space-y-8">
              <Link href="/" className="flex items-center gap-3 group">
                <img
                  src="/comfort-logo-light.png"
                  alt="Comfort Studio Logo"
                  className="h-10 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
                <span className="font-serif text-xl tracking-wide text-crema opacity-90 group-hover:opacity-100 transition-opacity">
                  COMFORT STUDIO
                </span>
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
                  "Techo sol y sombra",
                  "Diseño y ejecución de proyecto de terraza",
                  "Proyecto Estación de parrilla",
                  "Otro tipo de proyecto al aire libre"
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
                  <a href="https://wa.me/51919693180" className="text-sm text-crema/90 hover:text-white transition-colors flex items-center gap-2">
                    +51 919 693 180
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

            <p className="text-[0.65rem] uppercase tracking-widest text-crema/40 flex items-center gap-1">
              Experiencia digital desarrollada por <a href="https://allyxorb.com" target="_blank" rel="noreferrer" className="text-crema/60 hover:text-white transition-colors font-bold ml-1">ALLYX</a>
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
