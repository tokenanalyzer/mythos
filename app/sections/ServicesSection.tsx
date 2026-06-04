"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Brain,
  Smartphone,
  Globe,
  LayoutDashboard,
  Database,
  Workflow,
  Cloud,
  Shield,
  FileCode,
  Building2,
  Palette,
  Megaphone,
} from "lucide-react";

const services = [
  {
    id: "1",
    title: "AI Development",
    description: "Custom AI solutions, chatbots, and intelligent automation systems powered by cutting-edge models.",
    icon: Brain,
    features: ["Custom AI Models", "Chatbot Development", "NLP Solutions", "AI Integration"],
  },
  {
    id: "2",
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications with stunning UI and robust performance.",
    icon: Smartphone,
    features: ["iOS & Android", "React Native", "Flutter", "Native APIs"],
  },
  {
    id: "3",
    title: "Web Development",
    description: "Modern, responsive web applications built with the latest technologies and best practices.",
    icon: Globe,
    features: ["Next.js", "React", "TypeScript", "SSR/SSG"],
  },
  {
    id: "4",
    title: "Dashboard Development",
    description: "Real-time data visualization dashboards with interactive charts and analytics.",
    icon: LayoutDashboard,
    features: ["Real-time Data", "Interactive Charts", "Custom Widgets", "Analytics"],
  },
  {
    id: "5",
    title: "CRM Development",
    description: "Custom CRM solutions tailored to your business processes and customer management needs.",
    icon: Database,
    features: ["Lead Management", "Sales Pipeline", "Customer Analytics", "Automation"],
  },
  {
    id: "6",
    title: "Automation Systems",
    description: "Business process automation to streamline workflows and increase operational efficiency.",
    icon: Workflow,
    features: ["Workflow Automation", "API Integration", "Data Processing", "Scheduling"],
  },
  {
    id: "7",
    title: "SaaS Products",
    description: "End-to-end SaaS product development from concept to deployment and scaling.",
    icon: Cloud,
    features: ["Multi-tenancy", "Subscription Management", "API Design", "Scalability"],
  },
  {
    id: "8",
    title: "Admin Panels",
    description: "Powerful admin interfaces with role-based access control and comprehensive management tools.",
    icon: Shield,
    features: ["RBAC", "Data Management", "Reporting", "Audit Logs"],
  },
  {
    id: "9",
    title: "Landing Pages",
    description: "High-converting landing pages optimized for performance and user engagement.",
    icon: FileCode,
    features: ["A/B Testing", "SEO Optimized", "Fast Loading", "Analytics"],
  },
  {
    id: "10",
    title: "Business Websites",
    description: "Professional corporate websites that establish credibility and drive conversions.",
    icon: Building2,
    features: ["Corporate Design", "CMS Integration", "SEO Ready", "Responsive"],
  },
  {
    id: "11",
    title: "Ad Creative Design",
    description: "Eye-catching ad creatives and marketing assets that capture attention and drive results.",
    icon: Palette,
    features: ["Banner Ads", "Social Media", "Video Ads", "Brand Assets"],
  },
  {
    id: "12",
    title: "Brand Development",
    description: "Complete brand identity development from logo design to comprehensive brand guidelines.",
    icon: Megaphone,
    features: ["Logo Design", "Brand Guidelines", "Visual Identity", "Brand Strategy"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setTilt({ x: -y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      className="group relative"
    >
      <div className="glass-card rounded-2xl p-6 h-full glow-border hover:border-primary/30 transition-all duration-300">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <service.icon className="w-6 h-6 text-primary" />
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
          <p className="text-sm text-white/60 mb-4 leading-relaxed">{service.description}</p>

          <div className="flex flex-wrap gap-2">
            {service.features.map((feature) => (
              <span
                key={feature}
                className="px-2 py-1 text-xs text-primary/70 glass rounded-md border border-primary/10"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative z-10 py-24 sm:py-32">
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
            Services
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            What I <span className="gradient-text">Build</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Premium development services tailored to transform your vision into powerful digital solutions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
