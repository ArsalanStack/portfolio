'use client';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Sphere, Torus, Stars, MeshDistortMaterial } from '@react-three/drei';

/* ── Central distorted orb ── */
function CentralOrb() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.4, 128, 128]} />
      <MeshDistortMaterial
        color="#c8c8d0"
        distort={0.38}
        speed={2.5}
        roughness={0.0}
        metalness={0.9}
        emissive="#404050"
        emissiveIntensity={0.35}
      />
    </mesh>
  );
}

/* ── Spinning wireframe rings ── */
function SpinRing({ radius, tubeRadius, rotation, speed, color, opacity }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.z += delta * speed;
      ref.current.rotation.x += delta * speed * 0.3;
    }
  });
  return (
    <Torus ref={ref} args={[radius, tubeRadius, 3, 120]} rotation={rotation}>
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        transparent
        opacity={opacity}
        wireframe={false}
      />
    </Torus>
  );
}

/* ── Floating small orbs ── */
function FloatOrb({ position, size, color, speed = 2 }) {
  return (
    <Float speed={speed} rotationIntensity={2} floatIntensity={3}>
      <Sphere args={[size, 32, 32]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0}
          metalness={0.5}
        />
      </Sphere>
    </Float>
  );
}

/* ── Particle field (manual dots) ── */
function Particles() {
  const refs = useRef([]);
  const count = 24;
  const positions = useRef(
    Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4,
    ])
  );

  useFrame((state) => {
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.position.y += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;
      }
    });
  });

  return (
    <>
      {positions.current.map((pos, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={pos}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial
            color="#e0e0e8"
            emissive="#ffffff"
            emissiveIntensity={1}
            transparent
            opacity={0.6 + Math.random() * 0.4}
          />
        </mesh>
      ))}
    </>
  );
}

export default function AboutScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        {/* Lighting — cool white tones for gray/silver look */}
        <ambientLight intensity={0.6} color="#d8d8ff" />
        <pointLight position={[5, 5, 5]} intensity={12} color="#ffffff" />
        <pointLight position={[-5, -3, 4]} intensity={6} color="#c0c8e0" />
        <pointLight position={[0, 4, 3]} intensity={8} color="#e8e8ff" />
        <pointLight position={[3, -3, 2]} intensity={4} color="#a0a8c0" />

        {/* Deep starfield */}
        <Stars radius={60} depth={30} count={2000} factor={2} saturation={0} fade />

        {/* Central distorted silver orb */}
        <CentralOrb />

        {/* Rings — gray/white with subtle glow */}
        <SpinRing
          radius={2.2}
          tubeRadius={0.012}
          rotation={[Math.PI / 2, 0, 0]}
          speed={0.18}
          color="#d4d4e0"
          opacity={0.5}
        />
        <SpinRing
          radius={2.8}
          tubeRadius={0.009}
          rotation={[Math.PI / 4, Math.PI / 6, 0]}
          speed={-0.12}
          color="#b0b8cc"
          opacity={0.3}
        />
        <SpinRing
          radius={3.4}
          tubeRadius={0.007}
          rotation={[Math.PI / 6, Math.PI / 3, Math.PI / 5]}
          speed={0.09}
          color="#909098"
          opacity={0.2}
        />

        {/* Floating accent orbs */}
        <FloatOrb position={[3.2, 1.5, 0.5]} size={0.09} color="#e8e8f0" speed={2.5} />
        <FloatOrb position={[-3.0, 1.2, 1.0]} size={0.07} color="#c8ccd8" speed={3.0} />
        <FloatOrb position={[2.5, -2.0, 0.5]} size={0.06} color="#a8b0c4" speed={2.0} />
        <FloatOrb position={[-2.8, -1.5, 0.8]} size={0.08} color="#d0d4e0" speed={3.5} />
        <FloatOrb position={[0.5, 2.8, 0.3]} size={0.05} color="#e0e0ea" speed={2.8} />
        <FloatOrb position={[-1.0, -2.8, 0.6]} size={0.07} color="#b8bcd0" speed={2.2} />

        {/* Particle field */}
        <Particles />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
}
