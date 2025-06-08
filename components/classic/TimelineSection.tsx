import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../ui/dialog";
import { useKonamiCode } from '../../hooks/useKonamiCode';
import { Badge } from '../../components/ui/badge';
import { Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

// Types
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

// Static Data
const staticHistoricalEvents: HistoricalEventData[] = [
  {
    id: 1,
    title: "Hack Club Founded",
    date: "2014-01-01",
    location: "San Francisco, CA",
    description: "Zach Latta founded Hack Club as a nonprofit to support high school coding clubs worldwide.",
    image_url: "https://cloud-lgl7kg862-hack-club-bot.vercel.app/0start__1_.png",
    gallery_images: ["https://cloud-lgl7kg862-hack-club-bot.vercel.app/0start__1_.png"],
    attendees: ""
  },
  {
    id: 2,
    title: "Summer of Making",
    date: "2020-05-28",
    location: "Online",
    description: "Hack Club partnered with GitHub, Adafruit, and Arduino to launch an online summer program, distributing $50,000 in hardware to teen hackers globally.",
    image_url: "https://assets.hackclub.com/log/2020-06-18_summer.jpg",
    gallery_images: ["https://assets.hackclub.com/log/2020-06-18_summer.jpg"],
    attendees: ""
  },
  {
    id: 3,
    title: "Hacker Zephyr",
    date: "2021-07-16",
    location: "Across America",
    description: "A cross-country hackathon on a train across America, bringing together teenage hackers for a unique coding journey.",
    image_url: "https://camo.githubusercontent.com/1163f12e042beeb96ca7bf8c552d4d56d4a3057469ee06e92d4b5fb42e714aa8/68747470733a2f2f636c6f75642d6b31386337677271632d6861636b2d636c75622d626f742e76657263656c2e6170702f307370616365785f616e645f6861636b5f636c75622e6a7067",
    gallery_images: ["https://camo.githubusercontent.com/1163f12e042beeb96ca7bf8c552d4d56d4a3057469ee06e92d4b5fb42e714aa8/68747470733a2f2f636c6f75642d6b31386337677271632d6861636b2d636c75622d626f742e76657263656c2e6170702f307370616365785f616e645f6861636b5f636c75622e6a706"],
    attendees: ""
  },
  {
    id: 4,
    title: "Assemble",
    date: "2022-08-05",
    location: "San Francisco, CA",
    description: "The first high school hackathon in San Francisco since the COVID-19 pandemic, aiming to kick off a hackathon renaissance.",
    image_url: "https://user-images.githubusercontent.com/39828164/189933158-9f00ceaf-7f61-4bef-9911-4cf4a14e0e4d.png",
    gallery_images: ["https://user-images.githubusercontent.com/39828164/189933158-9f00ceaf-7f61-4bef-9911-4cf4a14e0e4d.png"],
    attendees: ""
  },
  {
    id: 5,
    title: "Winter Hardware Wonderland",
    date: "2023-12-01",
    location: "Online",
    description: "An online winter program where teenagers submitted ideas for hardware projects and received grants of up to $250.",
    image_url: "g",
    gallery_images: ["g"],
    attendees: ""
  },
  {
    id: 6,
    title: "High Seas Launch",
    date: "2024-12-04",
    location: "Online",
    description: "Hack Club introduced 'High Seas', a program incentivizing teens to build personal projects by offering rewards.",
    image_url: "https://ahoy.hack.club/ogcard.png",
    gallery_images: ["https://ahoy.hack.club/ogcard.png"],
    attendees: ""
  },
  {
    id: 7,
    title: "Scrapyard Flagship (Austin, TX)",
    date: "2025-03-01",
    location: "Austin, TX",
    description: "The flagship event of Hack Club's global 'Scrapyard' hackathon series, held in Austin, Texas, where high schoolers built 'useless' inventions for fun.",
    image_url: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6fe641d9fa579755048e7548765ce8b86e8d4ff7_ekran_g__r__nt__s___2025-06-01_153242.png",
    gallery_images: ["https://hc-cdn.hel1.your-objectstorage.com/s/v3/6fe641d9fa579755048e7548765ce8b86e8d4ff7_ekran_g__r__nt__s___2025-06-01_153242.png"],
    attendees: ""
  },
  {
    id: 8,
    title: "Scrapyard Worldwide",
    date: "2025-03-15",
    location: "Worldwide",
    description: "Over 100 cities worldwide hosted local Scrapyard hackathons, encouraging teens to create quirky and unconventional projects.",
    image_url: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/6fe641d9fa579755048e7548765ce8b86e8d4ff7_ekran_g__r__nt__s___2025-06-01_153242.png",
    gallery_images: ["https://hc-cdn.hel1.your-objectstorage.com/s/v3/6fe641d9fa579755048e7548765ce8b86e8d4ff7_ekran_g__r__nt__s___2025-06-01_153242.png"],
    attendees: ""
  },
  {
    id: 9,
    title: "Shipwrecked",
    date: "2025-08-08",
    location: "Private Island, Boston",
    description: "Hack Club hosted 150 teenagers on a private island off the coast of Boston for a themed 3-day hackathon.",
    image_url: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/81498598a9030326124be5aac57a94da514363aa_image.png",
    gallery_images: ["https://hc-cdn.hel1.your-objectstorage.com/s/v3/81498598a9030326124be5aac57a94da514363aa_image.png"],
    attendees: "150"
  }
];

// Utility Functions
const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
};

// Components
const TimelineHeader = ({ konamiActivated }: { konamiActivated: boolean }) => (
  <div className="text-center mb-12 opacity-0 animate-on-scroll">
    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-900 text-green-400 mb-4 font-mono border border-green-600">
      <Calendar size={16} className="mr-2 text-green-500" />
      <span className="text-sm font-medium">$ ./our-journey.sh --verbose</span>
      <span className="animate-blink text-green-400 ml-1">▊</span>
    </div>
    
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400">
      <span className={konamiActivated ? "animate-glitch" : "glitch-text-subtle"}>
        Our Journey
      </span>
    </h2>
    
    <p className="text-xl text-green-200 max-w-2xl mx-auto font-mono">
      <span className="text-green-500">$</span> cat history.log
    </p>
  </div>
);

const TimelineCard = ({ 
  event, 
  konamiActivated, 
  onOpenDetail 
}: { 
  event: HistoricalEventData; 
  konamiActivated: boolean;
  onOpenDetail: (event: HistoricalEventData) => void;
}) => (
  <div className="relative">
    <div 
      className={`rounded-2xl overflow-hidden shadow-lg transition-all duration-300 transform hover:shadow-xl hover:translate-y-[-5px] bg-gray-900 border border-green-600 text-green-200 ${konamiActivated ? 'animate-bounce' : ''}`}
    >
      <div 
        className="relative h-48 cursor-pointer overflow-hidden"
        onClick={() => onOpenDetail(event)}
      >
        <img 
          src={konamiActivated ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGV1N3dyNGd0bDRocmdoOWZreTlseDRpY2owOGNqaHN6bnFwMXk1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K64409MbT84rm/giphy.gif' : event.image_url} 
          alt={`${event.title} - ${formatDate(event.date)}`}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = 'https://cloud-5pdwvchgm-hack-club-bot.vercel.app/0placeholder.jpg';
          }}
        />
        
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
          onClick={() => onOpenDetail(event)}
        >
          <span className="mr-1 text-green-500 group-hover:text-white">$</span> View Details
        </Button>
      </div>
    </div>
  </div>
);

const ImageDetailDialog = ({ 
  event, 
  onClose,
  konamiActivated 
}: { 
  event: HistoricalEventData;
  onClose: () => void;
  konamiActivated: boolean;
}) => (
  <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
    <DialogContent className="max-w-5xl w-[90vw] bg-gray-900 text-green-400 border border-green-600 font-mono">
      <DialogHeader className="border-b border-green-600/50 pb-3">
        <DialogTitle className="text-2xl text-green-400">
          {konamiActivated ? "👾 " : ""}{event.title}
        </DialogTitle>
        <DialogDescription className="text-green-200 text-sm">
          {formatDate(event.date)} • {event.location}
          {event.attendees && ` • ${event.attendees} attendees`}
        </DialogDescription>
      </DialogHeader>
      
      <div className="relative h-[60vh] bg-black rounded-md overflow-hidden my-4 border border-green-600">
        {event.gallery_images && event.gallery_images.length > 0 ? (
          <img 
            src={konamiActivated ? 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGV1N3dyNGd0bDRocmdoOWZreTlseDRpY2owOGNqaHN6bnFwMXk1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K64409MbT84rm/giphy.gif' : event.gallery_images[0]} 
            alt={`Image from ${event.title} event`} 
            className="w-full h-full object-contain"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src = 'https://cloud-5pdwvchgm-hack-club-bot.vercel.app/0placeholder.jpg';
            }}
          />
        ) : konamiActivated ? (
          <img 
            src='https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcGV1N3dyNGd0bDRocmdoOWZreTlseDRpY2owOGNqaHN6bnFwMXk1ZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/K64409MbT84rm/giphy.gif'
            alt="Konami Code Activated!"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex justify-center items-center h-full text-green-400 font-mono">
            <p>$ cat no_image_found.txt</p>
          </div>
        )}
      </div>
      
      <div className="font-mono text-sm text-green-200 space-y-2">
        {event.description && (
          <p><span className="text-green-500">$ echo</span> "{event.description}"</p>
        )}
      </div>
      
      <DialogFooter className="mt-6 flex justify-end font-mono">
        <Button 
          variant="outline" 
          onClick={onClose} 
          className="border-green-600 text-green-400 hover:bg-green-900/20"
        >
          <span className="mr-1 text-green-500">$</span> Close
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

// Main Component
export const TimelineSection = () => {
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEventData | null>(null);
  const konamiActivated = useKonamiCode();
  
  React.useEffect(() => {
    if (konamiActivated) {
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

  const openImageDetail = (event: HistoricalEventData) => {
    setSelectedEvent(event);
  };

  const closeImageDetail = () => {
    setSelectedEvent(null);
  };

  return (
    <section id="history" className="py-16 px-6 bg-black relative overflow-hidden border-t-4 border-green-600 shadow-[0_0_30px_5px_rgba(34,197,94,0.3)]">
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-grid-pattern opacity-10"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <TimelineHeader konamiActivated={konamiActivated} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedEvents.map((event) => (
            <TimelineCard
              key={event.id}
              event={event}
              konamiActivated={konamiActivated}
              onOpenDetail={openImageDetail}
            />
          ))}
        </div>
        
        {selectedEvent && (
          <ImageDetailDialog
            event={selectedEvent}
            onClose={closeImageDetail}
            konamiActivated={konamiActivated}
          />
        )}
      </div>
    </section>
  );
};
