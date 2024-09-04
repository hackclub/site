import React, { useRef, useEffect } from 'react';
import CarouselCards from './carousel-cards';

const Carousel = ({ cards }) => {
    const scrollContainerRef = useRef(null);
    const cardsPerView = 1; // Number of cards that can be seen at once
    const cardWidth = 400; // Width of each card in pixels
    const scrollAmount = cardWidth; // Total scroll width for each move
    const totalCards = cards.length;
    
    // Made another set of cards to do infinite scrolling
    const infiniteCards = [...cards, ...cards, ...cards]; // Repeat the cards 3x for non-choppy scrolling
  
    // Fixes scroll position to the middle set the mount for non-choppy scrolling
    useEffect(() => {
      if (scrollContainerRef.current) {
        const initialScroll = totalCards * cardWidth; // Scroll to the start of the second set of items
        scrollContainerRef.current.scrollLeft = initialScroll;
      }
    }, [totalCards, cardWidth]);
  
    const moveCarousel = (direction) => {
      if (scrollContainerRef.current) {
        const scrollValue = direction * scrollAmount;
        scrollContainerRef.current.scrollBy({
          left: scrollValue,
          behavior: 'smooth', // Smooth scrolling effect
        });
      }
    };
  
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth } = scrollContainerRef.current;
        const maxScrollLeft = scrollWidth - scrollContainerRef.current.clientWidth;
        
        // Reset to the middle set of cards if we've scrolled to either end
        if (scrollLeft === 0) {
          scrollContainerRef.current.scrollLeft = totalCards * cardWidth; // Reset to the end of the second set
        } else if (scrollLeft >= maxScrollLeft) {
          scrollContainerRef.current.scrollLeft = totalCards * cardWidth - scrollAmount; // Reset to the start of the second set
        }
      }
    };
  
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          overflow: 'hidden', // Hide overflow content
        }}
      >
        <button
          onClick={() => moveCarousel(-1)}
          style={{
            position: 'absolute',
            left: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'white',
            zIndex: 1,
          }}
        >
          &#10094;
        </button>
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            width: '70%',
            overflowX: 'hidden', // Hide overflow content
          }}
        >
          {infiniteCards.map((item, index) => (
            <div
              key={index}
              style={{
                width: `${cardWidth}px`, // Set width for each card
                flex: '0 0 auto', // Prevent cards from shrinking
                marginRight: '2px', // Spacing between cards
              }}
            >
              <CarouselCards {...item} />
            </div>
          ))}
        </div>
        <button
          onClick={() => moveCarousel(1)}
          style={{
            position: 'absolute',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: 'white',
            zIndex: 1,
          }}
        >
          &#10095;
        </button>
      </div>
    );
  };

export default Carousel;