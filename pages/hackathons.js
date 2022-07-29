import { Box, Container, Heading, Grid, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'

// import Landing from '../components/hackathons/landing'
import Rundown from '../components/hackathons/rundown'
// import Content from '../components/hackathons/content.mdx'
import MovingCards from '../components/hackathons/moving-cards'
// import Cta from '../components/hackathons/cta'
import Philosophy from '../components/hackathons/philosophy'
import Slack from '../components/hackathons/features/slack'
import Money from '../components/hackathons/features/money'
import Landing2 from '../components/hackathons/landing2'
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
          description="The Hack Club community provides the resources and tools to help you run amazing hackathons."
          image="/hackathons/og-image.png"
        />
        <Box as="main">
          <Landing2 />

          {/* Overview/rundown/what is a hackathon/why you should be so jazzed about irl hackathons */}

          <Philosophy />
          <Money />
          <Slack />
          <Marketing />
          <Container as="section">
            <Rundown />
          </Container>

          {/* old heading for the slack sectoin */}

          {/* <Container as="section" sx={{ mt: 5 }}>
            <Text as="p" variant="eyebrow">
              The Slack community
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
                  bg: 'rgb(255, 212, 64)'
                }}
              >
                best friend
              </Text>
              .
            </Heading>
          </Container> */}

          {/* <MovingCards /> */}

          {/* mdx section that might be useful */}
          {/* <Grid
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
          </Grid> */}

          {/* boring card cta that shows up at the bottom of mdx pages usually */}
          {/* <Cta /> */}
        </Box>
      </Box>
      <Footer key="footer" />
    </>
  )
}
