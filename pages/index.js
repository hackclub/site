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
import Comma from '../components/comma'
import CarouselCards from '../components/index/carousel-cards'

function Page({
  hackathonsData,
  bankData,
  slackData,
  gitHubData,
  gitHubDataLength,
  consoleCount,
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

  // useEffect(() => {
  //   function getNewGitHubActivity() {
  //     setKey(Math.random())
  //     setGithub(Math.floor(Math.random() * gitHubDataLength))
  //     console.log(gitHubData[github])
  //   }
  //   setInterval(getNewGitHubActivity, 30000)
  // }, [])

  useEffect(() => {
    window.kc = `In the days of old, when gaming was young \nA mysterious code was found among \nA sequence of buttons, pressed in a row \nIt unlocked something special, we all know \n\nUp, up, down, down, left, right, left, right \nB, A, Start, we all have heard it's plight \nIn the 8-bit days, it was all the rage \nAnd it still lives on, with time, it will never age \n\nKonami Code, it's a legend of days gone by \nIt's a reminder of the classics we still try \nNo matter the game, no matter the system \nThe code will live on, and still be with them \n\nSo the next time you play, take a moment to pause \nAnd remember the code, and the Konami cause \nIt's a part of gaming's history, and a part of our lives \nLet's keep it alive, and let the Konami Code thrive!\n`
  }, [])

  // let imgURL = undefined

  // const decode = ({ data, width }) => {
  //   const decodedString = atob(data)
  //   const l = decodedString.length
  //   const buf = new Uint8ClampedArray(l)
  //   for (let i = 0; i < l; i++) {
  //     const char = decodedString[i]
  //     const byte = char.charCodeAt(0)
  //     buf[i] = byte
  //   }
  //   return new ImageData(buf, width)
  // }

  // async function load(title) {
  //   if (imgURL) return
  //   try {
  //     const res = await fetch(
  //       `https://editor.sprig.hackclub.com/api/thumbnail/${title}`
  //     )
  //     const json = await res.json()

  //     if (json.image.kind === 'png') {
  //       return `data:image/png;base64,${json.image.data}`
  //     } else {
  //       // Raw, hopefully
  //       const imageData = decode(json.image)
  //       const c = document.createElement('canvas')
  //       c.width = imageData.width
  //       c.height = imageData.height
  //       c.getContext('2d').putImageData(imageData, 0, 0)
  //       c.style['image-rendering'] = 'pixelated'
  //       return c.toDataURL()
  //     }
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // const fetcher = async function getImage() {
  //   const thing0 = await load(gameTitle[0])
  //   const thing1 = await load(gameTitle[1])
  //   setGameImage(thing0)
  //   setGameImage1(thing1)
  // }

  // const { data, error } = useSWR('/api/profile-data', fetcher)

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

  let images = [
    {
      alt: '10 day cross-country hackathon with 42 hackers in 2020',
      src: '/home/golden-train.png'
    },
    { alt: 'Map of Hack Clubs around the world', src: '/home/map.png' },
    {
      alt: 'Hack Clubbers at Space X HQ in LA',
      src: '/home/zephyr-spacex.jpeg'
    },
    { alt: 'Hack Clubbers at Flagship, 2019', src: '/home/flagship_4.jpg' },
    // {alt: 'Virtual Hack Club meeting, 2022', src: '/home/meetings.png'},
    {
      alt: 'Hacker reverse engineering a power extender!',
      src: '/home/assemble-hardware.jpg'
    },
    {
      alt: 'MA Hacks, Hack Clubber organized hackathon',
      src: '/hackathons/mahacks.jpeg'
    },
    { alt: 'AMA with Sal Khan', src: '/home/ama.png' }
    // {alt: 'Hack Clubber giving a talk on sponsorship', src: '/home/flagship_megan.png'},
  ]

  if (count == images.length - 1) {
    setCount(0)
  }

  return (
    <>
      <Meta
        as={Head}
        title="A home for high school coders"
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
            gradient="linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.6))"
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
            <Fade>
              <Text variant="eyebrow" sx={{ color: 'sunken' }}>
                Welcome to Hack Club
              </Text>
            </Fade>
            <Fade bottom delay={200}>
              <Heading>
                <Text
                  as="h1"
                  variant="title"
                  sx={{
                    color: 'white',
                    mb: [3, 4],
                    mx: 'auto',
                    zIndex: 1,
                    textAlign: 'left',
                    fontSize: ['36px', '48px', '64px'],
                    lineHeight: 1.1
                  }}
                >
                  We are <Comma>{slackData.total_members_count}</Comma> high
                  schoolers from around the world that come together and code.
                </Text>
                <Button variant="ctaLg" as="a" href="/slack">
                  Join our community
                </Button>
                {/* <Text
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
                </Text> */}
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
              Join us in discovering the{' '}
              <Text
                as="span"
                sx={{
                  borderRadius: 'default',
                  px: 2,
                  mx: [-2, 0],
                  whiteSpace: 'nowrap',
                  color: 'white',
                  bg: 'red'
                }}
              >
                joy of code
              </Text>
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{ fontSize: [1, '16px', '20px'] }}
            >
              Every day, thousands of Hack Clubbers gather online and in-person
              to make things with code. Whether you’re a beginner programmer or
              have years of experience, there’s a place for you at Hack Club.
              Read about our{' '}
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
                        count == images.length - 1
                          ? images[0].src
                          : images[count + 1].src
                      }
                      alt={
                        count == images.length - 1
                          ? images[0].alt
                          : images[count + 1].alt
                      }
                      width={3000}
                      height={2550}
                      showAlt
                      // loading="eager"
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
                      src={images[count].src}
                      alt={images[count].alt}
                      width={3000}
                      height={2550}
                      showAlt
                      // loading="eager"
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
                    borderRadius: 'extra'
                    // '&:hover': {
                    //   bg: 'purple',
                    //   color: 'white',
                    //   cursor: 'pointer'
                    // },
                    // '&:hover span': {
                    //   color: 'white'
                    // }
                  }}
                  // as="a"
                  // href="#community"
                  // data-effect="solid"
                  // data-tip="learn more about our online community"
                  // data-delay-show="142"
                >
                  <Text as="span" color="red">
                    1
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong>Connect with other teenage coders</strong>
                    Have a coding question? Looking for project feedback? You’ll
                    find <Comma>{slackData.total_members_count}</Comma> fabulous
                    people to talk to in our global{' '}
                    <Link href="/clubs" target="_blank" rel="noopener">
                      Slack{' '}
                    </Link>
                    (Discord, but better), active at all hours.
                  </Text>
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
                    borderRadius: 'extra'
                    // '&:hover': {
                    //   bg: 'cyan',
                    //   color: 'white',
                    //   cursor: 'pointer'
                    // },
                    // '&:hover span': {
                    //   color: 'white'
                    // }
                  }}
                  // as="a"
                  // href="#irl"
                  // data-effect="solid"
                  // data-tip="check out clubs and hackathons at Hack Club"
                  // data-delay-show="142"
                >
                  <Text as="span" color="orange">
                    2
                  </Text>
                  <Text
                    as="p"
                    variant="subtitle"
                    sx={{
                      mt: 0
                    }}
                  >
                    <strong>Build open source learning tools</strong>
                    We build large open source projects together (3k+ PRs a
                    year) like this website, a game engine, daily streak system,
                    and more!
                  </Text>
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
                    borderRadius: 'extra'
                    // '&:hover': {
                    //   bg: 'orange',
                    //   color: 'white',
                    //   cursor: 'pointer'
                    // },
                    // '&:hover span': {
                    //   color: 'white'
                    // }
                  }}
                  // as="a"
                  // href="#tools"
                  // data-tip="click to projects we're currently working on"
                  // data-effect="solid"
                  // data-delay-show="142"
                >
                  <Text as="span" color="yellow">
                    3
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong>Gather IRL with other makers</strong>
                    Meet other Hack Clubbers in your community to build together
                    at one of the 400+{' '}
                    <Link href="/clubs" target="_blank" rel="noopener">
                      Hack Clubs
                    </Link>{' '}
                    and{' '}
                    <Link href="/hackathons" target="_blank" rel="noopener">
                      high school hackathons
                    </Link>
                    .
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <CarouselCards
                  background="#000"
                  titleColor="yellow"
                  descriptionColor="white"
                  title="Sprig"
                  description="Learn to code by making games in a JavaScript game editor"
                  img="https://emoji.slack-edge.com/T0266FRGM/sprig-dino/6f01fec60b51b343.png"
                  link="https://sprig.hackclub.com"
                /> */}
        <Carousel />
        <Box
          as="section"
          sx={{
            background: 'snow',
            backgroundImage: `url('https://icons.hackclub.com/api/icons/0xF4F7FB/glyph:rep.svg')`,
            backgroundSize: '40px 40px',
            backgroundRepeat: 'repeat',
            backgroundPosition: '10% 10%',
            py: [3, 4, 5]
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
            pb={4}
          >
            <Box sx={{ maxWidth: 'copyPlus' }}>
              <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
                We connect with each other from around the world
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ fontSize: [1, '16px', '20px'] }}
              >
                We gather both online and in-person to share our love of code
                and make things together!
              </Text>
            </Box>
            <Winter />
            <Epoch />
            <Slack slackKey={slackKey} data={slackData} events={events} />
          </Box>
          <Box py={4} id="tools">
            <Box
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto',
                position: 'relative'
              }}
            >
              {/* <Text variant="eyebrow" as="p" sx={{ fontSize: [1, 2, 3] }}>
                Hack Clubbers
              </Text> */}
              <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
                We build open source tools
              </Text>
              <GitHub
                type={gitHubData[github].type}
                img={gitHubData[github].userImage}
                user={gitHubData[github].user}
                time={gitHubData[github].time}
                message={gitHubData[github].message}
                key={key}
              />
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
                consoleCount={consoleCount}
              />
              <Sinerider delay={200} stars={stars.sinerider.stargazerCount} />
              <Workshops delay={400} stars={stars.hackclub.stargazerCount} />
            </Box>
          </Box>
          <Box
            sx={{ position: 'relative' }}
            // sx={{
            //   background: 'sunken',
            //   backgroundImage: `url('https://icons.hackclub.com/api/icons/0xF4F7FB/glyph:rep.svg')`,
            //   backgroundSize: '40px 40px',
            //   backgroundRepeat: 'repeat',
            //   backgroundPosition: '10% 10%',
            //   '&:hover': {
            //     backgroundImage: `url('https://icons.hackclub.com/api/icons/0x000000/glyph:rep.svg')`
            //   }
            // }}
          >
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                top: 0,
                left: 0
              }}
            >
              {}
            </Box>
            <Box
              py={3}
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto'
              }}
              id="irl"
            >
              {/* <Text variant="eyebrow" as="p">
                Hack Clubbers
              </Text> */}
              <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
                Join or run an IRL coding event
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ fontSize: [1, '16px', '20px'] }}
              >
                Hack Clubs are coding clubs that build something every meeting
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
            <Heading as="h2" variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
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
                  name="Explore our open sourced tools"
                  desc="We’re currently building a game engine, daily streak system, graphing game, and more!"
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
      // dark
      // sx={{
      //   backgroundColor: 'dark',
      //   position: 'relative',
      //   overflow: 'hidden',
      //   textShadow: '0 1px 2px rgba(0,0,0,0.375)',
      //   'h2,span,p,a': { color: 'white !important' },
      //   '> div img': { objectPosition: ['left', 'center'] },
      //   svg: {
      //     fill: 'white',
      //     filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'
      //   }
      // }}
      >
        {/* <BGImg
          width={2544}
          height={2048}
          gradient="linear-gradient(rgba(0,0,0,0.125), rgba(0,0,0,0.25))"
          src={FooterImgFile}
          placeholder="blur"
          alt="Globe with hundreds of Hack Clubs"
        /> */}
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

  const consoleCount = await fetch(
    'https://site-git-v4.hackclub.dev/api/sprig-console'
  ).then(r => r.json())

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
      consoleCount,
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
