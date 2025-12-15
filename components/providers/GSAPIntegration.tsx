"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



gsap.registerPlugin(ScrollTrigger);

export default function GSAPIntegration() {
    // Restore default lag smoothing to allow frame skipping on heavy loads
    // This is good practice even without Lenis to prevent GSAP from forcing frames on slow devices
    useEffect(() => {
        gsap.ticker.lagSmoothing(500, 33);
    }, []);

    return null;

    return null;
}
