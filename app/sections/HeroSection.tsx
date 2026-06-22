"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Sparkles, MessageCircle, Code2, Smartphone, Globe, Database, Bot, BarChart3, Layers } from "lucide-react";
import ThreeDCube from "../components/ThreeDCube";
import Link from "next/link";
import CountUp from "react-countup";

const stats = [
  { value: 50, suffix: "+", label: "Projects Built", icon: Layers },
  { value: 25, suffix: "+", label: "Technologies", icon: Code2 },
  { value: 5000, suffix: "+", label: "Hours Invested", icon: Sparkles },
  { value: 12, suffix: "+", label: "Products Created", icon: Database },
];

const services = [
  "AI Development",
  "Web Applications",
  "Mobile Applications",
  "CRM Systems",
  "Dashboards",
  "Automation Platforms",
];

const WHATSAPP_NUMBER = "919967873413";
const WHATSAPP_MESSAGE = "Hi Adil, I want to discuss a project.";
const whatsappUrl = `https://wa.me/+${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;


export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D Cube Background */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 h-full flex items-center justify-center pointer-events-none z-10 opacity-50 md:opacity-100">
        <div className="w-full h-full max-w-2xl">
          <ThreeDCube />
        </div>
      </div>
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[150px]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8"
        >
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Available for Projects</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6"
        >
          <span className="block text-white">Building</span>
          <span className="block gradient-text">AI Systems, Apps</span>
          <span className="block text-white">& Digital Products</span>
          <span className="block gradient-text">That Scale</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {services.map((service, index) => (
            <motion.span
              key={service}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="px-4 py-2 text-sm font-medium text-white/80 glass rounded-full border border-white/10 hover:border-primary/30 transition-colors"
            >
              {service}
            </motion.span>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link
            href="#projects"
            className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>

          <Link
            href="#order"
            className="group px-8 py-4 text-base font-semibold text-white glass rounded-2xl border border-white/20 hover:border-primary/30 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Start Your Project
            </span>
          </Link>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof window !== "undefined" && window.gtag) {
                window.gtag("event", "whatsapp_click", {
                  event_category: "engagement",
                  event_label: "hero_section",
                });
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Chat on WhatsApp
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass-card rounded-2xl p-6 text-center group cursor-default"
            >
              <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <div className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">
                <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} enableScrollSpy scrollSpyOnce />
              </div>
              <div className="text-xs text-white/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
