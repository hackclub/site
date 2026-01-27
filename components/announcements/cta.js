import { Box, Button, Grid, Heading, Text } from 'theme-ui'
import Icon from '@hackclub/icons'
import NextLink from 'next/link'
import { thousands } from '../../lib/members'

export default function SlackCTA() {
  return (
    <Box
      as="section"
      sx={{
        bg: 'orange',
        backgroundImage: t => t.util.gx('yellow', 'orange'),
        color: 'white',
        py: [4, 5]
      }}
    >
      <Grid gap={[3, 4]} columns={[null, 'auto 1fr']} variant="layout.copy">
        <Icon glyph="welcome" size={72} />
        <Box>
          <Heading as="h2" variant="headline" mt={0}>
            Teenager? New here? Welcome!
          </Heading>
          <Text variant="subtitle" sx={{ lineHeight: 'caption', mb: 3 }}>
            Hack Club is a global community of high school makers & student-led
            coding clubs. We’ve got a 24/7 Slack chatroom of {thousands}k+
            teenagers learning to code & building amazing projects, & you’ll fit
            right in.
          </Text>
          <br />
          <br />
          <NextLink href="/" passHref>
            <Button bg="cyan" as="a">
              Learn more
            </Button>
          </NextLink>
        </Box>
      </Grid>
    </Box>
  )
}
