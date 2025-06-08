'use client'

import React, { useEffect } from 'react';
import { HeroSection } from './HeroSection';
import { ProgramsSection } from './ProgramsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { SignupSection } from './SignupSection';
import { SlackSection } from './SlackSection';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { OpenSourceSection } from './OpenSourceSection';
import { CommunitySection } from './CommunitySection';
import { TimelineSection } from './TimelineSection';

export const ClassicMode = () => {
  // Add scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            const target = entry.target as HTMLElement;
            target.style.opacity = '1';
          }
        });
      },
      { threshold: 0.1 }
    );

    // Target elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  // Add terminal cursor blink effect
  useEffect(() => {
    const addCursorBlinkClass = () => {
      document.querySelectorAll('.terminal-cursor').forEach(el => {
        el.classList.add('cursor-blink');
      });
    };
    
    // Small delay to ensure DOM elements are ready
    setTimeout(addCursorBlinkClass, 500);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col relative overflow-x-hidden">
      <Navbar />
      <main className="flex-grow">
        <div className="relative">
          <HeroSection backgroundImageUrl="https://hackclub.com/_next/image/?url=%2F_next%2Fstatic%2Fmedia%2Fouternet-110.c7a20868.jpg&w=3840&q=75" />
          <ProgramsSection />
          <OpenSourceSection />
          <CommunitySection />
          <TestimonialsSection />
          <TimelineSection />
          <SlackSection />
          <SignupSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};
