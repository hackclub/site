import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

// Custom SVG components for icons
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const CalendarDaysIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <rect x="9" y="10" width="2" height="2"></rect>
    <rect x="13" y="10" width="2" height="2"></rect>
    <rect x="9" y="14" width="2" height="2"></rect>
    <rect x="13" y="14" width="2" height="2"></rect>
  </svg>
);

const TerminalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const communityItems = [
    {
    title: 'Clubs',
    description: 'Student-led coding clubs where teenagers learn to code and build projects together after school.',
    icon: <UsersIcon />,
    image: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/0a9922974bc760b62761be90843eee4e6e6148ed_oip__27___1_.jpg',
    buttonText: 'Start a Club',
    buttonUrl: 'https://hackclub.com/clubs'
  },
    {
    title: 'Hack Club Bank',
    description: 'The financial platform for high school hackathons, clubs, and other student-led projects.',
    icon: <BuildingIcon />,
    image: 'https://cloud-cuely0z02-hack-club-bot.vercel.app/0assemble__2_.jpg',
    buttonText: 'Learn about HCB',
    buttonUrl: 'https://hackclub.com/bank'
  },
  {
    title: 'Hackathons',
    description: 'Weekend-long events where hundreds of teenagers gather to build creative coding projects together.',
    icon: <CalendarDaysIcon />,
    image: 'https://cloud-issl87d62-hack-club-bot.vercel.app/0bmc_1823.jpg',
    buttonText: 'Find a Hackathon',
    buttonUrl: 'https://hackathons.hackclub.com'
  },
];

export const CommunitySection = () => {
  return (
    <section className="py-20 px-6 bg-black text-green-400 font-mono relative overflow-hidden  shadow-[0_0_30px_5px_rgba(34,197,94,0.3)] ">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-900/30 text-green-400 mb-4 border border-green-600 font-mono">
            <UsersIcon />
            <span className="text-sm font-medium">community@hackclub:~$</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-green-400">
            Find your <span className="text-white glitch-text-subtle">IRL community</span>
          </h2>
          
          <p className="text-lg text-green-200 max-w-2xl mx-auto">
            Thousands of Hack Clubbers organize and participate in hackathons and after-school coding clubs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.isArray(communityItems) && communityItems.map((item, index) => (
            item ? (
              <Card 
                key={index} 
                className="overflow-hidden border border-green-600 shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-900 text-green-200 rounded-xl hover:translate-y-[-5px]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-48">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="community-card-overlay"></div>
                  
                  <div className="absolute top-4 left-4 bg-gray-900 rounded-full p-2 shadow-lg border border-green-500">
                    {item.icon}
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-green-400">{item.title}</h3>
                  <p className="text-green-200 mb-4 text-sm">{item.description}</p>
                  
                  <Button 
                    className="w-full bg-green-700 hover:bg-green-600 text-white font-bold border border-green-500"
                    asChild
                  >
                    <a href={item.buttonUrl} target="_blank" rel="noopener noreferrer">
                      <span className="mr-1 text-white">$</span>{item.buttonText}
                    </a>
                  </Button>
                </div>
              </Card>
            ) : null
          ))}
        </div>
      </div>
    </section>
  );
};
