import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/philanthropy-communications-lead/jd.mdx'
import ForceTheme from '../../components/force-theme'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Philanthropy Communications Lead"
      description="Hack Club is a hiring a Philanthropy Communications Lead to join our team in Shelburne, Vermont."
      image="https://workshop-cards.hackclub.com/Philanthropy%20Communications%20Lead%20%40%20Hack%20Club.png?fontSize=200px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('green', 'blue')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title" mb={30}>
          Philanthropy Communications Lead @&nbsp;Hack&nbsp;Club
        </Heading>
        <Text variant="headline" sx={{ fontWeight: 400 }}>
          This position has been filled as of May 3rd, 2022.
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
