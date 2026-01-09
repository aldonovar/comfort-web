"use client";

import Link from "next/link";
import { ReactNode } from "react";

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

    // Base Styles - Stable, Geometric, Premium
    const baseStyles = "relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-bold uppercase tracking-[0.15em] text-xs md:text-sm transition-all duration-300 group disabled:opacity-50 disabled:pointer-events-none active:scale-95";

    // Size Styles
    const sizeStyles = "px-8 py-4 md:px-10 md:py-4";

    // Static Visual Styles (Initial State)
    const variants = {
        primary: "bg-terracota text-white border border-terracota",
        secondary: "bg-white text-madera border border-white",
        outline: "bg-transparent text-white border border-white/40",
        ghost: "bg-transparent text-[var(--text-primary)] hover:bg-black/5",
        whatsapp: "bg-[#25D366] text-white border border-[#25D366]"
    };

    // Hover Interaction Styles (CSS Transitions)
    const hoverEffects = {
        primary: "hover:bg-black hover:border-black hover:text-white hover:shadow-lg hover:shadow-terracota/20",
        secondary: "hover:bg-terracota hover:border-terracota hover:text-white hover:shadow-lg hover:shadow-black/10",
        outline: "hover:bg-white hover:border-white hover:text-madera hover:shadow-lg hover:shadow-white/10",
        ghost: "",
        whatsapp: "hover:bg-[#128C7E] hover:border-[#128C7E] hover:shadow-lg hover:shadow-green-500/20"
    };

    // Combined Class Name
    const combinedClassName = `${baseStyles} ${sizeStyles} ${variants[variant]} ${hoverEffects[variant]} ${className}`;

    const content = (
        <>
            <span className="relative z-10">{children}</span>
            {/* Simple, Elegant Arrow for directional variants */}
            {(variant === 'primary' || variant === 'outline' || variant === 'secondary') && (
                <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            )}
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
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={combinedClassName}
        >
            {content}
        </button>
    );
}
