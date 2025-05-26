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
import BGImg from '../components/background-image'
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
import OuternetImgFile from '../public/home/outernet-110.jpg'
import AssembleBannerImg from "../public/banner.png"
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
import Juice from "../components/index/cards/juice"
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
import carouselCardsData from '../lib/carousel.json';
import { Slack as Slacky } from './api/slack';
import { fetchGitHub } from './api/github';
import { fetchStars } from './api/stars';
import { getGames } from './api/games';
import { getConsoles } from './api/sprig-console';
/** @jsxImportSource theme-ui */

// Define cyberpunk variants locally for the homepage
const cyberpunkVariants = {
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
      color: 'cyberpunk.text'
    },
    headline: {
      variant: 'text.title',
      fontSize: [4, 5, 6],
      mt: 3,
      mb: 3,
      color: 'cyberpunk.textHighlight'
    },
    ultratitle: {
      variant: 'text.title',
      fontSize: [5, 6, 7],
      mb: 4,
      color: 'cyberpunk.textHighlight'
    },
    lead: {
      fontSize: [2, 3],
      maxWidth: 'copyPlus',
      color: 'cyberpunk.text'
    }
  },
  buttons: {
    primary: {
      textTransform: 'uppercase',
      backgroundImage: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
      '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform 0.2s ease-in-out'
      },
      gap: 2,
      color: 'white'
    }
  }
}

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
  events,
  carouselCards,
  context,
  happeningsPosts
}) {
  let [gameImage, setGameImage] = useState('')
  let [gameImage1, setGameImage1] = useState('')
  let [reveal, setReveal] = useState(false)
  const [hover, setHover] = useState(true)
  let [github, setGithub] = useState(0)
  let [slackKey, setSlackKey] = useState(0)
  let [key, setKey] = useState(0)

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
        // Hack Club colours!
        '#ec3750',
        '#ff8c37',
        '#f1c40f',
        '#33d6a6',
        '#5bc0de',
        '#338eda',
        '#a633d6'
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
    { alt: 'AMA with Sal Khan', src: '/home/ama.png' },
    {
      alt: 'Hack Clubbers at SpaceX HQ in LA',
      src: '/home/zephyr-spacex.jpeg'
    },
    { alt: 'Map of Hack Clubs around the world', src: '/home/map.png' },
    {
      alt: 'MA Hacks, Hack Clubber organized hackathon',
      src: '/hackathons/mahacks.jpeg'
    },
    { alt: 'Hack Clubbers at Flagship, 2019', src: '/home/flagship_4.jpg' }
  ]

  // janky right now and does not show last image

  useEffect(() => {
    console.log(
      `White sheets of paper\nWaiting to be printed on\nA blank console waits`
    )
    if (count === images.length - 1) {
      setCount(0)
    }
  }, [count, images.length])

  // Spotlight effect
  const spotlightRef = useRef()
  useEffect(() => {
    const handler = event => {
      var rect = document.getElementById('spotlight').getBoundingClientRect()
      var x = event.clientX - rect.left //x position within the element.
      var y = event.clientY - rect.top //y position within the element.

      spotlightRef.current.style.background = `radial-gradient(
				circle at ${x}px ${y}px,
				rgba(132, 146, 166, 0) 10px,
				rgba(249, 250, 252, 0.9) 80px
			)`
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
          bg: 'cyberpunk.darkBg',
          color: 'cyberpunk.text',
          '@keyframes gridFloat': {
            '0%': {
              backgroundPosition: '0 0'
            },
            '100%': {
              backgroundPosition: '100px 100px'
            }
          }
        }}
      >
        <Secret
          reveal={reveal}
          onMouseEnter={() => {
            setHover(true)
            console.log(hover)
          }}
          onMouseOut={() => {
            setReveal(false)
          }}
        />
        <Konami action={easterEgg}>
          {"Hey, I'm an Easter Egg! Look at me!"}
        </Konami>
        <Box
          as="header"
          sx={{
            bg: 'cyberpunk.darkerBg',
            pt: [7, 8, '180px'],
            pb: [6, 7, '160px'],
            minHeight: ['50vh'],
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <BGImg
            src={AssembleBannerImg}
            alt="Hack Clubbers at Assemble in SF"
            width={1920}
            height={1080}
            priority
          />
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
                background: 'linear-gradient(to right,rgb(200, 215, 219),rgb(255, 253, 255))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                textShadow: '0 0 20px rgba(0, 191, 255, 0.3)'
              }}
            >
              A Home for High School Makers
            </Text>
            <Text
              as="p"
              variant="subtitle"
              sx={{
                fontSize: ['18px', '22px', '24px'],
                maxWidth: '650px',
                mx: 'auto',
                mb: 4,
                color: 'cyberpunk.textHighlight',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.2)'
              }}
            >
              Join a community of <Comma>{slackData.total_members_count}</Comma> makers, building open source projects and learning to code together.
            </Text>
            <Flex
              sx={{
                justifyContent: 'center',
                gap: 3,
                flexWrap: 'wrap',
              }}
            >
              <Button
                variant="ctaLg"
                as="a"
                href="/slack"
                sx={{
                  transformOrigin: 'center left',
                  bg: '#8A2BE2',
                  px: 4,
                  py: 3,
                  fontSize: [2, 3]
                }}
              >
                <Text>Join {slackData.total_members_count ? withCommas(slackData.total_members_count) : '60k+'} Teen Hackers</Text>
                <Icon glyph="slack-fill" size={24} />
              </Button>
              <Button
                variant="ctaLg"
                as="a"
                href="https://shipwrecked.hack.club/3"
                sx={{
                  transformOrigin: 'left',
                  backgroundImage: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
                  px: 4,
                  py: 3,
                  fontSize: [2, 3]
                }}
              >
                Sign Up: Private Island Hackathon
              </Button>
            </Flex>
            <Flex sx={{
              gap: [3],
              my: 1,
              py: 3,
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: ['16px', '18px'],
              color: 'cyberpunk.textHighlight',
              opacity: 0.95,
            }}>
              <Text sx={{
                color: '#33d6a6',
                fontWeight: 'bold',
                textShadow: '0 0 10px rgba(51, 214, 166, 0.3)'
              }}>
                $500k+ in prizes given
              </Text>
              <Text sx={{ color: 'cyberpunk.textMuted' }}>•</Text>
              <Text>80k+ projects built</Text>
              <Text sx={{ color: 'cyberpunk.textMuted' }}>•</Text>
              <Text><Comma>{slackData.total_members_count || 60_000}</Comma> teenage builders</Text>
            </Flex>
          </Box>
        </Box>
        <Box as="section" sx={{ py: [4, 5, '82px'], bg: 'cyberpunk.darkBg' }}>
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
                fontSize: ['36px', '48px', '56px'],
                color: 'white'
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
                  background: 'linear-gradient(to right, #00BFFF, #F002ED)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                joy of code
              </Text>
              , <i>together</i>.
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{
                fontSize: ['18px', '20px', '22px'],
                pb: [3, 3, 4],
                maxWidth: 'unset',
                color: 'cyberpunk.text'
              }}
            >
              Coding can be a solitary activity - but it doesn't have to be that way. We've organised hackathons across China, the US, Canada, India, and more, and believe that the
              best way to enjoy programming is to do it with other people. Here's how we can help you do just that:
            </Text>
            <Grid columns={[1, 1, 1, '2.5fr 3fr']} gap={[0, 3, 4]} pt={[3, 4]}>
              <Box
                sx={{
                  position: 'relative',
                  height: ['300px', '300px', '300px', '100%'],
                  py: [3, 3, 3, 0]
                }}
                onClick={() => {
                  setCount(count + 1)
                }}
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
                      '&:hover': {
                        cursor: 'pointer'
                      }
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
                      '&:hover': {
                        cursor: 'pointer'
                      }
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
                      '&:hover': {
                        cursor: 'pointer'
                      },
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
                    color: 'white'
                  }
                }}
                as="ul"
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
                  }}
                  as="li"
                >
                  <Text as="span" color="cyberpunk.electricBlue" aria-hidden="true">
                    1
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong sx={{ mb: 1 }}>
                      Connect with other teenage coders
                    </strong>
                    Have a coding question? Looking for project feedback? You'll
                    find thousands of fabulous people to talk to in our global{' '}
                    <Link href="/slack" target="_blank" rel="noopener">
                      Slack
                    </Link>
                    {' '}(like Discord), active at all hours.
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
                  }}
                  as="li"
                >
                  <Text as="span" color="#F002ED" aria-hidden="true">
                    2
                  </Text>
                  <Text
                    as="p"
                    variant="subtitle"
                    sx={{
                      mt: 0
                    }}
                  >
                    <strong sx={{ mb: 1 }}>
                      Build open source coding tools
                    </strong>
                    We build open source projects together (
                    <Link href="https://github.com/hackclub" target="_blank">
                      3k+&nbsp;PRs a year
                    </Link>
                    ) like this website, a game engine (and console!), a daily streak tracker, and
                    more! And of course, you can always choose to start a project of your own.
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
                  }}
                  as="li"
                >
                  <Text as="span" color="#8A2BE2" aria-hidden="true">
                    3
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong sx={{ mb: 1 }}>Gather IRL with other makers</strong>
                    Meet other Hack&nbsp;Clubbers in your community to build
                    together at one of the 400+{' '}
                    <Link href="/clubs" target="_blank" rel="noopener">
                      Hack&nbsp;Clubs
                    </Link>{' '}
                    and{' '}
                    <Link href="/hackathons" target="_blank" rel="noopener">
                      high school hackathons
                    </Link>{" "}
                    (social coding events).
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
            backgroundImage: `
              linear-gradient(rgba(249, 250, 252, 0.7), rgba(249, 250, 252, 0.7)),
              url('https://icons.hackclub.com/api/icons/0x8492a6/glyph:rep.svg')
            `,
            backgroundSize: '40px 40px',
            backgroundRepeat: 'repeat',
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
              bg: 'snow',
              pointerEvents: 'none',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '150px',
                background: 'linear-gradient(to bottom, transparent, #0A0F2C)',
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
              color: "black"
            }}
            py={[4, 4, 5]}
          >
            <Box>
              <Text variant="title" sx={{ fontSize: ['36px', 4, 5], color: 'cyberpunk.textForeground' }}>
                Connect with{' '}
                <Text
                  as="span"
                  sx={{
                    borderRadius: 'default',
                    px: 2,
                    mx: 0,
                    whiteSpace: 'nowrap',
                    color: 'cyberpunk.textHighlight',
                    bg: 'cyberpunk.electricBlue' // Electric Blue
                  }}
                >
                  builders
                </Text>{' '}
                from around the world
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ fontSize: ['18px', '20px', '22px'], pb: [3, 0, 0], color: 'cyberpunk.textForeground', opacity: 0.8 }}
              >
                We gather both online and in-person to share our love of code
                and make things together!
              </Text>
            </Box>
            <Neighborhood />
            <Trail />
            <Scrapyard />
            <Juice />
            <Slack slackKey={slackKey} data={slackData} events={events} />
          </Box>
        </Box>
        <Box>
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
                  gap: '10px'
                }}
              >
                <Box sx={{ mb: [3, 0, 0] }}>
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
                        background: 'linear-gradient(to right, #00BFFF, #F002ED)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
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
                    In collaboration with engineers on the Hack Club team, Hack Clubbers build learning tools for each other. Get involved with these projects by building something with our tools or contribute to the tools themselves.
                  </Text>
                </Box>
                {gitHubData && (
                  <Flex
                    sx={{
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
                        width: 'fit-content'
                      }}
                    >
                      Live from GitHub
                    </Text>
                    {gitHubData
                      .filter(data => !data.user.endsWith('[bot]'))
                      .slice(0, 4)
                      .map((data, key) => {
                        return (
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
                        )
                      })}
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
              background: 'snow',
              backgroundImage: `url('https://icons.hackclub.com/api/icons/0xF4F7FB/glyph:rep.svg')`,
              backgroundSize: '40px 40px',
              backgroundRepeat: 'repeat',
              backgroundPosition: '10% 10%'
              // '&:hover': {
              //   backgroundImage: `url('https://icons.hackclub.com/api/icons/0x000000/glyph:rep.svg')`
              // }
            }}
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
              { }
            </Box>
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
                    color: 'cyberpunk.textForeground'
                  }}
                >
                  Find your{' '}
                  <Text
                    as="span"
                    sx={{
                      borderRadius: 'default',
                      ml: 0,
                      whiteSpace: ['wrap', 'nowrap'],
                      background: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
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
                    color: 'cyberpunk.textForeground',
                    opacity: 0.8
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

              {/* <Events events={events} /> */}
              <HCB data={bankData} />
            </Box>
          </Box>
        </Box>
        <Box as="section" sx={{
          bg: 'cyberpunk.darkerBg',
          py: [4, 5],
          color: 'cyberpunk.text',
          borderTop: '1px solid',
          borderBottom: '1px solid',
          borderColor: 'cyberpunk.gridLine'
        }}>
          <Box sx={{
            maxWidth: ['90vw', '85vw', '70ch'],
            mx: 'auto',
            px: 3
          }}>
            <Text as="p" sx={{
              fontSize: ['18px', '20px', '22px'],
              lineHeight: 1.75,
              color: 'cyberpunk.text',
              mb: 3,
              '& strong': {
                color: 'cyberpunk.electricBlue'
              }
            }}>
              <strong>Hack Club isn't like a CS Discord server or a WhatsApp group.</strong> It's a place for those who build things and dream big, not for class credit or for an exam, but for the love of making.
            </Text>
            <Text as="p" sx={{
              fontSize: ['18px', '20px', '22px'],
              lineHeight: 1.75,
              color: 'cyberpunk.text',
              mb: 3,
              '& strong': {
                color: 'cyberpunk.magenta'
              }
            }}>
              <strong>It's for the folks who've been coding in their bedrooms</strong> and want to share their work with teens who get them. It's for the folks who've never written a line of code in their life, and want help from people who'll go above and beyond to help you, not just tell you to just "read the manual" or "ask ChatGPT".
            </Text>
            <Text as="p" sx={{
              fontSize: ['18px', '20px', '22px'],
              lineHeight: 1.75,
              color: 'cyberpunk.text',
              '& strong': {
                color: 'cyberpunk.neonPurple'
              }
            }}>
              <strong>We're builders ourselves,</strong> and we know that across the world, there are tens of thousands of teens who just need someone to give them a little push and help them make something they're proud of.
            </Text>
          </Box>
        </Box>
        <Box py={[4, 5, '82px']}>
          <Box
            sx={{
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Box>
              <Text
                as="p"
                variant="eyebrow"
                sx={{
                  fontSize: ['22px', 2, 3], textAlign: 'center', letterSpacing: "0.1em"
                }}
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
                    background: 'linear-gradient(90deg, #00BFFF 0%, #8A2BE2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline'
                  }}
                >
                  Hack Club
                </Text>
              </Text>

              <Flex sx={{
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                mb: [4, 5]
              }}>
                <Text
                  sx={{
                    fontSize: ['18px', '22px'],
                    color: 'cyberpunk.text',
                    textAlign: 'center',
                    maxWidth: '600px',
                    mx: 'auto'
                  }}
                >
                  Ready to find your people and build amazing things? The Hack Club Slack is where it happens.
                </Text>
                <Button
                  as="a"
                  href="/slack"
                  variant="ctaLg"
                  sx={{
                    fontSize: ['24px', '42px'],
                    px: [5, 6],
                    py: [3, 4],
                    borderRadius: 50,
                    background: 'linear-gradient(90deg, #00BFFF 0%, #8A2BE2 100%)',
                    color: 'white',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '0.02em',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 20px rgba(0, 191, 255, 0.5)'
                    }
                  }}
                >
                  JOIN THE SLACK →
                </Button>
                <Text variant="ctaLabel">
                  Join {slackData.total_members_count ? withCommas(slackData.total_members_count) : '60k+'} teen hackers building the future
                </Text>
              </Flex>

              <Grid
                pt={[3, 4]}
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
                      'linear-gradient(32deg, #00BFFF 0%, #1A1032 100%)', // Blue to Dark Blue/Purple
                    color: 'white',
                    svg: { color: '#E0E0E0' }, // Light icon color
                    position: 'relative',
                    '.icon': {
                      transition:
                        'transform 0.25s ease-in-out, opacity 0.25s ease-in-out'
                    },
                    ':hover,:focus': {
                      '.icon': {
                        transform: 'translateX(28px) translateY(-28px)',
                        opacity: 0
                      }
                    }
                  }}
                >
                  <Icon
                    glyph="external"
                    size={32}
                    className="icon"
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      opacity: 0.3,
                      fontSize: ['18px', '20px', '22px'],
                      zIndex: 3,
                      color: 'white !important'
                    }}
                  />
                  <Stage
                    icon="slack"
                    color="black"
                    name="Meet Fellow Makers"
                    desc="Connect with 60k+ technical teenagers on Slack and hack on things together."
                    sx={{
                      p: {
                        fontSize: ['18px', '20px', '22px']
                      },
                      h3: {
                        fontSize: ['22px', 2, 3]
                      }
                    }}
                  />
                </Card>
                <Card
                  sx={{
                    background:
                      'linear-gradient(-32deg, #F002ED 14%, #1A1032 82%)', // Magenta to Dark Purple
                    color: 'white',
                    svg: { color: '#E0E0E0' }, // Light icon color
                    textDecoration: 'none',
                    position: 'relative',
                    '.icon': {
                      transition:
                        'transform 0.25s ease-in-out, opacity 0.25s ease-in-out'
                    },
                    ':hover,:focus': {
                      '.icon': {
                        transform: 'translateX(28px) translateY(-28px)',
                        opacity: 0
                      }
                    }
                  }}
                  as="a"
                  href="https://github.com/hackclub"
                  variant="interactive"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon
                    glyph="external"
                    size={32}
                    className="icon"
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      opacity: 0.3,
                      fontSize: [1, '16px', '20px'],
                      zIndex: 3,
                      color: 'white !important'
                    }}
                  />
                  <Stage
                    icon="github"
                    color="black"
                    name="Explore Our Open Source Tools"
                    desc="We're currently building a game engine, daily streak system, graphing game, and more!"
                    sx={{
                      p: {
                        fontSize: [1, '16px', '20px']
                      },
                      h3: {
                        fontSize: ['22px', 2, 3]
                      }
                    }}
                  />
                </Card>
                <Card
                  sx={{
                    background:
                      'linear-gradient(to bottom, #8A2BE2 0%, #0A0F2C 100%)', // Neon Purple to Dark Blue/Purple
                    color: 'white',
                    svg: { color: '#E0E0E0' }, // Light icon color
                    textDecoration: 'none',
                    position: 'relative',
                    '.icon': {
                      transition:
                        'transform 0.25s ease-in-out, opacity 0.43s ease-in-out'
                    },
                    ':hover,:focus': {
                      '.icon': {
                        transform: 'translateX(28px) translateY(-28px)',
                        opacity: 0
                      }
                    }
                  }}
                  as="a"
                  href="/clubs"
                  variant="interactive"
                  target="_blank"
                  rel="noopener"
                >
                  <Icon
                    glyph="external"
                    size={32}
                    className="icon"
                    sx={{
                      position: 'absolute',
                      top: 2,
                      right: 2,
                      opacity: 0.3,
                      fontSize: ['18px', '20px', '22px'],
                      zIndex: 3,
                      color: 'white !important'
                    }}
                  />
                  <Stage
                    icon="clubs"
                    color="black"
                    name="Start A Club"
                    desc="Build an in-person community of high school hackers, and we're here to help."
                    sx={{
                      p: {
                        fontSize: ['18px', '20px', '22px']
                      },
                      h3: {
                        fontSize: ['22px', 2, 3]
                      }
                    }}
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
        <MailingList posts={happeningsPosts} />
      </Box >
      <Footer
        dark
        brown
        sx={{
          backgroundColor: 'rgb(104, 39, 71)',
          position: 'relative',
          overflow: 'hidden',
          textShadow: '0 1px 2px rgba(0,0,255,0.375)',
          'h2,span,p,a': { color: '#E0E0E0 !important' },
          '> div img': { objectPosition: ['left', 'center'] },
          svg: {
            fill: '#E0E0E0',
            filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.25))'
          }
        }}
      >
        <style>
          {`a{
          color: #338eda
        }`}
        </style>
      </Footer>
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
    fetch('https://hackathons.hackclub.com/api/events/upcoming').then(res => res.ok ? res.json() : []),
    fetch('https://events.hackclub.com/api/events/upcoming/').then(res => res.json()).catch(() => [])
  ])

  // Process bank data
  let bankData = []
  try {
    const bd = await bankResponse.json()
    let raised = bd.raised / 100
    bankData.push(
      `💰 ${raised.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })} raised`
    )
  } catch {
    bankData.push('error')
  }

  // Sort hackathons by date
  if (Array.isArray(hackathonsData)) {
    hackathonsData.sort((a, b) => new Date(a.start) - new Date(b.start))
  }

  let gameTitle = game ? game.map(r => r.title) : []

  try {
    const response = await fetch(
      'https://raw.githubusercontent.com/SkyfallWasTaken/Clippings/refs/heads/main/happenings.json'
    )
    const data = await response.json()
    const happeningsPosts = data.slice(-3).reverse()

    return {
      props: {
        game: game || [],
        gameTitle,
        gitHubData,
        consoleCount,
        hackathonsData: hackathonsData || [],
        bankData,
        slackData,
        stars,
        events: events || [],
        carouselCards: carouselCardsData, // Use imported data
        happeningsPosts
      },
      revalidate: 3600
    }
  } catch (error) {
    console.error('Failed to fetch happenings posts:', error)
    return {
      props: {
        game: game || [],
        gameTitle,
        gitHubData,
        consoleCount,
        hackathonsData: hackathonsData || [],
        bankData,
        slackData,
        stars,
        events: events || [],
        carouselCards: carouselCardsData, // Use imported data
        happeningsPosts: []
      }
    }
  }
}

export default Page