import {
  Box,
  Flex,
  Container,
  Heading,
  Grid,
  Text,
  Badge,
  Link
} from 'theme-ui'
import { Slide } from 'react-reveal'
import BreakdownBox from './breakdown-box'

function Breakdown() {
  return (
    <>
      <Container sx={{ py: 4 }}>
        <Slide>
          <Heading
            variant="headline"
            sx={{
              textShadow: '0px 0px 21px #E1F1FF',
              color: 'white',
              fontSize: [3, 4, 5],
              pb: 4
            }}
          >
            For 10 days, build something together with hundreds of other makers
            around the world.
          </Heading>
        </Slide>
        <Grid gap={[2, 4, 5]} columns={[1, 3, 3]} pb={4}>
          <BreakdownBox
            subtitle="From"
            text="Feb 5-15"
            description="work on your project while sharing daily progress in Slack."
            delay="100"
          />
          <BreakdownBox
            subtitle="Get up to"
            text="$250"
            description="in grant money to build your project. Varies by project."
            delay="200"
          />
          <BreakdownBox
            subtitle="Instant access to"
            text="Debit cards"
            description="to order your hardware, thanks to Hack Club Bank."
            delay="300"
          />
        </Grid>
      </Container>
    </>
  )
}

export default Breakdown
