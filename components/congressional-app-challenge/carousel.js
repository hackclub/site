import React, { useRef } from 'react';
import CarouselCards from './carousel-cards';

const Carousel = ({ cards }) => {
  const scrollContainerRef = useRef(null);
  const cardsPerView = 3; // Number of cards visible at once
  const cardWidth = 400; // Width of each card in pixels
  const scrollAmount = cardsPerView * cardWidth; // Total scroll width for each move

  const moveCarousel = (direction) => {
    if (scrollContainerRef.current) {
      const scrollValue = direction * scrollAmount;
      scrollContainerRef.current.scrollBy({
        left: scrollValue,
        behavior: 'smooth', // Smooth scrolling effect
      });
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
        style={{
          display: 'flex',
          width: '70%',
          overflowX: 'hidden', // Hide overflow content
        }}
      >
        {cards.map((item, index) => (
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



/*export default function Carousel({ cards }) {
    return (
        <Grid id="winners" gap={2} columns={[1, null, 3]} sx={{m:'2', justifyContent:'center', alignItems:'center', justifyItems:'center'}}>
            {cards.map((card, idx) => (
                <CarouselCards key={idx} {...card} />
            ))}
      </Grid>
    )
}*/