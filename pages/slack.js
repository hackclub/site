import {
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import { keyframes } from '@emotion/core'
import Head from 'next/head'
import NextLink from 'next/link'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import SlideUp from '../components/slide-up'
import SlackEvents from '../components/home/slack-events'
import Announcement from '../components/home/announcement'
import JoinForm from '../components/home/join-form'

export default () => (
  <>
    <Meta
      as={Head}
      name="Join our Slack"
      description="Hack Club’s Slack is a community of 10k+ high school hackers around the world. Chat, meet new friends, code together, share your work."
      image="https://hackclub.com/cards/community.png"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="header"
      sx={{
        bg: 'dark',
        pt: [5, 6],
        display: 'flex',
        flexDirection: 'column',
        backgroundImage:
          'url(https://assets.hackclub.com/log/2020-05-24_meme_team.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        '@media (hover: hover)': { backgroundAttachment: 'fixed' }
      }}
    >
      <Container pt={[3, 4]} pb={[5, 6]}>
        <Announcement
          copy="Already have an account?"
          href="https://hackclub.slack.com"
          iconRight="door-enter"
          color="red"
        />
        <Heading
          as="h1"
          variant="title"
          sx={{
            mt: 0,
            mb: [3, 4, 5],
            fontSize: [6, 7, 8],
            textAlign: 'center',
            color: 'white',
            lineHeight: [0.875, 0.8],
            position: 'relative',
            zIndex: 1,
            textShadow: 'text'
          }}
        >
          Hack Club Slack
        </Heading>
        <SlideUp>
          <JoinForm sx={{ variant: 'cards.translucent' }} />
        </SlideUp>
      </Container>
    </Box>
    <Container sx={{ py: [4, 5] }}>
      <Heading
        as="h2"
        variant="title"
        sx={{ color: 'black', maxWidth: 'copyUltra' }}
      >
        A{' '}
        <Text as="span" color="red">
          24/7
        </Text>{' '}
        high schooler community. Get coding help, share projects, meet your
        closest friends.
      </Heading>
      <Text as="p" sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3 }}>
        Have a coding question? Looking for project feedback? You’ll find some
        fabulous people to talk to in our global Slack (Discord-style online
        groupchat) with 10,000+ members, active at all hours.
      </Text>
      <Grid
        columns={[2, 15]}
        gap={3}
        sx={{
          py: [3, 4],
          h3: { my: 0 },
          '> div': {
            px: [2, 3],
            py: [4, 4],
            display: 'flex',
            flexDirection: 'column',
            gridColumn: ['span 1', 'span 3'],
            position: 'relative'
          },
          h3: {
            variant: 'text.headline',
            color: 'white',
            lineHeight: 'title',
            my: 0,
            '+ p': {
              color: 'white',
              opacity: 0.75,
              fontSize: 2,
              mt: 1,
              lineHeight: 'caption'
            }
          }
        }}
      >
        <Box
          as="aside"
          sx={{
            gridRow: [null, 'span 2'],
            gridColumn: ['span 2', 'span 3'],
            maxHeight: '100%',
            overflow: 'hidden'
          }}
        >
          <Heading
            as="h2"
            variant="subheadline"
            sx={{
              mt: 0,
              color: 'red',
              textTransform: 'uppercase',
              letterSpacing: 'headline'
            }}
          >
            Live from our&nbsp;Slack
          </Heading>
          <SlackEvents />
        </Box>
        <NextLink href="/ship" passHref>
          <Card
            as="a"
            variant="interactive"
            sx={{
              gridColumn: ['span 2', 'span 6'],
              textDecoration: 'none',
              bg: 'blue',
              backgroundImage: t => t.util.gx('cyan', 'blue')
            }}
          >
            <Heading as="h3" variant="headline">
              #ship
            </Heading>
            <Text as="p">Share your latest projects & get feedback</Text>
          </Card>
        </NextLink>
        <Card
          as="a"
          variant="interactive"
          href="https://hackclub.com/night/"
          sx={{
            gridColumn: ['span 2', 'span 6'],
            textDecoration: 'none',
            bg: 'dark',
            backgroundImage:
              'url(https://assets.hackclub.com/log/2020-06-29_night.jpg)',
            backgroundPosition: 'top center',
            backgroundSize: 'cover',
            p: { color: 'smoke', fontSize: 2, mt: 1, lineHeight: 'caption' }
          }}
        >
          <Heading as="h3" variant="headline">
            #hack-night
          </Heading>
          <Text as="p">Biweekly mini-hackathon & video call hangout</Text>
        </Card>
        <Card bg="cyan">
          <h3>#lounge</h3>
        </Card>
        <Card bg="orange">
          <h3>#support</h3>
        </Card>
        <Card bg="blue">
          <h3>#code</h3>
        </Card>
        <Card
          bg="red"
          sx={{
            backgroundImage: ({ colors }) =>
              `linear-gradient(${colors.red} 0%, ${colors.red} 16.6666%, ${colors.orange} 16.6666%, ${colors.orange} 33.333%, ${colors.yellow} 33.333%, ${colors.yellow} 50%, ${colors.green} 50%, ${colors.green} 66.6666%, ${colors.blue} 66.6666%, ${colors.blue} 83.3333%, #8067C3 83.3333%, #8067C3 100%)`
          }}
        >
          <h3>#lgbtq</h3>
        </Card>
        <NextLink href="/minecraft" passHref>
          <Card
            as="a"
            variant="interactive"
            sx={{
              gridColumn: ['span 2', 'span 6'],
              textDecoration: 'none',
              bg: '#759B40',
              backgroundImage: t => t.util.gx('#759B40', '#4F6728')
            }}
          >
            <Heading as="h3" variant="headline">
              #minecraft
            </Heading>
            <Text as="p">Play on our server, build OSS plugins, compete</Text>
          </Card>
        </NextLink>
        <Card bg="dark">
          <h3>
            #photo-
            <br />
            graphy
          </h3>
        </Card>
        <Card
          bg="yellow"
          sx={{
            backgroundImage:
              'url(https://assets.hackclub.com/log/2020-06-29_dog.jpg)',
            backgroundSize: '100%',
            backgroundPosition: 'center',
            textShadow: 'text'
          }}
        >
          <h3>#dogs</h3>
        </Card>
        <Card bg="red">
          <h3>#design</h3>
        </Card>
      </Grid>
    </Container>
    <Footer />
  </>
)
