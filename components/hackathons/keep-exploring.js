import { Box, Heading, Button, Text, Grid, Container } from 'theme-ui'
import Link from 'next/link'
import Icon from '../icon'

export default function KeepExploring() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: t => t.util.gx('orange', 'red'),
          margin: 'auto',
          maxWidth: '90%',
          my: 4,
          borderRadius: 8,
          color: 'white',
          textAlign: 'center',
          py: 5
        }}
      >
        <Heading
          as="h1"
          sx={{
            fontSize: 6,
            mb: 3,
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
          }}
        >
          Keep exploring{' '}
          <Icon
            glyph="explore"
            size={70}
            sx={{ display: ['none', 'flex', 'flex'] }}
          />
        </Heading>
        <Link href="/slack" passHref>
          <Button
            sx={{
              bg: 'white',
              color: 'red',
              mr: [0, 3],
              mb: [3, 0],
              fontSize: [2, 3]
            }}
            as="a"
          >
            Meet other hackers
          </Button>
        </Link>

        <Link href="https://hackathons.hackclub.com" passHref>
          <Button sx={{ bg: 'white', color: 'red', fontSize: [2, 3] }} as="a">
            Discover more hackathons
          </Button>
        </Link>
      </Box>

      <Container>
        <Grid
          columns={[null, '1fr 2fr']}
          my={[3, 5]}
          sx={{ maxWidth: 'copyUltra', mx: 'auto' }}
        >
          <Heading as="h3" variant="headline" sx={{ fontSize: [4, 5], mb: 0 }}>
            Behind the scenes...
          </Heading>
          <Text
            as="p"
            variant="lead"
            sx={{ mt: 0, a: { variant: 'styles.a', color: 'blue' } }}
          >
            Teenagers organize hackathons like{' '}
            <a
              href="https://assemble.hackclub.com"
              target="_blank"
              rel="noreferrer"
            >
              Assemble
            </a>{' '}
            &{' '}
            <a href="https://windyhacks.com" target="_blank" rel="noreferrer">
              Windy&nbsp;City&nbsp;Hacks
            </a>
            . The&nbsp;hack’s the limit.
            <Box as="div" sx={{ mt: 3 }}></Box>
            Hack Club is providing grants, support, and more, to help you run
            the next amazing hackathon.
          </Text>
        </Grid>
      </Container>
    </>
  )
}
