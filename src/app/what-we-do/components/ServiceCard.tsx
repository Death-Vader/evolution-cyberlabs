'use client';
import Icon from '@/components/ui/AppIcon';

const ServiceCard = ({ service, onLearnMore }: { service: any; onLearnMore: (id: string) => void }) => (
  <div className="bg-white rounded-xl border border-gray-100 p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col relative">
    
    {/* Header Section */}
    <div className="flex items-start justify-between mb-6">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
        <Icon name={service.icon} size={28} className="text-blue-600" />
      </div>
      {/* Badge (Fixed visual style) */}
      {service.badge && (
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide rounded-full">
          {service.badge}
        </span>
      )}
    </div>

    {/* Title (Forced dark color) */}
    <h3 className="text-2xl font-bold text-gray-900 mb-3">
      {service.title}
    </h3>

    {/* Description (Forced gray color) */}
    <p className="text-gray-600 mb-6 leading-relaxed flex-grow">
      {service.description}
    </p>

    {/* Features List (The Invisible Text Fix) */}
    <div className="space-y-3 mb-8">
      {service.features.map((feature: any, index: number) => (
        <div key={index} className="flex items-start space-x-3">
          {/* Green Check Icon */}
          <div className="mt-1 flex-shrink-0">
             <Icon name="CheckCircleIcon" size={20} className="text-green-500" variant="solid" />
          </div>
          {/* 👇 KEY FIX: Changed 'text-foreground' to 'text-gray-700' */}
          <span className="text-sm font-medium text-gray-700">
            {feature.text || feature} {/* Handles both object.text and raw strings */}
          </span>
        </div>
      ))}
    </div>

    {/* Footer: Timeline & Button */}
    <div className="pt-6 border-t border-gray-100 mt-auto">
      <div className="flex items-center justify-between text-sm mb-4">
        <span className="text-gray-400 uppercase tracking-wider text-xs">Timeline:</span>
        <span className="font-semibold text-gray-900">{service.timeline}</span>
      </div>
      
      <button 
        onClick={() => onLearnMore(service.id)} 
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-sm"
      >
        <span>Learn More</span>
        <Icon name="ArrowRightIcon" size={18} />
      </button>
    </div>
  </div>
);

export default ServiceCard;