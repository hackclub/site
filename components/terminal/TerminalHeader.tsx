
import React, { useState, useEffect } from 'react';

export const TerminalHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex justify-between items-center terminal-card mb-4">
      <div className="flex items-center">
        <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="h-3 w-3 rounded-full bg-green-500"></div>
      </div>
      <div className="text-terminal-text/70 text-sm">
        hack@club ~ {currentTime.toLocaleTimeString()}
      </div>
      <div className="text-terminal-text/70 text-sm">bash</div>
    </div>
  );
};
