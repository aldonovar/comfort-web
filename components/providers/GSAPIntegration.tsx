"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useLenis } from "@studio-freight/react-lenis";


gsap.registerPlugin(ScrollTrigger);

export default function GSAPIntegration() {
    const lenis = useLenis();

    // 1. Sync Lenis scroll with ScrollTrigger
    useEffect(() => {
        if (!lenis) return;

        // Update ScrollTrigger on Lenis scroll
        lenis.on("scroll", ScrollTrigger.update);

        // NOTE: We do NOT manually tick lenis.raf here because ReactLenis handles the RAF loop automatically.
        // Adding it here causes double-updates and "jumping" scroll behavior.

        // Restore default lag smoothing to allow frame skipping on heavy loads
        // This is good practice even without Lenis to prevent GSAP from forcing frames on slow devices
        gsap.ticker.lagSmoothing(500, 33);

        return () => {
            // Cleanup: Remove listener to prevent memory leaks and errors on unmount
            lenis.off("scroll", ScrollTrigger.update);
        };
    }, [lenis]);

    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, [lenis]);

    return null;
}
