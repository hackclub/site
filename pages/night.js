import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Text
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Link from 'next/link'
import Nav from '../components/nav'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Icon from '../components/icon'
import Footer from '../components/footer'

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
      <SlideDown variant="layout.narrow" duration={768}>
        <Heading
          as="h1"
          variant="ultratitle"
          mt={3}
          sx={{
            color,
            textTransform: 'uppercase',
            // textShadow: '0 0 4px currentColor',
            WebkitTextStroke: 'currentColor',
            WebkitTextStrokeWidth: '2px',
            WebkitTextFillColor: 'transparent'
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
          Join in Saturday at 8:30 PM ET on #hack-night!
        </Text>
      </SlideDown>
      <Image
        src="https://cloud-kdlw29prn.vercel.app/2020-07-24_q5d0042r924xpehetdwha7p9vjkz6r1j.png"
        alt="Illustration of Orpheus with a moon"
        width={512}
        sx={{
          width: '100%',
          maxWidth: 512,
          mt: [4, 5],
          transition: 'transform .25s ease-in-out',
          ':hover': { transform: 'rotate(-6deg)' }
        }}
      />
    </Box>
    <Footer dark />
  </>
)
