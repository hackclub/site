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
import Photo from '../../components/photo'
import Image from 'next/image'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Sponsors from '../../components/donate/sponsors'
import donors from '../../components/donate/donors.json'
import Footer from '../../components/footer'

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

Sheet.defaultProps = {
  sx: {
    maxWidth: '52rem',
    fontSize: 3,
    p: [4, 5],
    color: 'white'
  }
}
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
      </Header>
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
        <Button
          as="a"
          href="/philanthropy"
          target="_blank"
          mb={4}
          sx={{
            fontSize: '1em !important',
            background: 'slate',
            textAlign: 'center'
          }}
        >
          Learn more about Hack Club
        </Button>
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
