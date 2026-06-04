"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Clock, CheckCircle2, Circle, Sparkles } from "lucide-react";

const upcomingProjects = [
  {
    id: "1",
    title: "AI Agent Ecosystem",
    description: "A comprehensive platform for deploying, managing, and monetizing AI agents with marketplace capabilities.",
    status: "development" as const,
    timeline: "Q2 2025",
    features: ["Agent Marketplace", "Custom Agent Builder", "Monetization", "API Access"],
  },
  {
    id: "2",
    title: "Automation Marketplace",
    description: "Pre-built automation templates and workflows for businesses to streamline operations instantly.",
    status: "planning" as const,
    timeline: "Q3 2025",
    features: ["Template Library", "Drag-Drop Builder", "Integration Hub", "Analytics"],
  },
  {
    id: "3",
    title: "Business Intelligence Platform",
    description: "AI-powered analytics dashboard for real-time business insights and predictive forecasting.",
    status: "beta" as const,
    timeline: "Q1 2025",
    features: ["Predictive Analytics", "Custom Reports", "Data Visualization", "AI Insights"],
  },
  {
    id: "4",
    title: "SaaS Management Suite",
    description: "Complete toolkit for SaaS founders including billing, analytics, and customer management.",
    status: "development" as const,
    timeline: "Q2 2025",
    features: ["Subscription Management", "Usage Analytics", "Customer Portal", "API Gateway"],
  },
  {
    id: "5",
    title: "AI Design Studio",
    description: "Next-generation design tool powered by AI for creating marketing materials and brand assets.",
    status: "planning" as const,
    timeline: "Q4 2025",
    features: ["AI Image Gen", "Brand Templates", "Video Creation", "Asset Management"],
  },
  {
    id: "6",
    title: "Enterprise Dashboard System",
    description: "Scalable dashboard framework for enterprise applications with role-based customization.",
    status: "beta" as const,
    timeline: "Q1 2025",
    features: ["Role-Based Views", "Custom Widgets", "Real-time Data", "White-label"],
  },
];

const statusConfig = {
  planning: { icon: Circle, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
  development: { icon: Rocket, color: "text-primary", bg: "bg-primary/10", border: "border-primary/20" },
  beta: { icon: Sparkles, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
  launching: { icon: CheckCircle2, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
};

export default function UpcomingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="upcoming" className="relative z-10 py-24 sm:py-32">
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
            Roadmap
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            Upcoming <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A glimpse into the future — innovative products currently in development.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          <div className="space-y-8">
            {upcomingProjects.map((project, index) => {
              const status = statusConfig[project.status];
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-start gap-4 md:gap-8 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 mt-6" />

                  {/* Content */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div className="glass-card rounded-2xl p-6 glow-border hover:border-primary/30 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-lg ${status.bg} flex items-center justify-center`}>
                          <status.icon className={`w-4 h-4 ${status.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-white">{project.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-white/50">
                            <Clock className="w-3 h-3" />
                            {project.timeline}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-white/60 mb-4">{project.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature) => (
                          <span
                            key={feature}
                            className={`px-2 py-1 text-xs ${status.color} ${status.bg} rounded-md border ${status.border}`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
