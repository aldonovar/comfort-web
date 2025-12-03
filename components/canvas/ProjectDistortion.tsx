"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";

// --- SHADER DEFINITION ---
const LiquidDistortionMaterial = shaderMaterial(
    {
        uTime: 0,
        uHover: 0,
        uTexture: new THREE.Texture(),
        uMouse: new THREE.Vector2(0, 0),
        uResolution: new THREE.Vector2(1, 1)
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
    uniform float uHover;
    uniform sampler2D uTexture;
    varying vec2 vUv;

    // Simplex 2D noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      vec2 uv = vUv;
      
      // Liquid Effect parameters
      float noise = snoise(uv * 3.0 + uTime * 0.5);
      
      // Distort UV based on hover and noise
      float distortionStrength = 0.05 * uHover;
      
      vec2 distortedUV = uv + vec2(noise * distortionStrength, noise * distortionStrength);
      
      // RGB Shift
      float r = texture2D(uTexture, distortedUV + vec2(0.005 * uHover, 0.0)).r;
      float g = texture2D(uTexture, distortedUV).g;
      float b = texture2D(uTexture, distortedUV - vec2(0.005 * uHover, 0.0)).b;
      
      gl_FragColor = vec4(r, g, b, 1.0);
    }
  `
);

extend({ LiquidDistortionMaterial });

// Add type definition for the custom material
declare global {
    namespace JSX {
        interface IntrinsicElements {
            liquidDistortionMaterial: any;
        }
    }
}

interface ProjectDistortionProps {
    image: string;
    hovered: boolean;
}

export default function ProjectDistortion({ image, hovered }: ProjectDistortionProps) {
    const texture = useTexture(image);
    const materialRef = useRef<any>(null);

    // Fix texture aspect ratio to cover the plane
    // This is a simplified "cover" logic. For perfect cover, we'd need aspect ratio math.
    // For now, we assume the plane matches the container which matches the image aspect roughly.

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Smoothly interpolate hover value
            materialRef.current.uHover = THREE.MathUtils.lerp(
                materialRef.current.uHover,
                hovered ? 1 : 0,
                delta * 2 // Speed of transition
            );

            // Update time
            materialRef.current.uTime += delta;
        }
    });

    return (
        <mesh>
            <planeGeometry args={[1, 1, 32, 32]} />
            <liquidDistortionMaterial
                ref={materialRef}
                uTexture={texture}
                transparent
            />
        </mesh>
    );
}
