import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import sanityClient from '../sanityClient';

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const postRefs = useRef([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await sanityClient.fetch(
          `*[_type == "blog"] | order(publishedAt desc) {
            title,
            excerpt,
            date,
            category,
            "image": image.asset->url,
            "slug": slug.current
          }`
        );
        setBlogPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === titleRef.current) {
            entry.target.classList.add('animate-slide-up');
          } else {
            entry.target.classList.add('animate-scale-in');
          }
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    if (titleRef.current) observer.observe(titleRef.current);
    postRefs.current.forEach(post => post && observer.observe(post));
    return () => observer.disconnect();
  }, [blogPosts]);

  return (
    <section ref={sectionRef} id="blog" className="py-12 px-6 md:px-8 lg:px-12 xl:px-16 bg-secondary/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16">
          <div ref={titleRef} className="mb-6 md:mb-0 opacity-0">
            <div className="inline-block">
              <div className="glass-card inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="text-primary">Blog & Insights</span>
              </div>
            </div>
            <h2 className="heading-lg mb-4">Latest Articles</h2>
            <p className="paragraph max-w-xl">
              Discover our latest thoughts and insights on web development, design, and AI technology.
            </p>
          </div>
          <Button variant="outline" size="lg" asChild className="rounded-full self-start">
            <a href="https://medi-hub.netlify.app/" target='__blank' className="flex items-center gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div key={post.slug} ref={el => postRefs.current[index] = el} className="opacity-0" style={{ animationDelay: `${index * 100}ms` }}>
              <BlogCard
                title={post.title}
                excerpt={post.excerpt}
                date={post.date}
                category={post.category}
                image={post.image}
                slug={post.slug}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;