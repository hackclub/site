import { keyframes } from '@emotion/react'
import { useState } from 'react'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import NextLink from 'next/link'
import useSWR from 'swr'
import {
  Badge,
  Box,
  Card,
  Container,
  Grid,
  Heading,
  Text,
  Button
} from 'theme-ui'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Icon from '../components/icon'
import Nav from '../components/nav'
import Header from '../components/slack/header'
import SlackEvents from '../components/slack/slack-events'
import Stat from '../components/stat'
import fetcher from '../lib/fetcher'
// import {} from '../public/slack/frame1.png'
import { formatted, thousands } from '../lib/members'

const zoomSlide = keyframes({
  from: { backgroundPosition: '-32px bottom' },
  to: { backgroundPosition: '32px bottom' }
})

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')



const SlackPage = () => {
  const [listStatus, setListStatus] = useState('all')
  const [focus, setFocus] = useState({all: true, trending: false})
  const { data: millionCount } = useSWR(
    'https://jia.haas.hackclub.com/api/currentNumber',
    fetcher,
    { refreshInterval: 1000 }
  )

  const BannerSection = ({status}) => {
    if (status === 'trending') {
      return (
        <Grid
          columns={[2, 9, 15]}
          gap={3}
          sx={{
            py: [3, 4],
            h3: { my: 0 },
            '> div': {
              px: [2, 3],
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gridColumn: ['span 1', 'span 3']
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
            variant="interactive"
            bg="red"
            sx={{
              gridColumn: ['span 2 !important', 'span 6 !important']
            }}
          >
            <Icon glyph="external" size={24} />
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
            variant="interactive"
            as="a"
            bg="yellow"
            sx={{
              backgroundImage: 'url(../public/slack/frame1.png)',
              backgroundSize: '100%',
              backgroundPosition: 'center',
              textShadow: 'text',
              gridColumn: ['span 2', 'span 4 !important']
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#dogs</h3>
          </Card>
          <Card
            variant="interactive"
            as="a"
            sx={{
              backgroundImage:
                'url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/12020-07-25_fqxym71bmqjr1d35btawn5q6ph1zt0mk.png)',
              backgroundColor: '#FEC62E',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
              gridColumn: ['span 2', 'span 5 !important'],
              gridRow: ['span 2', 'span 4 !important'],
              h3: { opacity: 0 }
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#design</h3>
          </Card>
          <Card
            variant="interactive"
            as="a"
            bg="dark"
            sx={{
              h3: { color: 'green', textShadow: '0 0 4px currentColor' },
              gridColumn: ['span 2', 'span 5 !important'],
              gridRow: ['span 2', 'span 4 !important']
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#code</h3>
          </Card>

          <Card
            variant="interactive"
            as="a"
            bg="purple"
            sx={{
              gridColumn: ['span 2', 'span 5 !important'],
              gridRow: ['span 2', 'span 4 !important']
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#music</h3>
          </Card>
        </Grid>
      )
    } else if(status === 'all') {
      return (
        <Grid
          columns={[2, 9, 15, 22]}
          gap={3}
          sx={{
            py: [3, 4],
            h3: { my: 0 },
            '> div': {
              px: [2, 3],
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gridColumn: ['span 1', 'span 3']
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
                gridColumn: ['span 2', 'span 6'],
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
              gridColumn: ['span 2', 'span 6'],
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
            as="a"
            variant="interactive"
            bg="red"
            sx={{
              gridColumn: ['span 2 !important', 'span 7 !important']
            }}
          >
            <Icon glyph="external" size={24} />
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
            variant="interactive"
            as="a"
            bg="yellow"
            sx={{
              backgroundImage: 'url(../public/slack/frame1.png)',
              backgroundSize: '100%',
              backgroundPosition: 'center',
              textShadow: 'text',
              gridColumn: ['span 2', 'span 3 !important']
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#dogs</h3>
          </Card>
          <Card
            variant="interactive"
            as="a"
            sx={{
              backgroundImage:
                'url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/12020-07-25_fqxym71bmqjr1d35btawn5q6ph1zt0mk.png)',
              backgroundColor: '#FEC62E',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
              gridColumn: ['span 2', 'span 5 !important'],
              gridRow: ['span 2', 'span 4 !important'],
              h3: { opacity: 0 }
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#design</h3>
          </Card>
          <Card
            variant="interactive"
            as="a"
            bg="dark"
            sx={{
              h3: { color: 'green', textShadow: '0 0 4px currentColor' },
              gridColumn: ['span 2', 'span 5 !important'],
              gridRow: ['span 2', 'span 4 !important']
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#code</h3>
          </Card>

          <Card
            variant="interactive"
            as="a"
            bg="purple"
            sx={{
              gridColumn: ['span 2', 'span 5 !important'],
              gridRow: ['span 2', 'span 4 !important']
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#music</h3>
          </Card>
          <Card
            variant="interactive"
            as="a"
            sx={{
              bg: 'dark',
              backgroundImage:
                'url(https://cloud-jnfb0t781-hack-club-bot.vercel.app/02020-07-25_r6thfxwv1u0c71uw0qk94juv6fxxjygf.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textShadow: 'text',
              gridColumn: ['span 2 !important', 'span 7 !important']
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>#photography</h3>
          </Card>
        </Grid>
      )
    }
  }
  
  const handleNewTrend = (status) => {
    if(status === 'all'){
      setListStatus('all')
      setFocus({ all: true, trending: false})
    }else if(status === 'trending'){
      setListStatus('trending')
      setFocus({ trending: true, all: false })
    }
  }

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
        <Grid
          columns={[2, 5]}
          gap={2}
          sx={{ maxWidth: 'copyPlus', alignItems: 'end' }}
        ></Grid>
        <Heading
          as="h2"
          variant="title"
          sx={{ mt: [4, 5], color: 'black', maxWidth: 'copyUltra' }}
        >
          Channels for every interest.
        </Heading>
        <Text
          as="p"
          variant="subtitle"
          sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3 }}
        >
          Across 2,000 public channels, find the community for your favorite
          programming language, ask for advice, or just hang out.
        </Text>
        <Box sx={{ mt: 4 }}>
          <Button
            onClick={() => handleNewTrend('all')}
            sx={{
              mr: 3,
              backgroundColor: focus.all ? 'blue' : 'rgba(199, 201, 201)',
              color: focus.all ? 'white' : 'black'
            }}
          >
            All
          </Button>
          <Button
            onClick={() => handleNewTrend('trending')}
            sx={{
              backgroundColor: focus.trending ? 'blue' : 'rgba(199, 201, 201)',
              color: focus.trending ? 'white' : 'black'
            }}
          >
            trending
          </Button>
        </Box>
        <BannerSection status={listStatus} />
        <Heading
          as="h2"
          variant="title"
          sx={{ mt: [4, 5], color: 'black', maxWidth: 'copyUltra' }}
        >
          Zoom events that are enjoyable.
        </Heading>
        <Text
          as="p"
          variant="subtitle"
          sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3 }}
        >
          Elevate your Zoom experience with events that don't disappoint and
          also get familiar with some of our zooms events that are <br />
          very interesting.
        </Text>
        <Grid
          columns={[null, 2]}
          gap={[3, 4]}
          sx={{
            py: [3, 4],
            mx: [null, null, null, -1],
            h3: {
              variant: 'text.title',
              color: 'white',
              my: 0
            },
            p: {
              color: 'white',
              opacity: 0.875,
              fontSize: [2, 3],
              lineHeight: 'caption',
              mt: 2
            },
            a: {
              position: 'relative',
              pb: [4, 5],
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
            }
          }}
        >
          <NextLink href="/amas" passHref>
            <Card
              as="a"
              variant="interactive"
              sx={{
                bg: '#000',
                backgroundImage:
                  'linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.375)), url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/22020-07-25_hz5hy2bw5x70ped8akzwtrj4hzuex3vw.jpeg)',
                backgroundSize: '100% auto',
                textShadow: 'text'
              }}
            >
              <Icon glyph="external" size={24} />
              <h3>AMAs</h3>
              <p>Zoom with someone remarkable</p>
            </Card>
          </NextLink>
          <NextLink href="/night" passHref>
            <Card
              as="a"
              variant="interactive"
              sx={{
                bg: 'dark',
                backgroundImage:
                  'url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/32020-07-25_pp7t4h8738hdm46r2xxrd8tz3kjc5x0t.png)',
                backgroundPosition: 'bottom center',
                backgroundSize: 'cover',
                h3: {
                  textTransform: 'uppercase',
                  WebkitTextStroke: 'white',
                  WebkitTextStrokeWidth: '2px',
                  WebkitTextFillColor: 'transparent',
                  filter: `drop-shadow(0 0 1px #50E3C2) drop-shadow(0 0 4px #50E3C2)`
                }
              }}
            >
              <Icon glyph="external" size={24} />
              <h3>Hack Night</h3>
              <p>Weekly live coding & hangout on Zoom</p>
            </Card>
          </NextLink>
          <NextLink href="/minecraft" passHref>
            <Card
              as="a"
              variant="interactive"
              sx={{
                bg: '#759B40',
                backgroundImage:
                  'url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/42020-07-25_56ygmzej7r9kjrrudmnb0t0cmg0m3gtg.jpeg)',
                backgroundSize: 'cover',
                textShadow: 'text'
              }}
            >
              <Icon glyph="external" size={24} />
              <h3>Minecraft</h3>
              <p>Play on our server, build OSS plugins, compete</p>
            </Card>
          </NextLink>
          <Card
            as="a"
            href="https://events.hackclub.com/"
            variant="interactive"
            sx={{
              bg: '#3b6fce'
            }}
          >
            <Icon glyph="external" size={24} />
            <h3>Community fun</h3>
            <p>Members run their own events—all with Zoom Pro</p>
          </Card>
        </Grid>
      </Container>
      <Footer />
    </>
  )
}



export default SlackPage

//card i removed

{
  /* <Card
            bg="red"
            sx={{
              backgroundImage: ({ colors }) =>
                `linear-gradient(-184deg, ${colors.red} 0%, ${colors.red} 16.6666%, ${colors.orange} 16.6666%, ${colors.orange} 33.333%, ${colors.yellow} 33.333%, ${colors.yellow} 50%, ${colors.green} 50%, ${colors.green} 66.6666%, ${colors.blue} 66.6666%, ${colors.blue} 83.3333%, ${colors.purple} 83.3333%, ${colors.purple} 100%)`
            }}
          >
            <h3>#lgbtq</h3>
          </Card> */
}
