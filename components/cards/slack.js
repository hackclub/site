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
import usePrefersMotion from '../../lib/use-prefers-motion'
import useHasMounted from '../../lib/use-has-mounted'
import { keyframes } from '@emotion/react'
import SlackEvents from '../slack/slack-events'

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
      backgroundImage: t => t.util.gx('cyan', 'purple'),
      opacity: 0.9,
      zIndex: 1
    }}
  />
)

export default function Slack({ slackNum, slackKey }) {
  const hasMounted = useHasMounted()
  const prefersMotion = usePrefersMotion()

  return (
    <CardModel
      color="white"
      sx={{
        position: 'relative',
        overflow: 'hidden',
        mb: '0 !important'
        // backgroundImage: `url(https://cloud-nykwtt0z7.vercel.app/2020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png)`,
        // backgroundSize: 'cover'
      }}
    >
      <Box
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
      </Box>
      <Cover />
      <Grid sx={{ zIndex: 2 }}>
        <Text variant="title" sx={{ fontSize: [3, 4, 5], zIndex: 2 }}>
          Our online community
        </Text>
      </Grid>
      <Grid columns={[1, 1]} sx={{ zIndex: 2 }}>
        <Box sx={{ zIndex: 2 }}>
          <Text
            variant="subtitle"
            as="p"
            sx={{ fontSize: [1, '16px', '20px'] }}
          >
            Coding doesn't have to be a solidary activity. At Hack Club, it's a team sport and in our
            Slack (Discord-style online groupchat), you'll find a
            group of{' '}
            <Box
              as="div"
              sx={{
                color: 'transparent',
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-block',
                mb: '-8px',
                mr: '2px'
              }}
              key={slackKey}
            >
              {/* {slackNum[0]}{' '} */}
              <Text
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  color: 'text',
                  animation: `${rollout} 2s`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* {slackNum[0]} */}
              </Text>
              <Text
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  color: 'white',
                  animation: `${rollin} 2s`,
                  animationFillMode: 'forwards'
                }}
              >
                {/* {slackNum[1]} */}
              </Text>
            </Box>
            fabulous people to talk to, active at all hours.
          </Text>
          <Button
            variant="primary"
            sx={{
              backgroundColor: 'white',
              color: 'purple',
              mt: 3
            }}
            as="a"
            href="/slack"
          >
            Join our community
          </Button>
        </Box>
          {/* <Box sx={{py: 3, px: 4, borderRadius: 4, float: 'right', backgroundColor: 'rgb(255,255,255, 0.2)', backdropFilter: 'blur(8px)', mt: '-40px'}}>
          <Heading
              as="h2"
              variant="subheadline"
              sx={{
                mt: 0,
                color: 'white',
                textTransform: 'uppercase',
                letterSpacing: 'headline'
              }}
            >
              Live from our&nbsp;Slack
            </Heading>
            <SlackEvents color="transparent" textColor="white" />
            </Box> */}
      </Grid>
    </CardModel>
  )
}