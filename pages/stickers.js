import { Card, Box, Button, Container, Grid, Heading } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import StickerForm from '../components/stickers/request-form'

const color = '#EC37AD'

export default () => (
  <Box
    as="main"
    sx={{
      bg: 'dark',
      backgroundImage: (theme) => theme.util.gradient('darkless', 'darker'),
      color: 'white',
      minHeight: '100vh',
      pt: [5, null, null, null, 6],
      pb: [3, 4, 5, null, 6],
      textAlign: 'center'
    }}
  >
    <ForceTheme theme="dark" />
    <Nav />
    <Head>
      <title>Stickers – Hack Club</title>
      <Meta
        title="Stickers"
        description="Check out Hack Club’s stickers & order some for yourself."
        image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fstickers.png?v=1588012712143"
      />
    </Head>
    <Card
      variant="translucentDark"
      sx={{ maxWidth: 'copy', mx: 'auto', my: [4, 5] }}
    >
      <Heading
        as="h1"
        variant="title"
        sx={(theme) => ({
          color: 'primary',
          ...theme.util.gradientText(color, 'red'),
          fontSize: [5, 6, 7],
          lineHeight: 'limit',
          mb: [3, 4]
        })}
      >
        Unparalleled stickers.
      </Heading>
      <StickerForm />
    </Card>
  </Box>
)
