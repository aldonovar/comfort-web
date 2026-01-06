"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SeamlessVideo from "./SeamlessVideo";


gsap.registerPlugin(ScrollTrigger);

interface DynamicGalleryItemProps {
    src: string;
    type?: "image" | "video" | "text";
    alt?: string;
    content?: string;
    aspect?: string;
    span?: string; // Tailwind class for col/row span
    offset?: string; // Tailwind translate class
    className?: string; // Extra container classes
    priority?: boolean;
}

export function DynamicGalleryItem({
    src,
    type = "image",
    alt = "Project Detail",
    content,
    aspect = "aspect-square",
    span = "",
    offset = "",
    className = "",
    priority = false
}: DynamicGalleryItemProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Parallax & Reveal Logic
    useEffect(() => {
        const ctx = gsap.context(() => {
            const container = containerRef.current;
            const media = mediaRef.current;
            if (!container || !media) return;

            // 1. Reveal Animation (Scale Up + Fade)
            gsap.fromTo(container,
                { opacity: 0, y: 50, scale: 0.95 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: container,
                        start: "top 95%", // Start slightly earlier
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // 2. Internal Parallax (Image moves inside mask)
            // Only valid if type is image/video (not text)
            if (type !== "text") {
                gsap.fromTo(media,
                    { scale: 1.2, yPercent: -10 },
                    {
                        yPercent: 10,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1
                        }
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, [type]);

    // Video Toggle Logic (for Interactive Video)
    const toggleVideo = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            // Pause all other videos? (Global event or simpler local logic)
            // For now, simpler local toggle. User clicked "Play".
            // To ensure "only one plays", we might need external control, but let's try self-contained first for visual "pop".
            // Actually, the previous page solution used parent state. 
            // Let's stick to the "parent controls simple playingIndex" if passed, 
            // OR fully autonomous if simpler. 
            // The constraint "Only one vide plays" implies parent control or global event.
            // Let's make this component handle the VISUALS, but maybe expose onClick.
            videoRef.current.play().catch(e => console.error(e));
            setIsPlaying(true);
        }
    };

    // Handling parent-controlled play state if we were to refactor that way.
    // For now, I'll implement internal click-to-play for "video" type but expose it.

    // RENDERERS
    const renderContent = () => {
        if (type === "text") {
            return (
                <div className="absolute inset-0 flex items-center justify-center p-8 bg-[#111] text-center border border-white/5 mx-auto w-full h-full">
                    <div ref={mediaRef} className="max-w-md">
                        <div className="w-8 h-1 bg-terracota mx-auto mb-6" />
                        <p className="font-serif text-xl md:text-2xl text-white/80 italic leading-relaxed">
                            &ldquo;{content}&rdquo;
                        </p>
                    </div>
                </div>
            );
        }

        if (type === "video") {
            return (
                <div
                    ref={mediaRef}
                    className="relative w-full h-full cursor-pointer group"
                    onClick={toggleVideo}
                >
                    <video
                        ref={videoRef}
                        src={src}
                        className="w-full h-full object-cover"
                        playsInline
                        loop
                        muted
                    />
                    {/* Play Button Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-500 ${isPlaying ? "opacity-0 pointer-events-none" : "opacity-100 group-hover:bg-black/40"}`}>
                        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transition-transform duration-500 group-hover:scale-110 group-active:scale-95">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </div>
                </div>
            );
        }

        // Default: Image
        return (
            <div ref={mediaRef} className="relative w-full h-full">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={priority}
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-700" />
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className={`
                group relative overflow-hidden rounded-sm bg-neutral-900 
                ${aspect} ${span} ${offset} ${className}
                hover:z-10 transition-all duration-500
            `}
        >
            {renderContent()}
        </div>
    );
}
