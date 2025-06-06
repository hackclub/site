import React from 'react';
import { Button } from '../ui/button';
import { Clock, Globe } from 'lucide-react';

export const UpcomingEventsSection = () => {
  return (
    <div className="bg-gray-900 border-4 border-red-600 rounded-lg p-6 mb-6 shadow-lg shadow-red-600/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-red-600 pb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <h2 className="text-red-400 font-mono text-lg">UPCOMING_EVENTS.sh</h2>
        </div>
        <Button
          variant="outline"
          className="text-xs bg-transparent text-red-400 border-2 border-red-600 hover:bg-gray-800 font-mono"
        >
          Show Timeline
        </Button>
      </div>

      {/* Event Card */}
      <div className="bg-gray-800 border-2 border-red-600 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2 border-b border-red-600 pb-2">
          <h3 className="text-red-400 font-mono text-lg">Aurora - Game Dev w/ Godot</h3>
          <span className="px-2 py-1 bg-red-900/50 text-red-400 text-xs rounded-full border border-red-600">
            New
          </span>
        </div>

        <p className="text-gray-300 mb-4 border-b border-red-600 pb-4">
          Join us for an exciting game development workshop using Godot Engine. Learn the basics of game design and create your first 2D game!
        </p>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-gray-400 border border-red-600 rounded px-2 py-1">
            <Clock className="w-4 h-4 mr-1" />
            <span>Invalid Date</span>
          </div>
          <div className="flex items-center text-gray-400 border border-red-600 rounded px-2 py-1">
            <Globe className="w-4 h-4 mr-1" />
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 