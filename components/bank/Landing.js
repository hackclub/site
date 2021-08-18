import {
  Box,
  Button,
  Heading,
  Link,
  Text,
  Flex,
  Container,
  Badge
} from 'theme-ui'
import Fade from 'react-reveal/Fade'
import ScrollHint from './ScrollHint'

export default function Landing() {
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
                  // marginTop: [200, 32, 32],
                }}
              >
                <Heading
                  variant="ultratitle"
                  sx={{
                    marginBottom: 4,
                    lineHeight: 1.125,
                    textShadow: '0 0 16px rgba(0, 0, 0, 1)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  The bank for hackers to <Underline>make ideas real</Underline>
                  .
                </Heading>
                <Container variant="copy">
                  <Text
                    variant="lead"
                    sx={{ textShadow: '0 3px 6px rgba(0, 0, 0, 0.5)' }}
                  >
                    The team behind{' '}
                    <Link
                      href="https://hackaz.io/?ref=bank"
                      target="_blank"
                      color="inherit"
                      bold
                      hoverline
                    >
                      Hack&nbsp;Arizona
                    </Link>{' '}
                    is one of 100+ teams who uses{' '}
                    <strong>Hack&nbsp;Club&nbsp;Bank</strong> to run world-class
                    hackathons.
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
            <Button
              variant="outlineLg"
              as="a"
              href="#apply"
              style={{ zIndex: '100' }}
            >
              Apply Now
            </Button>
          </Box>
          <ScrollHint />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 2, right: 2 }}>
          <Badge
            variant="pill"
            sx={{
              zIndex: '1',
              bg: 'muted',
              color: 'steel',
              fontWeight: 'normal'
            }}
          >
            Tuscon, AZ
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
        background: 'url("/bank/bg.jpg")',
        backgroundColor: '#000000',
        boxShadow: 'inset 0 0 4rem 1rem rgba(0, 0, 0, 0.5)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        minHeight: '100vh',
        position: 'relative'
      }}
    >
      {children}
    </Box>
  )
}

function Vignette() {
  return (
    <Box
      style={{
        backgroundImage:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.25) 25%,rgba(0, 0, 0, 0.625) 50%, rgba(0, 0, 0, 0.75) 100%)',
        height: '100vh',
        left: '0',
        right: '0',
        position: 'absolute',
        zIndex: '0'
      }}
    ></Box>
  )
}
