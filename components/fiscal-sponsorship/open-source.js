import { Box, Heading, Button, Text, Container, Grid, Flex } from 'theme-ui'
import Icon from '../icon'
import Photo from '../photo'
import HCBGource from '../../public/fiscal-sponsorship/hcb-gource.gif'

export default function OpenSource() {
  return (
    <Box as="section" sx={{ py: [4, 5], bg: "snow" }}>
        <Container>
          <Grid columns={[1, 2]} gap={[4, 5]} sx={{ alignItems: 'center' }}>
            <div>
              <Heading as="h2" variant="headline" sx={{ mb: 3 }}>
                Open source infrastructure for fiscally sponsored organizations.
              </Heading>
              <Text as="p" sx={{ mb: 3 }}>
                HCB is open source and built in public, like many other Hack
                Club projects. Join us in building the infrastructure powering
                fiscally sponsored organizations around the world.
              </Text>
              <Flex
                sx={{
                  flexWrap: 'wrap',
                  gap: 3
                }}
              >
                <Button
                  as="a"
                  sx={{ flexShrink: 0, gap: 14, paddingLeft: 25 }}
                  variant="outline"
                  target="_blank"
                  href="https://github.com/hackclub/hcb"
                >
                  Star on GitHub
                  <Icon glyph="github" />
                </Button>
                <Button
                  as="a"
                  sx={{ flexShrink: 0, gap: 1, paddingLeft: 25, paddingRight: '5px' }}
                  href="https://hackclub.com/hcb/open-source"
                  target="_blank"
                >
                  Read our blog post
                  <Icon glyph="view-forward" />
                </Button>
              </Flex>
            </div>
            <Photo src={HCBGource} width={888} height={500} sx={{ maxWidth: '100%', width: 'auto !important', height: '500 !important', boxShadow: 'elevated' }} alt="Since open-sourcing, we've merged over 1,800 pull requests from contributors!" showAlt />
          </Grid>
        </Container>
      </Box>
  )
}