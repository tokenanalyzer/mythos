"use client";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <Navigation />
      <section className="relative min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-secondary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold font-display text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/60">Last Updated: June 23, 2026</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-invert max-w-none"
          >
            <div className="space-y-8 text-white/80">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">1. Information Collection and Use</h2>
                <p>
                  MYTHOS ("we," "our," or "us") operates the website https://mythos-lemon-beta.vercel.app/ (the "Service"). 
                  This page informs you of our policies regarding the collection, use, and disclosure of personal data when you 
                  use our Service and the choices you have associated with that data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Types of Data Collected</h2>
                <h3 className="text-xl font-semibold text-white/90 mb-2">Personal Data</h3>
                <p>While using our Service, we may ask you to provide us with certain personally identifiable information:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Contact Information: Name, email address, phone number</li>
                  <li>Project Details: Information about your project type, budget, and requirements</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Usage Data</h2>
                <p>
                  We may collect information about how the Service is accessed and used, including your IP address, 
                  browser type, pages visited, time and date of visits, and unique device identifiers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking</h2>
                <p>
                  We use cookies and similar tracking technologies to track activity on our Service. You can instruct 
                  your browser to refuse all cookies or to indicate when a cookie is being sent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Use of Data</h2>
                <p>MYTHOS uses the collected data for various purposes:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>To provide and maintain the Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To provide customer care and support</li>
                  <li>To monitor the usage of the Service</li>
                  <li>To respond to your inquiries and requests</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Security of Data</h2>
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet 
                  is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, 
                  we cannot guarantee its absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Third-Party Services</h2>
                <p>We may employ third party companies to facilitate our Service:</p>
                <ul className="list-disc list-inside space-y-2 mt-2">
                  <li>Supabase: For database storage</li>
                  <li>Resend: For email notifications</li>
                  <li>Vercel: Hosting and deployment</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at{" "}
                  <a href="mailto:adilcryptonews@gmail.com" className="text-primary hover:text-secondary">
                    adilcryptonews@gmail.com
                  </a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
