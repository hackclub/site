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
      image="https://hc-cdn.hel1.your-objectstorage.com/s/v3/36ea58701b721b4c41905a5d205eccee0b5a3652_99_94f2c77dd790183a8c40f3982984684fef69b3d2_52020-07-25_52g0nw40p2b00dh39mt93xq5ubku6yaj.webp"
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
          'url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/36756635990756249550afb6396a2b6c0bdcd228_62020-07-24_stars.svg)',
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
            'transparent url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/98331702052e26f52ce3bb80e8c5d17aa74f65c6_72020-07-24_afnkcwju2hfkbrkc1ee0h5a5y72a2r5f.png) repeat top center',
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
          The Hack Club community regularly gathers on Zoom or Huddles. It’s a
          chance to meet new friends, livestream what you’re hacking on, or just
          hang out on a chill call.
        </Text>
        <Text as="p" variant="subtitle">
          Hack nights are hosted regularly by Hack Clubbers. Come join or start
          an impromptu Hack session on{' '}
          <NextLink href="/slack" passHref legacyBehavior>
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
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/b04f13bc2040549512b98d2a8eec8978eacf700f_102_3a2481ce5cbdb9089a73ff4d27ecd94cd04d6eb2_82020-07-24_gbetd0kafcxjp2e5hkv4w9u3m40pmmmt.webp"
          alt="Moon background"
          width={512}
        />
        <Image
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/3c151f7f6d7e81737c8ecedbe43aba53881428f8_103_984a928a1354bcaaa9141267df31a8a5cc05627c_92020-07-24_zdd8ycnkp9q0bbf1fj8a1amjv3zndufz.webp"
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

export default Page
