"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function EstiloPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".reveal-text",
                    start: "top 80%"
                }
            });
        }, containerRef);


        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <main ref={containerRef} className="bg-[var(--bg-primary)] min-h-screen text-[var(--text-primary)] pt-32 pb-24">
            <div className="max-w-5xl mx-auto px-6">
                <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">
                    Nuestra Firma
                </span>
                <h1 className="font-serif text-6xl md:text-8xl mb-12 reveal-text">
                    Minimalismo <br /> <span className="italic text-[var(--text-primary)]/50">Cálido</span>
                </h1>

                <div className="grid md:grid-cols-2 gap-12 items-start mb-24">
                    <p className="text-lg leading-relaxed reveal-text">
                        Creemos en la arquitectura que no grita, sino que susurra. Espacios limpios, líneas puras, pero imbuidos de la calidez de los materiales naturales.
                    </p>
                    <p className="text-lg leading-relaxed reveal-text text-[var(--text-primary)]/70">
                        La madera, la piedra y la luz son nuestros pinceles. Buscamos el equilibrio perfecto entre la sofisticación moderna y la comodidad atemporal.
                    </p>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-sm mb-24 reveal-text">
                    <Image
                        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2700&auto=format&fit=crop"
                        alt="Estilo Comfort"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </main>
    );
}
