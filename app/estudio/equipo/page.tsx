"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
    {
        name: "Arq. Principal",
        role: "Director Creativo",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
    },
    {
        name: "Arq. Senior",
        role: "Jefe de Proyectos",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
    },
    {
        name: "Diseñador",
        role: "Interiorismo",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop"
    }
];

export default function EquipoPage() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".team-card", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: ".team-grid",
                    start: "top 80%"
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <main ref={containerRef} className="bg-black min-h-screen text-white pt-32 pb-24">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-24">
                    <span className="block text-terracota text-xs tracking-[0.3em] uppercase font-bold mb-6">
                        Mentes Creativas
                    </span>
                    <h1 className="font-serif text-6xl md:text-8xl mb-8">
                        El Equipo
                    </h1>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Un colectivo de apasionados por el detalle. Cada proyecto es el resultado de la colaboración entre arquitectos, diseñadores y artesanos.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 team-grid">
                    {TEAM.map((member, i) => (
                        <div key={i} className="team-card group">
                            <div className="relative aspect-3/4 overflow-hidden rounded-sm mb-6 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-serif text-2xl mb-1">{member.name}</h3>
                            <p className="text-terracota text-xs uppercase tracking-widest">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
