export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  features: string[];
  link: string;
  category: string;
  createdAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  publishedAt: string;
  author: string;
  readTime: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  createdAt: string;
  status: "new" | "contacted" | "in-progress" | "completed";
}

export interface UpcomingProject {
  id: string;
  title: string;
  description: string;
  status: "planning" | "development" | "beta" | "launching";
  timeline: string;
  features: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface TechItem {
  name: string;
  icon: string;
  category: string;
}
