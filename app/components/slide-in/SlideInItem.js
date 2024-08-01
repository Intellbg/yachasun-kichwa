'use client'
import React, { useEffect, useRef } from 'react';
import './styles.css';

const SlideInItem = ({ children, direction = 'left', className = '' }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const directionClass = `slide-in-visible-${direction}`;
            entry.target.classList.add(directionClass);
            observer.unobserve(entry.target); 
          }
        });
      },
      {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1, 
      }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [direction]);

  const initialClass = `slide-in slide-in-${direction}`;

  return (
    <div ref={itemRef} className={`${initialClass} ${className}`}>
      {children}
    </div>
  );
};

export default SlideInItem;
