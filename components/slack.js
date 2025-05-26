import { Button, Box, Container, Heading, Flex, Grid, Text } from 'theme-ui'
import styled from '@emotion/styled'
import usePrefersMotion from '../lib/use-prefers-motion'
import useHasMounted from '../lib/use-has-mounted'
import { formatted } from '../lib/members'
import Link from 'next/link'

let Highlight = styled(Text)`
  color: inherit;
  border-radius: 1em 0 1em 0;
  background: linear-gradient(
    -100deg,
    rgba(250, 247, 133, 0.33),
    rgba(250, 247, 133, 0.66) 95%,
    rgba(250, 247, 133, 0.1)
  );
`
Highlight = Highlight.withComponent('mark')

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
      ~ The Hack Club Slack ~
    </Text>
    <Heading as="h2" variant="title">
      Come for the skills, <br /> stay for the people.
    </Heading>
    <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus', mx: 'auto' }}>
      Communication and planning for our open source projects happen in the
      Slack. Coding is often seen as an isolating activity. Plenty of groups
      exist for kids who are interested in sports, theater, or chess, but the
      stereotype of a programmer is a person who sits alone in a dark room.{' '}
      <strong>It doesn't have to be this way</strong>—in the Hack Club Slack
      (Discord-style online groupchat), you'll find a group of {formatted}+{' '}
      <Highlight>fabulous people</Highlight> to talk to, active at all hours.
    </Text>
    <Link href="/slack" passHref legacyBehavior>
      <Button
        as="a"
        variant="ctaLg"
        sx={{
          background: 'linear-gradient(-132deg, #338eda 14%, #33d6a6 82%)'
        }}
      >
        Join our Slack →
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
  img = 'https://hc-cdn.hel1.your-objectstorage.com/s/v3/0358c4d6f73cbaae3e19b31c3fbb9f3543daf014_6_4a40e958929f3c8150a18b55400d15db94da46f1_02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.webp'
  // img="https://hc-cdn.hel1.your-objectstorage.com/s/v3/8a0ab0def6a2af5793e3fd0ee82a572a985a5a6e_7_1e44085854dc063a0a9df004fe6df9cb82cf7b84_12020-07-25_hn13qhejqrzu4n1jy9yacxxgrgp3wf5u.webp"
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
          poster="https://hc-cdn.hel1.your-objectstorage.com/s/v3/0358c4d6f73cbaae3e19b31c3fbb9f3543daf014_6_4a40e958929f3c8150a18b55400d15db94da46f1_02020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.webp"
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/8aa6f2ba210919fdb64e73592853f49071ff9261_2d637c98-ed35-417a-bf89-cecc165d7398_output-no-duplicate-frames.hecv.mp4"
            type="video/mp4; codecs=hevc"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/79f106465e5b7829753808d8578aa3da2a58f870_2d637c98-ed35-417a-bf89-cecc165d7398_output-no-duplicate-frames.webm"
            type="video/webm; codecs=vp9,opus"
          />
          <source
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/ca334a239fe7ef2e814dc2bdc9f46a4569e4c009_2d637c98-ed35-417a-bf89-cecc165d7398_output-no-duplicate-frames.mp4"
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
