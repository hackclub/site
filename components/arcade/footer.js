import { Box, Heading, Text, Link } from 'theme-ui'
import Footer from '../footer'

const Description = () => (
  <Box sx={{ a: { color: '#FF5C00' }, pb: 4 }}>
    <Heading as="h3" variant="subheadline" mb={2}>
      A project by <a href="https://hackclub.com/">Hack Club</a>.
    </Heading>
    <Text as="p" variant="caption" mb={3} sx={{ width: ['85%', '75%', '60%'] }}>
      <Link href="/arcade/power-hour">Prelaunch site.</Link>
    </Text>
    <Text as="p" variant="caption" mb={3} sx={{ width: ['85%', '75%', '60%'] }}>
      Hack Club is a registered 501(c)3 nonprofit organization that supports a
      network of 20k+ technical high schoolers. We believe you learn best by
      building so we're creating community and providing grants so you can make. In the past few years, we've{' '}
      <Link href="https://summer.hackclub.com" target="_blank">
        given away 100k+ in hardware grants
      </Link>
      ,{' '}
      <Link
        href="https://github.com/hackclub/the-hacker-zephyr"
        target="_blank"
      >
        hosted the world's longest hackathon on land
      </Link>
      , and{' '}
      <Link href="https://github.com/hackclub/assemble" target="_blank">
        brought 183 teenagers to SF for a hackathon
      </Link>
      .
    </Text>
  </Box>
)

const ArcadeFooter = () => {
  return (
    <Footer>
      <Description />
    </Footer>
  )
}

export default ArcadeFooter
