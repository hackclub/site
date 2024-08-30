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
import Meta from '@hackclub/meta'
import Head from 'next/head'
import NextLink from 'next/link'
import Nav from '../components/nav'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Icon from '../components/icon'
import Footer from '../components/footer'
import { keyframes } from '@emotion/react'

const floating = keyframes`
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(-20px);
  }
`

// (msw) Credit for this totally goes to https://codepen.io/WebSonick/pen/vjmgu
const twinkling = keyframes`
  from { background-position: 0 0; }
  to { background-position: -10000px 5000px; }
`

const color = '#50E3C2'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Hack Night"
      description="The Hack Club community regularly gathers on Slack Huddles and Zoom calls to show off what we’re working on & hang out."
      image="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/52020-07-25_52g0nw40p2b00dh39mt93xq5ubku6yaj.jpeg"
    />
    <Nav color={color} dark />
    <Box
     
    </Box>
    <Footer dark />
  </>
)

export default Page
