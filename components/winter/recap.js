import { Box, Button, Container, Heading, Grid } from 'theme-ui'
import { Slide } from 'react-reveal'
import BreakdownBox from './breakdown-box'

function Recap() {
  return (
    <>
      <Container sx={{ py: 5 }}>
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
            Bring your idea into the physical world today.{' '}
          </Heading>
        </Slide>
        <Grid gap={[2, 4, 5]} columns={[1, 3, 3]} pb={4}>
          <BreakdownBox
            icon="event-code"
            text="10 days"
            description="of making with other teenagers around the world"
            delay="100"
          />
          <BreakdownBox
            icon="payment-transfer"
            text="250 dollars"
            description="grants instantly disbursed through Hack Club Bank"
            delay="200"
          />
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'left'
            }}
          >
            <Button
              variant="outlineLg"
              sx={{
                color: 'white',
                mt: 3
              }}
              as="a"
              href="https://github.com/hackclub/wom"
              target="_blank"
              rel="noreferrer"
            >
              Apply
            </Button>
          </Box>
        </Grid>
      </Container>
    </>
  )
}

export default Recap

