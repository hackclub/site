import {
  Box,
  Heading,
  Flex,
  Container,
  Grid,
  Card,
  Image,
  Text
} from 'theme-ui'
import Icon from '@hackclub/icons'
import { Octokit } from "@octokit/rest";

const financeProject = [
  {
    name: 'Hack Club HQ',
    url: 'http://bank.hackclub.com/hq',
    image: 'https://pbs.twimg.com/media/E25LdOTWUAkIawC.jpg',
    description: 'The home of all our every day finances'
  },
  {
    name: 'The Hacker Zephyr',
    url: 'https://bank.hackclub.com/zephyr',
    description: 'Our 2021 Summer Project',
    image:
      'https://camo.githubusercontent.com/bab1c7d453175fc8658c1149be2b044107d10d6ef857d171c547e79e4fdf4632/68747470733a2f2f636c6f75642d6b31386337677271632d6861636b2d636c75622d626f742e76657263656c2e6170702f307370616365785f616e645f6861636b5f636c75622e6a7067'
  },
  {
    name: 'Summer of Making',
    url: 'https://bank.hackclub.com/summer-of-making',
    image: 'https://assets.hackclub.com/log/2020-06-18_summer.jpg',
    description: 'Our 2020 Summer Project'
  }
]

export default function OpenSource({repos}) {
  return (
    <>
      <Flex
        bg="sheet"
        sx={{
          minHeight: '40vh',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Heading color="primary" sx={{ fontSize: 5 }}>
          Open Source @ Hack Club
        </Heading>
      </Flex>
      <Container py={4}>
        <Flex
          sx={{
            alignItems: 'center'
          }}
          mb={1}
        >
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6
            }}
            bg="red"
          >
            <Icon glyph="bank-account" size="48" color="white" />{' '}
          </Flex>
          <Box ml={3}>
            <Heading as="h1">Finances</Heading>
            <Text variant="caption" sx={{ fontSize: 2 }}>
              We open source all of our finances through Hack Club Bank's
              transparency mode.
            </Text>
          </Box>
        </Flex>
        <Box mb={3}></Box>
        <Grid columns={[1, 3]}>
          {financeProject.map(project => (
            <Card variant="interactive" as="a" href={project.url} p={[0, 0]}>
              <Image
                src={project.image}
                sx={{ height: '200px', width: '100%', objectFit: 'cover' }}
              />
              <Box p={3} pt={2}>
                <Heading>{project.name}</Heading>
                <Box>{project.description}</Box>
              </Box>
            </Card>
          ))}
        </Grid>
        <Flex
          sx={{
            alignItems: 'center'
          }}
          mb={1}
          mt={4}
        >
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              p: '3px'
            }}
            bg="purple"
          >
            <Icon glyph="event-code" size="42" color="white" />{' '}
          </Flex>
          <Box ml={3}>
            <Heading as="h1">Code</Heading>
            <Text variant="caption" sx={{ fontSize: 2 }}>
              We build a lot of tools @ Hack Club, and open source the code on GitHub.
            </Text>
          </Box>
        </Flex>
        <Box mb={3}></Box>
        <Grid columns={[1, 3]}>
          {financeProject.map(project => (
            <Card variant="interactive" as="a" href={project.url} p={[0, 0]}>
              <Image
                src={project.image}
                sx={{ height: '200px', width: '100%', objectFit: 'cover' }}
              />
              <Box p={3} pt={2}>
                <Heading>{project.name}</Heading>
                <Box>{project.description}</Box>
              </Box>
            </Card>
          ))}
        </Grid>
        <Flex
          sx={{
            alignItems: 'center'
          }}
          mb={1}
          mt={4}
        >
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 6,
              p: '3px'
            }}
            bg="black"
          >
            <Icon glyph="github" size="42" color="white" />{' '}
          </Flex>
          <Box ml={3}>
            <Heading as="h1">All Our Repos on GitHub</Heading>
          </Box>
        </Flex>
        <Box mb={3}></Box>
        <Grid columns={1}>
          {repos.map(repo => (
            <Card as="a" p={[3, 3]}>
              {repo.name}
            </Card>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export async function getStaticProps(){
  const octokit = new Octokit();
  const repos = await octokit.paginate('GET /orgs/{org}/repos', {
    org: 'hackclub'
  })
  return {props: {repos}}
}
