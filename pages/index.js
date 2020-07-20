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
import { keyframes } from '@emotion/core'
import { Slide } from 'react-reveal'
import NextLink from 'next/link'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Announcement from '../components/home/announcement'
import SlackEvents from '../components/home/slack-events'
import JoinForm from '../components/home/join-form'
// import { timeSince } from '../lib/dates'

const slide = keyframes({
  from: { transform: 'translateY(-200%)' },
  to: { transform: 'translateY(0)' }
})

const CardLink = props => (
  <Link
    sx={{
      mt: 3,
      display: 'block',
      fontSize: 3,
      color: 'red',
      lineHeight: 'subheading',
      textDecoration: 'underline',
      textDecorationStyle: 'wavy',
      ':after': { content: '"›"', pl: 1 },
      ...props.sx
    }}
    {...props}
  />
)

const Event = ({ title, month, day, past = false }) => (
  <Grid
    as="a"
    href={`https://events.hackclub.com/ama-with-${title
      .toLowerCase()
      .replace(' ', '-')}`}
    target="_blank"
    columns="auto 1fr"
    gap={3}
    sx={{ alignItems: 'center', textDecoration: 'none', color: 'inherit' }}
  >
    <Box
      sx={{
        borderRadius: 'default',
        lineHeight: 'caption',
        textAlign: 'center',
        border: '3px solid',
        borderColor: past ? 'muted' : 'primary',
        width: 60
      }}
    >
      <Box
        sx={{
          bg: past ? 'muted' : 'primary',
          color: 'white',
          letterSpacing: 'headline',
          fontWeight: 'bold',
          fontSize: 0
        }}
      >
        {month}
      </Box>
      <Box sx={{ color: 'white', fontSize: [2, 3] }}>{day}</Box>
    </Box>
    <Text as="p" variant="subheadline" sx={{ my: 0 }}>
      {title}
    </Text>
  </Grid>
)

const Window = ({ title, children }) => (
  <Card
    sx={{
      p: [0, 0],
      boxShadow: 'elevated',
      lineHeight: 0,
      border: '1px solid',
      borderColor: 'black'
    }}
  >
    <Box
      sx={{
        bg: 'muted',
        color: 'smoke',
        backgroundImage: theme =>
          `linear-gx(${theme.colors.darkless}, ${theme.colors.darker})`,
        p: 2,
        lineHeight: 'body',
        textAlign: 'center'
      }}
    >
      {title}
    </Box>
    {children}
  </Card>
)

export default () => (
  <>
    <Meta
      as={Head}
      description="Hack Club is a global nonprofit network of high school makers & student-led coding clubs where young people build the agency, the network, & the technical talent to think big & do big things in the world."
      image="https://assets.hackclub.com/log/2020-06-26_hackclub-card.jpg"
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
          'radial-gx(ellipse farthest-corner at top left, rgba(255, 98, 220, 0.66), rgba(255, 91, 0, 0.66)), url(https://assets.hackclub.com/log/2020-06-29_flagship_1.jpg)',
        // 'radial-gx(ellipse farthest-corner at top left, rgba(0, 164, 255, 0.66), rgba(194, 16, 255, 0.66)), url(https://assets.hackclub.com/log/2020-06-29_flagship_1.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        '@media (hover: hover)': { backgroundAttachment: 'fixed' }
      }}
    >
      <Container pt={[3, 4]} pb={[4, 5]}>
        {/*
        <Announcement
          copy="The Summer of Making has begun!"
          caption="$50k in hardware grants, daily streaks, & more"
          href="https://summer.hackclub.com/"
          iconLeft="event-code"
          iconRight="door-enter"
          color="orange"
        />
        */}
        <Heading
          as="h1"
          variant="title"
          sx={{
            mt: 0,
            fontSize: [6, 7, 8],
            color: 'white',
            lineHeight: 0.875,
            mb: [3, 4],
            zIndex: 1,
            textShadow: 'text',
            animation: `${slide} 1s ease-in-out`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
          }}
        >
          Welcome to the Summer of Making.
        </Heading>
        <Text
          as="p"
          variant="headline"
          sx={{
            maxWidth: 'copyPlus',
            color: 'white',
            textShadow: 'text',
            mb: 4
          }}
        >
          $50,000 in hardware grants from GitHub, a daily streak system, a Slack
          community with 10k+ hackers, & weekly online events. Open to teenagers
          worldwide.
        </Text>
        <Button
          as="a"
          variant="cta"
          href="https://summer.hackclub.com"
          sx={{
            backgroundImage:
              'radial-gx(at left top, rgb(0, 255, 255), rgb(0, 164, 255))'
          }}
        >
          Join the Summer
        </Button>
      </Container>
      {/*
      <Box as="section" bg="dark" variant="cards.translucentDark" py={4}>
        <Container>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              maxWidth: 'copyPlus',
              my: 0,
              fontSize: [2, 3],
              color: 'white',
              lineHeight: 'caption',
              a: { color: 'inherit' }
            }}
          >
            Join 10k high school makers in the{' '}
            <NextLink href="/slack" passHref>
              <Link sx={{ fontWeight: 'bold' }}>Hack Club Slack</Link>
            </NextLink>
            , our weekly&nbsp;AMAs,{' '}
            <Link href="https://hackclub.com/clubs/">online clubs</Link>
            {' & '}
            <Link href="https://hackathons.hackclub.com/">
              hackathons
            </Link>. We can’t wait to meet you.
          </Text>
        </Container>
      </Box>
          */}
    </Box>
    <Box as="section" sx={{ bg: 'white', color: 'black' }}>
      <Container
        sx={{
          py: [4, 5],
          p: {
            letterSpacing: 'headline',
            lineHeight: 'caption',
            fontSize: [3, 28],
            maxWidth: [null, 'copyUltra'],
            mb: 3,
            strong: { color: 'red' },
            a: { color: 'rgb(0, 164, 255)' }
          }
        }}
      >
        <Heading
          as="h2"
          variant="headline"
          sx={{
            fontSize: [4, 4],
            color: 'red',
            textTransform: 'uppercase',
            letterSpacing: 'headline',
            mt: 0
          }}
        >
          Hack Club
        </Heading>
        {/*
        <Heading
          as="h2"
          variant="title"
          sx={{
            fontSize: [5, 6],
            maxWidth: [null, 'copyPlus', 'copyUltra'],
            mb: 4,
            strong: { color: 'red' }
          }}
        >
          We’re making <strong>Hack Club</strong> the best place on the internet
          to be a teenager into technology.
        </Heading>
        */}
        <Text as="p">
          We are thousands of high school hackers around the world. We build
          games, hardware, apps, organize hackathons, run our school coding
          clubs.
        </Text>
        <Text as="p">
          This summer, we’re on Zoom calls & Slack channels,{' '}
          <NextLink href="/ship" passHref>
            <Link>shipping</Link>
          </NextLink>{' '}
          projects,{' '}
          <Link href="https://scrapbook.hackclub.com/">
            sharing&nbsp;daily updates
          </Link>
          , trying to make wonderful things in the world.
        </Text>
      </Container>
    </Box>
    <Box as="section" sx={{ bg: 'dark', color: 'white', py: [4, 5, 6] }}>
      <Grid
        variant="layout.container"
        columns={[null, '1fr 2fr']}
        gap={[4, 5]}
        sx={{ alignItems: 'end', pb: [4, 5] }}
      >
        <Box as="aside">
          <Heading as="h2" variant="headline">
            <Text as="span" variant="title">
              Weekly&nbsp;AMAs
            </Text>{' '}
            with the most interesting people in tech.
          </Heading>
          <CardLink href="https://www.youtube.com/watch?v=riru9OzScwk&t=545s">
            Watch our Elon Musk AMA
          </CardLink>
          <Grid columns={[2, 'initial']} gap={3} mt={4}>
            <Event month="May" day={14} title="Guillermo Rauch" past />
            <Event month="June" day={4} title="Audrey Tang" past />
            <Event month="June" day={11} title="Patrick Collison" past />
            <Event month="June" day={25} title="ladyada" past />
          </Grid>
        </Box>
        <Slide up>
          <Window title="Weekly Hack Club AMAs">
            <Box
              as="video"
              src="https://assets.hackclub.com/log/2020-06-29_ama-chris.mov"
              muted
              autoPlay
              playsInline
              loop
              sx={{
                width: '100%',
                borderBottomLeftRadius: 'default',
                borderBottomRightRadius: 'default'
              }}
            >
              Clip from our Chris Cox AMA
            </Box>
          </Window>
        </Slide>
      </Grid>
      <Grid
        variant="layout.container"
        columns={[null, '3fr 2fr 2fr']}
        gap={[4, 5]}
        sx={{ alignItems: 'center' }}
      >
        <Slide up>
          <Window title="Student Workshops">
            <Image
              src="https://assets.hackclub.com/log/2020-06-29_workshops.jpg"
              alt="Students going wild on a Zoom call"
              sx={{
                width: '100%',
                borderBottomLeftRadius: 'default',
                borderBottomRightRadius: 'default'
              }}
            />
          </Window>
        </Slide>
        <Box sx={{ gridRow: ['1', 'initial'] }}>
          <Heading as="h3" variant="headline" my={0}>
            Looking to start a club or nonprofit?
          </Heading>
          <CardLink href="https://hackclub.com/bank/">
            Check out Hack Club Bank
          </CardLink>
        </Box>
        <div>
          <Heading as="h3" variant="headline" my={0}>
            Sharpen your coding skills in online hackathons like the{' '}
            <Link
              href="https://covidglobalhackathon.com"
              sx={{
                color: '#0f65ff',
                textDecoration: 'none',
                ':focus,:hover': {
                  WebkitTextStroke: 'currentColor',
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextFillColor: theme => theme.colors.white,
                  textShadow: '0 0 4px currentColor'
                }
              }}
            >
              COVID-19 Global Hackathon
            </Link>
            .
          </Heading>
          <CardLink href="https://hackathons.hackclub.com/">
            See upcoming hackathons
          </CardLink>
        </div>
      </Grid>
    </Box>
    <Box
      as="section"
      sx={{
        backgroundImage: [
          'url(https://assets.hackclub.com/log/2020-06-29_flagship_4-sm.jpg)',
          'url(https://assets.hackclub.com/log/2020-06-29_flagship_4.jpg)'
        ],
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        '@media (hover: hover)': { backgroundAttachment: 'fixed' },
        pt: [7, 8]
      }}
    >
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'rgba(255,255,255,0.875)',
          '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)': {
            backgroundColor: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)'
          },
          ':after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            display: 'block',
            height: 256,
            backgroundImage: theme =>
              `linear-gx(rgba(255,255,255,0), ${theme.colors.white})`
          },
          py: [4, 5]
        }}
      >
        <Container sx={{ position: 'relative', zIndex: 2 }}>
          <Heading
            as="h2"
            variant="title"
            sx={{
              color: 'black',
              maxWidth: 'copyUltra'
            }}
          >
            A{' '}
            <Text as="span" color="red">
              24/7
            </Text>{' '}
            high schooler community. Get coding help, share projects, meet your
            closest friends.
          </Heading>
          <Text as="p" sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3 }}>
            Have a coding question? Looking for project feedback? You’ll find
            some fabulous people to talk to in our global Slack (Discord-style
            online groupchat) with 9,000+ members, active at all hours.
          </Text>
        </Container>
      </Box>
    </Box>
    <Box
      as="section"
      sx={{ bg: 'white', color: 'black', position: 'relative', pb: [4, 5] }}
    >
      <Container>
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
              my: 0
            }
          }}
        >
          <Box
            as="aside"
            sx={{
              gridRow: [null, 'span 2'],
              gridColumn: ['span 2', 'span 3']
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
          <Card
            as="aside"
            sx={{
              gridColumn: ['span 2', 'span 6'],
              bg: 'blue',
              backgroundImage: theme => `radial-gx(
    ellipse farthest-corner at top left, ${theme.colors.cyan}, ${theme.colors.blue})`,
              p: { color: 'smoke', fontSize: 2, mt: 1, lineHeight: 'caption' }
            }}
          >
            <Heading as="h3" variant="headline">
              #ship
            </Heading>
            <Text as="p">Share your latest projects & get feedback</Text>
          </Card>
          <Card
            as="aside"
            sx={{
              gridColumn: ['span 2', 'span 6'],
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
                `linear-gx(${colors.red} 0%, ${colors.red} 16.6666%, ${colors.orange} 16.6666%, ${colors.orange} 33.333%, ${colors.yellow} 33.333%, ${colors.yellow} 50%, ${colors.green} 50%, ${colors.green} 66.6666%, ${colors.blue} 66.6666%, ${colors.blue} 83.3333%, #8067C3 83.3333%, #8067C3 100%)`
            }}
          >
            <h3>#lgbtq</h3>
          </Card>
          <Card bg="dark">
            <h3>#gamedev</h3>
          </Card>
          <Card bg="red">
            <h3>#design</h3>
          </Card>
          <Card bg="green">
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
          <Card bg="green">
            <h3>#music</h3>
          </Card>
        </Grid>
      </Container>
    </Box>
    <Box
      as="section"
      id="slack"
      sx={{
        bg: 'cyan',
        backgroundImage: theme => theme.util.gx('yellow', 'orange'),
        color: 'white',
        py: 5
      }}
    >
      <Container
        sx={{ textAlign: 'center', maxWidth: [null, 'copyPlus', 'copyUltra'] }}
      >
        <Heading as="h2" variant="title" sx={{ fontSize: [5, 6, 7], mb: 4 }}>
          Join our Slack
        </Heading>
        <JoinForm sx={{ bg: 'rgba(255,255,255,0.75)' }} />
      </Container>
    </Box>
    <Footer />
  </>
)
