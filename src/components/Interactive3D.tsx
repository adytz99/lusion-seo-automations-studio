
import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const InteractiveGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Create flowing particles with better positioning
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(500 * 3); // Reduced count for better performance
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10; // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8; // y  
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6; // z
    }
    return positions;
  }, []);

  // Create interactive spheres
  const spheres = useMemo(() => {
    const sphereArray = [];
    for (let i = 0; i < 8; i++) { // Reduced count
      sphereArray.push({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3
        ] as [number, number, number],
        scale: Math.random() * 0.4 + 0.2,
        speed: Math.random() * 0.01 + 0.005,
        color: `hsl(${180 + Math.random() * 60}, 70%, 60%)` // Teal to blue range
      });
    }
    return sphereArray;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    // Animate particles with wave motion
    if (particlesRef.current) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Wave motion
        positions[i + 1] += Math.sin(time * 0.5 + positions[i] * 0.01) * 0.002;
        positions[i] += Math.cos(time * 0.3 + positions[i + 1] * 0.01) * 0.001;
        
        // Mouse interaction
        const mouseInfluence = 0.0001;
        const dx = (mouseRef.current.x * viewport.width * 0.5) - positions[i];
        const dy = (mouseRef.current.y * viewport.height * 0.5) - positions[i + 1];
        
        positions[i] += dx * mouseInfluence;
        positions[i + 1] += dy * mouseInfluence;
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // Rotate spheres
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.2;
    }
  });

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }, []);

  // Add mouse event listener
  useMemo(() => {
    const handleMove = (e: MouseEvent) => handleMouseMove(e);
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [handleMouseMove]);

  return (
    <group>
      {/* Flowing particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPosition, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          args={[{
            size: 0.025,
            color: "#13e0b3",
            transparent: true,
            opacity: 0.9,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
          }]}
        />
      </points>

      {/* Interactive spheres */}
      <group ref={meshRef}>
        {spheres.map((sphere, index) => (
          <mesh
            key={index}
            position={sphere.position}
          >
            <sphereGeometry args={[sphere.scale, 12, 12]} />
            <meshPhongMaterial
              args={[{
                color: sphere.color,
                transparent: true,
                opacity: 0.7,
                wireframe: index % 2 === 0
              }]}
            />
          </mesh>
        ))}
      </group>

      {/* Enhanced lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#13e0b3" />
      <pointLight position={[-5, -5, 5]} intensity={1} color="#0ea5e9" />
      <directionalLight position={[0, 0, 5]} intensity={0.8} color="#ffffff" />
    </group>
  );
};

export const Interactive3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        className="h-full w-full"
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
      >
        <InteractiveGeometry />
      </Canvas>
    </div>
  );
};
