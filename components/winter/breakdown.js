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
import { Fade, Slide } from 'react-reveal'
import BreakdownBox from './breakdown-box'

function Breakdown() {
  return (
    <>
      <Box sx={{ py: 4, background: 'linear-gradient(180deg, #579AC9 0%, #338EDA 100%)' }}>
        <Container>
        <Slide>
          <Heading
            variant="headline"
            sx={{
              textAlign: 'center',
              textShadow: '0px 0px 21px #E1F1FF',
              color: 'white',
              fontSize: [3, 4, 5],
              pb: 4
            }}
          >
            <Fade delay={500}>
            Mark your calendars.
            </Fade>
            <Fade delay={1000}>
            For 10 days, hundreds of makers are gathering in the Hack Club Slack to code together.
            </Fade>
          </Heading>
        </Slide>
        <Grid gap={[2, 4, 5]} columns={[1, 3, 3]} pb={4}>
        <BreakdownBox
            subtitle="Online"
            text="Community"
            description="where you meet other technical teenagers"
            delay="300"
          />
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
        </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Breakdown
