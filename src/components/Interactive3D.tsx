
import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { motion } from "framer-motion";

const InteractiveGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.BufferGeometry>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Create a more complex geometry with multiple spheres
  const spheres = useMemo(() => {
    const sphereArray = [];
    for (let i = 0; i < 20; i++) {
      sphereArray.push({
        position: [
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 2
        ],
        scale: Math.random() * 0.3 + 0.1,
        speed: Math.random() * 0.02 + 0.01
      });
    }
    return sphereArray;
  }, []);

  // Create flowing particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(1000 * 3);
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Update particle positions with mouse influence
    if (geometryRef.current) {
      const positions = geometryRef.current.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Create wave effect
        positions[i] += Math.sin(time + i * 0.01) * 0.001;
        positions[i + 1] += Math.cos(time + i * 0.01) * 0.001;
        
        // Mouse attraction effect
        const mouseInfluence = 0.0002;
        const dx = mouseRef.current.x * viewport.width / 2 - positions[i];
        const dy = mouseRef.current.y * viewport.height / 2 - positions[i + 1];
        
        positions[i] += dx * mouseInfluence;
        positions[i + 1] += dy * mouseInfluence;
      }
      
      geometryRef.current.attributes.position.needsUpdate = true;
    }
  });

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Add mouse event listener
  useMemo(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <group>
      {/* Flowing particles */}
      <points>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPosition, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          args={[{
            size: 0.02,
            color: "#13e0b3",
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
          }]}
        />
      </points>

      {/* Interactive spheres */}
      {spheres.map((sphere, index) => (
        <mesh
          key={index}
          position={sphere.position as [number, number, number]}
          ref={index === 0 ? meshRef : undefined}
        >
          <sphereGeometry args={[sphere.scale, 16, 16]} />
          <meshPhongMaterial
            color={new THREE.Color().setHSL(0.5 + index * 0.1, 0.7, 0.5)}
            transparent
            opacity={0.4}
            wireframe={index % 2 === 0}
          />
        </mesh>
      ))}

      {/* Ambient lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.8} color="#13e0b3" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
    </group>
  );
};

export const Interactive3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        className="h-full w-full"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <InteractiveGeometry />
      </Canvas>
    </div>
  );
};
