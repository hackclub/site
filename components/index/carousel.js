import { Box, Text } from 'theme-ui'
import CarouselCards from './carousel-cards'
import { keyframes } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { Fade } from 'react-reveal'
/** @jsxImportSource theme-ui */

const subtleBounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
`

export default function Carousel({ cards }) {
  let [speed, setSpeed] = useState(5)
  const [pageIsVisible, setPageIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

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
              mt: [4, 4, 2],
              maxWidth: 'layout',
              width: '90vw',
              margin: 'auto'
            }}
          >
            Featured Iniatives
          </Text>
          <Ticker speed={speed} sx={{ overflowX: 'hidden' }}>
            {() => (
              <Box
                as="div"
                sx={{
                  display: 'flex',
                  py: [4, 5, 5],
                  '& > *': {
                    animation: isHovered
                      ? 'none'
                      : `${subtleBounce} 2s infinite ease-in-out`,
                    '&:nth-of-type(n)': {
                      animationDelay: i => `${i * 0.2}s`
                    },
                    transition:
                      'transform 0.3s cubic-bezier(.68,-0.55,.27,1.55)',
                    '&:hover': {
                      transform: 'translateY(-12px) scale(1.03)',
                      boxShadow: '0 12px 20px rgba(0,0,0,0.1)',
                      zIndex: 3
                    }
                  }
                }}
                onMouseOver={() => {
                  setSpeed(2)
                  setIsHovered(true)
                }}
                onMouseOut={() => {
                  setSpeed(6)
                  setIsHovered(false)
                }}
              >
                {cards.map((card, idx) => (
                  <CarouselCards
                    key={idx}
                    {...card}
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  />
                ))}
              </Box>
            )}
          </Ticker>
        </Box>
      )}
    </PageVisibility>
  )
}
