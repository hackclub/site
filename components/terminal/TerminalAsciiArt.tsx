import React, { useState, useEffect } from 'react';

export const TerminalAsciiArt = ({ className }: { className?: string }) => {
  const [displayed, setDisplayed] = useState<string>('');
  const [completed, setCompleted] = useState<boolean>(false);
  
  // ASCII art content
  const fullAsciiArt = `     __  __            __       ________      __    
    / / / /___ ______/ /__    / ____/ /_  __/ /_   
   / /_/ / __ \`/ ___/ //_/   / /   / / / / / __ \\  
  / __  / /_/ / /__/ ,<     / /___/ / /_/ / /_/ /  
 /_/ /_/\\__,_/\\___/_/|_|    \\____/_/\\__,_/_.___/   
                                                   
     << CODE • SHARE • SHIP • REPEAT >>
`;
  
  // Typewriter effect
  useEffect(() => {
    if (displayed.length < fullAsciiArt.length) {
      const timer = setTimeout(() => {
        setDisplayed(fullAsciiArt.substring(0, displayed.length + 1));
      }, 15); // Adjust speed as needed
      return () => clearTimeout(timer);
    } else {
      setCompleted(true);
    }
  }, [displayed]);
  
  // Add scanline effect
  const scanlineClass = completed ? "after:content-[''] after:absolute after:top-0 after:left-0 after:right-0 after:h-[2px] after:bg-hack-red/20 after:animate-[scanline_6s_linear_infinite]" : "";
  
  // Random color selection
  const colors = ["text-hack-red", "text-hack-green", "text-hack-blue", "text-hack-purple"];
  const [color] = useState(colors[Math.floor(Math.random() * colors.length)]);
  
  return (
    <div className={`terminal-card overflow-hidden relative ${scanlineClass} ${className || ''} pb-4`}>
      <div className="flex items-center mb-2">
        <div className={`w-3 h-3 bg-hack-red rounded-full mr-2 ${completed ? "animate-pulse-light" : ""}`}></div>
        <h3 className="text-hack-red font-mono text-sm">ASCII_ART.txt</h3>
      </div>
      
      <pre className={`${color} text-xs overflow-x-auto font-mono font-bold relative`}>
        {displayed}
      </pre>
      
      {completed && (
        <div className="text-right text-terminal-muted text-xs mt-2 italic animate-fade-in">
          Type <span className="text-terminal-accent">ascii --replay</span> to see again
        </div>
      )}
    </div>
  );
};
