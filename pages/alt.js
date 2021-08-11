import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Flex,
  Link,
  Text
} from 'theme-ui'
import styled from '@emotion/styled'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import { motion } from 'framer-motion'
import Photo from '../components/photo'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Icon from '../components/icon'
import BGImg from '../components/background-image'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Footer from '../components/footer'
let Highlight = styled(Text)`
  color: inherit;
  border-radius: 1em 0 1em 0;
  background: linear-gradient(
    -100deg,
    rgba(250, 247, 133, 0.33),
    rgba(250, 247, 133, 0.66) 95%,
    rgba(250, 247, 133, 0.1)
  );
`
Highlight = Highlight.withComponent('mark')
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}
const Feature = ({ icon, color, name, desc, children, ...props }) => (
  <Box {...props}>
    {children || (
      <Box
        as="span"
        sx={{
          width: 'fit-content',
          bg: color,
          borderRadius: 18,
          lineHeight: 0,
          p: 2,
          mb: 1,
          display: 'inline-block',
          transform: ['scale(0.75)', 'none'],
          transformOrigin: 'bottom left',
          boxShadow:
            'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Icon glyph={icon} size={48} />
      </Box>
    )}
    <Box>
      <Heading as="h3" variant="headline" mb={2}>
        {name}
      </Heading>
      <Text
        as="p"
        variant="subtitle"
        sx={{ mt: 0, pb: 2, a: { variant: 'styles.a', color: 'blue' } }}
      >
        {desc}
      </Text>
    </Box>
  </Box>
)

export default function Page({ dataPieces }) {
  const experiments = [
    ...dataPieces.sort(() => 0.5 - Math.random()),
    '🚢 New ship by Sam Poder',
    '256 Slack Members Online',
    '💸 $10,000 just raised!'
  ]
  const Node = ({ text }) => (
    <Box
      bg="dark"
      m="1"
      px="2"
      sx={{
        borderRadius: 4,
        flexGrow: 1,
        maxHeight: '30px',
        fontSize: 2,
        opacity: '0.3',
        border: '1px solid',
        borderColor: 'steel',
        flexShrink: 0
      }}
    >
      {text}
    </Box>
  )
  return (
    <>
      <ForceTheme theme="light" />
      <Box bg="darker" pt="5" pb="3" color="white">
        {' '}
        <Nav dark />
        <Box
          bg="darker"
          color="white"
          sx={{ position: 'relative', overflow: 'hidden', maxWidth: '100vw' }}
        >
          {[...Array(11)]
            .map(u => [Math.random() * -100, randomIntFromInterval(5, 15)])
            .map((u, i) => (
              <motion.div
                animate={{
                  x: [-120 + u[0], 0 + u[0]].map(x =>
                    i % 2 == 0 ? x : x * -1 - 240 - u[0] * -1
                  )
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'linear'
                }}
                key={'key-animate-' + i}
                className="relative"
                style={{ flexGrow: 1, flexShrink: 0 }}
              >
                <Flex
                  bg="darker"
                  sx={{
                    p: 1,
                    pb: 0,
                    overflow: 'hidden',
                    maxHeight: '422px',
                    flexBasis: 'auto',
                    width: ['130vw', '130vw', '130vw', null, '110vw']
                  }}
                >
                  {dataPieces.slice(0 + 8 * i, 8 + 8 * i).map((u, i) => (
                    <Node text={u} />
                  ))}
                </Flex>
              </motion.div>
            ))}
          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%'
            }}
          >
            <Box
              m="1"
              bg="dark"
              sx={{
                borderRadius: 8,
                flexGrow: 1,
                maxHeight: '336px',
                width: '90vw',
                maxWidth: '700px',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                boxShadow: 'card',
                py: 4
              }}
            >
              <Box>
                <Heading
                  as="h1"
                  sx={{
                    fontSize: 5,
                    marginBlockEnd: '0em',
                    marginBlockStart: '0em'
                  }}
                >
                  Welcome to the
                </Heading>
                <Heading
                  as="h1"
                  sx={{
                    fontSize: 7,
                    WebkitTextStroke: 'currentColor',
                    WebkitTextStrokeWidth: ['2px', '3px'],
                    WebkitTextFillColor: 'transparent',
                    color: 'blue',
                    marginBlockEnd: '0em',
                    marginBlockStart: '0em',
                    mt: '-16px'
                  }}
                >
                  <i>HACKERVERSE</i>
                </Heading>
                <Box sx={{ fontSize: 2, px: 5, mt: '-10px' }}>
                  We're a nonprofit network of high school coding clubs and
                  makers around the world.{' '}
                  <strong>Applications are now open.</strong>
                </Box>
                <Flex sx={{ justifyContent: 'center', mt: 2 }}>
                  <Button mr={2} variant="cta">
                    Start a Club
                  </Button>
                  <Button variant="outline">Join the Slack</Button>
                </Flex>
              </Box>{' '}
            </Box>{' '}
          </Box>
        </Box>
      </Box>
      <Box as="section" sx={{ py: [4, 5], color: 'black' }}>
        <Container>
          <Text as="p" variant="eyebrow">
            The rundown
          </Text>
          <Heading as="h2" variant="title">
            Clubs discovering the{' '}
            <Text
              as="span"
              sx={{
                borderRadius: 'default',
                px: 2,
                mx: [-2, 0],
                whiteSpace: 'nowrap',
                color: '#5d114c',
                bg: 'rgb(255, 212, 64)'
              }}
            >
              joy of code
            </Text>
            .
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus' }}>
            Hack Clubs typically meet for 1.5 hours each week in high schools,
            makerspaces, community centers, churches, and any other venue where
            teenagers can gather. As a club leader, you get members (mostly
            beginners) started on something to learn/create, then members work
            at their own pace, building websites, apps, & games, and presenting
            them at the end.
          </Text>
          <Grid columns={[null, null, 2, '3fr 2fr']} gap={[3, 4]} pt={[3, 3]}>
            <Photo
              src="https://dl.airtable.com/.attachmentThumbnails/904cf56ceac6b0921eceae02958dcd29/5851864a"
              alt="Summer Creek Hack Club meeting, February 2020"
              width={3000}
              height={2550}
              showAlt
            />
            <Grid
              columns="auto 1fr"
              sx={{
                gridColumnGap: 3,
                span: {
                  width: 36,
                  height: 36,
                  borderRadius: 24,
                  display: 'inline-block',
                  fontSize: 2,
                  lineHeight: '30px',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  border: '3px solid currentColor'
                },
                p: { my: 0 },
                strong: { display: 'block' }
              }}
            >
              <Text as="span" color="green">
                1
              </Text>
              <Text as="p" variant="subtitle">
                <strong>
                  A group of teens, many beginners, gather to start coding.
                </strong>
                The leader (that’s you!) presents for a few minutes, getting the
                group started building something new.
              </Text>
              <Text as="span" color="cyan">
                2
              </Text>
              <Text as="p" variant="subtitle">
                <strong>Everyone gets hacking, individually.</strong> Not
                hacking bank accounts, being creative and{' '}
                <a>making something awesome</a>.
              </Text>
              <Text as="span" color="blue">
                3
              </Text>
              <Text as="p" variant="subtitle">
                <strong>To end, everyone demos their work.</strong>
                As a leader, you’re cultivating a community of makers. Each
                member showing off their work builds momentum & motivation.
              </Text>
            </Grid>
          </Grid>
          <Grid
            columns={[null, '1fr 2fr']}
            mt={[3, 5]}
            sx={{ maxWidth: 'copyUltra', mx: 'auto' }}
          >
            <Heading
              as="h3"
              variant="headline"
              sx={{ fontSize: [4, 5], mb: 0 }}
            >
              Go beyond club meetings.
            </Heading>
            <Text
              as="p"
              variant="lead"
              sx={{ mt: 0, a: { variant: 'styles.a', color: 'blue' } }}
            >
              Hack Clubs attend and run{' '}
              <a href="https://hackathons.hackclub.com/">hackathons</a> like{' '}
              <a href="https://windyhacks.com">Windy&nbsp;City&nbsp;Hacks</a> &{' '}
              <a href="https://www.sfchronicle.com/bayarea/article/Hack-the-Fog-makes-history-as-San-12729895.php">
                Hack the Fog
              </a>
              , run summer programs like{' '}
              <a href="https://web.archive.org/web/20200808171549/http://thecspn.com/?p=43434">
                Hack Camp
              </a>
              , and compete in events like the{' '}
              <a href="http://www.congressionalappchallenge.us">
                Congressional App Challenge
              </a>
              . The&nbsp;hack’s the limit.
            </Text>
          </Grid>
        </Container>
      </Box>
      <Box
        as="section"
        sx={{
          py: 6,
          bg: 'dark',
          color: 'white',
          'h2,p': { textShadow: 'text' },
          textAlign: [null, 'center'],
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <BGImg
          src="/golden-train.png"
          width={2048}
          height={1170}
          alt="Hack Clubbers on the 2021 Hacker Zephyr"
        />
        <Container>
          <Text as="p" variant="eyebrow" sx={{ color: 'white', opacity: 0.75 }}>
            ~ The Hackerverse ~
          </Text>
          <Heading as="h2" variant="title">
            By the students, for the students.
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus', mx: 'auto' }}>
            Learning to code is uniquely like gaining a superpower—turning you
            from a consumer of technology into a creator. So it shouldn’t be
            taught like a class—it should be a creative, inclusive space. To
            foster this environment,{' '}
            <Highlight>every&nbsp;Hack&nbsp;Club is student-led</Highlight> &
            members make self-directed projects.
          </Text>
          <Button
            as="a"
            href="https://hackclub.com/philosophy/"
            variant="ctaLg"
            sx={{
              background: 'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)'
            }}
          >
            Our philosophy →
          </Button>
        </Container>
      </Box>{' '}
      <Box bg="snow" color="black" py={[5, 6]}>
        <Container sx={{ textAlign: ['left', 'center'] }}>
          <Text as="p" variant="eyebrow">
            Next steps
          </Text>
          <Heading as="h2" variant="title">
            Apply today to{' '}
            <Text
              as="span"
              sx={{
                borderRadius: 'default',
                px: 2,
                ml: [-2, 0],
                whiteSpace: 'nowrap',
                color: 'white',
                bg: '#6f31b7'
              }}
            >
              start your club
            </Text>
            .
          </Heading>
          <Text as="p" variant="lead" mt={3} color="slate">
            It’s all-online, free, & takes under an hour. We’ll help from there!
          </Text>
          <Grid
            pt={[3, 4]}
            pb={[4, 5]}
            gap={[4, 3, 4]}
            columns={[null, 3]}
            sx={{
              textAlign: 'left',
              '> a, > div': {
                borderRadius: 'extra',
                boxShadow: 'elevated',
                px: [3, null, 4],
                py: [4, null, 5]
              },
              span: {
                boxShadow:
                  '-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)'
              },
              svg: { fill: 'currentColor' }
            }}
          >
            <Card
              as="a"
              href="https://apply.hackclub.com/"
              variant="interactive"
              sx={{
                background:
                  'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
                color: 'white',
                svg: { color: 'rgb(51, 142, 218)' }
              }}
            >
              <Feature
                icon="send"
                color="white"
                name="1. Application"
                desc="Start by telling us about your club & who’s leading it."
              />
            </Card>
            <Card
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)',
                color: 'white',
                svg: { color: 'rgb(236, 55, 80)' }
              }}
            >
              <Feature
                icon="emoji"
                color="white"
                name="2. Onboarding call"
                desc="Hop on a quick Zoom with someone from Hack Club HQ."
              />
            </Card>
            <Card
              sx={{
                background: 'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
                color: 'white',
                svg: { color: '#fb558e' }
              }}
            >
              <Feature
                icon="event-check"
                color="white"
                name="3. First meeting"
                desc="Schedule your club’s first meeting & get going!"
              />
            </Card>
          </Grid>
          <Button
            as="a"
            href="https://apply.hackclub.com"
            target="_blank"
            rel="noopener"
            variant="ctaLg"
          >
            Apply to Hack Club
          </Button>
        </Container>
      </Box>
    </>
  )
}

// Fetchable Data:

// Bank Stats

export async function getStaticProps() {
  var mojier = require('mojier')
  const { flag } = require('country-emoji')
  let dataPieces = []
  let initialBankData = await fetch('https://bank.hackclub.com/stats').then(r =>
    r.json()
  )
  dataPieces.push(
    `💰 ${initialBankData.raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised on Bank`
  )
  dataPieces.push(
    `💵 ${initialBankData.last_qtr.raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised on Bank this quarter`
  )
  dataPieces.push(
    `💵 ${initialBankData.last_year.raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised on Bank this year`
  )
  dataPieces.push(
    `💸 ${initialBankData.transactions_volume.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} transacted through Bank`
  )
  dataPieces.push(`🎙 ${initialBankData.events_count} Bank projects`)
  let initialGitHubData = await fetch(
    'https://api.github.com/orgs/hackclub/events'
  ).then(r => r.json())
  initialGitHubData = initialGitHubData.map(x =>
    x.type == 'PushEvent' ||
    x.type == 'WatchEvent' ||
    x.type == 'PullRequestEvent'
      ? x.type == 'PushEvent'
        ? `✅ New commit in ${x.repo.name}`
        : x.type == 'WatchEvent'
        ? `⭐️ New star on ${x.repo.name}`
        : x.type == 'PullRequestEvent'
        ? `🔀 New PR for ${x.repo.name}`
        : `🎉 New activity in ${x.repo.name}`
      : null
  )
  let initialScrapbookUsers = await fetch(
    'https://scrapbook.hackclub.com/api/users/'
  ).then(r => r.json())
  let emojiPeople = ['👦🏻', '👦🏼', '👦🏽', '👦🏾', '👦🏿', '👧🏻', '👧🏼', '👧🏽', '👧🏾', '👧🏿']
  let newScrapbookUsers = [
    ...new Set(
      initialScrapbookUsers
        .filter(function (el) {
          return el.newMember && el.timezone
        })
        .reverse()
        .slice(0, 40)
        .map(
          x =>
            `New Hack Clubber from ${x.timezone
              .split('/')[1]
              .replace('_', ' ')}`
        )
    )
  ]
    .slice(0, 20)
    .map(
      x => `${emojiPeople[Math.floor(Math.random() * emojiPeople.length)]} ${x}`
    )

  const newScrapbooks = [
    '🎨 New piece of art made!',
    '💾 Hew CLI shipped!',
    '🌐 A new website has been created!',
    '💡 A new circuit has been shipped!',
    '🛠 New Rust project created!',
    '🌈 A new personal website has been shipped!',
    '🎬 New animation shipped!',
    '🤖 New Slack bot added!',
    '✏️ New sketch sketched!'
  ]

  let reactionsUsed = await fetch(
    'http://streamboot-bot.herokuapp.com/api/top/emoji'
  ).then(r => r.json())

  reactionsUsed = reactionsUsed
    .map(x => {
      let emoji = mojier.get(x.emoji_id)
      if (
        emoji != null &&
        emoji != 'eggplant' &&
        emoji != 'peach' &&
        emoji != 'sweat_drops'
      ) {
        return `${emoji} reaction used${
          x.count > 3 ? ' ' + x.count + ' times this hour' : ''
        }!`
      } else {
        return null
      }
    })
    .filter(function (el) {
      return el != null
    })
    .slice(0, 15)

  let packagesText = [
    '📦 New package shipped',
    '✉️ New envelope shipped',
    '💌 Stickers shipped',
    '😁 Swag pack shipped',
    '💌 Goodies shipped'
  ]

  let packagesData = (
    await fetch(
      'https://api2.hackclub.com/v0.1/Operations/Mail%20Missions?select={"sort":[{"field":"Mail%20Team%20Thread%20Timestamp","direction":"desc"}]}'
    ).then(r => r.json())
  )
    .map(
      x =>
        `${packagesText[Math.floor(packagesText.length * Math.random())]} to ${
          x.fields['Receiver Country']
            ? x.fields['Receiver Country'][0]?.split(' ')[0] == 'United'
              ? 'the ' + x.fields['Receiver Country'][0]?.split('(')[0]
              : x.fields['Receiver Country'][0]?.split('(')[0]
            : 'a hacker'
        }!`
    )
    .slice(0, 30)

  let clubsData = (
    await fetch(
      'https://api2.hackclub.com/v0.1/Operations/Clubs?select={"sort":[{"field":"Acceptance%20Time","direction":"desc"}]}'
    ).then(r => r.json())
  )
    .map(
      x =>
        `${
          flag(
            x.fields['Address Country']
              ? x.fields['Address Country'][0]
              : 'hgfdhsbuvisulr'
          ) === undefined
            ? '🚩'
            : flag(x.fields['Address Country'][0])
        } New club started ${
          x.fields['Address Country']
            ? x.fields['Address Country'][0]?.split(' ')[0] == 'United'
              ? 'in the ' + x.fields['Address Country'][0]?.split('(')[0].trim()
              : 'in ' + x.fields['Address Country'][0]?.split('(')[0].trim()
            : 'by a hacker'
        }!`
    )
    .slice(0, 40)

  let meetingsData = (
    await fetch('https://api2.hackclub.com/v0.1/Operations/Clubs').then(r =>
      r.json()
    )
  )
    .map(x =>
      (x.fields['Meeting sizes'] && x.fields['Address Country'])
        ? `🎒 A club meeting ${
            x.fields['Address Country']
              ? x.fields['Address Country'][0]?.split(' ')[0] == 'United'
                ? 'in the ' +
                  x.fields['Address Country'][0]?.split('(')[0].trim()
                : 'in ' + x.fields['Address Country'][0]?.split('(')[0].trim()
              : ''
          } of ${
            x.fields['Meeting sizes'][x.fields['Meeting sizes'].length - 1]
          } hackers just happened!`
        : null
    )
    .filter(function (el) {
      return el != null
    })
    .sort(() => 0.5 - Math.random())
    .slice(0, 20)
  
  let eventsData = (await fetch('https://events.hackclub.com/api/events/upcoming/').then(r => r.json())).map(x => `📆 ${x.title} is coming up soon!`)

  dataPieces = [
    ...newScrapbooks,
    ...newScrapbookUsers,
    ...dataPieces,
    ...reactionsUsed,
    ...new Set(packagesData),
    ...new Set(meetingsData),
    ...new Set(clubsData),
    ...eventsData,
    ...new Set(
      initialGitHubData.filter(function (el) {
        return el != null
      })
    )
  ]
  dataPieces = [
    ...dataPieces,
    ...(88 - dataPieces.length > 0 ? [...Array(88 - dataPieces.length)].map(
      (u, i) => dataPieces[Math.floor(Math.random() * dataPieces.length)]
    ) : [])
  ]
  return { props: { dataPieces }, revalidate: 30 }
}
