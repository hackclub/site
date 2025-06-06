'use client'

import * as React from "react";
import { useState, useEffect } from "react";
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/button';
import { ModeToggle } from '../ModeToggle';
import Link from 'next/link';
import Webring from '../Webring';

// Add custom SVG components
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" y1="12" x2="20" y2="12"></line>
    <line x1="4" y1="6" x2="20" y2="6"></line>
    <line x1="4" y1="18" x2="20" y2="18"></line>
  </svg>
);

const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const CodeIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const ZapIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const GithubIcon = ({ size = 16, className = "" }) => (
  <svg width={size} height={size} fill="currentColor" viewBox="0 0 24 24" className={className}>
    <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.1-1.5-1.1-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0 1 12 6.84c.85.004 1.71.12 2.51.34 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"/>
  </svg>
);

export const Navbar = () => {
  useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      role="banner"
      aria-label="Main navigation bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 ${isScrolled ? 'bg-black' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between" role="navigation" aria-label="Main">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-hack-purple rounded-md" tabIndex={0} aria-label="Hack Club Home">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-hack-red relative group-hover:animate-pulse">
                <img 
                  src="https://assets.hackclub.com/icon-rounded.svg"
                  alt="Hack Club logo"
                  className="w-8 h-8 group-hover:animate-pulse relative z-10"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-hack-red via-hack-purple to-hack-blue bg-[length:200%] animate-pulse-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-shimmer"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 border-2 border-hack-red/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
              </div>
              <span className="text-2xl font-bold tracking-tight relative flex items-center">
                <span className="text-white group-hover:text-hack-purple transition-colors relative">
                  <span className="absolute inset-0 bg-hack-purple/10 blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  Hack
                </span>
                <span className="text-green-400 group-hover:text-hack-blue transition-colors relative ml-1">
                  <span className="absolute inset-0 bg-hack-blue/10 blur-sm transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                  Club
                </span>
                <span className="sr-only">Hack Club</span>
              </span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="space-x-6 flex items-center">
              <Link href="#programs" className="text-green-200 hover:text-hack-purple font-mono transition-colors relative group focus:outline-none focus:ring-2 focus:ring-hack-purple rounded-md flex items-center" tabIndex={0} aria-label="Programs">
                <div className="flex items-center">
                  <CodeIcon />
                  <span className="relative">Programs</span>
                </div>
              </Link>
              <Link href="#community" className="text-green-200 hover:text-hack-purple font-mono transition-colors relative group focus:outline-none focus:ring-2 focus:ring-hack-purple rounded-md flex items-center" tabIndex={0} aria-label="Community">
                <div className="flex items-center">
                  <TerminalIcon />
                  <span className="relative">Community</span>
                </div>
              </Link>
              <Link href="#workshops" className="text-green-200 hover:text-hack-purple font-mono transition-colors relative group focus:outline-none focus:ring-2 focus:ring-hack-purple rounded-md flex items-center" tabIndex={0} aria-label="Workshops">
                <div className="flex items-center">
                  <ZapIcon />
                  <span className="relative">Workshops</span>
                </div>
              </Link>
              <Link href="/team" className="text-green-200 hover:text-hack-purple font-mono transition-colors relative group focus:outline-none focus:ring-2 focus:ring-hack-purple rounded-md flex items-center" tabIndex={0} aria-label="Team">
                <div className="flex items-center">
                  <UsersIcon />
                  <span className="relative">Team</span>
                </div>
              </Link>
              <Link href="/about" className="text-green-200 hover:text-hack-purple font-mono transition-colors relative group focus:outline-none focus:ring-2 focus:ring-hack-purple rounded-md flex items-center" tabIndex={0} aria-label="About">
                <div className="flex items-center">
                  <InfoIcon />
                  <span className="relative">About</span>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4 ml-6">
              <Button variant="outline" className="border-green-600 text-green-400 hover:bg-green-900/20 hover:text-white font-mono group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-400" aria-label="Start a club">
                <span className="text-green-400 group-hover:animate-pulse">$</span> start-club
              </Button>
              <Button className="bg-green-700 hover:bg-green-600 hover:text-white font-mono group relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-green-400" aria-label="Join Slack">
                <span className="text-white group-hover:animate-pulse">$</span> join-slack
              </Button>
              
              <div className="border-l border-gray-200 dark:border-gray-700 h-8 mx-2"></div>
              <div className="scale-75 origin-center">
                <Webring />
              </div>
              <ModeToggle />
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              className="text-hack-red hover:text-hack-purple focus:outline-none focus:ring-2 focus:ring-hack-purple"
            >
              {isMenuOpen ? <XIcon /> : <MenuIcon />}
            </Button>
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-t border-green-600/20 shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-3">
            <Link href="#programs" className="block py-2 px-4 text-green-200 hover:bg-green-900/10 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-green-400" tabIndex={0} aria-label="Programs">
              <div className="flex items-center">
                <CodeIcon />
                <span className="ml-2">Programs</span>
              </div>
            </Link>
            <Link href="#community" className="block py-2 px-4 text-green-200 hover:bg-green-900/10 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-green-400" tabIndex={0} aria-label="Community">
              <div className="flex items-center">
                <TerminalIcon />
                <span className="ml-2">Community</span>
              </div>
            </Link>
            <Link href="#workshops" className="block py-2 px-4 text-green-200 hover:bg-green-900/10 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-green-400" tabIndex={0} aria-label="Workshops">
              <div className="flex items-center">
                <ZapIcon />
                <span className="ml-2">Workshops</span>
              </div>
            </Link>
            <Link href="/team" className="block py-2 px-4 text-green-200 hover:bg-green-900/10 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-green-400" tabIndex={0} aria-label="Team">
              <div className="flex items-center">
                <UsersIcon />
                <span className="ml-2">Team</span>
              </div>
            </Link>
            <Link href="/about" className="block py-2 px-4 text-green-200 hover:bg-green-900/10 rounded-md font-mono focus:outline-none focus:ring-2 focus:ring-green-400" tabIndex={0} aria-label="About">
              <div className="flex items-center">
                <InfoIcon />
                <span className="ml-2">About</span>
              </div>
            </Link>
            <div className="pt-2 flex flex-col space-y-2">
              <Button variant="outline" className="w-full border-green-600 text-green-400 justify-start font-mono focus:outline-none focus:ring-2 focus:ring-green-400 hover:text-white hover:bg-green-900/10" aria-label="Start a club">
                <span className="text-green-400">$</span> start-club
              </Button>
              <Button className="w-full bg-green-700 hover:bg-green-600 text-white justify-start font-mono focus:outline-none focus:ring-2 focus:ring-green-400 hover:text-white" aria-label="Join Slack">
                <span className="text-white">$</span> join-slack
              </Button>
            </div>
            <div className="pt-4 border-t border-green-600/20">
              <Webring />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
