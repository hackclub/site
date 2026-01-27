import { Box, Button, Grid, Heading, Text } from 'theme-ui'
import Icon from '@hackclub/icons'
import NextLink from 'next/link'

export default function HCBCTA() {
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
        <Icon glyph="bank-account" size={72} />
        <Box>
          <Heading as="h2" variant="headline" mt={0}>
            Looking to start a nonprofit?
          </Heading>
          <Text variant="subtitle" sx={{ lineHeight: 'caption', mb: 3 }}>
            We're accepting applications! No startup fees, no minimum balance, and no long wait time.
          </Text>
          <br />
          <br />
          <NextLink href="/fiscal-sponsorship" passHref legacyBehavior>
            <Button bg="cyan" as="a">
              Learn more
            </Button>
          </NextLink>

          &nbsp;&nbsp;&nbsp;

          <NextLink href="https://nonprofit.new" passHref legacyBehavior>
            <Button bg="orange" as="a">
              Apply now
            </Button>
          </NextLink>
        </Box>
      </Grid>
    </Box>
  );
}
