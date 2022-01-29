import {
  Box,
  Container,
  Link,
  Text,
  Heading,
  Card,
  Flex,
  Button
} from 'theme-ui'
import { Fade } from 'react-reveal'
import Timeline from './Timeline'
import Stats from './Stats'

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
          <Box
            as="div"
            sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
          >
            <Button
              variant="ctaLg"
              as="a"
              href="/bank/apply"
              sx={{ zIndex: '99' }}
            >
              Apply Now
            </Button>
          </Box>
        </Container>
        <Timeline />

        <Flex sx={{ justifyContent: 'center', py: 5 }}>
          <Fade bottom>
            <Container variant="narrow" sx={{ m: 0 }}>
              <Card>
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
                  Starting in February 2020, we started running Hack Club HQ on
                  Bank (&amp; we don’t count our numbers in these stats). &nbsp;
                  <Link
                    href="https://bank.hackclub.com/hq"
                    color="primary"
                    hoverline
                  >
                    See our finances here.
                  </Link>
                </Text>
              </Card>
            </Container>
          </Fade>
        </Flex>

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
