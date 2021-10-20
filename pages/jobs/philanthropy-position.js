import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/philanthropy-position/jd.mdx'
import ForceTheme from '../../components/force-theme'

export default () => (
  <>
    <Meta
      as={Head}
      title="Philanthropy Position"
      description="Hack Club is a hiring for a deputy to the COO to focus on philanthropy."
      image="https://workshop-cards.hackclub.com/Philanthropy Position @ Hack Club.png?fontSize=160px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('yellow', 'pink')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title">
        Philanthropy Position @&nbsp;Hack&nbsp;Club
        </Heading>
        <Text variant="headline">
          New job open as of October 19th, 2021.
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
