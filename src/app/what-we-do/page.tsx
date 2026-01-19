import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import ServiceHero from './components/ServiceHero';
import WhatWeDoInteractive from './components/WhatWeDoInteractive';
import ServiceComparison from './components/ServiceComparison';
import ROICalculator from './components/ROICalculator';
import InteractiveResources from './components/InteractiveResources';
import ServiceTestimonials from './components/ServiceTestimonials';
import ServiceFAQ from './components/ServiceFAQ';

export const metadata: Metadata = {
  title: 'Our Services - Evolution CyberLabs',
  description: 'Comprehensive cybersecurity services including VAPT, SAST/DAST, GRC, and Incident Response.',
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ServiceHero title="Security Services That Scale" description="From continuous monitoring to offensive security testing, we provide the full spectrum of cyber defense services." />
        <WhatWeDoInteractive />
        <ServiceComparison />
        <ROICalculator />
        <InteractiveResources />
        <ServiceTestimonials />
        <ServiceFAQ />
      </main>
      <Footer />
    </div>
  );
}