import { Box, Container } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Recap from '../../components/hackathons/recap'
import Slack from '../../components/hackathons/features/slack'
import Money from '../../components/hackathons/features/money'
import Landing from '../../components/hackathons/landing'
import Marketing from '../../components/hackathons/features/marketing'
import Overview from '../../components/hackathons/overview'
import ScrollingHackathons from '../../components/hackathons/scrolling-hackathons'
import KeepExploring from '../../components/hackathons/keep-exploring'

export default function Hackathons({ data }) {
  return (
    <>
      <Box as="main" key="main">
        <Nav />
        <ForceTheme theme="light" />
        <Meta
          as={Head}
          title="Hackathons"
          description="Welcome to the high school hackathon. It's not an extracurricular or a club. It's not a class or a lecture. Hackathons are a playground to build things for fun and meet others doing the same."
          image="https://cloud-hkscyg8sg-hack-club-bot.vercel.app/0og-image.png"
        />
        <Box as="main">
          <Landing />
          
          <Overview />

          <ScrollingHackathons eventData={data} title={true} />
          
          <KeepExploring />
          <Money />
          <Slack />
          <Marketing />
          <Container>
            <Recap />
          </Container>
        </Box>
      </Box>
      <Footer key="footer" />
    </>
  )
}
export async function getStaticProps() {
  let data;
  try {
    const res = await fetch('https://hackathons.hackclub.com/api/events/upcoming');
    if (res.ok) {
      data = await res.json();
    } else {
      data = []; 
    }
  } catch (error) {
    data = []; 
  }

  return {
    props: {
      data, 
    },
    revalidate: 10
  };
}
