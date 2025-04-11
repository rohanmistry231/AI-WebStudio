
import React, { useRef, useEffect } from 'react';
import { Brain, Code, Users, CheckCircle, BadgePercent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const aboutFeatures = [
  {
    icon: <Brain className="h-5 w-5" />,
    title: "AI-Powered Innovation",
    description: "We leverage advanced AI algorithms to streamline the web development process and create intelligent solutions."
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Human-Centered Approach",
    description: "We blend AI capabilities with human creativity and insight to create websites that truly connect."
  },
  {
    icon: <BadgePercent className="h-5 w-5" />,
    title: "Most Affordable Pricing",
    description: "Get a high-quality website at **less than 10x** the cost others charge, making premium web solutions accessible for everyone."
  }
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === imageRef.current) {
            entry.target.classList.add('animate-slide-right');
          } else if (entry.target === contentRef.current) {
            entry.target.classList.add('animate-slide-left');
          } else {
            entry.target.classList.add('animate-fade-in');
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (imageRef.current) {
      observer.observe(imageRef.current);
    }
    
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }
    
    featuresRef.current.forEach(feature => {
      if (feature) observer.observe(feature);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const servicesSection = document.getElementById('contact');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="py-12 px-6 md:px-8 lg:px-12 xl:px-16 bg-muted/50"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div 
            ref={imageRef}
            className="relative rounded-xl overflow-hidden opacity-0 -translate-x-8"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="AI Web Development" 
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="glass-card rounded-xl p-4 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Trusted by</div>
                    <div className="text-lg font-bold">Innovators & Creators</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={contentRef}
            className="opacity-0 translate-x-8"
          >
            <div className="inline-block">
              <div className="glass-card inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="text-primary">About Us</span>
              </div>
            </div>
            <h2 className="heading-lg mb-6">We Blend AI With Human Creativity</h2>
            <p className="paragraph mb-8">
              Founded on the belief that AI can enhance rather than replace human creativity, we combine cutting-edge technology with skilled craftsmanship to build websites that are both innovative and authentic.
            </p>
            
            <div className="space-y-6 mb-8">
              {aboutFeatures.map((feature, index) => (
                <div 
                  key={index}
                  ref={el => featuresRef.current[index] = el}
                  className="flex items-start gap-4 opacity-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="bg-primary/10 p-2 rounded-lg text-primary mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button size="lg" className="rounded-full" asChild>
              <Link to="#contact" onClick={scrollToContact}>Work With Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
