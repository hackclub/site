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

/** @jsxImportSource theme-ui */

const flashing = keyframes({
  from: { opacity: 0 },
  '50%': { opacity: 1 },
  to: { opacity: 0 }
})

function Dot() {
  return (
    <Text
      sx={{
        bg: 'green',
        color: 'white',
        borderRadius: 'circle',
        display: 'inline-block',
        lineHeight: 0,
        width: '.4em',
        height: '.4em',
        marginRight: '.4em',
        marginBottom: '.12em',
        animationName: `${flashing}`,
        animationDuration: '3s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
      }}
    />
  )
}

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
      <Box sx={{background: 'rgb(0,0,0,0.3)', height: '100%', position: 'absolute', zIndex: 3, width: '210px', right: 0, top: 0, p: 3}}>
        <Text variant="eyebrow" as="p" sx={{color: 'white'}}><Dot />Live from Slack</Text>
      </Box>
      </Grid>
      <Grid sx={{ zIndex: 2 }}>
        <Text variant="title" sx={{ fontSize: [3, 4, 5], zIndex: 2 }}>
          Our online community
        </Text>
      </Grid>
      <Grid columns={[1, 1]} sx={{ zIndex: 2 }}>
        <Box sx={{ zIndex: 2, width: 'calc(100% - 200px)' }}>
          <Text
            variant="subtitle"
            as="p"
            sx={{ fontSize: [1, '16px', '20px'] }}
          >
            Coding doesn't have to be a solidary activity. At Hack Club, it's a
            team sport and in our Slack (similar to Discord, but better), you'll
            find a group of{' '}
            <Box sx={{ display: 'inline', fontWeight: '700' }}>{slackNum} </Box>
            {/* <Box
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
              {slackNum}{' '}
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
                {slackNum}
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
                {slackNum}
              </Text>
            </Box> */}
            fabulous people to talk to, active at all hours.
          </Text>
          <Text
            variant="subtitle"
            as="p"
            sx={{ fontSize: [1, '16px', '20px'] }}
          >
            We're united by our love for coding but talk about everything else
            too. You could launch your latest project and get feedback or
            discuss a cool article you read, alongside other Hack Clubbers.
          </Text>
          <Text
            variant="subtitle"
            as="p"
            sx={{ fontSize: [1, '16px', '20px'] }}
          >
            Come for the skills, stay for the friends!
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
            target="_blank"
            rel="noopener"
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
