# MYTHOS Deployment Guide

## Quick Start (5 Minutes)

### 1. Download & Extract
```bash
cd mythos
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
```bash
cp .env.example .env.local
```
Edit `.env.local` with your Firebase credentials.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production
```bash
npm run build
```

---

## Firebase Setup (10 Minutes)

### Step 1: Create Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create Project" → Name it "mythos-portfolio"
3. Enable Google Analytics (optional)

### Step 2: Get Config
1. Go to Project Settings → General
2. Scroll to "Your apps" → Click Web icon (</>)
3. Register app: "mythos-web"
4. Copy the `firebaseConfig` object

### Step 3: Add to .env.local
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mythos-portfolio.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mythos-portfolio
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mythos-portfolio.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Step 4: Enable Services
- **Authentication:** Enable Email/Password and Google sign-in
- **Firestore:** Create database in production mode
- **Storage:** Enable and set rules

### Step 5: Firestore Collections
Create these collections:
- `leads` — Store contact form submissions
- `projects` — Portfolio items
- `blog` — Blog posts
- `testimonials` — Client reviews
- `upcoming` — Roadmap items

---

## Vercel Deployment (3 Minutes)

### Option A: CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option B: GitHub Integration
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import project from GitHub
4. Add environment variables in Vercel dashboard
5. Deploy!

---

## Admin Dashboard Access

Default credentials (change in production):
- **Email:** `admin@mythos.dev`
- **Password:** `admin123`

**Important:** Change the password in `app/admin/page.tsx` before deploying!

---

## Post-Deployment Checklist

- [ ] Update Firebase security rules
- [ ] Change admin password
- [ ] Add real project images
- [ ] Update contact information
- [ ] Add Google Analytics
- [ ] Test all forms
- [ ] Verify mobile responsiveness
- [ ] Run Lighthouse audit (target 90+)
- [ ] Set up custom domain (optional)
- [ ] Configure SSL certificate

---

## Troubleshooting

### Build Errors
```bash
rm -rf node_modules .next
npm install
npm run build
```

### Firebase Connection Issues
- Verify `.env.local` values match Firebase console
- Check Firestore rules allow reads/writes
- Ensure Firebase project is not in test mode

### Image Loading Issues
- Add image domains to `next.config.js`
- Use `next/image` for optimization
- Check Firebase Storage CORS settings

---

## Performance Tips

1. **Images:** Use WebP format, optimize before upload
2. **Fonts:** Use `next/font` for optimization
3. **Code:** Enable SWC minification in `next.config.js`
4. **Analytics:** Add Vercel Analytics for insights
5. **Caching:** Configure `Cache-Control` headers

---

## Support

For issues or questions:
- Email: adilcryptonews@gmail.com
- X: @Husain3413

---

**Deploy with confidence. Build with MYTHOS.** 🚀
