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
// import Snow from 'resnow'
import Footer from '../components/footer'
import FadeIn from '../components/fade-in'
import { useState } from 'react'
import ForceTheme from '../components/force-theme'
import RealTimeline from '../components/winter/timeline'
import InfoGrid from '../components/winter/info'
import Breakdown from '../components/winter/breakdown'
import Projects from '../components/winter/projects'
import Landing from '../components/winter/landing'

export default function Winter() {
  return (
    <>
      <Box as="main" sx={{ bg: 'blue' }}>
        <Meta
          as={Head}
          title="Winter Hardware Wonderland"
          description="Join the Hack Club community for a winter of hardware hacking, and get a $250 grant to build your project."
          image="/winter/og-image.png" // TODO: add og image
        />
        <Nav light />
        <ForceTheme theme="light" />
        <Landing />
        <Breakdown />
        <Projects />
        {/* grid section thing with the requirements, info etc. */}
        <InfoGrid />

        {/* timeline */}
        <Flex
          sx={{
            flexDirection: ['column', null, 'row'],
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: ['row', null, 'column'] }}>
            <Heading
              variant="title"
              sx={{
                color: 'white',
                textTransform: 'uppercase',
                transform: ['none', null, 'rotate(-90deg)']
              }}
            >
              Timeline
            </Heading>
            <Image
              src="https://cloud-lbajgdi3a-hack-club-bot.vercel.app/0fox_1.png"
              alt="Illustrated orange fox sleeping in a curled position"
              sx={{
                width: ['100px', null, '80%'],
                pt: [null, null, 6],
                ml: [2, null, null]
              }}
            />
          </Box>
          <RealTimeline />
        </Flex>
        {/* bottom section */}

        {/* footer */}
        <Footer />
      </Box>
    </>
  )
}
