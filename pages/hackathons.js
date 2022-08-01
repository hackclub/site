import { Box, Container, Button, Heading, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'

import Icon from '@hackclub/icons'
import NextLink from 'next/link'

import Rundown from '../components/hackathons/rundown'
import Philosophy from '../components/hackathons/philosophy'
import Slack from '../components/hackathons/features/slack'
import Money from '../components/hackathons/features/money'
import Landing from '../components/hackathons/landing'
import Marketing from '../components/hackathons/features/marketing'

export default function Hackathons() {
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
          <Philosophy />

          <Box
            as="section"
            sx={{
              color: 'black',
              bg: 'white',
              py: [4, 5]
            }}
          >
            <Container variant="copy" sx={{ textAlign: 'center' }}>
              <Icon glyph="message-new" size={72} sx={{ color: 'blue' }} />
              <Heading variant="headline">
                Want to organize a hackathon?
              </Heading>
              <Text
                variant="subtitle"
                sx={{ lineHeight: 'caption', mb: 3, display: 'inline-block' }}
              >
                This semester, Hack Club is providing the tools and resources to
                high schoolers around the world to bring the magic of hackathons
                to their lcoal communities.
              </Text>

              <NextLink href="/slack" passHref>
                <Button variant="cta" sx={{ py: 2, px: 3, fontSize: 2 }} as="a">
                  Join our Slack
                </Button>
              </NextLink>
            </Container>
          </Box>

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
