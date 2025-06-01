import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { useKonamiCode } from '../../hooks/useKonamiCode';
import { Badge } from '../../components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

// Define a type for the historical event data
interface HistoricalEventData {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  image_url: string;
  gallery_images?: string[];
  attendees?: string;
}

// Define the static event data
const staticHistoricalEvents: HistoricalEventData[] = [
  {
    "id": 1,
    "title": "Hack Club Launch",
    "date": "2014-08-01",
    "location": "San Francisco, CA",
    "description": "Hack Club was founded by Zach Latta to help high schoolers start coding clubs and build a supportive tech community.",
    "image_url": "https://assets.hackclub.com/presskit/hackclub-logo.png",
    "gallery_images": ["https://assets.hackclub.com/presskit/hackclub-logo.png", "https://assets.hackclub.com/presskit/hackclub-banner.png"],
    "attendees": ""
  },
  {
    "id": 2,
    "title": "Launch of Hack Club Bank",
    "date": "2018-06-01",
    "location": "Online",
    "description": "Hack Club Bank was launched as a financial platform for teen-led organizations and hackathons to manage money legally and transparently.",
    "image_url": "https://assets.hackclub.com/bank-og.png",
    "gallery_images": ["https://assets.hackclub.com/bank-og.png", "https://cloud-9tqir75lf-hack-club-bot.vercel.app/0bank.png"],
    "attendees": ""
  },
  {
    "id": 3,
    "title": "Assemble",
    "date": "2022-07-22",
    "location": "San Francisco, CA",
    "description": "Hack Club's first in-person high school hackathon since the pandemic, bringing together student hackers from around the world.",
    "image_url": "https://assemble.hackclub.com/og.jpg",
    "gallery_images": [],
    "attendees": ""
  },
  {
    "id": 4,
    "title": "Outernet",
    "date": "2023-07-28",
    "location": "Vermont's Northeast Kingdom",
    "description": "An outdoor, make-it-yourself programming adventure, encouraging creativity and collaboration in nature.",
    "image_url": "https://outernet.hackclub.com/og.jpg",
    "gallery_images": [],
    "attendees": ""
  },
  {
    "id": 5,
    "title": "The Hacker Zephyr",
    "date": "2023-08-01",
    "location": "Across the United States",
    "description": "A cross-country hackathon on a train, combining travel and coding in a unique adventure.",
    "image_url": "https://zephyr.hackclub.com/og.jpg",
    "gallery_images": [],
    "attendees": ""
  },
  {
    "id": 6,
    "title": "Epoch",
    "date": "2023-12-31",
    "location": "Delhi NCR, India",
    "description": "A magical New Year's event spent hacking, celebrating the end of the year with the Hack Club community.",
    "image_url": "https://epoch.hackclub.com/og.png",
    "gallery_images": [],
    "attendees": ""
  },
  {
    "id": 7,
    "title": "Hack Club Summit 2024",
    "date": "2024-06-15",
    "location": "Online",
    "description": "A virtual gathering of Hack Club leaders and members to discuss the future of the community and share experiences.",
    "image_url": "https://assets.hackclub.com/summit-2024.png",
    "gallery_images": [],
    "attendees": ""
  }
];

export const TimelineSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEventData | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const konamiActivated = useKonamiCode();
  
  useEffect(() => {
    if (konamiActivated) {
      // Launch confetti when Konami code is activated
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ec3750', '#338eda', '#9b87f5', '#33d6a6']
      });
    }
  }, [konamiActivated]);

  // Sort events by date (newest first)
  const sortedEvents = staticHistoricalEvents.sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const openImageDetail = (event: HistoricalEventData, imageIndex: number = 0) => {
    setSelectedEvent(event);
    setSelectedImageIndex(imageIndex);
  };

  const closeImageDetail = () => {
    setSelectedEvent(null);
  };

  // Fixed image navigation functions
  const nextImage = () => {
    if (selectedEvent?.gallery_images && selectedEvent.gallery_images.length > 0) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === selectedEvent.gallery_images!.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent?.gallery_images && selectedEvent.gallery_images.length > 0) {
      setSelectedImageIndex((prevIndex) => 
        prevIndex === 0 ? selectedEvent.gallery_images!.length - 1 : prevIndex - 1
      );
    }
  };

  // Scroll timeline functions
  const scrollLeft = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (timelineRef.current) {
      timelineRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <section id="history" className="py-16 px-6 bg-black relative overflow-hidden border-t-4 border-green-600 shadow-[0_0_30px_5px_rgba(34,197,94,0.3)]">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 opacity-0 animate-on-scroll">
          {/* Terminal prompt header */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 text-green-400 mb-4 font-mono border border-green-600">
            <Calendar size={16} className="mr-2 text-green-500" />
            <span className="text-sm font-medium">$ ./our-journey.sh --verbose</span>
            <span className="animate-blink text-green-400 ml-1">▊</span>
          </div>
          
          {/* Section title */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
            <span className={konamiActivated ? "animate-glitch" : "glitch-text-subtle"}>
              Our Team's Journey
            </span>
          </h2>
          
          {/* Section description */}
          <p className="text-xl text-green-200 max-w-2xl mx-auto font-mono">
            <span className="text-green-500">$</span> cat history.log
          </p>
        </div>

        <div className="mb-16 relative">
          {/* Desktop navigation buttons */}
          <div className="hidden md:block">
            <button 
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 shadow-lg border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400/40"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6 text-green-400" />
            </button>
            <button 
              onClick={scrollRight}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-900/80 hover:bg-gray-800 rounded-full p-2 shadow-lg border border-green-600 focus:outline-none focus:ring-2 focus:ring-green-400/40"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6 text-green-400" />
            </button>
          </div>

          {/* Timeline */}
          <ScrollArea className="pb-4">
            <div 
              ref={timelineRef}
              className="flex flex-row gap-8 overflow-x-auto scrollbar-none py-6 min-h-[400px]"
              style={{ scrollbarWidth: 'none' }}
            >
              {/* Timeline line */}
              <div className="absolute left-0 right-0 h-1 bg-green-600 top-1/2 transform -translate-y-1/2 z-0"></div>
              
              {sortedEvents?.map((event, index) => (
                <div 
                  key={event.id} 
                  className={`relative flex-none w-72 md:w-80 ${index % 2 === 0 ? 'mt-8' : 'mb-8'}`}
                >
                  {/* Year marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-green-600 text-white font-mono font-bold flex items-center justify-center shadow-lg border-2 border-green-400 z-10">
                    {new Date(event.date).getFullYear()}
                  </div>
                  
                  {/* Image card */}
                  <div 
                    className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:shadow-xl hover:translate-y-[-5px] bg-gray-900 border border-green-600 text-green-200 ${konamiActivated ? 'animate-bounce' : ''}`}
                  >
                    <div 
                      className="relative h-48 cursor-pointer overflow-hidden"
                      onClick={() => openImageDetail(event)}
                    >
                      <img 
                        src={konamiActivated && index % 3 === 0 ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGV1N3dyNGd0bDRocmdoOWZreTlseDRpY2owOGNqaHN6bnFwMXk1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K64409MbT84rm/giphy.gif' : event.image_url} 
                        alt={`${event.title} - ${formatDate(event.date)}`}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                        }}
                      />
                      
                      {/* Image overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 font-mono">
                        <h3 className="text-green-400 font-bold text-lg">{event.title}</h3>
                        <p className="text-green-200 text-sm">{formatDate(event.date)}</p>
                        {event.location && (
                          <p className="text-green-300 text-xs">{event.location}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4 font-mono">
                      <Badge variant="outline" className="mb-2 text-xs bg-black/50 text-green-400 border border-green-600">
                        {formatDate(event.date)}
                      </Badge>
                      <h3 className="font-bold text-lg line-clamp-1 text-green-400">{event.title}</h3>
                      <p className="text-green-200 text-sm mt-1 mb-3 line-clamp-2">
                        {event.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-green-600 text-green-400 hover:bg-green-900/20 hover:text-white font-mono group"
                        onClick={() => openImageDetail(event)}
                      >
                        <span className="mr-1 text-green-500 group-hover:text-white">$</span> View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          {/* Mobile scroll indicator */}
          <div className="flex md:hidden justify-center mt-6">
            <div className="text-green-400 text-sm flex items-center font-mono">
              <ChevronLeft className="h-4 w-4 mr-1 text-green-500" />
              <span>$ swipe_to_explore</span>
              <ChevronRight className="h-4 w-4 ml-1 text-green-500" />
              <span className="animate-blink text-green-400 ml-1">▊</span>
            </div>
          </div>
        </div>
        
        {/* Image Detail Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={(open: boolean) => !open && closeImageDetail()}>
          {selectedEvent && (
            <DialogContent className="max-w-5xl w-[90vw] bg-gray-900 text-green-400 border border-green-600 font-mono">
              <DialogHeader className="border-b border-green-600/50 pb-3">
                <DialogTitle className="text-2xl text-green-400">
                  {konamiActivated ? "👾 " : ""}{selectedEvent.title}
                </DialogTitle>
                <DialogDescription className="text-green-200 text-sm">
                  {formatDate(selectedEvent.date)} • {selectedEvent.location}
                  {selectedEvent.attendees && ` • ${selectedEvent.attendees} attendees`}
                </DialogDescription>
              </DialogHeader>
              
              <div className="relative h-[60vh] bg-black rounded-md overflow-hidden my-4 border border-green-600">
                {selectedEvent.gallery_images && selectedEvent.gallery_images.length > 0 ? (
                  <>
                    <img 
                      key={selectedImageIndex} // Add key to force re-render when image changes
                      src={konamiActivated ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGV1N3dyNGd0bDRocmdoOWZreTlseDRpY2owOGNqaHN6bnFwMXk1ZyZlcD12MV9ibnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K64409MbT84rm/giphy.gif' : selectedEvent.gallery_images[selectedImageIndex]} 
                      alt={`Gallery image ${selectedImageIndex + 1} from ${selectedEvent.title} event`} 
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                      }}
                    />
                    
                    {/* Image navigation buttons - fixed to use Button component */}
                    {selectedEvent.gallery_images.length > 1 && (
                      <>
                        <Button
                          variant="carousel"
                          size="carousel"
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </Button>
                        <Button
                          variant="carousel"
                          size="carousel"
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </Button>
                        
                        {/* Image counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm">
                          {selectedImageIndex + 1} / {selectedEvent.gallery_images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : ( konamiActivated ? (
                   <img 
                      src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGV1N3dyNGd0bDRocmdoOWZreTlseDRpY2owOGNqaHN6bnFwMXk1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K64409MbT84rm/giphy.gif'
                      alt="Konami Code Activated!"
                      className="w-full h-full object-contain"
                    />
                ) : (
                   <div className="flex justify-center items-center h-full text-green-400 font-mono">
                      <p>$ cat no_image_found.txt</p>
                   </div>
                ))}
              </div>
              
              <div className="font-mono text-sm text-green-200 space-y-2">
                {selectedEvent.description && (
                   <p><span className="text-green-500">$ echo</span> "{selectedEvent.description}"</p>
                )}
              </div>
              
              <DialogFooter className="mt-6 flex justify-end font-mono">
                <Button 
                  variant="outline" 
                  onClick={closeImageDetail} 
                  className="border-green-600 text-green-400 hover:bg-green-900/20"
                >
                  <span className="mr-1 text-green-500">$</span> Close
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </section>
  );
};
