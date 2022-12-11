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
import FormData from 'form-data'
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

// function SlackNum({slackData}) {
//   let [key, setKey] = useState()
//   useEffect(() => {
//     return SlackNum =
//        <Text sx={{ animation: `.4s ${rollout}` }} key={Math.random()}>
//          {
//            slackData.stats.sort((a, b) => a.ds - b.ds).reverse()[0]
//              .total_members_count
//          }
//        </Text>
//    }, slackData)

//    return(
//      <></>
//    )
// }

function Page({
  hackathonsData,
  bankData,
  // slackData,
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
  let [slackNum, setSlackNum] = useState(22594)
  let [slack, setSlack] = useState(22594)
  let [github, setGithub] = useState(0)
  let [key1, setKey1] = useState(0)
  let [slackKey, setSlackKey] = useState(0)
  let [key, setKey] = useState(0)

  // let gitHubDataLength = gitHubData.length

  // console.log(gitHubDataLength)

  // useEffect(() => {
  //   function hehe() {
  //     setKey(Math.random())
  //     setGithub(Math.floor(Math.random() * (gitHubDataLength)))
  //     console.log(gitHubData[github])
  //   }
  //   setInterval(hehe, 6000)
  // }, [])

  const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // console.log(gitHubData)
  // console.log(slackData)
  // useEffect(() => {
  //   setSlack(slackData.stats.sort((a, b) => a.ds - b.ds).reverse()[0]
  //   .total_members_count)
  // })
  useEffect(() => {
    // console.log("one", slack)

    const add = setTimeout(() => {
      setSlack(x => x + 1)
      setSlackNum(slack)
      console.log(slackNum)
    }, Math.floor((Math.random() * (5 - 2) + 1) * 10000))

    return () => clearTimeout(add)

    // setInterval(add, 2000)
    // setSlackKey(Math.random())
  }, [slack])

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     // Check if it's open
  //     console.log('Is DevTools open:', devtools.isOpen)

  //     // Check it's orientation, `undefined` if not open
  //     console.log('DevTools orientation:', devtools.orientation)

  //     // Get notified when it's opened/closed or orientation changes
  //     window.addEventListener('devtoolschange', event => {
  //       console.log('Is DevTools open:', event.detail.isOpen)
  //       console.log('DevTools orientation:', event.detail.orientation)
  //     })

  //     window.kc = `In the days of old, when gaming was young \nA mysterious code was found among \nA sequence of buttons, pressed in a row \nIt unlocked something special, we all know \n\nUp, up, down, down, left, right, left, right \nB, A, Start, we all have heard it's plight \nIn the 8-bit days, it was all the rage \nAnd it still lives on, with time, it will never age \n\nKonami Code, it's a legend of days gone by \nIt's a reminder of the classics we still try \nNo matter the game, no matter the system \nThe code will live on, and still be with them \n\nSo the next time you play, take a moment to pause \nAnd remember the code, and the Konami cause \nIt's a part of gaming's history, and a part of our lives \nLet's keep it alive, and let the Konami Code thrive!\n`
  //   }
  // })

  // useEffect(() => {
  //   setKey(Math.random())
  //   setKey1(Math.random())
  // }, slackData)

  // useEffect(() => {
  //   //     window.kc = `In the days of old, when gaming was young \nA mysterious code was found among \nA sequence of buttons, pressed in a row \nIt unlocked something special, we all know \n\nUp, up, down, down, left, right, left, right \nB, A, Start, we all have heard it's plight \nIn the 8-bit days, it was all the rage \nAnd it still lives on, with time, it will never age \n\nKonami Code, it's a legend of days gone by \nIt's a reminder of the classics we still try \nNo matter the game, no matter the system \nThe code will live on, and still be with them \n\nSo the next time you play, take a moment to pause \nAnd remember the code, and the Konami cause \nIt's a part of gaming's history, and a part of our lives \nLet's keep it alive, and let the Konami Code thrive!\n`
  //   setInterval(() => {
  //     setKey(Math.random())
  //     // setGithub(Math.floor(Math.random()) * dataPieces.length)
  //     // console.log(Math.floor(Math.random()) * githubData2.length)
  //     console.log(Math.floor(Math.random() * dataPieces.length + 1))
  //   }, 8000)
  // }, [])

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
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
      // console.log(title)
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

  // }
  // })

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
          {/* <SlideDown duration={768}> */}
          <Box
            sx={{
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
              //  text={gitHubData[github].message}
              time={gitHubData[github].time}
              message={gitHubData[github].message}
              key={key}
              // text="✅ New commit in hackclub/hackclub by @bellesea"
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
                  fontSize: 'large'
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
                          mb: '20px',
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
                  by using code to build things we care about together.
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
          {/* </SlideDown> */}
        </Box>
        <Box as="section" sx={{ pt: [4, 5], color: 'black' }}>
          <Box
            sx={{
              position: 'relative',
              maxWidth: 'layout',
              margin: 'auto'
            }}
            // pb={4}
          >
            <Text variant="eyebrow" as="p" sx={{ fontSize: [1, 2, 3], mt: 4 }}>
              The rundown
            </Text>
            <Text variant="title" sx={{ fontSize: [3, 4, 5] }}>
              Join us in discovering the joy of code
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{ fontSize: [1, '16px', '20px'] }}
            >
              Here, we don't wait for permission to code. Hack Clubbers come
              together to code because it's fun. Whether you’re a beginner
              programmer or have years of experience, there’s a place for you at
              Hack Club. Read about our{' '}
              <Link href="/philosophy" target="_blank" rel="noopener">
                hacker ethic
              </Link>
              .
            </Text>
            <Grid
              columns={[null, null, 2, '2.5fr 3fr']}
              gap={[3, 4]}
              pt={[3, 4]}
            >
              <Box
                sx={{
                  position: 'relative',
                  figure: {
                    position: 'absolute',
                    transform: 'rotate(-3deg)',
                    height: '85%',
                    width: '100%'
                  }
                }}
              >
                <Photo
                  src="https://dl.airtable.com/.attachmentThumbnails/904cf56ceac6b0921eceae02958dcd29/5851864a"
                  alt="Summer Creek Hack Club meeting, February 2020"
                  width={3000}
                  height={2550}
                  showAlt
                />
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
                    transitionDuration: '0.39s',
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
                  data-effect="solid"
                  data-tip="learn more about our online community"
                  data-delay-show="236"
                >
                  <Text as="span" color="purple">
                    1
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong>Connect virtually with other teenagers</strong>
                    We're united by our love for coding but talk about and do
                    everything else too.
                    {/* <Button
                    variant="primary"
                    sx={{
                      backgroundColor: 'purple',
                      color: 'white',
                      mt: 3,
                      display: 'flex',
                      width: 'fit-content'
                    }}
                    as="a"
                    href="/slack"
                    target="_blank"
                    rel="noopener"
                  >
                    Join our community{' '}
                    <Icon
                      glyph="slack"
                      sx={{ ml: '4px !important', display: 'inline-block' }}
                    />
                  </Button> */}
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
                    transitionDuration: '0.39s',
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
                  data-effect="solid"
                  data-tip="check out clubs and hackathons at Hack Club"
                  data-delay-show="236"
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
                    {/* <Button
                    variant="primary"
                    sx={{
                      backgroundColor: 'blue',
                      color: 'white',
                      mt: 3,
                      display: 'flex',
                      width: 'fit-content'
                    }}
                    as="a"
                    href="/slack"
                    target="_blank"
                    rel="noopener"
                  >
                    Start a club{' '}
                    <Icon
                      glyph="slack"
                      sx={{ ml: '4px !important', display: 'inline-block' }}
                    />
                  </Button> */}
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
                    transitionDuration: '0.39s',
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
                  data-tip="click to projects we're currently working on"
                  data-effect="solid"
                  data-delay-show="236"
                >
                  <Text as="span" color="orange">
                    3
                  </Text>
                  <Text as="p" variant="subtitle">
                    <strong>Build open-source learning tools</strong>
                    Contribute to projects like a game engine, daily streak
                    system, graphing game, and more!
                    {/* <Button
                    variant="primary"
                    sx={{
                      backgroundColor: 'orange',
                      color: 'white',
                      mt: 3,
                      display: 'flex',
                      width: 'fit-content'
                    }}
                    as="a"
                    href="/slack"
                    target="_blank"
                    rel="noopener"
                  >
                    Find a hackathon{' '}
                    <Icon
                      glyph="slack"
                      sx={{ ml: '4px !important', display: 'inline-block' }}
                    />
                  </Button> */}
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
              maxWidth: 'layout',
              margin: 'auto'
            }}
            // pb={4}
          >
            {/* <Text variant="eyebrow" as="p" sx={{ fontSize: [1, 2, 3] }}>
              A Hack Clubber is someone that
            </Text>
            <Text variant="title" sx={{ fontSize: [3, 4, 5] }}>
              Discovers technology by building things for the joy of it
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{ fontSize: [1, '16px', '20px'] }}
            >
              Here, teenagers don't wait for permission to code. Hack Clubbers
              come together to code because it's fun. Whether you’re a beginner
              programmer or have years of experience, there’s a place for you at
              Hack Club.
            </Text> */}
            {/* <Slack slackKey={slackKey} /> */}
            {/* <Events events={events} /> */}
            <Text
              variant="eyebrow"
              as="p"
              sx={{ fontSize: [1, 2, 3], mt: 4 }}
              id="community"
            >
              Hack Clubbers
            </Text>
            <Text variant="title" sx={{ fontSize: [3, 4, 5] }}>
              Connect with each other from around the world.
            </Text>
            <Text
              variant="subtitle"
              as="p"
              sx={{ fontSize: [1, '16px', '20px'] }}
            >
              Here, we don't wait for permission to code. Hack Clubbers come
              together to code because it's fun. Whether you’re a beginner
              programmer or have years of experience, there’s a place for you at
              Hack Club.
            </Text>
            <Grid columns={[1, 1]}>
              {/* <Box
                pt={4}
                pb={5}
                sx={{
                  position: 'relative',
                  margin: 'auto'
                }}
              > */}
              {/* <Button
                    as="a"
                    variant="ctaLg"
                    sx={{
                      background:
                        'linear-gradient(-132deg, #338eda 14%, #33d6a6 82%)'
                    }}
                    my={3}
                  >
                    Join us →
                  </Button> */}
              <Slack slackKey={slackKey} slackNum={slackNum} />
              <Epoch delay={300} />
              {/* <MailingList /> */}
              {/* </Box> */}
              {/* <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  pb: '56.25%',
                  margin: 'auto',
                  borderRadius: '10px',
                  overflow: 'none'
                }}
              >
                <Box
                  as="iframe"
                  muted
                  duration={2000}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 1,
                    width: '100%',
                    height: '100%'
                  }}
                  src="https://www.youtube.com/embed/-sxRdKtKNa0"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></Box>
              </Box> */}
            </Grid>
            <Events events={events} />
            {/* <Inspect /> */}
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
                maxWidth: 'layout',
                margin: 'auto'
              }}
            >
              <Text variant="eyebrow" as="p" sx={{ fontSize: [1, 2, 3] }}>
                Hack Clubbers
              </Text>
              <Text variant="title" sx={{ fontSize: [3, 4, 5] }}>
                Build open source tools
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ fontSize: [1, '16px', '20px'] }}
              >
                In collaboration with engineers on the Hack Club team, Hack
                Clubbers build learning tools for each other. Get involved with
                these projects by building somethnig with our tools or
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
                maxWidth: 'layout',
                margin: 'auto'
              }}
              id="irl"
            >
              <Text variant="eyebrow" as="p">
                Hack Clubbers
              </Text>
              <Text variant="title" sx={{ fontSize: [3, 4, 5] }}>
                Gather IRL to create together
                {/* <Text
                  as="span"
                  sx={{
                    borderRadius: 'default',
                    px: 2,
                    mx: [-2, 0],
                    whiteSpace: 'nowrap',
                    color: '#5d114c',
                    bg: 'rgb(255, 212, 64)'
                  }}
                >
                  joy of code
                </Text> */}
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
              <Clubs delay={200} />
              <Hackathons
                delay={400}
                data={hackathonsData}
                stars={stars.hackathons.stargazerCount}
              />
              <Bank data={bankData} delay={100} />
            </Box>
          </Box>
        </Box>
        <Box bg="snow" color="black" py={[3, 4]}>
          <Box
            sx={{
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Text as="p" variant="eyebrow">
              Let's quickly review
            </Text>
            <Heading as="h2" variant="title" sx={{ fontSize: [3, 4, 5] }}>
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
              columns={[null, 4]}
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
                  name="Start a Club"
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
              <Card
                sx={{
                  background:
                    'linear-gradient(to bottom, rgba(166, 51, 214, 0.9) 0%, rgba(51, 142, 218, 0.9) 100%)',
                  color: 'white',
                  svg: { color: 'purple' },
                  textDecoration: 'none'
                }}
                as="a"
                href="/hackathons"
                variant="interactive"
                target="_blank"
                rel="noopener"
              >
                <Stage
                  icon="event-code"
                  color="white"
                  name="Attend a Hackathon"
                  desc="Make friends, build cool stuff, have an adventure. Attend a hackathon."
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

  // console.log(raised)

  bankData.push(
    `💰 ${raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised`
  )

  let initialGitHubData = await fetch(
    'https://api.github.com/orgs/hackclub/events'
  ).then(r => r.json())

  // console.log(initialBankData)

  // if(initialGitHubData != null) {
  // let initialGitHubData1 = initialGitHubData.map(x =>
  //   (x.type == 'PushEvent' &&
  //     x.actor.login != 'github-actions[bot]' &&
  //     x.actor.login != 'dependabot[bot]') ||
  //   x.type == 'WatchEvent' ||
  //   x.type == 'PullRequestEvent'
  //     ? x.type == 'PushEvent'
  //       ? `✅ New commit in ${x.repo.name} by @${x.actor.login}`
  //       : x.type == 'WatchEvent'
  //       ? `⭐️ New star on ${x.repo.name}`
  //       : x.type == 'PullRequestEvent'
  //       ? `🔀 New PR for ${x.repo.name} by @${x.actor.login}`
  //       : `🎉 New activity in ${x.repo.name}`
  //     : null
  // )
  // }

  let gitHubData = initialGitHubData.map(x => ({
    type: x.type,
    user:
      x.type == 'PushEvent'
        ? x.actor.login
        : x.type == 'PullRequestEvent'
        ? x.actor.login
        : x.type == 'WatchEvent'
        ? x.actor.login
        : null,
    userImage:
      x.type == 'PushEvent'
        ? x.actor.avatar_url
        : x.type == 'PullRequestEvent'
        ? x.actor.avatar_url
        : x.type == 'WatchEvent'
        ? x.actor.avatar_url
        : null,
    message:
      x.type == 'PushEvent'
        ? x.payload.commits[0].message
        : x.type == 'PullRequestEvent'
        ? x.payload.pull_request.title
        : x.type == 'WatchEvent'
        ? `starred ${x.repo.name}`
        : null,
    time: x.created_at
  }))

  gitHubData = gitHubData.filter(
    x =>
      x.type == 'PushEvent' ||
      x.type == 'PullRequestEvent' ||
      x.type == 'WatchEvent'
  )

  let gitHubDataLength = gitHubData.length

  console.log(gitHubData)
  // let initialGithubData3 = initialGitHubData.map(x =>
  //   (x.type == 'PushEvent' &&
  //     x.actor.login != 'github-actions[bot]' &&
  //     x.actor.login != 'dependabot[bot]') ||
  //   x.type == 'WatchEvent' ||
  //   x.type == 'PullRequestEvent'
  //     ? x.type == 'PushEvent'
  //       ? x.actor.login
  //       : x.type == 'WatchEvent'
  //       ? x.created_at
  //       : x.type == 'PullRequestEvent'
  //       ? x.actor.login
  //       : x.created_at
  //     : null
  // )

  // let initialGithubData2 = initialGitHubData.map(x =>
  //   (x.type == 'PushEvent' &&
  //     x.actor.login != 'github-actions[bot]' &&
  //     x.actor.login != 'dependabot[bot]') ||
  //   x.type == 'WatchEvent' ||
  //   x.type == 'PullRequestEvent'
  //     ? x.type == 'PushEvent'
  //       ? x.created_at
  //       : x.type == 'WatchEvent'
  //       ? x.created_at
  //       : x.type == 'PullRequestEvent'
  //       ? x.created_at
  //       : x.created_at
  //     : null
  // )
  // console.log([...new Set(gitHubData)])
  // dataPieces = [
  //   ...dataPieces,
  //   ...new Set(
  //     initialGitHubData1.filter(function (el) {
  //       return el != null
  //     })
  //   )
  // ]

  // let githubData2 = initialGithubData2.filter(function (el) {
  //   return el != null
  // })

  // const formData = new FormData()

  // formData.append('token', process.env.SLACK_API_TOKEN)
  // formData.append('date_range', '30d')

  // const slackData = await fetch(
  //   'https://hackclub.slack.com/api/team.stats.timeSeries',
  //   {
  //     method: 'POST',
  //     body: formData,
  //     headers: {
  //       Cookie: process.env.SLACK_API_COOKIE
  //     }
  //   }
  // ).then(r => r.json())

  // console.log(slackData)

  const res = await fetch('https://hackathons.hackclub.com/api/events/upcoming')
  const hackathonsData = await res.json()
  let games = []
  let tags = []

  games = await fetch('https://editor.sprig.hackclub.com/metadata.json').then(
    res => res.json()
  )
  let game = games
    .sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
    .slice(0, 2)

  let gameTitle = []

  gameTitle = game.map(r => r.title)

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
      // slackData,
      stars,
      events
    },
    revalidate: 30
  }
}

export default Page
