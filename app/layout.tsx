"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/layout/PageTransition";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Preloader from "../components/layout/Preloader";
import FloatingCTA from "../components/ui/FloatingCTA";


const Scene = dynamic(() => import("../components/canvas/Scene"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <title>Comfort Studio | Arquitectura de Terrazas</title>
        <meta
          name="description"
          content="Especialistas en diseño y ejecución de terrazas, azoteas y patios en Lima. Transformamos espacios en experiencias de vida."
        />
        <link rel="icon" href="/favicon.ico" />
        {/* Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased bg-crema text-madera selection:bg-terracota selection:text-white">
        {/* Tuned for "Luxury" feel: heavier than native, but controllable */}
        <ReactLenis root options={{ lerp: 0.07, duration: 1.2, smoothWheel: true }}>

          <Preloader />
          <Navbar />
          <FloatingCTA />

          {/* Global 3D Scene */}
          <Suspense fallback={null}>
            <Scene style={{ pointerEvents: 'none' }} />
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
      </body>
    </html>
  );
}
