import React from "react";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  position: string;
  avatar: string;
}

const TestimonialCard = ({
  quote,
  author,
  position,
  avatar,
}: TestimonialCardProps) => {
  return (
    <div className="glass-card rounded-xl p-6 w-[340px] flex-shrink-0 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex flex-col h-full">
        <div className="text-primary mb-4">
          <Quote className="h-6 w-6" />
        </div>

        <p className="text-sm leading-relaxed flex-grow mb-6">
          "{quote}"
        </p>

        <div className="flex items-center mt-auto">
          <img
            src={avatar}
            alt={author}
            className="h-10 w-10 rounded-full object-cover mr-4"
            loading="lazy"
          />
          <div>
            <div className="font-medium text-sm">{author}</div>
            <div className="text-xs text-muted-foreground">{position}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
