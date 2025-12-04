"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import "./globals.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PageTransition from "../components/layout/PageTransition";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useRef } from "react";
import Preloader from "../components/layout/Preloader";
import FloatingCTA from "../components/ui/FloatingCTA";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


const Scene = dynamic(() => import("../components/canvas/Scene"), { ssr: false });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = lenisRef.current?.lenis;

    if (lenis) {
      // Synchronize Lenis scroll with ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      // Use GSAP's ticker to drive Lenis animations
      // This ensures that ScrollTrigger and Lenis are perfectly in sync
      const update = (time: number) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(update);

      // Disable lag smoothing to prevent jumps
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(update);
        lenis.off('scroll', ScrollTrigger.update);
      };
    }
  }, []);

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
        <ReactLenis
          ref={lenisRef}
          root
          autoRaf={false}
          options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        >

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
