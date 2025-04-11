import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = storedTheme ? storedTheme === "dark" : systemPrefersDark;
    document.documentElement.classList.toggle("dark", isDark);
    setIsDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -48; // Adjust this value based on py-12 (48px)
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };  

  const navLinks = [
    { name: "Home", id: "hero" },
    { name: "Services", id: "services" },
    { name: "Portfolio", id: "portfolio" },
    { name: "About", id: "about" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Blog", id: "blog" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-8 lg:px-12 xl:px-16",
          scrolled || mobileMenuOpen ? "glass" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}>
            <button
              onClick={() => scrollToSection("hero")}
              className="text-2xl font-bold tracking-tight flex items-center gap-2 transition-all hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-md flex items-center justify-center">AI</div>
              <span>WebStudio</span>
            </button>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary"
              >
                {link.name}
              </button>
            ))}
            <Button onClick={toggleDarkMode} variant="ghost" size="icon" className="ml-2">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center gap-2 md:hidden">
            <Button onClick={toggleDarkMode} variant="ghost" size="icon">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Full screen with persistent blur */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-md animate-fade-in">
          <div className="pt-20 px-6">
            <nav className="flex flex-col">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.id)}
                  className="px-4 py-3 border-b border-border/10 text-lg font-medium text-left hover:bg-secondary/20"
                >
                  {link.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

// Add these styles to your global CSS file
const globalStyles = `
/* Add these styles to your global.css or equivalent */
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-in-out forwards;
}

.glass {
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}
`;

export default Navbar;