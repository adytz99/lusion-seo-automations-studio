
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Target, Palette, Code, Rocket } from "lucide-react";

const ProcessStep = ({ step, index, isLast }: { step: any; index: number; isLast: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="flex items-start space-x-6 relative">
      <div className="flex flex-col items-center">
        <motion.div
          ref={ref}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 }}
          className="w-16 h-16 bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-[#13e0b3]/25 relative z-10"
        >
          <step.icon size={24} />
        </motion.div>
        
        {!isLast && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: 80 } : {}}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            className="w-0.5 bg-gradient-to-b from-[#13e0b3] to-transparent mt-4"
          />
        )}
      </div>
      
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.1 }}
        className="flex-1 pb-12"
      >
        <h3 className="text-2xl font-bold text-white mb-3">
          {index + 1}. {step.title}
        </h3>
        <p className="text-white/70 text-lg leading-relaxed">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
};

export const Process = () => {
  const steps = [
    {
      title: "Discovery",
      description: "Analizăm în detaliu business-ul tău, audiența țintă și obiectivele specifice pentru a crea o strategie personalizată.",
      icon: Search
    },
    {
      title: "Strategie",
      description: "Dezvoltăm un plan de acțiune clar cu milestone-uri măsurabile și un timeline realist pentru implementare.",
      icon: Target
    },
    {
      title: "Design 3D",
      description: "Creăm prototipuri interactive și design-uri moderne care captivează audiența și convertesc vizitatorii în clienți.",
      icon: Palette
    },
    {
      title: "Development",
      description: "Construim soluții robuste folosind cele mai noi tehnologii, optimizate pentru performanță și SEO.",
      icon: Code
    },
    {
      title: "Lansare & Optimizare",
      description: "Lansăm proiectul și monitorizăm continuu performanțele, optimizând pentru rezultate maxime.",
      icon: Rocket
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-24 px-6 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Procesul nostru{" "}
            <span className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] bg-clip-text text-transparent">
              în 5 pași
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            O metodologie dovedită care garantează succesul proiectului tău, de la concept la lansare.
          </p>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, index) => (
            <ProcessStep 
              key={index} 
              step={step} 
              index={index} 
              isLast={index === steps.length - 1}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 text-center bg-gradient-to-r from-[#13e0b3]/10 to-[#0ea5e9]/10 backdrop-blur-lg border border-[#13e0b3]/20 rounded-2xl p-8"
        >
          <div className="flex items-center justify-center space-x-8 text-center">
            <div>
              <div className="text-3xl font-bold text-[#13e0b3] mb-2">+5</div>
              <div className="text-white/70">ani experiență</div>
            </div>
            <div className="w-px h-12 bg-[#13e0b3]/30"></div>
            <div>
              <div className="text-3xl font-bold text-[#13e0b3] mb-2">60+</div>
              <div className="text-white/70">proiecte finalizate</div>
            </div>
            <div className="w-px h-12 bg-[#13e0b3]/30"></div>
            <div>
              <div className="text-3xl font-bold text-[#13e0b3] mb-2">100%</div>
              <div className="text-white/70">clienți mulțumiți</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
