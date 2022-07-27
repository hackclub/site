import { Box, Button, Heading, Link, Text, Container, Badge } from 'theme-ui'
import Fade from 'react-reveal/Fade'
import ScrollHint from '../scroll-hint'
import Image from 'next/image'
import hero from '../../public/bank/bg.webp'

export default function Landing() {
  return (
    <>
      <Vignette />
      <Slide>
        <Box as="main" key="main">
          <Box
            sx={{
              zIndex: '5',
              position: 'relative',
              marginTop: '-400px'
            }}
          >
            <Container
              sx={{
                display: 'flex',
                flexDirection: 'column',
                textAlign: 'center',
                color: 'white',
                maxWidth: [null, null, 'copyUltra'],
                p: { fontSize: [2, 3, 4], maxWidth: 'copy', mx: 'auto' }
              }}
              variant="ultratitle"
            >
              <Text variant="eyebrow" sx={{ color: 'white', opacity: 0.875 }}>
                Welcome to the high school hackathon
              </Text>
              <Heading as="h1" variant="ultratitle" sx={{ mb: [3, 4] }}>
                A renaissance of IRL {/* highlight or outline? */}
                {/* <Highlight>high school hackathons.</Highlight> */}
                <Text
                  as="span"
                  sx={{
                    WebkitTextStroke: 'currentColor',
                    WebkitTextStrokeWidth: ['2px', '3px'],
                    WebkitTextFillColor: '#33D6A6'
                  }}
                >
                  high&nbsp;school hackathons.
                </Text>
              </Heading>
              {/* <Text as="p" variant="subtitle">
                lakjsdf;lajsdf;lkjasd;lfja;sldkjfalskdjf;l
              </Text> */}
            </Container>
            {/* <Button
              variant="outlineLg"
              as="a"
              href="#apply"
              sx={{ mx: 'auto' }}
            >
              Join the community
            </Button> */}
            <br />
            <ScrollHint scrollAmount="100" />
          </Box>

          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              zIndex: -1
            }}
          >
            <Image src={hero} alt="" layout="fill" objectFit="cover" />
          </Box>
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
        minHeight: '80vh',
        position: 'relative'
      }}
    >
      <Image
        src="https://cloud-dtijd5g0u-hack-club-bot.vercel.app/020191026_151117__1_.jpg"
        layout="fill"
        objectFit="cover"
        alt="woof"
        // placeholder="blur"
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
          'linear-gradient(to bottom,rgba(51, 142, 218, .9),rgba(51, 142, 218, 0.7) 35%, rgba(91, 192, 222, 0.2) 100%)',
        height: '80vh',
        left: '0',
        right: '0',
        position: 'absolute',
        zIndex: '1'
      }}
    ></Box>
  )
}

function Highlight(props) {
  return (
    <Badge
      as="mark"
      sx={{
        bg: '#5BC0DE',
        color: 'inherit',
        fontSize: 'inherit',
        display: 'inline-block',
        borderRadius: 'default',
        px: [2, 3],
        py: 1,
        ...props.sx
      }}
      {...props}
    />
  )
}
