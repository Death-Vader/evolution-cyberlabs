import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ServiceHero from './components/ServiceHero';
import WhatWeDoInteractive from './components/WhatWeDoInteractive';
import ServiceComparison from './components/ServiceComparison';
import AssessmentCTA from './components/AssessmentCTA'; // 👈 The new CTA Component
import ServiceTestimonials from './components/ServiceTestimonials';
import ServiceFAQ from './components/ServiceFAQ';

// Note: I removed 'InteractiveResources' and 'ROICalculator' from imports 
// because they are now accessed via the "Free Assessment" button.

export const metadata: Metadata = {
  title: 'Our Services - Evolution CyberLabs',
  description: 'Comprehensive cybersecurity services including VAPT, SAST/DAST, GRC, and Incident Response.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* 1. Hero Section */}
        <ServiceHero 
          title="Security Services That Scale" 
          description="From continuous monitoring to offensive security testing, we provide the full spectrum of cyber defense services." 
        />
        
        {/* 2. Main Services Cards */}
        <WhatWeDoInteractive />
        
        {/* 3. Service Comparison Table */}
        <ServiceComparison />
        
        {/* 4. NEW: Free Assessment Call to Action 
           (Replaces the inline InteractiveResources/ROICalculator) */}
        <AssessmentCTA />
        
        {/* 5. Social Proof */}
        <ServiceTestimonials />
        
        {/* 6. Common Questions */}
        <ServiceFAQ />
      </main>
      <Footer />
    </div>
  );
}