import { Box, Text } from 'theme-ui'
import CarouselCards from './carousel-cards'
import { keyframes } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { Fade } from 'react-reveal'
/** @jsxImportSource theme-ui */

export default function Carousel({ cards = [] }) {
  const [speed, setSpeed] = useState(5)
  const [pageIsVisible, setPageIsVisible] = useState(true)
  const [move, setMove] = useState(true)

  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  return (
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        <Box sx={{ mt: 4 }}>
          <Text
            variant="eyebrow"
            as="h4"
            sx={{
              fontSize: ['22px', 2, 3],
              mt: [4, 4, 5],
              maxWidth: 'layout',
              width: '90vw',
              margin: 'auto'
            }}
          >
            Here are a few programs you could get involved in:
          </Text>
          <Ticker speed={speed} move={move} direction="toLeft">
            {() => (
              <Box
                as="div"
                sx={{ display: 'flex', py: [4, 5, 5] }}
                onMouseEnter={() => setSpeed(2)}
                onMouseLeave={() => setSpeed(5)}
              >
                {Array.isArray(cards) && cards.length > 0 ? (
                  cards.map((card, idx) => (
                    <CarouselCards key={idx} {...card} />
                  ))
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'muted' }}>
                    Loading programs...
                  </Box>
                )}
              </Box>
            )}
          </Ticker>
        </Box>
      )}
    </PageVisibility>
  )
}
