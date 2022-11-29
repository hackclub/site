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

const Cards = ({ avatar, username, description, image }) => {
  return (
    <Card
      className="post"
      sx={{ p: [3, 3], width: '100%', background: 'rgba(225,225,225,0.9)' }}
    >
      <Flex
        as="a"
        href={`https://scrapbook.hackclub.com/`}
        sx={{
          color: 'inherit',
          textDecoration: 'none',
          alignItems: 'center',
          mb: 2
        }}
      >
        <Avatar loading="lazy" src={avatar} alt="" mr={2} />
        <Box>
          <Text variant="subheadline" my={0} fontSize={[1, 1]}>
            @{username}
          </Text>
        </Box>
      </Flex>
      <Text
        as="p"
        sx={{
          fontSize: 1,
          textAlign: 'left',
          mb: 2,
          a: {
            color: 'primary',
            wordBreak: 'break-all',
            wordWrap: 'break-word'
          },
          '> div': { width: 18, height: 18 }
        }}
      >
        {description}
      </Text>
      <img src={image} sx={{ width: '100%' }} />
    </Card>
  )
}

export default function Projects() {
  const [count, setCount] = useState(0)

  let list = [
    'mechanical keyboard',
    '3D printer',
    'drone',
    'CNC machine',
    'pixel art display',
    'camera'
  ]

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
            height: '800px'
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
                      top: -3,
                      right: -4
                    }}
                  />
                </Text>
              </Heading>
              <Grid columns={[1, 3, 3]} mt={4}>
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https://avatars.slack-edge.com/2021-07-09/2257244348787_a6641b8fe5463f3690a8_192.jpg&w=96&q=75"
                  username="vineetkaemail"
                  description="I made an IoT device last month that used to count how many times I enter or leave my room. It plugs into any USB port, connects to the WiFi and starts working instantly."
                  image="https://cloud-e1fn2ugnf.vercel.app/0img_20200907_111148_ll.jpg"
                />
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https://avatars.slack-edge.com/2021-06-21/2215194850128_1326a9ce1fd28c15e4ed_192.jpg&w=96&q=75"
                  username="akshaygautam010"
                  description="I had nearly forgotten the joy of disassembling things, 🤪 feels awesome to be back. The base is taking shape now...."
                  image="https://cloud-hdyb4x8cj.vercel.app/0img20200916145227.jpg"
                />
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https://secure.gravatar.com/avatar/6af7218c982a84d6239ab5c1a2ae4ec8.jpg?s%3D192%26d%3Dhttps%253A%252F%252Fa.slack-edge.com%252Fdf10d%252Fimg%252Favatars%252Fava_0018-192.png&w=96&q=75"
                  username="toyatakahashi522"
                  description="Yay the display matches what I type in real time."
                  image="https://cloud-6avjg2xpp-hack-club-bot.vercel.app/00image_from_ios_1.png"
                />
              </Grid>
              <Button
                as="a"
                variant="cta"
                href="https://scrapbook.hackclub.com/"
                sx={{
                  background: 'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
                  mt: 2
                }}
              >
                Keep exploring →
              </Button>
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
          <PhotoRow
            photos={[HackPenn, ElonAMA, SpaceX, GoldenTrain, Flagship]}
          />
          <PhotoRow
            photos={[HackPenn, ElonAMA, SpaceX, GoldenTrain, Flagship]}
          />
        </Box>
      </Header>
    </Box>
  )
}
