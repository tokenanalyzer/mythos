# MYTHOS — Premium Personal Brand & Digital Agency Website

A world-class personal brand website for **Adil Hussain** that functions as a client acquisition machine. Built with cutting-edge technologies and premium design aesthetics.

## 🚀 Live Features

- **Cinematic Hero** with particle background, animated stats, and scroll effects
- **Glassmorphism Design** throughout with frosted glass panels and dynamic blur
- **Premium Animations** using Framer Motion and GSAP
- **Mouse Follower** with custom cursor effects
- **Interactive Services** with 3D tilt cards and glow borders
- **Project Showcase** with hover animations and tech stacks
- **Animated Timeline** for upcoming projects roadmap
- **Floating Tech Stack** with marquee animations
- **Testimonial Carousel** with auto-slide and smooth transitions
- **Lead Generation Form** with validation and Firebase integration ready
- **Blog System** with search and filtering
- **Admin Dashboard** with analytics, project management, and lead tracking
- **Fully Responsive** design optimized for all devices
- **SEO Optimized** with meta tags and structured data
- **PWA Ready** configuration

## 🎨 Design System

- **Primary:** `#00D4FF` (Electric Blue)
- **Secondary:** `#0066FF` (Deep Blue)
- **Accent:** `#4D9EFF` (Sky Blue)
- **Background:** `#050505` (Deep Black)
- **Glass:** Transparent Frosted Glass with backdrop blur
- **Text:** White with gradient highlights

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **React:** 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion, GSAP
- **3D Graphics:** Three.js / React Three Fiber
- **Backend:** Firebase (Auth, Firestore, Storage, Functions)
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
- **Deployment:** Vercel

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mythos.git
cd mythos

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Firebase credentials

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔥 Firebase Setup

1. Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Authentication, Firestore, and Storage
3. Copy your Firebase config to `.env.local`
4. Set up Firestore security rules for production

## 🌐 Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📁 Project Structure

```
mythos/
├── app/
│   ├── sections/          # Page sections (Hero, About, Services, etc.)
│   ├── components/        # Reusable components (Navigation, Footer, etc.)
│   ├── lib/              # Utilities and Firebase config
│   ├── types/            # TypeScript types
│   ├── admin/            # Admin dashboard
│   ├── api/              # API routes
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/ui/         # UI components
├── public/               # Static assets
├── lib/                  # Shared utilities
├── types/                # Global types
├── package.json
├── tailwind.config.ts
├── next.config.js
└── vercel.json
```

## 🎯 Performance Targets

- Lighthouse Score: 90+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## 📄 License

MIT License — feel free to use and modify for your projects.

## 👤 Owner

**Adil Hussain**
- Email: adilcryptonews@gmail.com
- X: @Husain3413
- LinkedIn: Adil Hussain
- GitHub: tokenanalyzer

---

Built with passion and precision. 🚀
