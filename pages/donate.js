import React from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Card,
  Link as A,
  Text,
  Avatar,
  Grid
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Sponsors from '../components/donate/sponsors'
import donors from '../components/donate/donors.json'
import ForceTheme from '../components/force-theme'

const Header = styled(Box)`
  background: url('/pattern.svg');
  > div {
    display: grid;
    grid-gap: 24px;
    align-items: center;
    @media screen and (min-width: 48em) {
      grid-template-columns: 3fr 2fr;
    }
  }
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

const DonateSheet = styled(Sheet)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.0625), 0 16px 32px rgba(0, 0, 0, 0.125) !important;
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
  ); ;
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

const title = 'Donate – Hack Club'
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

export default function Donate() {
  return (
    <Box>
      <Meta
        as={Head}
        title={title}
        description={desc}
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />
      <ForceTheme theme="light" />
      <Nav color="muted" />
      <Header pt={[5, 5, 6]}>
        <Grid
          color="black"
          sx={{ maxWidth: '64rem', mx: 'auto' }}
          align="left"
          py={3}
          px={3}
          columns={[1, '3fr 2fr']}
        >
          <Container sx={{ maxWidth: '48rem' }}>
            <Heading
              sx={{ fontSize: [3, 4], textTransform: 'uppercase' }}
              color="primary"
              caps
            >
              Donate to Hack Club
            </Heading>
            <Heading
              sx={{ fontSize: ['48px', '54px'], maxWidth: '32rem', my: 2 }}
            >
              We rely on people like you to bring coding to the world.
            </Heading>
            <Box sx={{ fontSize: ['24px', '24px'] }}>
              Contribute today to empower the next generation. Help start a Hack
              Club at every high school.
            </Box>
            <Text sx={{ mt: 1, display: 'block' }} fontSize={2} color="muted">
              Your contribution is tax-deductible.
              <br />
              Hack Club is a 501(c)(3) non-profit with the EIN 81-2908499.
            </Text>
          </Container>
          <DonateSheet
            bg="primary"
            color="white"
            align="center"
            style={{
              backgroundImage: `radial-gradient( ellipse farthest-corner at top left, #e4732d 0%, #e42d42 100%)`,
              position: 'relative',
              width: '100%',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Heading
              mb={1}
              fontSize={5}
              sx={{ color: 'white', fontSize: '36px' }}
            >
              Become a patron
            </Heading>
            <Text color="snow" fontSize={1} sx={{ mb: 2, display: 'block' }}>
              Just $3 supports a student for a month
            </Text>
            <Button
              as="a"
              href="https://bank.hackclub.com/donations/start/hq"
              width={1}
              chevronRight
              inverted
              sx={{ width: '100%', bg: 'white', color: 'red', py: 3 }}
            >
              Donate now »
            </Button>
          </DonateSheet>
        </Grid>
      </Header>
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
            <A sx={{ color: 'blue' }} href="mailto:donate@hackclub.com">
              donate@hackclub.com
            </A>{' '}
            if you’re interested in making a contribution with an unsupported
            token or have questions.
          </Box>
          <Box mb={4}>
            <Button
              href="https://commerce.coinbase.com/checkout/ae7ad42d-0dcd-4e9d-8dc7-ba78648a58cd"
              target="_blank"
              bg="blue"
              as="a"
            >
              Donate with cryptocurrency »
            </Button>
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
