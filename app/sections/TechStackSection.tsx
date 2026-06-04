"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Marquee from "react-fast-marquee";

const technologies = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "TypeScript", category: "Language" },
  { name: "Node.js", category: "Backend" },
  { name: "Firebase", category: "Backend" },
  { name: "Supabase", category: "Backend" },
  { name: "Python", category: "Language" },
  { name: "Flask", category: "Backend" },
  { name: "FastAPI", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "MongoDB", category: "Database" },
  { name: "PostgreSQL", category: "Database" },
  { name: "GitHub", category: "DevOps" },
  { name: "OpenAI", category: "AI" },
  { name: "Gemini", category: "AI" },
  { name: "Tailwind", category: "Frontend" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Three.js", category: "3D" },
  { name: "Stripe", category: "Payments" },
  { name: "Vercel", category: "DevOps" },
];

const categoryColors: Record<string, string> = {
  Frontend: "from-blue-400/20 to-cyan-400/20",
  Backend: "from-green-400/20 to-emerald-400/20",
  Database: "from-orange-400/20 to-amber-400/20",
  DevOps: "from-purple-400/20 to-violet-400/20",
  AI: "from-primary/20 to-secondary/20",
  Language: "from-red-400/20 to-rose-400/20",
  Animation: "from-pink-400/20 to-fuchsia-400/20",
  "3D": "from-indigo-400/20 to-blue-400/20",
  Payments: "from-yellow-400/20 to-amber-400/20",
};

function TechCard({ tech, index }: { tech: typeof technologies[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="mx-2"
    >
      <div className={`glass-card rounded-xl px-5 py-3 glow-border hover:border-primary/30 transition-all duration-300 bg-gradient-to-br ${categoryColors[tech.category] || "from-white/5 to-white/5"}`}>
        <div className="text-sm font-semibold text-white whitespace-nowrap">{tech.name}</div>
        <div className="text-xs text-white/40 mt-0.5">{tech.category}</div>
      </div>
    </motion.div>
  );
}

export default function TechStackSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const row1 = technologies.slice(0, 10);
  const row2 = technologies.slice(10, 20);

  return (
    <section id="tech" className="relative z-10 py-24 sm:py-32 overflow-hidden">
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
            Technologies
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Modern technologies and tools used to build world-class digital products.
          </p>
        </motion.div>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-4 mb-8">
        <Marquee speed={40} gradient={false} pauseOnHover>
          {row1.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </Marquee>
        <Marquee speed={40} gradient={false} pauseOnHover direction="right">
          {row2.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </Marquee>
      </div>

      {/* Grid for mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:hidden">
          {technologies.map((tech, index) => (
            <TechCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
