import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/bank-ops-associate/jd.mdx'
import ForceTheme from '../../components/force-theme'

export default () => (
  <>
    <Meta
      as={Head}
      title="Bank Operations Associate"
      description="Hack Club is a hiring a Bank Operations Associate as the 8th full-time member of our team in Burlington, Vermont."
      image="https://workshop-cards.hackclub.com/Bank Ops Associate @ Hack Club.png?fontSize=175px&brand=HQ"
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
        <Heading as="h1" variant="title">
          Bank Operations Associate
        </Heading>
        <Text variant="headline">
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
