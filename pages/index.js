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
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
// import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import SlackEvents from '../components/home/slack-events'
import JoinForm from '../components/home/join-form'

const fade = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const slide = keyframes({
  from: { transform: 'translateY(-200%)' },
  to: { transform: 'translateY(0)' }
})

const CardLink = (props) => (
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

const Event = ({ title, month, day }) => (
  <Grid columns="auto 1fr" gap={3} sx={{ alignItems: 'center' }}>
    <Box
      sx={{
        borderRadius: 'default',
        lineHeight: 'caption',
        textAlign: 'center',
        border: '3px solid',
        borderColor: 'primary',
        width: 60
      }}
    >
      <Box
        sx={{
          bg: 'primary',
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

const Window = ({ title, children, ...props }) => (
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
        backgroundImage: (theme) =>
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

const grad = (theme, from, to) => `radial-gradient(
  ellipse farthest-corner at top left, ${theme.colors[from] || from}, ${
  theme.colors[to] || to
})`

export default () => (
  <>
    <Head>
      <Meta
        description="Hack Club is a global nonprofit network of high school makers & student-led coding clubs where young people build the agency, the network, & the technical talent to think big & do big things in the world."
        image="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fhackclub.jpg?v=1587740807714"
      />
    </Head>
    {/* <ForceTheme theme="light" /> */}
    <Nav />
    <Box
      as="header"
      sx={{
        bg: 'dark',
        py: [5, 6],
        position: 'relative',
        overflow: 'hidden',
        '@media (prefers-reduced-motion: reduce)': {
          background: (theme) =>
            `${theme.colors.dark} url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODYyRjhERDU2N0YyMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODYyRjhERDQ2N0YyMTFFNjg2MzZDQjkwNkQ4MjgwMEIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3NjcyQkQ3QTY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3NjcyQkQ3QjY3QzUxMUU2QjJCQ0UyNDA4MTAwMjE3MSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvCS01IAAABMSURBVHjaYmR4/5+BFPBfAMFm/MBgx8RAGWCn1AAmSg34Q6kBDKMGMDCwICeMIemF/5QawEipAWwUhwEjMDvbAWlWkvVBwu8vQIABAEwBCph8U6c0AAAAAElFTkSuQmCC) repeat top left`
        }
      }}
    >
      <Box
        as="video"
        src="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fv3gif-2.mp4?v=1587697528651"
        aria-hidden="true"
        muted
        autoPlay
        playsInline
        loop
        sx={{
          position: 'absolute',
          width: '100%',
          right: 0,
          bottom: 0,
          minWidth: '100%',
          minHeight: '100%',
          objectPosition: 'center',
          objectFit: 'cover',
          animation: `${fade} 6s ease-out`,
          animationDelay: '1.5s',
          '@media (prefers-reduced-motion: reduce)': { display: 'none' }
        }}
      />
      <Container sx={{ textAlign: 'center' }}>
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
            textShadow: (theme) => `0 0 6px ${theme.colors.red}`,
            animation: `${slide} 0.5s ease-in-out`,
            '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
          }}
        >
          COVID has changed{' '}
          <Text
            as="span"
            sx={{
              WebkitTextStroke: (theme) => theme.colors.red,
              WebkitTextStrokeWidth: ['1px', '3px'],
              WebkitTextFillColor: (theme) => theme.colors.white
            }}
          >
            everything
          </Text>
          .
        </Heading>
      </Container>
    </Box>
    <Box as="section" bg="dark" py={[4, 5]}>
      <Container
        sx={{ textAlign: 'center', maxWidth: [null, 'copyPlus', 'copyUltra'] }}
      >
        <Text
          as="p"
          variant="subtitle"
          sx={{
            fontSize: [3, 28],
            color: 'white',
            mx: 'auto',
            maxWidth: 'copyPlus',
            lineHeight: 'caption',
            a: { color: 'inherit' },
            strong: { color: 'red' }
          }}
        >
          <strong>HACK CLUB</strong> used to be a network of{' '}
          <Link href="https://hackclub.com/clubs/">
            high school coding clubs
          </Link>
          {' & '}
          <Link href="https://hackathons.hackclub.com/">
            in-person hackathons
          </Link>
          . Someday, we’ll get back to that.
        </Text>
      </Container>
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
          We’re trying to make <strong>Hack Club</strong> the best place on the
          internet to be a teenager into technology.
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
          <CardLink href="https://youtu.be/1pn8h2q3Cas">
            Watch a recent AMA
          </CardLink>
          <Grid columns={[2, 'initial']} gap={3} mt={4}>
            <Event month="April" day={24} title="Elon Musk" />
            <Event month="April" day={30} title="Jack Conte" />
            <Event month="May" day={7} title="Simone Giertz" />
            <Event month="May" day={14} title="Guillermo Rauch" />
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
            Student-run workshops every week on coding, cooking, drawing,
            everything.
          </Heading>
          <CardLink href="https://youtu.be/Xy_owni1ZVk">
            Watch a recent live-code
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
                  WebkitTextFillColor: (theme) => theme.colors.white,
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
            backgroundImage: (theme) =>
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
            online groupchat) with 8,000+ members, active at all hours.
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
              backgroundImage: (theme) => `radial-gradient(
    ellipse farthest-corner at top left, ${theme.colors.cyan}, ${theme.colors.blue})`
            }}
          >
            <Heading as="h3" variant="headline">
              #ship
            </Heading>
            <Text as="p" sx={{ color: 'smoke', fontSize: 2, mt: 1 }}>
              Share your latest projects & get feedback
            </Text>
          </Card>
          <Card
            as="aside"
            sx={{
              gridColumn: ['span 2', 'span 6'],
              bg: 'dark',
              backgroundImage:
                'url(https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2Fnight.jpg?v=1587692925213)',
              backgroundPosition: 'top center',
              backgroundSize: 'cover'
            }}
          >
            <Heading as="h3" variant="headline">
              #hack-night
            </Heading>
            <Text as="p" sx={{ color: 'smoke', fontSize: 2, mt: 1 }}>
              Biweekly mini-hackathon & video call hangout
            </Text>
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
      as="footer"
      sx={{
        bg: 'cyan',
        backgroundImage: (theme) => grad(theme, 'yellow', 'orange'),
        color: 'white',
        py: [5, 6]
      }}
    >
      <Container
        sx={{ textAlign: 'center', maxWidth: [null, 'copyPlus', 'copyUltra'] }}
      >
        <Heading as="h2" variant="title" sx={{ fontSize: [5, 6, 7], mb: 3 }}>
          Join our Slack
        </Heading>
        <Text
          as="p"
          variant="subtitle"
          sx={{
            fontSize: 3,
            opacity: 0.875,
            maxWidth: 'copy',
            mx: 'auto',
            mb: 4
          }}
        >
          Due to high demand from the Elon Musk AMA, we’re temporarily pausing
          Slack signups. But we still want to meet you! Add yourself to the
          signup queue—we’ll be adding everyone over the next week.
        </Text>
        <JoinForm />
      </Container>
    </Box>
    <Footer />
  </>
)
