// app/cotiza/page.js

import { Suspense } from "react";
import Cotiza from "../../components/sections/Cotiza";

export default function CotizaPage() {
  return (
    <main className="bg-(--bg-primary) min-h-screen">
      <Suspense
        fallback={
          <section
            id="cotiza"
            className="flex items-center justify-center min-h-screen bg-(--bg-primary) text-(--text-primary)"
          >
            <div className="text-center">
              <p className="tracking-[0.22em] text-[0.7rem] uppercase animate-pulse">
                Cargando Concierge...
              </p>
            </div>
          </section>
        }
      >
        <Cotiza isPage={true} />
      </Suspense>
    </main>
  );
}
