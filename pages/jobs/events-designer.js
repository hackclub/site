import { Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/events-designer/jd.mdx'
import ForceTheme from '../../components/force-theme'

export default () => (
  <>
    <Meta
      as={Head}
      title="Events Designer"
      description="Hack Club is looking for an events designer / producer with coding skills to create events for Hack Clubbers."
      image="https://workshop-cards.hackclub.com/Events Designer@ Hack Club.png?fontSize=185px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />

    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('#516395', '#614385')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title" mb={30}>
          Events Designer @&nbsp;Hack&nbsp;Club
        </Heading>
        <Text variant="headline" sx={{ fontWeight: 400 }}>
          New job open as of October 21st, 2021.
        </Text>
      </Container>
    </Box>

    <Container
      as="section"
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
