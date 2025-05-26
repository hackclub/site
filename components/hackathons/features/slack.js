import { Button, Box, Container, Heading, Text, Link } from 'theme-ui'
import usePrefersMotion from '../../../lib/use-prefers-motion'
import useHasMounted from '../../../lib/use-has-mounted'
import NextLink from 'next/link'

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
      The{' '}
      <Box
        as="span"
        sx={{
          bg: 'rgb(245, 233, 181, .3)',
          px: 1,
          borderRadius: 5
        }}
      >
        <Link
          href="https://hackclub.slack.com/archives/C03QSGGCJN7"
          sx={{ textDecoration: 'none', color: 'currentColor' }}
          target="_blank"
        >
          #hackathon-organizers
        </Link>
      </Box>{' '}
      channel is where teenagers around the world ask questions and share their
      own hackathon organizing experiences—from finding a venue to securing
      sponsorships to ordering food.
    </Text>
    <NextLink href="/slack" passHref legacyBehavior>
      <Button
        as="a"
        variant="ctaLg"
        sx={{
          background: 'linear-gradient(-132deg, #338eda 14%, #33d6a6 82%)'
        }}
      >
        Join us on Slack →
      </Button>
    </NextLink>
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
  img = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/6eceaf9af0b02e89c4ded779ca8a2241c6087d4e_0screen_shot_2022-08-05_at_2.27.38_pm.png'
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
          poster="https://hc-cdn.hel1.your-objectstorage.com/s/v3/b8dbce1d357ff356ce4b7de63ad2830168bd88f9_0screen_shot_2022-07-30_at_9.03.43_am.png"
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
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f4e0ad3bcf1b3b139c52878c4ce5dea5cdc2c86a_0screen_recording_2022-08-03_at_9.50.26_am.mp4"
            type="video/mp4; codecs=hevc"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/5908e3cb35ca490592a17feee1e7e8365181028c_0have-finally-figured-it-out-hell-yeah.webm"
            type="video/webm; codecs=vp9,opus"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/f4e0ad3bcf1b3b139c52878c4ce5dea5cdc2c86a_0screen_recording_2022-08-03_at_9.50.26_am.mp4"
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
