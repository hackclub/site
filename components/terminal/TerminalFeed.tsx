import React from 'react';
// Removed: import { Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchSlackMessages } from '../../services/hackClubApi';

// Custom Loader2 SVG
const Loader2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const TerminalFeed = () => {
  const { data: feedItems = [], isLoading, error } = useQuery<Array<{ user: string; message: string; timestamp: number | string }>>({
    queryKey: ['slack-messages'],
    queryFn: fetchSlackMessages,
    staleTime: 1000 * 60 * 2, // 2 minutes
  });

  if (isLoading) {
    return (
      <div className="terminal-card mb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-hack-blue rounded-full mr-2"></div>
          <h3 className="text-hack-blue font-mono text-sm">LIVE_FEED.log</h3>
        </div>
        <div className="flex justify-center items-center h-24">
          <Loader2Icon className="h-5 w-5 text-hack-blue animate-spin" />
          <span className="ml-2 text-terminal-text text-sm">Loading feed...</span>
        </div>
      </div>
    );
  }

  if (error || !feedItems) {
    return (
      <div className="terminal-card mb-4">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-hack-red rounded-full mr-2"></div>
          <h3 className="text-hack-red font-mono text-sm">ERROR</h3>
        </div>
        <div className="p-2 border border-hack-red/30 rounded">
          <p className="text-terminal-text text-sm">Failed to load feed. Try refreshing.</p>
        </div>
      </div>
    );
  }

  return (
<div className="terminal-card mb-4 w-full">
      <div className="flex items-center mb-2">
        <div className="w-3 h-3 bg-hack-blue rounded-full mr-2"></div>
        <h3 className="text-hack-blue font-mono text-sm">LIVE_FEED.log</h3>
      </div>
      
      <div className="space-y-2 text-sm">
        {feedItems.slice(0, 15).map((item, index) => (
          <div key={index} className="flex">
            <span className="text-hack-green mr-2">→</span>
            <span className="text-terminal-accent mr-1">{item.user}</span>
            <span className="text-terminal-muted mr-1">
              {item.message.includes('shipped') ? 'shipped' : 
               item.message.includes('looking') ? 'asked' :
               item.message.includes('hit') ? 'announced' : 'posted'}
            </span>
            <span className="text-terminal-text mr-1">{item.message}</span>
            <span className="text-terminal-muted/50 ml-auto">
              {(() => {
                const ts = typeof item.timestamp === 'number' ? item.timestamp : Number(item.timestamp);
                if (!isNaN(ts)) {
                  // If it's in seconds, convert to ms
                  const date = new Date(ts > 1e12 ? ts : ts * 1000);
                  return date.toLocaleString();
                }
                return item.timestamp;
              })()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
