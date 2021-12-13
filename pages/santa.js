import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import { Box, Container, Heading, Button } from 'theme-ui'
import styled from '@emotion/styled'
import Snow from 'resnow'
import Footer from '../components/footer'
import Link from 'next/link'

const Hero = styled(Box)`
  background-image: linear-gradient(
    to right bottom,
    rgb(45, 158, 228),
    rgb(41, 143, 206)
  );
  min-height: 100vh;
  position: relative;
  text-align: center;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const Lead = styled(Box)`
  font-size: 24px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 18px;
  margin-bottom: 18px;
  color: rgb(249, 249, 250);
  max-width: 48rem;
`

const Page = () => (
  <Box sx={{ overflowX: 'hidden' }}>
    <Meta
      as={Head}
      title="Hack Club Secret Santa – Holiday 2021"
      description="Find your holiday zen this year with Hack Club’s Secret Santa."
      image="https://cloud-9kgqrlg7o-hack-club-bot.vercel.app/0santa.png"
    />
    <Nav />
    <Hero py={4}>
      <Snow />
      <Container px={3} py={[3, 4]}>
        <img
          src="https://cloud-k3gxm6uem.vercel.app/2020-12-07_0vmfbtyfzec2kqeujbwmp3q4bu50pr0y.png"
          alt="Illustration of a holiday themed Orpheus"
          width={384}
          height={384}
        />
        <Heading
          sx={{ fontSize: [3, 4], textTransform: 'uppercase', color: 'white' }}
          bold
          caps
        >
          2021 holidays
        </Heading>
        <Heading
          as="h1"
          sx={{ fontSize: [5, 6], color: 'white', margin: 'auto' }}
        >
          Hack Club Secret Santa
        </Heading>
        <Lead
          fontSize={[3, null, 4]}
          color="snow"
          maxWidth={48}
          my={3}
          mx="auto"
        >
          Christmas time has come and it's time for some fun! The holiday season
          is among us and the elves have assembled, which means its time for
          gift-giving to begin! The magical elf will assign you a partner, send
          them something fun, & you’ll get your own gift in the mail just in
          time for the holidays!
          <span role="img" aria-label="Present emoji" children={' 🎁'} />
        </Lead>
        <Link href="https://hack.af/santa-signup" passhref>
          <Button chevronRight>Register Now</Button>
        </Link>
      </Container>
    </Hero>
    <Footer />
  </Box>
)
export default Page
