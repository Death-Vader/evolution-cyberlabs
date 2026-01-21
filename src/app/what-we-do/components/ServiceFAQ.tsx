'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const faqData = [
  { 
    q: 'What is the difference between SAST and DAST?', 
    a: 'SAST (Static Analysis) scans your source code for vulnerabilities while you are developing (White Box). DAST (Dynamic Analysis) attacks your running application from the outside, just like a real hacker would (Black Box). A complete security strategy needs both.' 
  },
  { 
    q: 'How long does a typical VAPT engagement take?', 
    a: 'For a standard web application, a comprehensive VAPT usually takes 2-3 weeks. Week 1-2 focuses on active testing and manual exploitation, while Week 3 is dedicated to reporting and verifying fixes. Larger enterprise networks may take 4+ weeks.' 
  },
  { 
    q: 'Will security testing slow down my development team?', 
    a: 'Not if integrated correctly. We use automated pipelines (DevSecOps) to catch bugs early. Our manual testing is non-intrusive and done in parallel or on staging environments, so your team can keep shipping features without blockers.' 
  },
  { 
    q: 'Do you help us fix the vulnerabilities you find?', 
    a: 'Absolutely. We don\'t just hand you a PDF and leave. We provide detailed remediation steps for every finding, often including code snippets. We also offer one round of "Re-testing" for free to verify that your patches worked.' 
  },
  { 
    q: 'Is this compliant with GDPR, ISO 27001, and SOC2?', 
    a: 'Yes. Our VAPT reports are designed to satisfy audit requirements for ISO 27001, SOC2, HIPAA, and GDPR. We provide both an Executive Summary for auditors and a Technical Report for engineers.' 
  },
  { 
    q: 'What happens if you find a Critical vulnerability?', 
    a: 'We have a "Critical Incident Protocol." If we find a high-risk flaw that exposes immediate danger (like RCE or SQLi), we pause testing and notify your team immediately so you can patch it right away, rather than waiting for the final report.' 
  }
];

const ServiceFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-4">
            <MessageCircle size={14} /> Common Questions
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Everything you need to know about our security process, billing, and deliverables.
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="space-y-4">
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;
            
            return (
              <div 
                key={i} 
                className={`border rounded-2xl transition-all duration-300 ${
                  isOpen 
                    ? 'bg-blue-50/30 border-blue-200 shadow-sm' 
                    : 'bg-white border-gray-100 hover:border-gray-200'
                }`}
              >
                <button 
                  onClick={() => setOpenIndex(isOpen ? null : i)} 
                  className="w-full flex justify-between items-center p-6 text-left"
                >
                  <span className={`font-semibold text-lg ${isOpen ? 'text-blue-900' : 'text-gray-800'}`}>
                    {item.q}
                  </span>
                  <span className={`flex-shrink-0 ml-4 p-1 rounded-full border transition-colors ${
                    isOpen 
                      ? 'bg-blue-600 border-blue-600 text-white' 
                      : 'bg-white border-gray-200 text-gray-400'
                  }`}>
                    {isOpen ? <Minus size={16} strokeWidth={3} /> : <Plus size={16} strokeWidth={3} />}
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }} 
                      animate={{ height: 'auto', opacity: 1 }} 
                      exit={{ height: 0, opacity: 0 }} 
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceFAQ;