import "./globals.css";
import Navbar from "../components/Navbar";
import Preloader from "../components/Preloader";
import SmoothScroller from "../components/SmoothScroller";
import FloatingCTA from "../components/FloatingCTA";
import PageTransition from "../components/PageTransition";
import Footer from "../components/Footer";
import Scene from "../components/canvas/Scene";

export const metadata = {
  title: "Comfort Studio — Arquitectura Exterior",
  description: "Diseño y ejecución de terrazas premium en Lima Metropolitana.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        {/* Tailwind por CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    colors: {
                      crema: '#f9f3ec',
                      terracota: '#b07357',
                      madera: '#1e1713',
                    },
                    fontFamily: {
                      sans: ['system-ui', 'sans-serif'],
                      serif: ['Cormorant Garamond', 'serif'],
                    },
                  }
                }
              }
            `,
          }}
        />
      </head>
      <body className="bg-crema text-madera overflow-x-hidden antialiased">
        <SmoothScroller />
        <Preloader />
        <Navbar />
        <FloatingCTA />

        {/* Global 3D Scene */}
        <Scene />

        <PageTransition>
          <main className="relative z-10 min-h-screen">{children}</main>
        </PageTransition>
        <Footer />
        {/* Textura de ruido sutil */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.06] bg-[url('/noise.png')] mix-blend-soft-light" />
      </body>
    </html>
  );
}
