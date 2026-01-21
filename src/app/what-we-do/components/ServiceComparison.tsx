'use client';

import { Check, X, Shield, Code, Globe, HelpCircle } from 'lucide-react';

const comparisonData = [
  {
    category: "Core Methodology",
    rows: [
      { feature: "Testing Approach", sast: "White Box (Code Access)", dast: "Black Box (No Access)", vapt: "Hybrid (Grey/Black Box)" },
      { feature: "Execution Stage", sast: "Development / Build", dast: "Staging / Production", vapt: "Pre-Release / Periodic" },
      { feature: "Automation Level", sast: "Fully Automated", dast: "Automated", vapt: "Manual + Automated" },
    ]
  },
  {
    category: "Coverage & Accuracy",
    rows: [
      { feature: "Code Quality Checks", sast: true, dast: false, vapt: "Partial" },
      { feature: "Runtime Logic Errors", sast: false, dast: true, vapt: true },
      { feature: "False Positives", sast: "High (Needs Review)", dast: "Medium", vapt: "Very Low (Verified)" },
      { feature: "Zero-Day Exploits", sast: false, dast: false, vapt: true },
    ]
  },
  {
    category: "Business Value",
    rows: [
      { feature: "Compliance Ready", sast: "Partial", dast: "Partial", vapt: "Full (ISO/PCI/GDPR)" },
      { feature: "Cost Efficiency", sast: "High (Scalable)", dast: "Medium", vapt: "High ROI (Critical)" },
    ]
  }
];

// Helper to render cell content based on type
const RenderCell = ({ value, isPremium }: { value: any, isPremium?: boolean }) => {
  if (value === true) return <div className="flex justify-center"><div className="bg-green-100 p-1.5 rounded-full"><Check size={18} className="text-green-600" strokeWidth={3} /></div></div>;
  if (value === false) return <div className="flex justify-center"><div className="bg-red-50 p-1.5 rounded-full"><X size={18} className="text-red-400" /></div></div>;
  if (value === "Partial") return <div className="flex justify-center"><span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">Partial</span></div>;
  
  // String values
  return <span className={`text-sm font-medium ${isPremium ? 'text-blue-900' : 'text-gray-700'}`}>{value}</span>;
};

const ServiceComparison = () => {
  return (
    // 👇 CHANGED: Background is now a light blueish gradient
    <section className="py-24 bg-gradient-to-b from-blue-50/50 to-white" id="comparison">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Which Security Testing Fits You?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understanding the difference between automated scanning and human-led penetration testing is key to building a robust defense.
          </p>
        </div>

        {/* The Comparison Table Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-blue-100 overflow-hidden relative">
          
          {/* Table Header - Sticky on Mobile */}
          <div className="grid grid-cols-4 bg-slate-900 text-white p-6 sticky top-0 z-10 items-end">
            <div className="font-bold text-lg md:text-xl text-gray-300 pb-2">Features</div>
            
            <div className="text-center flex flex-col items-center gap-3">
              <div className="bg-slate-800 p-3 rounded-xl"><Code size={24} className="text-blue-400" /></div>
              <div>
                <div className="font-bold text-lg">SAST</div>
                <div className="text-xs text-gray-400 font-medium opacity-80 uppercase tracking-wide">Static Analysis</div>
              </div>
            </div>

            <div className="text-center flex flex-col items-center gap-3">
              <div className="bg-slate-800 p-3 rounded-xl"><Globe size={24} className="text-purple-400" /></div>
              <div>
                <div className="font-bold text-lg">DAST</div>
                <div className="text-xs text-gray-400 font-medium opacity-80 uppercase tracking-wide">Dynamic Analysis</div>
              </div>
            </div>

            {/* Premium Column Highlight */}
            <div className="text-center flex flex-col items-center gap-3 relative">
              <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full"></div>
              <div className="bg-blue-600 p-3 rounded-xl relative shadow-lg shadow-blue-900/50"><Shield size={24} className="text-white" /></div>
              <div className="relative">
                <div className="font-bold text-lg text-blue-200">VAPT</div>
                <div className="text-xs text-blue-300 font-medium opacity-100 uppercase tracking-wide">Human + AI</div>
              </div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-100">
            {comparisonData.map((section, sIndex) => (
              <div key={sIndex} className="bg-white">
                {/* Section Title */}
                <div className="bg-blue-50/50 px-6 py-3 text-xs font-bold text-blue-900/60 uppercase tracking-widest border-y border-blue-100/50 sticky top-28 backdrop-blur-sm">
                  {section.category}
                </div>

                {/* Rows */}
                {section.rows.map((row, rIndex) => (
                  <div 
                    key={rIndex} 
                    className="grid grid-cols-4 p-6 hover:bg-blue-50/40 transition-colors duration-300 group items-center"
                  >
                    {/* Feature Name */}
                    <div className="font-semibold text-gray-800 flex items-center gap-2">
                      {row.feature}
                      <HelpCircle size={14} className="text-gray-300 cursor-help hover:text-blue-500 transition-colors hidden md:block" />
                    </div>

                    {/* SAST Value */}
                    <div className="text-center group-hover:scale-105 transition-transform duration-300">
                      <RenderCell value={row.sast} />
                    </div>

                    {/* DAST Value */}
                    <div className="text-center group-hover:scale-105 transition-transform duration-300 delay-75">
                      <RenderCell value={row.dast} />
                    </div>

                    {/* VAPT Value (Premium) */}
                    <div className="text-center relative group-hover:scale-110 transition-transform duration-300 delay-100">
                      <div className="absolute inset-0 bg-blue-100/50 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="relative">
                        <RenderCell value={row.vapt} isPremium={true} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Bottom Call to Action */}
          <div className="bg-blue-50/30 p-8 text-center border-t border-blue-100">
            <p className="text-gray-600 mb-4">Not sure which one you need?</p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              Get a Free Recommendation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;