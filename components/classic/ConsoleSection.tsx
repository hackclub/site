import React from 'react';
import { Star, Clipboard, Users, Calendar, Banknote, Code, Eye, Trash2 } from 'lucide-react';

const commands = [
  { name: 'help', icon: Star, description: 'Show available commands' },
  { name: 'stats', icon: Clipboard, description: 'View Hack Club statistics' },
  { name: 'programs', icon: Code, description: 'List active programs' },
  { name: 'join', icon: Users, description: 'Join Hack Club community' },
  { name: 'shoutouts', icon: Star, description: 'View community highlights' },
  { name: 'join-event', icon: Calendar, description: 'Register for events' },
  { name: 'team', icon: Users, description: 'Meet the team' },
  { name: 'events', icon: Calendar, description: 'View upcoming events' },
  { name: 'hcb', icon: Banknote, description: 'Access Hack Club Bank' },
  { name: 'projects', icon: Code, description: 'Browse projects' },
  { name: 'ascii', icon: Code, description: 'View ASCII art' },
  { name: 'view-projects', icon: Eye, description: 'Explore projects' },
  { name: 'clear', icon: Trash2, description: 'Clear console' }
];

export const ConsoleSection = () => {
  return (
    <div className="bg-gray-900 border-4 border-green-600 rounded-lg p-6 mb-6 shadow-lg shadow-green-600/20">
      {/* Header */}
      <div className="flex items-center mb-4 border-b-2 border-green-600 pb-4">
        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
        <h2 className="text-green-400 font-mono text-lg">CONSOLE</h2>
      </div>

      {/* Welcome Message */}
      <div className="mb-6 border-2 border-green-600 p-4 rounded bg-gray-800">
        <p className="text-green-400 font-mono mb-2">Welcome to Hack Club Terminal v1.0.0</p>
        <p className="text-green-400 font-mono">Type 'help' to see available commands</p>
      </div>

      {/* Help Command Output */}
      <div className="mb-6 border-2 border-green-600 p-4 rounded bg-gray-800">
        <div className="flex items-center mb-4 border-b border-green-600 pb-2">
          <span className="text-green-500 font-mono mr-2">$</span>
          <span className="text-green-400 font-mono">help</span>
        </div>

        {/* Commands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {commands.map((cmd, index) => (
            <div key={index} className="flex items-center space-x-2 text-green-400 font-mono border border-green-600 p-2 rounded">
              <cmd.icon className="w-4 h-4" />
              <span className="text-green-500">{cmd.name}</span>
              <span className="text-gray-400">-</span>
              <span className="text-green-200">{cmd.description}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Command Input */}
      <div className="flex items-center border-2 border-green-600 p-2 rounded bg-gray-800">
        <span className="text-green-500 font-mono mr-2">$</span>
        <input
          type="text"
          placeholder="Enter a command (try 'help')"
          className="bg-transparent border-none text-green-400 font-mono w-full focus:outline-none"
        />
      </div>
    </div>
  );
}; 