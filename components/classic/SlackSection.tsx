import React, { useEffect, useState, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { fetchSlackMessages, SlackMessage } from '../../services/hackClubApi';

// Custom SVG components
const SlackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="24" height="24" rx="4" fill="#4A154B" />
    <circle cx="7.5" cy="12" r="1.5" fill="#ECB22E" />
    <circle cx="12" cy="7.5" r="1.5" fill="#2EB67D" />
    <circle cx="16.5" cy="12" r="1.5" fill="#E01E5A" />
    <circle cx="12" cy="16.5" r="1.5" fill="#36C5F0" />
  </svg>
);

const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const Loader2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
    <path d="M22 12a10 10 0 0 1-10 10" />
  </svg>
);

// Helper function to format timestamp (assuming Slack timestamp format)
const formatTimestamp = (timestamp: string | number): string => {
  // Slack timestamps are typically Unix timestamps as strings with a decimal part
  const ts = typeof timestamp === 'string' ? parseFloat(timestamp) : timestamp;
  const date = new Date(ts * 1000); // Convert to milliseconds

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 24-hour format
  };

  return date.toLocaleDateString(undefined, options);
};

export const SlackSection = () => {
  const { data: slackMessages, isLoading, error } = useQuery({
    queryKey: ['slack-messages'],
    queryFn: fetchSlackMessages,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const [displayedMessages, setDisplayedMessages] = useState<SlackMessage[]>([]);
  const [newMessagePing, setNewMessagePing] = useState<boolean>(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth"
    });
  };

  useEffect(() => {
    if (!slackMessages) return;
    
    // Calculate the timestamp for 10 days ago
    const tenDaysAgo = Date.now() - (10 * 24 * 60 * 60 * 1000);

    // Filter messages from the last 10 days and sort by timestamp (oldest to newest)
    const filteredAndSortedMessages = slackMessages
      .filter(message => {
        const messageTimestamp = typeof message.timestamp === 'string' ? parseFloat(message.timestamp) * 1000 : (message.timestamp as number) * 1000;
        return messageTimestamp >= tenDaysAgo;
      })
      .sort((a, b) => {
        const timestampA = typeof a.timestamp === 'string' ? parseFloat(a.timestamp) : a.timestamp as number;
        const timestampB = typeof b.timestamp === 'string' ? parseFloat(b.timestamp) : b.timestamp as number;
        return timestampA - timestampB;
      });

    // Display all filtered and sorted messages at once
    setDisplayedMessages(filteredAndSortedMessages);

    // No need for interval and staggering anymore for this display mode
    // const interval = setInterval(() => {
    //   setVisibleMessages(prev => {
    //     if (prev < slackMessages.length) {
    //       setNewMessagePing(true);
    //       setTimeout(() => setNewMessagePing(false), 1000);
    //       setTimeout(scrollToBottom, 100);
    //       return prev + 1;
    //     }
    //     return prev;
    //   });
    // }, 1000);
    
    // return () => clearInterval(interval);
  }, [slackMessages]);

  // Scroll to bottom when displayedMessages are updated
  useEffect(() => {
    if (displayedMessages.length > 0) {
      scrollToBottom();
    }
  }, [displayedMessages]);
  
  return (
    <section id="community" className="py-24 px-6 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-10"></div>
      <div className="absolute inset-0 opacity-5 bg-grid-pattern -z-10"></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16 opacity-0 animate-on-scroll text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#4A154B]/10 text-[#4A154B] mb-4">
            <SlackIcon className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium font-mono">slack.hackclub.com</span>
            <span className="ml-2 text-xs bg-[#4A154B]/20 px-2 py-0.5 rounded-full">20k+ members</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="text-[#4A154B]">Join the conversation</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our Slack is where thousands of teen hackers hang out, share projects, ask questions, and build together every day.
          </p>
          
          {/* Activity stats */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
              <div className="text-2xl font-bold text-[#4A154B]">20k+</div>
              <div className="text-sm text-gray-600">Active members</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
              <div className="text-2xl font-bold text-[#4A154B]">100+</div>
              <div className="text-sm text-gray-600">Daily projects</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
              <div className="text-2xl font-bold text-[#4A154B]">50+</div>
              <div className="text-sm text-gray-600">Countries</div>
            </div>
            <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100">
              <div className="text-2xl font-bold text-[#4A154B]">24/7</div>
              <div className="text-sm text-gray-600">Active community</div>
            </div>
          </div>
        </div>
        
        {/* More compact terminal-style Slack UI */}
        <div className="md:flex gap-8 items-center opacity-0 animate-on-scroll" style={{ animationDelay: '200ms' }}>
          <Card className="border-0 bg-[#1A1D21] text-white rounded-xl shadow-xl overflow-hidden max-w-md mx-auto md:max-w-full md:w-1/2 relative mb-8 md:mb-0 transform hover:-rotate-1 transition-transform duration-300">
            {/* Terminal header */}
            <div className="bg-[#121016] text-white p-3 flex items-center border-b border-gray-700/30">
              <div className="flex items-center gap-1.5 mr-4">
                <div className="w-3 h-3 bg-hack-red rounded-full hover:bg-red-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-hack-green rounded-full hover:bg-green-500 transition-colors cursor-pointer"></div>
                <div className="w-3 h-3 bg-hack-blue rounded-full hover:bg-blue-500 transition-colors cursor-pointer"></div>
              </div>
              <div className="flex items-center flex-1">
                <SlackIcon className="h-4 w-4 text-[#4A154B] mr-2" />
                <h3 className="font-mono text-sm text-gray-300">slack.terminal</h3>
                <div className="ml-2 px-2 py-0.5 bg-[#4A154B]/20 rounded text-xs text-[#4A154B] font-mono">v3.0.0</div>
              </div>
              <div className={`flex items-center ${newMessagePing ? 'animate-pulse text-green-400' : 'text-gray-400'}`}>
                <div className={`w-2 h-2 ${newMessagePing ? 'bg-green-400' : 'bg-gray-500'} rounded-full mr-1`}></div>
                <span className="text-xs font-mono">
                  {newMessagePing ? 'new message' : 'connected'}
                </span>
              </div>
            </div>
            
            <div className="p-4 bg-[#1A1D21]">
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader2Icon className="h-5 w-5 text-white animate-spin mr-2" />
                  <span className="text-gray-300 font-mono text-sm">Connecting to Slack...</span>
                </div>
              ) : error ? (
                <div className="p-3 text-center">
                  <p className="text-hack-red font-mono text-sm">Connection error</p>
                  <p className="text-gray-400 text-xs mt-1">Failed to load messages from Slack</p>
                </div>
              ) : (
                <div ref={messagesContainerRef} className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-hide">
                  {/* Channel info */}
                  <div className="p-2 rounded bg-[#222529]/50 border border-[#2C2D30] mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-hack-green font-mono">#</span>
                      <span className="text-gray-300 font-mono">general</span>
                      <span className="text-xs text-gray-500">20k+ members</span>
                    </div>
                  </div>

                  {displayedMessages.map((message, index) => (
                    <div 
                      key={message.id || index} // Use message id as key if available, fallback to index
                      className={`p-3 rounded-lg bg-[#222529] animate-slide-in hover:bg-[#2A2D32] transition-colors duration-200 ${
                        index === displayedMessages.length - 1 ? 'border-l-2 border-green-400' : ''
                      }`}
                      // Removed inline style as messages are not staggered anymore
                      // style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div className="flex items-start gap-3">
                        <img 
                          src={message.avatar_url} 
                          alt={message.user} 
                          className="w-8 h-8 rounded object-cover mt-1 ring-2 ring-[#4A154B]/20"
                        />
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-center mb-1">
                            <span className="font-medium text-sm text-gray-200 mr-2">@{message.user}</span>
                            <span className="text-xs text-gray-500 font-mono">{formatTimestamp(message.timestamp)}</span>
                          </div>
                          <p className="text-sm text-gray-300 font-mono leading-relaxed">{message.message}</p>
                          <div className="flex mt-2 gap-1.5 flex-wrap">
                            {message.reactions && message.reactions.map((reaction, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center px-2 py-1 bg-[#2C2D30] rounded-md text-xs hover:bg-[#3E3D42] transition-colors cursor-pointer"
                              >
                                {typeof reaction === 'string' ? reaction : (reaction as any)?.emoji || '👍'}
                                <span className="ml-1.5 text-gray-400 text-[10px]">1</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Input area (hidden) */}
                  <div className="sticky bottom-0 mt-4 bg-[#1A1D21] pt-2 hidden">
                    <div className="flex items-center px-3 py-2 rounded-lg bg-[#222529]/50 border border-[#2C2D30] focus-within:border-[#4A154B]/50 transition-colors">
                      <span className="text-gray-400 font-mono text-sm mr-2">$</span>
                      <input 
                        type="text" 
                        placeholder="Type a message..." 
                        className="flex-1 bg-transparent border-none text-gray-300 font-mono text-sm focus:outline-none focus:ring-0 placeholder-gray-500 opacity-50 cursor-not-allowed"
                        disabled
                      />
                      <span className="ml-1 h-4 w-[1px] bg-green-400 inline-block animate-blink hidden"></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
          
          <div className="md:w-1/2">
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">A place for teen hackers</h3>
                <p className="text-gray-600">Connect with thousands of teen coders from around the world. Get feedback on projects, find collaborators, and make friends who share your passion.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-0 animate-on-scroll" style={{ animationDelay: '400ms' }}>
                <Card className="bg-[#1A1D21] text-white p-4 rounded-lg hover:shadow-lg border-0 hover:border-[#4A154B]/30 transition-all duration-300 transform hover:translate-y-[-4px]">
                  <h3 className="text-lg font-bold mb-2 flex items-center text-gray-200">
                    <span className="mr-1" style={{color:"green"}}>#</span> ship
                  </h3>
                  <p className="text-sm text-gray-300 font-mono">Share what you're working on and get feedback from other hackers.</p>
                </Card>
                
                <Card className="bg-[#1A1D21] text-white p-4 rounded-lg hover:shadow-lg border-0 hover:border-hack-red/30 transition-all duration-300 transform hover:translate-y-[-4px]">
                  <h3 className="text-lg font-bold mb-2 flex items-center text-gray-200">
                    <span className="text-hack-red mr-1">#</span> code-help
                  </h3>
                  <p className="text-sm text-gray-300 font-mono">Stuck on a bug? Get help from friendly hackers in minutes.</p>
                </Card>
              </div>
              
              <Button 
                className="bg-[#4A154B] hover:bg-[#4A154B]/90 text-white rounded-xl font-display text-lg hover:translate-y-[-4px] transition-transform duration-200 flex items-center gap-2 w-fit mt-2"
              >
                Get your Slack invite <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
