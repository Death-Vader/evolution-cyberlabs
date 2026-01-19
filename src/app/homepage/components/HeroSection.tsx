'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/5 backdrop-blur-md rounded-full border border-primary/20 shadow-sm"
          >
            <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Trusted by Leading Organizations</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight tracking-tight">
            Security That <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Evolves</span>
            <br />
            With Threats
          </h1>

          <p className="max-w-3xl mx-auto text-lg sm:text-xl text-muted-foreground leading-relaxed">
            From startups to enterprises, we deliver intelligent, adaptive
            cybersecurity solutions that build confidence and enable growth.
          </p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-base font-heading font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Free Consultation
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="px-8 py-4 bg-background text-foreground rounded-lg text-base font-heading font-semibold border border-input hover:border-primary/50 hover:bg-muted/50 transition-all duration-300"
            >
              Explore Services
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm font-medium text-muted-foreground"
          >
            {['24/7 Support', 'Certified Experts', 'Rapid Response'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <Icon name="CheckCircleIcon" size={18} className="text-success" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;