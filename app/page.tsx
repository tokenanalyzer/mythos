"use client";

import { useEffect } from "react";
import Navigation from "./components/Navigation";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ServicesSection from "./sections/ServicesSection";
import ProjectsSection from "./sections/ProjectsSection";
import UpcomingSection from "./sections/UpcomingSection";
import TechStackSection from "./sections/TechStackSection";
import WhyChooseSection from "./sections/WhyChooseSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import OrderSection from "./sections/OrderSection";
import ContactSection from "./sections/ContactSection";
import BlogSection from "./sections/BlogSection";
import Footer from "./components/Footer";
import ParticleBackground from "./components/ParticleBackground";
import MouseFollower from "./components/MouseFollower";

export default function Home() {
  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute("href")?.slice(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <ParticleBackground />
      <MouseFollower />
      <Navigation />

      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <UpcomingSection />
      <TechStackSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <BlogSection />
      <OrderSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
