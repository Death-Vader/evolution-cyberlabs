'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

interface ServiceDetailProps {
  service: any;
  onClose: () => void;
}

const ServiceDetail = ({ service, onClose }: ServiceDetailProps) => {
  // Prevent background scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 px-8 py-6 flex items-start justify-between z-20">
          <div>
             <h3 className="text-2xl font-heading font-bold text-slate-900 pr-8">
               {service.title}
             </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 space-y-10">
          
          {/* Description */}
          <div className="text-slate-600 leading-relaxed text-lg">
            {service.fullDescription}
          </div>

          {/* Methodology Section (Grid of Steps) */}
          {service.methodology && (
            <div>
              <h4 className="text-lg font-heading font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Icon name="ClipboardDocumentListIcon" className="text-blue-600" />
                Methodology
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {service.methodology.map((step: string, index: number) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-blue-200">
                      {index + 1}
                    </div>
                    <span className="text-slate-700 font-medium pt-1">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deliverables Section */}
          {service.deliverables && (
            <div>
              <h4 className="text-lg font-heading font-bold text-slate-900 mb-6 flex items-center gap-2">
                <Icon name="DocumentCheckIcon" className="text-blue-600" />
                Deliverables
              </h4>
              <ul className="space-y-3">
                {service.deliverables.map((item: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <Icon name="CheckCircleIcon" className="text-green-500 mt-0.5 flex-shrink-0" variant="solid" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tools & Certs Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-100">
             {/* Tools */}
             {service.tools && (
               <div>
                 <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Icon name="CpuChipIcon" className="text-blue-600" size={18} />
                   Technologies & Tools
                 </h4>
                 <div className="flex flex-wrap gap-2">
                   {service.tools.map((tool: string) => (
                     <span key={tool} className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-lg border border-slate-200">
                       {tool}
                     </span>
                   ))}
                 </div>
               </div>
             )}

             {/* Certifications */}
             {service.certifications && (
               <div>
                 <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                   <Icon name="AcademicCapIcon" className="text-blue-600" size={18} />
                   Certifications
                 </h4>
                 <div className="flex flex-wrap gap-4">
                   {service.certifications.map((cert: string) => (
                     <span key={cert} className="text-green-600 font-bold text-sm">
                       {cert}
                     </span>
                   ))}
                 </div>
               </div>
             )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 p-6 md:px-8 z-20">
            <button 
              onClick={() => { window.location.href = '/case-studies-and-contact'; }}
              className="w-full md:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Request Consultation
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceDetail;