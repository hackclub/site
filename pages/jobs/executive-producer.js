import { BaseStyles, Box, Container, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import JobDescription from '../../components/jobs/executive-producer/jd.mdx'
import ForceTheme from '../../components/force-theme'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Executive Producer, Hack Club Communications"
      description="HHack Club is actively looking now to hire its first executive producer/ senior editor to tell its story across various platforms, including social media, newsletters, op-docs, blog/oped posts and direct emails, and curated partnerships with major tech companies."
      image="https://workshop-cards.hackclub.com/Executive%20Producer%40%20Hack%20Club.png?fontSize=175px&brand=HQ"
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
        Executive Producer
        </Heading>
        <Text variant="headline" sx={{ fontWeight: 400 }}>
          New job open as of July 6th, 2022.
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
