import { Box, Heading, Grid, Card, Flex, Text } from 'theme-ui'
import SlideUp from '../slide-up'
import JoinForm from './join-form'
import usePrefersMotion from '../../lib/use-prefers-motion'
import useHasMounted from '../../lib/use-has-mounted'
import { thousands, formatted } from '../../lib/members'
import { useEffect, useState } from 'react'
import Stat from '../stat'
import { keyframes } from '@emotion/react'

const Content = ({sx}) => (
  <Grid
    gap={3}
    id='card'
    sx={{
      pt: '200px',
      '@media screen and (max-width: 40em)': {
        pt: '100px'
      },
      ...sx
    }}
    pb={[3, 4]}
  >
    <Box
      sx={{
        position: 'relative',
        zIndex: 1,
        textShadow: 'text',
        textAlign: ['center', 'center']
      }}
    >
      <Box
        sx={{
          gap: 4,
          display: 'inline',
          position: 'relative',
          right: '20px',
          color: 'white',
          textShadow: 'text',
          textAlign: ['center', 'center'],
          '@media screen and (max-width: 900px)': {
            display: 'flex',
            flexDirection: 'column',
            position: 'initial'
          }
        }}
      >
        <Heading
          as="h1"
          variant="title"
          sx={{
            color: 'white',
            zIndex: 1000,
            fontSize: [5, 6, 7],
            lineHeight: 'limit',
            mb: [2, 3]
          }}
        >
          Hack Club Slack
        </Heading>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 4,
            position: 'absolute',
            right: 68,
            zIndex: -2,
            top: -5,
            background: 'rgba(225, 225, 225, 0.2)',
            boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(225, 225, 225, 0.3)',
            color: 'white !important',
            borderRadius: 6,
            px: '24px',
            py: '7px',
            '@media screen and (max-width: 1200px)': {
              position: 'initial',
              mx: 'auto',
              justifyContent: 'space-around',
              width: '65%'
            },
            '@media screen and (max-width: 720px)':{
              position: 'initial',
              mx: 'auto',
              width: '95%'
            }
          }}
        >
          <Stat
            value={`${thousands}k+`}
            label="total members"
            color="white"
            sm
          />
          <Stat value={6} label="continents" sm color="white" />
          <Stat value="1M+"  label="messages/yr" sm color="white" />
        </Box>
      </Box>
    </Box>
    <Box sx={{ display: 'grid', placeContent: 'center' }}>
      <Text
        variant="subtitle"
        as="p"
        sx={{
          zIndex: 1,
          textAlign: ['center', 'center'],
          color: 'white',
          fontSize: [2, 3],
          maxWidth: 1000,
          mb: 2,
          '@media screen and (max-width: 40em)': {
            textAlign: 'left',
            mx: 'auto',
            width: '90%'
          }
        }}
      >
        Have a coding question? Looking for project feedback? You’ll find some
        fabulous people to talk to in our global Slack (Discord-style online
        groupchat) with {formatted}+ members, active at all hours.
      </Text>
    </Box>

    <SlideUp
      sx={{
        zIndex: 5,
        display: 'flex',
        alignItems: 'center',
        '@media screen and (max-width: 40em)': {
          pb: '85px'
        }
      }}
    >
      <JoinForm
        sx={{
          variant: 'cards.translucent',
          position: 'relative',
          zIndex: 3,
          maxWidth: 'null'
        }}
      />
    </SlideUp>
  </Grid>
)

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      background: '#2F5DA3',
      zIndex: 1
    }}
  />
)

const Static = ({
  img = 'https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png'
  // img="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/12020-07-25_hn13qhejqrzu4n1jy9yacxxgrgp3wf5u.png"
}) => (
  <Box
    as="section"
    id="slack"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${img})`,
      backgroundSize: 'cover'
    }}
  >
    <Cover />
    <Content />
  </Box>
)

const Slack = () => {
  const hasMounted = useHasMounted()
  const prefersMotion = usePrefersMotion()

  const fadeInUp = keyframes`
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: none;

  }
`

   const [isLoaded, setIsLoaded] = useState(false)

   useEffect(() => {
     setIsLoaded(true)
   }, [])

  if (hasMounted && prefersMotion) {
    return (
      <Box
        as="section"
        id="slack"
        sx={{ overflow: 'hidden', position: 'relative' }}
      >
        <Cover />
        <Content  />
      </Box>
    )
  } else {
    return <Static />
  }
}

export default Slack

//changes i made

// <Box
//           as="video"
//           autoPlay
//           muted
//           loop
//           playsInline
//           poster="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png"
//           duration={2000}
//           sx={{
//             position: 'absolute',
//             bottom: 0,
//             top: 0,
//             left: 0,
//             right: 0,
//             height: '100%',
//             zIndex: -1,
//             width: '100vw',
//             objectFit: 'cover'
//           }}
//         >
//           <source
//             src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.hecv.mp4?v=1590780967658"
//             type="video/mp4; codecs=hevc"
//           />
//           <source
//             src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.webm?v=1590781698834"
//             type="video/webm; codecs=vp9,opus"
//           />
//           <source
//             src="https://cdn.glitch.com/2d637c98-ed35-417a-bf89-cecc165d7398%2Foutput-no-duplicate-frames.mov?v=1590781491717"
//             type="video/quicktime"
//           />
//         </Box>
