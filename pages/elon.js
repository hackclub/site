import {
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import { styled } from '@emotion/styled'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'

export default () => (
  <>
    <Head>
      <Meta
        description="Hack Club is a global nonprofit network of high school makers & student-led coding clubs where young people build the agency, the network, & the technical talent to think big & do big things in the world."
        image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fhackclub.jpg?v=1587740807714"
      />
    </Head>
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [4, 5, 6],
        pb: [4, 5],
        // bg: 'rgb(104, 41, 205)',
        // backgroundImage: theme => theme.util.gradient('rgb(207, 45, 228)', 'rgb(40, 59, 205)')
      }}>
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title" sx={{
          fontSize: [5, 6, null, 7],
          textShadow: '2px -2px 0 rgba(151,100,213,0.78),-2px -2px 0 rgba(254,143,155,0.78),0 4px 0 rgba(96,35,180,0.78)',
          span: {
            WebkitTextStroke: 'currentColor',
            WebkitTextStrokeWidth: '2px',
            WebkitTextFillColor: 'transparent'
          }
        }}>“[Hack Club] makes me feel <span>much more optimistic</span> about the future.”</Heading>
        <Text variant="headline" sx={{

        }}>—Elon Musk</Text>
      </Container>
    </Box>
    <Footer />
  </>
)
