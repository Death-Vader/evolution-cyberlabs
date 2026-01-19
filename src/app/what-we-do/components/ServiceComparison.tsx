'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '@/components/ui/AppIcon';

const ServiceComparison = () => {
  const [activeTab, setActiveTab] = useState<'features'|'timeline'>('features');
  
  const comparisonData = [
    { name: 'Code Analysis', sast: true, dast: false, vapt: 'Partial' },
    { name: 'Runtime Testing', sast: false, dast: true, vapt: true },
    { name: 'Manual Testing', sast: false, dast: false, vapt: true },
    { name: 'Compliance', sast: true, dast: true, vapt: true },
  ];

  const renderCheck = (val: boolean|string) => {
    if (val === true) return <Icon name="CheckCircleIcon" className="text-success mx-auto" variant="solid" />;
    if (val === false) return <Icon name="XCircleIcon" className="text-muted-foreground/30 mx-auto" />;
    return <span className="text-xs font-medium text-warning bg-warning/10 px-2 py-1 rounded-full">{val}</span>;
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold text-foreground mb-4">Service Comparison</h2>
          <p className="text-muted-foreground">Find the right fit for your security needs.</p>
        </div>
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/20 border-b border-border">
                  <th className="px-6 py-4 text-left text-sm font-bold text-foreground">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-foreground">SAST</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-foreground">DAST</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-foreground">VAPT</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{row.name}</td>
                    <td className="px-6 py-4 text-center">{renderCheck(row.sast)}</td>
                    <td className="px-6 py-4 text-center">{renderCheck(row.dast)}</td>
                    <td className="px-6 py-4 text-center">{renderCheck(row.vapt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ServiceComparison;