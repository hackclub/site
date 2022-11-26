import React, { useState } from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Card,
  Grid,
  Link as A,
  Text,
  Avatar,
  Image
} from 'theme-ui'
import Photo from '../../components/photo'
import NextImage from 'next/image'
import Marquee from 'react-marquee-slider'
import ExecuteBig from '../../public/donate/codedaydc_hack.jpg'
import HackCamp from '../../public/donate/sf.jpg'
import HackerGames from '../../public/donate/0img_20210830_161125.jpg'
import LaptopDonations from '../../public/donate/0screenshot_2021-10-03_at_4.20.30_pm.png'
import Kerala from '../../public/donate/0img-20210918-wa0091.jpg'
import HackPenn from '../../public/donate/0color_pop.jpg'
import ElonAMA from '../../public/donate/elon.jpg'
import SpaceX from '../../public/donate/0spacex_and_hack_club.jpg'
import Flagship from '../../public/donate/flagship.png'
import GoldenTrain from '../../public/home/golden-train.png'
/** @jsxImportSource theme-ui */

const Header = styled(Box)`
  background: url('/pattern.svg');
`

const Sheet = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  color: white;
`
Sheet.defaultProps = {
  sx: {
    bg: 'rgba(255, 255, 255, 0.875)',
    p: [3, 4],
    color: 'black',
    width: 1,
    mb: 4
  }
}

const Row = styled(Box)`
  text-align: left;
  @media screen and (min-width: 48em) {
    display: grid;
    grid-gap: 18px;
    grid-template-columns: ${({ reverse }) =>
      reverse ? '3fr 2fr' : '2fr 3fr'};
  }
`

Sheet.defaultProps = {
  sx: {
    maxWidth: '52rem',
    fontSize: 3,
    p: [4, 5],
    color: 'white'
  }
}
const PhotoRow = ({ photos }) => (
  <Box sx={{ height: '200px', overflow: 'hidden' }}>
    <Box sx={{ display: ['block', 'block', 'block', 'block', 'none'] }}>
      <Marquee velocity={12}>
        {photos.map((photo, index) => (
          <NextImage
            placeholder="blur"
            src={photo}
            objectFit="cover"
            className="next-image"
            height="200px"
            width="300px"
            alt="Hack Club students"
            key={'image-' + index}
          />
        ))}
      </Marquee>
    </Box>
    <Box sx={{ display: ['none', 'none', 'none', 'none', 'block'] }}>
      <Marquee velocity={12}>
        {photos.map((photo, index) => (
          <NextImage
            placeholder="blur"
            src={photo}
            objectFit="cover"
            className="next-image"
            height="200px"
            width="600px"
            key={'image-' + index}
            alt="Hack Club students"
          />
        ))}
      </Marquee>
    </Box>
  </Box>
)

export default function Projects() {
  const [count, setCount] = useState(0)

  let list = ['mechanical keyboard', '3D printer', 'drone', 'CNC machine']

  if (count == list.length - 1) {
    setCount(0)
  }

  let project_idea = list[count]

  return (
    <Box>
      <Header sx={{ position: 'relative' }}>
        <Box
          sx={{
            background: 'rgba(0,0,0, 0.8)',
            zIndex: 1,
            position: 'relative',
            color: 'white!important',
            height: '400px'
          }}
          pt={[5, 5, '110px']}
        >
          <Box
            sx={{
              maxWidth: '64rem',
              mx: 'auto',
              zIndex: 1,
              position: 'relative'
            }}
            align="center"
            py={2}
            px={[1, 3]}
          >
            <Container sx={{ maxWidth: '48rem' }}>
              <Heading
                variant="title"
                sx={{ textShadow: '0px 0px 21px #E1F1FF', color: 'white' }}
              >
                You could be building a{' '}
                <Text
                  sx={{
                    backgroundColor: '#406BAB',
                    py: 2,
                    px: 3,
                    borderRadius: 10,
                    position: 'relative',
                    lineHeight: '1.5'
                  }}
                  onClick={() => setCount(count + 1)}
                >
                  <Box
                    as="span"
                    sx={{ whiteSpace: 'nowrap', cursor: 'pointer' }}
                  >
                    {project_idea}
                  </Box>
                  <Image
                    src="https://cloud-ohzuz4m3t-hack-club-bot.vercel.app/0click_me.svg"
                    alt="click me"
                    sx={{
                      position: 'absolute',
                      top: -4,
                      right: -5
                    }}
                  />
                </Text>
              </Heading>
            </Container>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            zIndex: 0,
            width: '100%',
            display: 'block'
          }}
        >
          <PhotoRow
            photos={[
              ExecuteBig,
              HackCamp,
              HackerGames,
              LaptopDonations,
              Kerala
            ]}
          />
          <PhotoRow
            photos={[HackPenn, ElonAMA, SpaceX, GoldenTrain, Flagship]}
          />
        </Box>
      </Header>
    </Box>
  )
}
