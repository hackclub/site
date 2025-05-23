import { Box, Button, Text } from 'theme-ui'
import ProjectCards from './project-cards'
import { keyframes } from '@emotion/react'
import React, { useEffect, useState } from 'react'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { Fade } from 'react-reveal'
/** @jsxImportSource theme-ui */

export default function ProjectsSlider({ cards }) {
  let [speed, setSpeed] = useState(5)

  const [pageIsVisible, setPageIsVisible] = useState(true)

  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  return (
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        <Box sx={{ mt: 4, zIndex: 999 }}>
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
            Some of the recent Cool Projects made by Hack Clubbers.
          </Text>
    <Ticker speed={speed} sx={{ overflowX: 'hidden' }}>
    {() => (
        <Box
        as="div"
        sx={{ display: 'flex', py: [4, 5, 5] }}
        onMouseOver={() => setSpeed(2)}
        onMouseOut={() => setSpeed(6)}
        >
        {cards.map((card, idx) => (
            <ProjectCards key={idx} {...card} />
        ))}
        </Box>
    )}
    </Ticker>

    <Box sx={{ textAlign: 'center', mt: 3 }}>
    <Button as="a" href="/ship" target="_blank" rel="noopener noreferrer">Check more</Button>
    </Box>
        </Box>
      )}
    </PageVisibility>
  )
}
