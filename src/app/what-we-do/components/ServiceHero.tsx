'use client';

import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const ServiceHero = ({ title, description }: { title: string; description: string }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute inset-0 bg-background z-0">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-4xl mx-auto space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center space-x-2 bg-card/80 backdrop-blur-sm border border-border px-4 py-2 rounded-full text-sm font-medium shadow-sm">
        <Icon name="ShieldCheckIcon" size={18} className="text-primary" />
        <span className="text-foreground/80">Comprehensive Security Services</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight">{title}</motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">{description}</motion.p>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
  </section>
);
export default ServiceHero;