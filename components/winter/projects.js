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
import Photo1 from '../../public/winter/1.jpeg'
import Photo2 from '../../public/winter/2.png'
import Photo3 from '../../public/winter/3.jpeg'
import Photo4 from '../../public/winter/4.jpeg'
import Photo5 from '../../public/winter/5.jpeg'
import Photo6 from '../../public/winter/6.jpeg'
import Photo7 from '../../public/winter/7.jpeg'
import Photo8 from '../../public/winter/8.jpeg'
import Photo9 from '../../public/winter/9.jpeg'
import Photo10 from '../../public/winter/10.jpeg'
import Photo12 from '../../public/winter/12.jpeg'
import Photo13 from '../../public/winter/13.jpeg'
import Photo14 from '../../public/winter/14.jpeg'
import Photo15 from '../../public/winter/15.jpeg'
import Photo16 from '../../public/winter/16.jpeg'
import Photo17 from '../../public/winter/17.jpeg'
import Photo18 from '../../public/winter/18.jpeg'
import Photo19 from '../../public/winter/19.jpeg'
import Photo20 from '../../public/winter/20.jpeg'
import Photo21 from '../../public/winter/21.jpeg'
import Photo22 from '../../public/winter/22.jpeg'
import Photo23 from '../../public/winter/23.jpeg'
import Photo24 from '../../public/winter/24.jpeg'
import Photo25 from '../../public/winter/25.jpeg'
import Photo26 from '../../public/winter/26.jpeg'
import Photo27 from '../../public/winter/27.jpeg'
import Photo28 from '../../public/winter/28.jpeg'
import Photo29 from '../../public/winter/29.jpeg'
import Photo30 from '../../public/winter/30.jpeg'
import Photo31 from '../../public/winter/31.png'

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
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          maxHeight: '250px',
          overflow: 'hidden'
        }}
      >
        <img src={image} sx={{ width: '100%' }} />
      </Box>
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
            height: ['auto', '800px', '800px']
          }}
          pt={[5, 5, '50px']}
          pb={[5, 0, 0]}
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
                sx={{
                  textShadow: '0px 0px 21px #E1F1FF',
                  color: 'white',
                  fontSize: [4, 5, 6]
                }}
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
              <Grid columns={[1, 3, 3]} mt={4} mx={['5vw', 'auto', 'auto']}>
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https://avatars.slack-edge.com/2021-12-03/2798567440515_11b452bb2e685f7704f8_192.jpg&w=96&q=75"
                  username="obreymuchenajr"
                  description="only a few features left to apply on this assistant robot we are building with @edwardphirijr698 "
                  image="https://cloud-8pfb3hvnt.vercel.app/0obward.jpg"
                />
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https://avatars.slack-edge.com/2020-06-19/1188269280230_6bfefc5bfd4ddb3a9516_192.jpg&w=640&q=75"
                  username="chewtzihwee"
                  description="Working on a project with a custom PCB which was a first for me"
                  image="https://cloud-pyuq9xu7i.vercel.app/0image.png"
                />
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https://secure.gravatar.com/avatar/6af7218c982a84d6239ab5c1a2ae4ec8.jpg?s%3D192%26d%3Dhttps%253A%252F%252Fa.slack-edge.com%252Fdf10d%252Fimg%252Favatars%252Fava_0018-192.png&w=96&q=75"
                  username="jglav45"
                  description="Update on exoskeleton project: custom motor mounts have been 3D printed. They have been attached to the aluminum plates. Electronics are going not so smoothly, so troubleshooting is underway."
                  image="https://cloud-ir870iwuy.vercel.app/0image_from_ios.jpg"
                />
              </Grid>
              <Button
                as="a"
                variant="cta"
                href="https://scrapbook.hackclub.com/"
                sx={{
                  background:
                    'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
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
            display: ['none', 'block', 'block']
          }}
        >
          <PhotoRow photos={[Photo1, Photo2, Photo3, Photo4, Photo5]} />
          <PhotoRow photos={[Photo6, Photo7, Photo8, Photo9, Photo10]} />
          <PhotoRow photos={[Photo21, Photo12, Photo13, Photo14, Photo15]} />
          <PhotoRow photos={[Photo16, Photo17, Photo18, Photo19, Photo20]} />
        </Box>
      </Header>
    </Box>
  )
}
