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
      title="Lead Hacker"
      description="Hack Club is a hiring a Lead Hacker for HCB as the 9th full-time member of our team in Burlington, Vermont."
      image="https://workshop-cards.hackclub.com/Lead%20Hacker.png?theme=light&md=1&fontSize=250px&caption=Open%2520Role%2520%2540%2520Hack%2520Club%2520Bank&brand=HQ&md=true"
    />
    <ForceTheme theme="light" />
    <Nav />

    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('purple', 'red')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading as="h1" variant="title" mb={30}>
          Lead Hacker @&nbsp;HCB
        </Heading>
        <Text variant="headline" sx={{ fontWeight: 400 }}>
          This position has been filled as of June 14th, 2022.
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
      <Heading
        variant="headline"
        sx={{ fontWeight: 700, fontSize: [4, 5], mb: 4 }}
      >
        Hack Club is (no longer) hiring a Lead Hacker for HCB.
      </Heading>

      <Text as="p" mb={4}>
        Starting a nonprofit is hard, so we built{' '}
        <Link href="/hcb" target="_blank">
          HCB
        </Link>{' '}
        for our community of {formatted}+ teenage programmers. Within 24 hours
        of joining HCB, organizations get 501(c)(3) nonprofit status, access to
        a beautiful dashboard for managing their finances, and all financial and
        legal matters - from tax filings to payroll - handled. 50% of high
        school hackathons worldwide run on HCB, and Elon Musk has tweeted that
        we're a{' '}
        <Link
          href="https://twitter.com/elonmusk/status/1263275969743216640"
          target="_blank"
          rel="noopener noreferrer"
        >
          "cool group"
        </Link>
        .
      </Text>

      <Text as="p" mb={4}>
        Now, HCB is expanding beyond just Hack Clubbers.{' '}
        <strong>
          Over 500 organizations running on HCB have transacted upwards of
          $5,000,000;
        </strong>{' '}
        from teenage-run hackathons to{' '}
        <Link
          href="https://vtdigger.org/2021/04/13/frustrated-with-one-local-newspaper-prominent-charlotte-journalists-help-start-another/"
          target="_blank"
          rel="noopener noreferrer"
        >
          small-town newspapers
        </Link>
        .
      </Text>

      <Text as="p">
        With the right leadership, we hope to bring HCB to thousands of
        organizations across the United States and process tens of millions of
        dollars in transactions. We think do-gooders need the same tools that
        software engineers do. For them, HCB is like GitHub: transformative.
        Right now, HCB is the{' '}
        <strong>
          only part of Hack Club that isn't{' '}
          <Link
            href="https://github.com/hackclub/"
            target="_blank"
            rel="noopener noreferrer"
          >
            open source
          </Link>
          .
        </strong>{' '}
        In the next year we want to open source it, build an amazing community
        of Hack Clubbers contributing to it, and onboard 1,000 new organizations
        through our{' '}
        <Link
          href="https://givebutter.com/fiscal-sponsorship"
          target="_blank"
          rel="noopener noreferrer"
        >
          partnership with Givebutter
        </Link>
        .
      </Text>

      <Box my={5}>
        <strong>✨ The perfect candidate:</strong>

        <Grid
          my={3}
          gap={3}
          columns={[null, null, 2]}
          sx={{
            '> div': {
              p: 3,
              fontSize: 2
            }
          }}
        >
          <Card
            sx={{
              background:
                'radial-gradient(ellipse farthest-corner at top left, #d56d21, #cd2b42)',
              color: 'white'
            }}
          >
            Loves coding, is a Ruby on Rails expert, and has managed small teams
            of engineers before
          </Card>

          <Card
            sx={{
              background: 'linear-gradient(-32deg, #6f31b7 14%, #c6479e 82%)',
              color: 'white'
            }}
          >
            Is product-oriented, believes in attention-to-detail and creating
            phenomenal user experiences
          </Card>

          <Card
            sx={{
              background: 'linear-gradient(120deg, #0e5ea0 0%, #338eda 100%)',
              color: 'white'
            }}
          >
            Has strong familiarity with open source, maybe even built or managed
            open source projects
          </Card>

          <Card
            sx={{
              background:
                'radial-gradient(ellipse farthest-corner at top right, #33d6a6, #0d7485)',
              color: 'white'
            }}
          >
            Has experience building resilient systems and implementing security
            best practices and/or loves working with teenagers
          </Card>
        </Grid>

        <Text as="p">
          This role pays between $150K - $210K, depending on your experience. We
          know that might be less than you'd make elsewhere. We offer healthcare
          and 4 weeks paid vacation.
        </Text>
      </Box>

      <Heading
        variant="headline"
        sx={{ fontWeight: 700, fontSize: [4, 5], mb: 4 }}
      >
        Make HCB even more awesome.
      </Heading>

      <Box sx={{ p: { my: [3, 4] } }}>
        <Text as="p">
          HCB has been maintained by a{' '}
          <Link href="/team/" target="_blank">
            {' '}
            small team
          </Link>{' '}
          of two full-time operations people, and on-and-off contributions by
          engineers and various contractors. The majority of{' '}
          <Link href="https://changelog.hcb.hackclub.com/" target="_blank">
            contributions
          </Link>{' '}
          are actually made by teenagers! In this role, you'll take point on
          bringing HCB to its full potential.
        </Text>

        <Text as="p">
          HCB already powers{' '}
          <Link href="https://hcb.hackclub.com/hq" target="_blank">
            our own transparent finances
          </Link>{' '}
          as well as those of{' '}
          <Link
            href="https://hcb.hackclub.com/miami-hack-week/"
            target="_blank"
          >
            many
          </Link>{' '}
          <Link href="https://hcb.hackclub.com/mesto/" target="_blank">
            other
          </Link>{' '}
          <Link href="https://hcb.hackclub.com/techshift/" target="_blank">
            organizations
          </Link>
          . These are just some of the initiatives we support:
        </Text>

        <Grid mb={5} gap={3} columns={[null, 2, 3]}>
          <Photo
            src="/jobs/charlotte-vt.jpg"
            alt={
              <>
                <Link
                  href="https://thecharlottebridge.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Charlotte Bridge
                </Link>
                , independent journalism based in Vermont
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
                <Link
                  href="https://www.youtube.com/watch?v=2BID8_pGuqA"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Hacker Zephyr
                </Link>
                , the world's longest (by land) hackathon on a train
              </>
            }
            width={500}
            height={326.5}
            showAlt
          />
          <Photo
            src="/jobs/hack-penn.jpg"
            alt={
              <>
                <Link
                  href="https://hackpenn.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Hack Pennsylvania
                </Link>
                , the largest high school hackathon in Pennsylvania
              </>
            }
            width={500}
            height={326.5}
            showAlt
          />
        </Grid>

        <Text as="p">
          Like a CTO, you'll work directly with real users to define HCB's
          roadmap around <strong>making HCB better for Hack Clubbers.</strong>{' '}
          You will build and lead a team of Hack Clubbers to create a shipping
          culture around HCB, and lead and manage relationships with technical
          partners who integrate HCB into their products.
        </Text>

        <Text as="p">
          We're flexible and eager to accommodate for the right candidate. While
          we have a preference for in-person and can assist with relocation,
          we're open to remote options. We have an in-person office in
          Burlington, Vermont where our 8 person team works collaboratively.
        </Text>

        <Box as="p">
          <strong>How to apply:</strong> Email{' '}
          <Link
            href="mailto:jobs@hackclub.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            jobs@hackclub.com
          </Link>{' '}
          with "HCB" in the subject line, 3 bullet points demonstrating why you
          would be exceptional for the role, and your resume / GitHub / GitLab /
          sourcehut.
        </Box>
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
    </Container>
  </>
)

export default Page
