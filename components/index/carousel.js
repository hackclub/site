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

export default function Carousel() {
  let [speed, setSpeed] = useState(5)

  const [pageIsVisible, setPageIsVisible] = useState(true)

  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  return (
    <PageVisibility onChange={handleVisibilityChange}>
      {pageIsVisible && (
        <Box sx={{mt: 4}}>
          <Text
            variant="eyebrow"
            as="div"
            sx={{
              fontSize: ['22px', 2, 3],
              mt: 4,
              maxWidth: 'layout',
              width: '90vw',
              margin: 'auto',
            }}
          >
            Here are a few projects you could get involved in:
          </Text>
          <Ticker speed={speed} sx={{ overflowX: 'hidden' }}>
            {() => (
              <Box
                as="div"
                sx={{ display: 'flex', py: [4, 5, 5] }}
                onMouseOver={() => setSpeed(3)}
                onMouseOut={() => setSpeed(6)}
              >
                <CarouselCards
                  background="#000"
                  titleColor="yellow"
                  descriptionColor="white"
                  title="Sprig"
                  description="Join hundreds of teenagers making tile-based JavaScript games"
                  img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
                  link="https://sprig.hackclub.com"
                />
                <CarouselCards
                  background="#000"
                  titleColor="#FF4794"
                  descriptionColor="white"
                  title="Epoch"
                  description="Attend the most epic high school hackathon this New Year's"
                  img="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-large/1f386@2x.png"
                  link="https://epoch.hackclub.com"
                />
                <CarouselCards
                  background="blue"
                  titleColor="white"
                  textColor="white"
                  title="Clubs network"
                  description="Join one of 400+ coding clubs around the world"
                  img="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-large/1f5fa-fe0f@2x.png"
                  link="/clubs"
                />
                <CarouselCards
                  background="dark"
                  titleColor="red"
                  textColor="white"
                  title="Hack Club Bank"
                  description="No. 1 fiscal sponsor for teenagers (we crossed $7 million in transactions)"
                  img="https://emoji.slack-edge.com/T0266FRGM/bank-hackclub-dark/8c6f85f387365072.png"
                  link="/bank"
                />
                <CarouselCards
                  background="snow"
                  titleColor="dark"
                  descriptionColor="black"
                  title="Some Assembly Required"
                  description="The 4th most starred Assembly repository on GitHub"
                  img="https://emoji.slack-edge.com/T0266FRGM/someassemblyrequired/cfacfacaaa2d8b1d.png"
                  link="https://github.com/hackclub/some-assembly-required"
                />
                <CarouselCards
                  background="#271932"
                  titleColor="#CAB4D4"
                  textColor="#CAB4D4"
                  title="Sinerider"
                  description="Help build a game about love, math, and graphing 💖"
                  img="https://emoji.slack-edge.com/T0266FRGM/sinerider/68a0bc1208e885dd.png"
                  link="https://sinerider.hackclub.com"
                />
                <CarouselCards
                  background="black"
                  titleColor="yellow"
                  textColor="white"
                  title="High school Hackathons"
                  description="🔍 A curated list of high school hackathons with hundreds of events"
                  img="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-large/1f469-200d-1f4bb@2x.png"
                  link="/hackathons"
                />
                <CarouselCards
                  background="snow"
                  titleColor="dark"
                  descriptionColor="black"
                  title="Workshops"
                  description="100+ coding workshops to build a project in under an hour"
                  img="https://a.slack-edge.com/production-standard-emoji-assets/14.0/apple-large/1f4bb@2x.png"
                  link="https://workshops.hackclub.com"
                />
              </Box>
            )}
          </Ticker>
        </Box>
      )}
    </PageVisibility>
  )
}
