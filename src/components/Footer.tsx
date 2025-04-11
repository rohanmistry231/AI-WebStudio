
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { Mail, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary/80 py-12 px-6 md:px-8 lg:px-12 xl:px-16 text-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-12">
          <div className="space-y-6 flex flex-col justify-center items-center">
            <Link 
              to="/" 
              className="text-2xl font-bold tracking-tight flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center">
                AI
              </div>
              <span>WebStudio</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Combining AI innovation with human creativity to build exceptional websites and digital experiences.
            </p>
            <div className="flex space-x-6 justify-center md:justify-start">
            <a 
              href="https://github.com/rohanmistry231" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://www.linkedin.com/in/rohan-mistry-493987202/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:rohanmistry231@gmail.com" 
              className="text-muted-foreground hover:text-primary"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <p className="text-sm text-muted-foreground text-center pt-6">
            &copy; {new Date().getFullYear()} AI WebStudio. All rights reserved.
          </p>
          </div>
          <button 
            onClick={scrollToTop} 
            className="fixed bottom-6 right-6 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all z-10"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
