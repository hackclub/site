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
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import { Fade } from 'react-reveal'
/** @jsxImportSource theme-ui */

// const noOfCards = 7

// const move = keyframes`
// 0% { transform: translateX(150vw); }
// 	100% { transform: translateX(-50vw)}
// `

export default function Carousel() {
  let [speed, setSpeed] = useState(5)

  const [pageIsVisible, setPageIsVisible] = useState(true)

  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  return (
    // <Box
    //   sx={{
    //     display: 'flex',
    //     animation: `${move} 10s linear infinite`,
    //     gap: '10px',
    //     width: '150vw',
    //     flexWrap: 'nowrap',
    //     transform: 'translateX(0)',
    //     animationPlayState: 'paused',
    //     '&:hover': {
    //       animationPlayState: 'paused'
    //     }
    //   }}
    // >
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        <Box>
          <Box sx={{ maxWidth: 'layout', margin: 'auto', pt: [3, 4, 5] }} as="div">
            <Text variant="eyebrow" sx={{ fontSize: [1, 2, 3], mt: 4 }}>
              Here's a few projects you could get involved in:
            </Text>
          </Box>
          <Ticker speed={speed} sx={{ overflowX: 'hidden' }}>
            {() => (
              <Box
                as="div"
                sx={{ display: 'flex', py: 4 }}
                onMouseOver={() => setSpeed(3)}
                onMouseOut={() => setSpeed(6)}
              >
                <CarouselCards
                  background="#000"
                  titleColor="yellow"
                  descriptionColor="white"
                  title="Sprig"
                  description="Learn to code by making games in a JavaScript game editor."
                  img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
                  link="https://sprig.hackclub.com"
                />
                <CarouselCards
                  background="#000"
                  titleColor="#FF4794"
                  descriptionColor="white"
                  title="EPOCH"
                  description="The most epic high school hackathon this new years!."
                  img="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-large/1f386@2x.png"
                  link="https://epoch.hackclub.com"
                />
                <CarouselCards
                  background="blue"
                  titleColor="white"
                  textColor="white"
                  title="Clubs network"
                  description="High school students come together to have fun and code, IRL"
                  img="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-large/1f5fa-fe0f@2x.png"
                  link="/clubs"
                />
                <CarouselCards
                  background="dark"
                  titleColor="red"
                  textColor="white"
                  title="Hack Club Bank"
                  description="Fiscal sponsorship and banking platform to organize anything."
                  img="https://emoji.slack-edge.com/T0266FRGM/bank-hackclub-dark/8c6f85f387365072.png"
                  link="/bank"
                />
                <CarouselCards
                  background="#271932"
                  titleColor="#CAB4D4"
                  textColor="#CAB4D4"
                  title="Sinerider"
                  description="💖 A game about love, math, and graphing built by teenagers!"
                  img="https://emoji.slack-edge.com/T0266FRGM/sinerider/68a0bc1208e885dd.png"
                  link="https://sinerider.hackclub.com"
                />
                <CarouselCards
                  background="black"
                  titleColor="yellow"
                  textColor="white"
                  title="High school Hackathons"
                  description="🔍 A curated list of high school hackathons"
                  img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
                  link="/hackathons"
                />
                <CarouselCards
                  background="snow"
                  titleColor="dark"
                  descriptionColor="black"
                  title="Workshops"
                  description="100+ short coding workshops to start building"
                  img="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-large/1f4bb@2x.png"
                  link="https://workshops.hackclub.com"
                />
              </Box>
            )}
          </Ticker>
        </Box>
      )}
    </PageVisibility>
    // </Box>
  )
}
