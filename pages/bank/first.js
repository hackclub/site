import {
  Box,
  Heading,
  Container,
  Card,
  Text,
  Flex,
  Link,
  Button
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
              maxWidth: 'calc(56rem + 32px)',
              mx: 'auto',
              px: '16px',
              backdropFilter: 'blur(1.5px)'
            }}
          >
            <Heading
              sx={{
                textAlign: 'center',
                mt: [2, 4],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)',
                fontSize: [5, null, 6]
              }}
              as="h1"
              variant="title"
            >
              <Flex
                sx={{ justifyContent: 'center', alignItems: 'center', mb: 2 }}
              >
                <NextLink href="https://hackclub.com" passHref>
                  <Box
                    as="a"
                    width={64}
                    height={64}
                    sx={{
                      width: 72,
                      height: 72,
                      backgroundImage:
                        "url('https://assets.hackclub.com/icon-square.svg')",
                      backgroundSize: 'contain',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      mr: 3,
                      borderRadius: 8
                    }}
                    target="_blank"
                  ></Box>
                </NextLink>
                <Box mr={3} sx={{ fontWeight: 'normal' }}>
                  +
                </Box>
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
              </Flex>
              The ultimate financial tool for robotics teams.
            </Heading>
            <Box
              sx={{
                fontSize: [2, 3, 3],
                textAlign: 'center',
                my: 4
              }}
            >
              <NextLink href="https://www.firstinspires.org" passHref>
                <Link sx={{ color: 'blue' }} target="_blank">
                  Posiedon Robotics
                </Link>
              </NextLink>{' '}
              (FTC #16898) uses Hack Club Bank to manage their finances.
            </Box>
            {/* <Button variant="ctaLg" as="a" href="#apply" sx={{ mt: 2 }}>
              {open ? 'Apply Now' : 'Coming Soon'}
            </Button> */}
          </Box>
        </Box>

        {/* Stuff */}

        <Features />

        <Testimonials />

        <Form />
      </Box>
      <Footer dark key="footer" />
    </>
  )
}
