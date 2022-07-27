import {
  Box,
  Button,
  Heading,
  Link,
  Text,
  Container,
  Badge,
  Card
} from 'theme-ui'
import Fade from 'react-reveal/Fade'
import ScrollHint from '../scroll-hint'
import Image from 'next/image'
import hero from '../../public/hackathons/mahacks.jpeg'

export default function Landing2({ showButton, eventsCount }) {
  return (
    <>
      <Slide>
        <Vignette />

        <Box
          sx={{
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            bottom: 5,
            mx: 'auto',
            width: '100%'
          }}
        >
          <Box
            sx={{
              zIndex: '100',
              paddingTop: '96px'
            }}
          >
            <Fade duration={625} bottom>
              <Card
                variant="translucent"
                sx={{
                  variant: 'layout.container',
                  maxWidth: [null, 700, 1200],
                  borderRadius: 'extra',
                  p: [3, 4],
                  position: 'relative',
                  color: 'black'
                }}
              >
                {/* <Button
                  as="a"
                  variant="cta"
                  href="https://hack.af/som-stickers"
                  sx={{
                    backgroundImage: t => t.util.gx('yellow', 'pink'),
                    position: 'absolute',
                    right: [0, -3],
                    top: -3,
                    transform: [
                      'translateY(-50%) rotate(8deg)',
                      'translateX(15%) rotate(12deg)'
                    ]
                  }}
                >
                  Get stickers
                </Button> */}
                <Text as="p" variant="headline" sx={{ mt: 0, color: 'muted' }}>
                  The last IRL hackathon was 2 years ago. This semester, we're
                  helping to kickstart
                </Text>
                <Heading
                  as="h2"
                  variant="title"
                  sx={{
                    color: 'black',
                    span: { color: 'white', display: 'block' }
                  }}
                >
                  A renaissance of IRL{' '}
                  <Text
                    as="span"
                    variant="ultratitle"
                    sx={{
                      WebkitTextStroke: 'currentColor',
                      WebkitTextStrokeWidth: ['2px', '3px'],
                      WebkitTextFillColor: '#33D6A6'
                    }}
                  >
                    high&nbsp;school&nbsp;hackathons.
                  </Text>
                </Heading>
                <Text as="p" variant="subtitle" mt={3}>
                  Hack Club is providing the support and resources to help you
                  run an amazing event. We're distributing $10k in grants &
                  providing a space for hackathon organizers to Slack c.
                </Text>
              </Card>
              {/* <Container
                variant="container"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <Heading
                  variant="ultratitle"
                  sx={{
                    marginBottom: 4,
                    textShadow: '0 0 16px rgba(0, 0, 0, 1)',
                    letterSpacing: '-0.02em',
                    '@media screen and (max-height: 600px)': {
                      lineHeight: 0.875
                    },
                    '@media screen and (min-height: 610px)': {
                      lineHeight: 1.125
                    }
                  }}
                >
                  <Underline>Become a 501(c)(3) nonprofit</Underline> with
                  Hack&nbsp;Club&nbsp;Bank.
                </Heading>
                <Container variant="copy">
                  <Text
                    variant="lead"
                    sx={{
                      textShadow: '0 3px 6px rgba(0, 0, 0, 0.5)',
                      '@media screen and (max-height: 600px)': {
                        lineHeight: 1
                      }
                    }}
                  >
                    The team behind the{' '}
                    <Link
                      href="https://innovationcircuit.com"
                      target="_blank"
                      color="inherit"
                      bold
                      hoverline
                    >
                      Innovation Circuit
                    </Link>{' '}
                    is one of {Math.round((eventsCount - 50) / 100) * 100}+
                    teams who use <strong>Hack&nbsp;Club&nbsp;Bank</strong> to
                    run world-class events.
                  </Text>
                </Container>
              </Container> */}
            </Fade>
          </Box>
          <br />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 3
            }}
          >
            {showButton && (
              <Button
                variant="outlineLg"
                as="a"
                href="#apply"
                style={{ zIndex: '100' }}
              >
                Apply Now
              </Button>
            )}
          </Box>
          <ScrollHint />
        </Box>
      </Slide>
    </>
  )
}

function Underline({ children }) {
  return (
    <span
      style={{
        backgroundImage: 'url(/underline.svg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 1rem',
        backgroundPosition: 'bottom center'
      }}
    >
      {children}
    </span>
  )
}

function Slide({ children }) {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'end',
        width: '100vw',
        backgroundSize: 'cover',
        backgroundColor: '#000000',
        boxShadow: 'inset 0 0 4rem 1rem rgba(0, 0, 0, 0.5)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      <Image
        src={hero}
        layout="fill"
        objectFit="cover"
        alt="Dark room with a stage and students sitting below"
        placeholder="blur"
        priority
      />
      {children}
    </Box>
  )
}

// function Vignette() {
//   return (
//     <Box
//       style={{
//         backgroundImage:
//           'linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25) 25%,rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%)',
//         height: '100vh',
//         left: '0',
//         right: '0',
//         position: 'absolute',
//         zIndex: '0'
//       }}
//     ></Box>
//   )
// }

// blue vignette filter

function Vignette() {
  return (
    <Box
      style={{
        backgroundImage:
          'linear-gradient(to bottom,rgba(51, 142, 218, .9),rgba(51, 142, 218, 0.7) 35%, rgba(91, 192, 222, 0.2) 100%)',
        height: '100vh',
        left: '0',
        right: '0',
        position: 'absolute',
        zIndex: '0'
      }}
    ></Box>
  )
}
