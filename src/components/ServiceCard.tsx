
import React from 'react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  iconColor?: string;
}

const ServiceCard = ({ 
  icon, 
  title, 
  description, 
  color = "bg-secondary", 
  iconColor = "text-primary" 
}: ServiceCardProps) => {
  return (
    <div className="h-full glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-4px]">
      <div className="flex flex-col h-full">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center mb-5", color)}>
          <div className={cn("", iconColor)}>
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ServiceCard;
