import { Box, Container, Text, Heading, Card, Flex, Image, Link, Grid } from "theme-ui";
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import { keyframes } from "@emotion/react";
import RsvpForm from "../components/bin/rsvp-form";
import { Slide } from "react-reveal";

const RsvpCount = () => {
  const [rsvpCount, setRsvpCount] = useState(0)
  useEffect(async () => {
    // const url = 'https://api2.hackclub.com/v0.1/The Bin/rsvp'  <- switch to this once we have api2 back up and running
    const url = '/api/bin/rsvp'
    const results = await fetch(url).then(r => r.json())
    setRsvpCount(results)
  }, [])

  return (
    <Text>{100 - rsvpCount} RSVPs until the start of...</Text>
  )
}

const stickerImages = [
  'https://cloud-mt5wqf6f5-hack-club-bot.vercel.app/0rummaging.png',
  'https://cloud-mt5wqf6f5-hack-club-bot.vercel.app/1prototype.png',
  'https://cloud-i547pyt1f-hack-club-bot.vercel.app/0idea.png'
]

const OnboardCount = () => {
  const [onboardCount, setOnboardCount] = useState(200)

  useEffect(async () => {
    const url = '/api/onboard/p/count'
    const results = await fetch(url).then(r => r.json())
    setOnboardCount(results.count)
  }, [])

  return (<Text>{onboardCount}</Text>)
}

const Electronic = ({imageUrl, name, description}) => {
  return (
    <Card sx={{display: 'inline-flex', textAlign: 'center', my: 'auto'}}>
      <Flex sx={{mx: 'auto', flexDirection: "column", display: 'inline-flex'}}>
      <Image src={imageUrl} width="100"/>
        <Heading as="span" variant="headline">{name}</Heading>
        <Text sx={{whiteSpace: 'nowrap'}}>{description}</Text>
      </Flex>
    </Card>
  )
}

const wobble = keyframes({
  from: { transform: 'rotate(15deg)' },
  to: { transform: 'rotate(20deg)' }
})

export default function Bin() {
  return (
    <>
      <Meta
        as={Head}
        title="The Bin"
        description="Jump in the trash!"
      />
      <Nav />
      <Box as="main" sx={{ pt: '3em', bg: '#ECE9E0', textAlign: 'center' }}>
        <Container sx={{ position: 'relative' }}>
          <Box as="section" sx={{ textAlign: 'center', pt: '4em' }}>
            <Heading
              as="h1"
              variant="ultratitle"
              py={3}
              sx={{
                fontSize: "6em",
                display: 'inline-block',
                cursor: 'pointer',
                '@media (prefers-reduced-motion: no-preference)': {
                  animation: `${wobble} 2.5s ease-in-out infinite alternate`
                },
              }}
            >
              🗑️
            </Heading>
            <br />
            <RsvpCount />
            <Heading
              as="h1"
              variant="ultratitle"
              py={3}
            >
              The Bin
            </Heading>
            <Text sx={{ fontWeight: 'bold' }}>An electronics starter kit, customized for <em>your</em> project</Text>
          </Box>
          <Box as="section" sx={{ textAlign: 'center' }}>
            <Card sx={{ p: 3, mt: 4, mx: 'auto', maxWidth: '40ch' }}>
              <Text as="p" sx={{ my: 1 }}>High schoolers can get a kit of electronics parts for free to build their first project.</Text>
              <Text as="p" sx={{ color: 'muted', mb: 3 }}>RSVP to get notified when applications open.</Text>
              <RsvpForm />
            </Card>
          </Box>
          <Box as="section" sx={{ textAlign: 'left', pt: '4em', maxWidth: 'narrow', mx: 'auto' }}>
            <Heading as="h2" variant="title">
              Motors & lasers & mics, <Text as="span" sx={{fontWeight: 400, fontStyle: 'italic'}}>oh&nbsp;my!</Text>
            </Heading>
            <Box sx={{ textAlign: 'left' }}>
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Image src="https://cloud-mt5wqf6f5-hack-club-bot.vercel.app/0rummaging.png" />
                </Box>
                <Box>
                  <Heading as="p" variant="headline"><b>Rummage</b></Heading>
                  <Text>Dig through the bin to get a randomly generated set of parts (<em>or you can choose your own</em>). For example...</Text>
                </Box>
              </Flex>
              <Image src="https://cloud-2wkwrydc4-hack-club-bot.vercel.app/0parts.svg" width="100%" />
              {/*<Grid columns={[1, 2, 3]} gap={3}>
                <Slide up>
                  <Electronic name="Relay" description="On/Off Switch" imageUrl="https://cloud-4zl0ojqxq-hack-club-bot.vercel.app/0placeholder3.png"/>
                </Slide>
                <Slide up delay="40">
                <Electronic name="Mic" description="Records Sounds" imageUrl="https://cloud-4zl0ojqxq-hack-club-bot.vercel.app/0placeholder3.png"/>
                </Slide>
                <Slide up delay="80">
                <Electronic name="Humidity" description="Measure moistness" imageUrl="https://cloud-4zl0ojqxq-hack-club-bot.vercel.app/0placeholder3.png"/>
                </Slide>
              </Grid>
              */}
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Image src="https://cloud-i547pyt1f-hack-club-bot.vercel.app/0idea.png" />
                </Box>
                <Box>
                  <Text as="p" variant="headline"><b>Ideas</b></Text>
                  <Text>With your parts picked out, <b>what will you make?</b> A voice activated laser? A portable disco party? A flashlight that only turns on in the daytime?</Text>
                </Box>
              </Flex>
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Text as="p"><b>3. Prototype</b></Text>
                  <Text>Turn your idea into something almost real: simulate your project in an online editor for beginners.</Text>
                </Box>
                <Box>
                  <Image src="https://cloud-i547pyt1f-hack-club-bot.vercel.app/0idea.png" />
                </Box>
              </Flex>
              <Flex sx={{ my: 4 }}>
                <Box>
                  <Image src="https://cloud-i547pyt1f-hack-club-bot.vercel.app/0idea.png" />
                </Box>
                <Box>
                  <Text as="p"><b>4. Show off & ship it!</b></Text>
                  <Text>Show off your circuit! If it works in simulation, <b>we’ll send you the parts to build it in real life.</b></Text>
                </Box>
              </Flex>
              <Image src="https://cloud-ge8yutn2q-hack-club-bot.vercel.app/0image.png" width="100%" />
            </Box>
          </Box>
        </Container>
      </Box>
      <Footer>
        <Box sx={{ a: { color: 'blue' }, pb: 4 }}>
          <Heading as="h3" variant="subheadline" mb={2}>
            A project by <a href="https://hackclub.com/">Hack Club</a>.
          </Heading>
          <Text as="p" variant="caption" mb={3} sx={{ width: ['85%', '75%', '60%'] }}>
            Hack Club is a registered 501(c)3 nonprofit organization that supports a
            network of 20k+ technical high schoolers. We believe you learn best by
            building so we're removing barriers to hardware access so any teenager can
            explore. In the past few years, we've{' '}
            <Link href="https://winter.hackclub.com" target="_blank">
              partnered with GitHub to give away $50k of hardware
            </Link>
            ,{' '}
            <Link
              href="https://github.com/hackclub/the-hacker-zephyr"
              target="_blank"
            >
              hosted the world's longest hackathon on land
            </Link>
            , and{' '}
            <Link href="https://onboard.hackclub.com" target="_blank">
              fabricated custom PCBs designed by <OnboardCount /> teenagers
            </Link>
            .
          </Text>
        </Box>
      </Footer>
    </>
  )
}