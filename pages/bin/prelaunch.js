import {
  Box,
  Container,
  Text,
  Heading,
  Card,
  Flex,
  Image,
  Link,
  Grid,
  Button
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../../components/nav'
import { useEffect, useState, useRef } from 'react'
import Footer from '../../components/footer'
import { keyframes } from '@emotion/react'
import RsvpForm from '../../components/bin/rsvp-form'
import { Fade } from 'react-swift-reveal'
import ForceTheme from '../../components/force-theme'
import JSConfetti from 'js-confetti'
import Sparkles from '../../components/sparkles'
import Icon from "@hackclub/icons"
import Announcement from '../../components/announcement'
import { TypeAnimation } from 'react-type-animation'

const RsvpCount = () => {
  const targetRSVPs = 500
  const [rsvpCount, setRsvpCount] = useState(0)
  useEffect(async () => {
    // const url = 'https://api2.hackclub.com/v0.1/The Bin/rsvp'  <- switch to this once we have api2 back up and running
    const url = '/api/bin/rsvp'
    const results = await fetch(url).then(r => r.json())
    setRsvpCount(results)
  }, [])

  if (rsvpCount < targetRSVPs) {
    return <Text>{targetRSVPs - rsvpCount} RSVPs until the start of...</Text>
  } else {
    return <Text>{rsvpCount} have already RSVP'd to...</Text>
  }
}

const stickerImages = [
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/00729a9823e6364d148ae8d932b476d1fa57fe00_0rummaging.png',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/2c732ecf0d592ec72cc641b5d411a4dcc3e4e0bb_1prototype.png',
  'https://hc-cdn.hel1.your-objectstorage.com/s/v3/34fc9b192c99844d5051701e540bf561bcd8eeec_0idea.png'
]


const PartPicker = () => {
  const parts = [
    {
      name: "Relay",
      description: "On/Off Switch",
      image: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/425199d4c277a8f415020ad69602f9858532f102_0placeholder3.png"
    },
    {
      name: "Mic",
      description: "Record Sound",
      image: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/425199d4c277a8f415020ad69602f9858532f102_0placeholder3.png"
    }
  ]

  const [currentParts, setCurrentParts] = useState(parts)

  function randomizeParts() {
    const randomParts = []
    for (let i = 0; i < 3; i++) {
      randomParts.push(parts[Math.floor(Math.random() * parts.length)])
    }
    setCurrentParts(randomParts)
  }
  return (
    <>
      {currentParts.map((part, index) => (
        <Electronic
          key={index}
          name={part.name}
          description={part.description}
          imageUrl={part.imageUrl}
        />
      ))}
      <button onClick={randomizeParts}>Randomize</button>
    </>
  )
}


const OnboardCount = () => {
  const [onboardCount, setOnboardCount] = useState(200)

  useEffect(async () => {
    const url = '/api/onboard/p/count'
    const results = await fetch(url).then(r => r.json())
    setOnboardCount(results.count)
  }, [])

  return <Text>{onboardCount}</Text>
}

const Electronic = ({ imageUrl, name, description }) => {
  return (
    <Card sx={{ display: 'inline-flex', textAlign: 'center', my: 'auto' }}>
      <Flex
        sx={{ mx: 'auto', flexDirection: 'column', display: 'inline-flex' }}
      >
        <Image src={imageUrl} width="100" />
        <Heading as="span" variant="headline">
          {name}
        </Heading>
        <Text sx={{ whiteSpace: 'nowrap' }}>{description}</Text>
      </Flex>
    </Card>
  )
}

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
})
const wobble = keyframes({
  '0%': { transform: 'rotate(15deg)' },
  '50%': { transform: 'scale(1.1)' },
  '100%': { transform: 'rotate(20deg)' }
})

const bounce = keyframes({
  '0%': { transform: 'scaleX(100%) scaleY(100%)' },
  '50%': { transform: 'scaleX(115%) scaleY(90%)' },
  '100%': { transform: 'scaleX(100%) scaleY(100%)' }
})

const slideIn = keyframes({
  '0%': { transform: 'translateX(-100%)', opacity: 0 },
  '100%': { transform: 'translateX(0);', opacity: 1 }
})

const slideOut = keyframes({
  '100%': { transform: 'translateX(-100%)', opacity: 0 },
  '0%': { transform: 'translateX(0);', opacity: 1 }
})

function crunch() {
  const crunchAudioUrls = [
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/d86bb409966b6f48f79045ebbcba884543b7271a_0crunch_4_audio.mp4',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/a59adefecb083a8213ebc7303a72a6b1f581c01b_1crunch_3_audio.mp4',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/e2d95dc8759265365e4dc8d5c5009db4688b71ce_2crunch_2_audio.mp4',
    'https://hc-cdn.hel1.your-objectstorage.com/s/v3/b04ad5f10f1586b04642ad1acf63a8fbd424926d_3crunch_1_audio.mp4',
  ]
  const randomCrunch = crunchAudioUrls[Math.floor(Math.random() * crunchAudioUrls.length)]

  const audio = new Audio(randomCrunch)
  audio.play()
}

const ExpiresAt = ({ children, expirationDate = new Date() - 1 }) => {
  console.log(expirationDate, new Date())
  if (expirationDate > new Date()) {
    return children
  } else {
    return null
  }
}

function spinIt(el) {
  el.classList.add("spin");
  setTimeout(() => el.classList.remove("spin"), 500);
}
export default function Bin() {
  const confettiInstance = useRef(null);
  function fireConfetti() {
    if (!confettiInstance.current) {
      confettiInstance.current = new JSConfetti()
    }
    confettiInstance.current.addConfetti({
      emojis: ['🔌', '⚡️', '💥', '🚨', '🔋', '🤖', '🛞', '🔊', '🎙️', '💿', '🖲️', '⚙️', '🛠️'],
    })
  }
  return (
    <>
      <Meta as={Head}
        title="The Bin"
        description="Rummage around in The Bin to get a free electronics starter kit!"
        image="https://hc-cdn.hel1.your-objectstorage.com/s/v3/5b6a81c280ac1dc1eafc3e078997a98d22590ea4_0og_image.png"
      />
      <Nav color="text" />
      <ForceTheme theme="light" />
      <Box as="main" sx={{ bg: '#ECE9E0', textAlign: 'center', backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%239C92AC' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E")` }}>
        <Box sx={{ background: 'url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/2b1e3941930185c475a9c18b0ee5913781bdc031_0bg.png)', backgroundSize: 'cover', py: '3em' }}>
          <Container sx={{ position: 'relative' }}>
            <Box as="section" sx={{ textAlign: 'center', pt: '4em', overflow: 'hidden' }}>
              <ExpiresAt expirationDate={new Date(2024, 3, 13)}>
                <Box sx={{ mt: 3 }}>
                  <Announcement
                    copy="Please pardon our dust!"
                    caption="You found us a little early! We're still building this page, but you can RSVP early."
                    iconLeft="welcome"
                  />
                </Box>
              </ExpiresAt>
              <Box sx={{
                '@media (prefers-reduced-motion: no-preference)': {
                  animation: `${wobble} 0.5s ease-in-out infinite alternate`
                },
              }}>
                <Image
                  src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/00729a9823e6364d148ae8d932b476d1fa57fe00_0rummaging.png"
                  onClick={(e) => { fireConfetti(); crunch(); spinIt(e.target) }}
                  sx={{
                    cursor: 'pointer',
                    ':active': {
                      animation: `${bounce} 0.125s`
                    },
                    '&.spin': {
                      animation: `${spin} 0.25s`
                    }
                  }}
                />
              </Box>
              <br />
              <RsvpCount />
              <Box id="rsvp">
                <Sparkles size="100px">
                  <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/9a77ddcfb7c9e2c572fd22861022f0ccfabfd6ee_0thebin.svg" sx={{ maxWidth: '250px' }} />
                </Sparkles>
              </Box>
              <Text sx={{ fontWeight: 'bold' }}>
                Build{' '}
                <em>

                  <TypeAnimation
                    cursor={false}
                    sequence={[
                      // Same substring at the start will only be typed out once, initially
                      'a laser guided nerf gun',
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      'a clap activated lamp',
                      1000,
                      'a temperature activated Febreze can',
                      1000,
                      'a flame actuated speaker',
                      1000,
                      'a light dependant door',
                      1000
                    ]}
                    repeat={Infinity}
                  />
                </em>
                {' '}
                with parts you pick out.
                <br />
                Free for high schoolers.
                {/* with all the parts bought for you */}
                {/* An electronics starter kit, customized for <em>your</em>&nbsp;project */}
              </Text>
            </Box>
            <Box as="section" sx={{ textAlign: 'center' }}>
              <Fade up delay={100}>
                <Card sx={{ p: 3, mt: 4, mx: 'auto', maxWidth: '50ch' }}>
                  <Text as="p" sx={{ mb: 1, mt: 0, textWrap: 'pretty', fontSize: 2 }}>
                    Running for only 2 months.
                    {/* High schoolers can RSVP now! */}
                    {/* High schoolers can get a kit of electronics parts for free to
                    build their first project. */}
                  </Text>
                  <Text as="p" sx={{ color: 'muted', mb: 2, fontSize: 2, fontWeight: 800 }}>
                    RSVP to get notified when orders&nbsp;open.
                  </Text>
                  <RsvpForm />
                </Card>
              </Fade>
            </Box>
          </Container>
        </Box>
        <Container sx={{ position: 'relative' }}>
          <Box
            as="section"
            sx={{
              textAlign: 'left',
              pt: '4em',
              maxWidth: 'narrow',
              mx: 'auto'
            }}
          >
            <Heading as="h2" variant="title" sx={{
              '> .hidden': {
                opacity: 0,
                animation: `${slideOut} 0.25s ease-in-out`,
              },
              ":hover": {
                '> .hidden': {
                  display: 'inline-block',
                  animation: `${slideIn} 0.25s ease-in-out`,
                  opacity: 1
                }
              }
            }
            }>
              Motors & lasers & mics,{' '}
              <Text as="span" sx={{ fontWeight: 400, fontStyle: 'italic' }}>
                oh&nbsp;my!
              </Text>
              <Text as="span" className="hidden" sx={{ fontWeight: 400, fontStyle: 'italic', ml: 2 }}>
                oh&nbsp;my!
              </Text>
            </Heading>
            <Box sx={{ textAlign: 'left' }}>
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/00729a9823e6364d148ae8d932b476d1fa57fe00_0rummaging.png" />
                </Box>
                <Box>
                  <Heading as="p" variant="headline">
                    <b>Rummage</b>
                  </Heading>
                  <Text>
                    Dig through the bin to get a randomly generated set of parts
                    (<em>or you can choose your own</em>). For example...
                  </Text>
                </Box>
              </Flex>
              <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/716f7b2bc8dc9248c16f62506079b733ad64d4d9_0parts.svg" sx={{ width: '100%' }} />
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f53c154554c372cebe6cb1d2f78f2bcd62887c34_0frame_1__50_.png" />
                </Box>
                <Box>
                  <Text as="p" variant="headline">
                    <b>Think!</b>
                  </Text>
                  <Text>
                    With your parts picked out, <b>what will you make?</b> A portable disco party? A flashlight
                    that only turns on in the daytime?
                  </Text>
                </Box>
              </Flex>
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Text as="p" variant="headline">
                    <b>Prototype</b>
                  </Text>
                  <Text>
                    Turn your idea into something almost real: simulate your
                    project in an online editor for beginners.
                  </Text>
                </Box>
                <Box>
                  <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/2c732ecf0d592ec72cc641b5d411a4dcc3e4e0bb_1prototype.png" />
                </Box>
              </Flex>
              <Box sx={{
                boxShadow: 'card',
                borderRadius: 8,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Box
                  p={2}
                  sx={{
                    bg: 'dark',
                    flexGrow: 1,
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 800,
                    borderBottom: '1px solid gray',
                    display: 'flex',
                    gap: 2
                  }}>
                  <Icon glyph='private-outline' height={24} />
                  <Box sx={{ bg: 'darkless', borderRadius: 4, flexGrow: 1 }}>wokwi.com</Box>
                  <Icon glyph='view-reload' height={24} />
                </Box>
                <Image src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/8483308cc40608e60961f7e2ec24a57dbe044108_0image.png" alt="Screenshot" />
              </Box>
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Text as="p" variant="headline">
                    <b>Build it!</b>
                  </Text>
                  <Text>
                    If it works in simulation, <b>we’ll send you the parts to
                      build it in real life.</b>
                  </Text>
                </Box>
              </Flex>
              <Image
                src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/e4a2b4f7f36010648b7f1fd5fa3710373cb81816_0image.png"
                width="100%"
              />
            </Box>
          </Box>
        </Container>
        <Container>
          <Text as="h3">Turn some trash into your treasure.</Text>
          <br></br>
          <Button variant="ctaLg" as="a" href="#rsvp" >
            RSVP</Button><br></br><br></br>
        </Container>
      </Box>
      <Footer>
        <Box sx={{ a: { color: 'blue' }, pb: 4 }}>
          <Heading as="h3" variant="subheadline" mb={2}>
            A project by <a href="https://hackclub.com/">Hack Club</a>.
          </Heading>
          <Text
            as="p"
            variant="caption"
            mb={3}
            sx={{ width: ['85%', '75%', '60%'] }}
          >
            Hack Club is a registered 501(c)3 nonprofit organization that
            supports a network of 20k+ technical high schoolers. We believe you
            learn best by building so we're removing barriers to hardware access
            so any teenager can explore. In the past few years, we{' '}
            <Link href="https://onboard.hackclub.com" target="_blank">
              fabricated custom PCBs designed by <OnboardCount /> teenagers
            </Link>
            ,{' '}
            <Link
              href="https://github.com/hackclub/the-hacker-zephyr"
              target="_blank"
            >
              hosted the world's longest hackathon on land
            </Link>
            , and{' '}
            <Link href="https://hackclub.com/winter" target="_blank">
              gave away $75k of hardware
            </Link>
            .
          </Text>
        </Box>
      </Footer>
      <style>
        {
          `
          html {
            scroll-behavior: smooth;
          }
          `
        }
      </style>
    </>
  )
}
