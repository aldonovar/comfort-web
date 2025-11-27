"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

const WHATSAPP_NUMBER = "51936230958"; // +51 936 230 958

export default function Cotiza() {
  const searchParams = useSearchParams();

  // --- ESTADO DEL FORMULARIO ---
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [finishLevel, setFinishLevel] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [name, setName] = useState("");
  const [contactChannel, setContactChannel] = useState("");
  const [notes, setNotes] = useState("");

  // --- PREFILL DESDE QUERYSTRING (ej: ?tipo=azotea&metros=40&zona=Miraflores) ---
  useEffect(() => {
    if (!searchParams) return;

    const tipo = searchParams.get("tipo");
    const metros = searchParams.get("metros");
    const zona = searchParams.get("zona");
    const origen = searchParams.get("origen");

    if (tipo && !projectType) setProjectType(tipo);
    if (metros && !area) setArea(metros);
    if (zona && !district) setDistrict(zona);
    if (origen && !notes) {
      setNotes((prev) =>
        prev
          ? `${prev}\n\nOrigen del contacto: ${origen}`
          : `Origen del contacto: ${origen}`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // --- RESUMEN EN TIEMPO REAL (para el panel de la derecha) ---
  const isFormReady = useMemo(() => {
    return (
      projectType.trim() &&
      area.trim() &&
      district.trim() &&
      finishLevel.trim() &&
      budgetRange.trim() &&
      name.trim()
    );
  }, [projectType, area, district, finishLevel, budgetRange, name]);

  const liveSummary = useMemo(() => {
    if (!isFormReady) {
      return "Completa los campos principales para que armemos un resumen claro de tu proyecto antes de enviarlo por WhatsApp.";
    }

    const partes = [];

    partes.push(
      `Soy ${name} y quiero trabajar una ${projectType.toLowerCase()} en ${district}.`
    );

    if (area) {
      partes.push(`El área aproximada es de ${area} m².`);
    }

    if (finishLevel) {
      partes.push(`Busco un nivel de acabado ${finishLevel.toLowerCase()}.`);
    }

    if (budgetRange) {
      partes.push(`Mi rango de inversión aproximado es ${budgetRange}.`);
    }

    if (notes) {
      partes.push(`Notas adicionales: ${notes}`);
    }

    return partes.join(" ");
  }, [isFormReady, name, projectType, district, area, finishLevel, budgetRange, notes]);

  // --- SUBMIT → ABRIR WHATSAPP CON MENSAJE ARMADO ---
  const handleSubmit = (e) => {
    e.preventDefault();

    const bloques = [];

    bloques.push(
      `Hola, soy ${name || "____"} y quiero cotizar un proyecto con Comfort Studio.`
    );

    if (projectType) {
      bloques.push(`• Tipo de proyecto: ${projectType}`);
    }

    if (area) {
      bloques.push(`• Área aproximada: ${area} m²`);
    }

    if (district) {
      bloques.push(`• Distrito / zona: ${district}`);
    }

    if (finishLevel) {
      bloques.push(`• Nivel de acabado esperado: ${finishLevel}`);
    }

    if (budgetRange) {
      bloques.push(`• Rango de inversión aproximada: ${budgetRange}`);
    }

    if (contactChannel) {
      bloques.push(`• Mejor canal de contacto: ${contactChannel}`);
    }

    if (notes) {
      bloques.push(`• Notas adicionales: ${notes}`);
    }

    const message = bloques.join("\n");

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      message
    )}`;

    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="cotiza"
      className="relative bg-[#f5eee7] border-y border-madera/10 py-20 lg:py-24 overflow-hidden"
    >
      {/* Luces de fondo suaves */}
      <div className="pointer-events-none absolute -top-32 right-[-40px] h-64 w-64 rounded-full bg-terracota/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-[-40px] h-72 w-72 rounded-full bg-madera/25 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-12">
        {/* HEADER */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4 max-w-2xl">
            <p className="text-[0.72rem] tracking-[0.28em] uppercase text-madera/60">
              Cotiza tu proyecto
            </p>
            <h2 className="font-serif text-3xl md:text-4xl text-madera">
              Cuéntanos cómo es tu terraza ideal y te respondemos con un
              escenario realista.
            </h2>
            <p className="text-sm md:text-base text-madera/75">
              No necesitas tener medidas exactas ni decisiones tomadas. Con este
              resumen podemos entender el contexto de tu espacio, el uso que le
              quieres dar y el rango de inversión que estás considerando.
            </p>
          </div>

          <div className="space-y-2 text-[0.78rem] text-madera/70">
            <p className="uppercase tracking-[0.2em] text-[0.7rem] text-madera/60">
              Tiempo estimado de respuesta
            </p>
            <p>
              <span className="font-semibold text-madera">Dentro de 24 horas</span>{" "}
              en días hábiles. Si es un caso urgente o corporativo, menciónalo en
              las notas.
            </p>
          </div>
        </header>

        {/* LAYOUT PRINCIPAL */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] items-start">
          {/* FORMULARIO */}
          <div className="rounded-3xl bg-white/95 border border-madera/15 shadow-[0_18px_60px_rgba(0,0,0,0.06)] p-5 md:p-7">
            <p className="text-[0.7rem] uppercase tracking-[0.22em] text-madera/60 mb-4">
              Paso a paso · Datos clave del proyecto
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 text-sm">
              {/* BLOQUE 1: ESPACIO */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-madera/65">
                  1 · El espacio
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                      Tipo de proyecto
                    </label>
                    <select
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      required
                      className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                    >
                      <option value="">Selecciona una opción</option>
                      <option>Terraza de departamento</option>
                      <option>Azotea social</option>
                      <option>Patio habitable</option>
                      <option>Terraza corporativa</option>
                      <option>Otro tipo de espacio exterior</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                      Área aproximada (m²)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      required
                      placeholder="Ej. 25"
                      className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                    Distrito / zona
                  </label>
                  <input
                    type="text"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                    placeholder="Ej. Miraflores, Barranco, La Molina..."
                    className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                  />
                </div>
              </div>

              {/* BLOQUE 2: NIVEL Y PRESUPUESTO */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-madera/65">
                  2 · Nivel de acabado e inversión
                </h3>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                      Nivel de acabado esperado
                    </label>
                    <select
                      value={finishLevel}
                      onChange={(e) => setFinishLevel(e.target.value)}
                      required
                      className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                    >
                      <option value="">Selecciona una opción</option>
                      <option>Funcional y cuidado</option>
                      <option>Intermedio (equilibrio diseño / inversión)</option>
                      <option>Alto nivel de detalle</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                      Rango de inversión aproximada
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      required
                      className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                    >
                      <option value="">Prefiero comentarlo / aún no lo tengo</option>
                      <option>S/ 20,000 – 40,000</option>
                      <option>S/ 40,000 – 70,000</option>
                      <option>S/ 70,000 – 120,000</option>
                      <option>Más de S/ 120,000</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                    Cómo imaginas usar el espacio
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Reuniones familiares, after office, parrillas de fin de semana, eventos del equipo, etc."
                    className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] resize-none focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                  />
                </div>
              </div>

              {/* BLOQUE 3: DATOS DE CONTACTO */}
              <div className="space-y-3">
                <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-madera/65">
                  3 · Cómo te contactamos
                </h3>

                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                      Nombre y apellido
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Ej. Ana Torres"
                      className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs uppercase tracking-[0.18em] text-madera/70">
                      WhatsApp / correo preferido
                    </label>
                    <input
                      type="text"
                      value={contactChannel}
                      onChange={(e) => setContactChannel(e.target.value)}
                      placeholder="Ej. +51 9XX XXX XXX o correo"
                      className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2 text-[0.85rem] focus:outline-none focus:border-madera focus:ring-1 focus:ring-madera/30"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <button
                  type="submit"
                  disabled={!isFormReady}
                  className={`inline-flex items-center justify-center rounded-full px-6 py-2.5 text-[0.78rem] font-semibold tracking-[0.22em] uppercase transition-colors ${
                    isFormReady
                      ? "bg-madera text-crema hover:bg-madera/90"
                      : "bg-madera/30 text-crema/70 cursor-not-allowed"
                  }`}
                >
                  Enviar resumen por WhatsApp
                </button>

                <p className="text-[0.7rem] text-madera/60 max-w-xs">
                  Al hacer clic se abrirá WhatsApp con un mensaje redactado.
                  Puedes editarlo antes de enviarlo.
                </p>
              </div>
            </form>
          </div>

          {/* PANEL DE RESUMEN / PREVIEW */}
          <aside className="rounded-3xl bg-madera text-crema shadow-[0_22px_70px_rgba(0,0,0,0.65)] border border-black/40 p-5 md:p-7 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-crema/70">
                  Resumen rápido
                </p>
                <h3 className="font-serif text-xl md:text-2xl">
                  Cómo se ve tu proyecto hasta ahora.
                </h3>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-black/70 text-[0.65rem] font-semibold shadow-lg shadow-black/60">
                Q
              </span>
            </div>

            <div className="rounded-2xl bg-black/30 border border-white/10 p-4 text-[0.78rem] leading-relaxed">
              {liveSummary}
            </div>

            <div className="mt-auto space-y-2 text-[0.72rem] text-crema/80">
              <p className="uppercase tracking-[0.2em] text-crema/65">
                Qué pasa después
              </p>
              <ul className="space-y-1 list-disc pl-4">
                <li>Revisamos el resumen y te respondemos con claridad.</li>
                <li>
                  Si el proyecto encaja con el estudio, proponemos una llamada o
                  visita.
                </li>
                <li>
                  Ajustamos alcance, tiempos y siguientes pasos antes de iniciar
                  cualquier obra.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
