
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";
import { MouseTrail } from "./MouseTrail";
import { Interactive3D } from "./Interactive3D";
import { CustomCursor } from "./CustomCursor";

const ParticleNetwork = () => {
  const ref = useRef<THREE.Points>(null);
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
      
      // Add subtle floating movement
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 8]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlesPosition, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          args={[{
            size: 0.002,
            color: "#13e0b3",
            transparent: true,
            opacity: 0.4,
            sizeAttenuation: true,
            blending: THREE.AdditiveBlending
          }]}
        />
      </points>
    </group>
  );
};

export const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToPortfolio = () => {
    const element = document.getElementById("portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Mouse Trail */}
      <MouseTrail />

      {/* Main Interactive 3D Background */}
      <Interactive3D />

      {/* Secondary Particle Network (subtle background layer) */}
      <div className="absolute inset-0 z-5 opacity-30">
        <Canvas
          camera={{ position: [0, 0, 1] }}
          className="h-full w-full"
        >
          <ParticleNetwork />
        </Canvas>
      </div>

      {/* Gradient Overlay - reduced opacity to show 3D elements better */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f1a]/50 via-[#0f0f1a]/40 to-[#0f0f1a]/50 z-10"></div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 z-15 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-4 h-4 border border-[#13e0b3]/40 rotate-45"
          animate={{
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-6 h-6 border border-[#0ea5e9]/50"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-8 h-8 border border-[#13e0b3]/30 rounded-full"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-3 h-3 bg-[#13e0b3]/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-[#13e0b3] to-white bg-clip-text text-transparent">
            Automatizăm afaceri.
          </span>
          <br />
          <span className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] bg-clip-text text-transparent">
            Optimizăm SEO.
          </span>
          <br />
          <span className="text-white">
            Construim experiențe web care vând.
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-white/80 mb-12 font-light"
        >
          <span className="text-[#13e0b3]">Audit SEO gratuit</span>
          <span className="mx-4">•</span>
          <span className="text-[#13e0b3]">Automatizări marketing</span>
          <span className="mx-4">•</span>
          <span className="text-[#13e0b3]">Site-uri ultra-rapide</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(19, 224, 179, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContact}
            className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-[#13e0b3]/25 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Solicită o analiză gratuită</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0ea5e9] to-[#13e0b3] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToPortfolio}
            className="border-2 border-[#13e0b3] text-[#13e0b3] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#13e0b3] hover:text-white transition-all duration-300 relative overflow-hidden group"
          >
            <span className="relative z-10">Vezi portofoliu</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#13e0b3] rounded-full flex justify-center relative overflow-hidden"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gradient-to-b from-[#13e0b3] to-[#0ea5e9] rounded-full mt-2"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#13e0b3]/20 to-transparent opacity-50" />
        </motion.div>
      </motion.div>
    </section>
  );
};
