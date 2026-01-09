"use client";

import Link from "next/link";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface ButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline" | "ghost" | "whatsapp";
    className?: string;
    target?: string;
    rel?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
}

export default function Button({
    children,
    href,
    onClick,
    variant = "primary",
    className = "",
    target,
    rel,
    type = "button",
    disabled = false
}: ButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const circleRef = useRef<HTMLSpanElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (!button) return;

        // Magnetic Effect
        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        // Text Magnetic (Parallax)
        const xToText = gsap.quickTo(textRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yToText = gsap.quickTo(textRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { left, top, width, height } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);

            xTo(x * 0.2); // Move button slightly
            yTo(y * 0.2);

            xToText(x * 0.1); // Move text slightly less
            yToText(y * 0.1);
        };

        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            xToText(0);
            yToText(0);
        };

        button.addEventListener("mousemove", handleMouseMove as any);
        button.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            button.removeEventListener("mousemove", handleMouseMove as any);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    // Ripple / Fill Effect on Hover
    const handleMouseEnter = (e: React.MouseEvent) => {
        if (!circleRef.current || !buttonRef.current) return;

        const parentOffset = buttonRef.current.getBoundingClientRect();
        const relX = e.pageX - parentOffset.left;
        const relY = e.pageY - parentOffset.top;

        gsap.fromTo(circleRef.current,
            { left: relX, top: relY, scale: 0, opacity: 1 },
            { scale: 3, opacity: 1, duration: 0.5, ease: "power2.out" }
        );
    };

    const handleMouseLeave = () => {
        if (circleRef.current) {
            gsap.to(circleRef.current, { scale: 0, opacity: 0, duration: 0.5, ease: "power2.out" });
        }
    };

    // Styles
    // Updated to be more "Essential" and Premium
    const baseStyles = "relative inline-flex items-center justify-center overflow-hidden rounded-full font-bold uppercase tracking-[0.2em] text-xs md:text-sm transition-colors duration-300 group disabled:opacity-50 disabled:pointer-events-none";
    const sizeStyles = "px-8 py-4 md:px-10 md:py-5"; // Larger, more authoritative

    const variants = {
        primary: "bg-terracota text-white border border-terracota hover:text-white", // Solid -> Fill
        secondary: "bg-white text-madera border border-white hover:text-madera",
        outline: "bg-transparent text-white border border-white/40 hover:border-white", // Glassy
        ghost: "bg-transparent text-[var(--text-primary)] hover:opacity-70",
        whatsapp: "bg-[#25D366] text-white border border-[#25D366]"
    };

    const fillColors = {
        primary: "bg-black", // Terracota -> Black on hover (Sophisticated)
        secondary: "bg-terracota", // White -> Terracota
        outline: "bg-white", // Transparent -> White
        ghost: "bg-gray-100",
        whatsapp: "bg-[#128C7E]"
    };

    const combinedClassName = `${baseStyles} ${sizeStyles} ${variants[variant]} ${className}`;

    const InnerContent = () => (
        <>
            {/* Magnetic Fill Circle */}
            {(variant !== 'ghost') && (
                <span
                    ref={circleRef}
                    className={`absolute rounded-full w-[200%] aspect-square -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-0 z-0 ${fillColors[variant]}`}
                />
            )}

            {/* Text & Icon */}
            <span ref={textRef} className="relative z-10 flex items-center gap-3 mix-blend-difference">
                {children}
                {(variant === 'primary' || variant === 'outline' || variant === 'secondary') && (
                    <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                )}
            </span>
        </>
    );

    if (href) {
        return (
            <Link
                href={href}
                className={combinedClassName}
                target={target}
                rel={rel}
                onClick={onClick}
                ref={buttonRef as any}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <InnerContent />
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName}
            ref={buttonRef as any}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <InnerContent />
        </button>
    );
}
