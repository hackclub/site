import Meta from '@hackclub/meta'
import dayjs from 'dayjs'
import JSConfetti from 'js-confetti'
import Head from 'next/head'
import { useEffect } from 'react'
import { Box } from 'theme-ui'
import Everything from '../../components/bank/everything'
import Features from '../../components/bank/features'
import Landing from '../../components/bank/landing'
import Nonprofits from '../../components/bank/nonprofits'
import Start from '../../components/bank/start'
import Testimonials from '../../components/bank/testimonials'
import Footer from '../../components/footer'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'

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
  useEffect(() => {
    ;(async () => {
      const allTime = await fetch('https://bank.hackclub.com/stats').then(res =>
        res.json()
      )
      const lastWeek = await fetch(
        `https://bank.hackclub.com/stats_custom_duration?end_date=${dayjs()
          .subtract(7, 'days')
          .format('YYYY-MM-DD')}`
      ).then(res => res.json())

      const raisedInAWeek = allTime.raised - lastWeek.raised

      if (raisedInAWeek > 10000000) {
        const jsConfetti = new JSConfetti()
        jsConfetti.addConfetti({
          emojis: ['💰', '💸', '💵', '🏦', '🐱', '🐈', '🦄'],
          confettiNumber: 200
        })
      }
    })()
  }, [])

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
