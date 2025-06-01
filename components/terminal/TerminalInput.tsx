import React, { useState, useRef, useEffect } from 'react';
// Removed: import { HelpCircle, Rocket, FileCode, Users, Image, Trash2, Link, Star, Calendar, Database } from 'lucide-react';
import { fetchEvents, fetchScrapbookStats, fetchTeamMembers } from '../../services/hackClubApi';
import { fetchHCBTransactions, fetchHCBOrganization, HCB_ORGANIZATIONS } from '../../services/hcbApi';

// Custom SVG icons
const HelpCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 1 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></svg>
);
const RocketIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><path d="M4.24 20.24a6 6 0 0 1 8.49-8.49l2.83-2.83a2 2 0 1 1 2.83 2.83l-2.83 2.83a6 6 0 0 1-8.49 8.49z" /><path d="M14 2l6 6" /><path d="M9 9l6 6" /></svg>
);
const FileCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><path d="M16 18h2a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2" /><rect x="8" y="6" width="8" height="12" rx="2" /><path d="M9 9l2 2-2 2" /><path d="M15 9l-2 2 2 2" /></svg>
);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const ImageIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
);
const Trash2Icon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" /></svg>
);
const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><path d="M10 13a5 5 0 0 1 7 7l-1.5 1.5a5 5 0 0 1-7-7" /><path d="M14 11a5 5 0 0 0-7-7L5.5 5.5a5 5 0 0 0 7 7" /></svg>
);
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
const DatabaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={props.width ?? 14} height={props.height ?? 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={props.className} {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14a9 3 0 0 0 18 0V5" /><path d="M3 12a9 3 0 0 0 18 0" /></svg>
);

// Command content definitions
const COMMANDS = {
  help: {
    description: 'Show this help message',
    icon: <HelpCircleIcon className="text-hack-blue inline mr-1" />,
  },
  events: {
    description: 'List upcoming Hack Club events',
    icon: <CalendarIcon className="text-hack-purple inline mr-1" />,
  },
  stats: {
    description: 'Show Scrapbook user stats',
    icon: <StarIcon className="text-hack-green inline mr-1" />,
  },
  hcb: {
    description: 'View Hack Club hcb transparency data',
    icon: <DatabaseIcon className="text-terminal-accent inline mr-1" />,
  },
  programs: {
    description: 'List current/upcoming Hack Club programs',
    icon: <RocketIcon className="text-hack-purple inline mr-1" />,
  },
  projects: {
    description: 'View featured teen-built projects',
    icon: <StarIcon className="text-hack-green inline mr-1" />,
  },
  join: {
    description: 'Show Slack invite or onboarding steps',
    icon: <LinkIcon className="text-terminal-accent inline mr-1" />,
  },
  ascii: {
    description: 'Display ASCII art',
    icon: <ImageIcon className="text-hack-red inline mr-1" />,
  },
  shoutouts: {
    description: 'Highlight active members or clubs',
    icon: <UsersIcon className="text-hack-blue inline mr-1" />,
  },
  'view-projects': {
    description: 'List community projects',
    icon: <FileCodeIcon className="text-terminal-accent inline mr-1" />,
  },
  'join-event': {
    description: 'Register for an event (join-event --id=<ID>)',
    icon: <LinkIcon className="text-hack-green inline mr-1" />,
  },
  clear: {
    description: 'Clear terminal',
    icon: <Trash2Icon className="text-terminal-muted inline mr-1" />,
  },
  team: {
    description: 'View Hack Club team members and photos',
    icon: <UsersIcon className="text-hack-blue inline mr-1" />,
  },
};

// Program data
const PROGRAMS = [
  {
    name: '🚀 Hackathon Starter Pack',
    date: 'Launching May 20',
    url: 'hackclub.com/launch',
    description: 'Everything you need to run an amazing hackathon at your school',
  },
  {
    name: '🎨 Build Your Own Game Jam',
    date: 'Starts June 5',
    url: 'hackclub.com/gamejam',
    description: 'Create and share your own games with the community',
  },
  {
    name: '💻 Summer of Code',
    date: 'June 15 - August 15',
    url: 'hackclub.com/summer',
    description: '10 weeks of building awesome projects with other teenagers',
  },
];

// Projects data
const PROJECTS = [
  {
    name: 'Spectra OS',
    creator: 'Sarah Chen',
    description: 'A minimal Linux distro for young developers',
    url: 'github.com/sarahchen/spectra',
  },
  {
    name: 'Pocket Language',
    creator: 'Miguel Rodriguez',
    description: 'Learn any language with AI flashcards',
    url: 'pocketlang.tech',
  },
  {
    name: 'CodeTogether',
    creator: 'Jordan Taylor',
    description: 'Real-time collaborative coding environment',
    url: 'codetogether.dev',
  },
];

// Shoutouts data
const SHOUTOUTS = [
  {
    name: 'Alex Kim',
    achievement: 'Organized a 200+ person hackathon at their high school',
    club: 'Lincoln High Hack Club',
  },
  {
    name: 'Riley Johnson',
    achievement: 'Built & launched an app that helps 1000+ students track homework',
    club: 'Westview Coding Club',
  },
  {
    name: 'Oakdale Hack Club',
    achievement: 'Raised $5,000 to buy laptops for underprivileged students',
    location: 'Portland, OR',
  },
];

export const TerminalInput = () => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<React.ReactElement[]>([
    <div key="welcome" className="mb-4 text-terminal-accent">
      <p>Welcome to Hack Club Terminal v1.0.0</p>
      <p className="text-terminal-muted text-sm mt-1">Type 'help' to see available commands</p>
    </div>
  ]);
  // Add state to track if ASCII art should replay
  const [asciiReplay, setAsciiReplay] = useState(false);
  // Add loading states for async commands
  const [isLoading, setIsLoading] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Focus the input when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    // Scroll to bottom when output changes
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  // Let parent components know when ASCII replay is requested
  useEffect(() => {
    if (asciiReplay) {
      // Reset for next time
      setTimeout(() => {
        setAsciiReplay(false);
      }, 100);
    }
  }, [asciiReplay]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const newCommand = input.trim();
    setCommandHistory(prev => [...prev, newCommand]);
    
    // Add the command to output
    const commandEl = (
      <div key={`cmd-${output.length}`} className="my-2">
        <div className="flex items-center">
          <span className="text-hack-green mr-2">$</span>
          <span className="text-terminal-text">{newCommand}</span>
        </div>
      </div>
    );
    
    setOutput(prev => [...prev, commandEl]);
    setInput('');
    
    // Process command
    try {
      setIsLoading(true);
      const result = await processCommand(newCommand);
      if (result) {
        setOutput(prev => [...prev, result]);
      }
    } catch (error) {
      console.error('Command processing error:', error);
      setOutput(prev => [
        ...prev, 
        <div key={`error-${output.length}`} className="text-hack-red mt-2 mb-2">
          An error occurred while processing the command.
        </div>
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Command processing logic
  const processCommand = async (cmd: string): Promise<React.ReactElement | null> => {
    const command = cmd.split(' ')[0].toLowerCase();
    const args = cmd.split(' ').slice(1);
    
    // Check for ascii replay command
    if (command === 'ascii') {
      // Check if it's the replay command
      if (args[0] === '--replay') {
        // Set flag for parent component
        setAsciiReplay(true);
        return (
          <div className="mt-2 text-hack-green">
            Replaying ASCII art animation...
          </div>
        );
      }
      return renderAsciiArt();
    }
    
    // Handle new API-based commands
    if (command === 'events') {
      try {
        const events = await fetchEvents();
        return renderBoxedOutput(
          <>
            <div className="text-hack-purple mb-2">Upcoming Hack Club Events</div>
            {events.map((event, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="text-terminal-text font-bold">{event.title}</div>
                <div className="text-terminal-accent">📅 {new Date(event.start_date).toLocaleString()}</div>
                <div className="text-terminal-muted text-sm">{event.description}</div>
                <div className="text-hack-green text-sm">
                  {event.is_hot && '🔥 '} 
                  Location: {event.location} | 
                  Register: {event.registration_url}
                </div>
              </div>
            ))}
          </>
        );
      } catch (error) {
        console.error('Error fetching events:', error);
        return (
          <div className="mt-2 text-hack-red">
            Failed to fetch events. Please try again later.
          </div>
        );
      }
    }
    
    if (command === 'stats') {
      try {
        const users = await fetchScrapbookStats();
        return renderBoxedOutput(
          <>
            <div className="text-hack-green mb-2">Scrapbook User Stats</div>
            <table className="w-full">
              <thead>
                <tr className="text-terminal-muted border-b border-terminal-accent/20">
                  <th className="text-left py-1">User</th>
                  <th className="text-right">Streak</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx} className="border-b border-terminal-accent/10 last:border-0">
                    <td className="py-1">
                      <span className="text-terminal-text">@{user.username}</span>
                      {user.displayName !== user.username && 
                        <span className="text-terminal-muted text-xs ml-1">({user.displayName})</span>
                      }
                    </td>
                    <td className="text-right">
                      <span className="text-hack-blue">{user.streakCount}</span>
                      <span className="text-terminal-muted"> days</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="text-terminal-muted text-xs mt-2 text-center">
              Data from Scrapbook API - Real-time user activity
            </div>
          </>
        );
      } catch (error) {
        console.error('Error fetching Scrapbook stats:', error);
        return (
          <div className="mt-2 text-hack-red">
            Failed to fetch Scrapbook stats. Please try again later.
          </div>
        );
      }
    }
    
    if (command === 'hcb') {
      // Parse command arguments
      const orgArg = args.find(arg => arg.startsWith('--org='));
      const orgSlug = orgArg ? orgArg.split('=')[1] : 'hq';

      try {
        // Show help if --help flag is used
        if (args.includes('--help')) {
          return renderBoxedOutput(
            <>
              <div className="text-hack-blue mb-2">hcb Command Help</div>
              <div className="space-y-2">
                <div>
                  <span className="text-terminal-accent">Usage:</span>
                  <div className="ml-4">
                    <div>hcb [--org=&lt;slug&gt;]</div>
                    <div>hcb --help</div>
                  </div>
                </div>
                <div>
                  <span className="text-terminal-accent">Examples:</span>
                  <div className="ml-4">
                    <div>hcb --org=hq</div>
                    <div>hcb --org=onboard</div>
                    <div>hcb --org=zephyr</div>
                  </div>
                </div>
                <div>
                  <span className="text-terminal-accent">Popular Organizations:</span>
                  <div className="ml-4 grid grid-cols-2 gap-x-4 gap-y-1">
                    {HCB_ORGANIZATIONS.slice(0, 8).map(org => (
                      <div key={org.slug} className="text-terminal-text">
                        {org.name} <span className="text-terminal-muted">({org.slug})</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-terminal-muted text-sm mt-2">
                  Enter any organization slug to view its financial data. If the organization exists in Hack Club hcb, its data will be displayed.
                </div>
              </div>
            </>
          );
        }

        const [transactions, organization] = await Promise.all([
          fetchHCBTransactions(orgSlug),
          fetchHCBOrganization(orgSlug)
        ]);
        
        return renderBoxedOutput(
          <>
            <div className="text-hack-blue mb-2">{organization.name} hcb Data</div>
            <div className="mb-3">
              <div className="text-terminal-text">Current Balance:</div>
              <div className="text-hack-green text-xl font-bold">
                ${(organization.balances.balance_cents / 100).toLocaleString()}
              </div>
              <div className="text-terminal-muted text-sm mt-1">
                Total Raised: ${(organization.balances.total_raised / 100).toLocaleString()}
              </div>
            </div>
            <div>
              <div className="text-terminal-text mb-1">Recent Transactions:</div>
              {transactions.slice(0, 5).map((tx) => (
                <div key={tx.id} className="flex justify-between border-b border-terminal-accent/10 py-1 last:border-0">
                  <div>
                    <span className="text-terminal-text">{tx.memo}</span>
                    <span className="text-terminal-muted text-xs ml-2">
                      {new Date(tx.date).toLocaleDateString()}
                      {tx.pending && ' (Pending)'}
                    </span>
                  </div>
                  <div className={tx.amount_cents > 0 ? 'text-hack-green' : 'text-hack-red'}>
                    {tx.amount_cents > 0 ? '+' : '-'}${Math.abs(tx.amount_cents / 100).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-terminal-muted text-xs mt-2 text-center">
              Transparency data from Hack Club hcb API
              <div className="mt-1">
                Use <span className="text-terminal-accent">hcb --help</span> to see available options
              </div>
            </div>
          </>
        );
      } catch (error) {
        console.error('Error fetching hcb data:', error);
        return (
          <div className="mt-2 text-hack-red">
            Failed to fetch hcb data for organization "{orgSlug}". 
            <div className="text-terminal-muted text-sm mt-1">
              Use <span className="text-terminal-accent">hcb --help</span> to see available options
            </div>
          </div>
        );
      }
    }
    
    if (command === 'team') {
      try {
        const teamMembers = await fetchTeamMembers();
        
        return renderBoxedOutput(
          <>
            <div className="text-hack-blue mb-2">Hack Club Team</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-2 border-2 border-hack-red">
                    <img 
                      src={member.avatar_url} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        // Try fallback avatar first, then UI Avatars
                        if (member.fallback_avatar) {
                          target.src = member.fallback_avatar;
                        } else {
                          target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random&color=fff`;
                        }
                      }}
                    />
                  </div>
                  <div className="text-terminal-text font-bold">{member.name}</div>
                  <div className="text-hack-red text-sm">{member.role}</div>
                  <div className="text-terminal-muted text-xs mt-1">{member.team}</div>
                </div>
              ))}
            </div>
            <div className="text-terminal-muted text-xs mt-4 text-center">
              Data from Hack Club Team
              <div className="mt-1">
                Use <span className="text-terminal-accent">team --help</span> to see available options
              </div>
            </div>
          </>
        );
      } catch (error) {
        console.error('Error fetching team data:', error);
        return (
          <div className="mt-2 text-hack-red">
            Failed to fetch team data. Please try again later.
          </div>
        );
      }
    }
    
    // Handle existing commands
    switch (command) {
      case 'help':
        return renderBoxedOutput(
          <>
            <div className="text-hack-green mb-2">Available Commands:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
              {Object.entries(COMMANDS).map(([cmd, info]) => (
                <div key={cmd}>
                  {info.icon}
                  <span className="text-terminal-accent mr-2">{cmd}</span>
                  <span className="text-terminal-muted text-xs">{info.description}</span>
                </div>
              ))}
            </div>
          </>
        );
        
      case 'programs':
        return renderBoxedOutput(
          <>
            <div className="text-hack-purple mb-2">Hack Club Programs</div>
            {PROGRAMS.map((program, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="text-terminal-text font-bold">{program.name}</div>
                <div className="text-terminal-accent">📅 {program.date}</div>
                <div className="text-terminal-muted text-sm">{program.description}</div>
                <div className="text-hack-green text-sm">
                  Apply now at: {program.url}
                </div>
              </div>
            ))}
          </>
        );
        
      case 'projects':
        return renderBoxedOutput(
          <>
            <div className="text-hack-green mb-2">Featured Projects</div>
            {PROJECTS.map((project, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="text-terminal-text font-bold">{project.name}</div>
                <div className="text-terminal-accent">👤 {project.creator}</div>
                <div className="text-terminal-muted text-sm">{project.description}</div>
                <div className="text-hack-blue text-sm">{project.url}</div>
              </div>
            ))}
          </>
        );
        
      case 'join':
        return renderBoxedOutput(
          <>
            <div className="text-hack-blue mb-2">Join Hack Club</div>
            <div className="mb-2">
              <div className="text-terminal-text">1. Join our Slack community:</div>
              <div className="text-hack-green ml-2">
                → slack.hackclub.com
              </div>
            </div>
            <div className="mb-2">
              <div className="text-terminal-text">2. Start a club at your school:</div>
              <div className="text-hack-green ml-2">
                → hackclub.com/start
              </div>
            </div>
            <div className="mb-2">
              <div className="text-terminal-text">3. Attend workshops and events:</div>
              <div className="text-hack-green ml-2">
                → hackclub.com/workshops
              </div>
            </div>
          </>
        );
      
      case 'shoutouts':
        return renderBoxedOutput(
          <>
            <div className="text-hack-red mb-2">Community Shoutouts</div>
            {SHOUTOUTS.map((shoutout, idx) => (
              <div key={idx} className="mb-3 last:mb-0">
                <div className="text-terminal-accent font-bold">★ {shoutout.name}</div>
                <div className="text-terminal-text text-sm">{shoutout.achievement}</div>
                <div className="text-terminal-muted text-xs">
                  {shoutout.club || shoutout.location}
                </div>
              </div>
            ))}
          </>
        );
      
      case 'view-projects':
        return renderBoxedOutput(
          <>
            <div className="text-terminal-text mb-2">Recent Projects:</div>
            <div className="text-terminal-muted ml-4">→ AI Study Assistant by codingwizard</div>
            <div className="text-terminal-muted ml-4">→ Hardware Weather Station by circuitbreaker</div>
            <div className="text-terminal-muted ml-4">→ Blockchain Explorer by cryptokid</div>
          </>
        );
      
      case 'join-event':
        const eventId = args.join(' ').match(/--id=(\d+)/)?.[1];
        return (
          <div className="mt-2 text-hack-green">
            {eventId ? `Success! You've registered for event #${eventId}` : 'Error: Invalid event ID. Use format: join-event --id=<ID>'}
          </div>
        );
      
      case 'clear':
        // Clear output but keep welcome message
        setTimeout(() => {
          setOutput([
            <div key="welcome" className="mb-4 text-terminal-accent">
              <p>Terminal cleared.</p>
              <p className="text-terminal-muted text-sm mt-1">Type 'help' to see available commands</p>
            </div>
          ]);
        }, 0);
        return null;
      
      default:
        return (
          <div className="mt-2 text-hack-red">
            Command not found: {command}
            <div className="text-terminal-muted text-sm">Type 'help' to see available commands</div>
          </div>
        );
    }
  };
  
  // Helper to render nice boxed output
  const renderBoxedOutput = (content: React.ReactElement): React.ReactElement => {
    return (
      <div className="mt-3 mb-1 border border-terminal-accent/30 rounded p-3 bg-terminal-bg/50">
        {content}
      </div>
    );
  };
  
  // Helper to render ASCII art
  const renderAsciiArt = (): React.ReactElement => {
    // Random selection between different ASCII art options
    const artOptions = [
      // Hack Club logo
      (
        <pre className="text-hack-red text-xs mt-3 mb-1 overflow-x-auto">
{`     __  __            __       ________      __    
    / / / /___ ______/ /__    / ____/ /_  __/ /_   
   / /_/ / __ \`/ ___/ //_/   / /   / / / / / __ \\  
  / __  / /_/ / /__/ ,<     / /___/ / /_/ / /_/ /  
 /_/ /_/\\__,_/\\___/_/|_|    \\____/_/\\__,_/_.___/   
                                                   
     << CODE • SHARE • SHIP • REPEAT >>
`}
        </pre>
      ),
      // Hack Club flag
      (
        <pre className="text-hack-purple text-xs mt-3 mb-1 overflow-x-auto">
{`
   _____________________________
  |                             |
  |     ██╗  ██╗ ██████╗       |
  |     ██║  ██║██╔════╝       |
  |     ███████║██║            |
  |     ██╔══██║██║            |
  |     ██║  ██║╚██████╗       |
  |     ╚═╝  ╚═╝ ╚═════╝       |
  |_____________________________| 
`}
        </pre>
      ),
      // Dino
      (
        <pre className="text-hack-green text-xs mt-3 mb-1 overflow-x-auto">
{`
              ___
             / ..\\_
            /     \\
            \\_____/
      _     /     \\     _
     /|\\_____/---\\_____/|\\
     /|\\|   ||     ||   |/|\\
      /\\|___||_____||___|/\\
     /                     \\
    /       HACK CLUB       \\
   /                         \\ 
  /                           \\
`}
        </pre>
      )
    ];
    
    const randomIndex = Math.floor(Math.random() * artOptions.length);
    return artOptions[randomIndex];
  };
  
  return (
    <div className="terminal-output" ref={outputRef}>
      {output}
      
      {isLoading && (
        <div className="my-2 text-terminal-muted animate-pulse flex items-center">
          <div className="w-2 h-2 bg-terminal-accent rounded-full mr-2"></div>
          Processing command...
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="flex items-center mt-2">
        <span className="text-hack-green mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input flex-1 bg-transparent"
          placeholder="Enter a command (try 'help')"
          autoFocus
        />
      </form>
    </div>
  );
};
