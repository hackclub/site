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
/** @jsxImportSource theme-ui */

// const Cover = () => (
//   <Box
//     sx={{
//       position: 'absolute',
//       bottom: 0,
//       top: 0,
//       left: 0,
//       right: 0,
//       backgroundImage: t => t.util.gx('cyan', 'purple'),
//       opacity: 0.825,
//       zIndex: 1
//     }}
//   />
// )

// const Static = ({
//   img = 'https://cloud-nykwtt0z7.vercel.app/2020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png'
//   // img="https://cloud-re5hkabx0.vercel.app/2020-07-25_hn13qhejqrzu4n1jy9yacxxgrgp3wf5u.png"
// }) => (
//   <Box
//     as="section"
//     id="slack"
//     sx={{
//       position: 'relative',
//       overflow: 'hidden',
//       backgroundImage: `url(https://cloud-nykwtt0z7.vercel.app/2020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png)`,
//       backgroundSize: 'cover'
//     }}
//   >
//     <Cover />
//     <Content />
//   </Box>
// )

const rollin = keyframes`
0% {
  transform: translateY(100%);
},
30% {
  transform: translateY(100%);
},
100% {
  transform: translateY(0);
}
`

const rollout = keyframes`
0% {
  transform: translateY(0);
},
60% {
  transform: translateY(-100%);
},
100% {
  transform: translateY(-100%);
}
`

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
          ml: -4,
          mt: -4
        }}
      />
            <Cover />
      {/* <Box
        as="video"
        autoPlay
        muted
        loop
        playsInline
        poster="https://cloud-nykwtt0z7.vercel.app/2020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png"
        duration={2000}
        sx={{
          position: 'absolute',
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          zIndex: 0,
          width: '100vw',
          objectFit: 'cover'
        }}
      >
        <source
          src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.hecv.mp4?v=1590780967658"
          type="video/mp4; codecs=hevc"
        />
        <source
          src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.webm?v=1590781698834"
          type="video/webm; codecs=vp9,opus"
        />
        <source
          src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.mov?v=1590781491717"
          type="video/quicktime"
        />
      </Box> */}
      <Grid sx={{ zIndex: 2 }}>
        <Text variant="title" sx={{ fontSize: ['36px', 4, 5], zIndex: 2 }}>
          Our online community
        </Text>
      </Grid>
      <Grid columns={[1, 1]} sx={{ zIndex: 2 }}>
        <Box
          sx={{
            zIndex: 2,
            width: [null, 'calc(100% - 200px)', 'calc(100% - 200px)']
          }}
        >
          <Text
            variant="subtitle"
            as="p"
            sx={{ fontSize: [1, '16px', '20px'] }}
          >
            Coding doesn’t have to be a solidary activity. At Hack Club, we make
            things together and in our Slack, you'll find awesome people to
            hangout with to. Across 2,000 public channels, find the community
            for your favorite programming language, ask for advice, or just hang
            out.
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
            content="click to learn more about how to submit a workshop"
            id="13"
            link="/slack"
            icon="slack"
            primary="purple"
          >
            Join our Slack
          </Buttons>
          <Grid sx={{ zIndex: 2 }}>
            <Box
              sx={{
                background: 'rgb(0,0,0,0.6)',
                height: ['170px', '100%', '100%'],
                position: ['relative', 'absolute', 'absolute'],
                zIndex: 3,
                width: ['120%', '210px', '210px'],
                right: 0,
                top: [null, 0, 0],
                mt: [3, 0, 0],
                ml: -3,
                mb: -3,
                p: 3
              }}
            >
              <Text variant="eyebrow" as="p" sx={{ color: 'white' }}>
                <Dot />
                Live from Slack
              </Text>
              <Heading variant="headline" sx={{ mb: 0, pt: 2 }}>
                <Comma>{data.readers_count_1d}</Comma>
              </Heading>
              <Text sx={{ textTransform: 'uppercase', color: 'muted' }}>
                Online today
              </Text>
              <Heading variant="headline" sx={{ mb: 0, pt: 2 }}>
                <Comma>{data.messages_count_1d}</Comma>
              </Heading>
              <Text sx={{ textTransform: 'uppercase', color: 'muted' }}>
                Daily messages
              </Text>
              <Heading variant="headline" sx={{ mb: 0, pt: 2 }}>
                <Comma>{data.total_members_count}</Comma>
              </Heading>
              <Text sx={{ textTransform: 'uppercase', color: 'muted' }}>
                Total members
              </Text>
            </Box>
          </Grid>
        </Box>
      </Grid>
    </CardModel>
  )
}
