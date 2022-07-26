import { Box, Container, Heading, Grid, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'

import Landing from '../components/hackathons/landing'
import Rundown from '../components/hackathons/rundown'
import Content from '../components/hackathons/content.mdx'
import MovingCards from '../components/hackathons/moving-cards'
import Cta from '../components/hackathons/cta'
import Philosophy from '../components/hackathons/philosophy'

export default function Bank() {
  return (
    <>
      <Box as="main" key="main">
        <Nav />
        <ForceTheme theme="light" />
        <Meta
          as={Head}
          title="Hackathons"
          description="The Hack Club community provides the resources and tools to help you run amazing hackathons."
          image="/hackathons/og-image.png"
        />
        <Box as="main">
          <Landing />

          {/* Overview/rundown/what is a hackathon/why you should be so jazzed about irl hackathons */}
          <Container as="section" sx={{ mt: 5 }}>
            <Text as="p" variant="eyebrow">
              Hackathons
            </Text>
            <Heading as="h2" variant="title">
              Mhmm yeah gadzooks{' '}
              <Text
                as="span"
                sx={{
                  borderRadius: 'default',
                  px: 2,
                  mx: [-2, 0],
                  whiteSpace: 'nowrap',
                  color: '#5d114c',
                  bg: 'rgb(255, 212, 64)'
                }}
              >
                magic
              </Text>
              .
            </Heading>
            <Text as="p" variant="lead" sx={{ width: 'copyPlus' }}>
              A social coding event where high school students come together and
              share joy in computers build things, and form communities.
            </Text>
          </Container>

          <Philosophy />

          {/* what hack club (community) is providing to hackathon organizers */}
          <Container as="section">
            <Rundown />
          </Container>

          {/* I feel like there should be some sort of marquee animation here. hmmm yeah idk maybe
           it would be cool to use slack messages? questions from hackathon-organizers? faqs about 
           running hackathons? */}
          <Container as="section" sx={{ mt: 5 }}>
            <Text as="p" variant="eyebrow">
              From the Slack community...
            </Text>
            <Heading as="h2" variant="title">
              A hackathon organizer's{' '}
              <Text
                as="span"
                sx={{
                  borderRadius: 'default',
                  px: 2,
                  mx: [-2, 0],
                  whiteSpace: 'nowrap',
                  color: 'white',
                  bg: '#6f31b7'
                }}
              >
                best friend
              </Text>
              .
            </Heading>
          </Container>
          <MovingCards />
          <Grid
            columns={[null, null, 2]}
            gap={[3, 4]}
            variant="layout.container"
            sx={{
              mt: [1, 2, 3],
              textAlign: 'left',
              div: { p: [3, 4] },
              h2: { variant: 'text.headline', color: 'blue', mt: 0, mb: 2 },
              p: { fontSize: 2, my: 0 }
            }}
          >
            <Content />
          </Grid>

          <Cta />
        </Box>
      </Box>
      <Footer key="footer" />
    </>
  )
}
