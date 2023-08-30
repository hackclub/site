import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/hcb-ops-associate/jd.mdx'
import ForceTheme from '../../components/force-theme'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="HCB Operations Associate"
      description="Hack Club is a hiring a HCB Operations Associate as the 8th full-time member of our team in Burlington, Vermont."
      image="https://workshop-cards.hackclub.com/hcb%20Ops%20Associate%20%40%20Hack%20Club.png?fontSize=175px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('yellow', 'red')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title" mb={30}>
          HCB Operations Associate
        </Heading>
        <Text variant="headline" sx={{ fontWeight: 400 }}>
          New job open as of May 21st, 2021.
        </Text>
      </Container>
    </Box>
    <Container
      as={BaseStyles}
      variant="copy"
      sx={{
        pt: [3, 4],
        pb: [4, 5],
        fontSize: [2, 3]
      }}
    >
      <JobDescription />
    </Container>
  </>
)

export default Page
