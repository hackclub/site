import { Button, Box, Container, Heading, Text } from 'theme-ui'
import usePrefersMotion from '../../../lib/use-prefers-motion'
import useHasMounted from '../../../lib/use-has-mounted'
import Link from 'next/link'

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
      hackathons.hackclub.com
    </Text>
    <Heading as="h2" variant="title">
      Spread the word about your hackathon.
    </Heading>
    <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus', mx: 'auto' }}>
      Reach hackers worldwide by listing your event on hackathons.hackclub.com,
      the first Google search result for "high school hackathons." Your event
      will also be emailed to a network of high school hackers in your area.
    </Text>
    <Link href="https://hackathons.hackclub.com" passHref legacyBehavior>
      <Button
        as="a"
        variant="ctaLg"
        sx={{
          backgroundImage: theme => theme.util.gx('yellow', 'red')
        }}
      >
        Add your hackathon →
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
      backgroundImage: t => t.util.gx('slate', 'black'),
      opacity: 0.7,
      zIndex: 1
    }}
  />
)

const Static = ({
  img = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/b80d76cabf0828ced0f64cabcd38c5fe4361c242_0screen_shot_2022-07-27_at_2.57.41_pm.png'
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

const Marketing = () => {
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
          poster="https://hc-cdn.hel1.your-objectstorage.com/s/v3/b80d76cabf0828ced0f64cabcd38c5fe4361c242_0screen_shot_2022-07-27_at_2.57.41_pm.png"
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/a69d24fc980dd2f07487912694d76105d2a59050_0screen_recording_2022-07-27_at_2.48.43_pm.mp4"
            type="video/mp4; codecs=hevc"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/919fccb92d93df7d35ad9a44c5867166b1899271_0screen_recording_2022-07-27_at_2.48.43_pm.webm"
            type="video/webm; codecs=vp9,opus"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/1bc1a9295a9a0def15e3862d37bb1c37763c40c1_1screen_recording_2022-07-27_at_2.48.43_pm.mp4"
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

export default Marketing
