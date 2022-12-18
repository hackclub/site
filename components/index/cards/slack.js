import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import Buttons from './button'
import usePrefersMotion from '../../../lib/use-prefers-motion'
import useHasMounted from '../../../lib/use-has-mounted'
import { keyframes } from '@emotion/react'
import SlackEvents from '../../slack/slack-events'
import Event from '../events'
import Dot from '../../dot'
import Comma from '../../comma'
import RelativeTime from 'react-relative-time'
/** @jsxImportSource theme-ui */

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage:
        'linear-gradient(to bottom,rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85))',
      opacity: 0.8,
      zIndex: 1
    }}
  />
)

export default function Slack({ data, slackKey, events }) {
  const hasMounted = useHasMounted()
  const prefersMotion = usePrefersMotion()

  return (
    <CardModel
      color="white"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: t => t.util.gx('cyan', 'purple')
        // background:
        //   'linear-gradient(to bottom,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6) 25%,rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.8) 100%), url("https://hackclub.com/_next/image/?url=https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%252F2020-05-16_screenshot.jpeg?v%3D1589633885855&w=2048&q=75")',
        // backgroundPositon: 'center center',
        // backgroundSize: '100% auto'
      }}
    >
      <Image
        src="/home/slack_ama.webp"
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          ml: ['-24px', '-32px', '-32px', '-32px'],
          mt: ['-24px', '-32px', '-32px', '-32px']
        }}
      />
      <Cover />
      <Grid sx={{ zIndex: 2 }}>
        <Text
          variant="title"
          sx={{
            fontSize: ['36px', 4, 5],
            zIndex: 2,
            maxWidth: [null, null, '70%', null]
          }}
        >
          Our online community
        </Text>
      </Grid>
      <Grid columns={[1, 1, '1.6fr 1fr', '1.6fr 1fr']} sx={{ zIndex: 2 }}>
        <Box
          sx={{
            zIndex: 2
          }}
        >
          <Text
            variant="subtitle"
            as="p"
            sx={{ fontSize: [1, '16px', '20px'] }}
          >
            Coding doesn’t have to be a solidary activity. At Hack Club, we make
            things together and in our Slack, you'll find awesome people to
            hangout with too. Code together, find your programming community, or
            just hang out.
          </Text>
          <Text as="p" variant="subtitle">
            Sometimes, we also invite someone we really want to speak to (like
            Sal Khan, George Hotz, and Lady Ada) and host an{' '}
            <Link
              href="/amas"
              target="_blank"
              rel="noopener"
              sx={{ color: 'inherit' }}
            >
              AMA
            </Link>{' '}
            with them.{' '}
          </Text>
          <Event events={events} />

          <Buttons
            id="13"
            link="/slack"
            icon="slack"
            primary="red"
            sx={{ mt: [3, 3, 4] }}
          >
            Join our Slack
          </Buttons>
          <Grid sx={{ zIndex: 2 }}>
            <Box
              sx={{
                background: 'rgb(0,0,0,0.6)',
                height: ['200px', '170px', '170px', '100%'],
                position: ['relative', 'relative', 'absolute'],
                zIndex: 3,
                width: ['120%', '120%', '260px'],
                right: 0,
                top: [null, null, 0],
                mt: [3, 3, 0],
                ml: ['-10%', '-10%', '-5%'],
                mb: ['-10%', '-10%', '-5%'],
                p: 4,
                pt: [3, 3, 4]
              }}
            >
              <Flex
                sx={{
                  flexDirection: ['column', 'row', 'row', 'column'],
                  justifyContent: 'space-between'
                }}
              >
                <Text variant="eyebrow" as="p" sx={{ color: 'white' }}>
                  <Dot />
                  Live from Slack
                </Text>
                <Text sx={{ color: 'muted' }}>
                  As of{' '}
                  <RelativeTime value={data.ds} titleFormat="YYYY-MM-DD" />
                </Text>
              </Flex>
              <Flex
                sx={{
                  flexDirection: ['row', 'row', 'column'],
                  justifyContent: 'space-between',
                  flexWrap: 'wrap'
                }}
              >
                <Box>
                  <Heading
                    variant="headline"
                    sx={{ mb: 0, pt: 2, fontSize: ['28px', '36px', '38px'] }}
                  >
                    <Comma>{data.readers_count_1d}</Comma>
                  </Heading>
                  <Text
                    sx={{
                      textTransform: 'uppercase',
                      color: 'muted',
                      fontSize: ['14px', '16px', '18px']
                    }}
                  >
                    Online
                  </Text>
                </Box>
                <Box sx={{ display: ['none', 'block', 'block'] }}>
                  <Heading
                    variant="headline"
                    sx={{ mb: 0, pt: 2, fontSize: ['28px', '36px', '38px'] }}
                  >
                    <Comma>{data.chats_channels_count_1d}</Comma>
                  </Heading>
                  <Text
                    sx={{
                      textTransform: 'uppercase',
                      color: 'muted',
                      fontSize: ['14px', '16px', '18px']
                    }}
                  >
                    Total channels
                  </Text>
                </Box>
                <Box>
                  <Heading
                    variant="headline"
                    sx={{ mb: 0, pt: 2, fontSize: ['28px', '36px', '38px'] }}
                  >
                    <Comma>{data.messages_count_1d}</Comma>
                  </Heading>
                  <Text
                    sx={{
                      textTransform: 'uppercase',
                      color: 'muted',
                      fontSize: ['14px', '16px', '18px']
                    }}
                  >
                    Daily messages
                  </Text>
                </Box>
                <Box>
                  <Heading
                    variant="headline"
                    sx={{ mb: 0, pt: 2, fontSize: ['28px', '36px', '38px'] }}
                  >
                    <Comma>{data.total_members_count}</Comma>
                  </Heading>
                  <Text
                    sx={{
                      textTransform: 'uppercase',
                      color: 'muted',
                      fontSize: ['14px', '16px', '18px']
                    }}
                  >
                    Total members
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </CardModel>
  )
}
