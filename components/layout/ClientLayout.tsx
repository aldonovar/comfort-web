"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import Preloader from "./Preloader";
import FloatingCTA from "../ui/FloatingCTA";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "../providers/ThemeProvider";

const Scene = dynamic(() => import("../canvas/Scene"), { ssr: false });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
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

                <Analytics />
            </ThemeProvider>
        </ReactLenis>
    );
}
