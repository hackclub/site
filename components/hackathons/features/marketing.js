import { Button, Box, Container, Heading, Flex, Grid, Text } from 'theme-ui'
import styled from '@emotion/styled'
import usePrefersMotion from '../../../lib/use-prefers-motion'
import useHasMounted from '../../../lib/use-has-mounted'
import { formatted } from '../../../lib/members'
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
      Spread the word
    </Text>
    <Heading as="h2" variant="title">
      Reach a network of high school hackers
    </Heading>
    <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus', mx: 'auto' }}>
      List your hackathon on hackathons.hackclub.com (the first Google search
      result for "high school hackathons") and emailed to other high school
      hackers in your area.
    </Text>
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
      backgroundImage: t => t.util.gx('cyan', 'green'),
      opacity: 0.825,
      zIndex: 1
    }}
  />
)

const Static = ({
  img = 'https://cloud-nykwtt0z7.vercel.app/2020-07-25_a1tcva4ch6mmr6j2cfmcb4e9ync3yhar.png'
  // img="https://cloud-re5hkabx0.vercel.app/2020-07-25_hn13qhejqrzu4n1jy9yacxxgrgp3wf5u.png"
}) => (
  <Box
    as="section"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: t => t.util.gx('cyan', 'green'),
      backgroundSize: 'cover'
    }}
  >
    <Cover />
    <Content />
  </Box>
)

const Marketing = () => {
  return <Static />
}

export default Marketing
