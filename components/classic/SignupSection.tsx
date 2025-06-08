import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useToast } from '../../components/ui/use-toast';

export const SignupSection = () => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');
  const emailInputRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    addToast({
      id: Date.now().toString(),
      title: "You're in!",
      description: 'Welcome to the network. Check your inbox for secret missions.',
    });
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="max-w-2xl mx-auto relative z-10">
        <Card className="shadow-xl bg-black/90 text-white border-0">
          <CardHeader className="text-center pb-2">
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-hack-purple/10 text-hack-purple font-mono">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="mr-2"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                Join the network
              </span>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-mono font-bold text-hack-green mb-2">secret_network.connect()</CardTitle>
            <p className="text-xl text-gray-300 mt-2 font-mono">
              <span className="text-hack-green">&gt;</span> want updates? enter email to get cool hacks & secret missions
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 mt-6">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 h-12 text-lg bg-black/50 border-hack-blue/30 text-gray-100 pl-8 font-mono"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  ref={emailInputRef}
                  required
                  autoComplete="email"
                />
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-hack-green font-mono">$</span>
              </div>
              <Button type="submit" className="h-12 px-6 bg-hack-green hover:bg-hack-green/90 text-base font-mono flex items-center">
                TRANSMIT
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="ml-2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </Button>
            </form>
            {submitted && (
              <div className="mt-4 text-green-400 text-center font-mono animate-fade-in">
                <span role="img" aria-label="party">🎉</span> You're in! Check your inbox soon.
              </div>
            )}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center text-sm text-gray-400">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Exclusive events
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Early access to tools
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" className="mr-2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                Funding opportunities
              </div>
            </div>
            <div className="mt-6 text-xs text-center text-gray-500 font-mono border-t border-gray-700 pt-4">
              <code>// We'll never share your email. Disconnect anytime with one click.<br />// By joining you agree to the &lt;hackClub.codeOfConduct /&gt;</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};


