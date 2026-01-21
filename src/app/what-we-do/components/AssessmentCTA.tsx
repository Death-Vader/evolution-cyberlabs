'use client';

import Link from 'next/link';
import { ClipboardCheck, ArrowRight, ShieldCheck } from 'lucide-react';

const AssessmentCTA = () => {
  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-900/20">
          
          {/* Background Glows */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10 shadow-inner">
              <ShieldCheck size={32} className="text-blue-200" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
              Is Your Security Strategy Working?
            </h2>
            
            <p className="text-blue-100/90 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium">
              Don't guess. Use our interactive tools to calculate your risk score, 
              check compliance readiness, and generate a PDF report in minutes.
            </p>

            <Link 
              href="/free-assessment" 
              target="_blank" 
              className="group bg-blue-500 hover:bg-blue-400 text-white text-lg font-bold py-4 px-10 rounded-xl transition-all duration-300 shadow-xl shadow-blue-900/50 hover:shadow-blue-500/50 hover:-translate-y-1 flex items-center gap-3"
            >
              <ClipboardCheck size={24} />
              Start Free Assessment
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <p className="mt-6 text-sm text-blue-200/60 font-medium">
              * Instant PDF Download • No Sign-up Required
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentCTA;