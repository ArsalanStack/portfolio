'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, MeshWobbleMaterial, Torus, Stars } from '@react-three/drei';

function WobbleSphere() {
  return (
    <Float speed={1.8} rotationIntensity={1} floatIntensity={1.2}>
      <Sphere args={[1.3, 64, 64]}>
        <MeshWobbleMaterial
          color="#303030"
          factor={0.35}
          speed={2}
          roughness={0.1}
          metalness={1}
        />
      </Sphere>
    </Float>
  );
}

function Ring({ rotation = [0, 0, 0], opacity = 0.18, radius = 2.1 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.25;
  });
  return (
    <Torus ref={ref} args={[radius, 0.012, 8, 120]} rotation={rotation}>
      <meshStandardMaterial
        color="#888"
        emissive="#555"
        emissiveIntensity={0.5}
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
          color="#aaa"
          emissive="#888"
          emissiveIntensity={0.8}
          roughness={0}
          metalness={1}
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
      gl={{ antialias: true, alpha: true }}          /* transparent background */
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.15} />
        <pointLight position={[4, 4, 4]} intensity={3} color="#ffffff" />
        <pointLight position={[-4, -3, 3]} intensity={1.5} color="#aaaaaa" />
        <Stars radius={40} depth={20} count={1500} factor={2} saturation={0} fade />
        <WobbleSphere />
        <Ring rotation={[Math.PI / 2, 0, 0]} opacity={0.2} radius={2.0} />
        <Ring rotation={[Math.PI / 4, Math.PI / 6, 0]} opacity={0.12} radius={2.4} />
        <SmallOrb position={[2.2, 1, 0]} />
        <SmallOrb position={[-2.2, -0.8, 0.5]} />
        <SmallOrb position={[1.5, -1.8, 0]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
        />
      </Suspense>
    </Canvas>
  );
}
