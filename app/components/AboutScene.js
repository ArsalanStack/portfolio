'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshWobbleMaterial, Torus, Stars } from '@react-three/drei';

function WobbleSphere() {
  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2}>
      <Sphere args={[1.3, 64, 64]}>
        <MeshWobbleMaterial
          color="#4a3f6b"
          factor={0.35}
          speed={2}
          roughness={0.15}
          metalness={0.6}
          emissive="#2d1b69"
          emissiveIntensity={0.5}
        />
      </Sphere>
    </Float>
  );
}

function Ring({ rotation = [0, 0, 0], opacity = 0.18, radius = 2.1, color = '#a78bfa', emissive = '#7c3aed' }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.25;
  });
  return (
    <Torus ref={ref} args={[radius, 0.012, 8, 120]} rotation={rotation}>
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={1.0}
        transparent
        opacity={opacity}
      />
    </Torus>
  );
}

function SmallOrb({ position }) {
  return (
    <Float speed={3.5} rotationIntensity={2} floatIntensity={2.5}>
      <Sphere args={[0.18, 24, 24]} position={position}>
        <meshStandardMaterial
          color="#c4b5fd"
          emissive="#7c3aed"
          emissiveIntensity={1.5}
          roughness={0}
          metalness={0.3}
        />
      </Sphere>
    </Float>
  );
}

export default function AboutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Strong ambient so wobble sphere is visible */}
        <ambientLight intensity={0.9} color="#b8a0ff" />
        <pointLight position={[4, 4, 4]} intensity={8} color="#ffffff" />
        <pointLight position={[-4, -3, 3]} intensity={4} color="#a78bfa" />
        <pointLight position={[0, 0, 5]} intensity={5} color="#c4b5fd" />
        <Stars radius={40} depth={20} count={1500} factor={2} saturation={0} fade />
        <WobbleSphere />
        <Ring rotation={[Math.PI / 2, 0, 0]} opacity={0.35} radius={2.0} color="#a78bfa" emissive="#6d28d9" />
        <Ring rotation={[Math.PI / 4, Math.PI / 6, 0]} opacity={0.25} radius={2.4} color="#818cf8" emissive="#4338ca" />
        <SmallOrb position={[2.2, 1, 0]} />
        <SmallOrb position={[-2.2, -0.8, 0.5]} />
        <SmallOrb position={[1.5, -1.8, 0]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
}
