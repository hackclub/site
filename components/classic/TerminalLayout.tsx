import React from 'react';
import { TerminalHeader } from './TerminalHeader';
import { ConsoleSection } from './ConsoleSection';
import { UpcomingEventsSection } from './UpcomingEventsSection';
import { TransactionLogSection } from './TransactionLogSection';
import { Button } from '../ui/button';

export const TerminalLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 border-4 border-green-600">
      {/* Toggle Mode Button */}
      <div className="absolute top-4 right-4 z-50">
        <Button
          variant="outline"
          className="bg-gray-800 text-green-400 border-2 border-green-600 hover:bg-gray-700 font-mono rounded-full w-10 h-10 p-0 shadow-lg shadow-green-600/20"
        >
          <span className="text-lg">⌘</span>
        </Button>
      </div>

      {/* Terminal Header */}
      <TerminalHeader />

      {/* ASCII Art Section */}
      <div className="w-full bg-black border-y-4 border-green-600">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-red-500 font-bold mb-2 border-b-2 border-red-600 pb-2">ASCII_ART.txt</div>
          <pre className="font-mono text-red-500 text-sm whitespace-pre overflow-x-auto mb-2 border-2 border-red-600 p-4 bg-gray-900">
{`
    _    _       _    __     __    _____ _                 _ 
   | |  | |     | |   \\ \\   / /   / ____| |               | |
   | |__| | __ _| | __ \\ \\_/ /   | |    | | ___  _   _  __| |
   |  __  |/ _\` | |/ /  \\   /    | |____| |/ _ \\| | | |/ _\` |
   | |  | | (_| |   <    | |     |  _____| | (_) | |_| | (_| |
   |_|  |_|\\__,_|_|\\_\\   |_|     | |    |_|\\___/ \\__,_|\\__,_|
                                  |_|                         
`}
          </pre>
          <div className="text-red-500 font-mono text-center border-2 border-red-600 p-2 bg-gray-900">
            &lt;&lt; CODE • SHARE • SHIP • REPEAT &gt;&gt;
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <ConsoleSection />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <UpcomingEventsSection />
            <TransactionLogSection />
          </div>
        </div>
      </main>
    </div>
  );
}; 