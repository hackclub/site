import { keyframes } from '@emotion/react'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import NextLink from 'next/link'
import useSWR from 'swr'
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text
} from 'theme-ui'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Icon from '../components/icon'
import Nav from '../components/nav'
import Header from '../components/slack/header'
import fetcher from '../lib/fetcher'
import { thousands } from '../lib/members'
import SlackEvents from '../components/slack/slack-events'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

const zoomSlide = keyframes({
  from: { backgroundPosition: '-32px bottom' },
  to: { backgroundPosition: '32px bottom' }
})

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const SlackPage = () => {
  const { data: millionCount } = useSWR(
    'https://jia.haas.hackclub.com/api/currentNumber',
    fetcher,
    { refreshInterval: 10_000 }
  )
  
  gsap.registerPlugin(ScrollTrigger)

  const ref = useRef(null);
  const horizontal = useRef(null);

  
  let timeline = gsap.timeline();

  useLayoutEffect(() => {
    timeline.to(".oblong", {
      scrollTrigger: {
        trigger: ".onboard",
        start: 'top top',
        end: `+=500`, // todo: change this
        scrub: true,
        pin: 1,
      },
      ease: 'none'
    })
  },[])
  
  return (
    <>
      <Meta
        as={Head}
        name="Join our Slack"
        description={`The Hack Club Slack is a community of ${thousands}k+ high school hackers around the world. Chat, meet new friends, code together, share your work.`}
        image="https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/02020-07-25_d2dd4egb1th5k71w4uj0abbfkvvtnc01.jpeg"
      />
      <ForceTheme theme="light" />
      <Nav />
      <Header />
      <Container sx={{ py: [4, 5] }}>
        <Heading
          as="h2"
          variant="title"
          sx={{ mt: [4, 5], color: 'black', maxWidth: 'copyUltra' }}
        >
          No commitments, just exploration...
        </Heading>
        <Text
          as="p"
          variant="subtitle"
          sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3 }}
        >
          Across 2,000 public channels, find the community for your favorite programming language, ask for advice, or just hang out. Find the worlds that suit you.
        </Text>
        <Grid
          columns={[2, 9, 12]}
          gap={4}
          sx={{
            bg: 'red',
            py: [3, 4],
            maxHeight: '100%',
            h3: { my: 0 },
            '> div': {
              px: [2, 3],
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gridColumn: ['span 2', 'span 3']
            },
            a: {
              position: 'relative',
              ':hover,:focus': {
                svg: {
                  transform: 'translateX(28px) translateY(-28px)',
                  opacity: 0
                }
              }
            },
            svg: {
              position: 'absolute',
              top: 2,
              right: 2,
              fill: 'white',
              transition:
                'transform 0.25s ease-in-out, opacity 0.25s ease-in-out'
            },
            h3: {
              variant: 'text.headline',
              color: 'white',
              lineHeight: 'title',
              m: 0,
              '+ p': {
                mt: 2,
                color: 'white',
                opacity: 0.75,
                fontSize: 2,
                lineHeight: 'caption'
              }
            }
          }}
        >
          <NextLink href="/ship" passHref>
            <Card
              as="a"
              variant="interactive"
              sx={{
                gridColumn: ['span 2', 'span 5'],
                bg: 'blue',
                backgroundImage: t => t.util.gx('cyan', 'blue')
              }}
            >
              <Icon glyph="external" size={24} />
              <Heading as="h3" variant="headline">
                #ship
              </Heading>
              <Text as="p">Launch your latest projects & get feedback</Text>
            </Card>
          </NextLink>
          <Card
            as="a"
            href="https://scrapbook.hackclub.com/"
            variant="interactive"
            sx={{
              gridColumn: ['span 2', 'span 5'],
              bg: 'dark',
              backgroundImage: t => t.util.gx('yellow', 'orange')
            }}
          >
            <Icon glyph="external" size={24} />
            <Heading as="h3" variant="headline">
              #scrapbook
            </Heading>
            <Text as="p">A daily diary of project updates</Text>
          </Card>
          <Card
            bg="red"
            sx={{
              gridColumn: ['span 2 !important', 'span 2 !important'],
              gridRow: ['span 1 !important', 'span 3 !important'],
              writingMode: ['lr-tb', 'tb-rl']
            }}
          >
            <Heading as="h3">#counttoamillion</Heading>
            <Text as="p" sx={{ display: 'flex', alignItems: 'baseline' }}>
              We’re at{' '}
              <Badge
                variant="outline"
                as="span"
                sx={{ ml: [2, 0], mt: [0, 2], px: [2, 0], py: [0, 2] }}
              >
                {millionCount ? withCommas(millionCount.number) : '???'}
              </Badge>
              !
            </Text>
          </Card>
          <Card
            sx={{
              backgroundImage:
                'url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/12020-07-25_fqxym71bmqjr1d35btawn5q6ph1zt0mk.png)',
              backgroundColor: 'yellow',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
              gridColumn: ['span 2', 'span 3 !important', 'span 4 !important'],
              h3: { opacity: 0 }
            }}
          >
            <h3>#design</h3>
          </Card>
          <Card
            bg="dark"
            sx={{ h3: { color: 'green', textShadow: '0 0 4px currentColor' } }}
          >
            <h3>#code</h3>
          </Card>
          <Card
            bg="purple"
            sx={{
              backgroundSize: '100%',
              backgroundPosition: 'center',
              textShadow: 'text',
              gridColumn: ['span 2', 'span 3 !important'],
              backgroundImage: t => t.util.gx('purple', '#C153EE')
            }}
          >
            <h3>#music</h3>
          </Card>
        </Grid>
        <Flex
            sx={{
              gridRow: [null, 'span 2'],
              gridColumn: ['span 2', 'span 3'],
              maxHeight: '100%',
              overflow: 'hidden',
              bg: 'cyan',
            }}
        >
          <Heading
              as="h2"
              variant="subheadline"
              sx={{
                mt: 0,
                mb: 0,
                textTransform: 'uppercase',
                letterSpacing: 'headline'
              }}
          >
            Live from our&nbsp;Slack
          </Heading>
          <SlackEvents />
        </Flex>
        <Text as="h1" variant="title" sx={{ mt: [4, 5], mb: 3 }}>Where the makers hang out...</Text>
      </Container>
        <Grid sx={{
          backgroundImage: t => t.util.gx('yellow', '#F58695'),
          width: '100vw',
          height: '100vh',
          justifyItems: 'center',
          alignItems: 'center',
          display: 'grid',
        }}>
          <Box>
            <Text as="p" variant="" sx={{ fontSize: [2, 3], mt: 3, color: 'white' }}>Hack Clubbers</Text>
            <Text as="h1" variant="title" sx={{ mb: 3, color: 'white' }}>Have built some pretty cool things on the Slack...</Text>
          </Box>
          <Box id="onboard">
            <Text as="h1" variant="title" sx={{ mb: 3, color: 'white' }}>Thing number two</Text>
          </Box>
          <Box id="oblong">
            <Text as="h1" variant="title" sx={{ mb: 3, color: 'white' }}>Thing number two</Text>
          </Box>
        </Grid>
      <Footer />
    </>
  )
}

export default SlackPage
