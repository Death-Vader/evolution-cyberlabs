import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

// We import the components directly from the homepage directory
// using the '@' alias we configured in tsconfig.json
import HeroSection from '@/app/homepage/components/HeroSection';
import ClientMarquee from '@/app/homepage/components/ClientMarquee';
import ServicesOverview from '@/app/homepage/components/ServicesOverview';
import WhyChooseUs from '@/app/homepage/components/WhyChooseUs';
import TestimonialsSection from '@/app/homepage/components/TestimonialsSection';
import ContactSection from '@/app/homepage/components/ContactSection';

export const metadata: Metadata = {
  title: 'Evolution CyberLabs - Adaptive Cybersecurity Solutions',
  description: 'Protecting your business with intelligent, adaptive cybersecurity. VAPT, SOC, and GRC services for modern enterprises.',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Global Navigation */}
      <Header />

      <main>
        {/* 1. Hero Area: The main hook with gradient background */}
        <HeroSection />

        {/* 2. Social Proof: Infinite scrolling logos */}
        <ClientMarquee />

        {/* 3. Services: Grid of what you offer (VAPT, SAST, etc.) */}
        <ServicesOverview />

        {/* 4. Value Prop: Stats and benefits */}
        <WhyChooseUs />

        {/* 5. Trust: Client testimonials carousel */}
        <TestimonialsSection />

        {/* 6. Conversion: Contact form */}
        <ContactSection />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}