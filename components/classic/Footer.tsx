import React from 'react';
import { Separator } from "../ui/separator";

// Custom SVG components for icons
const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const Footer = () => {
  return (
    <footer className="bg-black py-12 px-6 font-mono text-green-400 border-t-4 border-green-600 shadow-[0_0_30px_5px_rgba(34,197,94,0.3)] relative">
      <div className="max-w-7xl mx-auto">
        {/* Image & Terminal Prompt */}
        <div className="mb-10 flex flex-col items-center">
          <img src="https://assets.hackclub.com/icon-rounded.svg" alt="Hack Club Logo" className="w-24 h-24 mb-4" />
          <div className="flex flex-col items-center">
            <span className="text-green-500 font-bold text-lg">$ <span className="text-white font-semibold text-center">Welcome to the Hack Club terminal footer!</span></span>
            
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Column 1: Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img 
                src="https://assets.hackclub.com/icon-rounded.svg"
                alt="Hack Club Logo"
                className="w-10 h-10"
              />
              <span className="text-2xl font-bold text-green-400">Hack<span className="text-hack-red">Club</span></span>
            </div>
            <p className="text-green-200 max-w-xs text-base">
              A nonprofit network of high school coding clubs and makers around the world.
            </p>
            <p className="text-green-600 text-sm">
              501(c)(3) nonprofit • EIN: 81-2908499
            </p>
          </div>
          {/* Column 2: Resources */}
          <div>
            <h3 className="font-bold text-green-300 mb-4 text-xl">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Workshops</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Slack</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Events Calendar</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Starter Projects</a></li>
            </ul>
          </div>
          {/* Column 3: Community */}
          <div>
            <h3 className="font-bold text-green-300 mb-4 text-xl">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Start a Club</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Code of Conduct</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">GitHub</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Contribute</a></li>
            </ul>
          </div>
          {/* Column 4: Organization */}
          <div>
            <h3 className="font-bold text-green-300 mb-4 text-xl">Organization</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">About</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Team</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Transparency</a></li>
              <li><a href="#" className="hover:text-hack-green transition-colors before:content-['$'] before:mr-1 text-green-100">Jobs</a></li>
            </ul>
          </div>
        </div>
        {/* Social Media Icons */}
        <div className="flex justify-center gap-8 mt-8 mb-4">
          <a href="https://github.com/hackclub" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-white transition-colors text-green-400 text-2xl">
            <GithubIcon />
          </a>
          <a href="https://twitter.com/hackclub" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400 transition-colors text-green-400 text-2xl">
            <TwitterIcon />
          </a>
          <a href="https://instagram.com/hackclub" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 transition-colors text-green-400 text-2xl">
            <InstagramIcon />
          </a>
        </div>
      </div>
    </footer>
  );
};
