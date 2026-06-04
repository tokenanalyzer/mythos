"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Twitter, Linkedin, Github, MessageCircle, ExternalLink, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "adilcryptonews@gmail.com",
    href: "mailto:adilcryptonews@gmail.com",
    color: "from-red-400/20 to-orange-400/20",
  },
  {
    icon: Twitter,
    label: "X (Twitter)",
    value: "@Husain3413",
    href: "https://x.com/Husain3413",
    color: "from-blue-400/20 to-cyan-400/20",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Adil Hussain",
    href: "https://linkedin.com/in/adil-hussain",
    color: "from-blue-600/20 to-indigo-400/20",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "tokenanalyzer",
    href: "https://github.com/tokenanalyzer",
    color: "from-purple-400/20 to-pink-400/20",
  },
];

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative z-10 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-1.5 text-sm font-medium text-primary glass rounded-full border border-primary/20 mb-4"
          >
            Contact
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            Let's <span className="gradient-text">Connect</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Ready to start your next project? Reach out through any of these channels.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contacts.map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className={`glass-card rounded-2xl p-6 h-full glow-border hover:border-primary/30 transition-all duration-300 bg-gradient-to-br ${contact.color}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <ExternalLink className="w-4 h-4 text-white/30 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-medium text-white/60 mb-1">{contact.label}</h3>
                <p className="text-white font-semibold group-hover:text-primary transition-colors">{contact.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            <MessageCircle className="w-5 h-5" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}
