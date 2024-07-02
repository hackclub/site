import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import { Box, Text, Flex, Grid, Card, Close, Divider, Heading } from 'theme-ui'
import Image from 'next/image'
import fs from 'fs'
import path from 'path'
import { startCase } from 'lodash'
import Projects from '../../components/arcade/projects'
import { Howl } from 'howler'
import Ticker from 'react-ticker'
import PageVisibility from 'react-page-visibility'
import ArcadeFooter from '../../components/arcade/footer'
import Balancer from 'react-wrap-balancer'
import { Fade } from 'react-reveal'
import Join from '../../components/arcade/join'
import Announcement from '../../components/announcement'
import Link from 'next/link'
import { shopParts } from '../api/arcade/shop'
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
    background-color: #F8F3F3;
    padding: 20px;
    border-radius: 30px;
    min-width: 40px;
    max-width: 180px;
    opacity: 0;
    height: 100px;
    margin: 20px;
    margin-left: -10px;
    position: relative;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    /* text-align:center; */
}

.thought:before,
.thought:after {
    content: "";
    background-color: #F8F3F3;
    border-radius: 50%;
    display: block;
    position: absolute;
    z-index: -1;
}

.thought:before {
    width: 44px;
    height: 44px;
    top: -12px;
    left: 28px;
    box-shadow: -50px 30px 0 -12px #F8F3F3;
}

.thought:after {
    bottom: -10px;
    right: 26px;
    width: 30px;
    height: 30px;
    box-shadow: 40px -34px 0 0 #F8F3F3,
        -28px -6px 0 -2px #F8F3F3,
        -24px 17px 0 -6px #F8F3F3,
        -5px 25px 0 -10px #F8F3F3;
}

#generate-project-idea {
  margin-top: -100px;
}

.talking {
  animation: talking 1s infinite;
}
@keyframes talking {
  0% {
      transform: translateY(0px);
  }

  50% {
      transform: translateY(-10px);
  }

  100% {
      transform: translateY(0px);
  }
}

.floaty {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {

  from,
  to {
      transform: translate(0%, -37%) rotate(-2deg);
  }

  25% {
      transform: translate(-2%, -40%) rotate(2deg);
  }

  50% {
      transform: translate(0%, -43%) rotate(-1deg);
  }

  75% {
      transform: translate(-1%, -40%) rotate(-1deg);
  }
}

a {
  color: inherit;
}
`

const Powerups = ({
  img,
  text,
  subtext,
  fullName,
  cost,
  description,
  fulfillmentDescription,
  polaroidRotation,
  ticketRotation,
  extraTags,
  ...props
}) => {
  const parsedFulfillmentDesc = fulfillmentDescription?.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
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
          transform: 'scale(1.1)'
        }
      }}
      {...props}
    >
      <Flex
        sx={{
          background: '#FFEEC6',
          height: '250px',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <img src={img} sx={{ width: '100%', height: 'auto' }} alt={text} />
      </Flex>
      <Flex
        sx={{
          marginTop: '20px',
          flexDirection: 'column'
        }}
      >
        <Text
          className="slackey"
          variant="headline"
          sx={{ color: '#FFEEC6', zIndex: 500 }}
        >
          {text}
        </Text>
        <Text
          variant="subtitle"
          sx={{
            color: '#FFEEC6',
            position: 'absolute',
            bottom: '15px',
            right: '25px'
          }}
        >
          {subtext}
        </Text>
      </Flex>
      <Text
        sx={{
          background: '#FF8C37',
          px: '20px',
          color: '#FFEEC6',
          position: 'absolute',
          top: '-10px',
          right: '-12px',
          zIndex: 2,
          transform: `rotate(${ticketRotation}deg)`
        }}
        variant="headline"
        className="gaegu"
      >
        {cost} {cost == 1 ? 'ticket' : 'tickets'}
      </Text>
      {extraTags?.map((tag, i) => {
        if (tag == 'Limited Supply') {
          return (
            <Text
              key={tag}
              sx={{
                background: '#CC6CE7',
                px: '20px',
                color: '#FFEEC6',
                position: 'absolute',
                top: '-15px',
                left: '-12px',
                zIndex: 1,
                transform: `rotate(${ticketRotation}deg)`
              }}
              variant="headline"
              className="gaegu"
            >
              Limited!
            </Text>
          )
        }
      })}
      <Text
        variant="headline"
        sx={{
          position: 'absolute',
          bottom: '-25px',
          right: '-10px',
          color: '#FFEEC6',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => {
          document.getElementById(`${text}-info`).showModal()
        }}
      >
        📦
      </Text>
      <dialog
        id={`${text}-info`}
        sx={{
          background: '#09AFB4',
          borderRadius: '10px',
          flexDirection: 'column',
          padding: '30px',

          border: 'none',
          scrollbarWidth: 'none',
          maxWidth: '400px',
          '@media (max-width: 400px)': {
            maxWidth: '300px'
          }
        }}
      >
        <Close
          sx={{
            '&:hover': { cursor: 'pointer' },
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2
          }}
          onClick={() => {
            document.getElementById(`${text}-info`).close()
          }}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <img
            src={img}
            sx={{ maxWidth: '360px', maxHeight: '250px' }}
            alt={text}
          />
          <Balancer>
            <Text
              className="slackey"
              variant="headline"
              sx={{ color: '#FFEEC6' }}
            >
              {fullName}
            </Text>
          </Balancer>
          <Balancer></Balancer>
          <Divider
            sx={{
              width: '50%',
              background: '#FFEEC6',
              height: '2px',
              border: 'none',
              margin: '10px 0'
            }}
          />
          <Balancer>
            <Text variant="subtitle" sx={{ color: '#FFEEC6' }}>
              {description}
            </Text>
          </Balancer>
          <Text
            variant="subtitle"
            sx={{ color: '#FFEEC6', fontStyle: 'italic' }}
            dangerouslySetInnerHTML={{ __html: parsedFulfillmentDesc }}
          ></Text>
        </Flex>
        <Text
          sx={{
            background: '#FF8C37',
            px: '20px',
            color: '#FFEEC6',
            position: 'absolute',
            top: '40px',
            right: '12px',
            transform: `rotate(${ticketRotation}deg)`
          }}
          variant="headline"
          className="gaegu"
        >
          {cost} {cost == 1 ? 'ticket' : 'tickets'}
        </Text>
      </dialog>
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
      <Text
        variant="title"
        className="gaegu"
        sx={{
          display: 'block',
          width: third == 'true' ? ['100%', '100%', '100%', '70%'] : '100%'
        }}
      >
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
      <img
        src={img}
        alt="Dino drawing"
        sx={{
          width: ['35%', '35%', '35%', '50%'],
          maxWidth: '210px',
          position: 'absolute',
          right: '-20px',
          bottom: '0'
        }}
      />
    </Box>
  )
}

const Tickets = ({ title, num, text, link, bugEater, ...props }) => {
  return (
    <Card
      variant="interactive"
      as="a"
      href={link}
      sx={{
        background: '#FAEFD6',
        padding: '20px !important',
        borderRadius: '5px',
        position: 'relative',
        color: '#35290F',
        border: '3px dashed #5E3414',
        height: '100%'
      }}
      {...props}
    >
      <Text
        className="gaegu"
        as="h1"
        sx={{
          display: 'block',
          fontSize: [2, 3, 4],
          marginTop: bugEater ? [null, null, null, '36px'] : '-10px'
        }}
      >
        {title}
      </Text>
      <Text
        as="p"
        sx={{
          fontSize: [1, 2, 2],
          display: 'block'
        }}
      >
        {text}
      </Text>
      {bugEater && (
        <>
          <Box>
            <Text
              id="console"
              variant="caption"
              sx={{
                textAlign: 'center',
                display: 'block',
                width: '100%',
                opacity: 0
              }}
            >
              Click me for ideas!
            </Text>
            <Text
              variant="caption"
              id="console2"
              sx={{
                textAlign: 'center',
                display: 'block',
                width: '100%'
              }}
            >
              Click me for ideas!
            </Text>
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
                onClick={generateProjectIdea}
                sx={{
                  justifyContent: 'center',
                  pt: ['120px', '140px', '140px', '140px'],
                  pb: [7, 7, 7, 7],
                  mt: ['40px', '-20px', '10px', '-50px'],
                  mb: ['40px', '50px', '100px', '-50px'],
                  display: 'grid',
                  background:
                    'url(/arcade/arcade_bg.png) no-repeat center center',
                  backgroundSize: 'contain',
                  cursor: 'pointer'
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
                      '10px !important'
                    ]
                  }}
                ></Text>
                <img
                  src="https://cloud-ocoecqzgs-hack-club-bot.vercel.app/0screenshot_2024-06-13_at_22.01.02.png"
                  className="hoverable"
                  alt="Need an idea?"
                  sx={{
                    margin: '0 auto',
                    display: 'inline',
                    width: 'auto',
                    height: '8em',
                    mb: ['-120px', '-20px', '-30px', '-30px'],
                    transform: [
                      'scale(0.7)',
                      'scale(1)',
                      'scale(1)',
                      'scale(1)'
                    ]
                  }}
                  id="generate-project-idea"
                />
              </Box>
              <Box></Box>
            </Box>
          </Box>
        </>
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
          maxHeight: '100%',
          width: 'auto',
          margin: 'auto',
          maxWidth: '100%',
          position: 'relative',
          zIndex: 1
        }}
      />
    </Flex>
  )
}

const FAQ = ({ question, answer }) => {
  const parsedAnswer = answer?.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  return (
    <Box
      sx={{
        background: '#FAEFD6',
        padding: '20px',
        borderRadius: '5px',
        position: 'relative',
        color: '#35290F',
        pt: '5px'
      }}
    >
      <Text variant="headline" className="gaegu" sx={{ display: 'block' }}>
        {question}
      </Text>
      <Text
        variant="subtitle"
        sx={{
          display: 'block',
          fontSize: [1, 2, 2]
        }}
        dangerouslySetInnerHTML={{ __html: parsedAnswer }}
      />
    </Box>
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
    noise.rate(2 * (Math.random() * 0.5 + 3.5))
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
  document.querySelector('#generate-project-idea').style.marginTop = '0px'
  document.querySelector('#console').style.marginTop = '-50px'
  document.querySelector('#console2').style.opacity = '0'
  document.querySelector('#project-idea').style.opacity = '1'
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
  // document.querySelector('#generate-project-idea').classList.add('talking')
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
    'ponderosourus',
    'contemplatosaurus',
    'dinosaur brain activated',
    'thinking about trash',
    'rummaging through my thoughts'
  ]
  return arr[Math.floor(Math.random() * arr.length)]
}

const Arcade = ({ stickers = [], carousel = [], highlightedItems = [] }) => {
  const [showComponent, setShowComponent] = useState(false)
  const [showNum, setNum] = useState(false)
  const [showForm, setForm] = useState(false)
  const [formSent, setFormSent] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)

  const handleButtonClick = () => {
    setIsRevealed(!isRevealed)
  }

  const router = useRouter()
  const { query } = router

  const slack = query.param

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
        description="The ultimate summer hackathon for high schoolers. Make projects. Track your hours. Redeem for Prizes."
        image="https://cloud-249autgay-hack-club-bot.vercel.app/0frame_70.png"
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
      <Nav color="dark" />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          overflowX: 'hidden',
          overflowY: 'hidden',
          paddingTop: '20vh',
          paddingBottom: '20vh'
        }}
      >
        {slack == 'slack' ? (
          <Announcement
            copy="You were redirected as we're running a special summer event!"
            caption="To join our Slack, join ARCADE."
            href="/arcade/"
            imgSrc="https://cloud-gyu8zgkki-hack-club-bot.vercel.app/0_______.png"
          />
        ) : (
          <></>
        )}

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
            pb: ['0vh', '0vh', '0vh', '20vh'],
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
                  fontSize: ['40px', '55px', '55px'],
                  textWrap: 'balance'
                }}
                variant="title"
              >
                The summer is yours for the making
                {/* Get free tools
                <br />
                & build something cool */}
                {/* Get free tools to build something cool. */}
                {/* <br /> */}
                {/* This summer is yours. */}
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
              {showForm ? (
                <></>
              ) : (
                <Text
                  variant="subtitle"
                  className="gaegu"
                  sx={{
                    textAlign: ['center', 'center', 'center', 'left'],
                    width: '100%',
                    display: 'block'
                  }}
                >
                  For high schoolers (or younger).
                </Text>
              )}
            </Fade>
          </Box>
          <Flex
            sx={{
              position: 'relative',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <img
              src="/arcade/prizes.png"
              sx={{
                zIndex: 10,
                width: ['80%', '70%', '65%', '80%'],
                mt: ['180px', '220px', '240px', '240px'],
                mb: ['-100px', '-150px', '-200px', '-100px']
              }}
              className="floaty"
            />
          </Flex>
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
          {/* <Text
            variant="headline"
            sx={{ display: 'block', textAlign: 'center' }}
          >
            Calling high school makers: Join{' '}
            <Text className="slackey arcade3" sx={{ color: '#5E3414' }}>
              ARCADE
            </Text>
            .
          </Text> */}
          <Text
            variant="title"
            sx={{ display: 'block', textAlign: 'center', pb: 3 }}
          >
            {/* What are you waiting for? */}
            How to play
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
                    and use /hack in #arcade to log your hours! You earn a
                    ticket for each hour spent!
                  </>
                }
                num="2"
                img="/arcade/o1.png"
              />
              <Intro
                title="Redeem your Prizes"
                text="Use your tickets to buy prizes for your next project! Such as Arduino kits, drawing tablets, and more!"
                num="3"
                img="/arcade/o7.png"
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
            text="What will you build with the Prizes you redeemed?"
            num="4"
            img="/arcade/o4.png"
            sx={{
              display: ['block', 'block', 'none', 'none'],
              mt: '30px',
              mb: '20px',
              img: {
                position: 'absolute',
                bottom: '-10px',
                maxWidth: '300px',
                width: '45%'
              }
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
              Make stuff. Get stuff. Repeat.
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
                marginBottom: ['-380px', '-420px', '-450px', '-520px'],
                marginTop: ['120px', '120px', '120px', '150px']
              }}
            >
              <Ticker speed={5}>
                {() => (
                  <Box as="div" sx={{ display: 'flex', height: 'fit-content' }}>
                    {carousel.map((item, i) => (
                      <Item
                        img={item.imageURL}
                        cost={item.hours}
                        key={i}
                        name={item.name}
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
          <Grid
            sx={{
              gridTemplateColumns: [
                '1fr',
                '1fr 1fr',
                '1fr 1fr',
                '1fr 1fr 1fr '
              ],
              marginTop: '25px',
              py: '5vh',
              alignItems: 'stretch'
            }}
          >
            <Tickets
              title="Build whatever you want!"
              text={
                <>
                  <p>
                    Any technical project counts. You could build an AR game,
                    pixel art display, drawing robot, and more! Anytime you work
                    on your project, start the hack hour timer. You earn a
                    ticket for every hour you spend on your project.
                  </p>
                  <Heading as="h4" my={0}>
                    Don't know where to start?
                  </Heading>
                  <ul>
                    <li>
                      <Link href="https://boba.hackclub.com/" target="_blank">
                        Boba drops:
                      </Link>{' '}
                      Build a website, get boba!
                    </li>
                    <li>
                      <Link
                        href="https://jams.hackclub.com/jam/wizard-orpheus"
                        target="_blank"
                      >
                        Wizard Orpheus:
                      </Link>{' '}
                      Build a text-based game with AI
                    </li>
                    <li>
                      <Link href="/bin" target="_blank">
                        The Bin:
                      </Link>{' '}
                      Build an online circuit, get the parts for free!
                    </li>
                    <li>
                      <Link href="/sprig" target="_blank">
                        Sprig:
                      </Link>{' '}
                      Build a JS game, play it on your own console
                    </li>
                    <li>
                      <Link href="/onboard" target="_blank">
                        OnBoard:
                      </Link>{' '}
                      Design a PCB, get a $100 grant
                    </li>
                    <li>
                      <Link href="https://fraps.hackclub.com" target="_blank">
                        Hackaccino:
                      </Link>{' '}
                      Build a 3D Website and get a free frappuccino! ☕
                    </li>
                    <li>
                      <a href="https://blot.hackclub.com/">Blot:</a> Write code.
                      Make art. Get a drawing machine.
                    </li>
                    <li>
                      <a href="https://cider.hackclub.com">Cider:</a> Make a
                      mobile app, get an Apple Developer account
                    </li>
                    <li>
                      <a href="https://easel.hackclub.com/orpheus-finds-easel">
                        Easel:
                      </a>{' '}
                      Write a programming language, receive fudge!
                    </li>
                  </ul>
                </>
              }
              num="Infinite"
              sx={{
                gridColumn: ['', 'span 2', 'span 2', 'span 2'],
                h1: {
                  fontSize: [3, 4, 5]
                },
                p: {
                  fontSize: [2, 2, 3],
                  display: 'block',
                  pb: 2
                },
                minHeight: ['700px', '700px', '700px', 'auto']
              }}
            />
            <Tickets
              title="Not sure what to make?"
              bugEater={true}
              text={<>Click me for ideas!</>}
              sx={{
                '&ul>li': {
                  color: 'inherit'
                },
                gridColumn: ['span 2', 'span 2', 'span 2', 'span 1'],
                minHeight: 'auto'
              }}
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
          id="shop"
        >
          <Balancer>
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
                }}
              >
                Prizes
              </Text>{' '}
              to powerup your next project!
            </Text>
          </Balancer>
          <Text
            variant="subtitle"
            className="gaegu"
            sx={{ mt: 2, display: 'block' }}
          >
            Redeem these with your tickets! For high schoolers (or younger)
            only.
          </Text>

          {/* <Text
            variant="caption"
            className="gaegu"
            sx={{ mt: 2, display: 'block' }}
          >
            All physical items only fulfillable where Amazon can be shipped
            unless otherwise stated.
          </Text> */}
          <Grid
            sx={{
              pt: '50px',
              gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr'],
              gap: '50px'
            }}
          >
            {highlightedItems.map((item, i) => (
              <Powerups
                img={item['Image URL']}
                text={item['Name']}
                subtext={item['Small Name']}
                fullName={item['Full Name']}
                cost={item['Cost Hours']}
                description={item['Description']}
                fulfillmentDescription={item['Fulfillment Description']}
                extraTags={item['Extra tags']}
                polaroidRotation={
                  (2 + Math.random() * 4) * (i % 2 === 0 ? 1 : -1)
                }
                ticketRotation={
                  (12 + Math.random() * 14) * (Math.random() > 0.5 ? 1 : -1)
                }
                key={i}
              />
            ))}
          </Grid>
          <Box
            as="a"
            href="/arcade/shop"
            sx={{
              backgroundColor: '#FF8C37',
              color: '#FAEFD6',
              borderRadius: '5px',
              border: 'none',
              fontSize: ['24px', '28px', '32px'],
              px: '20px',
              py: '15px',
              mt: 4,
              display: 'block',
              transitionDuration: '0.3s',
              textDecoration: 'none',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
            className="slackey"
          >
            See all prizes!
          </Box>
          <Text
            className="gaegu"
            variant="subtitle"
            sx={{ display: 'block', fontWeight: 'bold' }}
          >
            This is just a{' '}
            <Text
              sx={{
                background: '#FF8C37',
                color: '#FFEEC6',
                py: '1px',
                px: '10px',
                pb: '5px',
                lineHeight: '1.1em',
                display: 'inline-block',
                position: 'relative'
              }}
            >
              sneak peek
            </Text>
            ...new items will be added over the summer!{' '}
          </Text>
        </Box>
        <Box
          sx={{
            position: 'relative',
            background: '#09AFB4',
            display: 'block',
            mt: '100px',
            pb: '100px'
          }}
        >
          <img
            src="/arcade/blue_top.png"
            alt="blue scribble pattern"
            sx={{
              width: '100%',
              position: 'absolute',
              top: '-8vw',
              zIndex: 0
            }}
          />
          <Box
            sx={{
              width: '90vw',
              maxWidth: '1200px',
              margin: 'auto',
              pt: 2,
              color: '#FAEFD6'
            }}
          >
            <Text
              variant="title"
              className="slackey"
              sx={{
                textAlign: 'center',
                width: '100%',
                display: 'block',
                marginTop: '25px'
              }}
            >
              F.A.Q.
            </Text>
            <Grid
              sx={{
                gridTemplateColumns: ['1fr', '1fr', '1fr', '1fr 1fr'],
                // width: '100%',
                width: '90vw',
                maxWidth: '1200px',
                margin: 'auto',
                mt: '50px'
              }}
            >
              <FAQ
                question="Who is eligible?"
                answer="You need to be a high schooler (or younger). You just need a GitHub account & a Slack account to participate. Different prizes have different country restrictions."
              />
              <FAQ
                question="What types of projects count?"
                answer="Projects need to be open source (ie. linked to a GitHub repo) & have a way for people to experience it (ie. a game, a website, etc). At the end, each 'scrap' of your project will be put together in a timeline, so make sure to document your progress!"
              />
              <FAQ
                question="How many projects can I build?"
                answer="You can submit as many projects as you make. We just count the hours!"
              />
              <FAQ
                question="How much does it cost?"
                answer="100% free – all the prizes are donated to us or paid for by us! Some shipments may have customs charges that we can't cover depending on your country."
              />
              <FAQ
                question="I need help!"
                answer="Get it in the #arcade-help channel of the [Hack Club Slack](https://hackclub.com/slack). Alternatively, reach out to [arcade@hackclub.com](mailto:arcade@hackclub.com)"
              />
              <FAQ
                question="My hours aren't counted!"
                answer="We have human review on all your amazing work! Your 'scraps' may take a few days to review, but we'll get to it."
              />
              <FAQ
                question="Does a team project count?"
                answer="We count the hours of work you put in, so make sure to post 'scraps' of your work & show that it was you doing the work."
              />
              <FAQ
                question="What about school work or a job?"
                answer="The arcade is about the joy of building for the sake of building. If you're building something for school or work we can't count it."
              />
              <FAQ
                question="What counts as a scrap?"
                answer="Code needs a commit! Things like sprig or blot share links also work. 3D models should also go on a host like Printables or Github."
              />
            </Grid>
          </Box>
          <Flex
            sx={{
              width: ['70vw', '50vw', '60vw', '70vw'],
              maxWidth: '1200px',
              ml: ['10vw'],

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
                width: '100%',
                color: '#FAEFD6'
              }}
            >
              Join{' '}
              <Text className="slackey arcade2" sx={{ color: '#FF5C00' }}>
                ARCADE
              </Text>
              .
              <br />
              Build real projects. <br /> Share it with friends.
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
            alt="Dino!"
            sx={{
              width: ['35%', '35%', '35%', '50%'],
              maxWidth: '210px',
              position: 'absolute',
              right: '20px',
              bottom: '0'
            }}
          />
        </Box>
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

  const items = await shopParts()

  const carousel = items
    .map(record => ({
      hours: record['Cost Hours'] || 0,
      imageURL: record['Image URL'] || '',
      enabledCarousel: record['Enabled Carousel'] || false,
    }))
    .filter(item => item.enabledCarousel)
    .filter(item => item.imageURL !== '')

  const highlightedItems = items
    .filter(item => item['Enabled Highlight'])
    .sort((_a, _b) => Math.random() - 0.5 > 0)
    .map(record => ({
      // id: record['ID'],
      'Image URL': record['Image URL'] || null,
      'Name': record['Name'] || null,
      'Small Name': record['Small Name'] || null,
      'Full Name': record['Full Name'] || null,
      'Cost Hours': record['Cost Hours'] || null,
      'Description': record['Description'] || null,
      'Fulfillment Description': record['Fulfillment Description'] || null,
      'Extra tags': record['Extra tags'] || []
    }))

  return {
    props: {
      stickers,
      highlightedItems,
      carousel
    }
  }
}
