"use client";
import { motion } from "framer-motion";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsAndConditions() {
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
              Terms & Conditions
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
                <h2 className="text-2xl font-bold text-white mb-4">1. Services Provided</h2>
                <p>
                  MYTHOS specializes in providing premium development services for a range of digital products and AI systems, 
                  including AI Development, Web Development, Mobile App Development, CRM Systems, SaaS Products, Dashboard Development, 
                  Automation Systems, Admin Panels, Landing Pages, Business Websites, Ad Creative Design, and Brand Development.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
                <p>
                  The Service and its original content, features and functionality are and will remain the exclusive property of 
                  MYTHOS and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks may 
                  not be used in connection with any product or service without the prior written consent of MYTHOS.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">3. Links To Other Web Sites</h2>
                <p>
                  Our Service may contain links to third-party web sites or services that are not owned or controlled by MYTHOS. 
                  MYTHOS has no control over, and assumes no responsibility for, the content, privacy policies, or practices of 
                  any third party web sites or services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">4. Termination</h2>
                <p>
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, 
                  including without limitation if you breach the Terms. Upon termination, your right to use the Service will 
                  immediately cease.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">5. Limitation Of Liability</h2>
                <p>
                  In no event shall MYTHOS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable 
                  for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of 
                  profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">6. Disclaimer</h2>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. 
                  The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, 
                  implied warranties of merchantability, fitness for a particular purpose, non-infringement or course of performance.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict 
                  of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of 
                  those rights.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">8. Changes To This Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
                  material we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at{" "}
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
