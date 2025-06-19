
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, TrendingUp, Award } from "lucide-react";

const MetricBar = ({ label, value, delay }: { label: string; value: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{label}</span>
        <span className="text-[#13e0b3] font-bold">{value}%</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${value}%` } : { width: 0 }}
          transition={{ duration: 1.5, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] rounded-full"
        />
      </div>
    </div>
  );
};

export const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      icon: Zap,
      title: "Viteză sub 1 secundă",
      description: "Time to First Byte optimizat și Core Web Vitals în verde pentru toate site-urile noastre."
    },
    {
      icon: TrendingUp,
      title: "SEO performant",
      description: "Schema markup complet, link-building strategic și optimizări tehnice avansate."
    },
    {
      icon: Award,
      title: "Rezultate măsurabile",
      description: "Rapoarte detaliate și KPI-uri clare pentru fiecare aspect al proiectului tău."
    }
  ];

  const metrics = [
    { label: "Performance Score", value: 95 },
    { label: "SEO Score", value: 100 },
    { label: "Accessibility", value: 98 },
    { label: "Best Practices", value: 92 }
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-white to-gray-50 text-gray-900">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Beneficii{" "}
            <span className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] bg-clip-text text-transparent">
              SEO demonstrate
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Rezultate concrete care îți cresc vizibilitatea online și convertesc mai mulți vizitatori în clienți.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Benefits */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex items-start space-x-4"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] rounded-xl flex items-center justify-center flex-shrink-0">
                  <benefit.icon size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lighthouse Scores */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e] rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">
              Scoruri Lighthouse
            </h3>
            
            {metrics.map((metric, index) => (
              <MetricBar
                key={metric.label}
                label={metric.label}
                value={metric.value}
                delay={index * 0.2}
              />
            ))}
            
            <div className="mt-8 p-4 bg-[#13e0b3]/10 rounded-lg border border-[#13e0b3]/20">
              <p className="text-sm text-center text-[#13e0b3]">
                ✓ Core Web Vitals optimizate pentru toate dispozitivele
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
