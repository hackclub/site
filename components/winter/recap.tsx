/** @jsxImportSource theme-ui */
import { Button, Container, Heading, Grid, Card, Text } from 'theme-ui'
import { Slide, Zoom } from '../react-reveal-compat'
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
            friends.
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
                This event has ended
              </Text>
              <Text variant="caption">
                Winter Hardware Wonderland is no longer accepting signups. Check
                out the projects that were built on GitHub!
              </Text>
            </Card>
          </Zoom>
        </Grid>
        <Button
          variant="ctaLg"
          as="a"
          href="https://github.com/hackclub/winter"
          sx={{
            zIndex: '100',
            textAlign: 'center'
          }}
        >
          View Projects
        </Button>
      </Container>
    </>
  )
}

export default Recap
