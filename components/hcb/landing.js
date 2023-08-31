import {
  Box,
  Button,
  Heading,
  Link,
  Flex,
  Text,
  Container,
  Badge
} from 'theme-ui'
import Fade from 'react-reveal/Fade'
import ScrollHint from '../scroll-hint'
import Image from 'next/image'
import hero from '../../public/hcb/bg.webp'

export default function Landing({ showButton = true, eventsCount }) {
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
              <Container
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
                  as="h1"
                >
                  <Underline>Become a nonprofit</Underline> with HCB
                </Heading>
                <Flex
                  sx={{
                    gap: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 4
                  }}
                >
                  <img
                    src="/hcb/hcb-icon-icon-dark.png"
                    alt="HCB Icon"
                    height={64}
                    sx={{
                      margin: 'auto'
                    }}
                  />
                  <Text as="h2" sx={{ fontSize: 4 }}>
                    HCB by
                  </Text>
                  <img
                    src="https://assets.hackclub.com/flag-standalone.svg"
                    alt="hack club flag"
                    height={48}
                  />
                </Flex>
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
                    teams who use <strong>HCB</strong> to run world-class
                    organizations, hackathons, and clubs.
                  </Text>
                </Container>
              </Container>
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
              <>
                <Button
                  variant="ctaLg"
                  as="a"
                  href="#apply"
                  style={{ zIndex: '100' }}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outlineLg"
                  as="a"
                  href="https://hcb.hackclub.com"
                  target="_blank"
                  style={{ zIndex: '100' }}
                  ml={3}
                >
                  Sign in
                </Button>
              </>
            )}
          </Box>
          <ScrollHint />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: 3,
            right: 2,
            display: ['none', 'block']
          }}
        >
          <Badge
            variant="pill"
            sx={{
              zIndex: '1',
              bg: 'muted',
              color: 'steel',
              fontWeight: 'normal'
            }}
          >
            Singapore
          </Badge>
        </Box>
      </Slide>
    </>
  )
}

function Underline({ children }) {
  return (
    <span
      style={{
        backgroundImage: 'url(/underline-red.svg)',
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

function Vignette() {
  return (
    <Box
      style={{
        backgroundImage:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25) 25%,rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%)',
        height: '100vh',
        left: '0',
        right: '0',
        position: 'absolute',
        zIndex: '0'
      }}
    ></Box>
  )
}
