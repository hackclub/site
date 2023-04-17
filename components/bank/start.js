import {
  Box,
  Link,
  Text,
  Heading,
  Flex,
} from 'theme-ui'
import Timeline from './timeline'
import Stats from './stats'
import ApplyButton from './apply-button'

export default function Start({ stats }) {
  return (
    <>
      <Box as="section" id="apply" py={6}>
        <Flex
          sx={{ flexDirection: 'column', alignItems: 'center', gap: 5, mx: 4 }}
        >
          <Flex
            sx={{
              flexDirection: 'column',
              textAlign: 'center',
              gap: 3
            }}
          >
            <Heading variant="ultratitle" color="white">
              Sign up for Hack&nbsp;Club&nbsp;Bank.
            </Heading>
            <Text color="muted" variant="lead" m="0 !important">
              Open to Hack Clubs, hackathons, and charitable organizations in
              the US and Canada.
            </Text>
          </Flex>
          <Stats stats={stats} />
          <Timeline />
          <Flex
            sx={{ flexDirection: 'column', textAlign: 'center', gap: 4, mx: 3 }}
          >
            <ApplyButton />
            <Text color="muted" sx={{ fontSize: 18 }}>
              We run Hack Club HQ on Bank!{' '}
              <Link href="https://bank.hackclub.com/hq" color="primary">
                See&nbsp;our&nbsp;finances.
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}
