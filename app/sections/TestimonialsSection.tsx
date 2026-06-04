"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Bot,
  BarChart3,
  Cloud,
  Layers,
  Workflow,
  TrendingUp,
  Shield,
} from "lucide-react";

const impactMetrics = [
  {
    id: "1",
    icon: Brain,
    title: "AI Projects Built",
    value: "10+",
    description: "Production AI systems including Nexa AI, Smart Agent Hub, and Mythos Nexus AI deployed and operational.",
    highlight: "NLP, Agents, Analytics",
  },
  {
    id: "2",
    icon: Workflow,
    title: "Automation Platforms",
    value: "6+",
    description: "End-to-end automation systems including AlphaBot, GhostHub, and Post Agent handling tasks at scale.",
    highlight: "Trading, Scheduling, Distribution",
  },
  {
    id: "3",
    icon: BarChart3,
    title: "Analytics Systems",
    value: "4+",
    description: "Real-time dashboards and analytics platforms including TokenAnalyzer and SAH Ultimate for data-driven decisions.",
    highlight: "Real-time, Predictive, Reporting",
  },
  {
    id: "4",
    icon: Cloud,
    title: "SaaS Products",
    value: "5+",
    description: "Delivered SaaS platforms including SAH Poc Maker and Mythos Nexus AI with multi-tenancy and subscription models.",
    highlight: "Multi-tenant, Scalable, API-first",
  },
  {
    id: "5",
    icon: Bot,
    title: "Agent Systems",
    value: "8+",
    description: "Built autonomous agent architectures for Smart Agent Hub, GhostHub, and Post Agent with orchestration and monitoring.",
    highlight: "Orchestration, RBAC, Monitoring",
  },
  {
    id: "6",
    icon: Layers,
    title: "Active Portfolio",
    value: "10",
    description: "All projects actively maintained with continuous updates, feature additions, and production monitoring.",
    highlight: "Maintained, Updated, Monitored",
  },
];

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="relative z-10 py-24 sm:py-32">
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
            Impact
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            Project <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Measurable outcomes across AI systems, automation platforms, and analytics products.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {impactMetrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="glass-card rounded-2xl p-6 h-full glow-border hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <metric.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="text-2xl font-bold font-display gradient-text">
                    {metric.value}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">{metric.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {metric.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {metric.highlight.split(", ").map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-xs text-primary/70 glass rounded-md border border-primary/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
