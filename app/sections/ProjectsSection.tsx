"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowUpRight, Layers } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: "1",
    title: "TokenAnalyzer",
    description: "Advanced cryptocurrency token analysis platform with real-time market data, AI-powered insights, and portfolio tracking capabilities.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    techStack: ["Next.js", "TypeScript", "Python", "TensorFlow", "Web3"],
    features: ["Real-time Analysis", "AI Predictions", "Portfolio Tracking", "Market Alerts"],
    link: "https://tokenanalyzer.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI / Crypto",
  },
  {
    id: "2",
    title: "AlphaBot",
    description: "Intelligent trading automation bot with machine learning algorithms for automated trading strategies and risk management.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop",
    techStack: ["Python", "FastAPI", "React", "PostgreSQL", "Redis"],
    features: ["Auto Trading", "Risk Management", "Backtesting", "Live Monitoring"],
    link: "https://alphabot.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "Automation",
  },
  {
    id: "3",
    title: "GoBook",
    description: "Modern appointment booking and scheduling system with AI-powered optimization for businesses and service providers.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    techStack: ["Next.js", "Firebase", "TypeScript", "Tailwind", "Stripe"],
    features: ["Smart Scheduling", "Payment Integration", "Notifications", "Analytics"],
    link: "https://gobook.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "SaaS",
  },
  {
    id: "4",
    title: "Nexa AI",
    description: "Enterprise AI assistant platform with natural language processing, document analysis, and workflow automation capabilities.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    techStack: ["React", "Node.js", "OpenAI", "MongoDB", "Docker"],
    features: ["NLP Processing", "Document Analysis", "Workflow Automation", "API Integration"],
    link: "https://nexa-ai.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI Platform",
  },
  {
    id: "5",
    title: "Smart Agent Hub",
    description: "Centralized hub for managing AI agents with role-based access, monitoring, and performance analytics.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e748b?w=800&h=600&fit=crop",
    techStack: ["Next.js", "TypeScript", "Supabase", "Vercel", "OpenAI"],
    features: ["Agent Management", "RBAC", "Performance Analytics", "Real-time Monitoring"],
    link: "https://smartagent.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI / Dashboard",
  },
  {
    id: "6",
    title: "MySandal AI Studio",
    description: "AI-powered creative studio for generating marketing assets, social media content, and brand materials.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    techStack: ["React", "Python", "Stable Diffusion", "FastAPI", "AWS"],
    features: ["AI Generation", "Brand Templates", "Batch Processing", "Asset Library"],
    link: "https://mysandal.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI / Creative",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="glass-card rounded-2xl overflow-hidden glow-border">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium text-primary glass rounded-full border border-primary/20">
              {project.category}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-primary/10 backdrop-blur-sm flex items-center justify-center gap-4"
          >
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={false}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-white" />
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              initial={false}
              animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              <Github className="w-5 h-5 text-white" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-white/60 mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs text-white/70 glass rounded-md border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {project.features.map((feature) => (
              <span
                key={feature}
                className="flex items-center gap-1 text-xs text-primary/70"
              >
                <Layers className="w-3 h-3" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative z-10 py-24 sm:py-32">
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
            Portfolio
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A selection of premium projects showcasing expertise in AI, web development, and automation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
