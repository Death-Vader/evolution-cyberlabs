'use client';
import Icon from '@/components/ui/AppIcon';
import { benefitsData, statsData } from '@/data/homepageData';

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-slate-900 mb-4">
            Why Choose Evolution CyberLabs
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We combine technical excellence with business understanding.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {benefitsData.map((benefit) => (
            <div 
              key={benefit.id} 
              // UPDATED: Clean white card with subtle grey border and shadow
              className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                {/* UPDATED: Corporate Blue Icon Background */}
                <div className="p-3 rounded-lg bg-blue-50 text-blue-700">
                  <Icon name={benefit.icon as any} size={24} />
                </div>
                <h3 className="text-lg font-heading font-bold text-slate-900">
                  {benefit.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed pl-[60px]">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* UPDATED: Professional Stats Bar (Light Theme) */}
        {/* Changed background to Slate-50 (very light grey) instead of Black */}
        <div className="rounded-3xl bg-slate-50 border border-slate-200 p-10 sm:p-14 shadow-lg shadow-slate-200/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-200">
            {statsData.map((stat, i) => (
               <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 px-4 first:pt-0">
                  {/* Deep Royal Blue Number */}
                  <div className="text-5xl sm:text-6xl font-heading font-bold text-blue-700 mb-3 tracking-tight">
                    {stat.value}
                  </div>
                  
                  {/* Dark Grey Label */}
                  <div className="text-slate-500 font-bold uppercase tracking-[0.15em] text-xs sm:text-sm">
                    {stat.label}
                  </div>
               </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
export default WhyChooseUs;