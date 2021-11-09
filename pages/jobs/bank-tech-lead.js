import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/bank-tech-lead/jd.mdx'
import ForceTheme from '../../components/force-theme'

export default () => (
  <>
    <Meta
      as={Head}
      title="Bank Operations Lead"
      description="Hack Club is a hiring a Bank Operations Lead as the 7th full-time member of our team in Burlington, Vermont."
      image="https://workshop-cards.hackclub.com/Bank Ops Lead @ Hack Club.png?fontSize=175px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('purple', 'red')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title" mb={30}>
          Bank Tech Lead
        </Heading>
        <Text variant="headline" sx={{ fontWeight: 400 }}>
          New job open as of December 11th, 2021.
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
