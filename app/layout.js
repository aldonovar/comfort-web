"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import SmoothScroller from "../components/SmoothScroller";
import FloatingCTA from "../components/FloatingCTA";
import Preloader from "../components/Preloader";

const Scene = dynamic(() => import("../components/canvas/Scene"), { ssr: false });

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Comfort Studio | Arquitectura de Terrazas</title>
        <meta
          name="description"
          content="Especialistas en diseño y ejecución de terrazas, azoteas y patios en Lima. Transformamos espacios en experiencias de vida."
        />
        <link rel="icon" href="/favicon.ico" />

        {/* Tailwind via CDN (Restored for immediate fix) */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      crema: '#f2f0e9',
                      madera: '#2a2522',
                      terracota: '#c16e4d',
                      olive: '#4a4a38',
                      charcoal: '#1a1a1a',
                    },
                    fontFamily: {
                      sans: ['Inter', 'system-ui', 'sans-serif'],
                      serif: ['Playfair Display', 'serif'],
                    },
                    backgroundImage: {
                        'noise': "url('https://grainy-gradients.vercel.app/noise.svg')",
                    }
                  }
                }
              }
            `,
            < Scene />
          </Suspense>

      <PageTransition>
        <main className="relative z-10 min-h-screen">
          {children}
        </main>
      </PageTransition>
      <Footer />

      {/* Global Noise Overlay */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </ReactLenis>
      </body >
    </html >
  );
}
