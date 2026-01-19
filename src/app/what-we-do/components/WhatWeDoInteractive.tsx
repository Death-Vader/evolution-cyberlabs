'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
// FIX 1: Use relative import since ServiceDetail is in the same folder
import ServiceDetail from './ServiceDetail'; 
import { servicesData } from '@/data/homepageData';

const container = { 
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { staggerChildren: 0.1 } } 
};

const item = { 
  hidden: { opacity: 0, y: 20 }, 
  show: { opacity: 1, y: 0 } 
};

const WhatWeDoInteractive = () => {
  // State holds the full service object or null
  const [selectedService, setSelectedService] = useState<typeof servicesData[0] | null>(null);

  // FIX 2: Create a handler to bridge the gap between ID (string) and Service (object)
  const handleLearnMore = (serviceId: string) => {
    const foundService = servicesData.find((s) => s.id === serviceId);
    if (foundService) {
      setSelectedService(foundService);
    }
  };

  return (
    <>
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={container} 
            initial="hidden" 
            whileInView="show" 
            viewport={{ once: true, margin: "-100px" }} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {servicesData.map((service) => (
              <motion.div key={service.id} variants={item}>
                <ServiceCard 
                  service={service} 
                  // FIX 3: Pass the handler function instead of the state setter directly
                  onLearnMore={handleLearnMore} 
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedService && (
          <ServiceDetail 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default WhatWeDoInteractive;