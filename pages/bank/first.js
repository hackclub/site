import {
  Box,
  Heading,
  Container,
  Card,
  Text,
  Flex,
  Link,
  Button,
  Grid
} from 'theme-ui'

import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import NextLink from 'next/link'
import Icon from '../../components/icon'
import Features from '../../components/bank/first/features'

import Zoom from 'react-reveal/Zoom'
import Form from '../../components/bank/first/form'
import Testimonials from '../../components/bank/first/testimonials'
import Steps from '../../components/bank/first/steps'
import theme from '@hackclub/theme'

export default function First() {
  return (
    <>
      <Meta as={Head}>
        <title>Hack Club Bank — Toolkit for Robotics Teams</title>
      </Meta>
      <Box as="main" key="main">
        <Nav dark />
        <ForceTheme theme="dark" />
        <Box
          sx={{
            pt: [5, null, null, null, 6],
            pb: [3, 4, 5, null, 6],
            minHeight: ['70vh', 'none'],
            textAlign: 'center',
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-7chjcfuyw-hack-club-bot.vercel.app/0image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: '100%',
              mx: 'auto',
              px: '16px',
              backdropFilter: 'blur(1.5px)'
            }}
          >
            <Heading
              sx={{
                textAlign: 'center',
                mt: [5, null, 6],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)'
              }}
              as="h1"
              variant="ultratitle"
            >
              The ultimate financial tool for{' '}
              <Text
                as="span"
                sx={{
                  WebkitTextStroke: theme => theme.colors.blue,
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextFillColor: theme => theme.colors.white,
                  textShadow: theme => `0 0 12px ${theme.colors.blue}`
                }}
              >
                robotics teams
              </Text>
              .
            </Heading>
            <Container
              sx={{
                fontSize: [2, 3, 3],
                textAlign: 'center',
                my: 4
              }}
              variant="copy"
            >
              Built by <i>FIRST</i> alumni, for <i>FIRST</i> teams, Hack Club
              Bank is a full-stack financial toolkit used by thousands of
              teenagers worldwide.
            </Container>
            <Button variant="ctaLg" as="a" href="#demo">
              Get Started
            </Button>
          </Box>
        </Box>

        <Features />

        <Testimonials />

        <Container
          variant="container"
          id="demo"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
            pt: 5
          }}
        >
          <Heading variant="title">Get started in just a few days.</Heading>
          <Text variant="lead" color="muted">
            We’ll help you get set up and running in no time.
          </Text>
        </Container>

        <Flex
          sx={{
            flexDirection: ['column', null, 'row'],
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Steps />
          <Card
            variant="primary"
            sx={{
              backgroundColor: 'darkless',
              color: 'snow',
              width: ['100%', null, 356],
              float: [null, null, 'right'],
              height: 'fit-content'
            }}
          >
            <Text variant="heading" sx={{ fontSize: 24, lineHeight: 2 }}>
              Open a demo account
            </Text>
            <Form />
          </Card>
        </Flex>
        <Container
          variant="narrow"
          sx={{
            pt: 3,
            pb: 6,
            borderColor: 'muted',
            textAlign: 'center'
          }}
        >
          <Button
            sx={{
              backgroundImage: theme.util.gx('cyan', 'blue'),
              fontSize: 2,
              textTransform: 'none',
              mt: 3
            }}
            as="a"
            href="/bank/first/Hack_Club_Bank_for_FIRST_Teams.pdf"
            target="_blank"
          >
            <Icon glyph="download" size={36} />
            Download this page as a PDF
          </Button>
        </Container>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}
