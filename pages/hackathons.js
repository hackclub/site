import { Box, Container } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'

import Rundown from '../components/hackathons/rundown'
import Slack from '../components/hackathons/features/slack'
import Money from '../components/hackathons/features/money'
import Landing from '../components/hackathons/landing'
import Marketing from '../components/hackathons/features/marketing'
import Overview from '../components/hackathons/overview'
import ScrollingHackathons from '../components/hackathons/scrolling-hackathons'
import KeepExploring from '../components/hackathons/keep-exploring'

export default function Hackathons({ data }) {
  return (
    <>
      <Box as="main" key="main">
        <Nav />
        <ForceTheme theme="light" />
        <Meta
          as={Head}
          title="Hackathons"
          description="It's not an extracurricular or a club. It's not a class or a lecture. Hackathons are a playground to build things for fun and meet others doing the same."
          image="https://cloud-hkscyg8sg-hack-club-bot.vercel.app/0og-image.png"
        />
        <Box as="main">
          <Landing />
          <Overview />
          {/* <ScrollingHackathons eventData={data} /> */}
          <KeepExploring />
          <Money />
          <Slack />
          <Marketing />
          <Container>
            <Rundown />
          </Container>
        </Box>
      </Box>
      <Footer key="footer" />
    </>
  )
}

// https://hackathons.hackclub.com/api/events/upcoming
// export async function getStaticProps() {
//   const res = await fetch('https://hackathons.hackclub.com/api/events/upcoming')
//   const data = await res.json()
//   return {
//     props: {
//       data
//     }
//   }
// }
