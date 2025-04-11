import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import sanityClient from '../sanityClient';

const PortfolioSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const [projects, setProjects] = useState([]);
  const [showAll, setShowAll] = useState(false); // Toggle to show all projects

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "portfolio"] | order(_createdAt desc) {
            title,
            category,
            "image": image.asset->url,
            link
          }`
        );
        setProjects(data);
      } catch (error) {
        console.error("Error fetching portfolio projects:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    projectRefs.current.forEach(project => {
      if (project) observer.observe(project);
    });

    return () => observer.disconnect();
  }, [projects]);

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="py-12 px-6 md:px-8 lg:px-12 xl:px-16"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div 
            ref={titleRef}
            className="mb-6 md:mb-0 opacity-0"
          >
            <div className="inline-block">
              <div className="glass-card inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="text-primary">Our Portfolio</span>
              </div>
            </div>
            <h2 className="heading-lg mb-4">Recent Projects</h2>
            <p className="paragraph max-w-xl">
              Discover how we've helped businesses transform their digital presence with our innovative solutions.
            </p>
          </div>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full self-start"
            onClick={() => setShowAll(true)} // Show all projects on click
          >
            <span className="flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            (showAll || index < 6) && (
              <div 
                key={index}
                ref={el => projectRefs.current[index] = el}
                className="opacity-0 translate-y-8 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProjectCard
                  title={project.title}
                  category={project.category}
                  image={project.image}
                  link={project.link}
                />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
