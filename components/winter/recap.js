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
              pb: 4,
              maxWidth: '90%'
            }}
          >
            Make your ideas real this winter, with electronics and Hack Club
            friends.{' '}
          </Heading>
        </Slide>
        <Grid gap={[2, 2, 3]} columns={[1, 1, 3, 3]} pb={4}>
          <BreakdownBox
            icon="event-code"
            text="10 days"
            description="of building with other teenagers around the world"
            delay="100"
          />
          <BreakdownBox
            icon="payment-transfer"
            text="$250"
            description="grants instantly transferred through Hack Club Bank"
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
