import { Box } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Landing from '../../components/bank/landing'
import Features from '../../components/bank/features'
import Testimonials from '../../components/bank/testimonials'
import Everything from '../../components/bank/everything'
import Start from '../../components/bank/start'
import Nonprofits from '../../components/bank/nonprofits'

const styles = `
  html {
    scroll-behavior: smooth;
  }
  ::selection {
    background-color: #e42d42;
    color: #ffffff;
    text-shadow: none;
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: white;
  }
`

export default function Bank({ stats }) {
  return (
    <>
      <Box as="main" key="main">
        <Nav dark />
        <ForceTheme theme="dark" />
        <Meta
          as={Head}
          title="Fiscal Sponsorship"
          description="Hack Club Bank is the largest fiscal sponsor of teen-led organizations in the US. Get a 501(c)(3) status-backed fund optimized for events, nonprofits, and more."
          image="/bank/og-image.png"
        >
          <title>Fiscal Sponsorship — Hack Club Bank</title>
        </Meta>
        <style>{styles}</style>
        <Box>
          <Landing eventsCount={stats.events_count} showButton />

          <Features />

          <Testimonials />
          <Nonprofits />

          <Everything fee="7" />

          <Start stats={stats} />
        </Box>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://bank.hackclub.com/stats`)
  const stats = await res.json()

  return {
    props: {
      stats,
      revalidate: 10
    }
  }
}
