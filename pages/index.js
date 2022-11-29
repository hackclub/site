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
import NextLink from 'next/link'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import Icon from '../components/icon'
import BGImg from '../components/background-image'
import ForceTheme from '../components/force-theme'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Photo from '../components/photo'
import Footer from '../components/footer'
import FooterImgFile from '../public/home/footer.png'
import AssembleImgFile from '../public/home/assemble.jpg'
import Slack from '../components/slack'
import Announcement from '../components/announcement'
import Stage from '../components/stage'
import devtools from '../node_modules/devtools-detect/index.js'
import Carousel from '../components/carousel'
import Sprig from '../components/cards/sprig'
import Sinerider from '../components/cards/sinerider'
import SprigConsole from '../components/cards/sprig-console'
import Clubs from '../components/cards/clubs'
import Workshops from '../components/cards/workshops'
import Bank from '../components/cards/bank'
import FormData from 'form-data'
import Epoch from '../components/cards/epoch'
import Hackathons from '../components/cards/hackathons'
import ScrollingHackathons from '../components/hackathons/scrolling-hackathons'
import Fade from 'react-reveal/Fade'

let Highlight = styled(Text)`
  color: inherit;
  border-radius: 1em 0 1em 0;
  background: linear-gradient(
    -100deg,
    rgba(250, 247, 133, 0.33),
    rgba(250, 247, 133, 0.66) 95%,
    rgba(250, 247, 133, 0.1)
  );
`
Highlight = Highlight.withComponent('mark')

const cursor = keyframes` 0% {
  cursor: grabbing
}
5% {
  cursor: grab
}
10% {
  cursor: zoom-out
}
15% {
  cursor: all-scroll
}
20% {
  cursor: row-resize
}
25% {
  cursor: zoom-in
}
30% {
  cursor: text
}
35% {
  cursor: crosshair
}
40% {
  cursor: wait
}
45% {
  cursor: progress
}
50% {
  cursor: pointer
}
55% {
  cursor: context-menu
}
60% {
  cursor: none
}
65% {
  cursor: help
}
70% {
  cursor: vertical-text
}
75% {
  cursor: alias
}
80% {
  cursor: copy
}
85% {
  cursor: move
}
90% {
  cursor: no-drop
}
95% {
  cursor: not-allowed
}
100% {
  cursor: ew-resize
}`

const animation1 = keyframes`
0% {
  clip: rect(57px, 9999px, 7px, 0);
}
5% {
  clip: rect(61px, 9999px, 22px, 0);
}
10% {
  clip: rect(34px, 9999px, 47px, 0);
}
15% {
  clip: rect(92px, 9999px, 40px, 0);
}
20% {
  clip: rect(6px, 9999px, 40px, 0);
}
25% {
  clip: rect(39px, 9999px, 46px, 0);
}
30% {
  clip: rect(33px, 9999px, 17px, 0);
}
35% {
  clip: rect(5px, 9999px, 17px, 0);
}
40% {
  clip: rect(40px, 9999px, 70px, 0);
}
45% {
  clip: rect(14px, 9999px, 34px, 0);
}
50% {
  clip: rect(26px, 9999px, 30px, 0);
}
55% {
  clip: rect(15px, 9999px, 100px, 0);
}
60% {
  clip: rect(10px, 9999px, 32px, 0);
}
65% {
  clip: rect(49px, 9999px, 61px, 0);
}
70% {
  clip: rect(61px, 9999px, 22px, 0);
}
75% {
  clip: rect(85px, 9999px, 36px, 0);
}
80% {
  clip: rect(38px, 9999px, 59px, 0);
}
85% {
  clip: rect(21px, 9999px, 88px, 0);
}
90% {
  clip: rect(46px, 9999px, 16px, 0);
}
95% {
  clip: rect(13px, 9999px, 35px, 0);
}
100% {
  clip: rect(75px, 9999px, 13px, 0);
}
`

const animation2 = keyframes`
0% {
  clip: rect(62px, 9999px, 68px, 0);
}
5% {
  clip: rect(45px, 9999px, 9px, 0);
}
10% {
  clip: rect(9px, 9999px, 76px, 0);
}
15% {
  clip: rect(89px, 9999px, 83px, 0);
}
20% {
  clip: rect(44px, 9999px, 8px, 0);
}
25% {
  clip: rect(59px, 9999px, 24px, 0);
}
30% {
  clip: rect(96px, 9999px, 51px, 0);
}
35% {
  clip: rect(38px, 9999px, 28px, 0);
}
40% {
  clip: rect(92px, 9999px, 1px, 0);
}
45% {
  clip: rect(63px, 9999px, 80px, 0);
}
50% {
  clip: rect(1px, 9999px, 49px, 0);
}
55% {
  clip: rect(7px, 9999px, 49px, 0);
}
60% {
  clip: rect(35px, 9999px, 16px, 0);
}
65% {
  clip: rect(93px, 9999px, 72px, 0);
}
70% {
  clip: rect(55px, 9999px, 52px, 0);
}
75% {
  clip: rect(58px, 9999px, 68px, 0);
}
80% {
  clip: rect(94px, 9999px, 95px, 0);
}
85% {
  clip: rect(81px, 9999px, 24px, 0);
}
90% {
  clip: rect(98px, 9999px, 12px, 0);
}
95% {
  clip: rect(2px, 9999px, 96px, 0);
}
100% {
  clip: rect(95px, 9999px, 47px, 0);
}
`

const Glitch = styled(Text)`
  color: #000;
  text-decoration: none;
  bottom: 0px;
  right: 0px;
  font-size: 1em;
  display: inline-block;
  text-align: left;
  animation: ${cursor} 3s infinite ease-in-out;
  &:hover,
  &:hover:before,
  &:hover:after {
    font-weight: normal;
    text-decoration: underline;
  }
  ,
  &:before,
  &:after {
    color: #000;
    content: 'Hacker? Inspect 🔍 this page to learn more.';
    position: absolute;
    // background: #303039;
    width: fit-content;
    height: fit-content;
    overflow: hidden;
    // clip: rect(0, 256px, 0, 0);
  }
  ,
  &:before {
    left: 2px;
    text-shadow: -1px 0 red;
    animation: ${animation1} 2s infinite linear alternate-reverse;
  }
  ,
  &:after {
    left: -2px;
    text-shadow: -1px 0 green;
    animation: ${animation2} 4s infinite linear alternate-reverse;
  }
`

const rollout = keyframes`
0% {
  transform: translateY(-100px);
}
100% {
  transform: translateY(0);
}
`

function Page({ dataPieces, slackData, hackathonsData, bankData }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if it's open
      console.log('Is DevTools open:', devtools.isOpen)

      // Check it's orientation, `undefined` if not open
      console.log('DevTools orientation:', devtools.orientation)

      // Get notified when it's opened/closed or orientation changes
      window.addEventListener('devtoolschange', event => {
        console.log('Is DevTools open:', event.detail.isOpen)
        console.log('DevTools orientation:', event.detail.orientation)
      })
    }
  })

  // useEffect(() => {
  //   return (
  //     <Text sx={{ animation: `.4s ${rollout}` }} key={Math.random()}>
  //       {
  //         slackData.stats.sort((a, b) => a.ds - b.ds).reverse()[0]
  //           .total_members_count
  //       }
  //     </Text>
  //   )
  // }, slackData)

  const Node = ({ text }) => (
    <Badge
      variant="pill"
      bg="sunken"
      sx={{
        flexGrow: 1,
        fontSize: 2,
        color: 'text'
      }}
    >
      <Link
        href="https://github.com/hackclub"
        sx={{ textDecoration: 'none', color: 'inherit' }}
      >
        {text}
      </Link>
    </Badge>
  )
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
        as="header"
        sx={{
          bg: 'light',
          pt: [5, 6],
          pb: [2, 3],
          textAlign: 'left',
          position: 'relative',
          overflowX: 'hidden'
        }}
      >
        {/* <BGImg
          src={AssembleImgFile}
          alt="Hack Clubbers assemble at Figma HQ for the first IRL hackathon in SF since 2020: Assemble. 📸 Photo by Kunal Botla, Hack Clubber in MA!"
          priority
        /> */}
        {/* <SlideDown duration={768}> */}
        <Box
          sx={{
            maxWidth: [null, 'layoutPlus'],
            position: 'relative',
            mx: 'auto'
          }}
        >
          <Node text={dataPieces[0]} />
          <Fade bottom cascade>
            <Heading
              as="h1"
              variant="ultratitle"
              sx={{
                color: 'text',
                my: [3, 4],
                mx: 'auto',
                zIndex: 1,
                textAlign: 'left'
              }}
            >
              <Text
                as="span"
                sx={{
                  lineHeight: 1,
                  display: 'block',
                  pb: 3
                }}
              >
                We inspire the hacker ethic in{' '}
                <Text sx={{ color: 'transparent', mr: 2 }}>
                  <Text
                    sx={{
                      lineHeight: 0.875,
                      px: 2,
                      backgroundColor: 'red',
                      position: 'absolute',
                      borderRadius: 10,
                      transform: 'rotate(-3deg)',
                      color: 'white',
                      whiteSpace: 'nowrap',
                      '&:hover': { cursor: 'pointer' }
                    }}
                  >
                    teen makers
                  </Text>
                  teen makers{' '}
                </Text>
                around the world by building things we care about together.
              </Text>
            </Heading>
          </Fade>
          <Glitch>Hacker? Inspect 🔍 this page to learn more.</Glitch>
        </Box>
        {/* </SlideDown> */}
        <Carousel />
      </Box>
      <Box as="section" sx={{ py: [4, 5], color: 'black' }}>
        <Container>
          <Text variant="title">Join our open-source projects</Text>
          <Text variant="subtitle" as="p">
            We collaborate via <Link href='/slack'>Slack</Link>, our online community with <Text sx={{ animation: `.4s ${rollout}` }} key={Math.random()}>
            {
              slackData.stats.sort((a, b) => a.ds - b.ds).reverse()[0]
                .total_members_count
            } fabulous people to talk to at all hours. Come for the skills, stay for the friends!
          </Text>
          </Text>
          <Sprig />
          <Sinerider />
          <SprigConsole />
        </Container>
        {/* <Slack /> */}
        <Container mt={4}>
          <Text variant="title">Start a coding club</Text>
          <Text variant="subtitle" as="p">
            Join or start a Hack Club and be part of a network of high quality
            coding clubs where students gather to discover the joy of code.
          </Text>
          <Clubs />
          <Workshops />
        </Container>
        <Container mt={4}>
          <Text variant="title">Find a hackathon</Text>
          <Text variant="subtitle" as="p">
            It's not an extracurricular or a club. It's not a class or a
            lecture. Hackathons are a place to build things for fun and meet
            others doing the same.
          </Text>
          <Bank data={bankData} />
          <Epoch />
          <Hackathons />
        </Container>
        <ScrollingHackathons eventData={hackathonsData} />
      </Box>
      <Box bg="snow" color="black" py={[5, 6]}>
        <Container sx={{ textAlign: ['left', 'center'] }}>
          <Text as="p" variant="eyebrow">
            Let's quickly review
          </Text>
          <Heading as="h2" variant="title">
            Find your second-home in{' '}
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
            gap={[4, 3, 4]}
            columns={[null, 3]}
            sx={{
              textAlign: 'left',
              '> a, > div': {
                borderRadius: 'extra',
                boxShadow: 'elevated',
                px: [3, null, 4],
                py: [4, null, 5]
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
              href="https://ahackclub.com/slack"
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
                name="Join the Slack"
                desc="Connect with other technical teenagers and hack on things together."
              />
            </Card>
            <Card
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)',
                color: 'white',
                svg: { color: 'rgb(236, 55, 80)' }
              }}
            >
              <Stage
                icon="clubs"
                color="white"
                name="Start a Club or Attend a Hackathon"
                desc="Build an in-person community of high school hackers, and we're here to help."
              />
            </Card>
            <Card
              sx={{
                background: 'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
                color: 'white',
                svg: { color: '#fb558e' }
              }}
            >
              <Stage
                icon="event-code"
                color="white"
                name="Explore our open-sourced tools"
                desc="We're currently building a game engine, daily streak system, graphing game, and more!"
              />
            </Card>
          </Grid>
        </Container>
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

export async function getStaticProps() {
  let dataPieces = []
  let bankData = []
  let initialBankData = await fetch('https://bank.hackclub.com/stats').then(r =>
    r.json()
  )
  bankData.push(
    `💰 ${initialBankData.raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised on Bank`
  )
  let initialGitHubData = await fetch(
    'https://api.github.com/orgs/hackclub/events'
  ).then(r => r.json())
  initialGitHubData = initialGitHubData.map(x =>
    x.type == 'PushEvent' ||
    x.type == 'WatchEvent' ||
    (x.type == 'PullRequestEvent' && x.actor.login != 'github-actions[bot]')
      ? x.type == 'PushEvent'
        ? `✅ New commit in ${x.repo.name} by ${x.actor.login}`
        : x.type == 'WatchEvent'
        ? `⭐️ New star on ${x.repo.name}`
        : x.type == 'PullRequestEvent'
        ? `🔀 New PR for ${x.repo.name}`
        : `🎉 New activity in ${x.repo.name}`
      : null
  )
  console.log([...new Set(initialGitHubData)])
  dataPieces = [
    ...dataPieces,
    ...new Set(
      initialGitHubData.filter(function (el) {
        return el != null
      })
    )
  ]

  const formData = new FormData()

  formData.append('token', process.env.SLACK_API_TOKEN)
  formData.append('date_range', '30d')

  const slackData = await fetch(
    'https://hackclub.slack.com/api/team.stats.timeSeries',
    {
      method: 'POST',
      body: formData,
      headers: {
        Cookie: process.env.SLACK_API_COOKIE
      }
    }
  ).then(r => r.json())

  const res = await fetch('https://hackathons.hackclub.com/api/events/upcoming')
  const hackathonsData = await res.json()

  return {
    props: { dataPieces, slackData, hackathonsData, bankData },
    revalidate: 10
  }
}

export default Page
