"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const services = [
  {
    id: "techo-sol-sombra",
    slug: "techo-sol-y-sombra",
    title: "Techo sol y sombra",
    tag: "Control de luz y clima",
    description:
      "Estructuras ligeras que protegen del sol directo y la lluvia, sin perder la sensación de exterior.",
    bullets: [
      "Estructuras metálicas o de madera según el contexto",
      "Lamas fijas o móviles según orientación",
      "Preparado para iluminación e instalaciones futuras",
    ],
    projectTypeLabel: "Techo sol y sombra",
  },
  {
    id: "diseno-ejecucion-terraza",
    slug: "diseno-ejecucion-terraza",
    title: "Diseño y ejecución de proyecto de terraza",
    tag: "Proyecto integral",
    description:
      "Desde el primer boceto hasta la última luz encendida: un solo equipo se encarga de todo.",
    bullets: [
      "Diagnóstico del espacio y del uso esperado",
      "Planos, vistas y definición de materiales",
      "Supervisión de obra hasta la entrega final",
    ],
    projectTypeLabel: "Diseño y ejecución de proyecto de terraza",
  },
  {
    id: "estacion-parrilla",
    slug: "proyecto-estacion-parrilla",
    title: "Proyecto estación de parrilla",
    tag: "Outdoor kitchen",
    description:
      "Parrilla, barra y apoyo de cocina exterior pensados para reuniones frecuentes y cómodas.",
    bullets: [
      "Diseño de parrilla y mesadas según el tipo de uso",
      "Zonificación de preparación, cocción y servicio",
      "Materiales fáciles de limpiar y mantener",
    ],
    projectTypeLabel: "Proyecto estación de parrilla",
  },
  {
    id: "otros-proyectos",
    slug: "proyecto-aire-libre-medida",
    title: "Otro tipo de proyecto al aire libre",
    tag: "A medida",
    description:
      "Fogateros, lounges, decks, pérgolas especiales y soluciones que salen de lo estándar.",
    bullets: [
      "Diseños a medida según el terreno",
      "Integración con arquitectura existente",
      "Opciones por fases según presupuesto",
    ],
    projectTypeLabel: "Otro tipo de proyecto al aire libre",
  },
];

const steps = [
  {
    id: "diagnostico",
    label: "01 · Diagnóstico",
    title: "Leemos el espacio y cómo lo quieres usar.",
    text: "Analizamos vistas, orientación del sol, vientos, estructuras existentes y normativa del edificio. El objetivo: entender qué es posible sin promesas vacías.",
  },
  {
    id: "concepto",
    label: "02 · Concepto",
    title: "Definimos la idea guía de tu terraza.",
    text: "No es solo elegir muebles. Diseñamos cómo se vive: recorridos, zonas de estar, parrilla, barra, vegetación e iluminación como un solo sistema.",
  },
  {
    id: "detalle",
    label: "03 · Detalle y materiales",
    title: "Elegimos materiales que envejecen bien.",
    text: "Pisos, cubiertas, luminarias y herrajes pensados para exterior peruano, minimizando mantenimiento y maximizando sensación de calidad.",
  },
  {
    id: "ejecucion",
    label: "04 · Ejecución y entrega",
    title: "De la obra al primer encuentro en tu terraza.",
    text: "Coordinamos con edificio, proveedores y tiempos de obra. Entregamos el espacio listo: limpio, iluminado y preparado para ser vivido.",
  },
];

export default function Servicios() {
  const [activeStep, setActiveStep] = useState(0);

  const sectionRef = useRef(null);
  const cardsRef = useRef<HTMLElement[]>([]);
  const stickyRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<HTMLElement[]>([]);

  // Tilt 3D / parallax en las tarjetas
  const handleCardMouseMove = (index: number, event: React.MouseEvent<HTMLElement>) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(card, {
      rotateX,
      rotateY,
      y: -6,
      duration: 0.22,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      y: 0,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  // Observador para activar cada paso y animar el panel sticky
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (entry.target as HTMLElement).dataset.index) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setActiveStep(idx);

            const inner = stickyRef.current?.querySelector(".sticky-inner");
            if (inner) {
              gsap.fromTo(
                inner,
                { y: 16, opacity: 0.85 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.45,
                  ease: "power2.out",
                }
              );
            }
          }
        });
      },
      {
        threshold: 0.45,
      }
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // GSAP + ScrollTrigger – timings unificados
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const ease = "power3.out";

      // Header
      gsap.from(".services-header", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Grid completo
      gsap.from(".services-grid", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease,
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          once: true,
        },
      });

      // Cards individuales
      gsap.from(".service-card-shell", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 82%",
          once: true,
        },
      });

      // Panel sticky
      gsap.from(".services-sticky-shell", {
        y: 32,
        opacity: 0,
        duration: 0.9,
        ease,
        scrollTrigger: {
          trigger: ".services-process",
          start: "top 85%",
          once: true,
        },
      });

      // Steps
      gsap.from(".services-step-card", {
        y: 22,
        opacity: 0,
        duration: 0.7,
        ease,
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".services-process",
          start: "top 80%",
          once: true,
        },
      });

      // Fondo parallax sutil
      ScrollTrigger.create({
        trigger: ".services-process",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".services-process-bg", {
            y: self.progress * -30,
            ease: "none",
          });
        },
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Click de "Cotizar este servicio" con tipo preseleccionado
  const handleCotizarServicio = (projectTypeLabel: string) => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tipo", projectTypeLabel);
      window.history.replaceState({}, "", url.toString());

      const section = document.getElementById("cotiza");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="relative py-20 bg-crema overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-14">
        {/* Encabezado */}
        <div className="services-header space-y-3 max-w-3xl">
          <p className="text-xs tracking-[0.32em] uppercase text-madera/50">
            Servicios
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Un sistema de servicios para distintos tipos de terraza.
          </h2>
          <p className="text-sm md:text-base text-madera/70">
            No vendemos “un único paquete”. Leemos tu espacio, tu forma de
            vivirlo y el tipo de inversión que tiene sentido hoy para ti.
          </p>
        </div>

        {/* GRID 3D DE SERVICIOS */}
        <div className="services-grid grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="service-card-shell group [perspective:1400px]"
            >
              <article
                ref={(el) => { if (el) cardsRef.current[index] = el; }}
                onMouseMove={(e) => handleCardMouseMove(index, e)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                className="relative h-full rounded-3xl border border-madera/10 bg-white/80 p-5 shadow-xl transition-shadow duration-300 group-hover:shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-terracota/8 via-transparent to-madera/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ transform: "translateZ(-1px)" }}
                />

                <div className="relative z-10 flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-madera/5 text-[0.65rem] uppercase tracking-[0.18em] text-madera/70">
                      {service.tag}
                    </span>
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-2xl bg-madera text-crema text-[0.65rem] font-semibold shadow-lg shadow-madera/40">
                      3D
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg">{service.title}</h3>

                  <p className="text-sm text-madera/75">
                    {service.description}
                  </p>

                  <ul className="mt-1 text-xs text-madera/70 space-y-1.5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-[4px] h-[5px] w-[5px] rounded-full bg-terracota/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Mini CTA */}
                  <div className="pt-3 flex flex-col gap-2 text-[0.72rem] sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleCotizarServicio(service.projectTypeLabel)
                        }
                        className="inline-flex items-center gap-2 rounded-full border border-madera/25 bg-madera/5 px-4 py-1.5 uppercase tracking-[0.18em] text-madera/80 hover:bg-madera/90 hover:text-crema hover:border-madera/90 transition-colors"
                      >
                        <span>Cotizar este servicio</span>
                        <span className="text-xs">↗</span>
                      </button>

                      <Link
                        href={`/servicios/${service.slug}`}
                        className="inline-flex items-center gap-2 rounded-full border border-madera/20 bg-white/60 px-4 py-1.5 uppercase tracking-[0.18em] text-madera/80 hover:bg-madera hover:text-crema hover:border-madera/80 transition-colors"
                      >
                        <span>Ver detalle</span>
                        <span className="text-xs">↗</span>
                      </Link>
                    </div>

                    <span className="text-madera/50">
                      Tipo: {service.projectTypeLabel}
                    </span>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>

        {/* BLOQUE STICKY / SCROLL */}
        <div className="services-process relative mt-6">
          <div className="services-process-bg pointer-events-none absolute inset-y-[-40px] -left-10 -right-10 bg-gradient-to-br from-madera/6 via-transparent to-terracota/10" />

          <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1.2fr] items-start">
            {/* Panel sticky */}
            <div className="services-sticky-shell relative">
              <div ref={stickyRef} className="sticky top-24">
                <div className="sticky-inner relative overflow-hidden rounded-[32px] bg-madera text-crema border border-black/40 shadow-[0_22px_70px_rgba(0,0,0,0.8)] px-6 py-7">
                  <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[28px]" />
                  <div className="absolute left-1/2 -translate-x-1/2 -top-3 h-6 w-28 rounded-full bg-black/80 border border-white/10" />

                  <div className="relative z-10 space-y-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.26em] text-crema/65">
                      Vista previa de cómo explicas el servicio
                    </p>
                    <h3 className="font-serif text-xl md:text-2xl">
                      {steps[activeStep].title}
                    </h3>
                    <p className="text-sm text-crema/80">
                      {steps[activeStep].text}
                    </p>

                    <div className="grid grid-cols-3 gap-3 pt-3 text-[0.7rem] text-crema/75">
                      <div>
                        <p className="uppercase tracking-[0.18em] text-crema/60">
                          Paso
                        </p>
                        <p>{steps[activeStep].label}</p>
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.18em] text-crema/60">
                          Foco
                        </p>
                        <p>
                          {activeStep === 0 && "Espacio"}
                          {activeStep === 1 && "Concepto"}
                          {activeStep === 2 && "Materiales"}
                          {activeStep === 3 && "Entrega"}
                        </p>
                      </div>
                      <div>
                        <p className="uppercase tracking-[0.18em] text-crema/60">
                          Duración
                        </p>
                        <p>
                          {activeStep === 0 && "1 visita"}
                          {activeStep === 1 && "1–2 reuniones"}
                          {activeStep === 2 && "Según alcance"}
                          {activeStep === 3 && "Obra pactada"}
                        </p>
                      </div>
                    </div>

                    <p className="text-[0.7rem] text-crema/60 pt-2">
                      A medida que haces scroll, esta “maqueta digital” cambia
                      para acompañar la explicación al cliente, igual que en las
                      webs de dispositivos electrónicos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-6">
              <p className="text-xs tracking-[0.28em] uppercase text-madera/60">
                Cómo se ve trabajar con Comfort Studio
              </p>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    ref={(el) => { if (el) stepRefs.current[index] = el; }}
                    data-index={index}
                    className={`services-step-card rounded-2xl border px-4 py-4 md:px-5 md:py-5 transition-all duration-300 ${activeStep === index
                      ? "border-madera/80 bg-madera/5 shadow-lg shadow-madera/15"
                      : "border-madera/15 bg-white/60"
                      }`}
                  >
                    <p
                      className={`text-[0.72rem] uppercase tracking-[0.22em] mb-1 ${activeStep === index
                        ? "text-madera/80"
                        : "text-madera/55"
                        }`}
                    >
                      {step.label}
                    </p>
                    <h4 className="text-sm md:text-base font-semibold mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs md:text-sm text-madera/75">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-[0.7rem] text-madera/60">
                Esta sección está pensada para que, durante la presentación, el
                cliente entienda que no está comprando solo un “techo”, sino un
                proceso completo de diseño y ejecución.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
