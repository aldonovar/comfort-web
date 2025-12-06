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

        // Sync GSAP ticker with Lenis raf
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        // Turn off GSAP's default lag smoothing to avoid jumps during heavy load/scroll
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove((time) => {
                lenis.raf(time * 1000);
            });
        };
    }, [lenis]);

    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, [lenis]);

    return null;
}
