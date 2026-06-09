-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT NOT NULL,
  budget TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending'
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT,
  technologies TEXT[],
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  author TEXT,
  tags TEXT[],
  is_published BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies for leads (Anyone can insert, only authenticated can read/update)
CREATE POLICY "Enable insert for all users" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Enable select for authenticated users only" ON leads FOR SELECT TO authenticated USING (true);
CREATE POLICY "Enable update for authenticated users only" ON leads FOR UPDATE TO authenticated USING (true);

-- Policies for projects (Anyone can read, only authenticated can manage)
CREATE POLICY "Enable read for all users" ON projects FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users only" ON projects FOR ALL TO authenticated USING (true);

-- Policies for blog_posts (Anyone can read, only authenticated can manage)
CREATE POLICY "Enable read for all users" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Enable all for authenticated users only" ON blog_posts FOR ALL TO authenticated USING (true);
