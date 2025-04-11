
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

const BlogCard = ({ 
  title, 
  excerpt, 
  date, 
  category, 
  image, 
  slug 
}: BlogCardProps) => {
  return (
    <Link 
      to={slug} 
      target='__blank'
      rel='noopener noreferrer'
      className="group block h-full overflow-hidden rounded-xl bg-card transition-all hover:shadow-lg"
    >
      <div className="relative aspect-[2/1] overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary/80 text-primary-foreground text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm">
            {category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center text-xs text-muted-foreground mb-3">
          <Calendar className="h-3.5 w-3.5 mr-1.5" />
          <span>{date}</span>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{excerpt}</p>
        <div className="mt-4 inline-flex items-center text-sm font-medium text-primary">
          Read more
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
