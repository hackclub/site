import { Box, Button, Heading, Text, Card } from 'theme-ui'
import Fade from 'react-reveal/Fade'
import ScrollHint from '../scroll-hint'
import Image from 'next/image'
import hero from '../../public/hackathons/assemble.JPG'
import Icon from '../icon'

export default function Landing() {
  return (
    <>
      <Slide>
        <BlueGradientFilter />
        <Box
          sx={{
            position: 'absolute',
            flexDirection: 'column',
            justifyContent: 'center',
            bottom: 140,
            mx: 'auto',
            width: '100%'
          }}
        >
          <Box
            sx={{
              zIndex: 999,
              paddingTop: 96
            }}
          >
            <Fade duration={625} bottom>
              <Card
                variant="translucent"
                sx={{
                  variant: 'layout.container',
                  maxWidth: [null, 700, 1000],
                  borderRadius: 'extra',
                  p: [3, 4],
                  position: 'relative',
                  color: 'black'
                }}
              >
                <Button
                  as="a"
                  target="_blank"
                  variant="cta"
                  href="https://hackathons.hackclub.com"
                  sx={{
                    backgroundImage: t => t.util.gx('yellow', 'pink'),
                    position: 'absolute',
                    right: [0, -3],
                    top: -3,
                    transform: [
                      'translateY(-50%) rotate(8deg)',
                      'translateX(15%) rotate(12deg)'
                    ],
                    fontSize: [2, 3],
                    display: ['none', 'inline', 'inline']
                  }}
                >
                  Looking for hackathons?{' '}
                  <Icon glyph="external" size={30} sx={{ pl: 1 }} />
                </Button>

                <Heading
                  as="h2"
                  variant="title"
                  sx={{
                    color: 'black',
                    span: { color: 'white', display: 'block' }
                  }}
                >
                  Welcome to the{' '}
                  <Text
                    as="span"
                    variant="ultratitle"
                    sx={{
                      WebkitTextStroke: 'currentColor',
                      WebkitTextStrokeWidth: '2px',
                      WebkitTextFillColor: '#33D6A6',
                      whiteSpace: [null, null, 'nowrap']
                    }}
                  >
                    high school hackathon.
                  </Text>
                </Heading>
                <Text
                  as="p"
                  variant="subtitle"
                  sx={{
                    mt: 3,
                    fontSize: [2, 3]
                  }}
                >
                  <strong>
                    It's not an extracurricular or a club. It's not a class or a
                    lecture.
                  </strong>{' '}
                  Hackathons are a place to build things for fun and meet others
                  doing the same.
                </Text>
              </Card>
            </Fade>
          </Box>
          <br />
          <br />
          <ScrollHint />
        </Box>
      </Slide>
    </>
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
        // placeholder="blur"
        priority
      />
      {children}
    </Box>
  )
}

function BlueGradientFilter() {
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
