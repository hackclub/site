import {
  Avatar,
  Badge,
  BaseStyles,
  Box,
  Button,
<<<<<<< HEAD
  Card,
=======
>>>>>>> 6bc33b9dd2124d06c7f84ca0ae18aa1395f5dbf5
  Container,
  Flex,
  Grid,
  Heading,
<<<<<<< HEAD
  Image,
  Link,
  Text
} from 'theme-ui'
import { styled } from '@emotion/styled'
=======
  Text
} from 'theme-ui'
>>>>>>> 6bc33b9dd2124d06c7f84ca0ae18aa1395f5dbf5
import Head from 'next/head'
import NextLink from 'next/link'
import Meta from '../components/meta'
import Nav from '../components/nav'
import Icon from '../components/icon'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
<<<<<<< HEAD
import Signature from '../components/signature'
import ElonCopy from '../components/elon.mdx'
=======
import ElonCopy from '../components/elon/copy.mdx'
>>>>>>> 6bc33b9dd2124d06c7f84ca0ae18aa1395f5dbf5

export default () => (
  <>
    <Head>
      <Meta
        title="Elon Musk announcement"
        description="We’re thrilled to announce Elon Musk has donated $500k to Hack Club, a global nonprofit network of high school hackers & coding clubs."
<<<<<<< HEAD
        image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2F94239BAB-4660-4387-9A07-8F0585D584E8.jpeg?v=1589920219237"
=======
        image="https://assets.hackclub.com/log/HC-500k@1080w.png"
>>>>>>> 6bc33b9dd2124d06c7f84ca0ae18aa1395f5dbf5
      />
    </Head>
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        bg: 'rgb(104, 41, 205)',
<<<<<<< HEAD
        backgroundImage: theme =>
          theme.util.gradient('rgb(207, 45, 228)', 'rgb(40, 59, 205)')
=======
        backgroundImage: theme => theme.util.gradient('yellow', 'green')
>>>>>>> 6bc33b9dd2124d06c7f84ca0ae18aa1395f5dbf5
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
              WebkitTextStrokeWidth: '2px',
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
          my: 4
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
        <Badge variant="pill" px={3}>May 15, 2020</Badge>
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
