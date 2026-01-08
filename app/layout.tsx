import "./globals.css";
import ClientLayout from "../components/layout/ClientLayout";
import { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Comfort Studio | Arquitectura de Terrazas",
  description: "Especialistas en diseño y ejecución de terrazas, azoteas y patios en Lima. Transformamos espacios en experiencias de vida.",
  icons: {
    icon: "/comfort-logo-light.png", // Using the light logo as favicon
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Fonts are now handled by next/font */}
      </head>
      <body className="antialiased selection:bg-terracota selection:text-white font-sans">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
