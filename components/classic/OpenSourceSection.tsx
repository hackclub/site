import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

// Custom SVG components
const CodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const ExternalLinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

const staticProjects = [
  {
    name: 'Sprig',
    description: 'A programmable game console for creative coding in the browser and real world.',
    image_url: 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0sprig.png',
    tags: ['hardware', 'games', 'education'],
    repo_url: 'https://github.com/hackclub/sprig',
    demo_url: 'https://sprig.hackclub.com/'
  },
  {
    name: 'SineRider',
    description: 'A math puzzle game for learning graphing and functions, built by teens for teens.',
    image_url: 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0sinerider.png',
    tags: ['math', 'games', 'learning'],
    repo_url: 'https://github.com/hackclub/sinerider',
    demo_url: 'https://sinerider.com/'
  },
  {
    name: 'HCB',
    description: 'A financial platform for student organizations to manage money transparently.',
    image_url: 'https://cloud-9tqir75lf-hack-club-bot.vercel.app/0bank.png',
    tags: ['finance', 'webapp', 'students'],
    repo_url: 'https://github.com/hackclub/bank',
    demo_url: 'https://hcb.hackclub.com/'
  }
];

export const OpenSourceSection = () => {
  return (
    <section id="opensource" className="py-16 px-6 relative overflow-hidden bg-white">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-10 -z-10"></div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 opacity-0 animate-on-scroll">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-black text-hack-green mb-4 font-mono border border-hack-green/30">
            <CodeIcon width={16} height={16} className="mr-2" />
            <span className="text-sm font-medium">$ git clone hack-club/open-source</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 glitch-text-subtle">
            We build open source tools together
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            In collaboration with engineers on the Hack Club team, Hack Clubbers build learning tools for each other.
          </p>
        </div>
        {/* Project cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {staticProjects.map((project, index) => (
            <Card 
              key={index}
              className="project-card animate-on-scroll opacity-0 overflow-visible"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-hack-purple/20 to-hack-blue/20 mix-blend-overlay"></div>
                <img 
                  src={project.image_url} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop
                    target.src = 'https://assets.hackclub.com/api/v0.1/files/bc14129/download/hackclub-rect.jpg';
                  }}
                />
                <div className="absolute top-3 left-3 bg-black/80 rounded-full p-1 backdrop-blur-sm border border-white/10">
                  <GithubIcon width={14} height={14} />
                </div>
              </div>
              <CardContent className="pt-4">
                <h3 className="text-xl font-bold font-display mb-2 flex items-center">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-3 text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full font-mono">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="border-hack-purple/50 text-hack-purple hover:bg-hack-purple/10 flex gap-2 items-center text-xs w-full justify-center"
                    asChild
                  >
                    <a href={project.repo_url} target="_blank" rel="noopener noreferrer">
                      <GithubIcon width={14} height={14} /> View Source
                    </a>
                  </Button>
                  <Button 
                    className="bg-hack-blue hover:bg-hack-blue/90 flex gap-2 items-center text-xs w-full justify-center"
                    asChild
                  >
                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLinkIcon width={14} height={14} /> Try It
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-8">
          <div className="inline-block bg-black text-green-400 border border-green-600 rounded-lg px-6 py-4 shadow-lg font-mono relative overflow-hidden">
            <span className="text-green-400">$</span> <span className="text-white">explore more projects on</span> <span className="text-hack-green">GitHub</span>
            <span className="ml-2 animate-pulse text-green-400">▊</span>
            <div className="mt-4 flex justify-center">
              <Button 
                className="border-green-600 text-green-400 hover:bg-green-900/20 hover:text-white font-mono flex items-center gap-2 px-6 py-2 text-base group"
                asChild
              >
                <a href="https://github.com/hackclub" target="_blank" rel="noopener noreferrer">
                  <GithubIcon width={18} height={18} className="group-hover:text-white" /> 
                  <span className="group-hover:text-white">github.com/hackclub</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

