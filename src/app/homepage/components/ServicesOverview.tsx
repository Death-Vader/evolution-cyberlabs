'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
// FIX: Import ServiceDetail from its actual location in the 'what-we-do' folder
import ServiceDetail from '@/app/what-we-do/components/ServiceDetail';
import { servicesData } from '@/data/homepageData';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const ServicesOverview = () => {
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-slate-900">
            Comprehensive Security Solutions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            End-to-end cybersecurity services tailored to your business needs.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              variants={item}
              className="group bg-white rounded-2xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 flex flex-col relative overflow-hidden"
            >
              {/* Badge */}
              {service.badge && (
                <div className="absolute top-8 right-8 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  {service.badge}
                </div>
              )}

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-blue-600">
                <Icon name={service.icon as any} variant="outline" size={40} />
              </div>

              <h3 className="text-xl font-heading font-bold text-slate-900 mb-4 pr-16">
                {service.title}
              </h3>
              <p className="text-slate-600 mb-8 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Feature List (Green Checks) */}
              <ul className="space-y-3 mb-8 flex-grow">
                 {service.features.map((feature, idx) => (
                   <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                     <Icon 
                        // Checks if the text mentions "certification" to swap the icon, otherwise uses checkmark
                        name={feature.toLowerCase().includes("certification") ? "AcademicCapIcon" : "CheckCircleIcon"} 
                        className="text-green-500 mt-0.5 flex-shrink-0" 
                        variant="solid" 
                        size={18} 
                     />
                     <span>{feature}</span>
                   </li>
                 ))}
              </ul>

              {/* Footer Section */}
              <div className="mt-auto pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-medium text-slate-400">Timeline:</span>
                  <span className="text-sm font-semibold text-slate-700">{service.timeline}</span>
                </div>
                
                <button 
                  onClick={() => setSelectedService(service)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Learn More <Icon name="ArrowRightIcon" size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modal Integration */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetail 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesOverview;