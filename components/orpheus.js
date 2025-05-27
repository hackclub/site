import React, { useEffect, useState, useRef } from 'react'
import { Box, Image } from 'theme-ui'

// Import Orpheus images
import HiOrpheus from '../public/orpheus/hi-orpheus.gif'
import BuilderOrpheus from '../public/orpheus/builder-orpheus.png'
import BinocularsOrpheus from '../public/orpheus/binoculars-orpheus.png'
import PlushieOrpheus from '../public/orpheus/plushie-orpheus.png'

// Define the sections and their corresponding images and sounds
const sections = [
  {
    id: 'joy-of-code-section',
    image: HiOrpheus.src
  },
  {
    id: 'spotlight', // This ID already exists in index.js for the 'builders' section
    image: BuilderOrpheus.src
  },
  {
    id: 'open-source-section',
    image: BinocularsOrpheus.src
  },
  {
    id: 'community-section',
    image: PlushieOrpheus.src
  }
]

const Orpheus = () => {
  const [currentImage, setCurrentImage] = useState(sections[0].image)
  const [currentSectionId, setCurrentSectionId] = useState(null)

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const viewportBottom = window.scrollY + window.innerHeight
      let activeSectionId = null

      // Check which section the bottom of the viewport is currently in
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = rect.bottom + window.scrollY

          // Check if the bottom of the viewport is within the section's bounds
          // Add a small buffer (e.g., 100px) to trigger slightly before the very bottom
          const buffer = 100
          if (
            viewportBottom >= elementTop + buffer &&
            viewportBottom <= elementBottom
          ) {
            activeSectionId = section.id
            break // Found the active section, stop checking
          }
        }
      }

      // If an active section is found and it's different from the current one
      if (activeSectionId && activeSectionId !== currentSectionId) {
        const activeSection = sections.find(s => s.id === activeSectionId)
        if (activeSection) {
          setCurrentImage(activeSection.image)
          setCurrentSectionId(activeSectionId)
        }
      } else if (
        !activeSectionId &&
        currentSectionId !== sections[0].id &&
        window.scrollY < window.innerHeight
      ) {
        // If no section is active and we are near the top of the page, revert to the first image
        setCurrentImage(sections[0].image)
        setCurrentSectionId(sections[0].id)
      }
    }

    // Add scroll listener
    window.addEventListener('scroll', handleScroll)
    // Also run on mount to set initial state if a section is visible
    handleScroll()

    // Clean up scroll listener
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [currentSectionId]) // Re-run effect if current section changes

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: [0, 0], // Responsive bottom margin, moved closer to corner
        right: [0, 0], // Responsive right margin, moved closer to corner
        zIndex: 1000, // Ensure it's above other content
        width: ['80px', '200px', '250px'], // 80px on mobile, 200px on tablet, 250px on desktop
        height: ['80px', '200px', '250px'], // 80px on mobile, 200px on tablet, 250px on desktop
        pointerEvents: 'none', // Don't block clicks
        display: 'block' // Always display
      }}
    >
      <Image
        src={currentImage}
        alt="Orpheus"
        sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  )
}

export default Orpheus
