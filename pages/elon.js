import {
  Avatar,
  Badge,
  BaseStyles,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text
} from 'theme-ui'
import Head from 'next/head'
import NextLink from 'next/link'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import Icon from '../components/icon'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import ElonCopy from '../components/elon/copy.mdx'

export default () => (
  <>
    <Meta
      as={Head}
      title="Elon Musk is Giving $500K"
      description="We’re thrilled to announce Elon Musk has donated $500k to Hack Club, a global nonprofit network of high school hackers & coding clubs."
      image="https://assets.hackclub.com/log/HC-500k@1080w.png"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        bg: 'rgb(104, 41, 205)',
        backgroundImage: theme => theme.util.gradient('yellow', 'green')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading
          as="h1"
          variant="title"
          sx={{
            fontSize: [5, 6, null, 7],
            span: {
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
          Hack Club “makes me feel <span>much more optimistic</span>{' '}
          about&nbsp;the future.”
        </Heading>
        <Text variant="headline">—Elon Musk</Text>
      </Container>
    </Box>
    <Container
      as={BaseStyles}
      variant="copy"
      sx={{
        py: [4, 5],
        fontSize: [2, 3],
        h1: {
          textAlign: ['left', 'center'],
          color: 'cyan',
          my: 4,
          a: { color: 'inherit' }
        }
      }}
    >
      <Flex
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          div: {
            mt: 0,
            mb: 2,
            bg: 'white',
            color: 'muted',
            border: '1px solid',
            borderColor: 'border',
            bg: 'snow',
            fontSize: 2,
            fontWeight: 'body',
            lineHeight: '36px'
          }
        }}
      >
        <Badge
          variant="pill"
          sx={{
            mr: [2, 3],
            pl: 0,
            pr: 3,
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            src="https://hackclub.com/team/zach.jpg"
            alt="Zach"
            size={36}
            mr={2}
          />
          Zach Latta, founder
        </Badge>
        <Badge variant="pill" px={3}>
          May 15, 2020
        </Badge>
      </Flex>
      <ElonCopy />
    </Container>
    <Box
      as="section"
      sx={{
        bg: 'orange',
        backgroundImage: t => t.util.gradient('yellow', 'orange'),
        color: 'white',
        py: [4, 5]
      }}
    >
      <Grid gap={[3, 4]} columns={[null, 'auto 1fr']} variant="layout.copy">
        <Icon glyph="welcome" size={72} />
        <Box>
          <Heading as="h2" variant="headline" mt={0}>
            Teenager? New here? Welcome!
          </Heading>
          <Text variant="subtitle" sx={{ lineHeight: 'caption', mb: 3 }}>
            Hack Club is a global community of high school makers & student-led
            coding clubs. We’ve got a 24/7 Slack chatroom of 9k teenagers
            learning to code & building amazing projects, & you’ll fit right in.
          </Text>
          <NextLink href="/" passHref>
            <Button bg="cyan" as="a">
              Learn more
            </Button>
          </NextLink>
        </Box>
      </Grid>
    </Box>
    <Footer />
  </>
)
