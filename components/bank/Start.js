import {
  Box,
  Container,
  Link,
  Text,
  Heading,
  Card,
  Flex,
  Grid,
  Button
} from 'theme-ui'
import { Fade } from 'react-reveal'
import Timeline from './timeline'
import Stats from './stats'
import Signup from './Signup'

export default function Start() {
  return (
    <>
      <Box
        as="section"
        id="apply"
        sx={{
          pt: 6,
          zIndex: -999
        }}
      >
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
            Sign up for Hack&nbsp;Club&nbsp;Bank.
          </Heading>
          <Container variant="narrow" sx={{ color: 'muted' }}>
            <Text variant="lead">
              Open to all registered Hack Clubs, hackathons, and your next
              amazing project.
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
                width: ['100%', null, 356],
                float: [null, null, 'right']
              }}
            >
              <Text variant="heading" sx={{ fontSize: 24, lineHeight: 2 }}>
                Your project
              </Text>
              <Signup />
            </Card>
          </Fade>
          <Container variant="narrow" sx={{ pr: [null, null, 2, 6], m: 0 }}>
            <Stats
              color="smoke"
              labelColor="muted"
              fontSize={[7, 8]}
              my={[3, 4]}
              px={0}
              width="auto"
              align="left"
            />
            <Text
              sx={{
                fontSize: 18,
                color: 'muted'
              }}
            >
              Starting in February 2020, we started running Hack Club HQ on Bank
              (&amp; we don’t count our numbers in these stats). &nbsp;
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
          <Text sx={{ fontSize: 18, color: 'muted', mx: [3, null, 6] }}>
            Hack Club does not directly provide banking services. Banking
            services provided by Silicon Valley Bank, an FDIC-certified
            institution.
          </Text>
        </Container>
      </Box>
    </>
  )
}
