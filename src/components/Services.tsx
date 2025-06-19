
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Settings, Search, Monitor } from "lucide-react";

const ServiceCard = ({ service, index }: { service: any; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        boxShadow: "0 25px 50px rgba(19, 224, 179, 0.2)"
      }}
      className="bg-gradient-to-br from-[#1a1a2e]/50 to-[#16213e]/30 backdrop-blur-lg border border-[#13e0b3]/20 rounded-2xl p-8 hover:border-[#13e0b3]/40 transition-all duration-500 group cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
        <service.icon size={32} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#13e0b3] transition-colors duration-300">
        {service.title}
      </h3>
      
      <ul className="space-y-3 text-white/80">
        {service.features.map((feature: string, idx: number) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.2 + idx * 0.1 }}
            className="flex items-center space-x-3"
          >
            <div className="w-2 h-2 bg-[#13e0b3] rounded-full flex-shrink-0"></div>
            <span>{feature}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export const Services = () => {
  const services = [
    {
      title: "Automatizări de afaceri",
      features: [
        "CRM personalizat și integrări",
        "E-mail marketing automatizat",
        "Chatbots inteligenți",
        "Integrare API complexe"
      ],
      icon: Settings
    },
    {
      title: "Audit SEO complet",
      features: [
        "Analiză On-Page detaliată",
        "Audit tehnic SEO",
        "Core Web Vitals",
        "Raport PDF cu plan de acțiune"
      ],
      icon: Search
    },
    {
      title: "Realizare site web",
      features: [
        "UX/UI design personalizat",
        "WordPress headless",
        "E-commerce Shopify",
        "Progressive Web Apps"
      ],
      icon: Monitor
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="py-24 px-6 relative">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Servicii care{" "}
            <span className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] bg-clip-text text-transparent">
              transformă afaceri
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Combinăm tehnologia avansată cu strategii de marketing dovedite pentru a-ți accelera creșterea business-ului.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
