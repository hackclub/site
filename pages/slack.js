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
  Image,
  Link,
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
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const SlackPage = () => {
  const { data: millionCount } = useSWR(
    'https://jia.haas.hackclub.com/api/currentNumber',
    fetcher,
    { refreshInterval: 10_000 }
  )
  const [color, setColors] = useState(['red', '#F58695'])
  const [totalMessagesOblong, setTotalMessagesOblong] = useState(0)

  const triggerRef = useRef(null);
  const nameInputRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    const sections = gsap.utils.toArray(".project");
    
    const projects = gsap.to(sections,
        {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          duration: 1,
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top top",
            end: () => "+=" + document.querySelector(".container").offsetWidth,
            scrub: 1.25,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            snap: 0.5 * (1 / (sections.length - 1))
          },
          onUpdate: function() {
            const progress = this.progress();
            if (progress < 0.25) {
              setColors(['red', '#F58695']);
            } else if (progress < 0.5) {
              setColors(['orange', '#F2A510']);
            } else if (progress < 0.75) {
              setColors(['yellow', '#FAE078']);
            } else {
              setColors(['green', '#51F5C5']);
            }
          }
        }
    )
    return () => {
      projects.kill();
    }
  }, []);

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
      <Header nameInputRef={nameInputRef} />
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
          Across 2,000 public channels, find the community for your favorite
          programming language, ask for advice, or just hang out. Find the
          worlds that suit you.
        </Text>
        <Grid
          columns={[2, 9, 12]}
          gap={4}
          sx={{
            py: [3, 4],
            maxHeight: '100%',
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
            overflow: 'hidden'
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
        <Text as="h1" variant="title" sx={{ mt: [4, 5], mb: 3 }}>
          Where the makers hang out...
        </Text>
      </Container>
      <Box sx={{ msOverflowX: 'hidden', overflowX: 'hidden' }}>
      <Grid
        sx={{
          backgroundImage: t => t.util.gx(color[0], color[1]),
          width: '400%',
          height: '100vh',
          justifyItems: 'center',
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'nowrap',
        }}
        className="container"
        ref={triggerRef}
      >
        <Project>
          <Box>
            <Text
              as="p"
              variant="title"
              sx={{ fontSize: [2, 3], mt: 3, color: 'white' }}
              id="start"
            >
              Hack Clubbers
            </Text>
            <Text as="h1" variant="title" sx={{ mb: 3, color: 'white', width: 'copyUltra' }}>
              Have built some pretty cool things on the Slack...
            </Text>
          </Box>
        </Project>
        <Project>
          <Box>
            <Text as="h1" variant="title" sx={{ width: 'copyUltra' }}>
              A free domain service, created by teen hackers on the Hack Club
              Slack.
            </Text>
            <Text as="p" variant="subtitle" sx={{ width: 'copyPlus' }}>
              Obl.ong’s team organizes in #oblong Velit voluptate deserunt
              consequat. Velit voluptate deserunt consequat.Velit voluptate
              deserunt consequat.
            </Text>
          </Box>
        </Project>
        <Project>
          <Box>
            <Text as="h1" variant="title" sx={{ width: 'copyUltra' }}>
              An open source VPN, to help Hack Clubbers connect to the internet and each other.
            </Text>
            <Text as="p" variant="subtitle" sx={{ width: 'copyPlus' }}>
              Burrow&apos;s team organizes in #burrow Velit voluptate deserunt consequat. Velit
              voluptate deserunt consequat.Velit voluptate
              deserunt consequat.
            </Text>
          </Box>
        </Project>
        <Project>
          <Box>
            <Text as="h1" variant="title" sx={{ width: 'copyUltra' }}>
              Free, powerful, and versatile compute infrastructure for all high school hackers.
            </Text>
            <Text as="p" variant="subtitle" sx={{ width: 'copyPlus' }}>
              Nest&apos;s team organizes in #nest Velit voluptate deserunt consequat. Velit
              voluptate deserunt consequat.Velit voluptate
              deserunt consequat.
            </Text>
          </Box>
        </Project>
      </Grid>
      </Box>
      <Container sx={{ py: [4, 5] }}>
        <Flex sx={{ gap: '2rem' }}>
          <Quote
            text="I knew it's where I wanted to be"
            person="Shawn"
            age={18}
            location="VT"
          />
          <Quote
              text="I felt so free- there were no expectations"
              person="JC"
              age={17}
              location="VT"
          />
          <Quote
              text="Finally, I found my people!"
              person="Cheru"
              age={16}
              location="VT"
          />
        </Flex>
        <Flex sx={{ backgroundColor: '#F9FAFC', mt: '2rem', borderRadius: 12, overflowX: 'hidden', height: '40rem' }}>
          <Box sx={{ width: '50%', paddingX: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box>
            <Text as="h1" variant="title" sx={{ mb: 3 }}>
              There’s a whole new world for you to discover.
            </Text>
            <Link href="#" sx={{ mt: [4, 5], mb: 3, cursor: 'pointer', textDecoration: 'none', fontSize: '24px', fontWeight: 500, placeItems: 'center' }}>
              I&apos;m ready to join <Icon glyph='view-forward' size={24} />
            </Link>
            </Box>
          </Box>
          <Image
              src="https://s3-alpha-sig.figma.com/img/467f/75b6/52e44d8d65abfb34731cfb11e39d72a8?Expires=1704067200&Signature=QDtskHIwqRO3u38E8xYWm-vXEYxkZGjImaFADUintP4fOYAgeJfypzYXcgJtxrYmzYqA4MXXQ7wO9k4o86ikFUT~hpcATC3YkznSYY6fQ8w~3ZkwLLfJs5oAhmXmFGAovYOzeVdKhCKpOFOF2CEhYpwWW6I-96S1NW1yTZds6tpTlEJIqJ-oTbLf-kUJdgghvs5I9GP4JclHk9LadD-t4Qidzr5hl81NZ76~u2F2PV~W~GFdDfwMA04MOlz7vPAqIURqxAuVWAmE6Vz0lsOb2h~KvNTitRc5JLsxvduCWAjo~QsBd0bSnuloYn~RMJeiDAtmvqrsuG9B5XXEHu8jLA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              sx={{ width: '50%', height: '40rem', objectFit: 'cover' }}
          />
        </Flex>
      </Container>
      <Footer />
    </>
  )
}

function Project({ children, sx }) {
  return (
      <Box sx={{ color: 'white', width: '100vw', height: '100vh', display: 'grid', alignItems: 'center', justifyContent: 'center', sx }} className="project">
        {children}
      </Box>
  )
}

function Quote({ text, person, age, location }) {
  return (
      <Box sx={{ p: '32px', borderRadius: 12, backgroundColor: '#F9FAFC', width: 'full' }}>
        <Text as="h3" variant="title" sx={{ mb: 3, fontSize: ['36px', 4, 5] }}>"{text}"</Text>
        <Text as="p" variant="paragraph">{person}, {age} from {location}</Text>
      </Box>
  )
}

export default SlackPage
