"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";

interface SeamlessVideoProps {
    src: string;
    className?: string;
    poster?: string;
}

export default function SeamlessVideo({ src, className, poster }: SeamlessVideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const fadeDuration = 1.0; // Seconds to fade out

        const checkTime = () => {
            if (!video.duration) return;

            // Start fading out before the end
            const timeLeft = video.duration - video.currentTime;

            if (timeLeft <= fadeDuration && !isFading) {
                setIsFading(true);
                gsap.to(video, { opacity: 0, duration: fadeDuration, ease: "power1.inOut" });
            }
        };

        const handleEnded = () => {
            // Reset and fade match
            video.currentTime = 0;
            video.play().then(() => {
                gsap.to(video, { opacity: 1, duration: 1.0, ease: "power1.inOut" });
                setIsFading(false);
            });
        };

        // We manually handle looping to ensure the fade animation completes
        // So we do NOT use the 'loop' attribute in the video tag locally, 
        // to strictly control the 'ended' or near-ended behavior. 
        // However, 'ended' event is reliable. 

        video.addEventListener("timeupdate", checkTime);
        video.addEventListener("ended", handleEnded);

        return () => {
            video.removeEventListener("timeupdate", checkTime);
            video.removeEventListener("ended", handleEnded);
        };
    }, [isFading]);

    return (
        <video
            ref={videoRef}
            src={src}
            className={className}
            autoPlay
            muted
            playsInline
            poster={poster}
        // Loop is manual
        />
    );
}
