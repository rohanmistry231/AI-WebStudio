import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import TestimonialCard from "./TestimonialCard";
import sanityClient from "../sanityClient";

const TestimonialsSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Fetch testimonials
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

  // Title animation (unchanged)
  useEffect(() => {
    if (!titleRef.current) return;

    const observer = new IntersectionObserver(
      ([entry], obs) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Full-bleed marquee animation
  useEffect(() => {
    const container = cardsContainerRef.current;
    if (!container || testimonials.length === 0) return;

    const singleLoopWidth = container.scrollWidth / 2;

    gsap.set(container, { x: 0 });

    const tween = gsap.to(container, {
      x: -singleLoopWidth,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    container.addEventListener("mouseenter", () => tween.pause());
    container.addEventListener("mouseleave", () => tween.resume());

    return () => {
      tween.kill();
    };
  }, [testimonials]);

  return (
    <section id="testimonials" className="py-12">
      {/* ✅ HEADER (constrained) */}
      <div className="px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div
            ref={titleRef}
            className="text-center max-w-3xl mx-auto mb-16 opacity-0"
          >
            <div className="inline-block">
              <div className="glass-card inline-block px-3 py-1 rounded-full text-sm font-medium mb-4">
                <span className="text-primary">Testimonials</span>
              </div>
            </div>

            <h2 className="heading-lg mb-4">What Our Clients Say</h2>

            <p className="paragraph mx-auto">
              Don&apos;t just take our word for it — hear from some of our
              satisfied clients about their experience working with us.
            </p>
          </div>
        </div>
      </div>

      {/* ✅ MARQUEE (FULL VIEWPORT WIDTH, NO GAPS) */}
      <div className="relative w-screen overflow-hidden">
        <div
          ref={cardsContainerRef}
          className="flex flex-nowrap w-max gap-6 px-6"
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <TestimonialCard
              key={i}
              quote={t.quote}
              author={t.author}
              position={t.position}
              avatar={t.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
