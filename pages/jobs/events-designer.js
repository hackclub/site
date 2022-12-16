import { Link, Box, Container, Heading, Text, Grid, Flex, Card } from 'theme-ui'
import Head from 'next/head'
import Nav from '../../components/nav'
import Meta from '@hackclub/meta'
import ForceTheme from '../../components/force-theme'
import Photo from '../../components/photo'
import { formatted } from '../../lib/members'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Events Designer"
      description="Hack Club is looking for an events designer / producer with coding skills to create events for Hack Clubbers."
      image="https://workshop-cards.hackclub.com/Events%20Designer%20%40%20Hack%20Club.png?fontSize=185px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />

    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('#516395', '#614385')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title" mb={30}>
          Events Designer @&nbsp;Hack&nbsp;Club
        </Heading>
        <Text variant="headline" sx={{ fontWeight: 400 }}>
          New job open as of October 21st, 2021.
        </Text>
      </Container>
    </Box>

    <Container
      as="section"
      sx={{
        py: [4, 5],
        fontSize: [2, 3]
      }}
    >
      <Text sx={{ fontStyle: 'italic' }}>
        This role has been filled as of February 8th, 2022.
      </Text>
      <Heading
        variant="headline"
        sx={{ fontWeight: 700, fontSize: [4, 5], mb: 4 }}
      >
        Hack Club is hiring an Events Designer!
      </Heading>

      <Text as="p" sx={{ fontWeight: 700 }}>
        We do crazy things...
      </Text>

      <Grid
        my={3}
        gap={3}
        columns={[null, null, 3]}
        sx={{
          '> div': {
            p: 3,
            fontSize: 2
          }
        }}
      >
        <Card variant="sunken">
          42 Hack Clubbers{' '}
          <Link
            href="https://www.youtube.com/watch?v=2BID8_pGuqA"
            target="_blank"
            rel="noopener noreferrer"
          >
            rode a train
          </Link>{' '}
          across America to SpaceX.
        </Card>
        <Card variant="sunken">
          We hosted{' '}
          <Link
            href="https://hackclub.com/amas/"
            target="_blank"
            rel="noopener noreferrer"
          >
            AMAs
          </Link>{' '}
          with people like{' '}
          <Link
            href="https://www.youtube.com/watch?v=riru9OzScwk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Elon Musk
          </Link>{' '}
          and{' '}
          <Link
            href="https://www.youtube.com/watch?v=gw3vyFZ4oeU"
            target="_blank"
            rel="noopener noreferrer"
          >
            Grant Sanderson
          </Link>
          .
        </Card>
        <Card variant="sunken">
          We gave 300 teenagers $50,000 for{' '}
          <Link
            href="https://summer.hackclub.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            their hardware projects
          </Link>
          .
        </Card>
      </Grid>

      <Text as="p">
        We're looking for someone <strong>fun, creative, and technical</strong>{' '}
        to excite and grow the community.
      </Text>

      <Grid my={5} gap={5} columns={[null, null, 2]}>
        <Box>
          <strong>Couple things about you:</strong>

          <Flex
            sx={{
              flexDirection: 'column',
              my: 3,
              gap: 3,
              pr: [0, 0, 5],
              '> div': {
                p: 3,
                fontSize: 2
              }
            }}
          >
            <Card
              sx={{
                background:
                  'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
                color: 'white'
              }}
            >
              You're passionate about building technical projects and find
              tinkering fun
            </Card>

            <Card
              sx={{
                background: 'linear-gradient(-32deg, #6f31b7 14%, #c6479e 82%)',
                color: 'white'
              }}
            >
              You've worked with teenagers and are excited to work 1:1 with them
              every day
            </Card>

            <Card
              sx={{
                background: 'linear-gradient(120deg, #0e5ea0 0%, #338eda 100%)',
                color: 'white'
              }}
            >
              You have event planning or media production experience and want to
              apply it
            </Card>
          </Flex>

          <Box sx={{ fontSize: 2, p: { my: 3 } }}>
            <Text as="p">
              We have a strong preference for someone in-person in Vermont, but
              we will consider applications from people who want to work
              remotely, provided they are willing to travel to our offices.
            </Text>

            <Text as="p">
              Relocation assistance available. We have COVID protocols and take
              them seriously.
            </Text>
          </Box>
        </Box>

        <Box>
          <strong>Projects you'll lead on:</strong>

          <Flex
            sx={{
              flexDirection: 'column',
              gap: 3,
              my: 3,
              pr: [0, 0, 5],
              '> div': {
                p: 3,
                fontSize: 2
              }
            }}
          >
            <Card variant="sunken">
              Produce and project manage the big, crazy things we do every few
              months
            </Card>
            <Card variant="sunken">
              Support Hack Clubbers in creating and executing{' '}
              <Link
                href="https://scrapbook.hackclub.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                their awesome ideas
              </Link>
            </Card>
            <Card variant="sunken">
              Revive{' '}
              <Link
                href="https://hackclub.com/night/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hack Night
              </Link>
              , our weekly casual technical hangout with the community
            </Card>
            <Card variant="sunken">
              Lead on organizing AMAs and conversations with famous tech leaders
            </Card>
            <Card variant="sunken">
              Game design events at Hack Club to better help students form
              meaningful relationships
            </Card>
          </Flex>
        </Box>
      </Grid>

      <Heading
        variant="headline"
        sx={{ fontWeight: 700, fontSize: [4, 5], mb: 4 }}
      >
        Hack Club is where {formatted}+ teenage programmers talk, build, and
        have fun together.
      </Heading>

      <Grid my={4} gap={3} columns={[null, 2, 3]}>
        <Photo
          src="/home/flagship_4.jpg"
          alt={
            <>
              Hack Clubbers at{' '}
              <Link
                href="https://photos.app.goo.gl/F5JDxq5FzfhofTMD9"
                target="_blank"
                rel="noopener noreferrer"
              >
                Flagship
              </Link>
            </>
          }
          width={500}
          height={326.5}
          showAlt
        />
        <Photo
          src="/home/golden-train.png"
          alt={
            <>
              The{' '}
              <Link
                href="https://zephyr.hackclub.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                world's longest hackathon
              </Link>{' '}
              on land
            </>
          }
          width={500}
          height={326.5}
          sx={{ display: ['none', 'none', 'block'] }}
          showAlt
        />
        <Photo
          src="/home/workshops.jpg"
          alt="One of the workshops run by community members"
          width={500}
          height={326.5}
          sx={{ display: ['none', 'block', 'block'] }}
          showAlt
        />
      </Grid>

      <Box sx={{ p: { my: [3, 4] } }}>
        <Text as="p">
          This is not a normal job. For the last 18 months, a{' '}
          <Link
            href="https://hackclub.com/team/"
            target="_blank"
            rel="noopener noreferrer"
          >
            small team
          </Link>{' '}
          has produced a series of online events, and we're excited to hire an
          incredible, technical person to carry forward and build on these
          ideas. You'd be our 9th or so full-time staff member.
        </Text>

        <Text as="p">
          In the{' '}
          <Link
            href="https://hackclub.com/slack/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hack Club Slack
          </Link>
          , you'll work with our community to create the best and most inclusive
          place on the internet for technical teenagers. To work at Hack Club,
          you need to have a background in programming, but{' '}
          <strong>you should be inspired by making things fun.</strong>
        </Text>

        <Text as="p">
          We are actively looking for candidates who have worked successfully
          with girl hackers before. We invite and encourage all interested
          candidates to apply even if they don't feel they meet all of the
          criteria.
        </Text>

        <Text as="p">
          This role pays between $60K - $100K, depending on your
          experience&mdash; and we know that's probably less than you'd make
          elsewhere. We offer healthcare and 4 weeks paid vacation.
        </Text>
      </Box>

      <Flex
        sx={{
          flexDirection: ['column', 'column', 'row'],
          gap: 4,
          fontSize: 2,
          my: 5
        }}
      >
        <Box sx={{ flex: 1, maxWidth: [null, null, 400] }}>
          <Photo
            src="/jobs/hq.jpg"
            alt="Our headquarters in beautiful Shelburne, Vermont"
            width={500}
            height={326.5}
            showAlt
          />
        </Box>

        <Box sx={{ flex: 1, p: { mb: 3 } }}>
          <Box as="p">
            The mission of Hack Club is to be a place where teenagers can become
            more technical, feel welcome in getting started, and feel inspired
            to build with code in ways that are always honest, transparent,
            high-integrity, kind, and friendly. We want teenagers to
            self-organize and assert themselves as persons.
          </Box>

          <Box as="p">
            Already, Hack Club is the{' '}
            <strong>largest network of teen coders in the country</strong>. We
            hope for a world where Hack Club becomes a nationwide cultural
            institution, creating a new generation of young people with the
            skills, network, and value system to become problem-solvers and
            builders for the 21st century&mdash; a new Boy and Girl Scouts.
          </Box>
        </Box>
      </Flex>

      <Box as="p" mt={5}>
        <strong>How to apply:</strong> Email{' '}
        <Link
          href="mailto:jobs@hackclub.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          jobs@hackclub.com
        </Link>{' '}
        with "golden" in the subject line, 3 bullet points demonstrating why you
        would be exceptional for the role, and your resume.
      </Box>
    </Container>
  </>
)

export default Page
