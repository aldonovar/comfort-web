"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectTemplateProps {
    title: string;
    location: string;
    year: string;
    description: string;
    mainImage: string;
    gallery: string[];
}

export default function ProjectTemplate({ title, location, year, description, mainImage, gallery }: ProjectTemplateProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".project-reveal", {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out"
            });

            gsap.from(".gallery-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".project-gallery",
                    start: "top 80%"
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="bg-[#050505] min-h-screen text-white pt-32 pb-20">
            <div className="max-w-[1600px] mx-auto px-6 md:px-12">

                {/* Header */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
                    <div className="lg:col-span-8">
                        <div className="flex items-center gap-4 mb-6 project-reveal">
                            <span className="text-terracota text-xs tracking-[0.2em] uppercase font-bold">{location}</span>
                            <span className="w-1 h-1 bg-white/30 rounded-full" />
                            <span className="text-white/50 text-xs tracking-[0.2em] uppercase">{year}</span>
                        </div>
                        <h1 className="font-serif text-6xl md:text-8xl leading-none project-reveal">
                            {title}
                        </h1>
                    </div>
                    <div className="lg:col-span-4 project-reveal">
                        <p className="text-white/60 text-lg leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Main Image */}
                <div className="relative w-full h-[80vh] rounded-3xl overflow-hidden mb-24 project-reveal">
                    <Image
                        src={mainImage}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Gallery */}
                <div className="project-gallery grid grid-cols-1 md:grid-cols-2 gap-8">
                    {gallery.map((img, index) => (
                        <div key={index} className={`gallery-item relative h-[600px] rounded-2xl overflow-hidden ${index % 3 === 0 ? 'md:col-span-2 h-[800px]' : ''}`}>
                            <Image
                                src={img}
                                alt={`Gallery ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    ))}
                </div>

                {/* Next Project CTA */}
                <div className="mt-32 text-center border-t border-white/10 pt-20">
                    <p className="text-white/40 text-sm tracking-widest uppercase mb-4">Siguiente Proyecto</p>
                    <a href="/proyectos" className="font-serif text-5xl md:text-7xl hover:text-terracota transition-colors duration-300">
                        Ver Todos →
                    </a>
                </div>

            </div>
        </div>
    );
}
