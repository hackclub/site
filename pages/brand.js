import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Link as A,
  Text
} from 'theme-ui'
import theme from '@hackclub/theme'
import Meta from '@hackclub/meta'
import Icon from '@hackclub/icons'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { startCase } from 'lodash'

export const Logo = ({ name }) => (
  <Card variant="sunken" sx={{ p: [3, 3] }}>
    <Image
      src={`https://assets.hackclub.com/${name}.svg`}
      sx={{ width: '100%', height: 96, mb: 1 }}
      alt={startCase(name)}
    />
    <Text
      as="div"
      variant="subheadline"
      sx={{ fontSize: [2, 3], mt: 2, mb: 2 }}
    >
      {startCase(name)
        .replace('Flag Orpheus', 'Orpheus Flag –')
        .replace('Bw', ' (B/W)')
        .replace('Hcb', 'HCB')}
    </Text>
    <Grid
      columns="repeat(3, 1fr)"
      gap={3}
      sx={{
        alignItems: 'center',
        a: {
          bg: 'elevated',
          color: 'cyan',
          boxShadow: 'none',
          py: 1,
          ':hover,:focus': { bg: 'cyan', color: 'white' }
        }
      }}
    >
      <Button as="a" href={`https://assets.hackclub.com/${name}.svg`}>
        SVG
      </Button>
      <Button as="a" href={`https://assets.hackclub.com/${name}.png`}>
        PNG
      </Button>
      <Button as="a" href={`https://assets.hackclub.com/${name}.pdf`}>
        PDF
      </Button>
    </Grid>
    <Input
      as="textarea"
      rows={2}
      value={`https://assets.hackclub.com/${name}.svg`}
      sx={{ mt: 2, py: 1 }}
      disabled
    />
  </Card>
)

const HTML = ({ file, html }) => (
  <tr>
    <td>
      <img
        src={`https://assets.hackclub.com/${file}.svg`}
        alt={startCase(file)}
      />
    </td>
    <td>
      <Text as="pre" variant="styles.pre">
        {html}
      </Text>
    </td>
  </tr>
)

const ColorSwatch = ({ bg }) => (
  <Card
    sx={{
      bg,
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <Text variant="subheadline" sx={{ my: 0 }}>
      {bg}
    </Text>
    <Text>{theme.colors[bg]}</Text>
  </Card>
)

const Page = ({ css }) => (
  <>
    <Meta
      as={Head}
      title="Branding"
      description="Download Hack Club HQ’s logos and preview our brand fonts & colors."
      image="https://workshop-cards.hackclub.com/Branding.png?theme=dark&fontSize=350px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav color="text" />
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
      <Container variant="copy">
        <Heading as="h1" variant="title" sx={{ color: 'primary', mt: [2, 4] }}>
          Hack Club Brand
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          Download HQ’s logos and preview our brand colors & font.
        </Heading>
      </Container>
    </Box>
    <Container
      sx={{
        py: [3, 4],
        maxWidth: [null, 'copyUltra'],
        h2: { variant: 'text.headline' }
      }}
    >
      <Heading variant="headline">Logos</Heading>
      <Grid columns={[null, 2, 3]} gap={3}>
        {[
          'flag-orpheus-top',
          'flag-orpheus-left',
          'flag-standalone',
          'flag-orpheus-top-bw',
          'flag-orpheus-left-bw',
          'flag-standalone-bw',
          'icon-rounded',
          'icon-square',
          'icon-progress-rounded',
          'icon-progress-square'
        ].map(key => (
          <Logo name={key} key={key} />
        ))}
      </Grid>
      <Button
        as="a"
        href="https://assets.hackclub.com/2020_branding.zip"
        variant="outline"
        mt={3}
        mb={[4, 5]}
      >
        Download all →
      </Button>

      <Heading id="bank" variant="headline">
        HCB Logos
      </Heading>
      <Grid columns={[null, 2, 3]} gap={3}>
        <Logo name="hcb-light" />
        <Logo name="hcb-dark" />
      </Grid>
      <Button
        as="a"
        href="https://hcb.hackclub.com/branding"
        variant="outline"
        mt={3}
        mb={[4, 5]}
      >
        See all HCB logos →
      </Button>

      <Heading id="banners" variant="headline">
        HTML banners
      </Heading>
      <Box
        as="table"
        sx={{
          display: 'block',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
          'td:first-of-type': { pr: 3 },
          img: { maxWidth: 128 * 1.5 },
          pre: { whiteSpace: 'initial' }
        }}
      >
        <Box as="thead" sx={{ display: 'none' }}>
          <tr>
            <th>Preview</th>
            <th>HTML code</th>
          </tr>
        </Box>
        <tbody>
          <HTML
            file="flag-orpheus-top"
            html={`<a href="https://hackclub.com/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="Hack Club"/></a>`}
          />
          <HTML
            file="flag-orpheus-left"
            html={`<a href="https://hackclub.com/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.hackclub.com/flag-orpheus-left.svg" alt="Hack Club"/></a>`}
          />
          <HTML
            file={`banners/${new Date().getFullYear()}`}
            html={`<a href="https://hackclub.com/"><img style="position: absolute; top: 0; left: 10px; border: 0; width: 256px; z-index: 999;" src="https://assets.hackclub.com/banners/${new Date().getFullYear()}.svg" alt="Hack Club"/></a>`}
          />
        </tbody>
      </Box>
      <Button
        as="a"
        href="https://hackclub.com/banner"
        variant="outline"
        mt={3}
        mb={[4, 5]}
      >
        React component →
      </Button>
      <Heading variant="headline">Colors</Heading>
      <Grid columns={[2, 4]} gap={3} mb={[4, 5]}>
        {[
          'red',
          'orange',
          'yellow',
          'green',
          'cyan',
          'blue',
          'purple',
          'muted'
        ].map(key => (
          <ColorSwatch key={key} bg={key} />
        ))}
      </Grid>
      <Heading variant="headline">Fonts</Heading>
      <Text variant="title">Phantom Sans</Text>
      <Text variant="subtitle" sx={{ mb: 3, ml: 2 }}>
        is our brand font.
      </Text>
      <Box as="details" mb={[4, 5]}>
        <Text as="summary" sx={{ fontSize: 2, cursor: 'default' }}>
          Webfont CSS (for HQ sites only)
        </Text>
        <Text as="pre" variant="styles.pre">
          {css}
        </Text>
      </Box>
      <Heading variant="headline">Icons</Heading>
      <Text as="p" variant="subtitle" sx={{ mb: 3 }}>
        We have a custom iconset, published as{' '}
        <A href="https://github.com/hackclub/icons">@hackclub/icons</A>.
      </Text>
      <Flex sx={{ flexWrap: 'wrap', svg: { fill: 'muted', mr: 3, mb: 3 } }}>
        {[
          'clubs',
          'bank-circle',
          'event-code',
          'home',
          'transactions',
          'bolt',
          'photo',
          'emoji'
        ].map(k => (
          <Icon glyph={k} key={k} size={64} />
        ))}
      </Flex>
      <Button
        as="a"
        href="https://icons.hackclub.com"
        sx={{ mt: 3, mb: [4, 5] }}
        variant="outline"
      >
        Explore Hack Club Icons →
      </Button>
      <Heading variant="headline">UI components</Heading>
      <Text as="p" variant="subtitle" sx={{ mb: 3 }}>
        Want to make a Hack Club themed site? Use our pre-made CSS and UI
        components to hackify your site.
      </Text>
      <Button
        as="a"
        href="https://theme.hackclub.com/"
        sx={{ mr: 3, mb: 3 }}
        variant="outline"
      >
        Explore Hack Club Theme →
      </Button>
      <Button
        as="a"
        href="https://github.com/hackclub/theme-starter"
        mb={3}
        mr={3}
        variant="outline"
      >
        Theme Starter on GitHub →
      </Button>
      <Button
        as="a"
        href="https://github.com/hackclub/css"
        sx={{ mb: 3 }}
        variant="outline"
      >
        CSS Theme on GitHub →
      </Button>
    </Container>
    <Footer />
  </>
)

export default Page

export const getStaticProps = () => {
  const fs = require('fs')
  const css = fs.readFileSync(
    './node_modules/@hackclub/theme/fonts/reg-ital-bold.css',
    'utf8'
  )
  return { props: { css } }
}
