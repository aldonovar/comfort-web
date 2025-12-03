"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";

// Dynamically import ProjectImage to avoid SSR issues with R3F
const ProjectImage = dynamic(
  () => import("../components/canvas/ProjectImage"),
  { ssr: false }
);

const PROJECTS = [
  {
    id: "azotea-barranco",
    name: "Azotea social en Barranco",
    type: "residencial",
    service: "Diseño y ejecución de proyecto de terraza",
    surface: "48 m²",
    location: "Barranco, Lima",
    summary:
      "Rooftop con barra, comedor exterior y techo sol y sombra pensado para reuniones nocturnas frecuentes.",
    tags: ["After office en casa", "Vista urbana", "Techo sol y sombra"],
    image: "https://images.pexels.com/photos/2599537/pexels-photo-2599537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "terraza-miraflores",
    name: "Terraza de departamento en Miraflores",
    type: "residencial",
    service: "Techo sol y sombra + ambientación",
    surface: "22 m²",
    location: "Miraflores, Lima",
    summary:
      "Terraza compacta donde el control de luz, la iluminación cálida y el mobiliario a medida permiten usarla todo el día.",
    tags: ["Espacio compacto", "Control de luz", "Uso diario"],
    image: "https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "rooftop-san-isidro",
    name: "Rooftop corporativo en San Isidro",
    type: "corporativo",
    service: "Terraza corporativa para equipo comercial",
    surface: "95 m²",
    location: "San Isidro, Lima",
    summary:
      "Rooftop para equipo comercial con áreas de reunión informal, barra, vegetación y puntos de trabajo exterior.",
    tags: ["Equipo comercial", "Reuniones informales", "Identidad de marca"],
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "patio-la-molina",
    name: "Patio familiar en La Molina",
    type: "residencial",
    service: "Proyecto integral: terraza + patio",
    surface: "60 m²",
    location: "La Molina, Lima",
    summary:
      "Patio con zona de parrilla, sala exterior y área de juego suave para niños, resuelto como extensión de la sala.",
    tags: ["Familias", "Zona de juego", "Parrilla central"],
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "terraza-surco",
    name: "Terraza longitudinal en Surco",
    type: "residencial",
    service: "Rediseño de terraza existente",
    surface: "28 m²",
    location: "Santiago de Surco, Lima",
    summary:
      "Terraza en forma de pasillo convertida en recorrido habitable con nichos de estar, iluminación y vegetación.",
    tags: ["Espacio difícil", "Recorrido habitable", "Vegetación"],
    image: "https://images.pexels.com/photos/2883049/pexels-photo-2883049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const FILTERS = [
  { id: "todos", label: "Todos los proyectos" },
  { id: "residencial", label: "Residenciales" },
  { id: "corporativo", label: "Corporativos" },
];

export default function Proyectos() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);

  const [filter, setFilter] = useState("todos");
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  const filtered = PROJECTS.filter(
    (p) => filter === "todos" || p.type === filter
  );

  const activeProject =
    filtered.find((p) => p.id === activeId) ?? filtered[0] ?? PROJECTS[0];

  // Si cambias el filtro y el activo ya no está en la lista, reasigna
  useEffect(() => {
    if (!filtered.some((p) => p.id === activeId) && filtered[0]) {
      setActiveId(filtered[0].id);
    }
  }, [filter, activeId, filtered]);

  // Animaciones de entrada + scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header
      const headerAnim = gsap.from(".projects-header", {
        y: 26,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 80%",
        animation: headerAnim,
        once: true,
      });

      // Stats / filtros
      gsap.from(".projects-meta", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-meta",
          start: "top 85%",
          once: true,
        },
      });

      // Card inicial
      gsap.from(".projects-preview-card", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".projects-preview-card",
          start: "top 85%",
          once: true,
        },
      });

      // Lista de proyectos
      gsap.set(".project-card", {
        y: 40,
        opacity: 0,
      });

      ScrollTrigger.batch(".project-card", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
          });
        },
      });

      // Parallax suave del fondo
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".projects-bg", {
            y: self.progress * -30,
            ease: "none",
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Tilt 3D del panel en desktop
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!cardRef.current) return;

    const el = cardRef.current;

    const handleMove = (e: any) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateY: x * 10,
        rotateX: -y * 8,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    const enable = () => window.innerWidth >= 1024;

    const setup = () => {
      if (enable()) {
        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
      } else {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
        gsap.set(el, { rotateX: 0, rotateY: 0 });
      }
    };

    setup();
    window.addEventListener("resize", setup);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", setup);
    };
  }, []);

  // Transición de contenido al cambiar de proyecto
  useEffect(() => {
    if (!cardRef.current) return;
    const inner = cardRef.current.querySelector(".projects-card-inner");
    if (!inner) return;

    gsap.fromTo(
      inner,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }
    );
  }, [activeProject.id]);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative bg-crema border-t border-madera/10 py-20 lg:py-24 overflow-hidden"
    >
      {/* Fondo con textura / parallax */}
      <div className="projects-bg pointer-events-none absolute inset-y-[-80px] -left-32 -right-32 bg-[radial-gradient(circle_at_top,_rgba(176,115,87,0.2),_transparent_60%),_radial-gradient(circle_at_bottom,_rgba(30,23,19,0.16),_transparent_60%)] opacity-80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-10">
        {/* Encabezado */}
        <header className="projects-header flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4 max-w-2xl">
            <p className="text-xs tracking-[0.32em] uppercase text-madera/55">
              Proyectos
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              Proyectos reales en Lima que aterrizan qué podemos lograr contigo.
            </h2>
            <p className="text-sm md:text-base text-madera/75">
              Más que un catálogo de fotos sueltas, este bloque resume contexto,
              metros, tipo de uso y decisiones clave de cada terraza. Sirve como
              guion visual para conversaciones con el cliente.
            </p>
          </div>

          <div className="projects-meta space-y-3 text-sm md:text-right">
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-madera/60">
              Explora por tipo de proyecto
            </p>
            <div className="flex flex-wrap gap-2 md:justify-end">
              {FILTERS.map((f) => {
                const isActive = f.id === filter;
                return (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFilter(f.id)}
                    className={`rounded-full px-3.5 py-1.5 text-[0.78rem] uppercase tracking-[0.18em] transition-colors border ${isActive
                      ? "bg-madera text-crema border-madera"
                      : "bg-white/70 text-madera/75 border-madera/20 hover:border-madera/50"
                      }`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>
            <p className="text-[0.7rem] text-madera/60">
              Mostrando{" "}
              <span className="font-semibold text-madera">
                {filtered.length} caso{filtered.length !== 1 && "s"}
              </span>{" "}
              {filter === "todos"
                ? "entre terrazas residenciales y corporativas."
                : filter === "residencial"
                  ? "de terrazas residenciales."
                  : "de terrazas corporativas."}
            </p>
          </div>
        </header>

        {/* Layout principal: panel + lista */}
        <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.1fr)] items-start">
          {/* Panel / showroom */}
          <div className="relative lg:h-[78vh]">
            <div className="lg:sticky lg:top-24">
              <div
                ref={cardRef}
                className="projects-preview-card relative rounded-[32px] border border-madera/20 bg-gradient-to-br from-[#1f130e] via-[#24150f] to-[#3a2418] text-crema shadow-[0_28px_90px_rgba(0,0,0,0.75)] px-6 py-7 md:px-8 md:py-9 [transform-style:preserve-3d] overflow-hidden"
              >
                {/* WebGL Image Background */}
                <div className="absolute inset-0 z-0 opacity-40 mix-blend-overlay">
                  <Suspense fallback={null}>
                    <ProjectImage
                      imgUrl={activeProject.image}
                      className="w-full h-full"
                    />
                  </Suspense>
                </div>

                {/* Borde interno */}
                <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/10 opacity-80 z-20" />
                {/* Luces */}
                <div className="pointer-events-none absolute -top-10 right-6 h-28 w-28 rounded-full bg-terracota/40 blur-3xl z-10" />
                <div className="pointer-events-none absolute -bottom-16 left-0 h-32 w-32 rounded-full bg-black/40 blur-3xl z-10" />

                <div className="projects-card-inner relative z-30 flex flex-col gap-6 md:gap-7 h-full">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2 max-w-xl">
                      <p className="text-[0.7rem] uppercase tracking-[0.26em] text-crema/70">
                        {activeProject.type === "corporativo"
                          ? "Proyecto corporativo"
                          : "Proyecto residencial"}
                      </p>
                      <h3 className="font-serif text-2xl md:text-3xl leading-snug">
                        {activeProject.name}
                      </h3>
                      <p className="text-sm md:text-base text-crema/92">
                        {activeProject.summary}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-[0.7rem] text-crema/80">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1 uppercase tracking-[0.18em]">
                        Proyecto{" "}
                        {PROJECTS.findIndex((p) => p.id === activeProject.id) +
                          1}{" "}
                        / {PROJECTS.length}
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-black/70 shadow-lg shadow-black/60 text-[0.65rem] font-semibold">
                        3D
                      </span>
                    </div>
                  </div>

                  {/* Métricas rápidas */}
                  <div className="grid grid-cols-3 gap-3 text-[0.78rem] text-crema/85">
                    <div className="space-y-1">
                      <p className="uppercase tracking-[0.18em] text-crema/65 text-[0.68rem]">
                        Metros trabajados
                      </p>
                      <p className="text-sm font-semibold">
                        {activeProject.surface}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="uppercase tracking-[0.18em] text-crema/65 text-[0.68rem]">
                        Zona
                      </p>
                      <p className="text-sm font-semibold">
                        {activeProject.location}
                      </p>
                    </div>
                    <div className="space-y-1">
                      <p className="uppercase tracking-[0.18em] text-crema/65 text-[0.68rem]">
                        Servicio principal
                      </p>
                      <p className="text-sm font-semibold">
                        {activeProject.service}
                      </p>
                    </div>
                  </div>

                  {/* Tags / sensaciones */}
                  <div className="flex flex-wrap gap-2 text-[0.78rem] text-crema/90">
                    {activeProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-white/8 px-3 py-1 border border-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA suave */}
                  <div className="mt-auto flex flex-wrap gap-3 text-[0.75rem]">
                    <a
                      href="#cotiza"
                      className="inline-flex items-center gap-2 rounded-full bg-crema text-madera px-5 py-2 uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors"
                    >
                      Cotizar un proyecto similar
                      <span className="text-xs translate-y-[1px]">↗</span>
                    </a>
                    <a
                      href="#contacto"
                      className="inline-flex items-center gap-2 rounded-full border border-crema/55 px-5 py-2 uppercase tracking-[0.18em] text-crema hover:bg-crema hover:text-madera transition-colors"
                    >
                      Agendar revisión de espacio
                      <span className="text-xs translate-y-[1px]">↗</span>
                    </a>
                  </div>

                  <p className="text-[0.7rem] text-crema/75 max-w-md pt-1">
                    Durante una reunión, este panel funciona como mapa visual:
                    metros, contexto y qué tipo de decisión toma el estudio en
                    cada caso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Lista / timeline de proyectos */}
          <div className="space-y-5">
            {filtered.map((project) => {
              const isActive = project.id === activeProject.id;
              return (
                <article
                  key={project.id}
                  className={`project-card cursor-pointer rounded-3xl border backdrop-blur-sm px-4 py-4 md:px-5 md:py-5 transition-all ${isActive
                    ? "bg-white/95 border-madera/40 shadow-[0_18px_60px_rgba(0,0,0,0.12)] scale-[1.01]"
                    : "bg-white/75 border-madera/12 hover:border-madera/40 hover:bg-white/95"
                    }`}
                  onMouseEnter={() => setActiveId(project.id)}
                  onFocus={() => setActiveId(project.id)}
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-1">
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-madera/60">
                        {project.type === "corporativo"
                          ? "Proyecto corporativo"
                          : "Proyecto residencial"}
                      </p>
                      <h3 className="font-serif text-lg md:text-xl text-madera">
                        {project.name}
                      </h3>
                      <p className="text-sm text-madera/80 max-w-xl">
                        {project.summary}
                      </p>
                    </div>

                    <div className="flex flex-col items-start md:items-end gap-2 text-[0.78rem] text-madera/75 min-w-[140px]">
                      <div className="flex gap-3 md:flex-col md:items-end md:gap-1">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-madera/5 px-3 py-1">
                          <span className="h-[5px] w-[5px] rounded-full bg-terracota/80" />
                          {project.surface}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-madera/5 px-3 py-1">
                          <span className="h-[5px] w-[5px] rounded-full bg-madera/80" />
                          {project.location}
                        </span>
                      </div>
                      <span className="text-[0.7rem] uppercase tracking-[0.18em] text-madera/60">
                        {project.service}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2 text-[0.78rem] text-madera/75">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-madera/3 px-3 py-1 border border-madera/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Nota final */}
        <p className="text-[0.7rem] text-madera/60 max-w-3xl">
          Cada proyecto puede ampliarse más adelante con fotos, planos, detalles
          técnicos y rangos de inversión aproximados. Para la fase actual, esta
          sección ya funciona como un showroom narrativo que ayuda al cliente a
          imaginar el tipo de resultados que puede esperar del estudio.
        </p>
      </div>
    </section>
  );
}
