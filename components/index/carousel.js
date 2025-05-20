import { Box, Text } from 'theme-ui'
import CarouselCards from './carousel-cards'
import { keyframes } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { Fade } from 'react-swift-reveal'
/** @jsxImportSource theme-ui */

export default function Carousel({ cards }) {
  let [speed, setSpeed] = useState(5)

  const [pageIsVisible, setPageIsVisible] = useState(true)

  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  return (
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        <Box as="section" sx={{
          mt: 4,
          width: '90vw',
          maxWidth: 'layout',
          mx: 'auto',
          overflow: 'hidden',
          position: 'relative',
          '&::before, &::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '150px',
            zIndex: 2,
            pointerEvents: 'none'
          },
          '&::before': {
            left: 0,
            background: 'linear-gradient(to right, rgba(10, 15, 44, 1), rgba(10, 15, 44, 0))'
          },
          '&::after': {
            right: 0,
            background: 'linear-gradient(to left, rgba(10, 15, 44, 1), rgba(10, 15, 44, 0))'
          }
        }}>
          <Text
            variant="eyebrow"
            as="h4"
            sx={{
              fontSize: ['22px', 2, 3],
              mt: [4, 4, 5],
              textAlign: 'center'
            }}
          >
            Here are a few projects you could get involved in:
          </Text>
          <Ticker speed={speed}>
            {() => (
              <Box
                as="div"
                sx={{
                  display: 'flex',
                  py: [4, 5, 5],
                  width: '100%'
                }}
                onMouseOver={() => setSpeed(2)}
                onMouseOut={() => setSpeed(6)}
              >
                {cards.map((card, idx) => (
                  <CarouselCards key={idx} {...card} />
                ))}
              </Box>
            )}
          </Ticker>
        </Box>
      )}
    </PageVisibility>
  )
}
