import {
  Card,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import StickerForm from '../components/stickers/request-form'

const color = '#EC37AD'

const StickersPage = () => [
  <Box
    as="main"
    key="main"
    sx={{
      bg: 'dark',
      backgroundImage: theme => theme.util.gx('darkless', 'darker'),
      color: 'white',
      minHeight: '100vh',
      pt: [5, null, null, null, 6],
      pb: [3, 4, 5, null, 6],
      textAlign: 'center'
    }}
  >
    <ForceTheme theme="dark" />
    <Nav dark />
    <Meta
      as={Head}
      title="Stickers"
      description="Check out Hack Club’s stickers & order some for yourself."
      image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fstickers.png?v=1588012712143"
    />
    <Card
      sx={{
        variant: 'translucentDark',
        maxWidth: 'copy',
        mx: 'auto',
        my: [4, 5]
      }}
    >
      <Flex
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          img: { mr: 4, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }
        }}
      >
        <Image
          src="https://hackclub.com/stickers/mac.svg"
          alt="Macintosh sticker"
          sx={{
            transform: 'rotate(-12deg)',
            width: '4.5rem',
            height: '6rem'
          }}
        />
        <Image
          src="https://hackclub.com/stickers/progress.svg"
          alt="Pride sticker"
          sx={{
            transform: 'rotate(3deg)',
            width: ['4rem', '6rem'],
            height: ['4rem', '6rem'],
            borderRadius: 'extra'
          }}
        />
        <Image
          src="https://hackclub.com/stickers/enjoy.svg"
          alt="Enjoy Hack Club Coca-Cola sticker"
          sx={{
            transform: 'rotate(-12deg)',
            width: ['6rem', '7.5rem'],
            height: ['4rem', '5rem']
          }}
        />
      </Flex>
      <Heading
        as="h1"
        variant="ultratitle"
        sx={theme => ({
          color: 'primary',
          ...theme.util.gxText(color, 'red'),
          my: [3, 4]
        })}
      >
        Unparalleled stickers.
      </Heading>
      <Heading as="h2" variant="eyebrow" sx={{ my: 3 }}>
        Request a free envelope
      </Heading>
      <StickerForm />
    </Card>
  </Box>,
  <Footer dark key="footer" />
]

export default StickersPage
