import React, { useState } from 'react';
import { Button } from '../ui/button';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface HistoricalEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  images: string[];
  location: string;
  attendees: number;
  highlights: string[];
  repo_url?: string;
}

export const HistoricalEventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handlePrevImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedEvent.images.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedEvent) {
      setCurrentImageIndex((prev) => 
        prev === selectedEvent.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const handleViewEvent = () => {
    setSelectedEvent({
      id: '1',
      title: 'Hack Club Summit 2024',
      date: '2024-03-15',
      description: 'The annual gathering of Hack Club leaders and members from around the world. A celebration of coding, creativity, and community.',
      images: ['/images/summit-2024.jpg'],
      location: 'San Francisco, CA',
      attendees: 500,
      highlights: [
        'Keynote speeches from industry leaders',
        'Workshop sessions on emerging technologies',
        'Networking opportunities with fellow hackers'
      ],
      repo_url: 'https://github.com/hackclub/summit-2024'
    });
  };

  return (
    <div className="bg-gray-900 border-4 border-purple-600 rounded-lg p-6 mb-6 shadow-lg shadow-purple-600/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b-2 border-purple-600 pb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
          <h2 className="text-purple-400 font-mono text-lg">HISTORICAL_EVENTS.log</h2>
        </div>
        <Button
          variant="outline"
          className="text-xs bg-transparent text-purple-400 border-2 border-purple-600 hover:bg-gray-800 font-mono"
        >
          View Archive
        </Button>
      </div>

      {/* Event Card */}
      <div className="bg-gray-800 border-2 border-purple-600 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2 border-b border-purple-600 pb-2">
          <h3 className="text-purple-400 font-mono text-lg">Hack Club Summit 2024</h3>
          <span className="px-2 py-1 bg-purple-900/50 text-purple-400 text-xs rounded-full border border-purple-600">
            Featured
          </span>
        </div>

        <p className="text-gray-300 mb-4 border-b border-purple-600 pb-4">
          The annual gathering of Hack Club leaders and members from around the world. A celebration of coding, creativity, and community.
        </p>

        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center text-gray-400 border border-purple-600 rounded px-2 py-1">
            <span>March 15-17, 2024</span>
          </div>
          <div className="flex items-center text-gray-400 border border-purple-600 rounded px-2 py-1">
            <span>San Francisco, CA</span>
          </div>
          <div className="flex items-center text-gray-400 border border-purple-600 rounded px-2 py-1">
            <span>500+ Attendees</span>
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-4 w-full text-purple-400 border-2 border-purple-600 hover:bg-gray-700 font-mono"
          onClick={handleViewEvent}
        >
          View Details
        </Button>
      </div>

      {/* Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-900 border-4 border-purple-600 rounded-lg p-6 max-w-4xl w-full mx-4">
            <div className="flex justify-between items-center mb-4 border-b-2 border-purple-600 pb-4">
              <h3 className="text-purple-400 font-mono text-xl">{selectedEvent.title}</h3>
              <Button
                variant="ghost"
                className="text-purple-400 hover:text-purple-300"
                onClick={() => setSelectedEvent(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>

            {/* Image Gallery */}
            <div className="relative mb-4 border-2 border-purple-600 rounded-lg overflow-hidden">
              <img
                src={selectedEvent.images[currentImageIndex]}
                alt={selectedEvent.title}
                className="w-full h-96 object-cover"
              />
              <Button
                variant="ghost"
                className="absolute left-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="w-8 h-8" />
              </Button>
              <Button
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-300"
                onClick={handleNextImage}
              >
                <ChevronRight className="w-8 h-8" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm">
                <div className="text-gray-400 border border-purple-600 rounded px-3 py-1">
                  {formatDate(selectedEvent.date)}
                </div>
                <div className="text-gray-400 border border-purple-600 rounded px-3 py-1">
                  {selectedEvent.location}
                </div>
                <div className="text-gray-400 border border-purple-600 rounded px-3 py-1">
                  {selectedEvent.attendees} Attendees
                </div>
              </div>
              <p className="text-gray-300 border-2 border-purple-600 p-4 rounded bg-gray-800">
                {selectedEvent.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
