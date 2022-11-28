import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import CarouselCards from './carousel-cards'
import { keyframes } from '@emotion/react'
import React, { useEffect, useState } from 'react'

const noOfCards = 7

const move = keyframes`
0% { transform: translateX(150vw); }
	100% { transform: translateX(-50vw)}
`

export default function Carousel() {
  return (
    <Box
      sx={{
        display: 'flex',
        animation: `${move} 10s linear infinite`,
        gap: '10px',
        width: '150vw',
        flexWrap: 'nowrap',
        transform: 'translateX(0)',
        animationPlayState: 'paused',
        '&:hover': {
          animationPlayState: 'paused'
        }
      }}
    >
      <CarouselCards
        background="black"
        titleColor="yellow"
        textColor="white"
        title="Sprig"
        description="🍃 Learn to code by making games in a JavaScript web-based game editor."
        img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
      />
      <CarouselCards
        background="black"
        titleColor="yellow"
        textColor="white"
        title="Sprig1"
        description="🍃 Learn to code by making games in a JavaScript web-based game editor."
        img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
      />
      <CarouselCards
        background="black"
        titleColor="yellow"
        textColor="white"
        title="Sprig2"
        description="🍃 Learn to code by making games in a JavaScript web-based game editor."
        img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
      />
      <CarouselCards
        background="black"
        titleColor="yellow"
        textColor="white"
        title="Sprig3"
        description="🍃 Learn to code by making games in a JavaScript web-based game editor."
        img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
      />
      <CarouselCards
        background="black"
        titleColor="yellow"
        textColor="white"
        title="Sprig4"
        description="🍃 Learn to code by making games in a JavaScript web-based game editor."
        img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
      />
      <CarouselCards
        background="black"
        titleColor="yellow"
        textColor="white"
        title="Sprig5"
        description="🍃 Learn to code by making games in a JavaScript web-based game editor."
        img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
      />
      <CarouselCards
        background="black"
        titleColor="yellow"
        textColor="white"
        title="Sprig6"
        description="🍃 Learn to code by making games in a JavaScript web-based game editor."
        img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
      />
    </Box>
  )
}
