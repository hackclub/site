import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../../components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

export const HistoricalEventsSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const openGallery = (event: HistoricalEvent) => {
    setSelectedEvent(event);
    setCurrentImageIndex(0);
  };

  const closeGallery = () => {
    setSelectedEvent(null);
  };

  // Fixed image navigation functions
  const nextImage = () => {
    if (selectedEvent && selectedEvent.gallery_images && selectedEvent.gallery_images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === selectedEvent.gallery_images!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.gallery_images && selectedEvent.gallery_images.length > 0) {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedEvent.gallery_images!.length - 1 : prevIndex - 1
      );
    }
  };

  const getYearFromDate = (dateStr: string) => {
    return new Date(dateStr).getFullYear();
  };

  // Group events by year for the timeline
  const groupEventsByYear = (events: HistoricalEvent[] | undefined) => {
    if (!events) return {};

    const groupedEvents: Record<string, HistoricalEvent[]> = {};
    
    events.forEach(event => {
      const year = getYearFromDate(event.date).toString();
      if (!groupedEvents[year]) {
        groupedEvents[year] = [];
      }
      groupedEvents[year].push(event);
    });

    return groupedEvents;
  };

  const groupedEvents = groupEventsByYear(events);
  const years = events ? Object.keys(groupedEvents).sort((a, b) => parseInt(b) - parseInt(a)) : [];

  return (
    <section id="history" className="py-16 px-6 bg-gray-50 relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 opacity-0 animate-on-scroll">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-black text-hack-green mb-4 font-mono border border-hack-green/30">
            <span className="text-sm font-medium">$ ./view-timeline.sh</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 glitch-text-subtle">
            Looking back at our journey
          </h2>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the key milestones that shaped Hack Club's community and impact over the years.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-hack-blue"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 bg-red-50 rounded-lg">
            <p className="text-red-500 font-mono">Error loading historical events data</p>
          </div>
        ) : (
          <div className="mb-16">
            {/* Mobile Timeline View - Vertical */}
            <div className="md:hidden">
              <div className="relative pl-8 border-l-2 border-hack-blue/30 space-y-12">
                {years.map((year) => (
                  <div key={year} className="relative">
                    <span className="absolute -left-[42px] flex items-center justify-center w-10 h-10 rounded-full bg-hack-blue text-white font-bold shadow-lg">
                      {year}
                    </span>
                    <div className="space-y-8 pt-2">
                      {groupedEvents[year].map((event) => (
                        <div 
                          key={event.id}
                          className="group relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                          <div 
                            className="h-48 overflow-hidden cursor-pointer" 
                            onClick={() => openGallery(event)}
                          >
                            <img 
                              src={event.image_url} 
                              alt={`${event.title} - ${formatDate(event.date)}`}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://assets.hackclub.com/api/v0.1/files/bc14129/download/hackclub-rect.jpg';
                              }}
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary" className="bg-gray-100">
                                <span className="text-sm font-medium">{formatDate(event.date)}</span>
                              </Badge>
                            </div>
                            <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full text-hack-blue"
                              onClick={() => openGallery(event)}
                            >
                              <span className="text-sm font-medium">View Gallery</span>
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Desktop Timeline View - Horizontal Carousel */}
            <div className="hidden md:block">
              {years.map((year) => (
                <div key={year} className="mb-16">
                  <div className="flex items-center mb-6">
                    <div className="flex-shrink-0 w-16 h-16 rounded-full bg-hack-blue flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {year}
                    </div>
                    <div className="ml-4 h-1 flex-grow bg-hack-blue/20 rounded-full"></div>
                  </div>
                  
                  <Carousel
                    opts={{
                      align: "start",
                      loop: groupedEvents[year].length > 3,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      {groupedEvents[year].map((event) => (
                        <CarouselItem key={event.id} className="md:basis-1/2 lg:basis-1/3 pl-4">
                          <div className="h-full group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div 
                              className="relative h-48 overflow-hidden cursor-pointer" 
                              onClick={() => openGallery(event)}
                            >
                              <img 
                                src={event.image_url} 
                                alt={`${event.title} - ${formatDate(event.date)}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = 'https://assets.hackclub.com/api/v0.1/files/bc14129/download/hackclub-rect.jpg';
                                }}
                              />
                              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                                <div className="flex justify-between items-center">
                                  <Badge className="bg-white/80 text-black">
                                    <span className="text-sm font-medium">{formatDate(event.date)}</span>
                                  </Badge>
                                  {event.location && (
                                    <span className="text-white/90 text-xs">{event.location}</span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                              <p className="text-gray-600 text-sm mb-3">{event.description}</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full text-hack-blue"
                                onClick={() => openGallery(event)}
                              >
                                <span className="text-sm font-medium">View Gallery</span>
                              </Button>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {groupedEvents[year].length > 3 && (
                      <>
                        <CarouselPrevious className="left-0 opacity-70 hover:opacity-100" />
                        <CarouselNext className="right-0 opacity-70 hover:opacity-100" />
                      </>
                    )}
                  </Carousel>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Image Gallery Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && closeGallery()}>
          {selectedEvent && (
            <DialogContent className="max-w-5xl w-[90vw]">
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  {formatDate(selectedEvent.date)} • {selectedEvent.location}
                  {selectedEvent.attendees && ` • ${selectedEvent.attendees} attendees`}
                </DialogDescription>
              </DialogHeader>
              
              <div className="relative h-[60vh] bg-black rounded-md overflow-hidden my-4">
                {selectedEvent.gallery_images && selectedEvent.gallery_images.length > 0 ? (
                  <>
                    <img 
                      key={currentImageIndex} // Add key to force re-render
                      src={selectedEvent.gallery_images[currentImageIndex]} 
                      alt={`Gallery image ${currentImageIndex + 1} from ${selectedEvent.title} event`} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = 'https://assets.hackclub.com/api/v0.1/files/bc14129/download/hackclub-rect.jpg';
                      }}
                    />
                    
                    {/* Image navigation buttons - fixed with Button component */}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <span className="text-2xl">←</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <span className="text-2xl">→</span>
                    </Button>
                    
                    {/* Image counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                      {currentImageIndex + 1} / {selectedEvent.gallery_images.length}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    No gallery images available
                  </div>
                )}
              </div>
              
              <div className="space-y-4">
                <p className="text-gray-600">{selectedEvent.description}</p>
                
                {selectedEvent.highlights && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Event Highlights:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {selectedEvent.highlights.map((highlight, idx) => (
                        <li key={idx}>{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <DialogFooter className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 mt-4">
                <div className="text-xs text-gray-500">
                  {selectedEvent.repo_url && (
                    <a 
                      href={selectedEvent.repo_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-hack-blue hover:underline flex items-center gap-1"
                    >
                      <span className="text-2xl">🌐</span>
                      View Repository
                    </a>
                  )}
                </div>
                
                <Button 
                  onClick={closeGallery}
                  variant="default"
                  className="bg-hack-blue hover:bg-hack-blue/90"
                >
                  Close Gallery
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};
