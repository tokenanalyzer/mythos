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
  Trash2,
  Image as ImageIcon,
  X,
  Menu,
  Save,
  Loader2,
  Upload,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Data State
  const [leads, setLeads] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalProjects: 0, totalBlogPosts: 0, totalLeads: 0 });

  // Forms State
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({ title: "", description: "", category: "", image_url: "" });
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [blogForm, setBlogForm] = useState({ title: "", slug: "", excerpt: "", content: "", image_url: "" });
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

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
    const { data: leadsData } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    const { data: projectsData } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    const { data: blogsData } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    
    if (leadsData) setLeads(leadsData);
    if (projectsData) setProjects(projectsData);
    if (blogsData) setBlogPosts(blogsData);
    
    setStats({
      totalLeads: leadsData?.length || 0,
      totalProjects: projectsData?.length || 0,
      totalBlogPosts: blogsData?.length || 0,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword(loginForm);
    if (error) alert(error.message);
    else { setIsAuthenticated(true); fetchData(); }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  const handleFileUpload = async (file: File, folder: string) => {
    const filePath = `${folder}/${Math.random()}.${file.name.split('.').pop()}`;
    const { error } = await supabase.storage.from('mythos').upload(filePath, file);
    if (error) { alert(error.message); return null; }
    return supabase.storage.from('mythos').getPublicUrl(filePath).data.publicUrl;
  };

  const deleteItem = async (table: string, id: string) => {
    if (!confirm("Delete this item?")) return;
    await supabase.from(table).delete().eq("id", id);
    fetchData();
  };

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-primary">Loading...</div>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md p-8 bg-zinc-900 rounded-3xl border border-white/10">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">MYTHOS Admin</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" placeholder="Email" className="w-full p-4 bg-black rounded-xl border border-white/10 text-white" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} required />
            <input type="password" placeholder="Password" className="w-full p-4 bg-black rounded-xl border border-white/10 text-white" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} required />
            <button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <div className="lg:hidden p-4 bg-zinc-900 border-b border-white/10 flex justify-between items-center sticky top-0 z-50">
        <h1 className="font-bold">MYTHOS</h1>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'fixed inset-0 z-40 bg-black/80 lg:bg-transparent' : 'hidden'} lg:block lg:w-64 lg:sticky lg:top-0 lg:h-screen bg-zinc-900 border-r border-white/10 p-6`}>
        <h1 className="hidden lg:block text-xl font-bold mb-10 text-blue-500">MYTHOS ADMIN</h1>
        <nav className="space-y-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "projects", label: "Projects", icon: FolderOpen },
            { id: "blog", label: "Blog Posts", icon: FileText },
            { id: "leads", label: "Leads", icon: MessageSquare },
          ].map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:bg-white/5'}`}>
              <item.icon size={20} /> {item.label}
            </button>
          ))}
        </nav>
        <button onClick={handleLogout} className="absolute bottom-6 left-6 right-6 flex items-center gap-3 p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-all">
          <LogOut size={20} /> Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10">
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-zinc-900 rounded-2xl border border-white/10">
                <p className="text-zinc-500 text-sm uppercase font-bold">Projects</p>
                <p className="text-4xl font-bold mt-2">{stats.totalProjects}</p>
              </div>
              <div className="p-6 bg-zinc-900 rounded-2xl border border-white/10">
                <p className="text-zinc-500 text-sm uppercase font-bold">Blogs</p>
                <p className="text-4xl font-bold mt-2">{stats.totalBlogPosts}</p>
              </div>
              <div className="p-6 bg-zinc-900 rounded-2xl border border-white/10">
                <p className="text-zinc-500 text-sm uppercase font-bold">Leads</p>
                <p className="text-4xl font-bold mt-2">{stats.totalLeads}</p>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-2xl border border-white/10 p-6">
              <h2 className="text-xl font-bold mb-4">Recent Leads</h2>
              <div className="space-y-3">
                {leads.slice(0, 5).map(l => (
                  <div key={l.id} className="p-4 bg-black rounded-xl border border-white/5 flex justify-between items-center">
                    <div><p className="font-bold">{l.name}</p><p className="text-xs text-zinc-500">{l.project_type}</p></div>
                    <span className="text-[10px] bg-blue-600/20 text-blue-500 px-2 py-1 rounded-md uppercase font-bold">{l.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Projects</h2>
              <button onClick={() => setShowProjectForm(true)} className="p-3 bg-blue-600 rounded-xl flex items-center gap-2 font-bold"><Plus size={20} /> Add New</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(p => (
                <div key={p.id} className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden group">
                  <div className="h-40 bg-black relative">
                    {p.image_url && <img src={p.image_url} className="w-full h-full object-cover" />}
                    <button onClick={() => deleteItem('projects', p.id)} className="absolute top-3 right-3 p-2 bg-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
                  </div>
                  <div className="p-4"><h3 className="font-bold">{p.title}</h3><p className="text-sm text-zinc-500 line-clamp-2">{p.description}</p></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "blog" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Blog Posts</h2>
              <button onClick={() => setShowBlogForm(true)} className="p-3 bg-blue-600 rounded-xl flex items-center gap-2 font-bold"><Plus size={20} /> New Post</button>
            </div>
            <div className="space-y-4">
              {blogPosts.map(p => (
                <div key={p.id} className="p-4 bg-zinc-900 rounded-2xl border border-white/10 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-black rounded-lg overflow-hidden flex-shrink-0">
                    {p.image_url && <img src={p.image_url} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1"><h3 className="font-bold">{p.title}</h3><p className="text-xs text-zinc-500">{p.slug}</p></div>
                  <button onClick={() => deleteItem('blog_posts', p.id)} className="p-2 text-zinc-500 hover:text-red-500"><Trash2 size={20} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "leads" && (
          <div className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-black/50 text-zinc-500 text-xs uppercase font-bold">
                <tr><th className="p-4">Client</th><th className="p-4">Project</th><th className="p-4 text-right">Action</th></tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map(l => (
                  <tr key={l.id} className="hover:bg-white/5 transition-all">
                    <td className="p-4"><p className="font-bold">{l.name}</p><p className="text-xs text-zinc-500">{l.email}</p></td>
                    <td className="p-4 text-sm">{l.project_type}</td>
                    <td className="p-4 text-right"><button onClick={() => deleteItem('leads', l.id)} className="text-zinc-600 hover:text-red-500"><Trash2 size={18} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Forms Modals */}
      <AnimatePresence>
        {(showProjectForm || showBlogForm) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-zinc-900 w-full max-w-xl rounded-3xl p-8 border border-white/10 my-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">{showProjectForm ? 'Add Project' : 'New Blog Post'}</h3>
                <button onClick={() => { setShowProjectForm(false); setShowBlogForm(false); }} className="p-2 bg-white/5 rounded-lg"><X /></button>
              </div>
              
              {showProjectForm ? (
                <form onSubmit={async (e) => {
                  e.preventDefault(); setIsSubmitting(true);
                  const { error } = await supabase.from("projects").insert([projectForm]);
                  if (error) alert(error.message); else { setShowProjectForm(false); fetchData(); }
                  setIsSubmitting(false);
                }} className="space-y-4">
                  <input placeholder="Title" className="w-full p-4 bg-black rounded-xl border border-white/10" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} required />
                  <textarea placeholder="Description" rows={3} className="w-full p-4 bg-black rounded-xl border border-white/10" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} required />
                  <div className="flex items-center gap-4">
                    <label className="flex-1 p-4 bg-black border border-dashed border-white/20 rounded-xl text-center cursor-pointer hover:border-blue-500 transition-all">
                      <Upload size={20} className="mx-auto mb-2 text-zinc-500" />
                      <span className="text-xs text-zinc-500">Upload Photo</span>
                      <input type="file" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) { const url = await handleFileUpload(file, 'projects'); if (url) setProjectForm({...projectForm, image_url: url}); }
                      }} />
                    </label>
                    {projectForm.image_url && <img src={projectForm.image_url} className="w-16 h-16 rounded-lg object-cover" />}
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-blue-600 rounded-xl font-bold flex justify-center">{isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Project'}</button>
                </form>
              ) : (
                <form onSubmit={async (e) => {
                  e.preventDefault(); setIsSubmitting(true);
                  const { error } = await supabase.from("blog_posts").insert([blogForm]);
                  if (error) alert(error.message); else { setShowBlogForm(false); fetchData(); }
                  setIsSubmitting(false);
                }} className="space-y-4">
                  <input placeholder="Title" className="w-full p-4 bg-black rounded-xl border border-white/10" value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} required />
                  <input placeholder="Slug" className="w-full p-4 bg-black rounded-xl border border-white/10" value={blogForm.slug} onChange={e => setBlogForm({...blogForm, slug: e.target.value})} required />
                  <textarea placeholder="Content" rows={5} className="w-full p-4 bg-black rounded-xl border border-white/10" value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} required />
                  <div className="flex items-center gap-4">
                    <label className="flex-1 p-4 bg-black border border-dashed border-white/20 rounded-xl text-center cursor-pointer hover:border-blue-500 transition-all">
                      <Upload size={20} className="mx-auto mb-2 text-zinc-500" />
                      <span className="text-xs text-zinc-500">Upload Cover</span>
                      <input type="file" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) { const url = await handleFileUpload(file, 'blog'); if (url) setBlogForm({...blogForm, image_url: url}); }
                      }} />
                    </label>
                    {blogForm.image_url && <img src={blogForm.image_url} className="w-16 h-16 rounded-lg object-cover" />}
                  </div>
                  <button disabled={isSubmitting} type="submit" className="w-full py-4 bg-blue-600 rounded-xl font-bold flex justify-center">{isSubmitting ? <Loader2 className="animate-spin" /> : 'Publish Blog'}</button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
