'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage'; // Ensure this import is correct
import { testimonialsData } from '@/data/homepageData';

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const current = testimonialsData[activeIndex];

  return (
    <section id="testimonials" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">
            Testimonials
          </h2>
          <h3 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">
            What Our Clients Say
          </h3>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode='wait'>
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center border border-slate-100"
            >
              {/* Star Rating */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Icon 
                    key={i} 
                    name="StarIcon" 
                    className={i < current.rating ? "text-yellow-400" : "text-slate-200"} 
                    variant="solid"
                    size={24}
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed mb-10">
                "{current.content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-blue-100 p-0.5">
                   {/* FIX: Using AppImage with explicit dimensions to prevent crashes */}
                   <AppImage 
                      src={current.image} 
                      alt={current.author}
                      width={64}
                      height={64}
                      className="rounded-full object-cover w-full h-full"
                   />
                </div>
                <div className="font-heading font-bold text-slate-900 text-lg">
                  {current.author}
                </div>
                <div className="text-slate-500 text-sm">
                  {current.role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button 
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeftIcon" size={24} />
            </button>
            <div className="flex gap-2 items-center">
              {testimonialsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === activeIndex ? "bg-blue-600 w-6" : "bg-slate-300"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRightIcon" size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;