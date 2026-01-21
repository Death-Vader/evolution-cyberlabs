'use client';

import InteractiveResources from '../what-we-do/components/InteractiveResources';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function FreeAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* 1. Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link 
            href="/what-we-do" 
            className="text-sm font-bold text-slate-500 hover:text-blue-600 flex items-center gap-2 transition-colors"
          >
            <ArrowLeft size={16} strokeWidth={3} /> Back to Site
          </Link>
          <div className="font-bold text-slate-900 text-lg">
            Evolution <span className="text-blue-600">CyberLabs</span>
          </div>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="bg-slate-900 pt-16 pb-32 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          Get your security assessment <br/>
          <span className="text-blue-400">in under 10 minutes</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          Analyze your current security posture, identify compliance gaps, and download a professional report for your stakeholders.
        </p>
        
        {/* Trust Badges */}
        <div className="flex justify-center gap-6 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> Free Forever</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> Private Data</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-emerald-500" /> PDF Export</span>
        </div>
      </div>

      {/* 3. The Interactive Tool Wrapper */}
      <div className="container mx-auto px-4 -mt-20 relative z-10 pb-20 max-w-4xl">
         <InteractiveResources />
      </div>

      {/* Footer Note */}
      <div className="text-center py-8 text-slate-400 text-sm border-t border-slate-200">
        © {new Date().getFullYear()} Evolution CyberLabs. All assessment data is processed locally in your browser.
      </div>
    </div>
  );
}