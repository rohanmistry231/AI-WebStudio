
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const projectsData = [
  {
    title: "TechVision AI Platform",
    category: "AI Web Application",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Eco Store E-commerce",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Fitness Mobile App",
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Financial Services Dashboard",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Educational Platform",
    category: "E-Learning",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Real Estate Listing App",
    category: "Web Platform",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Travel Booking System",
    category: "E-commerce",
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Health & Wellness App",
    category: "Mobile Application",
    image: "https://images.unsplash.com/photo-1511649475669-e288648b2339?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  },
  {
    title: "Restaurant Booking Platform",
    category: "Web Application",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    link: "/portfolio"
  }
];

const Portfolio = () => {
  useEffect(() => {
    document.title = "Portfolio | AI WebStudio";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <section className="py-24 px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Button variant="outline" size="sm" asChild className="rounded-full">
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
            
            <div className="mb-16">
              <h1 className="heading-lg mb-4">Our Portfolio</h1>
              <p className="paragraph max-w-2xl">
                Explore our collection of work that showcases our expertise in web development, 
                design, and AI-powered solutions for various industries.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-12">
              {['All', 'Web Design', 'E-commerce', 'UI/UX', 'AI Applications', 'Mobile'].map(category => (
                <Button 
                  key={category} 
                  variant={category === 'All' ? 'default' : 'outline'} 
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <ProjectCard
                    title={project.title}
                    category={project.category}
                    image={project.image}
                    link={project.link}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Portfolio;
