import { Box, Heading, Container, Text, Grid, Flex } from 'theme-ui'
import Photo from '../photo'
import Link from 'next/link'

export default function Overview() {
  return (
    <>
      <Box as="section" sx={{ py: [4, 5], color: 'black' }}>
        <Container>
          <Heading
            sx={{
              fontSize: [36, 48],
              mb: 4,
              color: 'green',
              py: [4, 5]
            }}
          >
            A hackathon is a social coding marathon where teenagers come
            together and build and share projects.
          </Heading>
          <Grid columns={[null, null, 2, '3fr 2fr']} gap={[3, 4]} pt={[3, 3]}>
            <Flex
              sx={{
                p: { my: 3 },
                strong: { display: 'block' },
                flexDirection: 'column'
              }}
            >
              <Text as="p" variant="subtitle">
                <strong>The best way to learn is by building.</strong>A
                hackathon is a space that helps give makers everything they need
                to start building–mentors, collaborators, inspiration, and a
                goal to work towards. Hackers will leave a hackathon with a
                project of their own, ready and excited to keep hacking once
                they get home.
              </Text>

              <Text
                as="p"
                variant="subtitle"
                sx={{ mt: 0, a: { variant: 'styles.a', color: 'blue' } }}
              >
                <strong>We're at our best when we're making.</strong> Hack Club
                is a world wide community of thousands of high school makers.
                We're organizers, coders, hackers, painters, engineers,
                musicians, writers, volunteers. We make things. We want others
                to make things too.
              </Text>
            </Flex>
            <Photo
              src="https://cloud-3aeson6ue-hack-club-bot.vercel.app/0lahacks3.jpeg"
              alt="Los Altos Hacks III"
              width={3000}
              height={2550}
              showAlt
            />
          </Grid>
          <Grid
            columns={[null, '1fr 2fr']}
            mt={[3, 5]}
            sx={{ maxWidth: 'copyUltra', mx: 'auto' }}
          >
            <Heading
              as="h3"
              variant="headline"
              sx={{ fontSize: [4, 5], mb: 0 }}
            >
              Go beyond club meetings.
            </Heading>
            <Text
              as="p"
              variant="lead"
              sx={{ mt: 0, a: { variant: 'styles.a', color: 'blue' } }}
            >
              Hack Clubs attend and run{' '}
              <a href="https://hackathons.hackclub.com/">hackathons</a> like{' '}
              <a href="https://windyhacks.com">Windy&nbsp;City&nbsp;Hacks</a> &{' '}
              <a href="https://www.sfchronicle.com/bayarea/article/Hack-the-Fog-makes-history-as-San-12729895.php">
                Hack the Fog
              </a>
              , run summer programs like{' '}
              <a href="https://web.archive.org/web/20200808171549/http://thecspn.com/?p=43434">
                Hack Camp
              </a>
              , and compete in events like the{' '}
              <a href="http://www.congressionalappchallenge.us">
                Congressional App Challenge
              </a>
              . The&nbsp;hack’s the limit.
            </Text>
          </Grid>
        </Container>
      </Box>
    </>
  )
}
