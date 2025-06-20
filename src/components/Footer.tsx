
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0f0f1a] border-t border-[#13e0b3]/20 py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#13e0b3] to-white bg-clip-text text-transparent mb-4">
                IziWeb
              </h3>
              <p className="text-white/70 leading-relaxed">
                Automatizăm procese, optimizăm prezența online și construim experiențe web 
                care generează rezultate măsurabile pentru business-ul tău.
              </p>
            </motion.div>
          </div>

          {/* Contact Info */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Contact</h4>
              <div className="space-y-4">
                <a
                  href="mailto:contact@iziweb.ro"
                  className="flex items-center space-x-3 text-white/70 hover:text-[#13e0b3] transition-colors group"
                >
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  <span>contact@iziweb.ro</span>
                </a>
                
                <a
                  href="tel:+40735371775"
                  className="flex items-center space-x-3 text-white/70 hover:text-[#13e0b3] transition-colors group"
                >
                  <Phone size={18} className="group-hover:scale-110 transition-transform" />
                  <span>+40 735 371 775</span>
                </a>
                
                <div className="flex items-center space-x-3 text-white/70">
                  <MapPin size={18} />
                  <span>București, România</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Social Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold text-white mb-6">Urmărește-ne</h4>
              <div className="flex space-x-4">
                {[
                  { name: "TikTok", url: "https://www.tiktok.com/@iziw3b?_t=ZN-8xM7QByyiWc&_r=1", icon: "T" },
                  { name: "LinkedIn", url: "#", icon: "L" },
                  { name: "Instagram", url: "#", icon: "I" }
                ].map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gradient-to-r from-[#13e0b3]/20 to-[#0ea5e9]/20 border border-[#13e0b3]/30 rounded-lg flex items-center justify-center text-[#13e0b3] hover:bg-gradient-to-r hover:from-[#13e0b3] hover:to-[#0ea5e9] hover:text-white transition-all duration-300"
                    title={`Urmărește-ne pe ${social.name}`}
                  >
                    <span className="text-sm font-bold">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-[#13e0b3]/20 mt-12 pt-8 text-center"
        >
          <p className="text-white/60">
            © {currentYear} IziWeb – Toate drepturile rezervate
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
