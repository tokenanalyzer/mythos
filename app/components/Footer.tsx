"use client";

import { motion } from "framer-motion";
import { Zap, Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold font-display">
                <span className="gradient-text">MYTHOS</span>
              </span>
            </Link>
            <p className="text-white/60 text-sm max-w-md leading-relaxed">
              Building AI Systems, Apps & Digital Products That Scale. 
              Premium development services for the modern web.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              {["About", "Services", "Projects", "Blog", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms & Conditions"].map((link, index) => (
                <li key={link}>
                  <Link
                    href={index === 0 ? "/privacy-policy" : "/terms-and-conditions"}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {[
                { icon: Twitter, href: "https://x.com/Husain3413", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com/in/adil-hussain", label: "LinkedIn" },
                { icon: Github, href: "https://github.com/tokenanalyzer", label: "GitHub" },
                { icon: Mail, href: "mailto:adilcryptonews@gmail.com", label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 flex items-center justify-center rounded-xl glass hover:border-primary/30 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/40">
            © {currentYear} MYTHOS. All rights reserved.
          </p>
          <p className="text-sm text-white/40 flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-primary fill-primary" /> by Adil Hussain
          </p>
        </div>
      </div>
    </footer>
  );
}
