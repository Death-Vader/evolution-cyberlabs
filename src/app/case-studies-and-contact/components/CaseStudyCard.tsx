'use client';
import { motion } from 'framer-motion';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const CaseStudyCard = ({ study, onDownload }: any) => (
  <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-xl transition-all">
    <div className="relative h-48">
      <AppImage src={study.image} alt={study.company} fill />
      <div className="absolute top-4 left-4 bg-background/90 p-2 rounded"><AppImage src={study.logo} alt="logo" width={80} height={20} /></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold mb-2">{study.company}</h3>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{study.challenge}</p>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {study.metrics.map((m: any, i: number) => (
          <div key={i} className="bg-muted/30 p-2 rounded text-center">
            <div className="text-lg font-bold text-primary">{m.value}</div>
            <div className="text-xs text-muted-foreground">{m.label}</div>
          </div>
        ))}
      </div>
      <button onClick={() => onDownload(study.id)} className="w-full py-2 bg-primary text-white rounded font-medium hover:bg-primary/90 transition-colors">View Case Study</button>
    </div>
  </motion.div>
);
export default CaseStudyCard;