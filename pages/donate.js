import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Card,
  Grid,
  Link as A,
  Text,
  Avatar
} from 'theme-ui'
import Photo from '../components/photo'
import Image from 'next/image'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import SprigForm from '../components/donate/sprigForm'
import SprigMeta from '../components/donate/sprigMeta'
import Sponsors from '../components/donate/sponsors'
import donors from '../components/donate/donors.json'
import Marquee from 'react-marquee-slider'
import ExecuteBig from '../public/donate/codedaydc_hack.jpg'
import HackCamp from '../public/donate/sf.jpg'
import HackerGames from '../public/donate/0img_20210830_161125.jpg'
import LaptopDonations from '../public/donate/0screenshot_2021-10-03_at_4.20.30_pm.png'
import Kerala from '../public/donate/0img-20210918-wa0091.jpg'
import HackPenn from '../public/donate/0color_pop.jpg'
import ElonAMA from '../public/donate/elon.jpg'
import SpaceX from '../public/donate/0spacex_and_hack_club.jpg'
import Flagship from '../public/donate/flagship.png'
import MAHacks from '../public/donate/0screenshot_2021-10-03_at_4.07.51_pm.png'
import HackCamp2020 from '../public/donate/0img_6447.jpg'
import InnovationCircuit from '../public/donate/0screenshot_2021-10-03_at_3.45.54_pm.png'
import WindyCity from '../public/donate/6screenshot_2021-10-03_at_3.29.29_pm.png'
import ZephyrFun from '../public/donate/0screenshot_2021-10-03_at_3.59.34_pm.png'
import GoldenTrain from '../public/home/golden-train.png'

const Header = styled(Box)`
  background: url('/pattern.svg');
`

const Sheet = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  color: white;
`
Sheet.defaultProps = {
  sx: {
    bg: 'rgba(255, 255, 255, 0.875)',
    p: [3, 4],
    color: 'black',
    width: 1,
    mb: 4
  }
}

const Row = styled(Box)`
  text-align: left;
  @media screen and (min-width: 48em) {
    display: grid;
    grid-gap: 18px;
    grid-template-columns: ${({ reverse }) =>
      reverse ? '3fr 2fr' : '2fr 3fr'};
  }
`

const Quote = styled(Sheet)`
  position: relative;
  &:before {
    content: '“';
    line-height: 1;
    font-size: 48px;
    padding-left: 6px;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    opacity: 0.5;
    padding: 18px;
  }
`

Sheet.defaultProps = {
  sx: {
    maxWidth: '52rem',
    fontSize: 3,
    p: [4, 5],
    color: 'white'
  }
}
const FirstQuote = styled(Quote)`
  background-image: radial-gradient(
    at left top,
    rgb(45, 228, 207),
    rgb(41, 206, 104),
    rgb(53, 181, 36)
  );
`
const SecondQuote = styled(Quote)`
  background-image: radial-gradient(
    at left bottom,
    rgb(45, 158, 228),
    rgb(45, 66, 228),
    rgb(115, 45, 228)
  );
`
const subhline = { fontSize: [3, 4], style: { lineHeight: '1.375' } }

const contentContainer = {
  maxWidth: 72,
  width: 1,
  p: 3,
  color: 'black',
  style: { position: 'relative' }
}
const content = { maxWidth: 48, mx: 0, color: 'black' }

const title = 'Donate'
const desc =
  'Contribute today to empower the next generation and help start a coding club at every high school.'

const DonorGrid = styled(Box)`
  display: grid;
  grid-gap: 6px;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  align-items: center;
  p,
  a {
    width: 100%;
  }
  @media screen and (min-width: 48em) {
    grid-gap: 18px;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  }
`

const DonorCardBase = styled(Sheet)`
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 32em) {
    border-radius: 0;
    box-shadow: none;
  }
`
const DonorCard = ({ name, link = false }) => (
  <DonorCardBase bg="white" p="18px!important" mb={0}>
    <Text color="black" sx={{ textAlign: 'center', fontSize: '16px' }}>
      {name}
    </Text>
  </DonorCardBase>
)

const PhotoRow = ({ photos }) => (
  <Box sx={{ height: '200px', overflow: 'hidden' }}>
    <Box sx={{ display: ['block', 'block', 'block', 'block', 'none'] }}>
      <Marquee velocity={12}>
        {photos.map((photo, index) => (
          <Image
            placeholder="blur"
            src={photo}
            objectFit="cover"
            className="next-image"
            height="200px"
            width="300px"
            alt="Hack Club students"
            key={'image-' + index}
          />
        ))}
      </Marquee>
    </Box>
    <Box sx={{ display: ['none', 'none', 'none', 'none', 'block'] }}>
      <Marquee velocity={12}>
        {photos.map((photo, index) => (
          <Image
            placeholder="blur"
            src={photo}
            objectFit="cover"
            className="next-image"
            height="200px"
            width="600px"
            key={'image-' + index}
            alt="Hack Club students"
          />
        ))}
      </Marquee>
    </Box>
  </Box>
)

const DonorListing = ({ name, url }) => {
  if (url) {
    return (
      <A target="_blank" href={url} color="black" underline>
        <DonorCard name={name} link />
      </A>
    )
  } else {
    return <DonorCard name={name} />
  }
}

export default function Donate({ sprig }) {
  useEffect(() => {
    if (sprig) {
      window.document.getElementById('sprig-donation').scrollIntoView()
    }
  }, [sprig])

  return (
    <Box>
      <Meta
        as={Head}
        title={title}
        description={desc}
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />
      <Nav color="muted" />
      <ForceTheme theme="light" />
      <Header sx={{ position: 'relative' }}>
        <Box
          sx={{
            background: 'rgba(0,0,0, 0.8)',
            zIndex: 1,
            position: 'relative',
            color: 'white!important',
            height: '600px'
          }}
          pt={[5, 5, '110px']}
        >
          <Box
            sx={{
              maxWidth: '64rem',
              mx: 'auto',
              zIndex: 1,
              position: 'relative'
            }}
            align="center"
            py={2}
            px={[1, 3]}
          >
            <Container sx={{ maxWidth: '48rem' }}>
              <Heading
                sx={{
                  fontSize: ['42px', '54px', '72px'],
                  my: 2,
                  color: 'white'
                }}
              >
                We rely on people like you to bring coding to the world.
              </Heading>
              <Box
                sx={{
                  fontSize: ['22px', '23px', '28px'],
                  maxWidth: '40rem',
                  color: 'white'
                }}
              >
                Contribute today to empower the next generation. Help start a
                Hack Club at every high school.
              </Box>
              <Button
                variant="ctaLg"
                my={3}
                sx={{ width: ['100%', 'auto'] }}
                as="a"
                href="https://hcb.hackclub.com/donations/start/hq"
              >
                Donate
                <Text sx={{ display: ['none', 'inline-block'], ml: 2 }}>
                  to Hack Club
                </Text>
              </Button>
              <Text
                sx={{ mt: 1, display: 'block', opacity: 0.8 }}
                fontSize={2}
                color="white"
              >
                Your contribution is tax-deductible.
                <br />
                Hack Club is a 501(c)(3) nonprofit with the EIN 81-2908499.
              </Text>
            </Container>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            zIndex: 0,
            width: '100%',
            display: 'block'
          }}
        >
          <PhotoRow
            photos={[
              ExecuteBig,
              HackCamp,
              HackerGames,
              LaptopDonations,
              Kerala
            ]}
          />
          <PhotoRow
            photos={[HackPenn, ElonAMA, SpaceX, GoldenTrain, Flagship]}
          />
          <PhotoRow
            photos={[
              HackCamp2020,
              InnovationCircuit,
              WindyCity,
              MAHacks,
              ZephyrFun
            ]}
          />
        </Box>
      </Header>
      <Container mb={5} id="sprig-donation"></Container>
      {sprig && <SprigMeta />}
      <Container variant="copy">
        <Box pt={[0, 3]} mb={[2, 4]}>
          <Heading
            sx={{
              textAlign: 'center',
              fontSize: 4,
              textTransform: 'uppercase',
              fontWeight: [400, 800],
              mb: [0, 0]
            }}
          >
            Now introducing...
          </Heading>
          <Heading
            mt={2}
            sx={{
              textAlign: 'center',
              textTransform: 'uppercase',
              fontSize: [5, 7],
              lineHeight: [0.8, 1],
              mb: 0,
              marginBlockEnd: 0,
              marginBlockStart: 0,
              my: [2, 0]
            }}
          >
            Sprig Consoles
          </Heading>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around'
            }}
          >
            <Heading
              variant="subtitle"
              pb={[3, 2, 2]}
              sx={{
                textAlign: 'center',
                color: 'blue',
                textTransform: 'uppercase',
                mt: [2, 0],
                fontWeight: 800
              }}
            >
              Inspiring teenagers to both make and code.
            </Heading>
            <Text sx={{ textAlign: 'center', fontSize: 2 }}>
              A donation to the Sprig fund will send a teenager a Hack Club
              Sprig Console Kit: containing a custom PCB, buttons, a screen, a
              microprocessor, and more (all open source, of course), so that
              they can build and then play their own games.
            </Text>
          </Box>
        </Box>
        <Grid
          columns={[null, '2fr 3fr']}
          gap={[2, 3, 4]}
          pt={[0, 0]}
          mb={[2, 4]}
        >
          <Box
            as="video"
            style={{
              width: '100%',
              borderRadius: '1em',
              height: '100%',
              objectFit: 'cover'
            }}
            autoPlay
            muted
            loop
          >
            <source
              src="https://cloud-5r3ak1pm6-hack-club-bot.vercel.app/0image_from_ios__online-video-cutter.com__1_.mp4"
              type="video/mp4"
            />
          </Box>
          <Photo
            src="https://cloud-kcloydjv0-hack-club-bot.vercel.app/0image_from_ios__1_.jpg"
            alt="Sprig PCB"
            width={3000}
            height={2550}
            showAlt
            sx={{ height: '100%' }}
          />
        </Grid>
        <Sheet
          sx={{
            color: 'white',
            bg: 'primary',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: ['wrap', 'nowrap'],
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 4
          }}
        >
          <SprigForm />
        </Sheet>
      </Container>
      <Container variant="copy" mt={5}>
        <FirstQuote>
          <Heading my={3} sx={{ fontWeight: 'normal', fontSize: '27px' }}>
            When I took CS classes in high school, I always found myself
            disengaged and feeling like they were just another class. After
            getting involved in Hack Club, a career in computer science changed
            from a possibility to reality.
          </Heading>
          <Heading
            fontSize={[4, 5]}
            sx={{ fontWeight: 'bold', fontSize: ['27px', '36px'] }}
            as="h1"
          >
            Because of Hack Club, I started organizing hackathons with hundreds
            of participants, interning for companies including Intuit, and most
            importantly, fell in love with building things with code.
          </Heading>
          <Flex align="center" mt={[3, 4]}>
            <Avatar
              src="/hackers/selynna.jpg"
              sx={{ height: '48px', width: '48px' }}
              mr={3}
              st
            />
            <Box align="left" fontSize={3}>
              <Heading>Selynna Sun</Heading>
              <Text fontSize={2} color="green.1">
                Sophomore & CS Major @ Cal Poly SLO
              </Text>
            </Box>
          </Flex>
        </FirstQuote>
        <Container maxWidth={'48rem'} sx={{ maxWidth: '48rem' }} py={[3, 4]}>
          <Heading as="h1" sx={{ fontSize: ['36px', '48px'] }}>
            Contribute beyond just dollars.
          </Heading>
          <Box mt={2} mb={2} sx={{ fontSize: '27px' }}>
            We accept donations of time, technical or hard science fiction
            books, stocks/other securities, and cryptocurrency.
          </Box>
          <Box mb={3} sx={{ fontSize: '27px' }}>
            Please get in touch at{' '}
            <A sx={{ color: 'blue' }} href="mailto:hcb@hackclub.com">
              hcb@hackclub.com
            </A>{' '}
            if you’re interested in making a contribution with cryptocurrency or
            have questions.
          </Box>
        </Container>
        <SecondQuote>
          <Heading
            fontSize={[4, 5]}
            sx={{ fontWeight: 'bold', fontSize: ['27px', '36px'] }}
            as="h1"
          >
            Hack Club has inspired me to grow and become the person I am today.
            Being part of the community allows me to meet countless like-minded
            individuals who challenge me to become a better person, and a better
            hacker.
          </Heading>
          <Flex align="center" mt={[3, 4]}>
            <Avatar
              src="/hackers/rashid.jpg"
              sx={{ height: '48px', width: '48px' }}
              mr={3}
              st
            />
            <Box align="left" fontSize={3}>
              <Heading>Rashid Al-Abri</Heading>
              <Text fontSize={2} color="green.1">
                Club Leader from Oman in Victoria, BC, Canada
              </Text>
            </Box>
          </Flex>
        </SecondQuote>{' '}
      </Container>
      <Flex justify="center" bg="snow" color="black">
        <Container width={1} py={[4, 5]} sx={{ textAlign: ['left', 'center'] }}>
          <Heading
            px={3}
            mt={[3, 4]}
            mb={[3, 4]}
            mx="auto"
            as="h1"
            sx={{ fontSize: [5, 6] }}
          >
            A few of our amazing donors.
          </Heading>
          <DonorGrid mt={4} mb={4}>
            {Object.keys(donors).map(name => (
              <DonorListing key={name} name={name} url={donors[name]} />
            ))}
          </DonorGrid>
          <Heading px={3} sx={{ fontWeight: 'normal', mt: 2 }}>
            and many more…
          </Heading>
        </Container>
      </Flex>
      <Container {...contentContainer}>
        <Row my={5} {...content}>
          <Heading {...subhline} mb={4} sx={{ fontSize: [4, 5] }}>
            These fabulous companies donate their products to us.
          </Heading>
          <Sponsors />
        </Row>
      </Container>
      <Footer />
    </Box>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      sprig: Object.keys(context.query).includes('gl')
    }
  }
}
