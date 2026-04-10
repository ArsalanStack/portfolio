'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sphere, Torus, MeshDistortMaterial } from '@react-three/drei';

/* ── Central globe with distortion ── */
function RotatingGlobe() {
    const groupRef = useRef();

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.35;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main sphere — silver/gray */}
            <Sphere args={[1.7, 64, 64]}>
                <meshStandardMaterial
                    color="#b8bcc8"
                    roughness={0.1}
                    metalness={0.85}
                    emissive="#303040"
                    emissiveIntensity={0.3}
                />
            </Sphere>

            {/* Wireframe overlay — subtle white */}
            <Sphere args={[1.72, 20, 20]}>
                <meshStandardMaterial
                    color="#e0e0f0"
                    wireframe
                    transparent
                    opacity={0.08}
                />
            </Sphere>

            {/* Equator ring — bright white */}
            <Torus args={[2.4, 0.014, 8, 120]}>
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#d0d0e0"
                    emissiveIntensity={0.9}
                    transparent
                    opacity={0.55}
                />
            </Torus>

            {/* Tilted ring 1 — light gray */}
            <Torus args={[2.1, 0.01, 8, 100]} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
                <meshStandardMaterial
                    color="#c0c4d4"
                    emissive="#9098b0"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.4}
                />
            </Torus>

            {/* Tilted ring 2 — medium gray */}
            <Torus args={[2.6, 0.008, 8, 100]} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
                <meshStandardMaterial
                    color="#a0a4b4"
                    emissive="#7080a0"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.25}
                />
            </Torus>
        </group>
    );
}

function FloatOrb({ position, size = 0.1, brightness = 0.8 }) {
    return (
        <Float speed={3 + Math.abs(position[0]) * 0.5} rotationIntensity={1.5} floatIntensity={2.5}>
            <Sphere args={[size, 16, 16]} position={position}>
                <meshStandardMaterial
                    color="#e0e0f0"
                    emissive="#c0c8e0"
                    emissiveIntensity={brightness * 1.2}
                    roughness={0}
                    metalness={0.4}
                />
            </Sphere>
        </Float>
    );
}

export default function GlobeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 9], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={null}>
                {/* White/cool tone lighting */}
                <ambientLight intensity={0.7} color="#dde0ff" />
                <pointLight position={[5, 5, 5]} intensity={10} color="#ffffff" />
                <pointLight position={[-5, -3, 3]} intensity={5} color="#c8d0e8" />
                <pointLight position={[0, 3, 4]} intensity={6} color="#e8e8ff" />
                <pointLight position={[0, -4, 2]} intensity={3} color="#a8b0cc" />
                <Stars radius={80} depth={40} count={2500} factor={2} saturation={0} fade />
                <RotatingGlobe />
                <FloatOrb position={[3.2, 1.5, 1]} size={0.1} brightness={1} />
                <FloatOrb position={[-3, 1.2, 1.2]} size={0.08} brightness={0.7} />
                <FloatOrb position={[2.8, -1.8, 0.5]} size={0.07} brightness={0.6} />
                <FloatOrb position={[-2.8, -1.2, 1]} size={0.1} brightness={0.9} />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.6}
                    enableDamping
                    dampingFactor={0.05}
                />
            </Suspense>
        </Canvas>
    );
}
