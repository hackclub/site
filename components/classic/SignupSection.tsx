import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/use-toast';
import { AspectRatio } from '../../components/ui/aspect-ratio';

// Add custom SVG components
const TerminalIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const StarIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

export const SignupSection = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [typingEffect, setTypingEffect] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "🎉 You're in the network!",
        description: "First secret mission inbound. Hack the planet!",
      });
      setEmail('');
      setTypingEffect(true); // Reset typing effect
    }
  };
  
  // Focus effect on card hover
  const handleCardHover = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50 -z-10"></div>
      
      {/* Background code patterns */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full flex flex-wrap opacity-20">
            {[...Array(10)].map((_, i) => (
              <div 
                key={i}
                className="text-[8px] font-mono text-hack-green whitespace-pre leading-tight"
                style={{
                  position: 'absolute',
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`,
                }}
              >
                {`
function hackTheWorld() {
  const teens = getCreativeTeens();
  const projects = teens.map(teen => teen.buildCoolStuff());
  return projects.filter(p => p.isAwesome);
}

// Join us to get started
hackTheWorld();
                `}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-hack-purple/10 text-hack-purple mb-4">
            <TerminalIcon />
            <span className="text-sm font-medium font-mono">Join the network</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            Connect with the hacker community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get updates on events, opportunities, and secret missions for teen hackers.
          </p>
        </div>
      
        <Card 
          className="border-0 shadow-xl bg-gradient-to-br from-black/90 to-gray-800 opacity-0 animate-fade-in text-white overflow-visible" 
          style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          onMouseEnter={handleCardHover}
        >
          <CardHeader className="text-center pb-2 relative">
            {/* Glow effect behind card */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-hack-purple/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-hack-red/20 rounded-full blur-3xl"></div>
            
            <div className="flex justify-between items-center mb-4 relative">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-hack-red"></div>
                <div className="h-3 w-3 rounded-full bg-hack-green"></div>
                <div className="h-3 w-3 rounded-full bg-hack-blue"></div>
              </div>
              <div className="text-xs font-mono opacity-60">mission_control.sh</div>
            </div>
            
            <CardTitle className="text-3xl md:text-4xl font-mono font-bold text-hack-green flex items-center justify-center gap-2">
              <TerminalIcon />
              <span className="typing-effect" style={{ animationDelay: '500ms' }}>
                secret_network.connect()
              </span>
            </CardTitle>
            
            <CardDescription className="text-xl text-gray-300 mt-4 font-mono">
              <span className="text-hack-green">&gt;</span> want updates? enter email to get cool hacks & secret missions
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pb-8">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1 group">
                <div className="absolute inset-0 bg-hack-purple opacity-20 blur-md group-focus-within:opacity-40 transition-opacity rounded-md"></div>
                <div className="flex items-center relative">
                  <div className="text-gray-400 font-mono absolute left-4">$</div>
                  <Input
                    type="email"
                    placeholder="your.email@hacktheplanet.com"
                    className="flex-1 h-12 text-lg bg-black/50 border-hack-blue/30 text-gray-100 pl-8 font-mono"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setTypingEffect(false);
                    }}
                    ref={emailInputRef}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="h-12 px-6 bg-hack-green hover:bg-hack-green/90 text-base font-mono hover:scale-105 transition-transform duration-200 group relative overflow-hidden flex items-center"
              >
                <span>TRANSMIT</span>
                <ArrowRightIcon />
                <div className="absolute -inset-x-2 bottom-0 h-0.5 bg-hack-green-bright scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Button>
            </form>
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center text-sm text-gray-400">
                <StarIcon />
                <span className="font-mono">Exclusive events</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-400">
                <StarIcon />
                <span className="font-mono">Early access to tools</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-400">
                <StarIcon />
                <span className="font-mono">Funding opportunities</span>
              </div>
            </div>
            
            <div className="mt-6 text-xs text-center text-gray-500 font-mono border-t border-gray-700 pt-4">
              <code>
                // We'll never share your email. Disconnect anytime with one click.
                <br />
                // By joining you agree to the &lt;hackClub.codeOfConduct /&gt;
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};


