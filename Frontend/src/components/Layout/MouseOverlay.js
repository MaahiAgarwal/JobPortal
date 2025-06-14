import React, { useState, useEffect } from 'react';

const MouseOverlay = ({ isDarkMode }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId;
    let animationFrameId;

    const handleMouseMove = (e) => {
      // Use requestAnimationFrame for smoother updates
      animationFrameId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
      });
      
      setIsMoving(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMoving(false), 300);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-0 transition-all duration-300 ease-out overflow-hidden"
      style={{
        background: isDarkMode 
          ? `radial-gradient(circle 700px at ${position.x}px ${position.y}px, 
              rgba(59, 130, 246, ${isMoving ? '0.15' : '0.10'}), 
              transparent 70%)`
          : `radial-gradient(circle 600px at ${position.x}px ${position.y}px, 
              rgba(99, 102, 241, ${isMoving ? '0.12' : '0.08'}), 
              transparent 60%)`,
        opacity: isMoving ? 1 : 0.9
      }}
    />
  );
};

export default MouseOverlay;