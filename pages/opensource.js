import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text,
  Link
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Icon from '@hackclub/icons'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import { Octokit } from '@octokit/rest'
import ForceTheme from '../components/force-theme'

export const BankProject = ({ name, url }) => (
  <Card
    variant="sunken"
    as="a"
    target="_blank"
    href={url}
    sx={{
      p: [2, 2],
      display: 'flex',
      alignItems: 'center',
      color: 'black',
      textDecoration: 'none',
      pr: [3, 3],
      '> svg': {
        opacity: '0',
        transition: '0.3s ease-in-out'
      },
      '&:hover > svg': {
        opacity: '1'
      }
    }}
  >
    <Text
      variant="subheadline"
      sx={{ fontSize: [2, 3], mt: 2, mb: 2, mx: 2, flexGrow: 1 }}
    >
      {name}
    </Text>

    <Icon glyph={'external'} size={24} color="placeholder" />
  </Card>
)

const Page = ({ repos, transparentAccounts }) => (
  <>
    <Meta
      as={Head}
      title="Open Source"
      description="Explore our finances, code, planning documents and more."
      image="https://workshop-cards.hackclub.com/Open%20Source.png?theme=dark&fontSize=350px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav color="text" />
    <Box
      as="header"
      sx={{
        bg: 'sheet',
        color: 'text',
        pt: [5, null, null, null, 6],
        pb: [3, 4, 5, null, 6],
        textAlign: 'center'
      }}
    >
      <Container variant="copy">
        <Heading
          as="h1"
          variant="title"
          sx={{ color: 'primary', mt: [2.5, 4] }}
        >
          Open Source at Hack Club
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          Explore our finances, code, planning documents and more.
        </Heading>
        <Button
          variant="outline"
          as="a"
          target="_blank"
          mt={3}
          href="https://contribute.hackclub.com"
        >
          Contribute to Our Projects
        </Button>
      </Container>
    </Box>
    <Container
      sx={{
        py: [3, 4],
        maxWidth: [null, 'copyUltra'],
        h2: { variant: 'text.headline' }
      }}
    >
      <Heading
        variant="headline"
        sx={{ marginBlockEnd: '0em', mb: '4px!important' }}
      >
        Finances
      </Heading>
      <Text sx={{ fontSize: 2, color: 'placeholder' }}>
        All open sourced through HCB Transparency Mode.
      </Text>
      <Grid columns={2} gap={3} mt={2} mb={[4]}>
        {transparentAccounts.map(account => (
          <BankProject
            key={account.id}
            name={account.name}
            url={`https://hcb.hackclub.com/${account.slug}`}
          />
        ))}
      </Grid>
      <Heading
        variant="headline"
        sx={{ marginBlockEnd: '0em', mb: '4px!important' }}
      >
        Events
      </Heading>
      <Text sx={{ fontSize: 2, color: 'placeholder' }}>
        Includes planning documents, partnership emails, meeting notes etc.
      </Text>
      <Grid columns={2} gap={3} mt={2} mb={[4]}>
        <BankProject
          name="Outernet"
          url={`https://github.com/hackclub/outernet`}
        />
        <BankProject name="Epoch" url={`https://github.com/hackclub/epoch`} />
        <BankProject
          name="Assemble"
          url={`https://github.com/hackclub/assemble`}
        />
        <BankProject
          name="The Hacker Zephyr"
          url={`https://github.com/hackclub/the-hacker-zephyr`}
        />
        <BankProject
          name="Hack Camp"
          url={`https://github.com/hackclub/camp`}
        />
      </Grid>
      <Heading
        variant="headline"
        sx={{ marginBlockEnd: '0em', mb: '12px!important' }}
      >
        Content
      </Heading>
      <Grid columns={3} gap={3} mt={2} mb={[4]}>
        <BankProject name="Jams" url={`https://github.com/hackclub/jams`} />
        <BankProject
          name="Workshops"
          url={`https://github.com/hackclub/hackclub/tree/main/workshops`}
        />
        <BankProject
          name="VIP Newsletter"
          url={`https://github.com/hackclub/vip-newsletters`}
        />
        <BankProject
          name="Community Newsletter"
          url={`https://github.com/hackclub/newsletter`}
        />
        <BankProject name="Meetings" url={`https://meetings.hackclub.com`} />
      </Grid>
      <Heading
        variant="headline"
        sx={{ marginBlockEnd: '0em', mb: '12px!important' }}
      >
        GitHub Repositories
      </Heading>

      <Link
        href="https://contribute.hackclub.com/"
        sx={{ fontSize: 2, display: 'block', mb: 3 }}
      >
        Want to contribute?
      </Link>

      {repos
        .sort(function (a, b) {
          var keyA = a.stargazers_count,
            keyB = b.stargazers_count
          if (keyA < keyB) return 1
          if (keyA > keyB) return -1
          return 0
        })
        .map(repo => (
          <Flex
            key={repo.id}
            sx={{
              alignItems: 'center',
              color: 'black',
              textDecoration: 'none'
            }}
            as="a"
            href={`https://github.com/hackclub/${repo.name}`}
            target="_blank"
          >
            <Text
              sx={{
                mr: 2,
                fontSize: 2,
                whiteSpace: 'nowrap',
                minWidth: 'fit-content'
              }}
            >
              <b>{repo.name}</b>
            </Text>
            <Text
              sx={{
                mr: 3,
                flexGrow: 1,
                color: 'muted',
                whiteSpace: ' nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {repo.description?.replace(
                /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
                ''
              )}
            </Text>
            <Text sx={{ whiteSpace: 'nowrap', minWidth: 'fit-content' }}>
              {repo.stargazers_count} ★
            </Text>
          </Flex>
        ))}
    </Container>
    <Footer />
  </>
)

export default Page

export async function getStaticProps() {
  const octokit = new Octokit({
    auth: process.env.GITHUB
  })
  const repos = await octokit.paginate('GET /orgs/{org}/repos', {
    org: 'hackclub'
  })

  const transparentAccounts = (
    await fetch('https://hcb.hackclub.com/api/v3/organizations').then(res =>
      res.json()
    )
  ).filter(account => account.category?.replaceAll(' ', '_') === 'hack_club_hq')

  return { props: { repos, transparentAccounts }, revalidate: 30 }
}
