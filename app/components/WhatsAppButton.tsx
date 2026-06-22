"use client";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { useEffect } from "react";

const WHATSAPP_NUMBER = "919967873413";
const WHATSAPP_MESSAGE = "Hi Adil, I want to discuss a project.";

const WhatsAppButton = () => {
  const whatsappUrl = `https://wa.me/+${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  const handleWhatsAppClick = () => {
    // Track WhatsApp clicks with analytics
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "whatsapp_click", {
        event_category: "engagement",
        event_label: "floating_button",
      });
    }
    // Fallback: Log to console for debugging
    console.log("WhatsApp button clicked - Floating Button");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      {/* Pulse Ring Animation */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 w-16 h-16 bg-green-500/20 rounded-full"
      />

      {/* Main Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-lg hover:shadow-2xl transition-all duration-300 group"
      >
        {/* Glassmorphism Effect */}
        <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Icon */}
        <MessageCircle className="w-8 h-8 text-white relative z-10" />

        {/* Tooltip */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-20 bg-gray-900/90 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none border border-white/20"
        >
          Chat with us on WhatsApp
        </motion.div>
      </motion.a>
    </motion.div>
  );
};

export default WhatsAppButton;
