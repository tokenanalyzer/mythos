"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, Zap, Shield, Clock, TrendingUp, Smartphone, Award, Briefcase } from "lucide-react";

const reasons = [
  { icon: Zap, title: "Modern Design", description: "Cutting-edge UI/UX with glassmorphism and premium aesthetics" },
  { icon: Shield, title: "AI Integration", description: "Seamless AI capabilities built into every solution" },
  { icon: Clock, title: "Fast Development", description: "Rapid delivery without compromising on quality" },
  { icon: TrendingUp, title: "Scalable Architecture", description: "Built to grow with your business needs" },
  { icon: Smartphone, title: "Mobile Responsive", description: "Perfect experience across all devices and screen sizes" },
  { icon: Award, title: "Premium User Experience", description: "Intuitive interfaces that users love" },
  { icon: Briefcase, title: "Business Focused Solutions", description: "Every feature designed to drive business value" },
];

export default function WhyChooseSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="relative z-10 py-24 sm:py-32">
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
            Why Choose Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            The <span className="gradient-text">Difference</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            What sets my work apart from the rest — a commitment to excellence in every pixel.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full glow-border hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <reason.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      {reason.title}
                    </h3>
                    <p className="text-sm text-white/60 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
