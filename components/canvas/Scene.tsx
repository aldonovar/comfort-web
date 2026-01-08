"use client";

import { Canvas } from "@react-three/fiber";
import { View, Preload } from "@react-three/drei";

interface SceneProps extends Omit<React.ComponentProps<"div">, "ref"> {
    style?: React.CSSProperties;
}

export default function Scene({ style, ...props }: SceneProps) {
    return (
        <Canvas
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                pointerEvents: "none",
                zIndex: 0, // Behind content by default, or adjust as needed
                ...style,
            }}
            dpr={[1, 1.5]} // Optimize for mobile: clamp pixel ratio to 1.5
            eventSource={typeof document !== "undefined" ? document.body : undefined}
            eventPrefix="client"
            {...props}
        >
            <View.Port />
            <Preload all />
        </Canvas>
    );
}
