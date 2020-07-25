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
import Icon from '../components/icon'
import Stat from '../components/stat'
import Footer from '../components/footer'
import SlideUp from '../components/slide-up'
import Header from '../components/slack/header'
import SlackEvents from '../components/slack/slack-events'

export default () => (
  <>
    <Meta
      as={Head}
      name="Join our Slack"
      description="Hack Club’s Slack is a community of 10k+ high school hackers around the world. Chat, meet new friends, code together, share your work."
      image="https://cloud-ls9rh3hok.vercel.app/2020-07-25_d2dd4egb1th5k71w4uj0abbfkvvtnc01.jpeg"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Header />
    <Container sx={{ py: [4, 5] }}>
      <Grid
        columns={[2, 3]}
        gap={2}
        sx={{ maxWidth: 'copyPlus', alignItems: 'end' }}
      >
        <Stat
          value="10k+"
          label="total members"
          color="red"
          lg
          sx={{ gridColumn: ['span 2', 'initial'] }}
        />
        <Stat value={6} label="continents" />
        <Stat value="1M+" label="messages/yr" />
      </Grid>
      <Text
        variant="subtitle"
        as="p"
        sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3, mb: [3, 4] }}
      >
        Have a coding question? Looking for project feedback? You’ll find some
        fabulous people to talk to in our global Slack (Discord-style online
        groupchat) with 10,000+ members, active at all hours.
      </Text>
      <Heading
        as="h2"
        variant="title"
        sx={{ mt: [4, 5], color: 'black', maxWidth: 'copyUltra' }}
      >
        Channels for every interest.
      </Heading>
      <Text
        as="p"
        variant="subtitle"
        sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3 }}
      >
        Across 1,000 public channels, find the community for your favorite
        programming language, ask for advice, or just hang out.
      </Text>
      <Grid
        columns={[2, 9, 15]}
        gap={3}
        sx={{
          py: [3, 4],
          h3: { my: 0 },
          '> div': {
            px: [2, 3],
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gridColumn: ['span 1', 'span 3']
          },
          a: {
            position: 'relative'
          },
          h3: {
            variant: 'text.headline',
            color: 'white',
            lineHeight: 'title',
            m: 0,
            '+ p': {
              mt: 2,
              color: 'white',
              opacity: 0.75,
              fontSize: 2,
              lineHeight: 'caption'
            }
          },
          a: {
            position: 'relative'
          },
          svg: {
            position: 'absolute',
            top: 2,
            right: 2,
            fill: 'white'
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
              bg: 'blue',
              backgroundImage: t => t.util.gx('cyan', 'blue')
            }}
          >
            <Icon glyph="external" size={24} />
            <Heading as="h3" variant="headline">
              #ship
            </Heading>
            <Text as="p">Launch your latest projects & get feedback</Text>
          </Card>
        </NextLink>
        <Card
          as="a"
          href="https://scrapbook.hackclub.com/"
          variant="interactive"
          sx={{
            gridColumn: ['span 2', 'span 6'],
            bg: 'dark',
            backgroundImage: t => t.util.gx('yellow', 'orange')
          }}
        >
          <Icon glyph="external" size={24} />
          <Heading as="h3" variant="headline">
            #scrapbook
          </Heading>
          <Text as="p">A daily diary of project updates</Text>
        </Card>
        <Card bg="cyan">
          <h3>#lounge</h3>
        </Card>
        <Card
          sx={{
            backgroundImage:
              'url(https://cloud-dfzi9msk3.vercel.app/2020-07-25_fqxym71bmqjr1d35btawn5q6ph1zt0mk.png)',
            backgroundColor: '#FEC62E',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: '100% auto',
            gridColumn: ['span 2', 'span 3 !important', 'span 4 !important'],
            h3: { opacity: 0 }
          }}
        >
          <h3>#design</h3>
        </Card>
        <Card
          bg="dark"
          sx={{ h3: { color: 'green', textShadow: '0 0 4px currentColor' } }}
        >
          <h3>#code</h3>
        </Card>
        <Card
          bg="red"
          sx={{
            gridColumn: ['span 1 !important', 'span 2 !important'],
            gridRow: 'span 2 !important',
            writingMode: 'tb-rl'
          }}
        >
          <h3>#confessions</h3>
        </Card>
        <Card
          bg="yellow"
          sx={{
            backgroundImage:
              'url(https://assets.hackclub.com/log/2020-06-29_dog.jpg)',
            backgroundSize: '100%',
            backgroundPosition: 'center',
            textShadow: 'text',
            gridColumn: ['span 2', 'span 3 !important']
          }}
        >
          <h3>#dogs</h3>
        </Card>
        <Card bg="purple">
          <h3>#support</h3>
        </Card>
        <Card
          bg="red"
          sx={{
            backgroundImage: ({ colors }) =>
              `linear-gradient(-184deg, ${colors.red} 0%, ${colors.red} 16.6666%, ${colors.orange} 16.6666%, ${colors.orange} 33.333%, ${colors.yellow} 33.333%, ${colors.yellow} 50%, ${colors.green} 50%, ${colors.green} 66.6666%, ${colors.blue} 66.6666%, ${colors.blue} 83.3333%, ${colors.purple} 83.3333%, ${colors.purple} 100%)`
          }}
        >
          <h3>#lgbtq</h3>
        </Card>
        <Card
          sx={{
            bg: 'dark',
            backgroundImage:
              'url(https://cloud-ds22ysgb0.vercel.app/2020-07-25_r6thfxwv1u0c71uw0qk94juv6fxxjygf.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            textShadow: 'text',
            gridColumn: ['span 2 !important', 'span 4 !important']
          }}
        >
          <h3>#photography</h3>
        </Card>
      </Grid>
      <Heading
        as="h2"
        variant="title"
        sx={{ mt: [4, 5], color: 'black', maxWidth: 'copyUltra' }}
      >
        Events on Zoom that don’t suck.
      </Heading>
      <Grid
        columns={[null, 2]}
        gap={3}
        sx={{
          py: [3, 4],
          a: {
            position: 'relative',
            pb: [4, 5]
          },
          h3: {
            variant: 'text.title',
            color: 'white',
            my: 0
          },
          p: {
            color: 'white',
            opacity: 0.875,
            fontSize: [2, 3],
            lineHeight: 'caption',
            mt: 2
          },
          svg: {
            position: 'absolute',
            top: 2,
            right: 2,
            fill: 'white'
          }
        }}
      >
        <NextLink href="/amas" passHref>
          <Card
            as="a"
            variant="interactive"
            sx={{
              bg: '#000',
              backgroundImage:
                'linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.375)), url(https://cloud-qivhneg5o.vercel.app/2020-07-25_hz5hy2bw5x70ped8akzwtrj4hzuex3vw.jpeg)',
              backgroundSize: '100% auto',
              textShadow: 'text'
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>AMAs</h3>
            <p>Every 2 weeks, Zoom with someone remarkable</p>
          </Card>
        </NextLink>
        <NextLink href="/night" passHref>
          <Card
            as="a"
            variant="interactive"
            sx={{
              bg: 'dark',
              backgroundImage:
                'url(https://cloud-58v67k4qk.vercel.app/2020-07-25_pp7t4h8738hdm46r2xxrd8tz3kjc5x0t.png)',
              backgroundPosition: 'bottom center',
              backgroundSize: 'cover',
              h3: {
                textTransform: 'uppercase',
                WebkitTextStroke: 'white',
                WebkitTextStrokeWidth: '2px',
                WebkitTextFillColor: 'transparent',
                filter: `drop-shadow(0 0 1px #50E3C2) drop-shadow(0 0 4px #50E3C2)`
              }
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>Hack Night</h3>
            <p>Weekly live coding & hangout on Zoom</p>
          </Card>
        </NextLink>
        <NextLink href="/minecraft" passHref>
          <Card
            as="a"
            variant="interactive"
            sx={{
              bg: '#759B40',
              backgroundImage:
                'url(https://cloud-mvq23w0hk.vercel.app/2020-07-25_56ygmzej7r9kjrrudmnb0t0cmg0m3gtg.jpeg)',
              backgroundSize: 'cover',
              textShadow: 'text'
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>Minecraft Monday</h3>
            <p>Play on our server, build OSS plugins, compete</p>
          </Card>
        </NextLink>
        <Card
          as="a"
          href="https://events.hackclub.com/"
          variant="interactive"
          sx={{
            bg: 'red',
            background: t =>
              `linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.25)), ${t.colors.red}`,
            p: { variant: 'styles.a', color: 'white' }
          }}
        >
          <Icon glyph="external" size={24} />
          <h3>& more</h3>
          <p>See all upcoming events »</p>
        </Card>
      </Grid>
    </Container>
    <Footer />
  </>
)
