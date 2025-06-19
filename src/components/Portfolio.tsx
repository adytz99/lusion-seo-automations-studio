
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink } from "lucide-react";

const PortfolioCard = ({ project, index }: { project: any; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1a2e]/50 to-[#16213e]/30 backdrop-blur-lg border border-[#13e0b3]/20 hover:border-[#13e0b3]/40 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-video bg-gradient-to-br from-[#13e0b3]/20 to-[#0ea5e9]/20 relative overflow-hidden">
        <motion.div
          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full bg-gradient-to-br from-[#13e0b3]/30 to-[#0ea5e9]/30 flex items-center justify-center"
        >
          <div className="text-6xl font-bold text-white/10">
            {project.title.charAt(0)}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-[#0f0f1a]/80 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isHovered ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.3 }}
            className="w-16 h-16 bg-[#13e0b3] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#0ea5e9] transition-colors"
          >
            <ExternalLink size={24} className="text-white" />
          </motion.div>
        </motion.div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            project.category === 'Web' 
              ? 'bg-[#13e0b3]/20 text-[#13e0b3]'
              : project.category === 'E-commerce'
              ? 'bg-[#0ea5e9]/20 text-[#0ea5e9]'
              : 'bg-purple-500/20 text-purple-400'
          }`}>
            {project.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#13e0b3] transition-colors">
          {project.title}
        </h3>
        
        <p className="text-white/70 text-sm leading-relaxed">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.map((tech: string, idx: number) => (
            <span
              key={idx}
              className="px-2 py-1 text-xs bg-white/10 text-white/60 rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState("Toate");
  const filters = ["Toate", "Web", "E-commerce", "Automation"];
  
  const projects = [
    {
      title: "TechCorp Landing",
      category: "Web",
      description: "Site corporativ modern cu animații 3D și optimizare SEO completă.",
      tech: ["React", "Three.js", "GSAP"],
      image: "/placeholder1.jpg"
    },
    {
      title: "Fashion Store",
      category: "E-commerce",
      description: "Magazin online Shopify cu design personalizat și integrări automatizate.",
      tech: ["Shopify", "JavaScript", "CSS3"],
      image: "/placeholder2.jpg"
    },
    {
      title: "CRM Automation",
      category: "Automation",
      description: "Sistem de automatizare CRM cu integrări email și chatbot AI.",
      tech: ["Node.js", "APIs", "AI"],
      image: "/placeholder3.jpg"
    },
    {
      title: "Restaurant Chain",
      category: "Web",
      description: "Website pentru lanț de restaurante cu rezervări online și meniu digital.",
      tech: ["WordPress", "PHP", "MySQL"],
      image: "/placeholder4.jpg"
    },
    {
      title: "Electronics Hub",
      category: "E-commerce",
      description: "Platformă e-commerce complexă cu sistem de review-uri și comparare produse.",
      tech: ["WooCommerce", "React", "APIs"],
      image: "/placeholder5.jpg"
    },
    {
      title: "Marketing Suite",
      category: "Automation",
      description: "Suite completo pentru automatizarea campaniilor de marketing multi-canal.",
      tech: ["Python", "APIs", "ML"],
      image: "/placeholder6.jpg"
    }
  ];

  const filteredProjects = activeFilter === "Toate" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="py-24 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Portofoliu{" "}
            <span className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] bg-clip-text text-transparent">
              interactiv
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-12">
            Proiecte care demonstrează expertiza noastră în web development, SEO și automatizări business.
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] text-white shadow-lg shadow-[#13e0b3]/25"
                    : "bg-white/10 text-white/70 hover:bg-white/20 border border-white/20"
                }`}
              >
                {filter}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <PortfolioCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
