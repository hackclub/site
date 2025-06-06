'use client'

import React from 'react';
import { TerminalHeader } from './TerminalHeader';
import { TerminalInput } from './TerminalInput';
import { TerminalFeed } from './TerminalFeed';
import { TerminalBankData } from './TerminalBankData';
import { TerminalEvents } from './TerminalEvents';
import { TerminalAsciiArt } from './TerminalAsciiArt';

export const TerminalMode = () => {
  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono flex flex-col">
      {/* Header */}
      <TerminalHeader />
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 md:px-6 py-6 flex flex-col gap-6">
        {/* ASCII Art Section */}
        <section className="terminal-card mb-2">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-hack-red rounded-full mr-2 animate-pulse-light"></div>
            <h3 className="text-hack-red font-mono text-sm">ASCII_ART.txt</h3>
          </div>
          <TerminalAsciiArt />
          <div className="text-right text-terminal-muted text-xs mt-2 italic animate-fade-in">
            Type <span className="text-terminal-accent">ascii --replay</span> to see again
          </div>
        </section>
        {/* Main Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Console */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="terminal-card h-[400px] flex flex-col">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-hack-green rounded-full mr-2"></div>
                <h3 className="text-hack-green font-mono text-sm">CONSOLE</h3>
              </div>
              <form className="flex items-center mt-2">
                <span className="text-hack-green mr-2">$</span>
                <TerminalInput />
              </form>
            </div>
          </div>
          {/* Side widgets */}
          <div className="flex flex-col gap-4">
            <div className="terminal-card">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-terminal-accent rounded-full mr-2"></div>
                <h3 className="text-terminal-accent font-mono text-sm">UPCOMING_EVENTS.sh</h3>
              </div>
              <TerminalEvents />
            </div>
            <div className="terminal-card">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-hack-blue rounded-full mr-2"></div>
                <h3 className="text-hack-blue font-mono text-sm">HCB_TRANSACTIONS.log</h3>
              </div>
              <TerminalBankData />
            </div>
          </div>
        </section>
        {/* Live Feed Section */}
        <section className="terminal-card mt-2">
          <div className="flex items-center mb-2">
            <div className="w-3 h-3 bg-hack-blue rounded-full mr-2"></div>
            <h3 className="text-hack-blue font-mono text-sm">LIVE_FEED.log</h3>
          </div>
          <div className="space-y-2 text-sm">
            <TerminalFeed />
          </div>
        </section>
      </main>
    </div>
  );
};
