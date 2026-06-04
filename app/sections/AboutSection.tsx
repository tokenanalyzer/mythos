"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User, Target, Rocket, Lightbulb, Code, Cpu } from "lucide-react";

const features = [
  { icon: Code, label: "Clean Code", desc: "Production-ready solutions" },
  { icon: Cpu, label: "AI Integration", desc: "Cutting-edge AI systems" },
  { icon: Target, label: "Goal Oriented", desc: "Business-focused results" },
  { icon: Rocket, label: "Fast Delivery", desc: "Rapid development cycles" },
  { icon: Lightbulb, label: "Innovation", desc: "Creative problem solving" },
  { icon: User, label: "User First", desc: "Exceptional UX design" },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative z-10 py-24 sm:py-32">
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
            About Me
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            Who Is <span className="gradient-text">Adil Hussain</span>?
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="glass-strong rounded-3xl p-8 sm:p-10 glow-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <User className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Adil Hussain</h3>
                    <p className="text-sm text-primary">AI Product Developer & Automation Specialist</p>
                  </div>
                </div>

                <p className="text-white/70 leading-relaxed mb-4">
                  I build AI-driven products and automation systems that solve real business problems. 
                  My work spans intelligent analytics platforms, autonomous agent systems, and SaaS tools 
                  designed to operate at scale.
                </p>
                <p className="text-white/70 leading-relaxed mb-4">
                  Projects like <span className="text-primary">TokenAnalyzer</span>, <span className="text-primary">Nexa AI</span>, 
                  and <span className="text-primary">Smart Agent Hub</span> reflect a focus on practical AI 
                  integration — turning complex models into usable products.
                </p>
                <p className="text-white/70 leading-relaxed">
                  I also work on infrastructure-level tools like <span className="text-primary">GhostHub</span> 
                  and <span className="text-primary">Mythos Nexus AI</span>, building the backend systems and 
                  orchestration layers that keep automation running reliably.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {["Next.js", "TypeScript", "Python", "OpenAI", "Supabase", "FastAPI"].map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-xs font-medium text-primary/80 glass rounded-lg border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glass-card rounded-2xl p-5 group cursor-default"
              >
                <feature.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="text-sm font-semibold text-white mb-1">{feature.label}</h4>
                <p className="text-xs text-white/50">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
