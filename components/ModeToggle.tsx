'use client'

import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { cn } from '../lib/utils';

// Custom SVG components for terminal and sun icons
const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

export const ModeToggle = ({ className }: { className?: string }) => {
  const { mode, toggleMode } = useTheme();
  
  return (
    <button 
      onClick={toggleMode}
      className={cn(
        "fixed top-4 right-4 z-50 p-2 rounded-full transition-colors duration-200",
        mode === 'terminal' 
          ? "bg-terminal-accent/20 hover:bg-terminal-accent/40 text-terminal-text" 
          : "bg-white shadow-md hover:bg-gray-100 text-hack-purple",
        className
      )}
      aria-label="Toggle theme mode"
    >
      {mode === 'terminal' ? (
        <SunIcon />
      ) : (
        <TerminalIcon />
      )}
    </button>
  );
};
