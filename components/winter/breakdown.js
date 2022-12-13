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
      <Box
        sx={{
          pt: 3,
          pb: 5,
          background: 'linear-gradient(180deg, #579AC9 0%, #338EDA 100%)'
        }}
      >
        <Container>
          <Slide>
            <Heading
              variant="headline"
              sx={{
                textShadow: '0px 0px 21px #E1F1FF',
                color: 'white',
                fontStyle: 'italic'
              }}
            >
              <Fade>Dear high school hacker, we have a challenge for you:</Fade>
            </Heading>
            <Heading
              variant="headline"
              sx={{
                textShadow: '0px 0px 21px #E1F1FF',
                color: 'white',
                fontSize: [4, 5, 6],
                pb: 4,
                mt: 0
              }}
            >
              <Fade>What will you make this winter?</Fade>
            </Heading>
          </Slide>
          <Fade>
            <Heading
              variant="headline"
              sx={{
                // textShadow: '0px 0px 21px #E1F1FF',
                color: '#338eda',
                background: 'white',
                px: 3,
                py: 2,
                borderRadius: '10px',
                width: 'fit-content'
              }}
            >
              Join Hack Clubbers in a winter of making with
            </Heading>
          </Fade>

          <Grid gap={[2, 2, 3]} columns={[1, 1, 3, 3]} py={3}>
            <BreakdownBox
              icon="friend"
              color="#5bc0de"
              text="Friends"
              description="Find support from our community of 20k+ teenagers in the Hack Club Slack."
              delay="300"
              href="/slack"
            />
            <BreakdownBox
              icon="event-code"
              color="#5bc0de"
              text="Daily progress"
              description={
                <>
                  From <strong>Feb 14-23</strong>, work on your project, share
                  short photo/video updates each day.
                </>
              }
              delay="100"
              href="https://scrapbook.hackclub.com/r/10daysinpublic"
            />
            <BreakdownBox
              icon="settings"
              color="#5bc0de"
              text="Free hardware"
              description="We'll pay for up to $250 of your hardware to build your project."
              delay="200"
            />
          </Grid>
        </Container>
      </Box>
    </>
  )
}

export default Breakdown
