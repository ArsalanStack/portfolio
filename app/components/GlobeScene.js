'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Sphere, Torus } from '@react-three/drei';

function RotatingGlobe() {
    const groupRef = useRef();

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.4;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Solid core — lighter color + lower metalness so lights actually show */}
            <Sphere args={[1.7, 48, 48]}>
                <meshStandardMaterial
                    color="#3a3a4a"
                    roughness={0.2}
                    metalness={0.7}
                    emissive="#1a1a2e"
                    emissiveIntensity={0.4}
                />
            </Sphere>

            {/* Wireframe overlay */}
            <Sphere args={[1.72, 18, 18]}>
                <meshStandardMaterial
                    color="#8888cc"
                    wireframe
                    transparent
                    opacity={0.12}
                />
            </Sphere>

            {/* Equator ring — bright accent */}
            <Torus args={[2.4, 0.014, 8, 120]}>
                <meshStandardMaterial
                    color="#a78bfa"
                    emissive="#7c3aed"
                    emissiveIntensity={1.2}
                    transparent
                    opacity={0.6}
                />
            </Torus>

            {/* Tilted ring 1 */}
            <Torus args={[2.1, 0.01, 8, 100]} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
                <meshStandardMaterial
                    color="#c4b5fd"
                    emissive="#6d28d9"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.45}
                />
            </Torus>

            {/* Tilted ring 2 */}
            <Torus args={[2.6, 0.008, 8, 100]} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
                <meshStandardMaterial
                    color="#818cf8"
                    emissive="#4338ca"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.3}
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
                    color="#c4b5fd"
                    emissive="#7c3aed"
                    emissiveIntensity={brightness * 1.5}
                    roughness={0}
                    metalness={0.3}
                />
            </Sphere>
        </Float>
    );
}

export default function GlobeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 1.5]}
            gl={{ antialias: true, alpha: true }}
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={null}>
                {/* Much stronger ambient so dark materials are visible */}
                <ambientLight intensity={0.8} color="#9b86ff" />
                <pointLight position={[5, 5, 5]} intensity={8} color="#ffffff" />
                <pointLight position={[-5, -3, 3]} intensity={4} color="#a78bfa" />
                <pointLight position={[0, 3, 4]} intensity={5} color="#c4b5fd" />
                <pointLight position={[0, -4, 2]} intensity={3} color="#818cf8" />
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
                    // Prevent OrbitControls from swallowing scroll events
                    enableDamping={true}
                    dampingFactor={0.05}
                />
            </Suspense>
        </Canvas>
    );
}
