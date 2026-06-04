"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, ArrowRight, Tag, BookOpen, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: "1",
    title: "Building AI-Powered Applications with Next.js and OpenAI",
    slug: "ai-powered-apps-nextjs-openai",
    excerpt: "Learn how to integrate OpenAI APIs into your Next.js applications for intelligent features like chatbots, content generation, and data analysis.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    tags: ["AI", "Next.js", "OpenAI"],
    publishedAt: "2024-12-15",
    author: "Adil Hussain",
    readTime: 8,
  },
  {
    id: "2",
    title: "The Future of Web Development: Trends for 2025",
    slug: "web-development-trends-2025",
    excerpt: "Explore the cutting-edge technologies and methodologies shaping the future of web development, from AI integration to edge computing.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop",
    tags: ["Web Dev", "Trends", "2025"],
    publishedAt: "2024-11-28",
    author: "Adil Hussain",
    readTime: 6,
  },
  {
    id: "3",
    title: "Creating Stunning Dashboards with React and D3.js",
    slug: "react-d3-dashboards",
    excerpt: "A comprehensive guide to building interactive data visualization dashboards that combine React's power with D3.js's flexibility.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    tags: ["React", "D3.js", "Dashboard"],
    publishedAt: "2024-11-10",
    author: "Adil Hussain",
    readTime: 10,
  },
  {
    id: "4",
    title: "Mobile App Development: React Native vs Flutter in 2024",
    slug: "react-native-vs-flutter-2024",
    excerpt: "An in-depth comparison of the two leading cross-platform frameworks to help you choose the right technology for your next mobile project.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
    tags: ["Mobile", "React Native", "Flutter"],
    publishedAt: "2024-10-22",
    author: "Adil Hussain",
    readTime: 7,
  },
  {
    id: "5",
    title: "Scaling Your SaaS: Architecture Patterns That Work",
    slug: "scaling-saas-architecture",
    excerpt: "Discover proven architecture patterns and strategies for building SaaS applications that can scale from hundreds to millions of users.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    tags: ["SaaS", "Architecture", "Scaling"],
    publishedAt: "2024-10-05",
    author: "Adil Hussain",
    readTime: 12,
  },
  {
    id: "6",
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    slug: "typescript-advanced-patterns",
    excerpt: "Level up your TypeScript skills with advanced type patterns, utility types, and best practices for large-scale applications.",
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop",
    tags: ["TypeScript", "Patterns", "Best Practices"],
    publishedAt: "2024-09-18",
    author: "Adil Hussain",
    readTime: 9,
  },
];

export default function BlogSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <section id="blog" className="relative z-10 py-24 sm:py-32">
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
            Blog
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display mb-4">
            Latest <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto mb-8">
            Thoughts on AI, web development, and building digital products.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
            />
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`#blog/${post.slug}`} className="block">
                <div className="glass-card rounded-2xl overflow-hidden glow-border hover:border-primary/30 transition-all duration-300">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-2 py-1 text-xs text-primary/70 glass rounded-md border border-primary/10"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/60 mb-4 line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime} min read
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
