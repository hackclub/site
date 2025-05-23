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
/** @jsxImportSource theme-ui */

const HeaderCarousel = ({ images, memberCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length)
    setProgress(0) 
  }

  const prevSlide = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + images.length) % images.length
    )
    setProgress(0) 
  }

  useEffect(() => { // handle slides
    const intervalTime = 6000
    const progressInterval = 65 

    const timer = setInterval(() => {
      nextSlide()
    }, intervalTime)

    const progressTimer = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) return 100
        return prevProgress + (100 * progressInterval / intervalTime)
      })
    }, progressInterval)

    return () => {
      clearInterval(timer)
      clearInterval(progressTimer)
    }
  }, [])

  return (
    <Box className="carousel" sx={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      zIndex: 1
    }}>
      {images.map((image, index) => (
        <Box
          key={index}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            zIndex: index === currentIndex ? 1 : 0
          }}
        >
          <BGImg
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            priority={index === 0}
            gradient="linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.45))"
          />
        </Box>
      ))}

      <Box
        as="button"
        onClick={prevSlide}
        aria-label="Previous image"
        sx={{
          position: 'absolute',
          left: ['5px', '20px', '30px'],
          top: '55%',
          transform: 'translateY(-50%)',
          bg: '#fdf6ee',
          border: '4px solid #e4d6c3',
          borderRadius: '50%',
          width: ['45px', '60px', '70px'],
          height: ['45px', '60px', '70px'],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          transition: 'all 0.2s',
          boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
          '&:hover': {
            bg: '#fdf6ee',
            transform: 'translateY(-50%) scale(1.1) rotate(-5deg)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
          },
          '&:active': {
            transform: 'translateY(-50%) scale(0.95)'
          }
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 18L8 12L15 6"
            stroke="#a89985"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>

      <Box
        as="button"
        onClick={nextSlide}
        aria-label="Next image"
        sx={{
          position: 'absolute',
          right: ['5px', '20px', '30px'],
          top: '55%',
          transform: 'translateY(-50%)',
          bg: '#fdf6ee',
          border: '4px solid #e4d6c3',
          borderRadius: '50%',
          width: ['45px', '60px', '70px'],
          height: ['45px', '60px', '70px'],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 10,
          boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
          bg: '#fdf6ee',

          '&:hover': {
            transform: 'translateY(-50%) scale(1.1) rotate(5deg)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.3)'
          },
          '&:active': {
            transform: 'translateY(-50%) scale(0.95)'
          }
        }}
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L16 12L9 18"
            stroke="#a89985"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>

      <Box
        as="a"
        href={images[currentIndex].href}
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          zIndex: 15
        }}
      >
        <Badge
          as="span"
          variant="pill"
          sx={{
            zIndex: '10',
            bg: '#fdf6ee',
            color: '#513f31',
            opacity: 1,
            fontWeight: 'bold',
            transition: '0.3s ease',
            animation: 'fadeIn 0.5s',
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
            display: 'none',
            '@media (min-width: 56em)': {
              display: 'block'
            },
            borderRadius: '12px',
            border: '3px solid #e4d6c3',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            py: 1,
            px: 2,
            fontSize: '14px',
            letterSpacing: '0.02em',
            transform: 'rotate(-1deg)',
            '&:hover': {
              transform: 'rotate(1deg) scale(1.05)',
              boxShadow: '0 6px 14px rgba(0,0,0,0.2)',
            }
          }}
          title={images[currentIndex].caption || images[currentIndex].alt}
        >
          <Icon
            glyph="pin"
            size={22}
            style={{
              marginRight: '6px',
              transform: 'translateY(-1px)',
              verticalAlign: 'middle'
            }}
          />
          <Text as="span" sx={{ display: 'inline-block', position: 'relative', top: '1px' }}>
            {images[currentIndex].alt}
          </Text>
        </Badge>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: ['96px', '118px'],
          right: ['70px', '85px', '100px'],
          zIndex: 13,
          width: '18px',
          height: '12px',
          background: 'linear-gradient(to bottom, #a88c6d, #7d623c)',
          borderRadius: '4px 4px 0 0',
          boxShadow: '0 -2px 4px rgba(0,0,0,0.15)',
          border: '2px solid #7d623c',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: '0px',
          right: ['75px', '90px', '105px'],
          zIndex: 13,
          width: '16px',
          height: '30px',
          background: 'linear-gradient(to bottom, #7d623c, #624e30)',
          borderRadius: '0 0 4px 4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
          border: '2px solid #7d623c',
        }}
      />

      <Box
        as="a"
        href="/slack"
        sx={{
          position: 'absolute',
          bottom: '20px',
          textDecoration: 'none',
          right: '20px',
          zIndex: 15,
          width: ['120px', '150px', '180px'],
          height: ['80px', '100px', '100px'],
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#513f31',
          fontWeight: 'bold',
          padding: '10px',
          paddingTop: "15px",
          transform: 'rotate(2deg)',
          background: 'linear-gradient(to bottom, #e8d9b5, #d2bc94)',
          borderRadius: '12px',
          border: '4px solid #7d623c',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2), inset 0 1px 3px rgba(255,255,255,0.3)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '@keyframes populationBounce': {
            '0%': { transform: 'rotate(2deg) translateY(0)' },
            '20%': { transform: 'rotate(4deg) translateY(-8px)' },
            '40%': { transform: 'rotate(6deg) translateY(-4px)' },
            '60%': { transform: 'rotate(4deg) translateY(-6px)' },
            '80%': { transform: 'rotate(5deg) translateY(-2px)' },
            '100%': { transform: 'rotate(3deg) translateY(0)' },
          },
          '&:hover': {
            animation: 'populationBounce 0.6s ease-in-out',
            boxShadow: '0 8px 20px rgba(0,0,0,0.25), inset 0 1px 3px rgba(255,255,255,0.3)',
            transform: 'rotate(4deg) scale(1.05)',
          },
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.1) 100%)',
            borderRadius: '9px',
            pointerEvents: 'none',
          }
        }}
      >
        <Text
          sx={{
            fontSize: ['10px', '11px', '15px'],
            mb: '0px',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            textShadow: '0 1px 0 rgba(255,255,255,0.6)',
            color: '#665040',
          }}
        >
          Current Population
        </Text>
        <Text
          sx={{
            fontSize: ['24px', '18px', '32px'],
            fontWeight: 'bold',
            fontFamily: '"Comic Sans MS", cursive, sans-serif',
            textShadow: '0 1px 0 rgba(255,255,255,0.6)',
            color: '#513f31',
          }}
        >
          <Comma>{memberCount ?? 66549}</Comma>
        </Text>
      </Box>

      <Flex
        sx={{
          position: 'absolute',
          bottom: '20px',
          width: '100%',
          justifyContent: 'center',
          gap: 2,
          zIndex: 10
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            as="button"
            onClick={() => {
              setCurrentIndex(index)
              setProgress(0)
            }}
            sx={{
              position: 'relative',
              width: index === currentIndex ? '18px' : '14px',
              height: index === currentIndex ? '18px' : '14px',
              borderRadius: '50%',
              bg: index === currentIndex
                ? '#ec3750'
                : 'rgba(255, 255, 255, 0.6)',
              border: '2px solid',
              borderColor: index === currentIndex ? '#ec3750' : 'white',
              padding: 0,
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: index === currentIndex ? '0 0 8px rgba(236, 55, 80, 0.5)' : 'none',
              overflow: 'hidden',
              '&:hover': {
                transform: 'scale(1.2)'
              }
            }}
            aria-label={`Go to slide ${index + 1}`}
          >
            {index === currentIndex && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: `conic-gradient(
                    rgba(255, 255, 255, 0.7) ${progress}%, 
                    transparent ${progress}% 100%
                  )`,
                  borderRadius: 'inherit'
                }}
              />
            )}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

function ToolCard({ icon, name, desc, href }) {
  return (
    <Box
      as="a"
      href={href || `/projects`}
      target={href?.startsWith('http') ? "_blank" : undefined}
      rel={href?.startsWith('http') ? "noopener noreferrer" : undefined}
      sx={{
        width: ['30%', '100px', '140px'],
        minWidth: ['90px', '100px', '110px'],
        height: ['110px', '120px', '130px'],
        bg: '#fff',
        borderRadius: '12px',
        border: '2px solid #e0e0e0',
        p: 2,
        textDecoration: 'none',
        color: '#1f2d3d',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 2,
        position: 'relative',
        textAlign: 'center',
        transition: 'transform 0.15s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.15s, border-color 0.15s',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        '&:hover, &:focus': {
          transform: 'translateY(-5px) rotate(-2deg)',
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          borderColor: '#c0392b',
          outline: 'none',
          bg: '#fff9f9'
        }
      }}
    >
      <Box
        sx={{
          width: '46px',
          height: '46px',
          borderRadius: '12px',
          bg: 'rgba(236, 55, 80, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          color: '#ec3750',
          transition: 'transform 0.2s ease-out, background-color 0.2s ease-out',
          '&:hover': { 
            transform: 'scale(1.1) rotate(10deg)',
            bg: 'rgba(236, 55, 80, 0.15)' 
          }
        }}
      >
        <Icon glyph={icon} size={28} />
      </Box>
      <Text sx={{ fontWeight: 800, fontSize: 1, mb: '1px', lineHeight: 1.25 }}>{name}</Text>
      <Text sx={{ fontSize: 0, color: '#718096', lineHeight: 1.25 }}>{desc}</Text>
    </Box>
  )
}

function Page({
  hackathonsData,
  bankData,
  slackData,
  gitHubData,
  gitHubDataLength,
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
  let [github, setGithub] = useState(0)
  let [slackKey, setSlackKey] = useState(0)
  let [key, setKey] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  const { asPath } = useRouter()

  let jsConfetti = useRef()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    jsConfetti.current = new JSConfetti()

    window.kc = `In the days of old, when gaming was young \nA mysterious code was found among \nA sequence of buttons, pressed in a row \nIt unlocked something special, we all know \n\nUp, up, down, down, left, right, left, right \nB, A, Start, we all have heard it's plight \nIn the 8-bit days, it was all the rage \nAnd it still lives on, with time, it will never age \n\nKonami Code, it's a legend of days gone by \nIt's a reminder of the classics we still try \nNo matter the game, no matter the system \nThe code will live on, and still be with them \n\nSo the next time you play, take a moment to pause \nAnd remember the code, and the Konami cause \nIt's a part of gaming's history, and a part of our lives \nLet's keep it alive, and let the Konami Code thrive!\n`
    window.paper = `Welcome, intrepid hacker! We'd love to have you in our community. Get your invite at hack.af/slack. Under "Why do you want to join the Hack Club Slack?" add a 🦄 and we'll ship you some exclusive stickers! `
  }, [])

  const easterEgg = () => {
    alert('Hey, you typed the Konami Code!')

    jsConfetti.current.addConfetti({
      confettiColors: [
        '#ec3750',
        '#ff8c37',
        '#f1c40f',
        '#33d6a6',
        '#5bc0de',
        '#338eda',
        '#a633d6'
      ],
    })
  }

  useEffect(() => {
    if (reveal && !hover) {
      setTimeout(() => {
        setReveal(false)
      }, 2000)
    }
  }, [reveal, hover])


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

  const headerImages = [
    {
      src: OuternetImgFile,
      alt: "Outernet in Cabot, VT",
      href: "https://outernet.hackclub.com/",
      width: 3000,
      height: 2000
    },
    {
      src: "/home/flagship_4.jpg",
      alt: "Flagship 2019 in San Francisco, CA",
      href: "#",
      width: 3000,
      height: 2000
    },
    {
      src: "/home/zephyr-spacex.jpeg",
      alt: "SpaceX HQ Tour in Los Angeles, CA",
      href: "https://workshops.hackclub.com/vip-newsletters/021/",
      width: 3000,
      height: 2000
    },
    {
      src: "/hackathons/mahacks.jpeg",
      alt: "MA Hacks in Boston, MA",
      href: "#'",
      width: 3000,
      height: 2000
    },
    {
      src: "/home/event.jpg",
      alt: "Lion City Hacks in Singapore",
      href: "https://lioncityhacks.com/",
      width: 3000,
      height: 2000
    }, {
      src: "/home/wonderland.jpg",
      alt: "Wonderland in Boston, MA",
      href: "https://wonderland.hackclub.com/",
      width: 3000,
      height: 2000
    }
  ];

  return (
    <>
      <Meta
        as={Head}
        title="A Home for High School Hackers"
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
            bg: 'dark',
            pt: [5, 6],
            pb: [2, 3],
            overflowY: 'hidden',
            textAlign: 'left',
            position: 'relative', 
            paddingTop: '0px !important',
            overflowX: 'hidden',
            height: 'auto', 
            minHeight: '500px' 
          }}
        >
          <HeaderCarousel
            images={headerImages}
            memberCount={slackData.total_members_count}
          />

          <Box
            sx={{
              width: '90vw',
              maxWidth: [null, 'layout'],
              position: 'relative',
              mx: 'auto',
              py: [4, 4, 4],
              paddingTop: ["130px !important", "120px !important", "156px !important"],
              px: ["45px", "60px", "90px"],
              textShadow: 'text',
              zIndex: 5
            }}
          >
            <Text
              sx={{
                color: 'yellow',
                pb: 2,
                position: 'relative',
                display: 'inline-block',
                fontSize: ['24px', '28px', '32px'],
                fontWeight: 'bold',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                mb: 2,
                ml: [0, 0, 1],
                transform: 'translateY(-8px)',
                letterSpacing: '0.01em'
              }}
              as="p"
              variant="title"
            >
              Welcome to Hack&nbsp;Club!
            </Text>
            <Heading>
              <Text
                as="h4"
                sx={{
                  color: 'white',
                  mb: [3, 4],
                  zIndex: 1,
                  textAlign: 'left',
                  lineHeight: 1.2,
                  width: '100%',
                  position: 'relative',
                  fontSize: ['32px', '38px', '46px'],
                  fontWeight: 800,
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  letterSpacing: '-0.01em'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 'fit-content'
                  }}
                >
                  <Text
                    as="span"
                    sx={{
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        width: '100%',
                        height: '4px',
                        background: 'red',
                        borderRadius: '4px',
                        transform: 'rotate(-5deg)',
                        opacity: 0.8,
                        zIndex: 2
                      }
                    }}
                  >
                    A home
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-10px',
                      transform: 'rotate(-8deg)',
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      fontSize: ['16px', '18px', '22px'],
                      color: 'red',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white',
                      zIndex: 3,
                    }}
                  >
                    Your home
                  </Text>
                </Box>
                {' for Highschool Hackers'}
              </Text>
              <Box sx={{ display: ['block', 'flex'], mt: [3, 2, 3] }}>
                <Button
                  variant="cta"
                  as="a"
                  href="/slack"
                  mt={[3, 0, 0]}
                  mr={3}
                  sx={{
                    transformOrigin: 'center left',
                    borderRadius: '10px',
                    py: [2, 2, 2],
                    boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
                    }
                  }}
                >
                  <Icon glyph="welcome" size={24} color="white" />
                  Join Slack
                </Button>
                <Button
                  variant="cta"
                  as="a"
                  href="https://hackclub.com/philosophy/"
                  mt={[3, 0, 0]}
                  sx={{
                    transformOrigin: 'center left',
                    backgroundImage: t => t.util.gx('green', 'blue'),
                    borderRadius: '10px',
                    py: [2, 2, 2],
                    boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
                    }
                  }}
                >
                  <Icon glyph="compass" size={24} color="white" />
                  Our Philosophy
                </Button>
              </Box>
            </Heading>
          </Box>
        </Box>
        <Box as="section" sx={{
          py: [1, 2, '30px'],
          color: 'black',
          background: 'linear-gradient(to bottom, #fff9f0, #fff)',
          borderRadius: ['0px', '0px', '32px'],
          position: 'relative',
          zIndex: 2
        }}>
          
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto'
            }}
          >
            <Text variant="title" sx={{ 
                fontSize: ['36px', 4, 5],
                fontWeight: 900,
                color: '#513f31',
                textShadow: '1px 1px 0 rgba(255,255,255,0.6)',
                mb: 2
              }}>
                Our{' '}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 'fit-content'
                  }}
                >
                  <Text
                    as="span"
                    sx={{
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        width: '100%',
                        height: '4px',
                        background: 'red',
                        borderRadius: '4px',
                        transform: 'rotate(-5deg)',
                        opacity: 0.8,
                        zIndex: 2
                      }
                    }}
                  >
                    Modus Operandi
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-5px',
                      transform: 'rotate(-8deg)',
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      fontSize: ['18px', '20px', '28px'],
                      color: 'red',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white',
                      zIndex: 3,
                    }}
                  >
                    how we do things
                  </Text>
                </Box>{' '}
              </Text>
            <Grid columns={[1, 1, 3]} gap={[3, 4]} sx={{ alignItems: 'center', marginTop: '48px' }}>
              <Box sx={{
                borderRadius: 'extra',
                bg: 'rgba(255, 237, 209, 0.6)',
                p: [2, 3],
                boxShadow: '0 8px 32px rgba(255, 140, 55, 0.12)',
                transform: ['none', 'none', 'rotate(-1deg)'],
                transition: 'transform 0.2s ease-in-out',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: ['none', 'none', 'rotate(0deg) scale(1.02)']
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  opacity: 0.15,
                  color: 'orange',
                  transform: 'rotate(10deg)',
                  zIndex: 0
                }}>
                  <Icon glyph="code" size={100} />
                </Box>
                <Text
                  variant="title"
                  as="h2"
                  sx={{
                    fontSize: ['28px', '32px', '36px'],
                    color: 'orange',
                    mb: 2,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Build Almost Anything
                </Text>
                <Text
                  variant="subtitle"
                  as="p"
                  sx={{
                    fontSize: ['16px', '18px', '20px'],
                    pb: 3,
                    lineHeight: 1.4
                  }}
                >
                  Hardware projects, games, web apps, AI—Hack Clubbers create with no limits. We provide tools and support to turn your ideas into reality.
                </Text>
                <Button
                  variant="outline"
                  as="a"
                  href="/projects"
                  sx={{
                    borderRadius: 'circle',
                    fontWeight: 'bold',
                    py: 2,
                    px: 3,
                    mt: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: 2,
                    borderWidth: 2,
                    borderColor: 'orange',
                    color: 'orange',
                    bg: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(255, 140, 55, 0.2)',
                    }
                  }}
                >
                  <Icon glyph="explore" size={30} />
                  See Projects
                </Button>
              </Box>

              <Box sx={{
                borderRadius: 'extra',
                bg: 'rgba(231, 245, 255, 0.6)',
                p: [2, 3],
                boxShadow: '0 8px 32px rgba(51, 142, 218, 0.12)',
                transform: ['none', 'none', 'rotate(1deg)'],
                transition: 'transform 0.2s ease-in-out',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: ['none', 'none', 'rotate(0deg) scale(1.02)']
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-15px',
                  opacity: 0.15,
                  color: 'blue',
                  transform: 'rotate(5deg)',
                  zIndex: 0
                }}>
                  <Icon glyph="channel" size={120} />
                </Box>
                <Text
                  variant="title"
                  as="h2"
                  sx={{
                    fontSize: ['28px', '32px', '36px'],
                    color: 'blue',
                    mb: 2,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Collaborate & Connect
                </Text>
                <Text
                  variant="subtitle"
                  as="p"
                  sx={{
                    fontSize: ['16px', '18px', '20px'],
                    pb: 3,
                    lineHeight: 1.4
                  }}
                >
                  Teen coders collaborate here, not compete. We build a community grounded in learning and creativity through events, clubs, and hackathons.
                </Text>
                <Button
                  variant="outline"
                  as="a"
                  href="/conduct"
                  sx={{
                    borderRadius: 'circle',
                    fontWeight: 'bold',
                    py: 2,
                    px: 3,
                    mt: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: 2,
                    borderWidth: 2,
                    borderColor: 'blue',
                    color: 'blue',
                    bg: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(51, 142, 218, 0.2)',
                    }
                  }}
                >
                  <Icon glyph="friend" size={30} />
                  Code of Conduct
                </Button>
              </Box>
              <Box sx={{
                borderRadius: 'extra',
                bg: 'rgba(233, 216, 253, 0.6)',
                p: [2, 3],
                boxShadow: '0 8px 32px rgba(166, 51, 214, 0.12)',
                transform: ['none', 'none', 'rotate(-1.5deg)'],
                transition: 'transform 0.2s ease-in-out',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: ['none', 'none', 'rotate(0deg) scale(1.02)']
                }
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-10px',
                  opacity: 0.15,
                  color: 'purple',
                  transform: 'rotate(8deg)',
                  zIndex: 0
                }}>
                  <Icon glyph="checkmark" size={90} />
                </Box>
                <Text
                  variant="title"
                  as="h2"
                  sx={{
                    fontSize: ['28px', '32px', '36px'],
                    color: 'purple',
                    mb: 2,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  Learn By Doing
                </Text>
                <Text
                  variant="subtitle"
                  as="p"
                  sx={{
                    fontSize: ['16px', '18px', '20px'],
                    pb: 3,
                    lineHeight: 1.4
                  }}
                >
                  Not just tutorials— real projects. Build your skills and portfolio with a global community of teen hackers ready to help you learn and grow.
                </Text>
                <Button
                  variant="outline"
                  as="a"
                  href="https://toolbox.hackclub.com/"
                  sx={{
                    borderRadius: 'circle',
                    fontWeight: 'bold',
                    py: 2,
                    px: 3,
                    mt: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: 2,
                    borderWidth: 2,
                    borderColor: 'purple',
                    color: 'purple',
                    bg: 'rgba(255, 255, 255, 0.7)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(166, 51, 214, 0.2)',
                    }
                  }}
                >
                  <Icon glyph="code" size={30} />
                  Start Coding
                </Button>
              </Box>
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
            position: 'relative',
            marginBottom: [4, 5, 6],
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
              pointerEvents: 'none'
            }}
          />
          <Box
            sx={{
              position: 'relative',
              width: '90vw',
              maxWidth: 'layout',
              margin: 'auto',
              zIndex: 5
            }}
          >
            <Box>
              <Text variant="title" sx={{ 
                fontSize: ['36px', 4, 5],
                fontWeight: 900,
                color: '#513f31',
                textShadow: '1px 1px 0 rgba(255,255,255,0.6)',
                mb: 2
              }}>
                Engage with fellow{' '}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 'fit-content'
                  }}
                >
                  <Text
                    as="span"
                    sx={{
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        width: '100%',
                        height: '4px',
                        background: 'red',
                        borderRadius: '4px',
                        transform: 'rotate(-5deg)',
                        opacity: 0.8,
                        zIndex: 2
                      }
                    }}
                  >
                    students
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-5px',
                      transform: 'rotate(-8deg)',
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      fontSize: ['18px', '20px', '28px'],
                      color: 'red',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white',
                      zIndex: 3,
                    }}
                  >
                    makers
                  </Text>
                </Box>{' '}
              </Text>
              <Text
                variant="subtitle"
                as="p"
                sx={{ 
                  fontSize: ['18px', '20px', '22px'], 
                  pb: [3, 0, 0],
                  color: '#665040',
                  fontWeight: 600,
                  maxWidth: '80%',
                  mb: 4
                }}
              >
                We gather both online and in-person to share our love of code
                and make things together!
              </Text>
            </Box>

            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: ['1fr', '1fr', '2fr 1fr'], 
              gap: 4, 
              mb: 7,
              '& > div': {
                borderRadius: '1.75rem',
                padding: '8px !important',
                border: '5px solid #e4d6c3',
                boxShadow: '0 12px 36px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.08)',
                background: '#fdf6ee',
                transition: 'transform 0.2s cubic-bezier(.68,-0.55,.27,1.55), box-shadow 0.2s',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px) rotate(-1deg)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.12), 0 8px 24px rgba(0,0,0,0.1)'
                },
                paddingY: '0px'
              }
            }}>
              <Box>
                <Neighborhood />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: "32px" }}>
                <Box className="weirdBox" sx={{
                  mb: 0,
                  '& > div': {
                    '& > div': {
                      mb: 0,
                      px: [2, 2, 3],
                      minHeight: 'unset',
                      '& > h2': {
                        fontSize: ['20px', '22px', '26px'],
                        mb: 2,
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        color: '#513f31',
                        fontWeight: 'bold'
                      },
                      '& > p': {
                        fontSize: ['13px', '14px', '16px'],
                        display: ['none', 'block', 'block'],
                        lineHeight: 1.4,
                        mb: 2,
                        color: '#665040'
                      },
                      '& > div:last-of-type': {
                        '& a': {
                          py: 1,
                          px: 3,
                          fontSize: 1,
                          borderRadius: '100px',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                          border: '3px solid',
                          '&:hover': {
                            transform: 'scale(1.05) rotate(-1deg)',
                            boxShadow: '0 6px 12px rgba(0,0,0,0.12)'
                          }
                        }
                      }
                    }
                  }
                }}>
                  <Trail />
                </Box>
                <Box sx={{
                  '& > div': {
                  
                    '& > div': {
                      py: [2, 2, 3],
                      px: [2, 2, 3],
                      minHeight: 'unset',
                      '& > h2': {
                        fontSize: ['20px', '22px', '26px'],
                        mb: 2,
                        fontFamily: '"Comic Sans MS", cursive, sans-serif',
                        color: '#513f31',
                        fontWeight: 'bold'
                      },
                      '& > p': {
                        fontSize: ['13px', '14px', '16px'],
                        display: ['none', 'block', 'block'],
                        lineHeight: 1.4,
                        mb: 2,
                        color: '#665040'
                      },
                      '& > div:last-of-type': {
                       
                        '& a': {
                          py: 1,
                          px: 3,
                          fontSize: 1,
                          borderRadius: '100px',
                          fontWeight: 'bold',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.08)',
                          border: '3px solid',
                          '&:hover': {
                            transform: 'scale(1.05) rotate(-1deg)',
                            boxShadow: '0 6px 12px rgba(0,0,0,0.12)'
                          }
                        }
                      }
                    }
                  }
                }}>
                  <Scrapyard />
                </Box>
              </Box>
            </Box>

          </Box>
        </Box>

        <Box>
          <Box py={[4, 5, '0px']}>
            <Box
              sx={{
                width: '90vw',
                maxWidth: 'layout',
                margin: 'auto',
                position: 'relative'
              }}
            >
              <Box
                as="section"
                sx={{
                  width: '100%',
                  maxWidth: 'layout',
                  margin: '0 auto 64px',
                  borderRadius: '1.75rem',
                  border: '5px solid #c0392b',
                  background: 'linear-gradient(135deg, #e84545 0%, #c0392b 100%)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.12), inset 0 1px 10px rgba(255,255,255,0.2)',
                  px: [2, 3, 2.5],
                  py: [4, 5, 6],
                  pb: "32px !important",
                  pt: ['80px', '90px', '100px'],
                  position: 'relative',
                  overflow: 'visible',
                  transform: 'rotate(-0.5deg)',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    bottom: '15px',
                    left: '5%',
                    right: '5%',
                    height: '8px',
                    background: '#a33a38',
                    borderRadius: '3px',
                    zIndex: 0,
                    opacity: 0.7
                  }
                }}
              >
                <Box sx={{
                  position: 'absolute',
                  top: ['-70px', '-80px', '-90px'],
                  left: 0,
                  width: '100%',
                  height: ['100px', '120px', '140px'],
                  background: 'linear-gradient(to bottom, #e74c3c, #c0392b)',
                  borderRadius: '1.75rem 1.75rem 0 0',
                  border: '5px solid #c0392b',
                  borderBottom: 'none',
                  transform: 'rotateX(60deg)',
                  transformOrigin: 'bottom',
                  boxShadow: 'inset 0 5px 15px rgba(255,255,255,0.3), 0 -4px 10px rgba(0,0,0,0.2)',
                  zIndex: 1
                }} />
                
                {gitHubData && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: ['-130px', '-130px', '-150px'], 
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: ['95%', '85%', '80%'], 
                      maxWidth: '650px',
                      zIndex: 5,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: [1.5, 2, 3],
                      alignItems: 'center',
                      pointerEvents: 'none'
                    }}
                  >
                    <Text
                      sx={{
                        fontSize: ['20px', '22px', '26px'], 
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: '#333',
                        mb: [1, 1, 2], 
                        textShadow: '0 1px 0 white, 0 2px 3px rgba(0,0,0,0.1)', 
                        animation: 'titleFloat 3s ease-in-out infinite',
                        '@keyframes titleFloat': {
                          '0%, 100%': { transform: 'translateY(0)' },
                          '50%': { transform: 'translateY(-10px)' }
                        }
                      }}
                    >
                      Live from GitHub
                    </Text>
                    
                    {gitHubData
                      .filter(data => !data.user.endsWith('[bot]'))
                      .slice(0, 3)
                      .map((data, key) => (
                        <Box
                          key={key}
                          sx={{
                            animation: `githubBounce${key} ${2.8 + key * 0.4}s ${key * 0.25}s infinite cubic-bezier(.68,-0.55,.27,1.55)`,
                            '@keyframes githubBounce0': {
                              '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                              '20%': { transform: 'translateY(-18px) scale(1.04) rotate(-2deg)' },
                              '40%': { transform: 'translateY(-8px) scale(1.01) rotate(1deg)' },
                              '60%': { transform: 'translateY(-14px) scale(1.03) rotate(-1deg)' },
                              '80%': { transform: 'translateY(-4px) scale(1.01) rotate(2deg)' }
                            },
                            '@keyframes githubBounce1': {
                              '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                              '20%': { transform: 'translateY(-22px) scale(1.05) rotate(2deg)' },
                              '40%': { transform: 'translateY(-10px) scale(1.01) rotate(-2deg)' },
                              '60%': { transform: 'translateY(-16px) scale(1.03) rotate(1deg)' },
                              '80%': { transform: 'translateY(-6px) scale(1.01) rotate(-1deg)' }
                            },
                            '@keyframes githubBounce2': {
                              '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
                              '20%': { transform: 'translateY(-26px) scale(1.06) rotate(-3deg)' },
                              '40%': { transform: 'translateY(-12px) scale(1.02) rotate(2deg)' },
                              '60%': { transform: 'translateY(-18px) scale(1.04) rotate(-2deg)' },
                              '80%': { transform: 'translateY(-7px) scale(1.01) rotate(1deg)' }
                            },
                            boxShadow: '0 8px 20px rgba(0,0,0,0.15)', 
                            background: 'white',
                            borderRadius: '12px',
                            border: '3px solid #ddd', 
                            width: '100%',
                            maxWidth: '550px', 
                            pointerEvents: 'auto',
                            position: 'relative',
                            transform: `scale(${1 - key * 0.05})`, 
                            transformOrigin: 'center top',
                            '&:hover': {
                              animationPlayState: 'paused',
                              boxShadow: '0 12px 28px rgba(0,0,0,0.2)', 
                              zIndex: 10
                            },
                            '& > div': { 
                              padding: [2, 2, 3] 
                            }
                          }}
                        >
                          <GitHub
                            type={data.type}
                            img={data.userImage}
                            user={data.user}
                            time={data.time}
                            url={data.url}
                            message={data.message}
                            opacity={1}
                          />
                        </Box>
                      ))}
                  </Box>
                )}
                
                <Box sx={{ 
                  position: 'relative', 
                  zIndex: 3,
                  pt: [1, 1, 2], 
                  pb: "32px !important" 
                }}>
                  <Text
                    variant="title"
                    as="h2"
                    sx={{
                      fontSize: ['36px', '48px', '56px'],
                      color: 'white',
                      mb: 3,
                      textAlign: 'center',
                      fontWeight: 900,
                      textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                      maxWidth: '20ch',
                      mx: 'auto'
                    }}
                  >
                    We build{' '}
                    <Text
                      as="span"
                      sx={{
                        borderRadius: 'default',
                        mx: 0,
                        whiteSpace: 'nowrap',
                        color: '#ffe066'
                      }}
                    >
                      open source
                    </Text>{' '}
                    games and tools together
                  </Text>
                  
                  <Text
                    as="p"
                    sx={{
                      color: 'white',
                      fontSize: ['18px', '20px', '22px'],
                      mb: 4,
                      textAlign: 'center',
                      maxWidth: '60ch',
                      mx: 'auto',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                    }}
                  >
                    In collaboration with engineers on the Hack&nbsp;Club team,
                    Hack Clubbers build learning tools for each other. Get
                    involved with these projects by building something with our tools
                    or contribute to the tools themselves.
                  </Text>
                  
                  <Box sx={{
                    background: 'white',
                    borderRadius: '1.5rem',
                    boxShadow: 'inset 0 0 20px rgba(0,0,0,0.1)',
                    p: [2, 3, 4],
                    position: 'relative',
                    border: '4px solid #c0392b'
                  }}>
                    <Flex
                      sx={{
                        flexWrap: 'wrap', 
                        gap: [2, 3, 3],
                        justifyContent: 'center',
                        mb: [3, 3, 4]
                      }}
                    >
                      <ToolCard icon="code" name="Workshops" desc="Learn coding" href="https://workshops.hackclub.com" />
                      <ToolCard icon="flag" name="Sprig" desc="Make pixel games" href="https://sprig.hackclub.com" />
                      <ToolCard icon="plus" name="Sinerider" desc="Math + games" href="https://sinerider.com" />
                      <ToolCard icon="slack" name="Slack" desc="Join community" href="/slack" />
                      <ToolCard icon="bank-account" name="Bank" desc="Finances" href="https://bank.hackclub.com" />
                      <ToolCard icon="github" name="GitHub" desc="Open source" href="https://github.com/hackclub" />
                   
                      <ToolCard icon="event-check" name="Hackathons" desc="Big events" href="https://hackathons.hackclub.com" />
                      <ToolCard icon="photo" name="Scrapbook" desc="Share builds" href="https://scrapbook.hackclub.com" />
                      <ToolCard icon="grid" name="Toolbox" desc="Resources" href="https://toolbox.hackclub.com" />
                      <ToolCard icon="clubs" name="Clubs" desc="Start a club" href="/clubs" />
                      <ToolCard icon="friend" name="Community" desc="Find friends" href="/community" />
                      <ToolCard icon="explore" name="Projects" desc="See what's made" href="/projects" />
                    </Flex>
                  </Box>
                </Box>

                <Box sx={{
                  position: 'absolute',
                  top: '15px',
                  left: '15px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#7f8c8d',
                  boxShadow: 'inset 0 0 0 3px #2c3e50',
                  zIndex: 2
                }} />
                <Box sx={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#7f8c8d',
                  boxShadow: 'inset 0 0 0 3px #2c3e50',
                  zIndex: 2
                }} />
                <Box sx={{
                  position: 'absolute',
                  bottom: '15px',
                  left: '15px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#7f8c8d',
                  boxShadow: 'inset 0 0 0 3px #2c3e50',
                  zIndex: 2
                }} />
                <Box sx={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: '#7f8c8d',
                  boxShadow: 'inset 0 0 0 3px #2c3e50',
                  zIndex: 2
                }} />
              </Box>

              
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
             <Text variant="title" sx={{ 
                fontSize: ['36px', 4, 5],
                fontWeight: 900,
                color: '#513f31',
                textShadow: '1px 1px 0 rgba(255,255,255,0.6)',
                mb: 2
              }}>
                Find community{' '}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 'fit-content'
                  }}
                >
                  <Text
                    as="span"
                    sx={{
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        width: '100%',
                        height: '4px',
                        background: 'red',
                        borderRadius: '4px',
                        transform: 'rotate(-5deg)',
                        opacity: 0.8,
                        zIndex: 2
                      }
                    }}
                  >
                    face-to-face
                  </Text>
                  <Text
                    as="span"
                    sx={{
                      position: 'absolute',
                      top: '-15px',
                      left: '-5px',
                      transform: 'rotate(-8deg)',
                      fontFamily: '"Comic Sans MS", cursive, sans-serif',
                      fontSize: ['18px', '20px', '28px'],
                      color: 'red',
                      fontWeight: 'bold',
                      textShadow: '1px 1px 0 white, -1px -1px 0 white, 1px -1px 0 white, -1px 1px 0 white',
                      zIndex: 3,
                    }}
                  >
                    while touching grass
                  </Text>
                </Box>{' '}
              </Text>
                <Text
                  variant="subtitle"
                  as="p"
                  sx={{
                    fontSize: ['18px', '24px', '32px'],
                    margin: 'auto',
                    pt: 2,
                    textAlign: 'center'
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
                sx={{ fontSize: ['22px', 2, 3], textAlign: 'center' }}
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
                  margin: 'auto'
                }}
              >
                Find your second home at{' '}
                <Text
                  as="span"
                  sx={{
                    borderRadius: 'default',
                    ml: 0,
                    whiteSpace: ['wrap', 'nowrap'],
                    background: theme => theme.util.gx('red', 'orange'),
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Hack&nbsp;Club
                </Text>
              </Text>
            </Box>
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
                  svg: { color: 'rgb(51, 142, 218)' },
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
                  color="white"
                  name="Join Our Slack"
                  desc="Connect with other technical teenagers on Slack and hack on things together."
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
                    'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
                  color: 'white',
                  svg: { color: '#fb558e' },
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
                  color="white"
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
                    'linear-gradient(to bottom, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)',
                  color: 'white',
                  svg: { color: 'rgb(236, 55, 80)' },
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
                  color="white"
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
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen
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
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
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
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </Box>
            </>
          )}
        <MailingList />
      </Box>

      <Box
        as="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          width: '54px',
          height: '54px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bg: '#fdf6ee',
          border: '4px solid #e4d6c3',
          borderRadius: '16px',
          boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
          cursor: 'pointer',
          opacity: isScrolled ? 0.9 : 0,
          pointerEvents: isScrolled ? 'auto' : 'none',
          transform: isScrolled ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.3s cubic-bezier(.68,-0.55,.27,1.55)',
          '&:hover': {
            transform: isScrolled ? 'translateY(-4px) rotate(-5deg)' : 'translateY(20px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
            opacity: isScrolled ? 1 : 0
          },
          '&:active': {
            transform: 'scale(0.95)'
          }
        }}
      >
        <Icon glyph="up-caret" size={32} color="#000000" />
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
  const carouselCards = require('../lib/carousel.json')
 
  let bankData = []
  let initialBankData = await fetch('https://hcb.hackclub.com/stats')
  try {
    const bd = await initialBankData.json()
    bankData.push(
      `💰 ${bd.raised.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      })} raised`
    )
  } catch {
    bankData.push('error')
  }

  const { Slack: Slacky } = require('./api/slack')
  let slackData = await Slacky()



  const { fetchGitHub } = require('./api/github')
  let gitHubData = await fetchGitHub()

  // GitHub: get latest GitHub stars
  const { fetchStars } = require('./api/stars')
  let stars = await fetchStars()

  // Sprig: get newest games
  const { getGames } = require('./api/games')
  let game = await getGames()

  let gameTitle = []

  gameTitle = game.map(r => r.title)

  // Sprig: get console count
  const { getConsoles } = require('./api/sprig-console')
  const consoleCount = await getConsoles()

  // Hackathons: get latest hackathons
  let hackathonsData
  try {
    const response = await fetch(
      'https://hackathons.hackclub.com/api/events/upcoming'
    )
    if (response.ok) {
      hackathonsData = await response.json()
    } else {
      hackathonsData = []
    }
  } catch (error) {
    hackathonsData = [] // or some default value if an error occurs
  }
  hackathonsData.sort((a, b) => new Date(a.start) - new Date(b.start))
  let events = []
  try {
    await fetch(
      'https://events.hackclub.com/api/events/upcoming/'
    ).then(res => res.json())
  } catch (error) {
    console.error('Error fetching events:', error)
  }
  return {
    props: {
      game,
      gameTitle,
      gitHubData,
      consoleCount,
      hackathonsData,
      bankData,
      slackData,
      stars,
      events,
      carouselCards
    },
    revalidate: 60
  }
}
export default Page;
