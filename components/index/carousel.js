import { Box, Text } from 'theme-ui'
import CarouselCards from './carousel-cards'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
/** @jsxImportSource theme-ui */

const Ticker = dynamic(() => import('react-ticker'), { ssr: false })

export default function Carousel({ cards }) {
  let [speed, setSpeed] = useState(5)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
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
          Here are a few projects you could get involved in:
        </Text>
        <Box sx={{ display: 'flex', py: [4, 5, 5], overflowX: 'auto' }}>
          {cards.map((card, idx) => (
            <CarouselCards key={idx} {...card} />
          ))}
        </Box>
      </Box>
    )
  }

  return (
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
        Here are a few projects you could get involved in:
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
              <CarouselCards key={idx} {...card} />
            ))}
          </Box>
        )}
      </Ticker>
    </Box>
  )
}
