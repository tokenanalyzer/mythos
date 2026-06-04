import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MYTHOS | Adil Hussain - AI Systems & Digital Products",
  description: "Building AI Systems, Apps & Digital Products That Scale. Premium development services for Web Apps, Mobile Apps, CRM, Dashboards, Automation & AI Products.",
  keywords: ["AI Development", "Web Development", "Mobile Apps", "CRM", "Dashboards", "Automation", "SaaS", "Adil Hussain"],
  authors: [{ name: "Adil Hussain" }],
  creator: "Adil Hussain",
  openGraph: {
    title: "MYTHOS | Adil Hussain",
    description: "Building AI Systems, Apps & Digital Products That Scale",
    type: "website",
    locale: "en_US",
    siteName: "MYTHOS",
  },
  twitter: {
    card: "summary_large_image",
    title: "MYTHOS | Adil Hussain",
    description: "Building AI Systems, Apps & Digital Products That Scale",
    creator: "@Husain3413",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased bg-background text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
