import React, { useRef, useEffect, useState } from 'react';
import TestimonialCard from './TestimonialCard';
import sanityClient from '../sanityClient';

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "testimonial"] | order(_createdAt desc) {
            quote,
            author,
            position,
            "avatar": avatar.asset->url
          }`
        );
        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target === titleRef.current ? 'animate-slide-up' : 'animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (titleRef.current) observer.observe(titleRef.current);
    if (cardsContainerRef.current) observer.observe(cardsContainerRef.current);

    return () => observer.disconnect();
  }, [testimonials]);

  return (
    <section ref={sectionRef} id="testimonials" className="py-12 px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-16 opacity-0">
          <div className="inline-block">
            <div className="glass-card inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
              <span className="text-primary">Testimonials</span>
            </div>
          </div>
          <h2 className="heading-lg mb-4">What Our Clients Say</h2>
          <p className="paragraph mx-auto">
            Don't just take our word for it — hear from some of our satisfied clients about their experience working with us.
          </p>
        </div>

        <div ref={cardsContainerRef} className="opacity-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                position={testimonial.position}
                avatar={testimonial.avatar}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
