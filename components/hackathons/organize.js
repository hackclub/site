import { Box, Container, Heading, Text, Button, Card } from 'theme-ui'
import Icon from '../icon'
import NextLink from 'next/link'
import ScrollHint from '../scroll-hint'

import theme from '../../lib/theme'

export default function Organize() {
  return (
    <Box
      as="section"
      sx={{
        bg: 'white',
        my: [4, 5]
      }}
      variant="layout.copy"
    >
      <Card
        sx={{
          textAlign: 'center',
          color: 'white',
          backgroundImage: t => t.util.gx('green', 'blue'),
          //   backgroundImage:
          //     'url(https://cloud-d86slt0pv-hack-club-bot.vercel.app/0dsc_1269.jpg)',
          objectFit: 'cover'
        }}
      >
        <Icon glyph="idea" size={72} sx={{ color: 'white' }} />
        <Heading variant="headline">Want to organize a hackathon?</Heading>
        <Text
          variant="subtitle"
          sx={{ lineHeight: 'caption', mb: 3, display: 'inline-block' }}
        >
          This semester, Hack Club is providing the tools and resources to high
          schoolers around the world to bring the magic of hackathons to their
          lcoal communities.
        </Text>

        <Icon glyph="down-caret" size={24} sx={{ color: 'white' }} />

        {/* <NextLink href="/slack" passHref>
          <Button variant="cta" sx={{ py: 2, px: 3, fontSize: 2 }} as="a">
            Join our Slack
          </Button>
        </NextLink> */}
      </Card>
    </Box>
  )
}
