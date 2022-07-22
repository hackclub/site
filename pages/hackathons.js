import { Box, Container, Heading, Grid } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Stage from '../components/stage'

import Landing from '../components/hackathons/landing'
import Rundown from '../components/hackathons/rundown'

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
          <Container as="section">
            <Rundown />
          </Container>
        </Box>
      </Box>
      <Footer key="footer" />
    </>
  )
}
