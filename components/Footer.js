import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b0908] text-crema text-[0.75rem] border-t border-crema/10">
      <ScrollReveal animation="fade-up" duration={0.8} threshold="90%">
        <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
          {/* Fila principal */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Columna 1: marca */}
            <div className="space-y-3 max-w-sm">
              <p className="text-xs tracking-[0.28em] uppercase text-crema/60">
                Comfort Studio
              </p>
              <p className="text-[0.8rem] text-crema/80">
                Estudio especializado en diseño y ejecución de terrazas, azoteas y
                patios habitables en Lima. Proyectos pensados para vivir el
                exterior con la misma calidad que el interior.
              </p>
            </div>

            {/* Columna 2: navegación rápida */}
            <div className="space-y-3">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-crema/60">
                Navegación
              </p>
              <nav className="flex flex-wrap gap-2 md:flex-col">
                <a
                  href="#inicio"
                  className="inline-flex items-center gap-1 text-crema/80 hover:text-crema transition-colors"
                >
                  <span>Inicio</span>
                </a>
                <a
                  href="#servicios"
                  className="inline-flex items-center gap-1 text-crema/80 hover:text-crema transition-colors"
                >
                  <span>Servicios</span>
                </a>
                <a
                  href="#proyectos"
                  className="inline-flex items-center gap-1 text-crema/80 hover:text-crema transition-colors"
                >
                  <span>Proyectos</span>
                </a>
                <a
                  href="#estudio"
                  className="inline-flex items-center gap-1 text-crema/80 hover:text-crema transition-colors"
                >
                  <span>Estudio</span>
                </a>
                <a
                  href="#cotiza"
                  className="inline-flex items-center gap-1 text-crema/80 hover:text-crema transition-colors"
                >
                  <span>Cotiza</span>
                </a>
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-1 text-crema/80 hover:text-crema transition-colors"
                >
                  <span>Contacto</span>
                </a>
              </nav>
            </div>

            {/* Columna 3: contacto / operación */}
            <div className="space-y-3 max-w-xs">
              <p className="text-[0.7rem] uppercase tracking-[0.2em] text-crema/60">
                Contacto y zona
              </p>
              <div className="space-y-1.5">
                <p className="text-crema/85">
                  WhatsApp:{" "}
                  <a
                    href="https://wa.me/51936230958"
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-2 decoration-crema/50 hover:decoration-crema"
                  >
                    +51 936 230 958
                  </a>
                </p>
                <p className="text-crema/80">
                  Correo:{" "}
                  <a
                    href="mailto:contacto@comfortstudio.pe"
                    className="underline underline-offset-2 decoration-crema/50 hover:decoration-crema"
                  >
                    contacto@comfortstudio.pe
                  </a>
                </p>
                <p className="text-crema/70">
                  Operamos en Lima Metropolitana y alrededores, coordinando con
                  reglamentos de edificios y tiempos de obra.
                </p>
              </div>
            </div>
          </div>

          {/* Línea inferior */}
          <div className="border-t border-crema/10 pt-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="text-[0.7rem] text-crema/70">
              © {year} Comfort Studio. Todos los derechos reservados.
            </p>
            <p className="text-[0.7rem] text-crema/60">
              Experiencia digital por{" "}
              <a
                href="https://github.com/aldonovar"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 decoration-crema/40 hover:decoration-crema"
              >
                ALLYX
              </a>
              .
            </p>
          </div>
        </div>
      </ScrollReveal>
    </footer>
  );
}
