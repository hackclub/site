import React, { useState, useEffect } from 'react';

export const TerminalHeader = () => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gray-900 border-b border-green-600">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
        {/* Left: Window controls */}
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>

        {/* Center: Terminal title */}
        <div className="font-mono text-green-400">
          hack@club ~ {currentTime}
        </div>

        {/* Right: Shell indicator */}
        <div className="font-mono text-green-400">
          bash
        </div>
      </div>
    </div>
  );
}; 