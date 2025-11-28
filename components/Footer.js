import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      ),
    },
    {
      name: "TikTok",
      href: "https://tiktok.com",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "#",
      status: "Próximamente",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
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
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">

            {/* Brand Column */}
            <div className="md:col-span-4 space-y-6">
              <div className="flex flex-col">
                <span className="font-serif text-2xl text-crema leading-none tracking-wide">
                  Comfort Studio
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.3em] text-crema/50 mt-1">
                  Outdoor Living
                </span>
              </div>
              <p className="text-sm text-crema/70 leading-relaxed max-w-xs font-light">
                Estudio especializado en diseño y ejecución de terrazas, azoteas y
                patios habitables en Lima. Proyectos pensados para vivir el
                exterior con la misma calidad que el interior.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target={social.href !== "#" ? "_blank" : undefined}
                    rel="noreferrer"
                    className={`group relative flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-white/5 transition-all duration-300 ${social.status ? "cursor-default opacity-50" : "hover:bg-terracota hover:border-terracota hover:text-white"
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

            {/* Navigation Column */}
            <div className="md:col-span-2 md:col-start-6 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-terracota">
                Explorar
              </h4>
              <nav className="flex flex-col gap-3">
                {["Inicio", "Servicios", "Proyectos", "Cotiza", "Contacto"].map((item) => (
                  <a
                    key={item}
                    href={`/${item.toLowerCase() === "inicio" ? "" : item.toLowerCase()}`}
                    className="text-sm text-crema/60 hover:text-crema transition-colors w-fit"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Services Column */}
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-terracota">
                Servicios
              </h4>
              <nav className="flex flex-col gap-3">
                {[
                  "Terraza de Departamento",
                  "Azotea Completa",
                  "Patio Interior",
                  "Terraza Corporativa",
                  "Proyecto Integral"
                ].map((item) => (
                  <a
                    key={item}
                    href="#"
                    className="text-sm text-crema/60 hover:text-crema transition-colors w-fit"
                  >
                    {item}
                  </a>
                ))}
              </nav>
            </div>

            {/* Contact Column */}
            <div className="md:col-span-3 space-y-6">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-terracota">
                Contacto
              </h4>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-crema/40 uppercase tracking-wider mb-1">WhatsApp</p>
                  <a href="https://wa.me/51936230958" className="text-sm text-crema/80 hover:text-white transition-colors">
                    +51 936 230 958
                  </a>
                </div>
                <div>
                  <p className="text-xs text-crema/40 uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:contacto@comfortstudio.pe" className="text-sm text-crema/80 hover:text-white transition-colors">
                    contacto@comfortstudio.pe
                  </a>
                </div>
                <div>
                  <p className="text-xs text-crema/40 uppercase tracking-wider mb-1">Ubicación</p>
                  <p className="text-sm text-crema/80">
                    Lima, Perú
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-crema/40">
              © {year} Comfort Studio. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-crema/40 hover:text-crema transition-colors">Privacidad</a>
              <a href="#" className="text-xs text-crema/40 hover:text-crema transition-colors">Términos</a>
              <p className="text-xs text-crema/40">
                By <a href="https://github.com/aldonovar" target="_blank" rel="noreferrer" className="hover:text-crema transition-colors">ALLYX</a>
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
