import { Box, Container, Link, Text, Heading, Card, Grid } from 'theme-ui'
import { Fade } from 'react-reveal'
import Signup from './Signup'
import Timeline from './Timeline'
import Stats from './Stats'

export default function Start() {
  return (
    <>
      <Box as="section" id="apply" pt={6}>
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
        <Signup />
        <Grid mt={[4, 5]} mb={[3, 4]} px={3} columns={[1, 1, '1fr 1fr']}>
          <Fade bottom>
            {/* <Sheet bg="#252429" color="snow" maxWidth={32} p={[3, 4, 5]}> */}
            <Card
              variant="primary"
              sx={{
                backgroundColor: 'darkless',
                color: 'snow',
                width: 356,
                float: 'right',
                marginRight: 4
              }}
            >
              <Text variant="heading" sx={{ fontSize: 24 }}>
                Your project
              </Text>
              <Signup />
            </Card>
            {/* </Sheet> */}
          </Fade>
          <div>
            <Stats
              color="smoke"
              labelColor="muted"
              fontSize={[7, 8]}
              my={[3, 4]}
              px={[0, 0]}
              width="auto"
              align="left"
            />
            <Text sx={{ fontSize: 20, color: 'muted', maxWidth: 96 }}>
              Starting in February 2020, we started running Hack Club HQ on Bank
              (&amp; we don’t count our numbers in these stats).{' '}
              <Link
                href="https://bank.hackclub.com/hq"
                color="primary"
                hoverline
              >
                See our finances here.
              </Link>
            </Text>
          </div>
        </Grid>
        <Container
          variant="copy"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Text
            variant="lead"
            maxWidth={36}
            color="slate"
            align="center"
            fontSize={2}
          >
            Hack Club does not directly provide banking services. Banking
            services provided by Silicon Valley Bank, an FDIC-certified
            institution.
          </Text>
        </Container>
      </Box>
    </>
  )
}
