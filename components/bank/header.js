import { Box, Button, Heading, Link, Text, Container, Badge } from 'theme-ui'
import Fade from 'react-reveal/Fade'
import ScrollHint from '../scroll-hint'
import Image from 'next/image'
import theme from '@hackclub/theme'

export default function Header({ 
    copy: {
        UnderlinedHeroText,
        UnstyledHeroText,
        PrimaryHeroText,
        Button1,
        Button2,
        Caption
    },
    links: {
        button1,
        button2
    },
    assets: {
        heroImage,
        underlineColor
    }
}) {
  return (
    <>
      <Slide heroImage={heroImage}>
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
                  <Underline color={underlineColor}><UnderlinedHeroText /></Underline>
                  {' '}
                  <UnstyledHeroText />
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
                    <PrimaryHeroText />
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
                variant="ctaLg"
                as="a"
                href={button1}
                style={{ zIndex: '100' }}
            >
                <Button1 />
            </Button>
            <Button
                variant="outlineLg"
                as="a"
                href={button2}
                target="_blank"
                style={{ zIndex: '100' }}
                ml={3}
            >
                <Button2 />
            </Button>
          </Box>
          <ScrollHint />
        </Box>
        <Box sx={{ position: 'absolute', bottom: 3, right: 2, display: ["none", "block"] }}>
          <Badge
            variant="pill"
            sx={{
              zIndex: '1',
              bg: 'muted',
              color: 'steel',
              fontWeight: 'normal'
            }}
          >
            <Caption />
          </Badge>
        </Box>
      </Slide>
    </>
  )
}

function Underline({ color, children }) {
  return (
    <span
      style={{
        backgroundImage: `url(/underline-${color}.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 1rem',
        backgroundPosition: 'bottom center'
      }}
    >
      {children}
    </span>
  )
}

function Slide({ children, heroImage }) {
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
        src={heroImage}
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
