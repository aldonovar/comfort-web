"use client";

import React, { useRef, useMemo, useState } from "react";
import { useFrame, useLoader, extend } from "@react-three/fiber";
import { TextureLoader } from "three";
import { View, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// Custom Shader Material for Liquid Distortion
const WaveShaderMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.0, 0.0, 0.0),
        uTexture: new THREE.Texture(),
        uHover: 0,
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
    uniform float uHover;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Distortion effect based on hover
      float noise = sin(uv.y * 10.0 + uTime) * 0.02 * uHover;
      uv.x += noise;
      uv.y += noise * 0.5;

      vec4 textureColor = texture2D(uTexture, uv);
      gl_FragColor = textureColor;
    }
  `
);

// Extend so we can use it in JSX
extend({ WaveShaderMaterial });

export default function ProjectImage({ imgUrl, className, ...props }) {
    const meshRef = useRef();
    const materialRef = useRef();
    const texture = useLoader(TextureLoader, imgUrl);

    const [hovered, setHover] = useState(false);

    useFrame((state, delta) => {
        if (materialRef.current) {
            materialRef.current.uTime += delta * 2;
            // Smoothly interpolate hover value
            materialRef.current.uHover = THREE.MathUtils.lerp(
                materialRef.current.uHover,
                hovered ? 1 : 0,
                0.1
            );
        }
    });

    return (
        <View className={className} {...props}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <planeGeometry args={[2, 2, 16, 16]} />
                {/* @ts-ignore */}
                <waveShaderMaterial
                    ref={materialRef}
                    uTexture={texture}
                    transparent
                />
            </mesh>
        </View>
    );
}
