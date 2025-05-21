import {
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from 'theme-ui'
import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Stage from '../components/stage'
import Carousel from '../components/index/carousel'
import Sprig from '../components/index/cards/sprig'
import Sinerider from '../components/index/cards/sinerider'
import SprigConsole from '../components/index/cards/sprig-console'
import Clubs from '../components/index/cards/clubs'
import Workshops from '../components/index/cards/workshops'
import HCB from '../components/index/cards/hcb'
import Hackathons from '../components/index/cards/hackathons'
import Announcement from '../components/announcement'
import Konami from 'react-konami-code'
import JSConfetti from 'js-confetti'
import Secret from '../components/secret'
import MailingList from '../components/index/cards/mailing-list'
import Slack from '../components/index/cards/slack'
import Icon from '../components/icon'
import GitHub from '../components/index/github'
import Photo from '../components/photo'
import Comma from '../components/comma'
import Haxidraw from '../components/index/cards/haxidraw'
import Onboard from '../components/index/cards/onboard'
import Trail from '../components/index/cards/trail'
import Scrapyard from '../components/index/cards/scrapyard'
import Neighborhood from '../components/index/cards/neighborhood'
import {
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiSwift,
  SiGo,
  SiRust,
  SiKotlin
} from 'react-icons/si'
import theme from '../lib/theme'
import { ThemeProvider } from 'theme-ui'
import carouselCardsData from '../lib/carousel.json'
import { Slack as Slacky } from './api/slack'
import { fetchGitHub } from './api/github'
import { fetchStars } from './api/stars'
import { getGames } from './api/games'
import { getConsoles } from './api/sprig-console'
/** @jsxImportSource theme-ui */

const cyberpunkColorPalette = {
  background: '#0A0F2C',
  lightBg: '#120D2B',
  lighterBg: '#1A1438',
  cardBg: '#1F1A40',
  text: '#E0E0E0',
  textHighlight: '#00FFFF',
  textSecondary: '#B0B0D0',
  textMuted: '#7F7F9F',
  accentCyan: '#00FFFF',
  accentMagenta: '#FF00FF',
  accentLime: '#39FF14',
  accentElectricBlue: '#00BFFF',
  accentNeonPurple: '#8A2BE2',
  accentHotPinkGradient: '#F002ED',
  accentHotPinkFooter: '#E93187',
  accentGreen: '#33d6a6',
  gridLine: 'rgba(138, 43, 226, 0.2)',
  white: '#FFFFFF',
  black: '#000000',
  buttonGradient: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
  titleGradient: 'linear-gradient(to right, #00BFFF, #F002ED)'
}

const cyberpunkVariants = {
  colors: {
    cyberpunk: cyberpunkColorPalette
  },
  text: {
    title: {
      fontSize: [5, 6],
      fontWeight: 'bold',
      lineHeight: 'title',
      color: 'cyberpunk.textHighlight'
    },
    subtitle: {
      fontSize: [2, 3],
      fontWeight: 'body',
      lineHeight: 'subheading',
      color: 'cyberpunk.textSecondary'
    },
    headline: {
      variant: 'text.title',
      fontSize: [4, 5, 6],
      mt: 3,
      mb: 3
    },
    ultratitle: {
      variant: 'text.title',
      fontSize: [5, 6, 7],
      mb: 4
    },
    lead: {
      fontSize: [2, 3],
      maxWidth: 'copyPlus',
      color: 'cyberpunk.textSecondary'
    },
    eyebrow: {
      fontSize: ['18px', 1, 2],
      textAlign: 'center',
      color: 'cyberpunk.textSecondary',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      mb: 2
    },
    ctaLabel: {
      fontSize: [1, '16px'],
      color: 'cyberpunk.textMuted',
      textAlign: 'center'
    }
  },
  buttons: {
    primary: {
      textTransform: 'uppercase',
      backgroundImage: cyberpunkColorPalette.buttonGradient,
      color: 'cyberpunk.white',
      '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.2s ease-in-out',
        boxShadow:
          '0 0 15px rgba(0, 191, 255, 0.6), 0 0 20px rgba(138, 43, 226, 0.5)'
      },
      gap: 2,
      border: 'none'
    },
    ctaLg: {
      variant: 'buttons.primary',
      px: [4, 5],
      py: [3, 4],
      fontSize: ['20px', 3, 4],
      fontWeight: 'bold',
      borderRadius: 'default'
    }
  },
  cards: {
    primary: {
      borderRadius: 'extra',
      boxShadow: '0 6px 25px rgba(0,0,0,0.6)',
      p: [3, null, 4],
      bg: 'cyberpunk.cardBg',
      color: 'cyberpunk.text',
      h3: {
        color: 'cyberpunk.textHighlight',
        fontSize: ['22px', 2, 3]
      },
      p: {
        color: 'cyberpunk.textSecondary',
        fontSize: ['18px', '20px', '22px']
      }
    },
    interactive: {
      variant: 'cards.primary',
      textDecoration: 'none',
      transition:
        'transform 0.25s ease-out, box-shadow 0.25s ease-out',
      '&:hover,&:focus': {
        transform: 'translateY(-5px) scale(1.01)',
        boxShadow: `0 0 25px ${cyberpunkColorPalette.accentCyan}, 0 0 12px ${cyberpunkColorPalette.accentCyan}`
      }
    }
  }
}

function Page({
  hackathonsData,
  bankData,
  slackData,
  gitHubData,
  consoleCount,
  stars,
  dataPieces,
  game,
  gameTitle,
  events,
  carouselCards,
  context
}) {
  let [gameImage, setGameImage] = useState('')
  let [gameImage1, setGameImage1] = useState('')
  let [reveal, setReveal] = useState(false)
  const [hover, setHover] = useState(true)

  const { asPath } = useRouter()

  let jsConfetti = useRef()

  useEffect(() => {
    jsConfetti.current = new JSConfetti()

    window.kc = `In the days of old, when gaming was young \nA mysterious code was found among \nA sequence of buttons, pressed in a row \nIt unlocked something special, we all know \n\nUp, up, down, down, left, right, left, right \nB, A, Start, we all have heard it's plight \nIn the 8-bit days, it was all the rage \nAnd it still lives on, with time, it will never age \n\nKonami Code, it's a legend of days gone by \nIt's a reminder of the classics we still try \nNo matter the game, no matter the system \nThe code will live on, and still be with them \n\nSo the next time you play, take a moment to pause \nAnd remember the code, and the Konami cause \nIt's a part of gaming's history, and a part of our lives \nLet's keep it alive, and let the Konami Code thrive!\n`
    window.paper = `Welcome, intrepid hacker! We'd love to have you in our community. Get your invite at hack.af/slack. Under "Why do you want to join the Hack Club Slack?" add a 🦄 and we'll ship you some exclusive stickers! `
  }, [])

  const easterEgg = () => {
    alert('Hey, you typed the Konami Code!')

    jsConfetti.current.addConfetti({
      confettiColors: [
        cyberpunkColorPalette.accentHotPinkGradient,
        cyberpunkColorPalette.accentElectricBlue,
        cyberpunkColorPalette.accentLime,
        cyberpunkColorPalette.accentMagenta,
        cyberpunkColorPalette.accentCyan,
        cyberpunkColorPalette.accentNeonPurple,
        cyberpunkColorPalette.accentGreen
      ]
    })
  }

  useEffect(() => {
    if (reveal && !hover) {
      setTimeout(() => {
        setReveal(false)
      }, 2000)
    }
  }, [reveal, hover])

  const [count, setCount] = useState(0)

  let images = [
    { alt: 'Map of Hack Clubs around the world', src: '/home/map.png' },
    {
      alt: 'Hack Clubbers at SpaceX HQ in LA',
      src: '/home/zephyr-spacex.jpeg'
    },
    {
      alt: 'MA Hacks, Hack Clubber organized hackathon',
      src: '/hackathons/mahacks.jpeg'
    },
    { alt: 'AMA with Sal Khan', src: '/home/ama.png' },
    { alt: 'Hack Clubbers at Flagship, 2019', src: '/home/flagship_4.jpg' }
  ]

  useEffect(() => {
    console.log(
      `Neon circuits glow\nCode streams in the dark expanse\nFuture takes its form`
    )
    if (count === images.length - 1) {
      setCount(0)
    }
  }, [count, images.length])

  const spotlightRef = useRef()
  useEffect(() => {
    const handler = event => {
      if (document.getElementById('spotlight')) {
        var rect = document.getElementById('spotlight').getBoundingClientRect()
        var x = event.clientX - rect.left
        var y = event.clientY - rect.top

        spotlightRef.current.style.background = `radial-gradient(
          circle at ${x}px ${y}px,
          rgba(224, 224, 224, 0.08) 20px, 
          transparent 120px
        )`
      }
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  return (
    <ThemeProvider theme={{ ...theme, ...cyberpunkVariants }}>
      <Meta
        as={Head}
        title="A Home for High School Makers"
        description="Hack Club is a global nonprofit network of high school makers & student-led coding clubs where young people build the agency, the network, & the technical talent to think big & do big things in the world."
        image="https://cloud-lgl7kg862-hack-club-bot.vercel.app/0start__1_.png"
      />
      <Head>
        <meta
          property="og:logo"
          content="https://assets.hackclub.com/icon-rounded.png"
          size="512x512"
        />
      </Head>
      <ForceTheme theme="dark" />
      <Nav dark />
      <Box
        as="main"
        sx={{
          overflowX: 'hidden',
          position: 'relative',
          bg: 'cyberpunk.background',
          color: 'cyberpunk.text',
          '@keyframes gridFloat': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '100px 100px' }
          }
        }}
      >
        <Secret
          reveal={reveal}
          onMouseEnter={() => setHover(true)}
          onMouseOut={() => setReveal(false)}
        />
        <Konami action={easterEgg}>
          {"Hey, I'm an Easter Egg! Look at me!"}
        </Konami>
        <Box
          as="header"
          sx={{
            bg: 'cyberpunk.lighterBg',
            pt: [7, 8, '180px'],
            pb: [6, 7, '160px'],
            minHeight: ['50vh'],
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            backgroundImage: `
              linear-gradient(to bottom right, ${cyberpunkColorPalette.accentElectricBlue}1A, ${cyberpunkColorPalette.accentNeonPurple}1A),
              linear-gradient(${cyberpunkColorPalette.gridLine} 1px, transparent 1px),
              linear-gradient(90deg, ${cyberpunkColorPalette.gridLine} 1px, transparent 1px),
              linear-gradient(${cyberpunkColorPalette.gridLine} 2px, transparent 2px),
              linear-gradient(90deg, ${cyberpunkColorPalette.gridLine} 2px, transparent 2px)
            `,
            backgroundSize: `100% 100%, 20px 20px, 20px 20px, 100px 100px, 100px 100px`,
            animation: 'gridFloat 20s linear infinite',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none'
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '150px',
              background: `linear-gradient(to bottom, transparent, ${cyberpunkColorPalette.background})`,
              pointerEvents: 'none',
              zIndex: 2
            }
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1,
              opacity: 0.4
            }}
          >
            {[
              { Icon: SiJavascript, left: '10%', top: '20%', delay: '0s' },
              { Icon: SiPython, left: '20%', top: '60%', delay: '0.5s' },
              { Icon: SiHtml5, left: '80%', top: '15%', delay: '1s' },
              { Icon: SiCss3, left: '85%', top: '70%', delay: '1.5s' },
              { Icon: SiReact, left: '45%', top: '25%', delay: '2s' },
              { Icon: SiNodedotjs, left: '15%', top: '85%', delay: '2.5s' },
              { Icon: SiSwift, left: '75%', top: '45%', delay: '3s' },
              { Icon: SiGo, left: '35%', top: '75%', delay: '3.5s' },
              { Icon: SiRust, left: '90%', top: '85%', delay: '4s' },
              { Icon: SiKotlin, left: '5%', top: '40%', delay: '4.5s' }
            ].map(({ Icon, left, top, delay }, i) => (
              <Box
                key={i}
                sx={{
                  position: 'absolute',
                  left,
                  top,
                  color: 'cyberpunk.accentCyan',
                  fontSize: ['36px', '48px', '64px'],
                  animation: 'float 6s infinite',
                  animationDelay: delay,
                  animationTimingFunction: 'ease-in-out'
                }}
              >
                <Icon />
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              maxWidth: ['90vw', '85vw', '80vw'],
              mx: 'auto',
              textAlign: 'center',
              position: 'relative',
              zIndex: 2
            }}
          >
            <Text
              as="h1"
              variant="title"
              sx={{
                fontSize: ['42px', '56px', '72px'],
                mb: 3,
                background: cyberpunkColorPalette.titleGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                textShadow: `0 0 20px ${cyberpunkColorPalette.accentElectricBlue}4D`
              }}
            >
              Where teen coders unite
            </Text>
            <Text
              as="p"
              variant="subtitle"
              sx={{
                fontSize: ['18px', '22px', '24px'],
                maxWidth: '650px',
                mx: 'auto',
                mb: 4,
                textShadow: `0 0 10px ${cyberpunkColorPalette.white}33`
              }}
            >
              Join a community of <Comma>{slackData.total_members_count}</Comma>{' '}
              high school makers, building, learning, and having fun whilst
              they do it.
            </Text>
            <Flex
              sx={{ justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}
            >
              <Button
                variant="ctaLg"
                as="a"
                href="/slack"
                sx={{ px: 4, py: 3, fontSize: [2, 3] }}
              >
                <Text>
                  Join{' '}
                  {slackData.total_members_count
                    ? withCommas(slackData.total_members_count)
                    : '60k+'}{' '}
                  Teen Hackers
                </Text>
                <Icon glyph="slack-fill" size={24} />
              </Button>
              <Button
                variant="ctaLg"
                as="a"
                href="https://shipwrecked.hack.club/3"
                sx={{ px: 4, py: 3, fontSize: [2, 3] }}
              >
                Sign Up: Private Island Hackathon
              </Button>
            </Flex>
            <Flex
              sx={{
                gap: [3],
                my: 1,
                py: 3,
                flexWrap: 'wrap',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: ['16px', '18px'],
                color: 'cyberpunk.textSecondary',
                opacity: 0.95,
                borderBottom: '1px solid',
                borderColor: 'cyberpunk.gridLine'
              }}
            >
              <Text
                sx={{
                  color: 'cyberpunk.accentGreen',
                  fontWeight: 'bold',
                  textShadow: `0 0 10px ${cyberpunkColorPalette.accentGreen}4D`
                }}
              >
                $500k+ in prizes given
              </Text>
              <Text sx={{ color: 'cyberpunk.textMuted' }}>•</Text>
              <Text>80k+ projects built</Text>
              <Text sx={{ color: 'cyberpunk.textMuted' }}>•</Text>
              <Text>
                <Comma>{slackData.total_members_count || 60_000}</Comma>{' '}
                teenage builders
              </Text>
            </Flex>
          </Box>
        </Box>
        <Box
          as="section"
          sx={{ py: [4, 5, '82px'], bg: 'cyberpunk.lightBg' }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Text
              variant="title"
              as="h1"
              sx={{
                fontSize: ['36px', '48px', '56px']
              }}
            >
              Discover the{' '}
              <Text
                as="span"
                sx={{
                  borderRadius: 'default',
                  px: 1,
                  mx: 0,
                  whiteSpace: ['wrap', 'nowrap', 'nowrap'],
                  background: cyberpunkColorPalette.titleGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                joy of code
              </Text>
              , together.
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{
                fontSize: ['18px', '20px', '22px'],
                pb: [3, 3, 4],
                maxWidth: 'unset'
              }}
            >
              In collaboration with engineers on the Hack Club team, Hack
              Clubbers build learning tools for each other. Get involved with
              these projects by building something with our tools or contribute
              to the tools themselves.
            </Text>
            <Grid columns={[1, 1, 1, '2.5fr 3fr']} gap={[0, 3, 4]} pt={[3, 4]}>
              <Box
                sx={{
                  position: 'relative',
                  height: ['300px', '300px', '300px', '100%'],
                  py: [3, 3, 3, 0]
                }}
                onClick={() => setCount(count + 1)}
              >
                <Box
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: ['300px', '300px', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 === 0 ? 'rotate(3deg)' : 'rotate(-3deg)',
                        height: '85%',
                        width: ['80%', '80%', '70%', '100%'],
                        marginLeft: ['10%', '10%', '15%', '0']
                      },
                      zIndex: 3,
                      '&:hover': { cursor: 'pointer' }
                    }}
                  >
                    <Photo
                      src={
                        count === images.length - 2
                          ? images[0].src
                          : images.length - 1
                            ? images[1].src
                            : images[count + 2].src
                      }
                      alt={
                        count === images.length - 2
                          ? images[0].alt
                          : images.length - 1
                            ? images[1].alt
                            : images[count + 2].alt
                      }
                      width={3000}
                      height={2550}
                      showAlt
                      dark={true}
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ position: 'absolute', width: '100%', height: '100%' }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      height: ['300px', '300px', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 === 0 ? 'rotate(-3deg)' : 'rotate(3deg)',
                        height: '85%',
                        width: ['80%', '80%', '70%', '100%'],
                        marginLeft: ['10%', '10%', '15%', '0']
                      },
                      zIndex: 3,
                      '&:hover': { cursor: 'pointer' }
                    }}
                  >
                    <Photo
                      src={
                        count === images.length - 1
                          ? images[0].src
                          : images[count + 1].src
                      }
                      alt={
                        count === images.length - 1
                          ? images[0].alt
                          : images[count + 1].alt
                      }
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
                      height: ['300px', '300px', '100%'],
                      figure: {
                        position: 'absolute',
                        transform:
                          count % 2 === 0 ? 'rotate(3deg)' : 'rotate(-3deg)',
                        height: '85%',
                        width: ['80%', '80%', '70%', '100%'],
                        marginLeft: ['10%', '10%', '15%', '0']
                      },
                      zIndex: 3,
                      '&:hover': { cursor: 'pointer' }
                    }}
                  >
                    <Photo
                      src={images[count].src}
                      alt={images[count].alt}
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
                  p: {
                    my: 0,
                    fontSize: ['18px', '20px', '22px'],
                    color: 'cyberpunk.text'
                  },
                  strong: {
                    display: 'block',
                    fontSize: ['22px', 2, 3],
                    color: 'cyberpunk.textHighlight'
                  }
                }}
                as="ul"
              >
                <Grid
                  columns="auto 1fr"
                  sx={{ py: 2, px: 2, borderRadius: 'extra' }}
                  as="li"
                >
                  <Text
                    as="span"
                    color="cyberpunk.accentElectricBlue"
                    aria-hidden="true"
                  >
                    1
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong sx={{ mb: 1 }}>
                      Connect with other teenage coders
                    </strong>
                    Have a coding question? Looking for project feedback? You'll
                    find hundreds of fabulous people to talk to in our global{' '}
                    <Link
                      href="/slack"
                      target="_blank"
                      rel="noopener"
                      sx={{ color: 'cyberpunk.accentElectricBlue' }}
                    >
                      Slack
                    </Link>
                    {' '}(like Discord), active at all hours.
                  </Text>
                </Grid>
                <Grid
                  columns="auto 1fr"
                  sx={{ py: 2, px: 2, borderRadius: 'extra' }}
                  as="li"
                >
                  <Text
                    as="span"
                    color="cyberpunk.accentHotPinkGradient"
                    aria-hidden="true"
                  >
                    2
                  </Text>
                  <Text as="p" variant="subtitle" sx={{ mt: 0 }}>
                    <strong sx={{ mb: 1 }}>
                      Build open source learning tools
                    </strong>
                    We build large open source projects together (
                    <Link
                      href="https://github.com/hackclub"
                      target="_blank"
                      sx={{ color: 'cyberpunk.accentHotPinkGradient' }}
                    >
                      3k+&nbsp;PRs a year
                    </Link>
                    ) like this website, a game engine, daily streak system,
                    and more!
                  </Text>
                </Grid>
                <Grid
                  columns="auto 1fr"
                  sx={{ py: 2, px: 2, borderRadius: 'extra' }}
                  as="li"
                >
                  <Text
                    as="span"
                    color="cyberpunk.accentNeonPurple"
                    aria-hidden="true"
                  >
                    3
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong sx={{ mb: 1 }}>
                      Gather IRL with other makers
                    </strong>
                    Meet other Hack&nbsp;Clubbers in your community to build
                    together at one of the 400+{' '}
                    <Link
                      href="/clubs"
                      target="_blank"
                      rel="noopener"
                      sx={{ color: 'cyberpunk.accentNeonPurple' }}
                    >
                      Hack&nbsp;Clubs
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/hackathons"
                      target="_blank"
                      rel="noopener"
                      sx={{ color: 'cyberpunk.accentNeonPurple' }}
                    >
                      high school hackathons
                    </Link>
                    .
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Carousel cards={carouselCards} />
        <Box
          id="spotlight"
          as="section"
          sx={{
            bg: 'cyberpunk.lightBg',
            backgroundImage: `
              linear-gradient(${cyberpunkColorPalette.lightBg}E6, ${cyberpunkColorPalette.lightBg}E6), 
              url('https://icons.hackclub.com/api/icons/${cyberpunkColorPalette.accentCyan.substring(1)}/glyph:rep.svg')
            `,
            backgroundSize: 'cover, 40px 40px',
            backgroundRepeat: 'no-repeat, repeat',
            position: 'relative'
          }}
        >
          <Box
            ref={spotlightRef}
            sx={{
              position: 'absolute',
              zIndex: 2,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '150px',
                background: `linear-gradient(to bottom, transparent, ${cyberpunkColorPalette.background})`,
                pointerEvents: 'none',
                zIndex: 2
              }
            }}
          />
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto',
              zIndex: 5,
              color: 'cyberpunk.text'
            }}
            py={[4, 4, 5]}
          >
            <Box>
              <Text
                variant="title"
                sx={{
                  fontSize: ['36px', 4, 5],
                  color: 'cyberpunk.textHighlight'
                }}
              >
                Connect with{' '}
                <Text
                  as="span"
                  sx={{
                    borderRadius: 'default',
                    px: 2,
                    mx: 0,
                    whiteSpace: 'nowrap',
                    color: 'cyberpunk.background',
                    bg: 'cyberpunk.accentElectricBlue'
                  }}
                >
                  builders
                </Text>{' '}
                from around the world
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{
                  fontSize: ['18px', '20px', '22px'],
                  pb: [3, 0, 0],
                  color: 'cyberpunk.textSecondary',
                  opacity: 0.9
                }}
              >
                We gather both online and in-person to share our love of code
                and make things together!
              </Text>
            </Box>
            <Neighborhood /> <Trail /> <Scrapyard />
            <Slack slackKey={0} data={slackData} events={events} />
          </Box>
        </Box>
        <Box sx={{ bg: 'cyberpunk.lightBg' }}>
          <Box py={[4, 5, '82px']}>
            <Box
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto',
                position: 'relative'
              }}
            >
              <Flex
                sx={{
                  flexDirection: ['column', 'column', 'column', 'row'],
                  justifyContent: gitHubData ? 'center' : 'flex-start',
                  alignItems: [
                    'flex-start',
                    'flex-start',
                    'flex-start',
                    'center'
                  ],
                  gap: '20px'
                }}
              >
                <Box sx={{ mb: [3, 0, 0], flex: 2 }}>
                  <Text
                    variant="title"
                    as="h2"
                    sx={{
                      fontSize: ['36px', '48px', '56px'],
                      maxWidth: '20ch'
                    }}
                  >
                    We build{' '}
                    <Text
                      as="span"
                      sx={{
                        borderRadius: 'default',
                        mx: 0,
                        whiteSpace: 'nowrap',
                        color: 'cyberpunk.accentNeonPurple'
                      }}
                    >
                      open source
                    </Text>{' '}
                    games and tools together
                  </Text>
                  <Text
                    variant="subtitle"
                    as="p"
                    sx={{
                      fontSize: ['18px', '20px', '22px'],
                      pb: [3, 0, 0],
                      maxWidth: 'unset'
                    }}
                  >
                    In collaboration with engineers on the Hack Club team, Hack
                    Clubbers build learning tools for each other. Get involved
                    with these projects by building something with our tools or
                    contribute to the tools themselves.
                  </Text>
                </Box>
                {gitHubData && (
                  <Flex
                    sx={{
                      flex: 1,
                      flexDirection: ['row', null, null, 'column'],
                      gap: [1, 2, 2],
                      alignItems: ['center', 'center', 'center', 'flex-start'],
                      flexWrap: 'wrap',
                      width: ['100%', null, null, 'fit-content'],
                      '& > a:nth-child(n+4)': {
                        display: ['none', null, null, 'flex']
                      }
                    }}
                  >
                    <Text
                      sx={{
                        fontSize: ['11px', '11px', '14px'],
                        textAlign: 'left',
                        lineHeight: '90%',
                        fontStyle: 'italic',
                        width: 'fit-content',
                        color: 'cyberpunk.textMuted'
                      }}
                    >
                      Live from GitHub
                    </Text>
                    {gitHubData
                      .filter(data => !data.user.endsWith('[bot]'))
                      .slice(0, 4)
                      .map((data, key) => (
                        <GitHub
                          type={data.type}
                          img={data.userImage}
                          user={data.user}
                          time={data.time}
                          url={data.url}
                          message={data.message}
                          key={key}
                          opacity={1 / (key / 2 + 1)}
                        />
                      ))}
                  </Flex>
                )}
              </Flex>
              <Sprig
                delay={100}
                stars={stars.sprig.stargazerCount}
                game={game}
                gameImage={gameImage}
                gameImage1={gameImage1}
              />
              <Onboard stars={stars.onboard.stargazerCount} delay={100} />
              <Sinerider delay={200} stars={stars.sinerider.stargazerCount} />
              <Box as="section" id="sprig">
                <SprigConsole
                  delay={300}
                  stars={stars.sprig.stargazerCount}
                  consoleCount={consoleCount}
                />
              </Box>
              <Workshops delay={400} stars={stars.hackclub.stargazerCount} />
            </Box>
          </Box>
          <Box
            sx={{
              position: 'relative',
              bg: 'cyberpunk.lighterBg',
              backgroundImage: `url('https://icons.hackclub.com/api/icons/${cyberpunkColorPalette.accentMagenta.substring(1)}/glyph:rep.svg')`,
              backgroundSize: '40px 40px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '10% 10%'
            }}
          >
            <Box
              py={[4, 5, '82px']}
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto',
                position: 'relative'
              }}
            >
              <Box>
                <Text
                  variant="title"
                  as="h2"
                  sx={{
                    fontSize: ['36px', '48px', '72px'],
                    width: '18ch',
                    textAlign: 'center',
                    margin: 'auto',
                    mb: 1,
                    color: 'cyberpunk.textHighlight'
                  }}
                >
                  Find your{' '}
                  <Text
                    as="span"
                    sx={{
                      borderRadius: 'default',
                      ml: 0,
                      whiteSpace: ['wrap', 'nowrap'],
                      background: cyberpunkColorPalette.buttonGradient,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    IRL community.
                  </Text>
                </Text>
                <Text
                  variant="subtitle"
                  as="p"
                  sx={{
                    fontSize: ['18px', '24px', '32px'],
                    margin: 'auto',
                    pt: 2,
                    textAlign: 'center',
                    color: 'cyberpunk.textSecondary',
                    opacity: 0.9
                  }}
                >
                  Thousands of Hack Clubbers organize and participate in
                  hackathons and after school coding clubs.
                </Text>
              </Box>
              <Clubs />
              <Hackathons
                delay={400}
                data={hackathonsData}
                stars={stars.hackathons.stargazerCount}
              />
              <HCB data={bankData} />
            </Box>
          </Box>
        </Box>
        <Box
          as="section"
          sx={{
            bg: 'cyberpunk.lighterBg',
            py: [4, 5],
            color: 'cyberpunk.text',
            borderTop: '1px solid',
            borderBottom: '1px solid',
            borderColor: 'cyberpunk.gridLine'
          }}
        >
          <Box
            sx={{ maxWidth: ['90vw', '85vw', '70ch'], mx: 'auto', px: 3 }}
          >
            <Text
              as="p"
              sx={{
                fontSize: ['18px', '20px', '22px'],
                lineHeight: 1.75,
                color: 'cyberpunk.text',
                mb: 3,
                '& strong': { color: 'cyberpunk.accentElectricBlue' }
              }}
            >
              <strong>
                Hack Club isn't like a CS Discord server or a WhatsApp group.
              </strong>{' '}
              It's a place for those who build things and dream big, not for
              class credit or for an exam, but for the love of making.
            </Text>
            <Text
              as="p"
              sx={{
                fontSize: ['18px', '20px', '22px'],
                lineHeight: 1.75,
                color: 'cyberpunk.text',
                mb: 3,
                '& strong': { color: 'cyberpunk.accentMagenta' }
              }}
            >
              <strong>
                It's for the folks who've been coding in their bedrooms
              </strong>{' '}
              and want to share their work with teens who get them. It's for
              the folks who've never written a line of code in their life, and
              want help from people who'll go above and beyond to help you, not
              just tell you to just "read the manual" or "ask ChatGPT".
            </Text>
            <Text
              as="p"
              sx={{
                fontSize: ['18px', '20px', '22px'],
                lineHeight: 1.75,
                color: 'cyberpunk.text',
                '& strong': { color: 'cyberpunk.accentNeonPurple' }
              }}
            >
              <strong>We're builders ourselves,</strong> and we know that across
              the world, there are tens of thousands of teens who just need
              someone to give them a little push and help them make something
              they're proud of.
            </Text>
          </Box>
        </Box>
        <Box py={[4, 5, '82px']} sx={{ bg: 'cyberpunk.lightBg' }}>
          <Box sx={{ width: '90vw', maxWidth: 'layout', margin: 'auto' }}>
            <Box>
              <Text
                as="p"
                variant="eyebrow"
                sx={{ fontSize: ['22px', 2, 3] }}
              >
                We've got a lot going on - Let's recap
              </Text>
              <Text
                variant="title"
                as="h2"
                sx={{
                  fontSize: ['36px', '48px', '72px'],
                  width: '16ch',
                  textAlign: 'center',
                  margin: 'auto',
                  mb: 4
                }}
              >
                Find your second home at{' '}
                <Text
                  as="span"
                  sx={{
                    background: cyberpunkColorPalette.buttonGradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline'
                  }}
                >
                  Hack Club
                </Text>
              </Text>
              <Flex
                sx={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 4,
                  mb: [4, 5]
                }}
              >
                <Text
                  sx={{
                    fontSize: ['18px', '22px'],
                    color: 'cyberpunk.textSecondary',
                    textAlign: 'center',
                    maxWidth: '600px',
                    mx: 'auto'
                  }}
                >
                  Ready to find your people and build amazing things? The Hack
                  Club Slack is where it happens.
                </Text>
                <Button
                  as="a"
                  href="/slack"
                  variant="ctaLg"
                  sx={{
                    fontSize: ['24px', '36px', '42px'],
                    px: [5, 6],
                    py: [3, 4],
                    borderRadius: 50,
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: `0 0 25px ${cyberpunkColorPalette.accentElectricBlue}`
                    }
                  }}
                >
                  JOIN THE SLACK →
                </Button>
                <Text variant="ctaLabel">
                  Join{' '}
                  {slackData.total_members_count
                    ? withCommas(slackData.total_members_count)
                    : '60k+'}{' '}
                  teen hackers building the future
                </Text>
              </Flex>
              <Grid
                pt={[3, 4]}
                gap={3}
                columns={[1, 2, 3]}
                sx={{
                  textAlign: 'left',
                  '> a, > div': { variant: 'cards.interactive' }
                }}
              >
                <Card
                  as="a"
                  href="/slack"
                  target="_blank"
                  rel="noopener"
                  variant="interactive"
                  sx={{
                    background: `linear-gradient(32deg, ${cyberpunkColorPalette.accentElectricBlue} 0%, ${cyberpunkColorPalette.cardBg} 100%)`
                  }}
                >
                  <Icon
                    glyph="external"
                    size={32}
                    className="icon"
                    sx={{ color: 'cyberpunk.white !important' }}
                  />
                  <Stage
                    icon="slack"
                    color="cyberpunk.textHighlight"
                    name="Meet Fellow Makers"
                    desc="Connect with 60k+ technical teenagers on Slack and hack on things together."
                  />
                </Card>
                <Card
                  as="a"
                  href="https://github.com/hackclub"
                  variant="interactive"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    background: `linear-gradient(-32deg, ${cyberpunkColorPalette.accentHotPinkGradient} 14%, ${cyberpunkColorPalette.cardBg} 82%)`
                  }}
                >
                  <Icon
                    glyph="external"
                    size={32}
                    className="icon"
                    sx={{ color: 'cyberpunk.white !important' }}
                  />
                  <Stage
                    icon="github"
                    color="cyberpunk.textHighlight"
                    name="Explore Our Open Source Tools"
                    desc="We're currently building a game engine, daily streak system, graphing game, and more!"
                  />
                </Card>
                <Card
                  as="a"
                  href="/clubs"
                  variant="interactive"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    background: `linear-gradient(to bottom, ${cyberpunkColorPalette.accentNeonPurple} 0%, ${cyberpunkColorPalette.cardBg} 100%)`
                  }}
                >
                  <Icon
                    glyph="external"
                    size={32}
                    className="icon"
                    sx={{ color: 'cyberpunk.white !important' }}
                  />
                  <Stage
                    icon="clubs"
                    color="cyberpunk.textHighlight"
                    name="Start A Club"
                    desc="Build an in-person community of high school hackers, and we're here to help."
                  />
                </Card>
              </Grid>
            </Box>
          </Box>
        </Box>

        {new URL(asPath, 'http://example.com').searchParams.get('gen') ===
          'z' && (
            <>
              <Box
                sx={{
                  position: 'fixed',
                  top: 0,
                  width: '100%',
                  zIndex: 1000
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    margin: 'auto',
                    width: 'fit-content',
                    lineHeight: 0
                  }}
                >
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/sJNK4VKeoBM?si=zvhDKhb9C5G2b4TJ&controls=1&autoplay=1&mute=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </Box>
              </Box>
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  right: 0,
                  zIndex: 1000,
                  lineHeight: 0
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/ChBg4aowzX8?si=X2J_T95yiaKXB2q4&controls=1&autoplay=1&mute=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </Box>
              <Box
                sx={{
                  position: 'fixed',
                  bottom: 0,
                  left: 0,
                  zIndex: 1000,
                  lineHeight: 0
                }}
              >
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube-nocookie.com/embed/JDQr1vICu54?si=U6-9AFtk7EdTabfp&autoplay=1&mute=1"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </Box>
            </>
          )}
        <MailingList />
      </Box>
      <Footer
        dark
        pink
        sx={{
          backgroundColor: 'cyberpunk.accentHotPinkFooter',
          position: 'relative',
          overflow: 'hidden',
          textShadow: `0 1px 2px ${cyberpunkColorPalette.black}60`,
          'h2,span,p,a': { color: 'cyberpunk.white !important' },
          '> div img': { objectPosition: ['left', 'center'] },
          svg: {
            fill: 'cyberpunk.white',
            filter: `drop-shadow(0 1px 2px ${cyberpunkColorPalette.black}3F)`
          }
        }}
      ></Footer>
    </ThemeProvider>
  )
}
const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

export async function getStaticProps() {
  const [
    bankResponse,
    slackData,
    gitHubData,
    stars,
    game,
    consoleCount,
    hackathonsData,
    events
  ] = await Promise.all([
    fetch('https://hcb.hackclub.com/stats'),
    Slacky(),
    fetchGitHub(),
    fetchStars(),
    getGames(),
    getConsoles(),
    fetch('https://hackathons.hackclub.com/api/events/upcoming').then(res =>
      res.ok ? res.json() : []
    ),
    fetch('https://events.hackclub.com/api/events/upcoming/')
      .then(res => res.json())
      .catch(() => [])
  ])

  let bankDataProcessed = []
  try {
    const bd = await bankResponse.json()
    let raised = bd.raised / 100
    bankDataProcessed.push(
      `💰 ${raised.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })} raised`
    )
  } catch {
    bankDataProcessed.push('error')
  }

  if (Array.isArray(hackathonsData)) {
    hackathonsData.sort((a, b) => new Date(a.start) - new Date(b.start))
  }

  let gameTitle = game ? game.map(r => r.title) : []

  return {
    props: {
      game: game || [],
      gameTitle,
      gitHubData: gitHubData || null,
      consoleCount,
      hackathonsData: hackathonsData || [],
      bankData: bankDataProcessed,
      slackData,
      stars,
      events: events || [],
      carouselCards: carouselCardsData
    },
    revalidate: 60
  }
}

export default Page