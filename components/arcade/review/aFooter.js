import { Box, Heading, Text, Link } from 'theme-ui'
import Footer from '../footer'

const Description = () => (
  <Box sx={{ a: { color: 'blue' }, pb: 4 }}>
    <Heading as="h3" variant="subheadline" mb={2}>
      <a href="/arcade/landing" title="Rewind back to the main landing page.">
        {' '}
        ⏮
      </a>
      A project by <a href="https://hackclub.com/">Hack Club</a> for Summer
      2024.
    </Heading>

    <Text as="p" variant="caption" mb={3} sx={{ width: ['85%', '75%', '60%'] }}>
      Thank you to: Manitej, Acon, Max, Zach L, Mel, Chris, Christina, Bartosz, Leo, Aarya, Arnav, Arish, and Zach R.
    </Text>
  </Box>
)

const AFooter = () => {
  return (
    <Footer>
      <Description />
    </Footer>
  )
}

export default AFooter
