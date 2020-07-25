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
import { keyframes } from '@emotion/core'

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

export default () => (
  <>
    <Meta
      as={Head}
      title="Hack Night"
      description="Every Saturday night, the Hack Club community gathers on Zoom to show off what we’re working on & hang out."
      image="https://cloud-lomgv8fgv.vercel.app/2020-07-24_night.jpeg"
    />
    <Nav color={color} dark />
    <Box
      as="main"
      sx={{
        pt: [5, 6],
        pb: 5,
        bg: 'dark',
        color: 'muted',
        textAlign: 'center',
        backgroundImage:
          'url(https://cloud-8j1jfvspm.vercel.app/2020-07-24_stars.svg)',
        backgroundSize: '512px auto'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          display: 'block',
          background:
            'transparent url(https://cloud-c5tvihg15.vercel.app/2020-07-24_afnkcwju2hfkbrkc1ee0h5a5y72a2r5f.png) repeat top center',
          animation: `${twinkling} 200s linear infinite`
        }}
      ></Box>
      <SlideDown
        variant="layout.narrow"
        duration={768}
        sx={{ position: 'relative' }}
      >
        <Heading
          as="h1"
          variant="ultratitle"
          mt={3}
          sx={{
            color,
            textTransform: 'uppercase',
            WebkitTextStroke: 'white',
            WebkitTextStrokeWidth: '2px',
            WebkitTextFillColor: 'transparent',
            filter: `drop-shadow(0 0 1px ${color}) drop-shadow(0 0 2px ${color}) drop-shadow(0 0 6px ${color})`
          }}
        >
          Hack Night
        </Heading>
        <Text as="p" variant="subtitle">
          Every Saturday, the Hack Club community gathers on Zoom. It’s a chance
          to meet new friends, livestream what you’re hacking on, or just hang
          out on a chill call.
        </Text>
        <Text as="p" variant="subtitle">
          Join in Saturday at 8:30 PM ET on{' '}
          <NextLink href="/slack" passHref>
            <Link sx={{ color, opacity: 0.75 }}>#hack-night</Link>
          </NextLink>
          !
        </Text>
      </SlideDown>
      <Container
        variant="narrow"
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: 512,
          minHeight: 512,
          mx: 'auto',
          mt: [4, 5],
          img: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            maxWidth: '100%'
          }
        }}
      >
        <Image
          src="https://cloud-2oi5yv0i8.vercel.app/2020-07-24_gbetd0kafcxjp2e5hkv4w9u3m40pmmmt.png"
          alt="Moon background"
          width={512}
        />
        <Image
          src="https://cloud-9pj8ga86m.vercel.app/2020-07-24_zdd8ycnkp9q0bbf1fj8a1amjv3zndufz.png"
          alt="Illustration of Orpheus with a moon"
          width={512}
          sx={{
            zIndex: 1,
            animation: `${floating} cubic-bezier(.55,.03,.43,.98) 8s infinite alternate`
          }}
        />
      </Container>
    </Box>
    <Footer dark />
  </>
)
