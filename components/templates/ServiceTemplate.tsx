"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ServiceTemplateProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    features: string[];
}

export default function ServiceTemplate({ title, subtitle, description, image, features }: ServiceTemplateProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".reveal-text", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            gsap.from(".feature-item", {
                x: -30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".features-list",
                    start: "top 80%"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#0a0a0a] min-h-screen text-white pt-32 pb-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Hero Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <div>
                        <span className="reveal-text block text-terracota text-sm tracking-[0.3em] uppercase font-bold mb-6">
                            {subtitle}
                        </span>
                        <h1 className="reveal-text font-serif text-5xl md:text-7xl leading-tight mb-8">
                            {title}
                        </h1>
                        <p className="reveal-text text-white/60 text-lg leading-relaxed max-w-xl">
                            {description}
                        </p>
                    </div>
                    <div className="relative h-[600px] w-full rounded-2xl overflow-hidden reveal-text">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Features */}
                <div className="features-list grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-item p-8 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="w-2 h-2 bg-terracota rounded-full mb-6" />
                            <p className="text-xl font-serif text-white/90">{feature}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="text-center bg-terracota/10 rounded-[3rem] p-16 md:p-24 border border-terracota/20">
                    <h2 className="font-serif text-4xl md:text-5xl mb-8">¿Listo para transformar tu espacio?</h2>
                    <a
                        href="/cotiza"
                        className="inline-block px-12 py-4 bg-terracota text-white rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Cotizar Ahora
                    </a>
                </div>

            </div>
        </div>
    );
}
