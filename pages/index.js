import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import BGImg from '../components/background-image'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import FooterImgFile from '../public/home/footer.png'
import Stage from '../components/stage'
import devtools from '../node_modules/devtools-detect/index.js'
import Carousel from '../components/index/carousel'
import Sprig from '../components/index/cards/sprig'
import Sinerider from '../components/index/cards/sinerider'
import SprigConsole from '../components/index/cards/sprig-console'
import Clubs from '../components/index/cards/clubs'
import Workshops from '../components/index/cards/workshops'
import Bank from '../components/index/cards/bank'
import Epoch from '../components/index/cards/epoch'
import Hackathons from '../components/index/cards/hackathons'
import Flip from 'react-reveal/Flip'
import Fade from 'react-reveal/Fade'
import AssembleImgFile from '../public/home/assemble.jpg'
import { get } from 'lodash'
import useSWR from 'swr'
import Konami from 'react-konami-code'
import Secret from '../components/secret'
import MailingList from '../components/index/cards/mailing-list'
import Slack from '../components/index/cards/slack'
import Events from '../components/index/cards/events'
import Icon from '../components/icon'
import GitHub from '../components/index/github'
import Photo from '../components/photo'
import ReactTooltip from 'react-tooltip'
import Winter from '../components/index/cards/winter'

function Page({
  hackathonsData,
  bankData,
  slackData,
  gitHubData,
  gitHubDataLength,
  stars,
  // githubData2,
  dataPieces,
  game,
  gameTitle,
  events
}) {
  let [gameImage, setGameImage] = useState('')
  let [gameImage1, setGameImage1] = useState('')
  let [reveal, setReveal] = useState(false)
  const [hover, setHover] = useState(true)
  let [github, setGithub] = useState(0)
  let [slackKey, setSlackKey] = useState(0)
  let [key, setKey] = useState(0)

  useEffect(() => {
    function getNewGitHubActivity() {
      setKey(Math.random())
      setGithub(Math.floor(Math.random() * gitHubDataLength))
      console.log(gitHubData[github])
    }
    setInterval(getNewGitHubActivity, 30000)
  }, [])

  const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  useEffect(() => {
    window.kc = `In the days of old, when gaming was young \nA mysterious code was found among \nA sequence of buttons, pressed in a row \nIt unlocked something special, we all know \n\nUp, up, down, down, left, right, left, right \nB, A, Start, we all have heard it's plight \nIn the 8-bit days, it was all the rage \nAnd it still lives on, with time, it will never age \n\nKonami Code, it's a legend of days gone by \nIt's a reminder of the classics we still try \nNo matter the game, no matter the system \nThe code will live on, and still be with them \n\nSo the next time you play, take a moment to pause \nAnd remember the code, and the Konami cause \nIt's a part of gaming's history, and a part of our lives \nLet's keep it alive, and let the Konami Code thrive!\n`
  }, [])

  let imgURL = undefined

  const decode = ({ data, width }) => {
    const decodedString = atob(data)
    const l = decodedString.length
    const buf = new Uint8ClampedArray(l)
    for (let i = 0; i < l; i++) {
      const char = decodedString[i]
      const byte = char.charCodeAt(0)
      buf[i] = byte
    }
    return new ImageData(buf, width)
  }

  async function load(title) {
    if (imgURL) return
    try {
      const res = await fetch(
        `https://editor.sprig.hackclub.com/api/thumbnail/${title}`
      )
      const json = await res.json()

      if (json.image.kind === 'png') {
        return `data:image/png;base64,${json.image.data}`
      } else {
        // Raw, hopefully
        const imageData = decode(json.image)
        const c = document.createElement('canvas')
        c.width = imageData.width
        c.height = imageData.height
        c.getContext('2d').putImageData(imageData, 0, 0)
        c.style['image-rendering'] = 'pixelated'
        return c.toDataURL()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const fetcher = async function getImage() {
    const thing0 = await load(gameTitle[0])
    const thing1 = await load(gameTitle[1])
    setGameImage(thing0)
    setGameImage1(thing1)
  }

  const { data, error } = useSWR('/api/profile-data', fetcher)

  const easterEgg = () => {
    alert('Hey, you typed the Konami Code!')
  }

  useEffect(() => {
    console.log('hi')
    if (reveal && !hover) {
      setTimeout(() => {
        console.log(reveal)
        console.log(hover)
        setReveal(false)
      }, 2000)
    }
  }, [hover])

  const [count, setCount] = useState(0)

  let photos = [
    '/home/hero.png',
    '/home/golden-train.png',
    '/home/flagship_4.jpg',
    '/home/meetings.png',
    '/home/flagship_megan.png',
    '/hackathons/mahacks.jpeg'
  ]

  let alt = [
    'Flagship meeting with club leaders, 2019',
    'Hack Clubbers on cross country train trip, Zephyr',
    'Hack Clubbers at Flagship, 2019',
    'Virtual Hack Club meeting, 2022',
    'Hack Clubber giving a talk on sponsorship',
    'Hack Clubber organized MA Hacks'
  ]

  if (count == photos.length) {
    setCount(0)
  }

  return (
    <>
      <Meta
        as={Head}
        title="Don’t run your coding club alone"
        description="Hack Club is a global nonprofit network of high school makers & student-led coding clubs where young people build the agency, the network, & the technical talent to think big & do big things in the world."
        image="https://cloud-epiki4yvg.vercel.app/2020-09-09_drbp62kayjuyyy0ek89mf9fwcp5t4kuz.jpeg"
      />
      <Head>
        <meta
          property="og:logo"
          content="https://assets.hackclub.com/icon-rounded.png"
          size="512x512"
        />
      </Head>
      <ForceTheme theme="light" />
      <Nav />
      <Box
        as="main"
        sx={{
          overflowX: 'hidden',
          position: 'relative'
        }}
      >
        <Secret
          reveal={reveal}
          onMouseEnter={() => {
            setHover(true)
            console.log('hover:', hover)
          }}
          onMouseOut={() => {
            setHover(false)
            console.log('hover:', hover)
          }}
        />
        <Konami action={easterEgg} code={[38, 38, 40, 40]}>
          {"Hey, I'm an Easter Egg! Look at me!"}
        </Konami>
        <Box
          as="header"
          sx={{
            bg: 'dark',
            pt: [5, 6],
            pb: [2, 3],
            textAlign: 'left',
            position: 'relative',
            overflowX: 'hidden'
          }}
        >
          <BGImg
            src={AssembleImgFile}
            alt="Hack Clubbers assemble at Figma HQ for the first IRL hackathon in SF since 2020: Assemble. 📸 Photo by Kunal Botla, Hack Clubber in MA!"
            priority
            gradient="linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.5))"
          />
          <Box
            sx={{
              width: '90vw',
              maxWidth: [null, 'layout'],
              position: 'relative',
              mx: 'auto',
              py: 4
            }}
          >
            <GitHub
              type={gitHubData[github].type}
              img={gitHubData[github].userImage}
              user={gitHubData[github].user}
              time={gitHubData[github].time}
              message={gitHubData[github].message}
              key={key}
            />
            <Fade>
              <Text variant="eyebrow" sx={{ color: 'sunken' }}>
                Welcome to Hack Club
              </Text>
            </Fade>
            <Fade bottom delay={200}>
              <Heading
                as="h1"
                variant="title"
                sx={{
                  color: 'white',
                  mb: [3, 4],
                  mx: 'auto',
                  zIndex: 1,
                  textAlign: 'left',
                  fontSize: ['36px', '48px', '64px']
                }}
              >
                <Text
                  as="span"
                  sx={{
                    lineHeight: 1.1,
                    display: 'block',
                    pb: 3
                  }}
                >
                  Where{' '}
                  <Text
                    as="a"
                    onClick={() => {
                      setHover(false)
                      !reveal ? setReveal(true) : setReveal(false)
                    }}
                    sx={{
                      color: 'inherit',
                      '&:hover': {
                        cursor: 'help'
                      }
                    }}
                  >
                    teen makers
                  </Text>{' '}
                  around the world practice the
                  <Text
                    sx={{
                      color: 'transparent',
                      ml: 2,
                      mr: 4,
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <Text
                      sx={{
                        lineHeight: 0.875,
                        px: 2,
                        backgroundColor: 'red',
                        position: 'absolute',
                        borderRadius: 10,
                        // transform: 'rotate(-3deg)',
                        transform: 'rotate(-3deg) translateY(5px)',
                        color: 'white',
                        whiteSpace: 'nowrap',
                        textDecoration: 'none',
                        '&:hover': {
                          cursor: 'pointer'
                        },
                        svg: {
                          mb: [0, '20px', '20px'],
                          opacity: 0.5,
                          transition: '0.3s',
                          mr: '-5px'
                        },
                        '&:hover svg': {
                          opacity: 1
                        }
                      }}
                      as="a"
                      href="/philosophy"
                      target="_blank"
                      rel="noopener"
                    >
                      hacker ethic
                      <Icon glyph="external" size={24} />
                    </Text>
                    hacker ethic{' '}
                  </Text>
                  by building things together.
                </Text>
              </Heading>
            </Fade>
            <Box
              sx={{
                display: 'flex',
                justifyContent: ['center', 'center', 'flex-end'],
                marginRight: 2,
                mt: [2, 2, 1]
              }}
            >
              <Badge
                as="a"
                href="https://www.youtube.com/watch?v=PnK4gzO6S3Q"
                target="_blank"
                rel="noopener"
                variant="pill"
                sx={{
                  zIndex: '1',
                  bg: '#000',
                  color: 'white',
                  opacity: 0.5,
                  textDecoration: 'none',
                  fontWeight: 'normal',
                  ':hover': { opacity: 1 },
                  transition: '0.3s ease'
                }}
                title="📸 Photo by Kunal Botla, Hack Clubber in MA!"
              >
                Hackers at Assemble in SF
              </Badge>
            </Box>
          </Box>
        </Box>
        <Box as="section" sx={{ pt: [4, 5], color: 'black' }}>
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Text variant="eyebrow" as="p" sx={{ fontSize: [1, 2, 3], mt: 4 }}>
              The rundown
            </Text>
            <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
              Join us in discovering the joy of code
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{ fontSize: [1, '16px', '20px'] }}
            >
              Hack Clubbers come together to code because it's fun. 
              Whether you’re a beginner
              programmer or have years of experience, there’s a place for you at
              Hack Club. Read about our{' '}
              <Link href="/philosophy" target="_blank" rel="noopener">
                hacker ethic
              </Link>
              .
            </Text>
            <Grid
              columns={[1, 1, '2.5fr 3fr', '2.5fr 3fr']}
              gap={[0, 3, 4]}
              pt={[3, 4]}
            >
              <Box
                sx={{ position: 'relative', height: ['400px', '100%', '100%'] }}
                onClick={() => setCount(count + 1)}
              >
                <Box
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: ['400px', '400px', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 == 0 ? 'rotate(-3deg)' : 'rotate(3deg)',
                        height: ['85%', '85%', '55%', '85%'],
                        width: '100%'
                      },
                      zIndex: 3,
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                    data-tip="next"
                    data-arrow-color="transparent"
                    data-background-color="white"
                    data-text-color="black"
                  >
                    <Photo
                      src={
                        count == photos.length - 1
                          ? photos[0]
                          : photos[count + 1]
                      }
                      alt={alt[count + 1]}
                      width={3000}
                      height={2550}
                      showAlt
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: ['400px', '100%', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 == 0 ? 'rotate(3deg)' : 'rotate(-3deg)',
                        height: ['85%', '85%', '55%', '85%'],
                        width: '100%'
                      },
                      zIndex: 3,
                      '&:hover': {
                        cursor: 'pointer'
                      }
                    }}
                    data-tip="next"
                    data-arrow-color="transparent"
                    data-background-color="white"
                    data-text-color="black"
                  >
                    <Photo
                      src={photos[count]}
                      alt={alt[count]}
                      width={3000}
                      height={2550}
                      showAlt
                    />
                  </Box>
                </Box>
              </Box>
              <Grid
                columns="1fr"
                sx={{
                  gridColumnGap: 3,
                  span: {
                    width: 36,
                    height: 36,
                    borderRadius: 24,
                    display: 'inline-block',
                    fontSize: 2,
                    lineHeight: '30px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    border: '3px solid currentColor'
                  },
                  p: { my: 0, fontSize: [1, '16px', '20px'] },
                  strong: { display: 'block', fontSize: [1, '18px', '22px'] }
                }}
              >
                <Grid
                  columns="auto 1fr"
                  sx={{
                    transitionDuration: '0.52s',
                    py: 2,
                    px: 2,
                    color: 'inherit',
                    position: 'relative',
                    textDecoration: 'none',
                    borderRadius: 'extra',
                    '&:hover': {
                      bg: 'purple',
                      color: 'white',
                      cursor: 'pointer'
                    },
                    '&:hover span': {
                      color: 'white'
                    }
                  }}
                  as="a"
                  href="#community"
                  // data-effect="solid"
                  // data-tip="learn more about our online community"
                  // data-delay-show="142"
                >
                  <Text as="span" color="purple">
                    1
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong>Connect with other teenage coders</strong>
                    We're united by our love for coding but talk about everything else we do too.
                  </Text>
                  <Icon
                    glyph="external"
                    size={32}
                    sx={{
                      position: 'absolute',
                      top: 1,
                      right: 2,
                      color: 'white'
                    }}
                  />
                </Grid>
                <Grid
                  columns="auto 1fr"
                  sx={{
                    transitionDuration: '0.52s',
                    py: 2,
                    px: 2,
                    color: 'inherit',
                    position: 'relative',
                    textDecoration: 'none',
                    borderRadius: 'extra',
                    '&:hover': {
                      bg: 'cyan',
                      color: 'white',
                      cursor: 'pointer'
                    },
                    '&:hover span': {
                      color: 'white'
                    }
                  }}
                  as="a"
                  href="#irl"
                  // data-effect="solid"
                  // data-tip="check out clubs and hackathons at Hack Club"
                  // data-delay-show="142"
                >
                  <Text as="span" color="cyan">
                    2
                  </Text>
                  <Text
                    as="p"
                    variant="subtitle"
                    sx={{
                      mt: 0,
                      pb: 3
                    }}
                  >
                    <strong>Gather IRL with other makers</strong> Meet other
                    Hack Clubbers in your community to code and make things, be
                    it once a week after school (at{' '}
                    <Link href="/clubs">Hack Clubs</Link>), a one-time 48 hour
                    event (<Link href="/hackathons">hackathons</Link>), or
                    anything in-between!
                  </Text>
                  <Icon
                    glyph="external"
                    size={32}
                    sx={{
                      position: 'absolute',
                      top: 1,
                      right: 2,
                      color: 'white'
                    }}
                  />
                </Grid>
                <Grid
                  columns="auto 1fr"
                  sx={{
                    transitionDuration: '0.52s',
                    py: 2,
                    px: 2,
                    color: 'inherit',
                    position: 'relative',
                    textDecoration: 'none',
                    borderRadius: 'extra',
                    '&:hover': {
                      bg: 'orange',
                      color: 'white',
                      cursor: 'pointer'
                    },
                    '&:hover span': {
                      color: 'white'
                    }
                  }}
                  as="a"
                  href="#tools"
                  // data-tip="click to projects we're currently working on"
                  // data-effect="solid"
                  // data-delay-show="142"
                >
                  <Text as="span" color="orange">
                    3
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong>Build open-source learning tools</strong>
                    Contribute to projects like a game engine, daily streak
                    system, graphing game, and more!
                  </Text>
                  <Icon
                    glyph="external"
                    size={32}
                    sx={{
                      position: 'absolute',
                      top: 1,
                      right: 2,
                      color: 'white'
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Carousel />
        <Box as="section" sx={{ pt: [4, 5], color: 'black' }}>
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
            pb={4}
          >
            <Text
              variant="eyebrow"
              as="p"
              sx={{ fontSize: [1, 2, 3], mt: 2 }}
              id="community"
            >
              Hack Clubbers
            </Text>
            <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
              Connect with each other from around the world
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{ fontSize: [1, '16px', '20px'] }}
            >
              We gather both online and in-person to share our love of code and
              make things together!
            </Text>
            <Box>
              <Winter />
              <Epoch />
              <Slack slackKey={slackKey} data={slackData} events={events}/>
            </Box>
          </Box>
          <Box
            py={4}
            sx={{
              background: 'snow',
              backgroundImage: `url('https://icons.hackclub.com/api/icons/0xF4F7FB/glyph:rep.svg')`,
              backgroundSize: '40px 40px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '10% 10%'
            }}
            id="tools"
          >
            <Box
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto'
              }}
            >
              <Text variant="eyebrow" as="p" sx={{ fontSize: [1, 2, 3] }}>
                Hack Clubbers
              </Text>
              <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
                Build open source tools
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ fontSize: [1, '16px', '20px'] }}
              >
                In collaboration with engineers on the Hack Club team, Hack
                Clubbers build learning tools for each other. Get involved with
                these projects by building something with our tools or
                contribute to the tools themselves.
              </Text>
              <Sprig
                delay={100}
                stars={stars.sprig.stargazerCount}
                game={game}
                gameImage={gameImage}
                gameImage1={gameImage1}
              />
              <SprigConsole
                delay={300}
                stars={stars.sprigHardware.stargazerCount}
              />
              <Sinerider delay={200} stars={stars.sinerider.stargazerCount} />
              <Workshops delay={400} stars={stars.hackclub.stargazerCount} />
            </Box>
          </Box>
          <Box>
            <Box
              py={3}
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto'
              }}
              id="irl"
            >
              <Text variant="eyebrow" as="p">
                Hack Clubbers
              </Text>
              <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
                Create spaces to have fun with code
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ fontSize: [1, '16px', '20px'] }}
              >
                Meet other Hack Clubbers in your community to code and make
                things, be it once a week after school, a one-time 48 hour
                event, or anything in-between!
              </Text>
              <Clubs />
              <Hackathons
                delay={400}
                data={hackathonsData}
                stars={stars.hackathons.stargazerCount}
              />
              {/* <Events events={events} /> */}
              <Bank data={bankData} />
            </Box>
          </Box>
        </Box>
        <Box bg="snow" color="black" py={[3, 4]}>
          <Box
            sx={{
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Text as="p" variant="eyebrow">
              Let's recap
            </Text>
            <Heading as="h2" variant="title" sx={{fontSize: ['36px', 4, 5]}}>
              Find your place with{' '}
              <Text
                as="span"
                sx={{
                  borderRadius: 'default',
                  px: 2,
                  ml: [-2, 0],
                  whiteSpace: ['wrap', 'nowrap'],
                  color: 'white',
                  bg: 'red'
                }}
              >
                Hack Club
              </Text>
              .
            </Heading>
            <Grid
              pt={[3, 4]}
              pb={[4, 5]}
              gap={3}
              columns={[1, 2, 3]}
              sx={{
                textAlign: 'left',
                '> a, > div': {
                  borderRadius: 'extra',
                  boxShadow: 'elevated',
                  p: [3, null, 4]
                },
                span: {
                  boxShadow:
                    '-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)'
                },
                svg: { fill: 'currentColor' }
              }}
            >
              <Card
                as="a"
                href="/slack"
                target="_blank"
                rel="noopener"
                variant="interactive"
                sx={{
                  background:
                    'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
                  color: 'white',
                  svg: { color: 'rgb(51, 142, 218)' }
                }}
              >
                <Stage
                  icon="slack"
                  color="white"
                  name="Join our online community"
                  desc="Connect with other technical teenagers on Slack and hack on things together."
                  sx={{
                    p: {
                      fontSize: [1, '16px', '20px']
                    },
                    h3: {
                      fontSize: ['16px', '22px', '26px']
                    }
                  }}
                />
              </Card>
              <Card
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)',
                  color: 'white',
                  svg: { color: 'rgb(236, 55, 80)' },
                  textDecoration: 'none'
                }}
                as="a"
                href="/clubs"
                variant="interactive"
                target="_blank"
                rel="noopener"
              >
                <Stage
                  icon="clubs"
                  color="white"
                  name="Start a club"
                  desc="Build an in-person community of high school hackers, and we're here to help."
                  sx={{
                    p: {
                      fontSize: [1, '16px', '20px']
                    },
                    h3: {
                      fontSize: ['16px', '22px', '26px']
                    }
                  }}
                />
              </Card>
              <Card
                sx={{
                  background:
                    'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
                  color: 'white',
                  svg: { color: '#fb558e' },
                  textDecoration: 'none'
                }}
                as="a"
                href="https://github.com/hackclub"
                variant="interactive"
                target="_blank"
                rel="noopener"
              >
                <Stage
                  icon="github"
                  color="white"
                  name="Explore our open-sourced tools"
                  desc="We're currently building a game engine, daily streak system, graphing game, and more!"
                  sx={{
                    p: {
                      fontSize: [1, '16px', '20px']
                    },
                    h3: {
                      fontSize: ['16px', '22px', '26px']
                    }
                  }}
                />
              </Card>
            </Grid>
            <MailingList />

          </Box>
        </Box>
      </Box>
      <Footer
        dark
        sx={{
          backgroundColor: 'dark',
          position: 'relative',
          overflow: 'hidden',
          textShadow: '0 1px 2px rgba(0,0,0,0.375)',
          'h2,span,p,a': { color: 'white !important' },
          '> div img': { objectPosition: ['left', 'center'] },
          svg: {
            fill: 'white',
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'
          }
        }}
      >
        <BGImg
          width={2544}
          height={2048}
          gradient="linear-gradient(rgba(0,0,0,0.125), rgba(0,0,0,0.25))"
          src={FooterImgFile}
          placeholder="blur"
          alt="Globe with hundreds of Hack Clubs"
        />
        <style>
          {`a{
          color: #338eda
        }`}
        </style>
      </Footer>
    </>
  )
}
const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export async function getStaticProps() {
  let dataPieces = []
  let bankData = []
  // let stars = []
  let initialBankData = await fetch('https://bank.hackclub.com/stats').then(r =>
    r.json()
  )

  let raised = initialBankData.raised / 100

  let slackData = await fetch(
    'https://site-git-v4.hackclub.dev/api/slack'
  ).then(r => r.json())
  console.log(slackData)

  bankData.push(
    `💰 ${raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised`
  )

  let gitHubData = await fetch(
    'https://site-git-v4.hackclub.dev/api/github'
  ).then(r => r.json())

  let gitHubDataLength = gitHubData.length

  let game = await fetch('https://site-git-v4.hackclub.dev/api/games').then(r =>
    r.json()
  )
  console.log(game)

  let gameTitle = []

  gameTitle = game.map(r => r.title)

  const hackathonsData = await fetch(
    'https://hackathons.hackclub.com/api/events/upcoming'
  ).then(res => res.json())
  let stars = await fetch('https://site-git-v4.hackclub.dev/api/stars').then(
    res => res.json()
  )

  let events = await fetch(
    'https://events.hackclub.com/api/events/upcoming/'
  ).then(res => res.json())

  return {
    props: {
      dataPieces,
      game,
      gameTitle,
      gitHubData,
      gitHubDataLength,
      // githubData2,
      hackathonsData,
      bankData,
      slackData,
      stars,
      events
    },
    revalidate: 30
  }
}

export default Page
