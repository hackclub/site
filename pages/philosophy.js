import Meta from '@hackclub/meta'
import Head from 'next/head'
import { Box, Heading, Container, Text, Button, Link } from 'theme-ui'
import Nav from '../components/nav'
import styled from '@emotion/styled'
import Footer from '../components/footer'
import NextLink from 'next/link'

const Header = styled(Box)`
  color: white;
  background-image: linear-gradient(
    32deg,
    rgb(207, 45, 228) 0%,
    rgb(228, 45, 66) 64%,
    rgb(206, 41, 60) 100%
  );
  clip-path: polygon(0% 0%, 100% 0, 100% 100%, 0% 90%);
  > div {
    position: relative;
  }
`

const Seal = styled(Box)`
  border-radius: 9999px;
  background-color: white;
  color: black;
  mix-blend-mode: screen;
  text-align: center;
  width: 12rem;
  height: 12rem;
  position: absolute;
  margin-top: -1rem;
  transform: rotate(4deg);
  @media screen and (min-width: 32em) {
    transform: rotate(3deg);
    margin-top: -3rem;
  }
`

const Ultraline = styled(Heading)`
  line-height: 1.125 !important;
  text-transform: uppercase;
  color: 'white';
  caps: true;
  &:nth-of-type(2) {
    padding-left: 1.5rem;
    @media screen and (min-width: 48em) {
      padding-left: 6rem;
    }
  }
  &:nth-of-type(3) {
    text-align: center;
  }
  &:nth-of-type(4) {
    text-align: right;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      clip-path: polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%);
      background-color: rgba(252, 252, 252, 0.625);
      mix-blend-mode: overlay;
      right: -0.5rem;
      width: 9.5rem;
      height: 2.5rem;
      @media screen and (min-width: 32em) {
        width: 20rem;
        height: 5.5rem;
      }
    }
  }
`

Ultraline.defaultProps = { sx: { fontSize: [48, 54, 72, 96] } }

const Row = styled(Container)`
  px: 3;
  py: [4, 5];
  color: 'black';
  display: grid;
  text-align: left;
  h2 {
    line-height: 1;
    margin-bottom: 18px;
  }
  @media screen and (min-width: 48em) {
    grid-gap: 24px;
    grid-template-columns: 2fr 3fr;
  }
`

Row.defaultProps = { sx: { px: 3, py: [3, 4], color: 'black' } }

const Super = styled(Text)`
  background-color: rgb(228, 115, 45);
  clip-path: polygon(4% 0%, 100% 0%, 96% 100%, 0% 100%);
  color: rgb(255, 255, 255);
  display: inline-block;
  padding-bottom: 12px;
  padding-left: 18px;
  padding-right: 18px;
`

export default function Philosophy() {
  return (
    <Box sx={{ bg: 'white', color: 'black', minHeight: '100vh' }}>
      <Nav />
      <Meta
        as={Head}
        title="Philosophy"
        description="Read about Hack Club, a network of high school computer science clubs. We want to make building apps and websites accessible to everyone through programming clubs at every high school."
        image="https://cloud-cz9a6kt0a-hack-club-bot.vercel.app/0social-photo_2.jpg"
      />
      <Box>
        <Header>
          <Container
            width={1}
            sx={{ maxWidth: '56rem!important', py: '72px', px: 3 }}
            px={3}
            align="left"
          >
            <Ultraline>We're</Ultraline>
            <Ultraline>at our best</Ultraline>
            <Ultraline>when we're</Ultraline>
            <Ultraline>making.</Ultraline>
            <Seal pt={[3, 4]}>
              <Heading
                fontSize={[1, 2]}
                sx={{
                  fontWeight: '400',
                  marginBlockStart: '0em',
                  fontSize: ['16px', '18px'],
                  textTransform: 'uppercase'
                }}
                caps
              >
                The Hack Club
              </Heading>
              <Heading
                fontSize={[3, 4]}
                sx={{
                  fontWeight: '800',
                  marginBlockStart: '0em',
                  textTransform: 'uppercase'
                }}
              >
                Philosophy
              </Heading>
            </Seal>
          </Container>
        </Header>
        <Row py={4} mt={[0, 4]}>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] }}
            color="rgb(228, 45, 66);"
          >
            Coding is a <Super>superpower.</Super>
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>
            Learning to code is uniquely like gaining a superpower: it converts
            you from a consumer to a creator. Suddenly, computers become a tool
            for creating.
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] }}
            color="rgb(207, 45, 228);"
          >
            Make, from anywhere.
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>
            There’s never been a better time for making: anywhere in the world,
            anyone with a laptop and an internet connection can learn to make an
            app. Building things has never been so globally democratized.
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] }}
            color="rgb(115, 45, 228);"
          >
            Hack, hack, hack.
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>
            <strong>
              The goal of Hack Club is to help you become a hacker.
            </strong>{' '}
            We want a space at every school where people are making interesting
            things with code, every week. Schools don’t provide that, so we’re
            creating it in every school to make building things accessible to
            everyone.
          </Box>
        </Row>
        <Row>
          <Heading as="h2" sx={{ fontSize: [36, 48] }} color="rgb(45, 66, 228)">
            Start building.
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>
            Most coding classes teach you programming concepts instead of how to
            write real code—it’s like trying to learn carpentry without any
            wood. So at Hack Club, you learn to code entirely through building
            things. You start with no experience and build and ship a project
            every meeting.
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] }}
            color="rgb(41, 143, 206)"
          >
            Learn as you build.
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>
            Just as the best carpenters didn’t learn in the classroom, neither
            did the best programmers. Through our{' '}
            <Link href="/workshops">workshops</Link>, you’ll be walked through
            building projects. Starting out, you won’t understand how the code
            works, but you’ll build understanding as you go. You’ll get stuck
            along the way, but we’re here to help.
          </Box>
        </Row>
        <Row>
          <Heading
            as="h2"
            sx={{ fontSize: [36, 48] }}
            color="rgb(36, 181, 165)"
          >
            Be part of a community.
          </Heading>
          <Box sx={{ fontSize: [3, 3] }}>
            Hack Club gives you a worldwide community of thousands of other
            young makers to talk to. We’re artists, writers, engineers,
            tinkerers, campers, filmmakers, volunteers. We make things. We help
            one another. We have fun. Join us.
          </Box>
        </Row>
        <Box
          sx={{
            backgroundImage: t => t.util.gx('orange', 'red'),
            margin: 'auto',
            width: '600px',
            maxWidth: '90%',
            mb: 4,
            borderRadius: 8,
            color: 'white',
            textAlign: 'center',
            p: 4
          }}
        >
          <Heading as="h1" sx={{ fontSize: 5, mb: 2 }}>
            Join the movement!
          </Heading>
          <Button
            mr={[0, 3]}
            mb={[3, 0]}
            sx={{
              bg: 'white',
              color: 'red',
              display: ['block', 'inline-block'],
              mx: 'auto'
            }}
            as="a"
            href="https://apply.hackclub.com"
          >
            Start a club
          </Button>
          <NextLink href="/slack" passHref>
            <Button sx={{ bg: 'white', color: 'red' }} as="a">
              Join our Slack
            </Button>
          </NextLink>
        </Box>
      </Box>
      <Footer light />
    </Box>
  )
}
