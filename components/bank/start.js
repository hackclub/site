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
import ApplyButton from './apply-button'

export default function Start() {
  return (
    <>
      <Box as="section" id="apply" py={6}>
        <Flex sx={{ flexDirection: 'column', alignItems: 'center', gap: 5, mx: 4 }}>
          <Flex
            sx={{
              flexDirection: 'column',
              textAlign: 'center',
              gap: 3,
            }}
          >
            <Heading variant="ultratitle" color="white">
              Sign up for Hack&nbsp;Club&nbsp;Bank.
            </Heading>
            <Text color='muted' variant='lead' m='0 !important'>
              Open to Hack Clubs, hackathons, and charitable organizations in the US and Canada.
            </Text>
          </Flex>
          <Stats />
          <Timeline />
          <Flex sx={{ flexDirection: 'column', textAlign: 'center', gap: 4, mx: 3 }}>
            <ApplyButton />
            <Text color='muted' sx={{ fontSize: 18 }}>We run Hack Club HQ on Bank!{' '}
              <Link
                href='https://bank.hackclub.com/hq'
                color='primary'
              >
                See&nbsp;our&nbsp;finances.
              </Link>
            </Text>
          </Flex>
        </Flex>
        {/* <Grid mt={[4, 5]} mb={[3, 4]} px={3} columns={[1, 1, '1fr 1fr']}>
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
                Your organization
              </Text>
              <Signup />
            </Card>
          </Fade>
          <Container variant="narrow" sx={{ pr: [null, null, 2, 6], m: 0 }}>
            
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
        </Container> */}
      </Box>
    </>
  )
}
