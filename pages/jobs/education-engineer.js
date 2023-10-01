import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/education-engineer/jd.mdx'
import ForceTheme from '../../components/force-theme'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Education Engineer"
      description="Hack Club is a hiring for an engineer/educator to create and lead on technical projects for Hack Clubbers, with a strong focus on girls at Hack Club."
      image="https://workshop-cards.hackclub.com/Education%20Engineer%20%40%20Hack%20Club.png?fontSize=180px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('red', 'orange')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title">
          Education Engineer @&nbsp;Hack&nbsp;Club
        </Heading>
        <Text variant="headline">New job open as of November 20th, 2021.</Text>
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
