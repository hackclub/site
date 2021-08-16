import { Box, Container, Link, Text, Heading, Card, Grid } from 'theme-ui'
import { Fade } from 'react-reveal'
import Signup from './Signup'
import Timeline from './Timeline'
import Stats from './Stats'

export default function Start() {
  return (
    <>
      <Box as="section" id="apply" sx={{ bg: 'darker', pt: 6 }}>
        <Container
          px={3}
          mb={[4, 5]}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center'
          }}
        >
          <Heading variant="ultratitle" color="white" mb={2}>
            Sign up for Hack&nbsp;Club Bank.
          </Heading>
          <Container variant="narrow" sx={{ color: 'muted' }}>
            <Text variant="lead">
              Open to all US-based registered Hack Clubs, hackathons, and your
              next amazing project.
            </Text>
          </Container>
        </Container>
        <Timeline />
        <Grid mt={[4, 5]} mb={[3, 4]} px={3} columns={[1, 1, '1fr 1fr']}>
          <Fade bottom>
            <Card
              variant="primary"
              sx={{
                backgroundColor: 'darkless',
                color: 'snow',
                width: 356,
                float: 'right',
                marginRight: 2
              }}
            >
              <Text variant="heading" sx={{ fontSize: 24, lineHeight: 2 }}>
                Your project
              </Text>
              <Signup />
            </Card>
          </Fade>
          <Container variant="narrow">
            <Stats
              color="smoke"
              labelColor="muted"
              fontSize={[7, 8]}
              my={[3, 4]}
              px={[0, 0]}
              width="auto"
              align="left"
            />
            <Text sx={{ fontSize: 18, color: 'muted' }}>
              Starting in February 2020, we started running
              <br /> Hack Club HQ on Bank (&amp; we don’t count our <br />{' '}
              numbers in these stats).{' '}
              <Link
                href="https://bank.hackclub.com/hq"
                color="primary"
                hoverline
              >
                See our finances here.
              </Link>
            </Text>
          </Container>
        </Grid>
        <Container
          variant="copy"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            paddingBottom: 6
          }}
        >
          <Text sx={{ fontSize: 18, color: 'muted' }}>
            Hack Club does not directly provide banking services. Banking
            services
            <br /> provided by Silicon Valley Bank, an FDIC-certified
            institution.
          </Text>
        </Container>
      </Box>
    </>
  )
}
