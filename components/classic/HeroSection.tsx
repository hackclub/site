import React, { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { AspectRatio } from '../../components/ui/aspect-ratio';

// Custom SVG components for icons
const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
    <section className="pt-28 pb-16 px-6 md:py-32 overflow-hidden relative bg-black text-green-400 font-mono">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden -z-10">
        {/* Remove colorful blur circles */}
      </div>

      <div className="max-w-7xl mx-auto relative z-20 py-8 md:py-16 mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
          <div className="text-left animate-fade-in order-2 md:order-1">
            {/* Terminal prompt badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-900/30 text-green-400 mb-6 border border-green-600 font-mono backdrop-blur-sm">
              <TerminalIcon />
              <span className="text-sm font-medium">user@hackclub:~$</span>
            </div>
            
            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-green-400">
              <span className="block">Where</span>
              <span className="block text-white relative glitch-text mt-2" data-text="teen hackers">teen hackers</span>
              <span className="block mt-2">unite.</span>
            </h1>
            
            {/* Typing effect paragraph */}
            <div className="h-24 md:h-16 ">
              <p className="text-xl md:text-2xl text-green-200 font-mono border-r-2 border-green-400 inline-block pr-1">
                {typedText}
                <span className="animate-blink text-green-400">▊</span>
              </p>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Button className="bg-green-700 hover:bg-green-600 text-white font-bold border border-green-500 rounded-lg font-mono text-lg transition-transform duration-200 flex items-center gap-2 group">
                <span className="mr-1 text-white">$</span>
                <span className="relative z-10">Join our Slack</span>
                <ArrowRightIcon />
              </Button>
              <Button className="border-green-600 text-green-400 hover:bg-green-900/20 hover:text-white rounded-lg font-mono text-lg transition-transform duration-200 flex items-center gap-2">
                <a href="#programs" className="flex items-center gap-2">
                  <span className="mr-1 text-green-400 group-hover:text-white">$</span>
                  Explore Programs
                </a>
              </Button>
            </div>
          </div>
          
          {/* Image and floating badges */}
          <div className="relative order-1 md:order-2 mt-12 md:mt-0">
            {/* Remove blur circles */}
            {/* Background Photo - reverted to div with background-image style */}
            <div 
              className="absolute inset-0 w-full h-full bg-cover bg-center rounded-2xl overflow-hidden border-4 border-green-600 shadow-[0_0_30px_5px_rgba(34,197,94,0.3)]"
              style={{ backgroundImage: `url('${backgroundImageUrl || 'https://lh3.googleusercontent.com/pw/AP1GczO2IJv7fY7324xZY21Zes0N-1E6eR_MUF4xwx2S45uF9wdAUztbkyJ4ZbouC8H7ylTS3krndD7-AA3t5weGm7BwYsR-adXFvxShhyqx-wmxy9g0Kg3T6K7VMpIm02a6vNvVXj5P88TuALnailQITY_e=w1431-h954-s-no-gm'}')` }}
            >
            </div>
            
            {/* Floating badges - restyle */}
            <div className="absolute -right-4 top-10 bg-gray-900 text-green-400 border border-green-600 rounded-lg shadow-lg p-3 transform rotate-6 animate-float font-mono">
              <div className="flex items-center text-sm font-medium">
                <CodeIcon />
                <span>$ cat projects.txt</span>
              </div>
               <div className="mt-2 text-xs text-green-200">
                1,000+ projects shipped
              </div>
            </div>
            <div className="absolute -left-4 bottom-10 bg-gray-900 text-green-400 border border-green-600 rounded-lg shadow-lg p-3 transform -rotate-3 animate-float delay-300 font-mono">
              <div className="flex items-center text-sm font-medium">
                <TerminalIcon />
                <span>$ ls clubs</span>
              </div>
               <div className="mt-2 text-xs text-green-200">
                 500+ active clubs
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider - remove or restyle? Removing for now */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden -z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full transform scale-y-50">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-gray-50"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-gray-50"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-gray-50"></path>
        </svg>
      </div> */}
    </section>
  );
};
