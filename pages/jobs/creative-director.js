import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/creative-director/jd.mdx'
import ForceTheme from '../../components/force-theme'

export default () => (
  <>
    <Meta
      as={Head}
      title="Creative Director"
      description="Hack Club is a hiring a Creative Director as the 8th full-time member of our team in Burlington, Vermont."
      image="https://workshop-cards.hackclub.com/Creative Director @ Hack Club.png?fontSize=175px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('blue', 'purple')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title">
          Hack Club Creative Director
        </Heading>
        <Text variant="headline">
          Tell the story of Hack Club. New job open as of February 8th, 2021.
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
