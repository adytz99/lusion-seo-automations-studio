
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
    gdprConsent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.gdprConsent) {
      toast({
        title: "Eroare",
        description: "Trebuie să accepți termenii și condițiile.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Mesaj trimis cu succes!",
        description: "Răspundem în maxim 24 de ore. Mulțumim pentru încredere!",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        message: "",
        gdprConsent: false
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <section id="contact" className="py-24 px-6 bg-gradient-to-br from-[#0f0f1a] to-[#1a1a2e]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Să discutăm despre{" "}
            <span className="bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] bg-clip-text text-transparent">
              proiectul tău
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Completează formularul și primești o analiză detaliată gratuită în maxim 24 de ore.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-br from-[#1a1a2e]/50 to-[#16213e]/30 backdrop-blur-lg border border-[#13e0b3]/20 rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-white font-medium mb-2">
                  Nume complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300"
                  placeholder="Ion Popescu"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-white font-medium mb-2">
                  Adresă email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300"
                  placeholder="ion@company.ro"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="phone" className="block text-white font-medium mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300"
                  placeholder="+40 xxx xxx xxx"
                />
              </div>
              
              <div>
                <label htmlFor="budget" className="block text-white font-medium mb-2">
                  Buget estimat
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300"
                >
                  <option value="" className="bg-[#1a1a2e] text-white">Selectează bugetul</option>
                  <option value="sub-5000" className="bg-[#1a1a2e] text-white">Sub 5.000 EUR</option>
                  <option value="5000-10000" className="bg-[#1a1a2e] text-white">5.000 - 10.000 EUR</option>
                  <option value="10000-25000" className="bg-[#1a1a2e] text-white">10.000 - 25.000 EUR</option>
                  <option value="peste-25000" className="bg-[#1a1a2e] text-white">Peste 25.000 EUR</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-white font-medium mb-2">
                Descrie proiectul tău *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300 resize-vertical"
                placeholder="Spune-ne despre obiectivele tale, audiența țintă și ce servicii te interesează..."
              />
            </div>

            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="gdprConsent"
                name="gdprConsent"
                checked={formData.gdprConsent}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-[#13e0b3]"
              />
              <label htmlFor="gdprConsent" className="text-sm text-white/70 leading-relaxed">
                Sunt de acord cu procesarea datelor personale conform{" "}
                <a href="#" className="text-[#13e0b3] hover:underline">
                  Termenii și Condițiilor
                </a>{" "}
                și{" "}
                <a href="#" className="text-[#13e0b3] hover:underline">
                  Politicii de confidențialitate
                </a>
                .
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#13e0b3] to-[#0ea5e9] text-white py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-[#13e0b3]/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Se trimite...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Trimite mesajul</span>
                </>
              )}
            </motion.button>

            <p className="text-center text-sm text-white/60">
              <CheckCircle size={16} className="inline mr-2 text-[#13e0b3]" />
              Răspundem în maxim 24 de ore
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
