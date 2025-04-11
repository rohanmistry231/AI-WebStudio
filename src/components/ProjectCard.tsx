
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  category: string;
  image: string;
  link: string;
}

const ProjectCard = ({ title, category, image, link }: ProjectCardProps) => {
  return (
    <Link 
      to={link} 
      target='_blank'
      rel='noopener noreferrer'
      className="group block h-full overflow-hidden rounded-xl bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[2/1] overflow-hidden">
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full flex items-center justify-center bg-primary/90 text-primary-foreground transform rotate-45 group-hover:rotate-0 transition-all duration-300">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
        <img
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-6">
        <div className="text-sm text-muted-foreground mb-2">{category}</div>
        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</h3>
      </div>
    </Link>
  );
};

export default ProjectCard;
