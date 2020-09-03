import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import { keyframes } from '@emotion/core'
import { Slide } from 'react-reveal'
import NextLink from 'next/link'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
// import Announcement from '../components/announcement'
// import { timeSince } from '../lib/dates'

const CardLink = props => (
  <Link
    sx={{
      mt: 3,
      display: 'block',
      fontSize: 3,
      color: 'red',
      lineHeight: 'subheading',
      textDecoration: 'underline',
      textDecorationStyle: 'wavy',
      ':after': { content: '"›"', pl: 1 },
      ...props.sx
    }}
    {...props}
  />
)

const Window = ({ title, children }) => (
  <Card
    sx={{
      p: [0, 0],
      boxShadow: 'elevated',
      lineHeight: 0,
      border: '1px solid',
      borderColor: 'black'
    }}
  >
    <Box
      sx={{
        bg: 'muted',
        color: 'smoke',
        backgroundImage: theme =>
          `linear-gradient(${theme.colors.darkless}, ${theme.colors.darker})`,
        p: 2,
        lineHeight: 'body',
        textAlign: 'center'
      }}
    >
      {title}
    </Box>
    {children}
  </Card>
)

export default () => (
  <>
    <Meta
      as={Head}
      description="Hack Club is a global nonprofit network of high school makers & student-led coding clubs where young people build the agency, the network, & the technical talent to think big & do big things in the world."
      image="https://assets.hackclub.com/log/2020-06-26_hackclub-card.jpg"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="header"
      sx={{
        bg: 'dark',
        pt: [5, 6],
        display: 'flex',
        flexDirection: 'column',
        backgroundImage:
          'radial-gradient(ellipse farthest-corner at top left, rgba(255, 98, 220, 0.66), rgba(255, 91, 0, 0.66)), url(https://assets.hackclub.com/log/2020-06-29_flagship_1.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        '@media (hover: hover)': { backgroundAttachment: 'fixed' }
      }}
    >
      <Container pt={[3, 4]} pb={[4, 5]}>
        {/*
        <Announcement
          copy="The Summer of Making has begun!"
          caption="$50k in hardware grants, daily streaks, & more"
          href="https://summer.hackclub.com/"
          iconLeft="event-code"
          iconRight="door-enter"
          color="orange"
        />
        */}
        <Heading
          as="h1"
          variant="title"
          sx={{
            mt: 0,
            fontSize: [6, 7, 8],
            color: 'white',
            lineHeight: 0.875,
            mb: [3, 4],
            zIndex: 1,
            textShadow: 'text'
          }}
        >
          Welcome to the Summer of Making.
        </Heading>
        <Text
          as="p"
          variant="headline"
          sx={{
            maxWidth: 'copyPlus',
            color: 'white',
            textShadow: 'text',
            mb: 4
          }}
        >
          $50,000 in hardware grants from GitHub, a daily streak system, a Slack
          community with 10k+ hackers, & weekly online events. Open to teenagers
          worldwide.
        </Text>
        <Button
          as="a"
          variant="ctaLg"
          href="https://summer.hackclub.com"
          sx={{
            backgroundImage:
              'radial-gradient(at left top, rgb(0, 255, 255), rgb(0, 164, 255))'
          }}
        >
          Join the Summer
        </Button>
      </Container>
    </Box>
    <Box as="article" sx={{ bg: 'orange' }}>
      <Card as="section" sx={{ p: [3, 4, null, 5] }}>
        <Heading as="h2" variant="title" sx={{ textAlign: 'center' }}>
          Everything you’ll need to succeed.
        </Heading>
      </Card>
    </Box>
    <Footer />
  </>
)
