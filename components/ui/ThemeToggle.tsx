"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative w-12 h-6 rounded-full bg-black/10 dark:bg-white/10 border border-black/5 dark:border-white/5 transition-colors duration-300 flex items-center px-1"
            aria-label="Toggle Theme"
        >
            <div
                className={`w-4 h-4 rounded-full bg-terracota shadow-sm transform transition-transform duration-300 ${theme === "dark" ? "translate-x-6" : "translate-x-0"
                    }`}
            />
            <span className="sr-only">Toggle Theme</span>
        </button>
    );
}
