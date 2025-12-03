"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ScrollReveal({
    children,
    className = "",
    animation = "fade-up", // fade-up, fade-in, scale-up, slide-left, slide-right
    delay = 0,
    duration = 0.8,
    ease = "power3.out",
    threshold = "85%", // start position (top 85% of viewport)
    once = true,
}) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        const el = ref.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            let fromProps = {};

            switch (animation) {
                case "fade-up":
                    fromProps = { y: 40, opacity: 0 };
                    break;
                case "fade-in":
                    fromProps = { opacity: 0 };
                    break;
                case "scale-up":
                    fromProps = { scale: 0.95, opacity: 0 };
                    break;
                case "slide-left":
                    fromProps = { x: -40, opacity: 0 };
                    break;
                case "slide-right":
                    fromProps = { x: 40, opacity: 0 };
                    break;
                default:
                    fromProps = { y: 40, opacity: 0 };
            }

            gsap.from(el, {
                ...fromProps,
                duration,
                delay,
                ease,
                scrollTrigger: {
                    trigger: el,
                    start: `top ${threshold}`,
                    once,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [animation, delay, duration, ease, threshold, once]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
