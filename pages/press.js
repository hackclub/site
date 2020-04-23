import { BaseStyles, Box, Button, Container, Grid, Heading } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Flag from '../components/flag'
import ColorSwitcher from '../components/color-switcher'
import Press from '../components/press.mdx'
import { Logo } from './brand'

export default () => (
  <>
    <Box
      as="header"
      sx={{
        bg: 'sheet',
        color: 'text',
        pt: [5, null, null, null, 6],
        pb: [3, 4, 5, null, 6],
        textAlign: 'center'
      }}
    >
      <Flag />
      <ColorSwitcher />
      <Head>
        <title>Press – Hack Club</title>
        <Meta
          title="Press"
          description="Hack Club’s resources for press."
          image="https://workshop-cards.hackclub.com/Press.png?fontSize=350px&brand=HQ"
        />
      </Head>
      <Container variant="copy">
        <Heading as="h1" variant="title" sx={{ color: 'primary', mt: [2, 4] }}>
          Press
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          Hack Club’s resources for press.
        </Heading>
      </Container>
    </Box>
    <Container
      variant="main"
      sx={{
        py: [3, 4],
        maxWidth: [null, 'copyUltra'],
        h2: { variant: 'text.headline' }
      }}
    >
      <Heading id="banners" variant="headline">
        About
      </Heading>
      <Box
        as={BaseStyles}
        sx={{
          mx: 0,
          px: 0,
          fontSize: 2,
          '> p': { maxWidth: 'copy' },
          h2: { variant: 'text.headline', mt: 4 }
        }}
      >
        <Press />
      </Box>
      <Button
        as="a"
        href="https://drive.google.com/open?id=1FgPJv68QzLVvCdFFTls0Exu0JO2npIhC"
        variant="outline"
        mt={4}
        mb={4}
      >
        Download all →
      </Button>
      <Heading variant="headline">Logos</Heading>
      <Grid columns={[null, 2, 3]} gap={3} sx={{ input: { display: 'none' } }}>
        {[
          'flag-standalone',
          'flag-orpheus-top',
          'flag-orpheus-left',
          'flag-standalone-bw',
          // 'flag-orpheus-top-bw',
          // 'flag-orpheus-left-bw',
          'icon-rounded',
          'icon-square'
        ].map((key) => (
          <Logo name={key} key={key} />
        ))}
      </Grid>
      <Button
        as="a"
        href="https://assets.hackclub.com/2020_branding.zip"
        variant="outline"
        mt={3}
        mb={4}
      >
        Download all →
      </Button>
    </Container>
  </>
)
