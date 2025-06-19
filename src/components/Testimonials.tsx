
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const TestimonialCard = ({ testimonial, isActive }: { testimonial: any; isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: isActive ? 1 : 0.6, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-br from-[#1a1a2e]/50 to-[#16213e]/30 backdrop-blur-lg border rounded-2xl p-8 text-center ${
        isActive ? 'border-[#13e0b3]/40' : 'border-[#13e0b3]/20'
      }`}
    >
      <div className="w-20 h-20 bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] rounded-full mx-auto mb-6 flex items-center justify-center text-white text-2xl font-bold">
        {testimonial.name.charAt(0)}
      </div>
      
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="text-yellow-400 fill-current" />
        ))}
      </div>
      
      <blockquote className="text-lg text-white/90 mb-6 italic leading-relaxed">
        "{testimonial.quote}"
      </blockquote>
      
      <div>
        <div className="font-bold text-white mb-1">{testimonial.name}</div>
        <div className="text-[#13e0b3] text-sm">{testimonial.position}</div>
        <div className="text-white/60 text-sm">{testimonial.company}</div>
      </div>
    </motion.div>
  );
};

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Ana Popescu",
      position: "Marketing Director",
      company: "TechStart Solutions",
      quote: "Echipa a transformat complet prezența noastră online. Site-ul se încarcă incredibil de rapid și am văzut o creștere de 150% în lead-uri organice."
    },
    {
      name: "Mihai Ionescu",
      position: "CEO",
      company: "Digital Commerce",
      quote: "Automatizările implementate ne-au economisit 20 de ore pe săptămână. ROI-ul a fost vizibil din prima lună de colaborare."
    },
    {
      name: "Elena Radu",
      position: "Founder",
      company: "Creative Agency",
      quote: "Cel mai profesionist partener cu care am lucrat. Atenția la detalii și rezultatele SEO sunt excepționale."
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ce spun{" "}
            <span className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] bg-clip-text text-transparent">
              clienții noștri
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Rezultate reale de la parteneri care și-au transformat business-ul cu ajutorul nostru.
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="flex"
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard 
                    testimonial={testimonial} 
                    isActive={index === currentIndex}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-[#13e0b3]/20 hover:bg-[#13e0b3]/30 border border-[#13e0b3]/40 rounded-full flex items-center justify-center text-[#13e0b3] transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </motion.button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-[#13e0b3]' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-[#13e0b3]/20 hover:bg-[#13e0b3]/30 border border-[#13e0b3]/40 rounded-full flex items-center justify-center text-[#13e0b3] transition-all duration-300"
            >
              <ChevronRight size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};
