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
  ::selection {
    background-color: #e42d42;
    color: #ffffff;
    text-shadow: none;
  }
  input:-webkit-autofill {
    -webkit-text-fill-color: white;
  }
`

export default function Bank({ isPartner, stats }) {
  return (
    <>
      <Box as="main" key="main">
        <Nav dark />
        <ForceTheme theme="dark" />
        <Meta
          as={Head}
          title="Bank"
          description="Hack Club Bank provides a 501(c)(3) status-backed fund optimized for high school hackathons, nonprofits, and clubs. Get fiscal sponsorship designed to help you run a great organization."
          image="/bank/og-image.png"
        />
        <style>{styles}</style>
        <Box>
          {isPartner ? (
            <Landing eventsCount={stats.events_count} />
          ) : (
            <Landing eventsCount={stats.events_count} showButton />
          )}
          {isPartner ? (
            <Features partner={true} />
          ) : (
            <Features partner={false} />
          )}
          <Testimonials />
          <Nonprofits />
          {isPartner ? (
            <Everything fee="10" partner={true} />
          ) : (
            <Everything fee="7" partner={false} />
          )}
          {!isPartner && <Start />}
        </Box>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { type: 'partner' } }, { params: { type: 'index' } }],
    fallback: false
  }
}

export async function getStaticProps(context) {
  const res = await fetch(`https://bank.hackclub.com/stats`)
  const stats = await res.json()

  return {
    props: {
      isPartner: context.params.type === 'partner',
      stats
    }
  }
}
