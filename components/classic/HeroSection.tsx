import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { AspectRatio } from '../../components/ui/aspect-ratio';

// Custom SVG components for icons
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const CodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

// Added GitHubIcon SVG component
const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75c.15-.37.6-1.29-.24-2.75 0 0-1.03-.35-3.38 1.48A13.38 13.38 0 0 0 12 8.42c-2.7-.05-5.4-.5-8-1.5C1.03 4.92 0 6 0 6c-.83 1.46-.38 2.38-.23 2.75A5.44 5.44 0 0 0 5 10.61c0 5.46 3.3 6.61 6.44 7A3.37 3.37 0 0 0 18 13.87V17"></path>
  </svg>
);

interface HeroSectionProps {
  backgroundImageUrl?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImageUrl }) => {
  const [typedText, setTypedText] = useState("");
  const [teenHackersText, setTeenHackersText] = useState("");
  const fullText = "Join a global community of high school coders building, learning, and shipping projects together.";
  const teenHackers = "teen hackers";
  
  useEffect(() => {
    let i = 0;
    const typeEffect = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeEffect);
      }
    }, 50);
    
    return () => clearInterval(typeEffect);
  }, []);

  useEffect(() => {
    let i = 0;
    const typeTeenHackers = setInterval(() => {
      if (i < teenHackers.length) {
        setTeenHackersText(teenHackers.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typeTeenHackers);
      }
    }, 100);
    
    return () => clearInterval(typeTeenHackers);
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-green-400 font-mono overflow-hidden">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-green-900/20 -z-10" />
      
      {/* Main content container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left column - Text content */}
          <div className="space-y-8 animate-fade-in">
            {/* Terminal prompt badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-900/30 text-green-400 border border-green-600/50 font-mono backdrop-blur-sm shadow-lg shadow-green-900/20 transition-all duration-300 hover:bg-green-900/40">
              <TerminalIcon />
              <span className="text-sm font-medium">user@hackclub:~$</span>
            </div>
            
            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="block text-green-400">Where</span>
                <span className="block text-white relative glitch-text mt-2 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent" data-text="teen hackers">
                  teen hackers
                </span>
                <span className="block mt-2 text-green-400">unite.</span>
            </h1>
            </div>
            
            {/* Typing effect paragraph */}
            <div className="h-24 md:h-20">
              <p className="text-xl md:text-2xl text-green-200/90 font-mono border-r-2 border-green-400 inline-block pr-1 leading-relaxed">
                {typedText}
                <span className="animate-blink text-green-400">▊</span>
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-green-600 hover:bg-green-500 text-white font-bold border border-green-500 rounded-lg font-mono text-lg transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-green-900/20 hover:shadow-green-900/30 hover:scale-105">
                <span className="mr-1 text-white">$</span>
                <span className="relative z-10">Join our Slack</span>
                <ArrowRightIcon />
              </Button>
              <Button className="bg-gray-800 hover:bg-gray-700 text-green-400 hover:text-white border border-gray-700 rounded-lg font-mono text-lg transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-gray-900/20 hover:shadow-gray-900/30 hover:scale-105">
                <a href="#programs" className="flex items-center gap-2">
                  <span className="mr-1 text-green-400 group-hover:text-white">$</span>
                  Explore Programs
                </a>
              </Button>
            </div>
          </div>
          
          {/* Right column - Image and floating badges */}
          <div className="relative lg:h-[600px]">
            {/* Background Photo */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center rounded-2xl overflow-hidden border-4 border-green-600/50 shadow-[0_0_30px_5px_rgba(34,197,94,0.2)] transition-all duration-500 hover:shadow-[0_0_40px_10px_rgba(34,197,94,0.3)]"
              style={{ backgroundImage: `url('${backgroundImageUrl || 'https://lh3.googleusercontent.com/pw/AP1GczO2IJv7fY7324xZY21Zes0N-1E6eR_MUF4xwx2S45uF9wdAUztbkyJ4ZbouC8H7ylTS3krndD7-AA3t5weGm7BwYsR-adXFvxShhyqx-wmxy9g0Kg3T6K7VMpIm02a6vNvVXj5P88TuALnailQITY_e=w1431-h954-s-no-gm'}')` }}
            />
            
            {/* Floating badges */}
            <a href="https://github.com/hackclub" target="_blank" rel="noopener noreferrer" className="absolute -right-4 top-10 bg-gray-900/90 text-green-400 border border-green-600/50 rounded-lg shadow-lg p-4 transform rotate-6 animate-float font-mono backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:rotate-3 block">
              <div className="flex items-center text-sm font-medium">
                <GitHubIcon />
                <span className="ml-2">$ explore more projects on GitHub</span>
              </div>
              <div className="mt-2 text-xs text-green-200/90">
                github.com/hackclub
              </div>
            </a>
            
            <div className="absolute -left-4 bottom-10 bg-gray-900/90 text-green-400 border border-green-600/50 rounded-lg shadow-lg p-4 transform -rotate-3 animate-float delay-300 font-mono backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:-rotate-6">
              <div className="flex items-center text-sm font-medium">
                <TerminalIcon />
                <span className="ml-2">$ ls clubs</span>
              </div>
              <div className="mt-2 text-xs text-green-200/90">
                 500+ active clubs
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
