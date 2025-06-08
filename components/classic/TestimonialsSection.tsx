
import React from 'react';
import { Card, CardContent } from '../../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';

const testimonials = [
  {
    quote: "Hack Club helped me go from knowing nothing about coding to shipping my first full-stack app in less than a month!",
    name: "Alex Chen",
    role: "High School Junior",
    initial: "AC",
    image: "https://assets.hackclub.com/api/v0.1/files/bc14111/download/hack-club-student-1.jpg",
    handle: "@alexc"
  },
  {
    quote: "The community here is amazing. I've made friends from around the world who share my passion for building things with code.",
    name: "Sophia Johnson",
    role: "High School Senior",
    initial: "SJ",
    image: "https://assets.hackclub.com/api/v0.1/files/bc14112/download/hack-club-student-2.jpg",
    handle: "@sophiaj"
  },
  {
    quote: "Before Hack Club, I had no one to code with. Now I lead a club at my school with 25 members!",
    name: "Marcus Williams",
    role: "Club Leader",
    initial: "MW",
    image: "https://assets.hackclub.com/api/v0.1/files/bc14113/download/hack-club-student-3.jpg",
    handle: "@mwilliams"
  },
  {
    quote: "The hackathons and workshops have completely changed how I approach coding problems. I'm so much more confident now.",
    name: "Lena Park",
    role: "Workshop Participant",
    initial: "LP",
    image: "https://assets.hackclub.com/api/v0.1/files/bc14114/download/hack-club-student-4.jpg",
    handle: "@lenapark"
  },
  {
    quote: "Joining Hack Club was the best decision I made in high school. It opened doors to internships and college opportunities I never knew existed.",
    name: "Jamal Thompson",
    role: "College Freshman",
    initial: "JT",
    image: "https://assets.hackclub.com/api/v0.1/files/bc14115/download/hack-club-student-5.jpg",
    handle: "@jamalt"
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 px-6 relative bg-gray-900 text-white">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hack-purple to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-hack-red to-transparent"></div>
      
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 opacity-0 animate-on-scroll">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-hack-purple/20 text-hack-purple mb-4">
            <span className="text-sm font-medium font-mono">$ cat testimonials.txt</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-white">
            <span className="inline-block">Hear from</span> <span className="inline-block text-hack-red typing-effect-subtitle">fellow hackers</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thousands of high schoolers have found their coding community at Hack Club.
          </p>
        </div>
        
        <div className="md:px-10 opacity-0 animate-on-scroll" style={{ animationDelay: '300ms' }}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3 pl-4">
                  <Card className="h-full bg-gray-800 border-gray-700 hover:shadow-xl hover:shadow-hack-purple/10 transition-all duration-300 hover:translate-y-[-5px]">
                    <CardContent className="pt-6">
                      <div className="flex flex-col h-full">
                        <div className="mb-4 flex items-center">
                          <div className="w-3 h-3 bg-hack-green rounded-full mr-2 animate-pulse"></div>
                          <div className="font-mono text-xs text-hack-green">
                            testimonial.sh --user={testimonial.handle}
                          </div>
                        </div>
                        <p className="text-lg text-gray-300 flex-grow font-mono border-l-2 border-hack-purple pl-4">
                          {testimonial.quote}
                        </p>
                        <div className="flex items-center mt-6 pt-6 border-t border-gray-700">
                          <Avatar className="h-10 w-10 border-2 border-hack-blue">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback className="bg-hack-purple text-white">
                              {testimonial.initial}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-4">
                            <p className="text-base font-medium text-white">{testimonial.name}</p>
                            <p className="text-sm text-gray-400 font-mono">{testimonial.role} <span className="text-hack-blue">{testimonial.handle}</span></p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center mt-6">
              <CarouselPrevious className="relative inset-auto mx-2 bg-transparent border-gray-700 text-white hover:bg-gray-700" />
              <CarouselNext className="relative inset-auto mx-2 bg-transparent border-gray-700 text-white hover:bg-gray-700" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
