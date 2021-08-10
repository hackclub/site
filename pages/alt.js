import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Flex,
  Link,
  Text
} from 'theme-ui'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'

export default function Page({ dataPieces }) {
  const experiments = [
    ...dataPieces.sort(() => 0.5 - Math.random()),
    <>🚢 New ship by Sam Poder</>,
    <Flex sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          bg: 'green',
          borderRadius: 999,
          width: '14px',
          height: '14px',
          display: 'inline-block',
          mr: 2
        }}
      ></Box>{' '}
      256 Slack Members Online
    </Flex>,
    <>💸 $10,000 just raised!</>
  ]
  const Node = ({text}) => (
    <Box
      bg="dark"
      m="1"
      px="2"
      sx={{
        borderRadius: 4,
        flexGrow: 1,
        maxHeight: '30px',
        fontSize: 2,
        opacity: '0.3',
        border: '1px solid',
        borderColor: 'steel'
      }}
    >
      {text}
    </Box>
  )
  return (
    <>
      <ForceTheme theme="light" />
      <Box bg="darker" pt="5" pb="3" color="white">
        {' '}
        <Nav dark />
        <Box bg="darker" color="white" sx={{ position: 'relative' }}>
          <Flex
            bg="darker"
            sx={{
              flexWrap: 'wrap',
              p: 1,
              pb: 0,
              overflow: 'hidden',
              maxHeight: '422px'
            }}
          >
            {dataPieces.map((u, i) => (
              <Node text={u} />
            ))}
            {[...Array(40)].map((u, i) => (
              <Node text="💸 $10,000 just raised!"/>
            ))}
          </Flex>

          <Box
            sx={{
              display: 'flex',
              position: 'absolute',
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%'
            }}
          >
            <Box
              m="1"
              bg="dark"
              sx={{
                borderRadius: 8,
                flexGrow: 1,
                maxHeight: '336px',
                width: '90vw',
                maxWidth: '800px',
                display: 'flex',
                textAlign: 'center',
                alignItems: 'center',
                boxShadow: 'card',
                py: 4
              }}
            >
              <Box>
                <Heading
                  as="h1"
                  sx={{
                    fontSize: 5,
                    marginBlockEnd: '0em',
                    marginBlockStart: '0em'
                  }}
                >
                  Welcome to the
                </Heading>
                <Heading
                  as="h1"
                  sx={{
                    fontSize: 7,
                    WebkitTextStroke: 'currentColor',
                    WebkitTextStrokeWidth: ['2px', '3px'],
                    WebkitTextFillColor: 'transparent',
                    color: 'blue',
                    marginBlockEnd: '0em',
                    marginBlockStart: '0em',
                    mt: '-16px'
                  }}
                >
                  <i>HACKERVERSE</i>
                </Heading>
                <Box sx={{ fontSize: 2, px: 5, mt: '-10px' }}>
                  We're a nonprofit network of high school coding clubs and
                  makers around the world.{' '}
                  <strong>Applications are now open.</strong>
                </Box>
                <Flex sx={{ justifyContent: 'center', mt: 2 }}>
                  <Button mr={2} variant="cta">
                    Start a Club
                  </Button>
                  <Button variant="outline">Join the Slack</Button>
                </Flex>
              </Box>{' '}
            </Box>{' '}
          </Box>
        </Box>
      </Box>
    </>
  )
}

// Fetchable Data:

// Bank Stats

export async function getStaticProps() {
  let dataPieces = []
  let initialBankData = await fetch('https://bank.hackclub.com/stats').then(r =>
    r.json()
  )
  dataPieces.push(
    `💰 ${initialBankData.raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised on Bank`
  )
  dataPieces.push(
    `💵 ${initialBankData.last_qtr.raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised on Bank this quarter`
  )
  dataPieces.push(
    `💵 ${initialBankData.last_year.raised.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} raised on Bank this year`
  )
  dataPieces.push(
    `💸 ${initialBankData.transactions_volume.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    })} transacted through Bank`
  )
  dataPieces.push(`🎙 ${initialBankData.events_count} Bank projects`)
  let initialGitHubData = await fetch(
    'https://api.github.com/orgs/hackclub/events'
  ).then(r => r.json())
  initialGitHubData = initialGitHubData.map(x =>
    x.type == 'PushEvent' ||
    x.type == 'WatchEvent' ||
    x.type == 'PullRequestEvent'
      ? x.type == 'PushEvent'
        ? `✅ New commit in ${x.repo.name}`
        : x.type == 'WatchEvent'
        ? `⭐️ New star on ${x.repo.name}`
        : x.type == 'PullRequestEvent'
        ? `🔀 New PR for ${x.repo.name}`
        : `🎉 New activity in ${x.repo.name}`
      : null
  )
  console.log([...new Set(initialGitHubData)])
  dataPieces = [
    ...dataPieces,
    ...new Set(
      initialGitHubData.filter(function (el) {
        return el != null
      })
    )
  ]
  return { props: { dataPieces }, revalidate: 30 }
}
