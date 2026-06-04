"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, Layers } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: "1",
    title: "TokenAnalyzer",
    description: "AI-powered cryptocurrency analytics platform delivering real-time token metrics, sentiment analysis, and market intelligence for informed trading decisions.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop",
    techStack: ["Next.js", "TypeScript", "Python", "TensorFlow", "Web3"],
    features: ["AI Price Prediction", "Sentiment Analysis", "Portfolio Tracking", "Market Alerts"],
    link: "https://tokenanalyzer.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI / Analytics",
  },
  {
    id: "2",
    title: "AlphaBot",
    description: "Intelligent automation engine for trading strategies. Uses machine learning to optimize execution, manage risk, and adapt to market conditions in real time.",
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=800&h=600&fit=crop",
    techStack: ["Python", "FastAPI", "React", "PostgreSQL", "Redis"],
    features: ["Strategy Automation", "Risk Engine", "Backtesting", "Live Monitoring"],
    link: "https://alphabot.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "Automation",
  },
  {
    id: "3",
    title: "Nexa AI",
    description: "Enterprise AI platform for natural language processing, document intelligence, and automated workflow orchestration across business operations.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
    techStack: ["React", "Node.js", "OpenAI", "MongoDB", "Docker"],
    features: ["NLP Engine", "Document Analysis", "Workflow Automation", "API Gateway"],
    link: "https://nexa-ai.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI Platform",
  },
  {
    id: "4",
    title: "Smart Agent Hub",
    description: "Centralized command center for deploying and managing AI agents. Includes role-based access, performance monitoring, and multi-agent orchestration.",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e748b?w=800&h=600&fit=crop",
    techStack: ["Next.js", "TypeScript", "Supabase", "Vercel", "OpenAI"],
    features: ["Agent Orchestration", "RBAC", "Performance Analytics", "Real-time Logs"],
    link: "https://smartagent.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI / Dashboard",
  },
  {
    id: "5",
    title: "GhostHub",
    description: "Stealth automation infrastructure for running background tasks, scheduled workflows, and headless browser operations at scale.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop",
    techStack: ["Node.js", "Puppeteer", "Redis", "BullMQ", "Docker"],
    features: ["Headless Automation", "Task Scheduling", "Queue Management", "Stealth Mode"],
    link: "https://ghosthub.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "Automation",
  },
  {
    id: "6",
    title: "Mythos Nexus AI",
    description: "Unified AI ecosystem connecting multiple models and services through a single interface. Built for teams that need consistent AI access across tools.",
    image: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=600&fit=crop",
    techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "OpenAI"],
    features: ["Multi-Model Access", "Team Collaboration", "Usage Analytics", "Custom Prompts"],
    link: "https://mythos-nexus.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI / SaaS",
  },
  {
    id: "7",
    title: "Prompt Pilot",
    description: "Prompt engineering workspace for testing, versioning, and optimizing LLM prompts. Includes A/B testing and performance benchmarking tools.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    techStack: ["React", "Python", "FastAPI", "SQLite", "Tailwind"],
    features: ["Prompt Versioning", "A/B Testing", "Benchmarking", "Team Sharing"],
    link: "https://promptpilot.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "AI / DevTools",
  },
  {
    id: "8",
    title: "Post Agent",
    description: "Autonomous content distribution system that schedules, publishes, and analyzes posts across multiple platforms with AI-generated content optimization.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop",
    techStack: ["Next.js", "Firebase", "TypeScript", "BullMQ", "OpenAI"],
    features: ["Auto Publishing", "Content Optimization", "Analytics", "Multi-Platform"],
    link: "https://postagent.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "Automation / SaaS",
  },
  {
    id: "9",
    title: "SAH Ultimate",
    description: "Comprehensive analytics and management platform for SAH operations. Real-time dashboards, reporting tools, and automated insight generation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    techStack: ["Next.js", "TypeScript", "Supabase", "Recharts", "Tailwind"],
    features: ["Real-time Dashboards", "Automated Reports", "Insight Engine", "Data Export"],
    link: "https://sah-ultimate.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "Analytics / Dashboard",
  },
  {
    id: "10",
    title: "SAH Poc Maker",
    description: "Rapid proof-of-concept builder for validating SAH ideas. Pre-built templates, AI-assisted documentation, and one-click deployment to staging.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    techStack: ["React", "Node.js", "MongoDB", "Docker", "Vercel"],
    features: ["PoC Templates", "AI Documentation", "One-Click Deploy", "Idea Validation"],
    link: "https://sah-poc.vercel.app",
    github: "https://github.com/tokenanalyzer",
    category: "SaaS / DevTools",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <div className="glass-card rounded-2xl overflow-hidden glow-border">
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-medium text-primary glass rounded-full border border-primary/20">
              {project.category}
            </span>
          </div>
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
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-white/60 mb-4 leading-relaxed line-clamp-2">
            {project.description}
          </p>
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
            A portfolio of real AI systems, automation platforms, and analytics tools built for production.
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
