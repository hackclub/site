import { Button, Box, Container, Heading, Text } from 'theme-ui'
import usePrefersMotion from '../../../lib/use-prefers-motion'
import useHasMounted from '../../../lib/use-has-mounted'
import Link from 'next/link'
import { thousands } from '../../../lib/members'

const Content = () => (
  <Container
    sx={{
      textAlign: 'center',
      zIndex: 999,
      py: 6,
      color: 'white',
      'h2,p': { textShadow: 'text' },
      textAlign: [null, 'center'],
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Text as="p" variant="eyebrow" sx={{ color: 'white', opacity: 0.75 }}>
      The Hack Club Community
    </Text>
    <Heading as="h2" variant="title">
      A hackathon organizer's{' '}
      <Text
        as="span"
        sx={{
          borderRadius: 'default',
          px: 2,
          mx: [-2, 0],
          whiteSpace: 'nowrap',
          color: 'currentColor',
          bg: 'green'
        }}
      >
        best friend
      </Text>
      .
    </Heading>
    <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus', mx: 'auto' }}>
      The {/* <Box as="span" sx={{ bg: 'muted', px: 1, borderRadius: 5 }}> */}
      #hackathon-organizers
      {/* </Box> */} channel is where teenagers around the world ask questions
      and share their own hackathon organizing experiences. You'll connect with
      other teens, like yourself, who have organized amazing events.
    </Text>
    <Link href="/slack" passHref>
      <Button
        as="a"
        variant="ctaLg"
        sx={{
          background: 'linear-gradient(-132deg, #338eda 14%, #33d6a6 82%)'
        }}
      >
        Join us on Slack →
      </Button>
    </Link>
  </Container>
)

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage: t => t.util.gx('cyan', 'purple'),
      opacity: 0.825,
      zIndex: 1
    }}
  />
)

const Static = ({
  // screenshot of messages from #hackathon-organizers
  img = 'https://cloud-re5hkabx0.vercel.app/2020-07-25_hn13qhejqrzu4n1jy9yacxxgrgp3wf5u.png'
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
  if (hasMounted && prefersMotion) {
    return (
      <Box
        as="section"
        id="slack"
        sx={{ overflow: 'hidden', position: 'relative' }}
      >
        <Box
          as="video"
          autoPlay
          muted
          loop
          playsInline
          // screenshot of messages from #hackathon-organizers
          poster="https://cloud-iwkoq2544-hack-club-bot.vercel.app/0screen_shot_2022-07-30_at_9.03.43_am.png"
          duration={2000}
          sx={{
            position: 'absolute',
            bottom: 0,
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            zIndex: -1,
            width: '100vw',
            objectFit: 'cover'
          }}
        >
          {/* TODO: Fix the mp4 and mov screen recordings. I think Chrome uses the webm one.*/}
          <source
            src="https://cloud-absimk9o2-hack-club-bot.vercel.app/0hellyeah-smooth-scroll.mp4"
            type="video/mp4; codecs=hevc"
          />
          <source
            src="https://cloud-7fyyvr9jk-hack-club-bot.vercel.app/0screen_recording_2022-07-29_at_12.26.48_pm.webm"
            type="video/webm; codecs=vp9,opus"
          />
          <source
            src="https://cloud-absimk9o2-hack-club-bot.vercel.app/0hellyeah-smooth-scroll.mp4"
            type="video/quicktime"
          />
        </Box>
        <Cover />
        <Content />
      </Box>
    )
  } else {
    return <Static />
  }
}

export default Slack
