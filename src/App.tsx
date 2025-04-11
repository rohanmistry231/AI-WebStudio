import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CursorAnimation from "./components/CursorAnimation"; // Import the cursor animation component

// Create the query client
const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Add custom-cursor-active class to body when component mounts
    // This will hide the default cursor
    document.body.classList.add("custom-cursor-active");
    
    // Check if device is touch-only (mobile)
    const isTouchDevice = () => {
      return (('ontouchstart' in window) ||
              (navigator.maxTouchPoints > 0) ||
              (navigator.maxTouchPoints > 0));
    };
    
    // Only add cursor effect on non-touch devices
    if (isTouchDevice()) {
      document.body.classList.remove("custom-cursor-active");
    }
    
    return () => {
      // Cleanup - remove the class when component unmounts
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        {/* Custom cursor animation */}
        <CursorAnimation />
        
        {/* Notification components */}
        <Toaster />
        <Sonner />
        
        {/* Router setup */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;