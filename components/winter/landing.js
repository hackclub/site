import { Box, Heading, Button, Link, Text, Container } from 'theme-ui'
import Snowfall from 'react-snowfall'
import { Fade } from 'react-reveal'
import Rsvp from './rsvp'
import { keyframes } from '@emotion/react'

const flashing = keyframes({
  from: { opacity: 0 },
  '50%': { opacity: 1 },
  to: { opacity: 0 }
})

function Dot() {
  return (
    <Text
      sx={{
        bg: 'green',
        color: 'white',
        borderRadius: 'circle',
        display: 'inline-block',
        lineHeight: 0,
        width: '.4em',
        height: '.4em',
        marginRight: '.4em',
        marginBottom: '.12em',
        animationName: `${flashing}`,
        animationDuration: '3s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
      }}
    />
  )
}

export default function Landing({ rsvpCount }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          background:
            'url(https://cloud-6h53svh6x-hack-club-bot.vercel.app/0group_5.png), linear-gradient(0deg, #3561A4 0%, #338EDA 100%)',
          backgroundPosition: 'bottom center',
          backgroundSize: ['200%', '150%', '100%'],
          backgroundRepeat: 'no-repeat',
          height: '85vh',
          minHeight: [null, '750px'],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 2
        }}
      >
        <Snowfall />
        <Container>
          <Box
            sx={{
              backdropFilter: 'blur(1.5px)',
              maxWidth: 'container'
            }}
          >
            <Fade left cascade>
              <Heading
                variant="eyebrow"
                sx={{
                  color: 'sunken'
                  // fontSize: ['18px', '20px', '24px']
                }}
              >
                {/* <Dot /> */}a hacker's
              </Heading>
            </Fade>
            <Fade left cascade>
              <Heading
                as="h1"
                variant="ultratitle"
                sx={{
                  color: 'white',
                  textShadow: '0 0 16px rgba(0, 0, 0, 0.2)'
                }}
                id="rsvp"
              >
                Winter Hardware <br />
                Wonderland
              </Heading>
            </Fade>
            <Text
              variant="subtitle"
              as="p"
              sx={{
                color: 'white',
                textShadow: '2px 2px 10px rgba(0, 0, 0, 1)',
                pt: 2,
                maxWidth: '50ch',
                margin: 'auto',
                my: 3
              }}
            >
              RSVPs have closed and hundreds of projects will soon be built
              together in the{' '}
              <Link
                href="/slack"
                target="_blank"
                sx={{
                  color: 'blue',
                  textShadow: '2px 2px 10px rgba(255, 255, 255, 1)'
                }}
              >
                Hack Club Slack
              </Link>
              .
            </Text>
            <Button
              as="a"
              variant="cta"
              href="https://github.com/hackclub/winter"
              sx={{
                background:
                  'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
                mt: 2
              }}
            >
              {' '}
              View the projects
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
