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
import Icon from '@hackclub/icons'
import Features from '../../components/bank/first/features'
// import Form from '../../components/hackathons/grant/form'
// import Apply from '../../components/hackathons/grant/apply'

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
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-gxxp8xcyl-hack-club-bot.vercel.app/0fzfm1e-ueaef1qw.jpeg')",
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
                mt: [2, 4],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)'
              }}
              as="h1"
              variant="ultratitle"
            >
              {/* <Flex
                sx={{ justifyContent: 'center', alignItems: 'center', mb: 2 }}
              >
                <NextLink href="https://hackclub.com/bank" passHref>
                  <Box
                    as="a"
                    width={64}
                    height={64}
                    sx={{
                      width: 72,
                      height: 72,
                      backgroundImage: "url('/bank/bank-blue.png')",
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      mr: 3,
                      borderRadius: 8
                    }}
                    target="_blank"
                  ></Box>
                </NextLink>

                <NextLink href="https://www.firstinspires.org" passHref>
                  <Box
                    as="a"
                    sx={{
                      width: 72,
                      height: 72,
                      backgroundImage: "url('/hackathons/grant/first.png')",
                      backgroundColor: '#231F20',
                      backgroundSize: '60px, cover',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: 8
                    }}
                    target="_blank"
                  ></Box>
                </NextLink>
              </Flex> */}
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
            <Button variant="ctaLg" as="a" href="#apply">
              Start demo
            </Button>
          </Box>
        </Box>

        {/* Stuff */}

        <Features />

        {/* it'd be cool to have a thing here with a laptop and an interactive hcb interface? */}

        <Testimonials />

        <Container
          variant="container"
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
          <Text variant="caption" sx={{ color: 'muted' }}>
            Hack Club does not directly provide banking services. Banking
            services provided by Silicon Valley Bank, an FDIC-certified
            institution.
          </Text>
        </Container>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}
