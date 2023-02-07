import { Box, Button, Card, Flex, Grid, Heading, Link, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import BGImg from '../../components/background-image'
import NextLink from 'next/link'
import Image from 'next/image'
import Nav from '../../components/nav'
import SlideDown from '../../components/slide-down'
import Footer from '../../components/footer'
import { dt } from '../../lib/dates'
import Sal from '../../public/ama/sal.png'

const Page = ({ upcoming, past }) => (
  <>
    <Meta
      as={Head}
      title="AMAs"
      description="Every month, the Hack Club community gets on a Zoom call with someone awesome for a 1-hour AMA. Past guests have included George Hotz, Elon Musk, Limor Fried, Tom Preston-Werner, & more."
      image="https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/62020-07-24_03dp4nhf5acfeyhvg84whafyhe1q30zq.jpeg"
    />
    <ForceTheme theme="dark" />
    <Nav dark />
    <Box
      as="header"
      sx={{
        bg: 'dark',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <BGImg
        gradient="linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.625))"
        src={Sal}
        width={2048}
        height={1170}
        alt="Screenshot of Elon Musk AMA on Zoom"
      />
      <SlideDown
        variant="layout.narrow"
        duration={768}
        sx={{ py: [5, 6], color: 'white', textShadow: 'text' }}
      >
        <Text as="p" variant="eyebrow" sx={{ color: 'white', opacity: 0.875 }}>
          Lights, webcam…
        </Text>
        <Heading
          as="h1"
          variant="title"
          sx={{ fontSize: [6, 8, 9], lineHeight: 'limit' }}
        >
          AMAs
        </Heading>
        <Text as="p" variant="subtitle" sx={{ a: { color: 'inherit' } }}>
          We call someone we’ve always wanted to talk to—and the entire
          Hack&nbsp;Club Slack community is invited to ask questions & chat with
          the guest live. No vetting questions. No endorsements. Conversations
          are streamed live publicly on{' '}
          <Link href="https://www.youtube.com/c/HackClubHQ">YouTube</Link>.
        </Text>
        <Button
          variant="lg"
          as="a"
          href="/slack"
          target="_blank"
          sx={{ mt: [3, 4], mx: [1, 2], color: 'black', bg: 'white' }}
        >
          Join Slack
        </Button>
        <Button
          variant="outlineLg"
          as="a"
          href="https://www.youtube.com/watch?v=O1J1pwGPQXY"
          target="_blank"
          sx={{ mt: [3, 4], mx: [1, 2], color: 'white', bg: 'rgba(0,0,0,0.5)' }}
        >
          Watch our highlights
        </Button>
      </SlideDown>
    </Box>
    <Box
      as="section"
      sx={{ py: 5, bg: 'dark', color: 'white', textAlign: 'center' }}
    >
      {upcoming.length > 0 && (
        <>
          <Heading as="h2" variant="title" px={3}>
            Upcoming guests
          </Heading>
          <Flex
            variant="layout.container"
            sx={{
              py: 4,
              flexWrap: 'wrap',
              placeContent: 'center'
            }}
          >
            {upcoming
              .sort((x, y) => {
                return new Date(y.start).getTime() - new Date(x.start).getTime()
              })
              .map(event => (
                <Card
                  as="a"
                  href={`https://events.hackclub.com/${event.slug}`}
                  variant="interactive"
                  m={[2, 3]}
                  sx={{
                    img: {
                      width: [96, 128],
                      height: [96, 128],
                      borderRadius: 'circle'
                    }
                  }}
                  key={event.id}
                >
                  <Image
                    width={128}
                    height={128}
                    src={event.amaAvatar}
                    alt={event.title}
                  />
                  <Heading as="h3" variant="subheadline" my={2}>
                    {event.title.replace('AMA with ', '')}
                  </Heading>
                  <Text as="p" variant="caption" mb={3}>
                    {dt(event.start)}
                  </Text>
                  <Button as="strong" variant="outline" sx={{ py: 0 }}>
                    RSVP
                  </Button>
                </Card>
              ))}
          </Flex>
        </>
      )}
      <Link
        href="https://events.hackclub.com/"
        sx={{ display: 'block', px: 3, fontSize: [2, 3] }}
      >
        See all upcoming events »
      </Link>
    </Box>
    <Box as="section" sx={{ py: 5, bg: 'darker', textAlign: 'center' }}>
      <Heading as="h2" variant="title" px={3} id="past-amas">
        Past AMAs
      </Heading>
      <Grid
        columns={[null, 2, 3]}
        gap={[3, 4]}
        variant="layout.container"
        sx={{ pt: 4, textAlign: 'left' }}
      >
        {past
          .sort((x, y) => {
            return new Date(y.start).getTime() - new Date(x.start).getTime()
          })
          .map(event => (
            <Card
              as={event.youtube ? 'a' : 'section'}
              href={event.youtube}
              variant="interactive"
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: [0, 0],
                img: { borderRadius: 'extra' }
              }}
              key={event.id}
            >
              <Image
                width={128}
                height={128}
                src={event.amaAvatar}
                alt={event.title}
              />
              <Box ml={3}>
                <Heading as="h3" variant="subheadline" mb={1}>
                  {event.title.replace('AMA with ', '')}
                </Heading>
                <Text as="p" variant="caption" mb={2}>
                  {dt(event.start)}
                </Text>
                {event.youtube && (
                  <Text as="span" variant="styles.a">
                    Watch now »
                  </Text>
                )}
              </Box>
            </Card>
          ))}
      </Grid>
    </Box>
    <Footer dark />
  </>
)

export default Page

export const getStaticProps = async () => {
  const { filter } = require('lodash')
  let upcoming = []
  let past = []
  const d = dt => new Date(new Date(dt).toISOString().substring(0, 10))
  const today = d(new Date())
  await fetch('https://events.hackclub.com/api/amas')
    .then(r => r.json())
    .then(events => {
      upcoming = filter(events, e => d(e.start) >= today)
      past = filter(events, e => d(e.start) < today)
    })
    .catch(e => console.error(e, 'Failed to fetch AMAs'))
  return { props: { upcoming, past }, revalidate: 10 }
}
