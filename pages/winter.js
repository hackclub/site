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
  Link
} from 'theme-ui'
// import Snow from 'resnow'
import Footer from '../components/footer'
import FadeIn from '../components/fade-in'
import { useState } from 'react'
import ForceTheme from '../components/force-theme'

export default function Winter() {
  return (
    <>
      <Box as="main">
        <Nav light />
        <ForceTheme theme="light" />
        {/* hero */}

        {/* 3 sections */}
        <Container>
          <Heading>
            For 10 days, build something together with hundreds of other makers
            around the world.
          </Heading>
        </Container>

        {/* scrolly thing with the project ideas */}

        {/* grid section thing with the requirements, info etc. */}

        {/* timeline */}

        {/* bottom section */}

        {/* footer */}
        <Footer />
      </Box>
    </>
  )
}
