'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Stars, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Materials ─── */
const matDesk = new THREE.MeshStandardMaterial({ color: '#1c1a18', roughness: 0.55, metalness: 0.1 });
const matDeskEdge = new THREE.MeshStandardMaterial({ color: '#28251f', roughness: 0.6, metalness: 0.05 });
const matMonitorBack = new THREE.MeshStandardMaterial({ color: '#111111', roughness: 0.3, metalness: 0.8 });
const matScreen = new THREE.MeshStandardMaterial({
    color: '#0d1117',
    emissive: '#1a2a4a',
    emissiveIntensity: 1.2,
    roughness: 0,
    metalness: 0.1,
});
const matCodeGlow = new THREE.MeshStandardMaterial({
    color: '#4494ff',
    emissive: '#2266cc',
    emissiveIntensity: 3,
    transparent: true,
    opacity: 0.85,
});
const matKeyboard = new THREE.MeshStandardMaterial({ color: '#1a1a1a', roughness: 0.5, metalness: 0.6 });
const matMetal = new THREE.MeshStandardMaterial({ color: '#555560', roughness: 0.15, metalness: 0.95 });
const matLight = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#ccddff',
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.9,
});
const matMug = new THREE.MeshStandardMaterial({ color: '#2a2a2a', roughness: 0.4, metalness: 0.5 });
const matMugLiq = new THREE.MeshStandardMaterial({ color: '#3d1f00', roughness: 1, emissive: '#1a0800', emissiveIntensity: 0.3 });
const matTower = new THREE.MeshStandardMaterial({ color: '#141414', roughness: 0.4, metalness: 0.85 });
const matLed = new THREE.MeshStandardMaterial({ color: '#44aaff', emissive: '#2266ff', emissiveIntensity: 4 });
const matHeadphone = new THREE.MeshStandardMaterial({ color: '#1e1e1e', roughness: 0.3, metalness: 0.9 });

/* ─── Desk ─── */
function Desk() {
    return (
        <group position={[0, -1.5, 0]}>
            {/* Desk surface */}
            <mesh material={matDesk} receiveShadow>
                <boxGeometry args={[6.5, 0.12, 2.8]} />
            </mesh>
            {/* Front edge strip */}
            <mesh material={matDeskEdge} position={[0, 0.04, 1.34]}>
                <boxGeometry args={[6.5, 0.06, 0.06]} />
            </mesh>
            {/* Left leg */}
            <mesh material={matMetal} position={[-2.9, -0.9, 0]}>
                <boxGeometry args={[0.08, 1.7, 2.2]} />
            </mesh>
            {/* Right leg */}
            <mesh material={matMetal} position={[2.9, -0.9, 0]}>
                <boxGeometry args={[0.08, 1.7, 2.2]} />
            </mesh>
            {/* Bottom bar */}
            <mesh material={matMetal} position={[0, -1.7, 0]}>
                <boxGeometry args={[5.84, 0.06, 0.06]} />
            </mesh>
        </group>
    );
}

/* ─── Monitor ─── */
function Monitor() {
    return (
        <group position={[0, -0.3, -0.5]}>
            {/* Screen bezel */}
            <mesh material={matMonitorBack} castShadow>
                <boxGeometry args={[2.8, 1.7, 0.05]} />
            </mesh>
            {/* Screen surface — glowing blue-ish */}
            <mesh material={matScreen} position={[0, 0, 0.026]}>
                <boxGeometry args={[2.6, 1.54, 0.01]} />
            </mesh>
            {/* "Code lines" on screen — thin glowing strips */}
            {[-0.55, -0.3, -0.05, 0.2, 0.45].map((y, i) => (
                <mesh key={i} material={matCodeGlow} position={[(-0.4 + i * 0.1) * 0.5, y, 0.032]}>
                    <boxGeometry args={[0.8 + (i % 3) * 0.4, 0.018, 0.001]} />
                </mesh>
            ))}
            {/* Monitor stand neck */}
            <mesh material={matMetal} position={[0, -1.05, 0.1]}>
                <boxGeometry args={[0.1, 0.35, 0.1]} />
            </mesh>
            {/* Stand base */}
            <mesh material={matMetal} position={[0, -1.22, 0.28]}>
                <boxGeometry args={[0.7, 0.05, 0.55]} />
            </mesh>
        </group>
    );
}

/* ─── Keyboard ─── */
function Keyboard() {
    return (
        <group position={[0, -1.42, 0.55]}>
            <mesh material={matKeyboard} castShadow>
                <boxGeometry args={[1.8, 0.04, 0.58]} />
            </mesh>
            {/* Key rows */}
            {[-0.17, -0.05, 0.07, 0.17].map((z, ri) =>
                Array.from({ length: 12 }, (_, ci) => (
                    <mesh key={`${ri}-${ci}`} material={matMetal} position={[-0.77 + ci * 0.14, 0.03, z]}>
                        <boxGeometry args={[0.11, 0.025, 0.1]} />
                    </mesh>
                ))
            )}
        </group>
    );
}

/* ─── PC Tower ─── */
function Tower() {
    return (
        <group position={[-2.6, -0.9, -0.3]}>
            {/* Body */}
            <mesh material={matTower} castShadow>
                <boxGeometry args={[0.45, 1.1, 0.9]} />
            </mesh>
            {/* Mesh panel */}
            <mesh material={matMetal} position={[0.23, 0.15, 0]}>
                <boxGeometry args={[0.01, 0.5, 0.6]} />
            </mesh>
            {/* LED strip */}
            <mesh material={matLed} position={[0.23, 0.0, 0.32]}>
                <boxGeometry args={[0.012, 0.85, 0.012]} />
            </mesh>
            {/* Power button */}
            <mesh material={matLight} position={[0.23, 0.42, 0.15]}>
                <cylinderGeometry args={[0.025, 0.025, 0.02, 12]} />
            </mesh>
        </group>
    );
}

/* ─── Mug ─── */
function Mug() {
    return (
        <group position={[2.2, -1.4, 0.2]}>
            <mesh material={matMug} castShadow>
                <cylinderGeometry args={[0.12, 0.1, 0.22, 24]} />
            </mesh>
            {/* Liquid */}
            <mesh material={matMugLiq} position={[0, 0.09, 0]}>
                <cylinderGeometry args={[0.108, 0.108, 0.02, 24]} />
            </mesh>
            {/* Handle */}
            <mesh material={matMug} position={[0.19, 0, 0]}>
                <torusGeometry args={[0.075, 0.018, 8, 20, Math.PI]} />
            </mesh>
        </group>
    );
}

/* ─── Desk Lamp ─── */
function DeskLamp() {
    return (
        <group position={[2.5, -1.44, -0.6]}>
            {/* Base */}
            <mesh material={matMetal}>
                <cylinderGeometry args={[0.12, 0.14, 0.04, 20]} />
            </mesh>
            {/* Arm */}
            <mesh material={matMetal} position={[0, 0.3, 0]} rotation={[0.3, 0, 0.1]}>
                <boxGeometry args={[0.025, 0.55, 0.025]} />
            </mesh>
            {/* Head */}
            <mesh material={matMetal} position={[0.04, 0.62, -0.05]} rotation={[0.8, 0, 0]}>
                <cylinderGeometry args={[0.1, 0.07, 0.18, 16, 1, true]} />
            </mesh>
            {/* Light source */}
            <mesh material={matLight} position={[0.04, 0.58, -0.02]}>
                <sphereGeometry args={[0.035, 12, 12]} />
            </mesh>
        </group>
    );
}

/* ─── Headphones ─── */
function Headphones() {
    return (
        <group position={[2.55, -1.25, 0.2]} rotation={[0, -0.4, 0.7]}>
            {/* Band */}
            <mesh material={matHeadphone}>
                <torusGeometry args={[0.18, 0.015, 8, 24, Math.PI]} />
            </mesh>
            {/* Left cup */}
            <mesh material={matHeadphone} position={[-0.18, 0, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.04, 20]} />
            </mesh>
            {/* Right cup */}
            <mesh material={matHeadphone} position={[0.18, 0, 0]}>
                <cylinderGeometry args={[0.07, 0.07, 0.04, 20]} />
            </mesh>
        </group>
    );
}

/* ─── Ambient particle dust ─── */
function AmbientDust() {
    const count = 30;
    const positions = useRef(
        Array.from({ length: count }, () => [
            (Math.random() - 0.5) * 8,
            (Math.random() - 0.5) * 5 + 0.5,
            (Math.random() - 0.5) * 3,
        ])
    );
    const refs = useRef([]);
    useFrame((state) => {
        refs.current.forEach((m, i) => {
            if (m)
                m.position.y += Math.sin(state.clock.elapsedTime * 0.4 + i * 1.3) * 0.001;
        });
    });
    return (
        <>
            {positions.current.map((pos, i) => (
                <mesh key={i} ref={(el) => (refs.current[i] = el)} position={pos}>
                    <sphereGeometry args={[0.015, 6, 6]} />
                    <meshStandardMaterial
                        color="#8899cc"
                        emissive="#4466aa"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.4 + Math.random() * 0.4}
                    />
                </mesh>
            ))}
        </>
    );
}

/* ─── Main export ─── */
export default function WorkspaceScene() {
    return (
        <Canvas
            camera={{ position: [0, 3.0, 14.0], fov: 40 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            shadows
            style={{ background: 'transparent', width: '100%', height: '100%' }}
        >
            <Suspense fallback={null}>
                {/* ─ Lighting ─ */}
                <ambientLight intensity={0.3} color="#b0b8d0" />
                {/* Key light — top left */}
                <pointLight position={[-3, 4, 3]} intensity={12} color="#dde4ff" castShadow />
                {/* Fill */}
                <pointLight position={[4, 2, 2]} intensity={6} color="#c8d0e8" />
                {/* Blue screen glow */}
                <pointLight position={[0, -0.1, 0.5]} intensity={4} color="#2255cc" />
                {/* Desk lamp contribution */}
                <pointLight position={[2.5, -0.9, -0.3]} intensity={5} color="#ffe8b0" />
                {/* LED glow from tower */}
                <pointLight position={[-2.6, -0.9, -0.1]} intensity={2} color="#2266ff" />

                <Stars radius={80} depth={40} count={1800} factor={2} saturation={0} fade speed={0.5} />

                {/* ─ Scene objects ─ */}
                <Desk />
                <Monitor />
                <Keyboard />
                <Tower />
                <Mug />
                <DeskLamp />
                <Headphones />
                <AmbientDust />

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.3}
                    minPolarAngle={Math.PI / 3.5}
                    maxPolarAngle={Math.PI / 2.4}
                    enableDamping
                    dampingFactor={0.06}
                />
            </Suspense>
        </Canvas>
    );
}
