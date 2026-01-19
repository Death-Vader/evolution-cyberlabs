'use client';
import Icon from '@/components/ui/AppIcon';

const ServiceCard = ({ service, onLearnMore }: { service: any; onLearnMore: (id: string) => void }) => (
  <div className="bg-card rounded-xl border border-border p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
    <div className="flex items-start justify-between mb-6">
      <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
        <Icon name={service.icon} size={28} className="text-primary" />
      </div>
      {service.badge && <span className="px-3 py-1 bg-success/10 text-success text-xs font-medium rounded-full">{service.badge}</span>}
    </div>
    <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">{service.title}</h3>
    <p className="text-muted-foreground mb-6 leading-relaxed flex-grow">{service.description}</p>
    <div className="space-y-3 mb-6">
      {service.features.map((feature: any, index: number) => (
        <div key={index} className="flex items-start space-x-2">
          <Icon name="CheckCircleIcon" size={20} className="text-success mt-0.5 flex-shrink-0" variant="solid" />
          <span className="text-sm text-foreground">{feature.text}</span>
        </div>
      ))}
    </div>
    <div className="pt-6 border-t border-border mt-auto">
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-muted-foreground">Timeline:</span>
        <span className="font-medium text-foreground">{service.timeline}</span>
      </div>
      <button onClick={() => onLearnMore(service.id)} className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-accent transition-colors duration-300 flex items-center justify-center space-x-2">
        <span>Learn More</span>
        <Icon name="ArrowRightIcon" size={20} />
      </button>
    </div>
  </div>
);
export default ServiceCard;