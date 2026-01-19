'use client';
import { useState } from 'react';
import CaseStudyCard from './CaseStudyCard';
import { caseStudiesData } from '@/data/caseStudiesData';

const CaseStudiesInteractive = () => {
  const [filter, setFilter] = useState('All');
  
  return (
    <div>
      <div className="flex gap-4 justify-center mb-8">
        {['All', 'Aviation', 'Finance', 'Healthcare'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-sm font-medium ${filter === f ? 'bg-primary text-white' : 'bg-muted text-foreground'}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {caseStudiesData.map(study => (
          <CaseStudyCard key={study.id} study={study} onDownload={(id: string) => console.log('Download', id)} />
        ))}
      </div>
    </div>
  );
};
export default CaseStudiesInteractive;