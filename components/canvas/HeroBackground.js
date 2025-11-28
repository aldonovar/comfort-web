"use client";

import React, { useRef, useState } from "react";
import { useFrame, extend } from "@react-three/fiber";
import { useVideoTexture, View, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

// Shader for subtle video distortion/fluidity
const HeroVideoMaterial = shaderMaterial(
    {
        uTime: 0,
        uTexture: new THREE.Texture(),
        uMouse: new THREE.Vector2(0, 0),
        uResolution: new THREE.Vector2(1, 1),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Subtle breathing/movement
      float noise = sin(uv.y * 5.0 + uTime * 0.5) * 0.005;
      uv.x += noise;
      
      // Mouse interaction (subtle warp)
      float dist = distance(uv, uMouse);
      float interaction = smoothstep(0.5, 0.0, dist);
      uv += (uv - uMouse) * interaction * 0.02;

      vec4 color = texture2D(uTexture, uv);
      
      // Vignette
      float vignette = smoothstep(1.2, 0.4, length(vUv - 0.5) * 1.5);
      color.rgb *= vignette;

      gl_FragColor = color;
    }
  `
);

extend({ HeroVideoMaterial });

export default function HeroBackground({ videoUrl, className, ...props }) {
    return (
        <View className={className} {...props}>
            <HeroScene videoUrl={videoUrl} />
        </View>
    );
}

function HeroScene({ videoUrl }) {
    const materialRef = useRef();
    // Pass config object to ensure video plays automatically
    const texture = useVideoTexture(videoUrl, {
        unsuspend: "canplay",
        muted: true,
        loop: true,
        start: true,
        playsInline: true,
    });
    const [mouse, setMouse] = useState([0.5, 0.5]);

    // Ensure texture wraps correctly if needed, though usually ClampToEdge is fine for video
    // texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.elapsedTime;
            // Lerp mouse for smoothness
            materialRef.current.uMouse.lerp(new THREE.Vector2(mouse[0], mouse[1]), 0.1);
        }
    });

    return (
        <mesh>
            <planeGeometry args={[2, 2, 32, 32]} />
            {/* @ts-ignore */}
            <heroVideoMaterial
                ref={materialRef}
                uTexture={texture}
                toneMapped={false}
            />
        </mesh>
    );
}
