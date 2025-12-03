// app/servicios/[slug]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "../serviceData";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

interface ServiceDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const service = services.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  const { name, category, heroTagline, longDescription, idealFor, includes, specs } =
    service;

  return (
    <section className="min-h-screen bg-crema py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* Breadcrumb / encabezado */}
        <div className="space-y-4">
          <nav className="text-[0.75rem] text-madera/60 flex flex-wrap gap-1">
            <Link
              href="/"
              className="hover:text-madera underline underline-offset-2 decoration-madera/40 hover:decoration-madera"
            >
              Inicio
            </Link>
            <span>/</span>
            <Link
              href="/servicios"
              className="hover:text-madera underline underline-offset-2 decoration-madera/40 hover:decoration-madera"
            >
              Servicios
            </Link>
            <span>/</span>
            <span className="text-madera/80">{name}</span>
          </nav>

          <div className="grid gap-6 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
            <div className="space-y-3">
              <p className="text-[0.75rem] uppercase tracking-[0.28em] text-madera/60">
                {category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl">{name}</h1>
              <p className="text-sm md:text-base text-madera/80 max-w-2xl">
                {heroTagline}
              </p>
            </div>

            {/* CTAs principales */}
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href={`/?tipo=${encodeURIComponent(name)}#cotiza`}
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-madera text-crema text-[0.78rem] font-semibold tracking-[0.2em] uppercase hover:bg-madera/90 transition-colors"
              >
                Cotizar este servicio
              </Link>
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2 rounded-full border border-madera/30 px-5 py-2 text-[0.75rem] uppercase tracking-[0.18em] text-madera/80 hover:bg-madera hover:text-crema transition-colors"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-madera/5">
                  {/* icono mini calendario */}
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M7 2.75a.75.75 0 0 1 .75.75V5h8.5V3.5a.75.75 0 0 1 1.5 0V5h.5A2.75 2.75 0 0 1 21 7.75v9.5A2.75 2.75 0 0 1 18.25 20H5.75A2.75 2.75 0 0 1 3 17.25v-9.5A2.75 2.75 0 0 1 5.75 5h.5V3.5A.75.75 0 0 1 7 2.75Zm11 8.5H6v6a1.25 1.25 0 0 0 1.25 1.25h9.5A1.25 1.25 0 0 0 18 17.25v-6Zm-9.25 1.5h2.5a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0V14H8.5a.75.75 0 0 1 0-1.5Z"
                    />
                  </svg>
                </span>
                <span>Agendar reunión virtual</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] items-start">
          {/* Columna izquierda: descripción, para quién es, incluye */}
          <div className="space-y-8">
            <section className="space-y-3">
              <h2 className="text-sm md:text-base font-semibold text-madera">
                Cómo pensamos este tipo de servicio
              </h2>
              <p className="text-sm md:text-base text-madera/80 leading-relaxed">
                {longDescription}
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm md:text-base font-semibold text-madera">
                ¿Para quién tiene más sentido?
              </h3>
              <ul className="space-y-1.5 text-sm text-madera/80">
                {idealFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-[5px] w-[5px] rounded-full bg-terracota/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-sm md:text-base font-semibold text-madera">
                Qué suele incluir este servicio
              </h3>
              <ul className="space-y-1.5 text-sm text-madera/80">
                {includes.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-[5px] w-[5px] rounded-full bg-madera/70" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-[0.75rem] text-madera/60 pt-1">
                El alcance final se define en función de tu espacio, reglamento
                del edificio y presupuesto. Esta lista sirve como referencia
                inicial.
              </p>
            </section>
          </div>

          {/* Columna derecha: ficha técnica / specs */}
          <aside className="space-y-4">
            <div className="rounded-3xl border border-madera/15 bg-white/90 shadow-[0_18px_60px_rgba(0,0,0,0.08)] p-5">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-madera/60 mb-2">
                Ficha del servicio
              </p>
              <dl className="space-y-3 text-sm text-madera/85">
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-madera/60">
                    Rango de metros trabajados
                  </dt>
                  <dd>{specs.rangoMetros}</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-madera/60">
                    Tipo de obra
                  </dt>
                  <dd>{specs.tipoObra}</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-madera/60">
                    Duración estimada
                  </dt>
                  <dd>{specs.duracion}</dd>
                </div>
                <div>
                  <dt className="text-[0.7rem] uppercase tracking-[0.2em] text-madera/60">
                    Inversión
                  </dt>
                  <dd>{specs.inversion}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-madera/15 bg-white/80 p-4 text-[0.8rem] text-madera/75 space-y-2">
              <p>
                Durante una llamada o reunión virtual, usamos esta ficha como
                base para aterrizar metros, fases de trabajo y prioridades. Así
                definimos si tiene más sentido empezar por diseño, por obra o
                por un piloto más pequeño.
              </p>
              <Link
                href={`/?tipo=${encodeURIComponent(name)}#cotiza`}
                className="inline-flex items-center gap-2 rounded-full border border-madera/30 px-4 py-1.5 uppercase tracking-[0.18em] text-[0.75rem] text-madera/85 hover:bg-madera hover:text-crema transition-colors"
              >
                Empezar resumen de cotización
                <span className="text-xs translate-y-[1px]">↗</span>
              </Link>
            </div>

            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 text-[0.78rem] text-madera/70 hover:text-madera underline underline-offset-2 decoration-madera/40 hover:decoration-madera"
            >
              ← Volver al listado de servicios
            </Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
