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
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono">
      <TerminalHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <TerminalAsciiArt className="mb-4" />
            <TerminalFeed />
            <TerminalInput />
          </div>
          <div className="space-y-4">
            <TerminalBankData />
            <TerminalEvents />
          </div>
        </div>
      </main>
    </div>
  );
};
