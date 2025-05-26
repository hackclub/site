import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import {
  Box,
  Container,
  Heading,
  Button,
  Text,
  Image,
  Input,
  Label,
  Link,
  Flex
} from 'theme-ui'
import Snowfall from 'react-snowfall'
import WinterFooter from '../components/winter/footer'
import FadeIn from '../components/fade-in'
import { useState } from 'react'
import ForceTheme from '../components/force-theme'
import RealTimeline from '../components/winter/timeline'
import InfoGrid from '../components/winter/info'
import Breakdown from '../components/winter/breakdown'
import Projects from '../components/winter/projects'
import Landing from '../components/winter/landing'
import Recap from '../components/winter/recap'
import { Zoom } from 'react-swift-reveal'
import useSWR from 'swr'
import fetcher from '../lib/fetcher'

export function Winter() {
  const { data: rsvps } = useSWR(
    'https://airbridge.hackclub.com/v0.1/Winter%20Hardware%20Wonderland/rsvp',
    fetcher,
    { refreshInterval: 1000 }
  )

  const rsvpCount = rsvps
    ? rsvps.filter(rsvp => rsvp.fields.Status === 'rsvp').length
    : 1000 // arbitrary fallback number
  return (
    <>
      <Box as="main" sx={{ bg: 'blue' }}>
        <Meta
          as={Head}
          title="Winter Hardware Wonderland"
          description="Join the Hack Club community for a winter of hardware hacking, and get a $250 grant to build your project."
          image="/winter/og-image.png"
        />
        <Nav light />
        <Snowfall />
        <ForceTheme theme="light" />
        {/* filter out rsvps that are "invalid" */}
        <Landing rsvpCount={rsvpCount} />
        <Breakdown />
        <Projects />
        <InfoGrid />
        <Container>
          <Zoom>
            <Heading
              variant="headline"
              sx={{
                textShadow: '0px 0px 21px #E1F1FF',
                color: 'white',
                fontSize: [3, 4, 5],
                maxWidth: '90%'
              }}
            >
              You've RSVPed, what's next?
            </Heading>
            <Text as="p" sx={{ pb: 4, color: 'white', fontSize: [2, 3] }}>
              Get a free hardware development kit by building a tile-based game
              in{' '}
              <Link
                href="https://github.com/hackclub/sprig#readme"
                target="_blank"
                sx={{ color: 'inherit' }}
              >
                Sprig
              </Link>
              . Or come hangout with us in #hardware-party on{' '}
              <Link target="_blank" href="/slack" sx={{ color: 'inherit' }}>
                Slack
              </Link>
              .
            </Text>
          </Zoom>

          <Flex
            sx={{
              flexDirection: ['column', null, 'row'],
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              sx={{ display: 'flex', flexDirection: ['row', null, 'column'] }}
            >
              <Zoom>
                <Heading
                  variant="title"
                  sx={{
                    color: 'white',
                    textTransform: 'uppercase',
                    transform: ['none', null, 'rotate(-90deg)'],
                    textShadow: '0px 0px 21px #E1F1FF'
                  }}
                >
                  Timeline
                </Heading>
                <Image
                  src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f2f9165c12007b08314e45d9f3470c301f127edc_130_b560f32c6cfbba51ef55cfc9ecd5afa770e0c07c_0fox_1.webp"
                  alt="Illustrated orange fox sleeping in a curled position"
                  sx={{
                    width: ['100px', null, '80%'],
                    pt: [null, null, 6],
                    ml: [2, null, null]
                  }}
                />
              </Zoom>
            </Box>
            <RealTimeline />
          </Flex>
        </Container>
        <Box id="demo-account">
          <Recap />
        </Box>
        <WinterFooter />
      </Box>
    </>
  )
}

export default Winter
