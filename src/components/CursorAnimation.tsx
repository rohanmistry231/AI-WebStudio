import React, { useEffect, useState, useRef } from "react";

const CursorAnimation = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    // Check if it's a mobile device
    const checkMobile = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        ) ||
        (window.matchMedia("(hover: none) and (pointer: coarse)").matches)
      );
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Mouse movement handlers
    const mouseMoveHandler = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
    };

    const mouseDownHandler = () => setIsClicking(true);
    const mouseUpHandler = () => setIsClicking(false);

    const mouseOverHandler = (e) => {
      // Check if the cursor is over a clickable element
      const target = e.target;
      const clickables = ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'];
      if (clickables.includes(target.tagName) || 
          target.closest('a') || 
          target.closest('button') ||
          target.onclick ||
          getComputedStyle(target).cursor === 'pointer') {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    const mouseLeaveHandler = () => setIsHidden(true);
    const mouseEnterHandler = () => setIsHidden(false);

    // Scroll handler for the mobile crazy blur effect
    const scrollHandler = () => {
      setIsScrolling(true);
      setScrollPosition(window.scrollY);
      
      // Clear the previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 150); // Wait for scrolling to stop
    };

    // Add all event listeners
    if (!isMobile) {
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mousedown", mouseDownHandler);
      document.addEventListener("mouseup", mouseUpHandler);
      document.addEventListener("mouseover", mouseOverHandler, true);
      document.addEventListener("mouseleave", mouseLeaveHandler);
      document.addEventListener("mouseenter", mouseEnterHandler);
      
      // Add cursor-active class to body for desktop
      document.body.classList.add("custom-cursor-active");
    }
    
    // Add scroll event for both desktop and mobile
    window.addEventListener("scroll", scrollHandler);

    return () => {
      // Remove all event listeners on cleanup
      if (!isMobile) {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mousedown", mouseDownHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
        document.removeEventListener("mouseover", mouseOverHandler, true);
        document.removeEventListener("mouseleave", mouseLeaveHandler);
        document.removeEventListener("mouseenter", mouseEnterHandler);
        
        // Remove cursor-active class from body
        document.body.classList.remove("custom-cursor-active");
      }
      
      window.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", checkMobile);
      
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMobile]);

  // If mobile, render the mobile effect only
  if (isMobile) {
    return (
      <div
        className={`fixed inset-0 pointer-events-none z-[9999] transition-all duration-300 ${
          isScrolling ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: `radial-gradient(circle at 50% 50%, 
                      rgba(var(--primary), 0.3) 0%, 
                      rgba(var(--primary), 0.1) 40%, 
                      transparent 70%)`,
          filter: `blur(${isScrolling ? 20 : 0}px)`,
          transform: `scale(${isScrolling ? 1.2 : 1})`,
        }}
      />
    );
  }

  // For desktop, render the custom cursor
  return (
    <>
      {/* Main cursor blob - expanded shadow and blur effect */}
      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-300"
        style={{
          opacity: isHidden ? 0 : 0.6,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-all duration-300 ${
            isScrolling ? "scale-150 opacity-70" : ""
          }`}
          style={{
            width: isClicking ? "60px" : isPointer ? "80px" : "50px",
            height: isClicking ? "60px" : isPointer ? "80px" : "50px",
            opacity: isScrolling ? 0.7 : isPointer ? 0.5 : 0.3,
            filter: `blur(${isScrolling ? 30 : isPointer ? 24 : 16}px)`,
          }}
        />
      </div>

      {/* Secondary small dot - keeping the cursor style */}
      <div
        className="fixed pointer-events-none z-[10000] mix-blend-difference transition-opacity duration-300"
        style={{
          opacity: isHidden ? 0 : 1,
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white transition-transform duration-300"
          style={{
            width: isClicking ? "10px" : "12px",
            height: isClicking ? "10px" : "12px",
            transform: `scale(${isPointer ? 2 : isScrolling ? 2 : 1})`,
          }}
        />
      </div>

      {/* Additional scroll effect for desktop */}
      {isScrolling && (
        <div
          className="fixed inset-0 pointer-events-none z-[9998] transition-opacity duration-500"
          style={{
            opacity: 0.2,
            background: "radial-gradient(circle at center, rgba(var(--primary), 0.3) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}
    </>
  );
};

export default CursorAnimation;