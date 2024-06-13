import React, { useState, useRef, useEffect } from 'react'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import { Box, Button, Text, Flex, Grid, Card } from 'theme-ui'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { startCase } from 'lodash'
import Projects from '../../components/arcade/projects'
import { Howl, Howler } from 'howler'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import ArcadeFooter from '../../components/arcade/footer'
import Balancer from 'react-wrap-balancer'
import { Fade } from 'react-reveal'
import JSConfetti from 'js-confetti'
import Join from '../../components/arcade/join'
/** @jsxImportSource theme-ui */

const styled = `
@import url('https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap');
body, html {
  overflow-x: hidden;
  }
.slackey {
  font-family: "Slackey", sans-serif;
 }

 .arcade {
  text-shadow: -4px -4px#FAEFD6,-3px -3px #FAEFD6, -2px -2px #FAEFD6,
    -2px -2px #FAEFD6, -1px -1px #FAEFD6, -1px -1px #FAEFD6,
    -1px -1px #FAEFD6, 1px 1px #FAEFD6, 1px 1px #FAEFD6,
    1px 1px #FAEFD6, 2px 2px #FAEFD6, 4px 4px #FAEFD6,
    3px 3px #FAEFD6, -8px -8px #09AFB4, -6px -6px #09AFB4,
    -5px -5px #09AFB4, -4px -4px #09AFB4, -3px -3px #09AFB4,
    -2px -2px #09AFB4, 2px 2px #09AFB4, 3px 3px #09AFB4,
    5px 5px #09AFB4, 4px 4px #09AFB4, 7px 7px #09AFB4,
    6px 6px #09AFB4, 8px 8px #09AFB4, -8px -8px #09AFB4, 9px 9px #09AFB4, -9px -9px #09AFB4, 10px 10px #09AFB4, -10px -10px #09AFB4;
 }

 .arcade2 {
  text-shadow: -4px -4px#FAEFD6,-3px -3px #FAEFD6, -2px -2px #FAEFD6,
    -2px -2px #FAEFD6, -1px -1px #FAEFD6, -1px -1px #FAEFD6,
    -1px -1px #FAEFD6, 1px 1px #FAEFD6, 1px 1px #FAEFD6,
    1px 1px #FAEFD6, 2px 2px #FAEFD6, 4px 4px #FAEFD6,
    3px 3px #FAEFD6, -8px -8px #09AFB4, -6px -6px #09AFB4,
    -5px -5px #09AFB4, -4px -4px #09AFB4, -3px -3px #09AFB4,
    -2px -2px #09AFB4, 2px 2px #09AFB4, 3px 3px #09AFB4,
    5px 5px #09AFB4, 4px 4px #09AFB4, 7px 7px #09AFB4,
    6px 6px #09AFB4;
 }

 .arcade3 {
  text-shadow: -4px -4px#FAEFD6,-3px -3px #FAEFD6, -2px -2px #FAEFD6,
    -2px -2px #FAEFD6, -1px -1px #FAEFD6, -1px -1px #FAEFD6,
    -1px -1px #FAEFD6, 1px 1px #FAEFD6, 1px 1px #FAEFD6,
    1px 1px #FAEFD6, 2px 2px #FAEFD6, 4px 4px #FAEFD6,
    3px 3px #FAEFD6, -8px -8px #09AFB4, -6px -6px #09AFB4,
    -5px -5px #09AFB4, -4px -4px #09AFB4, -3px -3px #09AFB4,
    -2px -2px #09AFB4, 2px 2px #09AFB4, 3px 3px #09AFB4,
    5px 5px #09AFB4, 4px 4px #09AFB4, 7px 7px #09AFB4,
    6px 6px #09AFB4;
 }
 .emblema {
    font-family: "Emblema One", system-ui;
 }

 .gaegu {
    font-family: "Gaegu", sans-serif;
 }

 body {
    background-color: #FAEFD6;
 }

  
 /* CSS from https://codepen.io/quadbaup/details/rKOKQv */
.thought {
    display: flex;
    // background-color: #fff;
    padding: 20px;
    border-radius: 30px;
    // min-width: 40px;
    width: 250px;
    height: 50px;
    margin: 20px;
    margin-left: -10px;
    position: relative;
    align-items: center;
    justify-content: center;
    /* text-align:center; */
}

.css-vrrmew-Box {
  color: #5E3414 !important;
}

.css-cysksd {
  color: #5E3414 !important;
}

.css-k3i0c5 {
  color: #5E3414 !important;
}
  `

const RSVP = ({ text, color }) => {
  return (
    <Flex
      as="a"
      href="https://hack.club/arcade-join"
      target="_blank"
      className="slackey"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        width: ['100%', '100%', '100%', '30%'],
        textDecoration: 'none'
      }}
    >
      <Box
        sx={{
          backgroundColor: color == 'blue' ? '#09AFB4' : '#FF5C00',
          color: '#FAEFD6',
          width: ['100%', '100%', '', ''],
          paddingX: ['8px', '10px', '15px'],
          paddingY: ['5px', '7px', '10px'],
          fontSize: ['24px', '27px', '30px'],
          borderRadius: '5px',
          textAlign: 'center'
        }}
      >
        {text}
      </Box>
    </Flex>
  )
}

const Powerups = ({ img, text, cost, polaroidRotation, ticketRotation }) => {
  return (
    <Flex
      sx={{
        background: '#09AFB4',
        borderRadius: '10px',
        flexDirection: 'column',
        padding: '20px',
        position: 'relative',
        transform: `rotate(${polaroidRotation}deg)`,
        transitionDuration: '0.5s',
        '&:hover': {
          transform: 'scale(1.1)',
        }
      }}
    >
      <Flex sx={{ background: '#FFEEC6', height: '250px', justifyContent: 'center', alignItems: 'center' }}>
        <img src={img} sx={{width: '100%', height: 'auto'}}/>
      </Flex>
      <Text className="slackey" variant="headline" sx={{ color: '#FFEEC6' }}>
        {text}
      </Text>
      <Text
        sx={{
          background: '#FF8C37',
          px: '20px',
          color: '#FFEEC6',
          position: 'absolute',
          top: '-10px',
          right: '-12px',
          transform: `rotate(${ticketRotation}deg)`
        }}
        variant="headline"
        className="gaegu"
      >
        {cost} tickets
      </Text>
    </Flex>
  )
}

const Intro = ({ title, num, text, img, third, ...props }) => {
  return (
    <Box
      sx={{
        background: '#FAEFD6',
        padding: '20px',
        borderRadius: '5px',
        position: 'relative',
        color: '#35290F'
      }}
      {...props}
    >
      <Text variant="title" className="gaegu" sx={{ display: 'block' }}>
        {title}
      </Text>
      <Text
        variant="subtitle"
        sx={{
          width: [
            'calc(100% - 80px)',
            'calc(100% - 80px)',
            'calc(100% - 80px)',
            'calc(100% - 150px)'
          ],
          display: 'block'
        }}
      >
        {text}
      </Text>
      <Text
        variant="title"
        sx={{
          position: 'absolute',
          top: '3px',
          right: '5px',
          opacity: '0.2'
        }}
        className="slackey"
      >
        {num}
      </Text>
      {third == 'true' ? (
        <img
          src={img}
          alt="Racoon drawing"
          sx={{
            width: ['45%', '250px', '60%', '80%'],
            maxWidth: '300px',
            position: 'absolute',
            right: ['-40px', '-60px', '-50px', '-50px'],
            bottom: ['-40px', '-50px', '-50px', '-65px']
          }}
        />
      ) : (
        <img
          src={img}
          alt="Racoon drawing"
          sx={{
            width: ['35%', '35%', '35%', '50%'],
            maxWidth: '210px',
            position: 'absolute',
            right: '-20px',
            bottom: '0'
          }}
        />
      )}
    </Box>
  )
}

const Tickets = ({ title, num, text, link, img, ...props }) => {
  return (
    <Card
      variant="interactive"
      as="a"
      href={link}
      sx={{
        background: '#FAEFD6',
        padding: '20px',
        borderRadius: '5px',
        position: 'relative',
        color: '#35290F',
        border: '3px dashed #5E3414'
      }}
      {...props}
    >
      {/* <Text
        sx={{
          background: '#35290F',
          color: '#FAEFD6',
          px: '10px',
          py: '4px',
          borderRadius: '4px',
          fontSize: [1, 1, 2],
          display: 'block',
          width: 'fit-content'
        }}
        className="slackey"
      >
        Tickets: {num}
      </Text> */}
      <Text
        className="gaegu"
        sx={{ display: 'block', fontSize: [3, 4, 5], marginTop: '-10px' }}
      >
        {title}
      </Text>
      <Text
        sx={{
          fontSize: [2, 3, 3],
          display: 'block'
        }}
      >
        {text}
      </Text>
      {img && (
        <img
          src={img}
          alt="racoon drawing"
          sx={{
            width: ['35%', '35%', '35%', '50%'],
            maxWidth: '210px',
            position: 'absolute',
            right: '0',
            bottom: '0',
            display: ['none', 'none', 'block', 'block']
          }}
        />
      )}
    </Card>
  )
}

const Sticker = ({ st }) => {
  return (
    <Box sx={{ position: 'absolute', top: '-270px', left: '0px' }}>
      <Box
        sx={{
          background: '#D0BF97',
          paddingY: '20px',
          paddingX: '30px',
          width: 'fit-content',
          position: 'relative',
          borderRadius: '5px',
          transform: 'rotate(3deg)',
          zIndex: 4
        }}
      >
        <Flex
          key={st}
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            img: {
              objectFit: 'contain',
              width: [128, 160],
              height: [128, 160],
              transition: '.25s transform ease-in-out'
            }
          }}
        >
          <Image
            src={`/stickers/${st}`}
            width={128}
            height={128}
            alt={st.split('.')[0]}
          />
          <Text
            as="span"
            variant="caption"
            sx={{
              fontSize: 2,
              mt: [2, 3],
              textAlign: 'center',
              color: '#FAEFD6'
            }}
          >
            {startCase(st.replace(/\.(svg|png)/, ''))}
          </Text>
        </Flex>
        <Box
          sx={{
            content: '"hi"',
            position: 'absolute',
            bottom: '-20px', // Position the triangle at the bottom
            left: '50%',
            transform: 'translateX(-50%)',
            width: '0',
            height: '0',
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '20px solid #D0BF97' // Same color as the box background
          }}
        />
      </Box>
    </Box>
  )
}

const Item = ({ name, img, cost }) => {
  return (
    <Flex
      sx={{
        border: '2px solid #FAEFD6',
        bg: 'rgb(255, 239, 214, 0.2)',
        height: '100px',
        width: '140px',
        marginX: '10px',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text
        variant="headline"
        className="slackey"
        sx={{
          position: 'absolute',
          bottom: '-10px',
          left: '10px',
          color: '#FAEFD6',
          opacity: 0.2,
          zIndex: 0
        }}
      >
        {cost}h
      </Text>
      <img
        src={img}
        alt={name}
        sx={{
          height: '100%',
          width: 'auto',
          margin: 'auto',
          position: 'relative',
          zIndex: 1
        }}
      />
    </Flex>
  )
}
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}

let yap_sounds = {
  // ty caleb!
  thinking: [
    new Howl({ src: '/bin/yapping/thonk1.wav' }),
    new Howl({ src: '/bin/yapping/thonk2.wav' }),
    new Howl({ src: '/bin/yapping/thonk3.wav' })
  ],
  talking: {
    // these sounds and most of the yapping code are adapted from https://github.com/equalo-official/animalese-generator
    a: new Howl({ src: '/bin/yapping/a.wav', volume: 0.16 }),
    b: new Howl({ src: '/bin/yapping/b.wav', volume: 0.16 }),
    c: new Howl({ src: '/bin/yapping/c.wav', volume: 0.16 }),
    d: new Howl({ src: '/bin/yapping/d.wav', volume: 0.16 }),
    e: new Howl({ src: '/bin/yapping/e.wav', volume: 0.16 }),
    f: new Howl({ src: '/bin/yapping/f.wav', volume: 0.16 }),
    g: new Howl({ src: '/bin/yapping/g.wav', volume: 0.16 }),
    h: new Howl({ src: '/bin/yapping/h.wav', volume: 0.16 }),
    i: new Howl({ src: '/bin/yapping/i.wav', volume: 0.16 }),
    j: new Howl({ src: '/bin/yapping/j.wav', volume: 0.16 }),
    k: new Howl({ src: '/bin/yapping/k.wav', volume: 0.16 }),
    l: new Howl({ src: '/bin/yapping/l.wav', volume: 0.16 }),
    m: new Howl({ src: '/bin/yapping/m.wav', volume: 0.16 }),
    n: new Howl({ src: '/bin/yapping/n.wav', volume: 0.16 }),
    o: new Howl({ src: '/bin/yapping/o.wav', volume: 0.16 }),
    p: new Howl({ src: '/bin/yapping/p.wav', volume: 0.16 }),
    q: new Howl({ src: '/bin/yapping/q.wav', volume: 0.16 }),
    r: new Howl({ src: '/bin/yapping/r.wav', volume: 0.16 }),
    s: new Howl({ src: '/bin/yapping/s.wav', volume: 0.16 }),
    t: new Howl({ src: '/bin/yapping/t.wav', volume: 0.16 }),
    u: new Howl({ src: '/bin/yapping/u.wav', volume: 0.16 }),
    v: new Howl({ src: '/bin/yapping/v.wav', volume: 0.16 }),
    w: new Howl({ src: '/bin/yapping/w.wav', volume: 0.16 }),
    x: new Howl({ src: '/bin/yapping/x.wav', volume: 0.16 }),
    y: new Howl({ src: '/bin/yapping/y.wav', volume: 0.16 }),
    z: new Howl({ src: '/bin/yapping/z.wav', volume: 0.16 }),
    th: new Howl({ src: '/bin/yapping/th.wav', volume: 0.16 }),
    sh: new Howl({ src: '/bin/yapping/sh.wav', volume: 0.16 }),
    _: new Howl({ src: '/bin/yapping/_.wav', volume: 0.16 })
  }
}

async function yap(text, letterCallback) {
  text = text.toLowerCase()
  const yap_queue = []
  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    try {
      if (char === 's' && text[i + 1] === 'h') {
        // test for 'sh' sound
        yap_queue.push(yap_sounds.talking['sh'])
        continue
      } else if (char === 't' && text[i + 1] === 'h') {
        // test for 'th' sound
        yap_queue.push(yap_sounds.talking['th'])
        continue
      } else if (char === 'h' && (text[i - 1] === 's' || text[i - 1] === 't')) {
        // test if previous letter was 's' or 't' and current letter is 'h'
        yap_queue.push(yap_sounds.talking['_'])
        continue
      } else if (char === ',' || char === '?' || char === '.') {
        yap_queue.push(yap_sounds.talking['_'])
        continue
      } else if (char === text[i - 1]) {
        // skip repeat letters
        yap_queue.push(yap_sounds.talking['_'])
        continue
      }
    } catch (e) {
      // who cares. pick up a foot ball
    }
    if (!char.match(/[a-zA-Z.]/)) {
      yap_queue.push(yap_sounds.talking['_'])
      continue // skip characters that are not letters or periods
    }
    yap_queue.push(yap_sounds.talking[char])
  }

  function next_yap() {
    letterCallback(yap_queue.length)
    if (yap_queue.length === 0) return
    let noise = yap_queue.shift()
    noise.rate(2 * (Math.random() * 0.5 + 1.9))
    noise.once('end', next_yap)
    noise.play()
  }

  next_yap()
}

async function generateProjectIdea() {
  if (
    document
      .querySelector('#generate-project-idea')
      .classList.contains('disabled')
  ) {
    return
  }

  yap_sounds.thinking[getRandomInt(yap_sounds.thinking.length)].play()
  document.querySelector('#generate-project-idea').classList.add('disabled')
  document.querySelector('#project-idea').innerHTML =
    '<em>' + thinkingWords() + '...' + '</em>'
  document.querySelector('#generate-project-idea').src =
    'https://cloud-g5g5sistf-hack-club-bot.vercel.app/1untitled_artwork_8_1.png'
  let text = ''
  const res = await fetch('/api/arcade/openai/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify()
  })
  const json = await res.json()
  text = json.recommendation
  document.querySelector('#project-idea').innerHTML = ''
  document.querySelector('#generate-project-idea').src =
    'https://cloud-81d1s66l7-hack-club-bot.vercel.app/0untitled_artwork_9_1.png'
  document.querySelector('#generate-project-idea').classList.remove('disabled')
  yap(text, i => {
    document.querySelector('#project-idea').innerHTML = text.slice(
      0,
      Math.max(text.length - i + 1, 0)
    )
  })
}

function thinkingWords() {
  const arr = [
    'thinking',
    'single neuron activated',
    '2 braincells rubbing together',
    'pondering',
    'contemplating',
    "rackin' my brain",
    '*raccoon rumination noises*',
    'raccooninating',
    'thinking about trash',
    'rummaging through my thoughts',
    'wishing you a garbage day'
  ]
  return arr[Math.floor(Math.random() * arr.length)]
}

const Arcade = ({ stickers = [], inventory }) => {
  const [showComponent, setShowComponent] = useState(false)
  const [showNum, setNum] = useState(false)
  const [showForm, setForm] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false);

  const handleButtonClick = () => {
    setIsRevealed(!isRevealed);
  };

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * stickers.length) // Generate a random number between 0 and 99
    setNum(newRandomNumber)
  }

  const handleMouseEnter = () => {
    setShowComponent(true)
  }

  const handleMouseLeave = () => {
    setShowComponent(false)
  }

  const mouseEnter = () => {
    handleMouseEnter()
    generateRandomNumber()
  }

  const [pageIsVisible, setPageIsVisible] = useState(true)
  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }
  return (
    <>
      <Meta
        as={Head}
        title="Arcade"
        description="The ultimate summer hackathon for high schoolers. Make projects. Track your hours. Redeem for powerups."
        image="https://cloud-luaw423i2-hack-club-bot.vercel.app/0frame_33__1_.png"
      />
      <Head>
        <meta
          property="og:logo"
          content="https://assets.hackclub.com/icon-rounded.png"
          size="512x512"
        />
        <script
          defer
          data-domain="secret.hackclub.dev"
          src="https://plausible.io/js/script.js"
        ></script>
      </Head>
      <Nav />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          overflowX: 'hidden',
          overflowY: 'hidden',
          paddingBottom: '20vh',
          paddingTop: '20vh'
        }}
      >
        <img
          src="/arcade/beige_bg.png"
          alt="beige swirly pattern"
          sx={{
            position: 'absolute',
            width: '110vw',
            transform: 'rotate(-30deg)',
            bottom: '-30vw',
            right: '-35vw',
            display: ['none', 'none', 'none', 'block']
          }}
        />
        <Grid
          sx={{
            gridTemplateColumns: ['1fr', '1fr', '1fr', '1fr 1fr'],
            width: '100%',
            pb: '10vh',
            width: '90vw',
            maxWidth: '1200px',
            margin: 'auto'
          }}
        >
          <Box
            sx={{
              color: '#09AFB4',
              gap: '10px'
            }}
          >
            <Fade delay={150}>
              <Box sx={{ textAlign: ['center', 'center', 'center', 'left'] }}>
                <img
                  alt={'GitHub + Hack Club'}
                  sx={{
                    width: ['112px', '112px', '212px'],
                    marginBottom: '16px',
                    margin: 'auto'
                  }}
                  src="https://cloud-e3wj9s4pe-hack-club-bot.vercel.app/00combo__1_.png"
                />
              </Box>
            </Fade>
            <Fade delay={250}>
              <Text
                as="h1"
                className="slackey arcade"
                sx={{
                  color: '#FF5C00',
                  textAlign: ['center', 'center', 'center', 'left'],

                  fontSize: ['50px', '70px', '80px', '85px']
                }}
              >
                ARCADE
              </Text>
            </Fade>
            {/* <Fade delay={350}>
              <Text
                sx={{
                  display: 'block',
                  textAlign: ['center', 'center', 'center', 'left'],
                  py: ['10px', '12px', '13px'],
                  fontSize: ['40px', '55px', '55px']
                }}
                variant="title"
              >
                Build something cool.
              </Text>
            </Fade> */}
            <Fade delay={450}>
              <Text
                sx={{
                  display: 'block',
                  textAlign: ['center', 'center', 'center', 'left'],
                  py: ['10px', '12px', '13px'],
                  fontSize: ['40px', '55px', '55px']
                }}
                variant="title"
              >
                Join 1,000 high schoolers spending their summers coding
                projects.
              </Text>
            </Fade>
            <Fade delay={550}>
              {/* <Text
                sx={{
                  display: 'block',
                  textAlign: ['center', 'center', 'center', 'left'],
                  py: ['10px', '12px', '13px'],
                  fontSize: ['40px', '55px', '55px']
                }}
                variant="title"
              >
                This summer is yours.
              </Text> */}
            </Fade>
            <Fade delay={650}>
              <Join
                fold
                showForm={showForm}
                setForm={setForm}
                formSent={formSent}
                setFormSent={setFormSent}
              />
              <Text
                variant="subtitle"
                className="gaegu"
                sx={{
                  textAlign: ['center', 'left', 'left', 'left'],
                  width: '100%',
                  display: 'block'
                }}
              >
                For high schoolers (or younger).
              </Text>
            </Fade>
          </Box>
          <Fade delay={800}>
            <Box
              className="hidden"
              sx={{
                textAlign: 'center',
                color: '#5E3414',
                transform: [
                  'scale(1)',
                  'scale(0.8)',
                  'scale(0.8)',
                  'scale(0.8)'
                ],
                mt: ['null', '-40px', '-20px', null]
              }}
            >
              <Box
                sx={{
                  justifyContent: 'center',
                  pt: ['120px', '180px', '180px', '180px'],
                  pb: [7, 7, 7, 7],
                  mt: ['40px', '50px', '100px', '-50px'],

                  display: 'grid',
                  background:
                    'url(/arcade/arcade_bg.png) no-repeat center center',
                  backgroundSize: 'contain'
                }}
              >
                <Text
                  id="project-idea"
                  className="thought"
                  sx={{
                    transform: [
                      'scale(0.7)',
                      'scale(1)',
                      'scale(1)',
                      'scale(1)'
                    ],
                    mb: [
                      '-40px !important',
                      '10px !important',
                      '10px !important',
                      '10px !important20px'
                    ]
                  }}
                >
                  🕹️
                </Text>
                <img
                  src="/arcade/idea.png"
                  className="hoverable"
                  alt="racoon thinking"
                  sx={{
                    margin: '0 auto',
                    display: 'inline',
                    width: 'auto',
                    height: '12em',
                    mb: ['-120px', '-20px', '-30px', '-50px'],
                    transform: [
                      'scale(0.7)',
                      'scale(1)',
                      'scale(1)',
                      'scale(1)'
                    ]
                  }}
                  id="generate-project-idea"
                  onClick={generateProjectIdea}
                />
              </Box>
              <Box as="h2">Click the raccoon for project ideas!</Box>
              <Text as="p">
                <em>
                  (It doesn't know much about coding, but it'll try its best.)
                </em>
              </Text>
            </Box>
          </Fade>
        </Grid>
      </Box>
      <Box
        sx={{
          width: '100vw',
          margin: 'auto',
          background:
            '#09AFB4 url(/arcade/blue_bg.svg) no-repeat center center',
          backgroundSize: 'cover',
          position: 'relative',
          paddingTop: '0',
          paddingBottom: '5vw',
          color: '#FAEFD6',
          zIndex: 2
        }}
      >
        <img
          src="/arcade/blue_top.svg"
          alt="blue scribble pattern"
          sx={{
            width: '100%',
            position: 'absolute',
            top: '-20vw'
          }}
        />
        <Box
          sx={{
            width: '90vw',
            maxWidth: '1200px',
            margin: 'auto',
            pt: 1
          }}
        >
          <Text
            variant="headline"
            sx={{ display: 'block', textAlign: 'center' }}
          >
            Calling high school makers: Join{' '}
            <Text className="slackey arcade3" sx={{ color: '#5E3414' }}>
              ARCADE
            </Text>
            .
          </Text>
          <Text
            variant="title"
            sx={{ display: 'block', textAlign: 'center', pb: 3 }}
          >
            What are you waiting for?
          </Text>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '30px',
              pb: [3, 3, 6, 6]
            }}
          >
            <Flex
              sx={{
                justifyContent: 'center',
                width: ['100%', '100%', '50%', '50%'],
                position: 'relative'
              }}
            >
              <Intro
                title="Work on projects"
                text="Hack on something cool! Examples: making your own PCB, building your own site, creating an app."
                num="1"
                img="/arcade/o2.png"
              />
              <img
                src="/arcade/a1.png"
                sx={{
                  width: '100px',
                  position: 'absolute',
                  left: '-110px',
                  bottom: '0',
                  display: ['none', 'none', 'block', 'block']
                }}
              />
              <img
                src="/arcade/a2.png"
                alt="arrow"
                sx={{
                  width: '90px',
                  position: 'absolute',
                  right: '-120px',
                  bottom: '0',
                  display: ['none', 'none', 'block', 'block']
                }}
              />
              {/* <Text
                sx={{
                  textAlign: 'center',
                  fontSize: [2, 4, 5],
                  width: '100%',
                  display: 'block',
                  transform: [
                    'rotate(0deg)',
                    'rotate(0deg)',
                    'rotate(3deg)',
                    'rotate(3deg)'
                  ],
                  position: 'absolute',
                  left: '0vw',
                  bottom: '-50px',
                  zIndex: '3'
                }}
                className="gaegu"
              >
                <Text sx={{ background: '#5E3414', px: 2, py: 1 }}>
                  Hack. Rinse. Repeat.
                </Text>
              </Text> */}
            </Flex>
            <Flex
              sx={{
                justifyContent: 'space-between',
                width: '100%',
                gap: '30px',
                flexDirection: ['column', 'column', 'row', 'row'],
                position: 'relative'
              }}
            >
              <Intro
                title="Bank your hours"
                text={
                  <>
                    Join the{' '}
                    <a
                      href="https://hackclub.com/slack"
                      target="_blank"
                      sx={{ color: 'inherit' }}
                    >
                      Hack Club Slack
                    </a>{' '}
                    and use /hack in #hack-hour to log your hours! You earn a
                    ticket for each hour spent!
                  </>
                }
                num="2"
                img="/arcade/o1.png"
              />
              <Intro
                title="Redeem your powerups"
                text="Use your tickets to buy powerups for your next project! Such as Arduino kits, drawing tablets, and more!"
                num="3"
                img="/arcade/o3.png"
                third="true"
              />
              <img
                src="/arcade/a3.png"
                alt="arrow"
                sx={{
                  width: '250px',
                  position: 'absolute',
                  left: '35vw',
                  bottom: '-120px',
                  display: ['none', 'none', 'block', 'block']
                }}
              />
            </Flex>
          </Flex>
          <Intro
            title="Build your next project!"
            text="What will you build with the powerups you redeemed?"
            num="4"
            img="/arcade/r7.png"
            sx={{
              display: ['block', 'block', 'none', 'none'],
              mt: '30px',
              mb: '20px'
            }}
          />
          <Text
            sx={{
              textAlign: 'center',
              fontSize: [2, 4, 5],
              width: '100%',
              display: 'block',
              transform: [
                'rotate(0deg)',
                'rotate(0deg)',
                'rotate(3deg)',
                'rotate(3deg)'
              ]
            }}
            className="gaegu"
          >
            <Text sx={{ background: '#5E3414', px: 2, py: 1 }}>
              Hack. Rinse. Repeat.
            </Text>
          </Text>
        </Box>
        <PageVisibility onChange={handleVisibilityChange}>
          {pageIsVisible && (
            <Box
              sx={{
                transform: 'rotate(-7deg) scale(1.1)',
                zIndex: 10,
                position: 'relative',
                marginBottom: ['-380px', '-350px', '-450px', '-500px'],
                marginTop: ['120px', '120px', '120px', '150px']
              }}
            >
              <Ticker speed={5}>
                {() => (
                  <Box as="div" sx={{ display: 'flex', height: 'fit-content' }}>
                    {inventory.map(i => (
                      <Item
                        img={i.imageURL}
                        cost={i.hours}
                        key={i}
                        name={i.name}
                      />
                    ))}
                  </Box>
                )}
              </Ticker>
            </Box>
          )}
        </PageVisibility>
        <img
          src="/arcade/blue_bottom.svg"
          alt="blue triangle"
          sx={{
            width: '100%',
            position: 'absolute',
            bottom: '-16vw'
          }}
        />
      </Box>

      <Flex
        sx={{
          width: '90vw',
          maxWidth: '1200px',
          margin: 'auto',
          paddingTop: '18vw',
          paddingBottom: '40px',
          gap: ['10px', '10px', '10px', '8vw'],
          flexWrap: ['wrap', 'wrap', 'wrap', 'nowrap'],
          color: '#5E3414',
          zIndex: 12,
          position: 'relative'
        }}
      >
        {/* <Balancer> */}
        <Text
          variant="headline"
          sx={{
            lineHeight: '1.5',
            display: 'block',
            position: 'relative',
            textAlign: ['center', 'center', 'center', 'left'],
            zIndex: 3
          }}
        >
          Get{' '}
          <Text
            onMouseEnter={mouseEnter}
            onMouseLeave={handleMouseLeave}
            sx={{
              cursor: 'pointer',
              position: 'relative',
              bg: '#09AFB4',
              transform: 'rotate(-3deg) scale(1.1)',
              py: '2px',
              px: '4px',
              borderRadius: '2px',
              color: '#FAEFD6',
              display: 'inline-block',
              mx: '6px',
              justifyContent: 'space-between'
            }}
          >
            {showComponent && <Sticker st={stickers[showNum]} />}
            free stickers
          </Text>{' '}
          and code with other high schoolers!
        </Text>
        {/* </Balancer> */}
        <Join
          showForm={showForm}
          setForm={setForm}
          formSent={formSent}
          setFormSent={setFormSent}
        />
      </Flex>
      <Projects />
      <Box
        sx={{
          background: 'linear-gradient(0deg, #A5C47F 0%, #09AFB4 100%)',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            width: '90vw',
            maxWidth: '1200px',
            margin: 'auto',
            py: '50px'
          }}
        >
          <Text
            variant="headline"
            sx={{
              color: '#FAEFD6',
              textAlign: 'center',
              display: 'block',
              fontSize: [2, 4, 5]
            }}
          >
            One hour at a time,
          </Text>
          <Text
            variant="title"
            sx={{ color: '#FAEFD6', textAlign: 'center', display: 'block' }}
            className="gaegu"
          >
            What will{' '}
            <Text
              sx={{
                background: '#35290F',
                py: '1px',
                px: '10px',
                pb: '5px',
                lineHeight: '1.1em',
                display: 'inline-block',
                transform: 'rotate(20deg)',
                position: 'relative'
              }}
            >
              you
            </Text>{' '}
            make this summer?
          </Text>
          <Box sx={{ textAlign: 'center', width: '100%' }}>
            <Text
              variant="subtitle"
              sx={{
                display: 'block',
                color: '#35290F',
                bg: '#FAEFD6',
                width: 'fit-content',
                px: '3px',
                py: '5px',
                borderRadius: '2px',
                margin: 'auto',
                mt: 4
              }}
            >
              1 hour spent making = 1 ticket
            </Text>
          </Box>
          <Grid
            sx={{
              gridTemplateColumns: [
                '1fr',
                '1fr 1fr',
                '1fr 1fr 1fr',
                '1fr 1fr 1fr 1fr'
              ],
              marginTop: '25px',
              py: '5vh'
            }}
          >
            <Tickets
              title="Your own project!"
              text="You could build an AR game, pixel art display, drawing robot, and more! Anytime you work on your project, start the hack hour timer. You earn a ticket for every hour you spend on your project."
              num="Infinite"
              img="/arcade/o4.png"
              sx={{
                gridColumn: ['', 'span 2', 'span 2', 'span 2'],
                gridRow: ['', 'span 2', 'span 2', 'span 2'],
                img: {
                  width: ['35%', '35%', '80%', '120%'],
                  maxWidth: '350px',
                  marginRight: '-60px'
                }
              }}
            />
            <Tickets
              title="Boba drops"
              text="Build a website, get boba!"
              num="0.5"
              link="https://boba.hackclub.com/"
            />
            <Tickets
              title="Wizard Orpheus"
              text="Build a text-based game with AI"
              num="0.5"
            />
            <Tickets
              title="The Bin"
              text="Build an online circuit, get the parts for free!"
              num="0.5"
              link="/bin"
            />
            <Tickets
              title="Sprig"
              text="Build a JS game, play it on your own console"
              num="2"
              link="/sprig"
            />
            <Tickets
              title="OnBoard"
              text="Design a PCB, get a $100 grant"
              num="2"
              link="/onboard"
            />
            <Tickets
              title="Blot"
              text="Make programatic artwork, assemble your own drawing machine!"
              num="3"
              link="https://blot.hackclub.com/"
            />
            <Tickets
              title="Cider"
              text="Make a mobile app, get an Apple Developer account"
              num="4"
              link="https://cider.hackclub.com"
            />

            <Tickets
              title="Easel"
              text="Write a programming language, receive fudge!"
              num="5"
              link="https://easel.hackclub.com/orpheus-finds-easel"
            />

            <img
              src="/arcade/r5.png"
              sx={{
                width: ['35%', '35%', '35%', '50%'],
                maxWidth: '210px',
                position: 'absolute',
                right: '10px',
                top: '0',
                display: ['none', 'none', 'none', 'block']
              }}
            />
          </Grid>
        </Box>
        <img
          src="/arcade/yellow_bottom.svg"
          alt="jig jag yellow design"
          sx={{
            width: '100%',
            position: 'absolute',
            left: 0,
            bottom: '-10vw',
            zIndex: 3
          }}
        />
      </Box>
      <Box
        sx={{
          background: 'url(/arcade/brown_bg.svg) no-repeat center center',
          backgroundSize: 'cover',
          pt: '30vh',
          pb: '25vh',
          color: '#5E3414',
          position: 'relative'
        }}
      >
        <img
          src="/arcade/o5.png"
          sx={{
            width: ['45%', '45%', '45%', '60%'],
            maxWidth: '310px',
            position: 'absolute',
            right: '10px',
            top: '40px',
            zIndex: 0,
            display: ['none', 'none', 'none', 'block']
          }}
        />
        <img
          src="/arcade/o6.png"
          sx={{
            width: ['30%', '30%', '30%', '40%'],
            maxWidth: '210px',
            position: 'absolute',
            left: '10px',
            top: '70px',
            zIndex: 0,
            display: ['none', 'none', 'none', 'block']
          }}
        />
        
        <Box
          sx={{
            width: '90vw',
            maxWidth: '950px',
            margin: 'auto',
            textAlign: 'center',
            mt: '-50px'
            // pb: '50px'
          }}
        >
          <Text variant="title" sx={{ display: 'block' }}>
           <Text 
          //  onClick={handleButtonClick}
            sx={{
              background: '#FF8C37',
              color: '#FFEEC6',
              py: '1px',
              px: '10px',
              pb: '5px',
              lineHeight: '1.1em',
              display: 'inline-block',
              transform: 'rotate(-5deg)',
              position: 'relative'
            }}>Powerups</Text> for your next project!
          </Text>
          <Text variant="subtitle" className="gaegu">
            Redeem these with your tickets! For high schoolers (or younger)
            only.
          </Text>
          <Grid
            sx={{
              pt: '50px',
              gridTemplateColumns: [
                '1fr',
                '1fr 1fr',
                '1fr 1fr',
                '1fr 1fr 1fr'
              ],
              gap: '50px'
            }}
          >
            <Powerups
              img="/arcade/3dPrinter.png"
              text="3D Printer"
              cost="80"
              polaroidRotation="-2"
              ticketRotation="6"
            />
            <Powerups
              img="/arcade/Flipper.png"
              text="Flipper Zero"
              cost="60"
              polaroidRotation="4"
              ticketRotation="-6"
            />
            <Powerups
              img="/arcade/Soldering.png"
              text="Soldering Iron"
              cost="12"
              polaroidRotation="-2"
              ticketRotation="12"
            />
            <Powerups
              img="/arcade/Breadboard.png"
              text="Flipper Zero"
              cost="4"
              polaroidRotation="3"
              ticketRotation="-4"
            />
            <Powerups
              img="/arcade/3dPrinting.png"
              text="3D Printing Credits"
              cost="3"
              polaroidRotation="-7"
              ticketRotation="3"
            />
            <Powerups
              img="/arcade/Sticker.png"
              text="Stickers (3)"
              cost="2"
              polaroidRotation="5"
              ticketRotation="-12"
            />
          </Grid>
        </Box>
        <Flex
          sx={{
            width: ['70vw', '50vw', '60vw', '70vw'],
            maxWidth: '1200px',
            ml: ['10vw'],
            mt: '100px',
            paddingTop: '50px',
            marginBottom: '-50px',
            gap: ['10px', '10px', '2vw', '0vw'],
            flexDirection: 'column'
          }}
        >
          {/* <Balancer> */}
          <Text
            variant="headline"
            sx={{
              lineHeight: '1.5',
              display: 'block',
              textAlign: ['center', 'center', 'center', 'left'],
              margin: ['auto', 'auto', 'auto', '0px'],
              width: '100%'
            }}
          >
            Join{' '}
            <Text className="slackey arcade2" sx={{ color: '#FF5C00' }}>
              ARCADE
            </Text>
            .
            <br />
            Build real project. <br /> Share it with friends.
          </Text>
          {/* </Balancer> */}
          <Join
            showForm={showForm}
            setForm={setForm}
            formSent={formSent}
            setFormSent={setFormSent}
            last
          />
        </Flex>
        <img
          src="/arcade/r6.png"
          alt="Racoon!"
          sx={{
            width: ['35%', '35%', '35%', '50%'],
            maxWidth: '210px',
            position: 'absolute',
            right: '20px',
            bottom: '0'
          }}
        />
      </Box>
      <ArcadeFooter />
      <style>{styled}</style>
    </>
  )
}

export default Arcade

export async function getStaticProps() {
  const stickersDir = path.join(process.cwd(), 'public', 'stickers')
  const stickers = fs
    .readdirSync(stickersDir)
    .filter(sticker => sticker !== 'hero.jpg')

  const res = await fetch('https://hackclub.com/api/arcade/inventory')
  const data = await res.json()
  return { props: { stickers, inventory: data.inventory } }
}
