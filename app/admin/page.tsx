"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Edit3,
  Trash2,
  Eye,
  BarChart3,
  Users,
  TrendingUp,
  ChevronRight,
  Search,
  Filter,
  Image as ImageIcon,
  Link as LinkIcon,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";

// Mock data for demo
const mockStats = {
  totalProjects: 12,
  totalBlogPosts: 24,
  totalLeads: 156,
  totalTestimonials: 8,
};

const mockProjects = [
  { id: "1", title: "TokenAnalyzer", category: "AI / Crypto", status: "live", views: 2340 },
  { id: "2", title: "AlphaBot", category: "Automation", status: "live", views: 1890 },
  { id: "3", title: "GhostHub", category: "Automation", status: "live", views: 1560 },
];

const mockLeads = [
  { id: "1", name: "John Smith", email: "john@example.com", projectType: "Web App", budget: "$10,000 - $25,000", status: "new", date: "2024-12-20" },
  { id: "2", name: "Sarah Johnson", email: "sarah@company.com", projectType: "AI Product", budget: "$25,000 - $50,000", status: "contacted", date: "2024-12-18" },
];

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "leads", label: "Leads", icon: MessageSquare },
  { id: "testimonials", label: "Testimonials", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  // Check auth (mock)
  useEffect(() => {
    const auth = localStorage.getItem("mythos_admin_auth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.email === "admin@mythos.dev" && loginForm.password === "admin123") {
      localStorage.setItem("mythos_admin_auth", "true");
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mythos_admin_auth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-strong rounded-2xl p-8 w-full max-w-md glow-border"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gradient-text mb-2">MYTHOS Admin</h1>
            <p className="text-white/60 text-sm">Sign in to access the dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-sm text-white/70 mb-1 block">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                placeholder="admin@mythos.dev"
              />
            </div>
            <div>
              <label className="text-sm text-white/70 mb-1 block">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-primary/50"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-secondary rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              Sign In
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 glass-strong border-r border-white/5 transition-all duration-300 ${
          isSidebarOpen ? "w-64" : "w-0 lg:w-20"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
              <LayoutDashboard className="w-5 h-5 text-primary" />
            </div>
            {isSidebarOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="overflow-hidden"
              >
                <h1 className="font-bold text-white whitespace-nowrap">MYTHOS</h1>
                <p className="text-xs text-white/50 whitespace-nowrap">Admin Panel</p>
              </motion.div>
            )}
          </div>

          <nav className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {isSidebarOpen && <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:text-red-400 hover:bg-red-400/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 min-h-screen overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-40 glass-strong border-b border-white/5 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white capitalize">{activeTab}</h2>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {/* Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: "Total Projects", value: mockStats.totalProjects, icon: FolderOpen, color: "from-primary/20 to-secondary/20" },
                    { label: "Blog Posts", value: mockStats.totalBlogPosts, icon: FileText, color: "from-purple-400/20 to-pink-400/20" },
                    { label: "Total Leads", value: mockStats.totalLeads, icon: MessageSquare, color: "from-green-400/20 to-emerald-400/20" },
                    { label: "Testimonials", value: mockStats.totalTestimonials, icon: Users, color: "from-orange-400/20 to-amber-400/20" },
                  ].map((stat) => (
                    <div key={stat.label} className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${stat.color}`}>
                      <div className="flex items-center justify-between mb-4">
                        <stat.icon className="w-5 h-5 text-primary" />
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-3">
                    {mockLeads.map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">{lead.name}</p>
                            <p className="text-xs text-white/50">{lead.projectType} — {lead.budget}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-md ${
                          lead.status === "new" ? "bg-green-400/10 text-green-400" : "bg-primary/10 text-primary"
                        }`}>
                          {lead.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="text"
                        placeholder="Search projects..."
                        className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-primary/50"
                      />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white/70 hover:text-white transition-colors">
                      <Filter className="w-4 h-4" />
                      Filter
                    </button>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-xl text-sm font-medium text-white hover:shadow-lg hover:shadow-primary/25 transition-all">
                    <Plus className="w-4 h-4" />
                    Add Project
                  </button>
                </div>

                <div className="glass-card rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Project</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Category</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Views</th>
                        <th className="text-right px-6 py-4 text-sm font-medium text-white/60">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockProjects.map((project) => (
                        <tr key={project.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                <FolderOpen className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-white">{project.title}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs text-primary/70 glass rounded-md border border-primary/10">
                              {project.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="flex items-center gap-1.5 text-sm text-green-400">
                              <div className="w-2 h-2 rounded-full bg-green-400" />
                              {project.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-white/60">{project.views.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-primary transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-primary transition-colors">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === "leads" && (
              <motion.div
                key="leads"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="glass-card rounded-2xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/5">
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Name</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Project</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Budget</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Status</th>
                        <th className="text-left px-6 py-4 text-sm font-medium text-white/60">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockLeads.map((lead) => (
                        <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="text-sm font-medium text-white">{lead.name}</p>
                              <p className="text-xs text-white/50">{lead.email}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-white/80">{lead.projectType}</td>
                          <td className="px-6 py-4 text-sm text-white/80">{lead.budget}</td>
                          <td className="px-6 py-4">
                            <select
                              className="px-2 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-white focus:outline-none"
                              defaultValue={lead.status}
                            >
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="in-progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </td>
                          <td className="px-6 py-4 text-sm text-white/60">{lead.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Other tabs placeholder */}
            {["blog", "testimonials", "settings"].includes(activeTab) && (
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Coming Soon</h3>
                <p className="text-white/60">This section is under development.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
