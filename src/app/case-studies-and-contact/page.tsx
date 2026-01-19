import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import CaseStudiesInteractive from './components/CaseStudiesInteractive'; // Wrapper for grid
import ContactForm from './components/ContactForm';

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-20">
        <section className="max-w-7xl mx-auto px-4 mb-20">
          <h1 className="text-5xl font-bold text-center mb-12">Case Studies</h1>
          <CaseStudiesInteractive />
        </section>
        <section className="max-w-3xl mx-auto px-4">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}