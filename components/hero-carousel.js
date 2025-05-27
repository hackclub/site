import React, { useState, useEffect } from 'react'
import { Box, Flex, IconButton, Text, Badge } from 'theme-ui'
import Icon from './icon' // Assuming Icon component can render arrows

/** @jsxImportSource theme-ui */

const HeroCarousel = ({ images, gradient }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    if (images.length <= 1) return; // Don't autoplay if only one or no images
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, images.length]);

  const goToPrevious = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
  }

  const goToSlide = index => {
    setCurrentIndex(index)
  }

  if (!images || images.length === 0) {
    return null
  }

  const currentImage = images[currentIndex]

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {images.map((image, index) => (
        <Box
          key={image.src} // Use a unique key like src
          as="img"
          src={image.src}
          alt={image.alt}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
            zIndex: 1
          }}
        />
      ))}
      {/* Gradient Overlay */}
      {gradient && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: gradient,
            zIndex: 2
          }}
        />
      )}

      {/* Controls (only if more than one image) */}
      {images.length > 1 && (
        <>
          <IconButton
            onClick={goToPrevious}
            aria-label="Previous image"
            sx={{
              position: 'absolute',
              top: '50%',
              left: ['10px', '15px', '20px'], // Adjusted for responsiveness
              transform: 'translateY(-50%)',
              zIndex: 3,
              color: 'white',
              cursor: 'pointer',
              bg: 'rgba(0,0,0,0.3)',
              '&:hover': { bg: 'rgba(0,0,0,0.5)' },
              p: ['6px', '8px'] // Adjust padding for smaller buttons
            }}
          >
            <Icon glyph="view-back" size={[24, 28, 32]} /> {/* Responsive icon size */}
          </IconButton>
          <IconButton
            onClick={goToNext}
            aria-label="Next image"
            sx={{
              position: 'absolute',
              top: '50%',
              right: ['10px', '15px', '20px'], // Adjusted for responsiveness
              transform: 'translateY(-50%)',
              zIndex: 3,
              color: 'white',
              cursor: 'pointer',
              bg: 'rgba(0,0,0,0.3)',
              '&:hover': { bg: 'rgba(0,0,0,0.5)' },
              p: ['6px', '8px'] // Adjust padding for smaller buttons
            }}
          >
            <Icon glyph="view-forward" size={[24, 28, 32]} /> {/* Responsive icon size */}
          </IconButton>

          {/* Dots */}
          <Flex
            sx={{
              position: 'absolute',
              bottom: ['12px', '15px', '20px'], // Adjusted for responsiveness
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 3
            }}
          >
            {images.map((_, index) => (
              <Box
                key={`dot-${index}`}
                as="button"
                aria-label={`Go to image ${index + 1}`}
                onClick={() => goToSlide(index)}
                sx={{
                  width: ['6px', '8px', '10px'], // Adjusted for responsiveness
                  height: ['6px', '8px', '10px'], // Adjusted for responsiveness
                  borderRadius: '50%',
                  bg: currentIndex === index ? 'primary' : 'white',
                  opacity: currentIndex === index ? 1 : 0.6,
                  mx: ['2px', '3px', '5px'], // Adjusted for responsiveness
                  border: 'none',
                  p: 0,
                  cursor: 'pointer',
                  '&:hover': { opacity: 1 }
                }}
              />
            ))}
          </Flex>
        </>
      )}

      {/* Caption Badge */}
      {currentImage.caption && (
        <Badge
          variant="pill"
          sx={{
            position: 'absolute',
            bottom: ['12px', '15px', '20px'], // Match dots' bottom
            // Adjust 'right' to clear the right arrow button if controls are visible
            right: images.length > 1 ? ['30px', '30px', '60px'] : ['10px', '10px', '20px'],
            zIndex: 3,
            bg: 'rgba(0,0,0,0.7)',
            color: 'white',
            fontSize: [0, 0, 1], // Smaller font on small/medium screens
            p: [1, 1, 2],        // Smaller padding on small/medium screens
            whiteSpace: 'nowrap',
            // Adjust maxWidth to prevent overlap with the left arrow button if controls are visible
            maxWidth: images.length > 1 ? ['calc(100% - 70px)', 'calc(100% - 90px)', 'calc(100% - 110px)'] : ['calc(100% - 20px)', 'calc(100% - 30px)', 'calc(100% - 40px)'],
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {currentImage.caption}
        </Badge>
      )}
    </Box>
  )
}

export default HeroCarousel