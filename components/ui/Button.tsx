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

    // Base Styles
    const baseStyles = "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold uppercase tracking-widest text-xs md:text-sm transition-all duration-500 group disabled:opacity-50 disabled:pointer-events-none";

    // Size Styles
    const sizeStyles = "px-8 py-4";

    // Variant Styles
    const variants = {
        primary: "bg-terracota text-white hover:shadow-lg hover:shadow-terracota/30",
        secondary: "bg-white text-madera hover:shadow-lg hover:shadow-white/20",
        outline: "bg-transparent border border-white/30 text-white backdrop-blur-sm hover:bg-white/10 hover:border-white/50",
        ghost: "bg-transparent text-[var(--text-primary)] hover:bg-[var(--text-primary)]/5",
        whatsapp: "bg-[#25D366] text-white hover:shadow-lg hover:shadow-[#25D366]/30"
    };

    // Hover Effect Overlay (Internal Animation)
    const hoverOverlay = {
        primary: "absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        secondary: "absolute inset-0 bg-madera/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]",
        outline: "absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] opacity-20",
        ghost: "",
        whatsapp: "absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
    };

    // Combined Class Name
    const combinedClassName = `${baseStyles} ${sizeStyles} ${variants[variant]} ${className}`;

    // Content Wrapper (to stay above hover overlay)
    const content = (
        <span className="relative z-10 flex items-center gap-2">
            {children}
            {/* Animated Arrow for specific variants */}
            {(variant === 'primary' || variant === 'outline') && (
                <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            )}
        </span>
    );

    // Render Overlay
    const overlay = <div className={hoverOverlay[variant]} />;

    if (href) {
        return (
            <Link
                href={href}
                className={combinedClassName}
                target={target}
                rel={rel}
                onClick={onClick}
            >
                {overlay}
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
            {overlay}
            {content}
        </button>
    );
}
