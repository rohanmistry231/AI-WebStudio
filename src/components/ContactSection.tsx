import React, { useRef, useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const formContainerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(entry.target === formContainerRef.current ? 'animate-slide-right' : 'animate-slide-left');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    if (formContainerRef.current) observer.observe(formContainerRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!formRef.current) return;

    try {
      const result = await emailjs.sendForm(
        'service_q7yp1ne',   // Replace with your EmailJS service ID
        'template_8dr05mv',  // Replace with your EmailJS template ID
        formRef.current,
        'YPYGQJanJ9f_o4YcE'       // Replace with your EmailJS user ID (or public key)
      );

      console.log('Email sent successfully:', result.text);
      toast({
        title: 'Message Sent',
        description: "Thank you for your message. We'll get back to you shortly.",
      });

      formRef.current.reset();
    } catch (error) {
      console.error('Email sending error:', error);
      toast({
        title: 'Error',
        description: 'Failed to send message. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-12 px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg mb-4">Get In Touch</h2>
          <p className="paragraph mx-auto">
            Have questions about our services or want to discuss your project? Reach out to us!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Contact Info Section */}
          <div ref={infoRef} className="lg:col-span-2 opacity-0 translate-x-8">
            <div className="glass-card rounded-xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-4" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Email</div>
                    <a href="mailto:rohanmistry231@gmail.com" className="font-medium hover:text-primary transition-colors">
                      rohanmistry231@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-4" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Phone</div>
                    <a href="tel:+918980067632" className="font-medium hover:text-primary transition-colors">
                      +91 8980067632
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-4" />
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Location</div>
                    <address className="not-italic font-medium">
                      Bhestan, Surat<br />
                      Gujarat, IN 395023
                    </address>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div ref={formContainerRef} className="lg:col-span-3 opacity-0 -translate-x-8">
            <div className="glass-card rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Name</label>
                    <Input id="name" name="name" placeholder="Your name" required className="rounded-lg" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" name="email" type="email" placeholder="Your email" required className="rounded-lg" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" name="subject" placeholder="Message subject" className="rounded-lg" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" name="message" placeholder="Your message" rows={5} required className="rounded-lg resize-none" />
                </div>

                <Button type="submit" size="lg" className="rounded-full w-full md:w-auto" disabled={loading}>
                  {loading ? "Sending..." : (
                    <span className="flex items-center gap-2">
                      <Send className="h-5 w-5" />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
