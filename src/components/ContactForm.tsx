
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useState, useRef } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sanitizeInput, validateEmail, validatePhone, formRateLimiter, logSecurityEvent } from "@/utils/security";
import { supabase } from "@/integrations/supabase/client";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
    gdprConsent: false,
    honeypot: "" // Anti-bot honeypot field
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Check honeypot field (should be empty)
    if (formData.honeypot) {
      logSecurityEvent("Bot detected via honeypot", { honeypot: formData.honeypot });
      errors.honeypot = "Bot detected";
      return errors;
    }

    // Validate required fields
    if (!formData.name.trim()) {
      errors.name = "Numele este obligatoriu";
    } else if (formData.name.length > 100) {
      errors.name = "Numele este prea lung";
    }

    if (!formData.email.trim()) {
      errors.email = "Email-ul este obligatoriu";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Email-ul nu este valid";
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = "Numărul de telefon nu este valid";
    }

    if (!formData.message.trim()) {
      errors.message = "Mesajul este obligatoriu";
    } else if (formData.message.length > 2000) {
      errors.message = "Mesajul este prea lung";
    }

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Rate limiting check
    const clientId = `${navigator.userAgent}-${window.location.hostname}`;
    if (!formRateLimiter.isAllowed(clientId)) {
      logSecurityEvent("Rate limit exceeded", { clientId });
      toast({
        title: "Prea multe încercări",
        description: "Vă rugăm să așteptați înainte de a trimite din nou.",
        variant: "destructive"
      });
      return;
    }

    // Validate form
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) {
      logSecurityEvent("Form validation failed", { errors: Object.keys(errors) });
      return;
    }

    if (!formData.gdprConsent) {
      toast({
        title: "Eroare",
        description: "Trebuie să accepți termenii și condițiile.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Log successful form submission attempt
      logSecurityEvent("Form submission started", {
        name: formData.name.substring(0, 3) + "***",
        email: formData.email.split('@')[0].substring(0, 3) + "***@" + formData.email.split('@')[1],
        hasPhone: !!formData.phone,
        budget: formData.budget,
        messageLength: formData.message.length
      });

      // Send email using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          budget: formData.budget,
          message: formData.message
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      toast({
        title: "Mesaj trimis cu succes!",
        description: "Răspundem în maxim 24 de ore. Mulțumim pentru încredere!",
      });
      
      logSecurityEvent("Form submission completed successfully");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        budget: "",
        message: "",
        gdprConsent: false,
        honeypot: ""
      });
      setValidationErrors({});

    } catch (error: any) {
      console.error('Error sending email:', error);
      logSecurityEvent("Form submission failed", { error: error.message });
      
      toast({
        title: "Eroare la trimiterea mesajului",
        description: "A apărut o eroare. Vă rugăm să încercați din nou.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let sanitizedValue = value;

    // Sanitize input for text fields
    if (type === 'text' || type === 'email' || type === 'tel') {
      sanitizedValue = sanitizeInput(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : sanitizedValue
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
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
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="honeypot"
              value={formData.honeypot}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

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
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300 ${
                    validationErrors.name ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="Ion Popescu"
                  maxLength={100}
                />
                {validationErrors.name && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.name}</p>
                )}
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
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300 ${
                    validationErrors.email ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="ion@company.ro"
                  maxLength={254}
                />
                {validationErrors.email && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                )}
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
                  className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300 ${
                    validationErrors.phone ? 'border-red-500' : 'border-white/20'
                  }`}
                  placeholder="+40 xxx xxx xxx"
                  maxLength={20}
                />
                {validationErrors.phone && (
                  <p className="text-red-400 text-sm mt-1">{validationErrors.phone}</p>
                )}
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
                className={`w-full px-4 py-3 bg-white/10 border rounded-lg text-white placeholder-white/50 focus:border-[#13e0b3] focus:outline-none focus:ring-2 focus:ring-[#13e0b3]/20 transition-all duration-300 resize-vertical ${
                  validationErrors.message ? 'border-red-500' : 'border-white/20'
                }`}
                placeholder="Spune-ne despre obiectivele tale, audiența țintă și ce servicii te interesează..."
                maxLength={2000}
              />
              {validationErrors.message && (
                <p className="text-red-400 text-sm mt-1">{validationErrors.message}</p>
              )}
              <p className="text-white/50 text-sm mt-1">
                {formData.message.length}/2000 caractere
              </p>
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
