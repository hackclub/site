import { Box, Button, Container, Heading, Grid, Card, Text } from 'theme-ui'
import theme from '@hackclub/theme'
import { Slide, Zoom } from 'react-reveal'
import BreakdownBox from './breakdown-box'
import Signup from './form'

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
            bg="blue"
          />
          <BreakdownBox
            icon="payment-transfer"
            text="$250"
            description="grants instantly transferred through HCB"
            delay="200"
            bg="blue"
          />
          <Zoom delay="300">
            <Card
              variant="translucent"
              sx={{
                borderRadius: 'default',
                px: 3,
                pb: 4,
                pt: 2,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Text
                variant="subtitle"
                sx={{
                  fontWeight: 'bold',
                  color: 'blue',
                  textShadow: '0px 0px 21px #ffffff'
                }}
              >
                Open a Demo Account
              </Text>
              <Text variant="caption">
                While you wait for your hardware, explore and get familiar with
                HCB with limited access to features until you get fully
                activated.
              </Text>
              <Signup />
            </Card>
          </Zoom>
          {/* <Box
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
          </Box> */}
        </Grid>
        <Button
          variant="ctaLg"
          as="a"
          href="#rsvp"
          style={{
            zIndex: '100',
            textAlign: 'center',
            backgroundImage: theme.util.gx('green', 'blue')
          }}
        >
          RSVP
        </Button>
      </Container>
    </>
  )
}

export default Recap
