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
  Bell,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Loader2,
} from "lucide-react";
import { supabase } from "../lib/supabase";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "blog", label: "Blog Posts", icon: FileText },
  { id: "leads", label: "Leads", icon: MessageSquare },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [leads, setLeads] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalBlogPosts: 0,
    totalLeads: 0,
    newLeads: 0,
  });

  // Forms State
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    category: "",
    live_url: "",
    github_url: "",
    image_url: "",
  });

  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image_url: "",
  });

  // Check auth
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
        fetchData();
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  const fetchData = async () => {
    // Fetch Leads
    const { data: leadsData } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (leadsData) {
      setLeads(leadsData);
      const newLeadsCount = leadsData.filter(l => l.status === 'pending').length;
      setStats(prev => ({ ...prev, totalLeads: leadsData.length, newLeads: newLeadsCount }));
    }

    // Fetch Projects
    const { data: projectsData } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    if (projectsData) {
      setProjects(projectsData);
      setStats(prev => ({ ...prev, totalProjects: projectsData.length }));
    }

    // Fetch Blogs
    const { data: blogsData } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (blogsData) {
      setBlogPosts(blogsData);
      setStats(prev => ({ ...prev, totalBlogPosts: blogsData.length }));
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: loginForm.email,
      password: loginForm.password,
    });

    if (error) {
      alert(error.message);
    } else {
      setIsAuthenticated(true);
      fetchData();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleFileUpload = async (file: File, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${folder}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('mythos')
      .upload(filePath, file);

    if (uploadError) {
      alert('Upload failed: ' + uploadError.message);
      return null;
    }

    const { data } = supabase.storage.from('mythos').getPublicUrl(filePath);
    return data.publicUrl;
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("projects").insert([projectForm]);
    if (error) alert(error.message);
    else {
      setShowProjectForm(false);
      setProjectForm({ title: "", description: "", category: "", live_url: "", github_url: "", image_url: "" });
      fetchData();
    }
    setIsSubmitting(false);
  };

  const handleAddBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { error } = await supabase.from("blog_posts").insert([blogForm]);
    if (error) alert(error.message);
    else {
      setShowBlogForm(false);
      setBlogForm({ title: "", slug: "", excerpt: "", content: "", image_url: "" });
      fetchData();
    }
    setIsSubmitting(false);
  };

  const deleteItem = async (table: string, id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) alert(error.message);
    else fetchData();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[120px]" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-strong rounded-3xl p-8 w-full max-w-md relative z-10 border border-white/10 shadow-2xl"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary/20">
              <LayoutDashboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">MYTHOS</h1>
            <p className="text-white/50">Admin Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block ml-1">Email Address</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                placeholder="admin@mythos.dev"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 block ml-1">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/20"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white font-bold hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex overflow-x-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`fixed lg:sticky top-0 left-0 h-screen z-50 glass-strong border-r border-white/5 transition-all duration-300 
          ${isSidebarOpen ? "w-72 translate-x-0" : "w-0 lg:w-20 -translate-x-full lg:translate-x-0"}
          ${!isSidebarOpen && "lg:block hidden"}
        `}
      >
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <LayoutDashboard className="w-6 h-6 text-white" />
            </div>
            {isSidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-xl font-bold tracking-tight">MYTHOS</h1>
                <p className="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">Enterprise Admin</p>
              </motion.div>
            )}
          </div>

          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary border border-primary/20 shadow-inner shadow-primary/5"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${activeTab === item.id ? "text-primary" : ""}`} />
                {isSidebarOpen && <span className="text-sm font-semibold tracking-wide">{item.label}</span>}
              </button>
            ))}
          </nav>

          <div className="pt-6 border-t border-white/5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all group"
            >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              {isSidebarOpen && <span className="text-sm font-semibold">Sign Out</span>}
            </button>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 min-h-screen flex flex-col relative">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all"
              >
                <LayoutDashboard className="w-5 h-5 text-primary" />
              </button>
              <h2 className="text-xl md:text-2xl font-bold capitalize tracking-tight">{activeTab}</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <button className="relative p-2.5 hover:bg-white/5 rounded-2xl transition-all">
                <Bell className="w-5 h-5 text-white/60" />
                {stats.newLeads > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-4 ring-[#050505]" />
                )}
              </button>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary p-[2px]">
                <div className="w-full h-full rounded-[10px] bg-[#050505] flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8">
          <AnimatePresence mode="wait">
            {activeTab === "dashboard" && (
              <motion.div key="dashboard" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: "Active Projects", value: stats.totalProjects, icon: FolderOpen, color: "from-blue-500 to-cyan-400" },
                    { label: "Published Blogs", value: stats.totalBlogPosts, icon: FileText, color: "from-purple-500 to-pink-400" },
                    { label: "Total Inquiries", value: stats.totalLeads, icon: MessageSquare, color: "from-emerald-500 to-teal-400" },
                    { label: "New Leads", value: stats.newLeads, icon: Bell, color: "from-orange-500 to-yellow-400" },
                  ].map((stat) => (
                    <div key={stat.label} className="glass-card rounded-3xl p-6 relative overflow-hidden group border border-white/5">
                      <div className="text-4xl font-bold tracking-tight mb-1">{stat.value}</div>
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">{stat.label}</p>
                    </div>
                  ))}
                </div>
                {/* Recent Leads Preview */}
                <div className="glass-card rounded-3xl p-8 border border-white/5">
                   <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                   <div className="space-y-4">
                     {leads.slice(0, 5).map(lead => (
                       <div key={lead.id} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                         <div>
                           <p className="font-bold">{lead.name}</p>
                           <p className="text-xs text-white/40">{lead.project_type}</p>
                         </div>
                         <span className="text-[10px] font-bold text-primary uppercase">{lead.status}</span>
                       </div>
                     ))}
                   </div>
                </div>
              </motion.div>
            )}

            {activeTab === "projects" && (
              <motion.div key="projects" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Manage Projects</h3>
                  <button onClick={() => setShowProjectForm(true)} className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add New Project
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map(project => (
                    <div key={project.id} className="glass-card rounded-3xl overflow-hidden border border-white/5 group">
                      <div className="h-48 bg-white/5 relative overflow-hidden">
                        {project.image_url ? (
                          <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/20"><ImageIcon className="w-12 h-12" /></div>
                        )}
                        <div className="absolute top-4 right-4 flex gap-2">
                          <button onClick={() => deleteItem('projects', project.id)} className="p-2 bg-red-500/80 backdrop-blur-md rounded-xl text-white hover:bg-red-600 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                        <p className="text-sm text-white/40 line-clamp-2 mb-4">{project.description}</p>
                        <div className="flex gap-2">
                          {project.live_url && <a href={project.live_url} target="_blank" className="p-2 bg-white/5 rounded-lg text-white/60 hover:text-primary"><LinkIcon className="w-4 h-4" /></a>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "blog" && (
              <motion.div key="blog" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-2xl font-bold">Blog Posts</h3>
                  <button onClick={() => setShowBlogForm(true)} className="px-6 py-3 bg-primary text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Write New Post
                  </button>
                </div>

                <div className="space-y-4">
                  {blogPosts.map(post => (
                    <div key={post.id} className="glass-card rounded-3xl p-6 border border-white/5 flex flex-col md:flex-row gap-6 items-center">
                      <div className="w-full md:w-48 h-32 bg-white/5 rounded-2xl overflow-hidden flex-shrink-0">
                        {post.image_url && <img src={post.image_url} className="w-full h-full object-cover" />}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-xl mb-2">{post.title}</h4>
                        <p className="text-sm text-white/40 line-clamp-2">{post.excerpt}</p>
                        <p className="text-[10px] font-bold text-primary uppercase mt-4 tracking-widest">{post.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => deleteItem('blog_posts', post.id)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "leads" && (
              <motion.div key="leads" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                <div className="glass-card rounded-[32px] overflow-hidden border border-white/5">
                  <table className="w-full">
                    <thead className="bg-white/[0.02] border-b border-white/5">
                      <tr>
                        <th className="text-left px-8 py-5 text-[10px] font-bold text-white/40 uppercase tracking-widest">Client</th>
                        <th className="text-left px-8 py-5 text-[10px] font-bold text-white/40 uppercase tracking-widest">Project</th>
                        <th className="text-right px-8 py-5 text-[10px] font-bold text-white/40 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {leads.map(lead => (
                        <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="px-8 py-6">
                            <p className="font-bold">{lead.name}</p>
                            <p className="text-xs text-white/40">{lead.email}</p>
                          </td>
                          <td className="px-8 py-6 text-sm text-white/60">{lead.project_type}</td>
                          <td className="px-8 py-6 text-right">
                            <button onClick={() => deleteItem('leads', lead.id)} className="p-2 text-white/20 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Project Form Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-strong w-full max-w-2xl rounded-[32px] p-8 border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Add New Project</h3>
              <button onClick={() => setShowProjectForm(false)} className="p-2 hover:bg-white/5 rounded-xl"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleAddProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase ml-1">Title</label>
                  <input required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase ml-1">Category</label>
                  <input value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase ml-1">Description</label>
                <textarea required rows={3} value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase ml-1">Project Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-primary/50 cursor-pointer transition-all">
                    <Upload className="w-8 h-8 text-white/20 mb-2" />
                    <span className="text-xs text-white/40">Click to upload photo</span>
                    <input type="file" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file, 'projects');
                        if (url) setProjectForm({...projectForm, image_url: url});
                      }
                    }} />
                  </label>
                  {projectForm.image_url && <div className="w-24 h-24 rounded-2xl overflow-hidden border border-primary/50"><img src={projectForm.image_url} className="w-full h-full object-cover" /></div>}
                </div>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save Project
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Blog Form Modal (Similar structure) */}
      {showBlogForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-strong w-full max-w-2xl rounded-[32px] p-8 border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">Write New Blog</h3>
              <button onClick={() => setShowBlogForm(false)} className="p-2 hover:bg-white/5 rounded-xl"><X className="w-6 h-6" /></button>
            </div>
            <form onSubmit={handleAddBlog} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase ml-1">Title</label>
                  <input required value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-white/40 uppercase ml-1">Slug (URL)</label>
                  <input required value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase ml-1">Excerpt (Short intro)</label>
                <textarea required rows={2} value={blogForm.excerpt} onChange={e => setBlogForm({...blogForm, excerpt: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase ml-1">Content</label>
                <textarea required rows={6} value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-2xl focus:ring-2 focus:ring-primary/50 outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-white/40 uppercase ml-1">Cover Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-primary/50 cursor-pointer transition-all">
                    <Upload className="w-8 h-8 text-white/20 mb-2" />
                    <input type="file" className="hidden" onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await handleFileUpload(file, 'blog');
                        if (url) setBlogForm({...blogForm, image_url: url});
                      }
                    }} />
                  </label>
                  {blogForm.image_url && <div className="w-24 h-24 rounded-2xl overflow-hidden border border-primary/50"><img src={blogForm.image_url} className="w-full h-full object-cover" /></div>}
                </div>
              </div>
              <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-primary text-white font-bold rounded-2xl hover:shadow-xl hover:shadow-primary/20 flex items-center justify-center gap-2">
                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Publish Blog
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
