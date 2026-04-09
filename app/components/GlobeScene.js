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
            {/* Solid core */}
            <Sphere args={[1.7, 48, 48]}>
                <meshStandardMaterial
                    color="#1a1a1a"
                    roughness={0.05}
                    metalness={0.95}
                    emissive="#333333"
                    emissiveIntensity={0.15}
                />
            </Sphere>

            {/* Wireframe overlay */}
            <Sphere args={[1.72, 18, 18]}>
                <meshStandardMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </Sphere>

            {/* Equator ring */}
            <Torus args={[2.4, 0.014, 8, 120]}>
                <meshStandardMaterial
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.35}
                />
            </Torus>

            {/* Tilted ring 1 */}
            <Torus args={[2.1, 0.01, 8, 100]} rotation={[Math.PI / 3, 0, Math.PI / 5]}>
                <meshStandardMaterial
                    color="#aaaaaa"
                    emissive="#888888"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.25}
                />
            </Torus>

            {/* Tilted ring 2 */}
            <Torus args={[2.6, 0.008, 8, 100]} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
                <meshStandardMaterial
                    color="#666666"
                    transparent
                    opacity={0.15}
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
                    color="#ffffff"
                    emissive="#ffffff"
                    emissiveIntensity={brightness}
                    roughness={0}
                    metalness={1}
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
            gl={{ antialias: true, alpha: true }}         /* transparent so section bg shows through */
            style={{ background: 'transparent' }}
        >
            <Suspense fallback={null}>
                <ambientLight intensity={0.1} />
                <pointLight position={[5, 5, 5]} intensity={4} color="#ffffff" />
                <pointLight position={[-5, -3, 3]} intensity={1.5} color="#aaaaaa" />
                <pointLight position={[0, 3, 4]} intensity={2} color="#dddddd" />
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
                />
            </Suspense>
        </Canvas>
    );
}
