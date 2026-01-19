'use client';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const ServiceTestimonials = () => {
  const testimonials = [
    { id: 1, name: 'Sarah Chen', role: 'CTO', company: 'Lilium', quote: 'Evolution CyberLabs transformed our security posture.', rating: 5, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13dd7b4b8-1763293360912.png' },
    { id: 2, name: 'Michael R', role: 'Head of Eng', company: 'Sound of Earth', quote: 'Best security investment we have made.', rating: 5, image: 'https://img.rocket.new/generatedImages/rocket_gen_img_147b0d4fa-1763294694248.png' },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">Client Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-card p-8 rounded-xl border border-border">
              <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, i) => <Icon key={i} name="StarIcon" variant="solid" className="text-warning" size={16} />)}</div>
              <p className="text-muted-foreground mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden"><AppImage src={t.image} alt={t.name} /></div>
                <div><div className="font-bold text-sm">{t.name}</div><div className="text-xs text-muted-foreground">{t.role}, {t.company}</div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ServiceTestimonials;