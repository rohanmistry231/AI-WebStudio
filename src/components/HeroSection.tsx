
import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add animation classes after component mounts for entrance animations
    const timer1 = setTimeout(() => {
      if (headingRef.current) {
        headingRef.current.classList.add('animate-slide-up');
      }
    }, 100);

    const timer2 = setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.classList.add('animate-slide-up');
      }
    }, 300);

    const timer3 = setTimeout(() => {
      if (ctaRef.current) {
        ctaRef.current.classList.add('animate-slide-up');
      }
    }, 500);

    const timer4 = setTimeout(() => {
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.classList.add('animate-fade-in');
      }
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrollY = window.scrollY;
        sectionRef.current.style.setProperty('--scroll', scrollY.toString());
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const yOffset = -48; // Adjust based on py-12 (48px)
      const y = servicesSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      const yOffset = -48; // Adjust based on py-12 (48px)
      const y = contactSection.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };  

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden" 
      id="hero"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Content */}
      <div className="top-0 md:py-0 sm:py-0 container max-w-4xl text-center px-6 xl:py-16 lg:py-16 mb-20">
        <div className="space-y-6"> 
          <div className="inline-block">
            <div className="glass-card inline-block px-3 py-1 rounded-full text-sm font-medium mb-12">
              <span className="text-primary">AI-Powered Web Development</span>
            </div>
          </div>
          
          <h1 
            ref={headingRef}
            className="heading-xl opacity-0"
          >
            Crafting Digital Experiences With Precision & Intelligence
          </h1>
          
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mt-6 max-w-2xl mx-auto opacity-0"
          >
            We blend AI innovation with human creativity to build websites that stand out in the digital landscape.
          </p>
          
          <div 
            ref={ctaRef}
            className="flex items-center justify-center gap-4 mt-8 opacity-0"
          >
            <Button size="lg" className="rounded-full" asChild>
              <Link to="#contact" onClick={scrollToContact}>Get Started</Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full"
              onClick={scrollToServices}
            >
              Explore Services
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer opacity-0"
        onClick={scrollToServices}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm font-medium">Scroll to explore</p>
          <ArrowDown className="h-5 w-5 animate-pulse-subtle" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
