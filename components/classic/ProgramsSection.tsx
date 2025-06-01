import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { fetchEvents } from '../../services/hackClubApi';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

const TerminalIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ZapIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const Loader2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

const programs = [
  {
    title: 'Neighborhood',
    description: "If you spend 100 hours this May making your own app, you're guaranteed a flight stipend to & housing in San Francisco this Summer (June - August) ",
    icon: <TerminalIcon className="h-6 w-6 text-hack-green" />,
    badge: 'Start Now',
    badgeColor: 'bg-hack-green/20 text-hack-green border border-hack-green/30',
    terminalOutput: './run neighborhood',
    date: '📍 SF — Summer 2025',
    image: 'https://v5.airtableusercontent.com/v3/u/41/41/1747864800000/1X1R_hCUYnJAwr05tkGhHw/pbiivhbUPDsoHgTmvtAfT957-7wnxwBNDm_JVLuKK03JjnN7V3MS58Vur0P3wjICh1UpwGRoB3ysZA8GqNKjTD87H3QlzhysAKTr5_uhK_Dy_BaafdySFlCyzExny82YrMjtL8w5b5ZDohR3CYK3BA9iE2tiVcie9Jyj4AlRZYs/RODn2EfHhrHEg-1PUqjjpVv1achJAwaLkWP8xsAGDnA',
    tags: ["#summer"],
    fileType: 'sh'
  },
  {
    title: 'HIGHWAY TO UNDERCITY',
    description: "HIGHWAY is a grant program where you can make any hardware project, and we'll give up to 150 USD per project (or 350 for advanced projects) for you to build it. Design, Ship, Repeat, until July 31st!",
    icon: <ZapIcon className="h-6 w-6 text-hack-red" />,
    badge: 'Apply Soon',
    badgeColor: 'bg-hack-red/20 text-hack-red border border-hack-red/30',
    terminalOutput: './summer --mode=making',
    date: '🗓️ July 11-14 @ Github HQ',
    image: 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/cda2ac7007b4e6ca3d6ae57dcdb1246943d39733_highwaytoundercity.png',
    tags: ["#hardware","#summer","#grants"],
    fileType: 'py'
  },
];

// Helper function to format event date
const formatEventDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

// Helper to get event tags based on description
const generateEventTags = (event: any): string[] => {
  const description = event.description?.toLowerCase() || '';
  const tags = [];
  
  if (description.includes('workshop')) tags.push('#workshop');
  if (description.includes('hack') || description.includes('hackathon')) tags.push('#hackathon');
  if (description.includes('online') || description.includes('virtual')) tags.push('#online');
  if (description.includes('beginner')) tags.push('#beginner');
  if (description.includes('game')) tags.push('#gamedev');
  if (description.includes('ai') || description.includes('machine learning')) tags.push('#ai');
  if (description.includes('hardware') || description.includes('arduino')) tags.push('#hardware');
  if (description.includes('web')) tags.push('#webdev');
  if (description.includes('mobile')) tags.push('#mobile');
  
  // Add default tags if none were found
  if (tags.length === 0) {
    tags.push('#coding', '#community');
  }
  
  // Limit to 3 tags max
  return tags.slice(0, 3);
};

// Helper to get file extension based on event title
const getFileExtension = (title: string): string => {
  const lowercase = title.toLowerCase();
  if (lowercase.includes('python') || lowercase.includes('ai')) return 'py';
  if (lowercase.includes('web') || lowercase.includes('javascript')) return 'js';
  if (lowercase.includes('game')) return 'unity';
  if (lowercase.includes('workshop')) return 'md';
  if (lowercase.includes('hackathon')) return 'sh';
  
  // Random extensions for variety
  const extensions = ['js', 'py', 'md', 'sh', 'html'];
  return extensions[Math.floor(Math.random() * extensions.length)];
};

export const ProgramsSection = () => {
  const { data: events, isLoading: eventsLoading, error: eventsError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <section className="py-16 px-6 bg-black relative overflow-hidden border-t-4 border-green-600 shadow-[0_0_30px_5px_rgba(34,197,94,0.3)]">
      {/* Matrix/code background overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10"></div>
      
      {/* Banner */}
      <div className="relative z-10 max-w-6xl mx-auto mb-16 py-12 px-6 rounded-xl bg-gray-900 overflow-hidden border border-green-600">
        {/* CRT scanline overlay */}
        <div className="absolute inset-0 pointer-events-none animate-scanline opacity-20 z-0 bg-gradient-to-b from-transparent via-green-400/20 to-transparent" style={{height: '200%'}}></div>
        
        <div className="text-center relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono text-green-400 glitch-text animate-on-scroll" data-text="Where Teen Hackers Unite.">
            <span className="text-green-400">Where</span> <span className="text-white">Teen</span> <span className="text-green-400">Hackers</span> <span className="text-white">Unite.</span>
          </h2>
          <div className="mt-4 inline-block">
            <div className="inline-flex items-center px-4 py-2 bg-black/30 border border-green-600 rounded-md text-green-400 font-mono text-sm">
              <span className="text-green-500 mr-2">$</span>
              <span className="typing-effect">sudo apt-get install community-collaboration-creativity</span>
              <span className="animate-blink text-green-400">▊</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12 animate-on-scroll opacity-0">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 text-green-400 mb-4 relative font-mono border border-green-600">
            <span className="text-green-500 mr-2">$</span>
            <span className="text-sm font-medium">./upcoming-programs --live</span>
            <span className="animate-blink text-green-400 ml-1">▊</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4 text-green-400 glitch-text-subtle">
            current_programs.sh
          </h2>
          <p className="text-xl text-green-200 max-w-2xl mx-auto font-mono">
            <span className="text-green-500">$</span> find /hackclub/programs -type f -name "*.awesome" | sort -r
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <Card 
              key={index} 
              className="card-classic border border-green-600 hover:translate-y-[-8px] transition-all duration-300 animate-on-scroll opacity-0 hover:shadow-lg hover:shadow-green-600/20 bg-gray-900 text-green-400 overflow-visible relative group"
              style={{ animationDelay: `${150 + index * 100}ms` }}
            >
              <div className="absolute top-4 right-5 z-20">
                <Badge className="bg-green-900/50 text-green-400 border border-green-600 font-mono text-xs px-2 shadow-sm">
                  {program.badge}
                </Badge>
              </div>
              
              {/* File type label badge */}
              <div className="absolute top-4 left-4 z-20">
                <Badge className="bg-black/70 border border-green-600 text-green-400 font-mono text-xs px-2 shadow-sm">
                  [{`.${program.fileType}`}]
                </Badge>
              </div>
              <br/>
              <CardHeader className="pb-2 pt-10">
                <div className="flex flex-col gap-3">
                  {/* Terminal command display */}
                  <div className="font-mono text-xs bg-black text-green-400 p-2 rounded-md flex items-center overflow-x-auto whitespace-nowrap border border-green-600">
                    <span className="text-green-500 mr-2">$</span>
                    <span className="typing-effect" style={{ animationDuration: '2s', width: 'auto' }}>
                      {program.terminalOutput}
                    </span>
                    <span className="animate-blink text-green-400">▊</span>
                  </div>
                  
                  {/* Program title with icon */}
                  <CardTitle className="text-2xl font-bold font-mono inline-flex items-center gap-2 text-green-400">
                    <span className="text-green-500">&gt;</span> {program.title}
                    {/* ASCII art effect */}
                    <span className="text-[8px] font-mono text-green-400 leading-none hidden md:inline-block ml-2">
                      {`
  /\\_/\\
 ( o.o )
  > ^ <`}
                    </span>
                  </CardTitle>
                  
                  {/* Date/time info */}
                  <div className="font-mono text-sm text-green-200 bg-black/40 px-3 py-1 rounded-sm inline-block border border-green-600/50">
                    {program.date}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-2">
                <CardDescription className="text-green-200 text-base mb-3">
                  {program.description}
                </CardDescription>
                
                <div className="flex gap-1 flex-wrap mb-3">
                  {program.tags.map((tag, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 bg-black/50 text-green-400 rounded border border-green-600/50">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              
              {/* Larger non-cropped image with enhanced glitch effect */}
              <div className="relative h-56 overflow-hidden rounded-b-xl glitch-container">
                <img 
                  src={program.image} 
                  alt={program.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent mix-blend-multiply"></div>
                
                {/* Enhanced glitch overlay with more visible effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-hack-red mix-blend-screen transition-opacity duration-300 pointer-events-none"></div>
                
                {/* Program icon overlay */}
                <div className="absolute bottom-3 right-3 p-2 bg-black/80 rounded-lg shadow-md border border-gray-700">
                  {program.icon}
                </div>
                
                {/* Terminal/code decorative elements */}
                <div className="absolute bottom-3 left-3 text-xs font-mono text-hack-green opacity-70">
                  ~$ chmod +x {program.title.toLowerCase().replace(/\s+/g, '-')}.sh
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Events section with terminal explorer styling (renamed from "Weekly Workshops") */}
        <div className="mt-20 animate-on-scroll opacity-0" style={{ animationDelay: '400ms' }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 text-green-400 mb-4 font-mono border border-green-600">
              <span className="text-green-500 mr-2">$</span>
              <span className="text-sm font-medium">cat events_list.txt</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono mb-4 text-green-400 glitch-text-subtle">
              Events
            </h2>
            <p className="text-xl text-green-200 max-w-2xl mx-auto font-mono">
              Join our in-person and virtual events led by teen experts
            </p>
          </div>
          
          {/* Terminal-inspired carousel for events */}
          <div className="p-4 bg-terminal-bg rounded-xl border border-terminal-accent/30 shadow-lg">
            {/* Terminal header */}
            <div className="flex items-center justify-between mb-3 px-2 py-1 border-b border-gray-700/30">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-hack-red"></div>
                <div className="w-3 h-3 rounded-full bg-hack-green"></div>
                <div className="w-3 h-3 rounded-full bg-hack-blue"></div>
              </div>
              <div className="font-mono text-xs text-gray-400">
                ~/hackclub/events $ ls -la
              </div>
              <div className="text-xs text-gray-400 font-mono">
                [{eventsLoading ? 'loading...' : eventsError ? 'error' : `${events?.length || 0} items`}]
              </div>
            </div>
            
            {eventsLoading ? (
              <div className="flex justify-center items-center h-64 text-white">
                <Loader2Icon className="h-4 w-4 animate-spin" />
                <span>Loading events...</span>
              </div>
            ) : eventsError ? (
              <div className="text-center p-6 text-hack-red">
                <p>Failed to load events. Please try again later.</p>
              </div>
            ) : (
              <Carousel className="w-full">
                <CarouselContent>
                  {events && events.map((event, index) => (
                    <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-2">
                        <Card className="bg-black/80 border-gray-700 hover:border-hack-blue/40 transition-all duration-300 overflow-hidden">
                          <CardHeader className="p-3 pb-0">
                            <div className="font-mono text-xs text-hack-green mb-1">
                              event_{event.id}.{getFileExtension(event.title)}
                            </div>
                            <CardTitle className="text-white text-lg font-mono flex items-center gap-2">
                              <span className="text-hack-purple">&gt;</span> {event.title.length > 30 ? `${event.title.substring(0, 30)}...` : event.title}
                            </CardTitle>
                            <div className="font-mono text-xs text-gray-400 mt-1">
                              {formatEventDate(event.start_date)} • {event.location}
                            </div>
                          </CardHeader>
                          <CardContent className="p-3">
                            <div className="h-24 overflow-hidden mb-2">
                              <CardDescription className="text-gray-300 text-sm line-clamp-3">
                                {event.description}
                              </CardDescription>
                            </div>
                            <div className="flex gap-1 flex-wrap mt-2">
                              {generateEventTags(event).map((tag, idx) => (
                                <span key={idx} className="text-[10px] font-mono px-1.5 py-0.5 bg-gray-800 text-gray-300 rounded">
                                  {tag}
                                </span>
                              ))}
                              {event.is_hot && (
                                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-hack-red/20 text-hack-red rounded">
                                  #trending
                                </span>
                              )}
                            </div>
                            <div className="mt-3 text-right">
                              <a 
                                href={event.registration_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-hack-blue hover:text-hack-purple transition-colors"
                              >
                                register --id={event.id}
                              </a>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 bg-black/80 text-white border-gray-700 hover:bg-hack-blue hover:text-white" />
                <CarouselNext className="right-2 bg-black/80 text-white border-gray-700 hover:bg-hack-blue hover:text-white" />
              </Carousel>
            )}
            
            {/* Terminal footer */}
            <div className="mt-2 px-3 py-1 font-mono text-xs text-gray-500 flex justify-between">
              <span>{events?.length || 0} events found</span>
              <span className="text-hack-green">
                Use arrows to navigate <span className="terminal-cursor"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
