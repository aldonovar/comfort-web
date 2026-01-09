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

    // Hover Interaction Styles (CSS Transitions) - Refined "Text Slide" logic in content
    const hoverEffects = {
        primary: "hover:bg-terracota/90 hover:shadow-lg hover:shadow-terracota/20",
        secondary: "hover:bg-gray-50 hover:shadow-lg hover:shadow-black/5",
        outline: "hover:bg-white/10 hover:border-white hover:text-white hover:shadow-lg hover:shadow-white/5",
        ghost: "",
        whatsapp: "hover:bg-[#1DA851] hover:shadow-lg hover:shadow-green-500/20"
    };

    // Combined Class Name
    const combinedClassName = `${baseStyles} ${sizeStyles} ${variants[variant]} ${hoverEffects[variant]} ${className}`;

    const content = (
        <div className="relative z-10 flex items-center gap-3">
            {/* Text Slide Wrapper */}
            <div className="relative overflow-hidden h-4 md:h-5 flex flex-col justify-center">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                    {children}
                </span>
                <span className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full text-current">
                    {children}
                </span>
            </div>

            {/* Distinct Icons based on Variant/Context */}
            {(variant === 'primary' || variant === 'secondary') && (
                <svg
                    className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1 group-hover:-translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            )}

            {/* WhatsApp Icon for Outline/WhatsApp variant if href includes wa.me (Smart detection) or strict variant */}
            {(variant === 'whatsapp' || (variant === 'outline' && href?.includes('wa.me'))) && (
                <svg
                    className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            )}

            {/* Simple Arrow for Outline (Non-WhatsApp) */}
            {(variant === 'outline' && !href?.includes('wa.me')) && (
                <svg
                    className="w-4 h-4 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            )}
        </div>
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
