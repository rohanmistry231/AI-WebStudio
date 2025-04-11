
import React, { useRef, useEffect } from 'react';
import { Code, Sparkles, Paintbrush, PenTool , Database , Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import ServiceCard from './ServiceCard';

const services = [
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Generated Websites",
    description: "Cutting-edge AI technology that transforms your requirements into fully functional website designs in minutes.",
    color: "bg-blue-50 dark:bg-blue-950/30",
    iconColor: "text-blue-500"
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "MERN Stack Development",
    description: "Craft blazing-fast, scalable web apps with React, Node.js, Express, and MongoDB—built for performance & flexibility.",
    color: "bg-purple-50 dark:bg-purple-950/30",
    iconColor: "text-purple-500"
  },  
  {
    icon: <Database className="h-6 w-6" />,  // Added Database icon
    title: "Free Sanity Backend",
    description: "A powerful and flexible backend with Sanity, offering real-time content management and an intuitive API for free.",
    color: "bg-pink-50 dark:bg-pink-950/30",
    iconColor: "text-pink-500"
  },
  {
    icon: <Store className="h-6 w-6" />,  // Added Globe icon
    title: "Free Web Hosting",
    description: "Deploy your website with ease using Netlify's free hosting, ensuring fast, reliable, and secure performance.",
    color: "bg-cyan-50 dark:bg-cyan-950/30",
    iconColor: "text-cyan-500"
  },
  {
    icon: <Paintbrush className="h-6 w-6" />,
    title: "Creative Graphic & Logo Design",
  description: "Custom logos, posters, and branding visuals to give your business a unique and highly professional identity.",
    color: "bg-yellow-50 dark:bg-yellow-950/30",
    iconColor: "text-yellow-500"
  },
  {
    icon: <PenTool className="h-6 w-6" />,  // Calligraphy icon
    title: "Professional Calligraphy Design",
    description: "Beautiful handcrafted calligraphy using IndiaFont software, perfect for branding, invitations, and creative projects.",
    color: "bg-green-50 dark:bg-green-950/30",
    iconColor: "text-green-500"
  }
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-scale-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    cardsRefs.current.forEach(card => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="py-12 px-6 md:px-8 lg:px-12 xl:px-16 bg-secondary/50"
    >
      <div className="max-w-7xl mx-auto">
        <div 
          ref={titleRef}
          className="text-center max-w-3xl mx-auto mb-16 opacity-0"
        >
          <div className="inline-block">
            <div className="glass-card inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="text-primary">Our Services</span>
            </div>
          </div>
          <h2 className="heading-lg mb-4">Transform Your Digital Presence</h2>
          <p className="paragraph mx-auto">
            We offer a comprehensive range of web development services, powered by cutting-edge AI technology and human expertise to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              ref={el => cardsRefs.current[index] = el}
              className="opacity-0"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ServiceCard 
                icon={service.icon}
                title={service.title}
                description={service.description}
                color={service.color}
                iconColor={service.iconColor}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
