import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchEvents, Event } from '../../services/hackClubApi';
import { fetchHistoricalEvents, HistoricalEvent } from '../../services/githubApi';

// Custom SVG components
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const FlagIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
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

const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
);

const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const TerminalEvents = () => {
  const [showHistorical, setShowHistorical] = useState(false);
  
  const { data: events, isLoading, error } = useQuery<Event[]>({
    queryKey: ['events'],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { 
    data: historicalEvents, 
    isLoading: historicalLoading, 
    error: historicalError 
  } = useQuery<HistoricalEvent[]>({
    queryKey: ['historical-events'],
    queryFn: fetchHistoricalEvents,
    staleTime: 1000 * 60 * 60, // 1 hour
    enabled: showHistorical // Only fetch when showing historical events
  });

  const toggleView = () => {
    setShowHistorical(!showHistorical);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading && !showHistorical) {
    return (
      <div className="terminal-card mb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-terminal-accent rounded-full mr-2"></div>
          <h3 className="text-terminal-accent font-mono text-sm">UPCOMING_EVENTS.sh</h3>
        </div>
        <div className="flex justify-center items-center h-32">
          <Loader2Icon className="h-6 w-6 text-terminal-accent animate-spin" />
          <span className="ml-2 text-terminal-text">Loading events...</span>
        </div>
      </div>
    );
  }

  if (error && !showHistorical) {
    return (
      <div className="terminal-card mb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-hack-red rounded-full mr-2"></div>
          <h3 className="text-hack-red font-mono text-sm">ERROR</h3>
        </div>
        <div className="p-2 border border-hack-red/30 rounded">
          <p className="text-terminal-text">Failed to load events. Try refreshing.</p>
          <p className="text-terminal-muted text-xs mt-1">
            <span className="text-hack-green">$</span> <span className="italic">run events.sh --retry</span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="terminal-card mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-terminal-accent rounded-full mr-2"></div>
          <h3 className="text-terminal-accent font-mono text-sm">
            {showHistorical ? "HISTORICAL_TIMELINE.sh" : "UPCOMING_EVENTS.sh"}
          </h3>
        </div>
        <button 
          onClick={toggleView} 
          className="text-xs text-terminal-accent hover:text-terminal-text transition-colors border border-terminal-accent/30 px-2 py-0.5 rounded"
        >
          {showHistorical ? 
            <span className="flex items-center"><CalendarIcon width={12} height={12} className="mr-1" />Show Upcoming</span> : 
            <span className="flex items-center"><ClockIcon width={12} height={12} className="mr-1" />Show Timeline</span>
          }
        </button>
      </div>
      
      {showHistorical ? (
        <div className="space-y-3">
          {historicalLoading ? (
            <div className="flex justify-center items-center h-32">
              <Loader2Icon className="h-6 w-6 text-terminal-accent animate-spin" />
              <span className="ml-2 text-terminal-text">Loading historical events...</span>
            </div>
          ) : historicalError ? (
            <div className="p-2 border border-hack-red/30 rounded">
              <p className="text-terminal-text">Failed to load historical events.</p>
              <p className="text-terminal-muted text-xs mt-1">
                <span className="text-hack-green">$</span> <span className="italic">run historical-events.sh --retry</span>
              </p>
            </div>
          ) : (
            <>
              {/* Timeline visualization */}
              <div className="border-l border-terminal-accent/50 ml-3 pl-4 space-y-6">
                {historicalEvents && historicalEvents.map((event: HistoricalEvent, index) => {
                  // Group events by year visually
                  const showYearMarker = index === 0 || 
                    new Date(event.date).getFullYear() !== 
                    new Date(historicalEvents[index - 1].date).getFullYear();
                  
                  return (
                    <div key={event.id} className="relative">
                      {/* Year marker */}
                      {showYearMarker && (
                        <div className="absolute -left-[28px] -top-1 bg-terminal-bg border border-terminal-accent/30 rounded px-1.5 py-0.5 text-terminal-accent text-xs font-mono">
                          {new Date(event.date).getFullYear()}
                        </div>
                      )}
                      
                      {/* Timeline dot */}
                      <div className="absolute -left-[20px] top-1.5 w-3 h-3 rounded-full bg-terminal-accent"></div>
                      
                      <div className="border border-terminal-accent/30 rounded p-2 bg-terminal-accent/5 hover:bg-terminal-accent/10 transition-colors">
                        <div className="flex items-start gap-3">
                          {/* Event image thumbnail */}
                          <div className="flex-shrink-0 w-16 h-16 bg-terminal-accent/20 rounded overflow-hidden">
                            <img 
                              src={event.image_url} 
                              alt={event.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://assets.hackclub.com/api/v0.1/files/bc14129/download/hackclub-rect.jpg';
                              }}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-terminal-accent font-bold">{event.title}</h4>
                                <div className="text-terminal-muted text-xs flex items-center mt-0.5">
                                  <ClockIcon width={10} height={10} className="inline mr-1" />
                                  {formatDate(event.date)}
                                </div>
                              </div>
                              
                              <div className="text-terminal-muted text-xs flex items-center">
                                <FlagIcon width={10} height={10} className="inline mr-1" />
                                {event.location}
                              </div>
                            </div>
                            
                            <p className="text-terminal-text text-xs mt-1 line-clamp-2">{event.description}</p>
                            
                            {event.attendees && (
                              <span className="inline-block mt-1 text-xs text-hack-green bg-hack-green/10 px-1.5 py-0.5 rounded-sm">
                                {event.attendees} attendees
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mt-1 text-right">
                          <span className="text-xs text-hack-blue cursor-pointer hover:text-hack-purple">
                            view-gallery --id={event.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {events && events.map(event => (
            <div 
              key={event.id} 
              className={`border border-terminal-accent/30 rounded p-2 ${event.is_hot ? 'bg-terminal-accent/10' : 'bg-transparent'} hover:bg-terminal-accent/20 transition-colors`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-1">
                    {event.is_hot && (
                      <StarIcon width={14} height={14} className="text-hack-red fill-hack-red" />
                    )}
                    <h4 className="text-terminal-accent font-bold">{event.title}</h4>
                  </div>
                  <p className="text-terminal-text text-sm mt-1">{event.description}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-terminal-muted text-xs flex items-center">
                    <CalendarIcon width={12} height={12} className="inline mr-1" />
                    {new Date(event.start_date).toLocaleDateString()}
                  </div>
                  <div className="text-terminal-muted text-xs mt-1 flex items-center">
                    <FlagIcon width={12} height={12} className="inline mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div className="text-xs">
                  <span className="text-hack-green bg-hack-green/10 px-2 py-0.5 rounded-sm">
                    ID: {event.id}
                  </span>
                </div>
                <button className="text-xs text-hack-blue hover:text-hack-purple transition-colors">
                  join --id={event.id}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-3 text-terminal-muted text-xs border-t border-terminal-accent/20 pt-2">
        <span className="text-hack-green">$</span> <span className="italic">
          {showHistorical ? 
            "Run 'view-gallery --id=<ID>' to see event photos" : 
            "Run 'join-event --id=<ID>' to register"
          }
        </span>
      </div>
    </div>
  );
};
