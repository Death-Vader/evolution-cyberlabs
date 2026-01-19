'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const ServiceFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqData = [
    { q: 'Diff between SAST and DAST?', a: 'SAST analyzes source code; DAST tests running apps.' },
    { q: 'How long does a VAPT take?', a: 'Typically 3-4 weeks depending on scope.' },
    { q: 'Do you provide remediation?', a: 'Yes, we offer detailed fix recommendations and re-testing.' },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">FAQ</h2>
        <div className="space-y-4">
          {faqData.map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex justify-between items-center p-6 text-left font-semibold">
                {item.q}
                <Icon name="ChevronDownIcon" className={`transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                    <div className="p-6 pt-0 text-muted-foreground">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServiceFAQ;