'use client';
import { motion } from 'framer-motion';
import Image from 'next/image'; // FIX: Changed from AppImage to Image
import { clientsData } from '@/data/homepageData';

const ClientMarquee = () => {
  // Triple the list to ensure smooth infinite scrolling
  const marqueeList = [...clientsData, ...clientsData, ...clientsData];

  return (
    <section className="py-12 bg-card border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
        <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
          Trusted by Leading Organizations
        </h2>
      </div>
      
      <div className="flex overflow-hidden relative">
        {/* Left Fade Gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card to-transparent z-10" />
        
        <motion.div
          className="flex space-x-16 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
        >
          {marqueeList.map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 cursor-default"
            >
              {/* Client Logo Image */}
              {/* FIX: Added 'relative' to parent and 'fill' to Image to prevent width error */}
              <div className="w-12 h-12 relative grayscale hover:grayscale-0 transition-all duration-300">
                <Image 
                    src={client.logo} 
                    alt={client.alt} 
                    fill
                    className="object-contain" 
                />
              </div>
              
              {/* Client Company Name */}
              <span className="text-lg font-heading font-bold text-foreground/80 whitespace-nowrap">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card to-transparent z-10" />
      </div>
    </section>
  );
};
export default ClientMarquee;