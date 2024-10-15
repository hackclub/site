import { useState, useEffect, useReducer } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Box, Text, Flex, Image, Button } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import { Zoom } from 'react-reveal'
import Countdown from '../components/ysws/countdown'

const projects = [
  {
    name: 'Sprig',
    tagline: 'Every player is a creator.',
    images: [
      'https://sprig.hackclub.com/stories-tiny/sprig-front.jpeg',
      'https://sprig.hackclub.com/stories-tiny/sprig-back.jpeg',
      'https://sprig.hackclub.com/stories-tiny/play.jpeg',
      'https://sprig.hackclub.com/stories-big/develop.jpeg',
      'https://sprig.hackclub.com/stories-big/orpheus.jpeg'
    ],
    stickers: ['/stickers/sprig.svg', '/stickers/sprig_holographic.png']
  },
  {
    name: 'Blot',
    tagline: 'Drawing machine',
    images: [
      'https://blot.hackclub.com/assets/control-board.webp',
      'https://blot.hackclub.com/assets/all-parts.jpg',
      'https://blot.hackclub.com/assets/code2.webp',
      'https://blot.hackclub.com/assets/editor.png',
      'https://raw.githubusercontent.com/hackclub/blot/main/art/tree-leo/snapshots/tree.png'
    ],
    stickers: ['/stickers/Blot.png']
  },
  {
    name: 'Bin',
    tagline: 'Bin description.',
    images: [
      'https://cloud-6hdo013ly-hack-club-bot.vercel.app/0buzzer.png',
      'https://hackclub.com/bin/parts/pico.png',
      'https://hackclub.com/bin/parts/led.png',
      'https://hackclub.com/bin/parts/humidity.png',
      'https://cloud-ofybe0euz-hack-club-bot.vercel.app/00oky3527-max7219-dot-matrix-module-single-3.png'
    ],
    stickers: ['/stickers/sprig.svg', '/stickers/sprig_holographic.png']
  },
  {
    name: 'Boba Drops',
    tagline: 'Boba drops description',
    images: [
      'https://sprig.hackclub.com/stories-tiny/sprig-front.jpeg',
      'https://sprig.hackclub.com/stories-tiny/sprig-back.jpeg'
    ],
    stickers: ['/stickers/sprig.svg', '/stickers/sprig_holographic.png']
  },
  {
    name: 'Bin',
    tagline: 'Bin description.',
    images: ['/stickers/sprig.svg'],
    stickers: ['/stickers/sprig.svg', '/stickers/sprig_holographic.png']
  }
]

const StyledImageBase = styled(Image)`
  width: 30rem;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
`

const StyledImage = styled(StyledImageBase)`
  position: absolute;
`

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(25%);
    opacity: 1;
  }
`

const slideInFromRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(-25%);
    opacity: 1;
  }
`

const AnimatedText = styled(Text)`
  display: inline-block;
`

const YouShipText = styled(AnimatedText)`
  opacity: 0;
  animation: ${slideInFromRight} 0.5s ease-out forwards;
`

const WeShipText = styled(AnimatedText)`
  opacity: 0;
  animation: ${slideInFromLeft} 0.5s ease-out forwards 0.5s;
`

const RotatingBox = styled(Box)`
  will-change: transform;
  transform-style: preserve-3d;
  transition: transform 0.25s ease-in-out;
`

const randRot = () => Math.random() * 60 - 30

const initialState = {
  currentProjectIdx: 0,
  rotAngle: 0,
  imageRotations: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'PROJECT_TICK':
      console.log('tick!', state.imageRotations.length, state.currentProjectIdx)
      return {
        ...state,
        currentProjectIdx:
          state.imageRotations.length >= 5
            ? (state.currentProjectIdx + 1) % projects.length
            : state.currentProjectIdx,
        rotAngle: (360 / projects.length) * (state.currentProjectIdx + 1 - 1),
        imageRotations: [...state.imageRotations, randRot()]
      }
    default:
      return state
  }
}

export default function Component() {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'PROJECT_TICK' })
    }, 1_000)
    return () => clearInterval(interval)
  }, [])

  const currentProject = projects[state.currentProjectIdx]

  return (
    <>
      <Box as="main">
        <Meta
          as={Head}
          title="You Ship, We Ship"
          description="You Ship, We Ship."
        />
        <style>{`
          @font-face {
  					font-family: '7Seg';
  					src: url('https://cloud-6okxw4gi2-hack-club-bot.vercel.app/0seven_segment.ttf') format('truetype');
						font-weight: 500;
						font-style: normal;
						font-display: swap;
					}

					html { scroll-behavior: smooth }
			`}</style>
        <Nav light />
        <ForceTheme theme={'light'} />

        <Flex
          as="header"
          sx={{
            pt: 5,
            flexDirection: 'column',
            alignItems: 'center',
            bg: 'blue',
            height: '80vh'
          }}
        >
          <Text
            as="h1"
            sx={{
              position: 'relative',
              fontSize: ['4rem', '5rem'],
              lineHeight: 1.2,
              color: 'white'
            }}
          >
            <Zoom duration={500}>
              <Image
                src="/arcade/o3.png"
                alt=""
                width={128}
                sx={{ position: 'absolute', left: '-75%' }}
              />
            </Zoom>
            <YouShipText sx={{ position: 'relative' }}>You Ship,</YouShipText>
            <br />
            <WeShipText>We Ship</WeShipText>

            <Zoom delay={500} duration={500}>
              <Image
                src="/ysws/brown_prioritymail_box.png"
                alt="USPS priority mail cardboard box"
                width={128}
                sx={{ position: 'absolute', right: '-60%', bottom: 0 }}
              />
            </Zoom>
          </Text>

          <Box
            sx={{
              marginX: 'auto',
              width: '100%',
              maxWidth: '60vw',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginY: 4
            }}
          >
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                height: '100%',
                perspective: '50px'
              }}
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  color: 'white',
                  position: 'relative'
                }}
              >
                <p className="p-3 text-red-500 z-50">
                  {currentProject.name} - {state.currentProjectIdx}
                </p>
                <RotatingBox
                  data-angle={state.rotAngle}
                  sx={{ transform: `rotate3d(1, 0, 0, ${state.rotAngle}deg)` }}
                >
                  {projects.toReversed().map((p, idx) => {
                    const radius = 120

                    const theta = idx * ((2 * Math.PI) / projects.length)
                    const x = radius * Math.cos(theta)
                    const y = radius * Math.sin(theta)

                    const angle = (theta * 180) / Math.PI + 360

                    return (
                      <Flex
                        key={idx}
                        sx={{
                          backfaceVisibility: 'hidden',
                          position: 'absolute',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          color: 'white',
                          translate: '0 -50% 0',
                          transform: `translate3d(0, ${y}px, ${x}px) rotate3d(1, 0, 0, ${angle}deg)`,
                          width: '100%',
                          willChange: 'transform'
                        }}
                      >
                        <Text sx={{ fontSize: '4rem', fontWeight: 'bold' }}>
                          {p.name}
                        </Text>
                        <Text sx={{ fontSize: '2rem' }}>{p.tagline}</Text>
                      </Flex>
                    )
                  })}
                </RotatingBox>

                {/* <Image
                  src={currentProject.stickers[0]}
                  alt=""
                  width={64}
                  height={64}
                  sx={{ rotate: '-15deg', position: 'absoulute', top: 0 }}
                />

                <Image
                  src={currentProject.stickers[1]}
                  alt=""
                  width={64}
                  height={64}
                  sx={{ rotate: '30deg' }}
                /> */}
              </Flex>

              <Box
                sx={{
                  flexGrow: 1,
                  position: 'relative',
                  height: '100%'
                }}
              >
                {state.imageRotations.map((rot, idx) => (
                  <StyledImage
                    key={idx}
                    src={
                      currentProject.images[idx % currentProject.images.length]
                    }
                    alt=""
                    sx={{
                      left: '50%',
                      top: '50%',
                      transform: `rotate(${rot}deg)`,
                      translate: '-50% -50%',
                      zIndex: idx,
                      opacity: (idx + 1) / state.imageRotations.length,
                      transition: 'opacity 0.5s'
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Flex>

        <Flex
          sx={{
            flexDirection: 'column',
            maxWidth: '80ch',
            marginX: 'auto',
            textAlign: 'center',
            alignItems: 'center',
            py: 4
          }}
        >
          <Text as="h2" sx={{ lineHeight: 1.2 }}>
            LIMITED TIME EVENT
            <br />
            <Text sx={{ fontSize: '1.8em' }}>LLM Workshop</Text>
          </Text>

          <Countdown targetDate={new Date('2024-10-12T23:59:59')} />

          <Flex sx={{ flexDirection: 'column', marginY: 4, gap: 3 }}>
            <Button sx={{ width: '100%', fontSize: '2em' }}>Get a book</Button>
            <StyledImageBase
              src="https://sprig.hackclub.com/stories-tiny/sprig-front.jpeg"
              width="50%"
              alt=""
            />
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
