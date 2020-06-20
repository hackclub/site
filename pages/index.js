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
import { Slide } from 'react-reveal'
// import NextLink from 'next/link'
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
          `linear-gradient(${theme.colors.darkless}, ${theme.colors.darker})`,
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
      image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fhackclub.jpg?v=1587740807714"
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
        textAlign: 'center',
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.125),rgba(0,0,0,0.375)), url(https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2F2020-05-16_screenshot.jpeg?v=1589633885855)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        '@media (hover: hover)': { backgroundAttachment: 'fixed' }
      }}
    >
      <Container pt={[3, 4]} pb={[5, 6]}>
        <Announcement
          copy="The Summer of Making has begun!"
          caption="$50k in hardware grants, daily streaks, & more"
          href="https://summer.hackclub.com/"
          iconLeft="event-code"
          iconRight="door-enter"
          color="orange"
        />
        <Heading
          as="h1"
          variant="title"
          sx={{
            mt: 0,
            fontSize: [6, 8, 9],
            color: 'white',
            lineHeight: [0.875, 0.8],
            position: 'relative',
            zIndex: 1,
            textShadow: 'text',
            animation: `${slide} 1s ease-in-out`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
          }}
        >
          Stuck home? Join{' '}
          <Text
            as="span"
            sx={{
              WebkitTextStroke: theme => theme.colors.white,
              WebkitTextStrokeWidth: ['1px', '3px'],
              WebkitTextFillColor: theme => theme.colors.red
            }}
          >
            Hack Club
          </Text>
          .
        </Heading>
      </Container>
      <Box as="section" bg="dark" variant="cards.translucentDark" py={4}>
        <Container sx={{ maxWidth: [null, 'copyPlus'] }}>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              my: 0,
              fontSize: [2, 3],
              color: 'white',
              lineHeight: 'caption',
              a: { color: 'inherit' }
            }}
          >
            Join the global <Text as="strong">Hack Club</Text> high school
            community chatroom, weekly&nbsp;AMAs,{' '}
            <Link href="https://hackclub.com/clubs/">online clubs</Link>
            {' & '}
            <Link href="https://hackathons.hackclub.com/">
              hackathons
            </Link>. <Text as="strong">You’ve found your home.</Text>
          </Text>
        </Container>
      </Box>
    </Box>
    <Box
      as="section"
      sx={{
        bg: 'white',
        color: 'black',
        textAlign: 'center',
        py: [4, 5]
      }}
    >
      <Container sx={{ maxWidth: [null, 'copyPlus', 'copyUltra'] }}>
        <Heading
          as="h2"
          variant="headline"
          sx={{
            fontSize: [4, 4],
            color: 'blue',
            textTransform: 'uppercase',
            letterSpacing: 'headline'
          }}
        >
          During COVID
        </Heading>
        <Heading
          as="h2"
          variant="title"
          sx={{ fontSize: [5, 6], mb: 4, strong: { color: 'red' } }}
        >
          We’re making <strong>Hack Club</strong> the best place on the internet
          to be a teenager into technology.
        </Heading>
        {/* <Button as="a" href="#join" variant="cta">
          Join our Slack
        </Button> */}
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
            <Event month="June" day={25} title="ladyada" />
          </Grid>
        </Box>
        <Slide up>
          <Window title="Weekly Hack Club AMAs">
            <Box
              as="video"
              src="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fchris-cox-ama-2.mov?v=1587697462677"
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
              src="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fworkshops.jpg?v=1587692925751"
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
            $50k of hardware grants, daily streaks & project updates, & weekly
            Zoom events all summer.
          </Heading>
          <CardLink href="https://summer.hackclub.com/">
            Explore Summer of Making
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
          'url(https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fflagship_4-sm.jpg?v=1587739393628)',
          'url(https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fflagship_4.jpg?v=1587739446618)'
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
              `linear-gradient(rgba(255,255,255,0), ${theme.colors.white})`
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
              backgroundImage: theme => `radial-gradient(
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
                'url(https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fnight.jpg?v=1587692925213)',
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
                'url(https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2FImage%20from%20iOS%202.jpg?v=1587695033603)',
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
        backgroundImage: theme => theme.util.gradient('yellow', 'orange'),
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
