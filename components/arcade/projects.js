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
  <Box sx={{ height: '225px', overflow: 'hidden' }}>
    <Box sx={{ display: ['block', 'block', 'block', 'block', 'none'] }}>
      <Marquee velocity={12}>
        {photos.map((photo, index) => (
          <NextImage
            placeholder="blur"
            src={photo}
            objectFit="cover"
            className="next-image"
            height="225px"
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
      sx={{ p: [3, 3], width: '100%', background: '#FAEFD6', color: '#5E3414' }}
    >
      <Flex
        as="a"
        href={
          username !== 'cjmika110'
            ? `https://scrapbook.hackclub.com/${username}`
            : 'https://scrapbook.hackclub.com'
        }
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
          height: '200px',
          overflow: 'hidden',
          backgroundImage: `url('${image}')`,
          backgroundSize: '100%',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* <img src={image} sx={{ width: '100%' }} /> */}
      </Box>
    </Card>
  )
}

export default function Projects() {
  const [count, setCount] = useState(0)

  let list = [
    'Drawing robot',
    '3D printer',
    "DIY Electric Skateboard",
    'Pixel art display',
    "Smart Garden",
    'CNC machine',
    "Interactive LED Art",
    "VR Escape Room",
    "Image Recognition App",
    'DIY Camera',
    "Multiplayer AR Game",
    "Drone Swarm Choreography"
  ]

  if (count === list.length - 1) {
    setCount(0)
  }

  let project_idea = list[count]

  return (
    <Box>
      <Header sx={{ position: 'relative' }}>
        <Box
          sx={{
            background: ['#D0BF97 url(/arcade/white_bg.svg) no-repeat center center', '#D0BF97 url(/arcade/white_bg.svg) no-repeat center center', 'rgba(0,0,0, 0.8)', 'rgba(0,0,0, 0.8)'],
           backgroundSize: 'cover', 
           zIndex: 1,
            position: 'relative',
            color: 'white!important',
            height: ['auto', 'auto', '900px', '900px']
          }}
          pt={[5, 5, 5, '50px']}
          pb={[5, 5, 0, 0]}
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
                variant="headline"
                sx={{
                  textShadow: '0px 0px 21px #FAEFD6',
                  color: '#FAEFD6',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: [2, 4, 5]
                }}
              >
                <Text>You could be building a</Text>
                <Text
                  sx={{
                    backgroundColor: '#FF5C00',
                    py: 2,
                    px: 3,
                    borderRadius: 10,
                    position: 'relative',
                    width: 'fit-content',
                    height: 'min-content',
                    cursor: 'pointer',
                    userSelect: 'none',
                    color: '#FAEFD6'
                  }}
                  onClick={() => setCount(count + 1)}
                >
                  <Box as="span" sx={{ whiteSpace: 'nowrap' }}>
                    {project_idea}
                  </Box>
                </Text>
              </Heading>
              <Grid columns={[1, 1, 3, 3]} mt={4} mx={['5vw', '5vw', 'auto', 'auto']} >
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Favatars.slack-edge.com%2F2024-05-06%2F7077145829972_8597fe575e09a698859c_192.png&w=48&q=75"
                  username="elijah"
                  description="Finally shipped my personal ai clone and had a ton of fun playing around with it and seeing what other people did with it! Personal favorite was when it threatened to kill me and got very unhinged when the person threatened to send screenshots to me"
                  image="https://scrapbook-into-the-redwoods.s3.amazonaws.com/4d4ecc40-c388-4b9d-997f-1f3d6a21302c-image.png"
                />
                <Cards
                  avatar="https://scrapbook.hackclub.com/_next/image?url=https%3A%2F%2Favatars.slack-edge.com%2F2023-04-15%2F5116546887938_afb907f96fa13e434a49_192.png&w=48&q=75"
                  username="cupcakes"
                  description="Assembling blot robot! 🪛"
                  image="https://scrapbook-into-the-redwoods.s3.amazonaws.com/e75cf24a-46d9-45fa-92d3-b9e5862d0d47-img_2442.jpg"
                />
                <Cards
                  avatar="https://www.gravatar.com/avatar/04484b2178b8fd17c5a529c54614e14c?d=identicon&r=pg"
                  username="cjmika110"
                  description="Tired of QWERTY keyboards? Is typing too intuitive for you? Karl the Keyboard is a portable, squishable, fun, easy- to-use binary keyboard! Instead of pressing keys, you move a joystick up and down to represent ones..."
                  image="https://assemble-images.hackclub.com/a34cbf72-7023-424a-8239-abf4146529e8-Untitled%20drawing%20(1).png"
                />
              </Grid>
              <Button
                as="a"
                variant="cta"
                href="https://scrapbook.hackclub.com/"
                sx={{
                  background:
                    'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
                  mt: 4
                }}
              >
                See more projects →
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
            display: ['none', 'none', 'block', 'block']
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
