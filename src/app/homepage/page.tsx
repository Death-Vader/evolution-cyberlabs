import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import HeroSection from './components/HeroSection';
import ClientMarquee from './components/ClientMarquee';
import ServicesOverview from './components/ServicesOverview';
import WhyChooseUs from './components/WhyChooseUs';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';

export const metadata: Metadata = {
  title: 'Home - Evolution CyberLabs',
  description: 'Protecting your business with intelligent, adaptive cybersecurity. VAPT, SOC, and GRC services for modern enterprises.',
};

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Global Navigation */}
      <Header />

      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Client Logos (Marquee) */}
        <ClientMarquee />

        {/* 3. Services Grid */}
        <ServicesOverview />

        {/* 4. Why Choose Us (Stats & Benefits) */}
        <WhyChooseUs />

        {/* 5. Testimonials */}
        <TestimonialsSection />

        {/* 6. Contact Form */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}