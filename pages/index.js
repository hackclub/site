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
import carouselCards from '../lib/carousel.json'
import { Slack as SlackAPI } from './api/slack'
import { fetchGitHub } from './api/github'
import { fetchStars } from './api/stars'
import { getGames } from './api/games'
import { getConsoles } from './api/sprig-console'
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
import Header from '../components/index/Header'
import Features from '../components/index/Features'
import { cyberpunkVariants } from '../lib/utils'
/** @jsxImportSource theme-ui */

const Page = ({
  hackathonsData,
  bankData,
  slackData,
  gitHubData,
  stars,
  consoleCount,
  game,
  events,
  carouselCards
}) => {
  const { asPath } = useRouter()

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
      <Box as="main" sx={{ overflowX: 'hidden', position: 'relative', bg: 'cyberpunk.darkBg', color: 'cyberpunk.text' }}>
        <Header slackData={slackData} />
        <Box as="section" sx={{ py: [4, 5, '82px'], bg: 'cyberpunk.darkBg' }}>
          <Box sx={{ width: '90vw', maxWidth: 'layout', margin: 'auto' }}>
            <Features />
          </Box>
        </Box>
        <Carousel cards={carouselCards} />
        <Box py={[4, 5, '82px']}>
          <Box sx={{ width: '90vw', maxWidth: 'layout', margin: 'auto' }}>
            <Sprig stars={stars.sprig.stargazerCount} game={game} />
            <Onboard stars={stars.onboard.stargazerCount} />
            <Sinerider stars={stars.sinerider.stargazerCount} />
            <SprigConsole stars={stars.sprig.stargazerCount} consoleCount={consoleCount} />
            <Workshops stars={stars.hackclub.stargazerCount} />
            <Clubs />
            <Hackathons data={hackathonsData} stars={stars.hackathons.stargazerCount} />
            <HCB data={bankData} />
            <Neighborhood />
            <Trail />
            <Scrapyard />
            <Slack data={slackData} events={events} />
          </Box>
        </Box>
        <MailingList />
      </Box>
      <Footer dark pink sx={{ bg: 'rgb(233, 49, 135)', position: 'relative', overflow: 'hidden' }} />
    </ThemeProvider>
  )
}

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
    SlackAPI(),
    fetchGitHub(),
    fetchStars(),
    getGames(),
    getConsoles(),
    fetch('https://hackathons.hackclub.com/api/events/upcoming').then(res => res.ok ? res.json() : []),
    fetch('https://events.hackclub.com/api/events/upcoming/').then(res => res.json()).catch(() => [])
  ])

  let bankData = []
  try {
    const bd = await bankResponse.json()
    bankData.push(`💰 ${(bd.raised / 100).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} raised`)
  } catch {
    bankData.push('error')
  }

  return {
    props: {
      game: game || [],
      gitHubData,
      consoleCount,
      hackathonsData: hackathonsData || [],
      bankData,
      slackData,
      stars,
      events: events || [],
      carouselCards
    },
    revalidate: 60
  }
}

export default Page
