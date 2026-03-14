import { BaseStyles, Box, Container, Heading, Link, Text } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'

const Imprint = () => (
  <>
    <Meta
      as={Head}
      title="Imprint"
      description="Legal notice and operator information for Hack Club."
      image="https://workshop-cards.hackclub.com/Imprint.png?brand=HQ&theme=light&fontSize=350px"
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
        <Heading as="h1" variant="title" sx={{ color: 'primary', mt: [2, 4] }}>
          Imprint (Legal Notice)
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          Legal notice and contact details for Hack Club (The Hack Foundation).
        </Heading>
      </Container>
    </Box>
    <Container
      variant="main"
      sx={{
        py: [3, 4],
        px: 3,
        maxWidth: [null, 'copyUltra'],
        h2: { variant: 'text.headline' }
      }}
    >
      <Heading variant="headline">Operator</Heading>
      <Box
        as={BaseStyles}
        sx={{
          mx: 0,
          fontSize: 2,
          '> p': { maxWidth: 'copy' },
          h2: { variant: 'text.headline', mt: 4 }
        }}
      >
        <Text as="p" sx={{ mt: 2 }}>
          The Hack Foundation ("Hack Club")
          <br />
          Non-profit corporation (501(c)(3)), incorporated in the United States
        </Text>
      </Box>

      <Heading variant="headline" sx={{ mt: 4 }}>Registered Address</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        8605 Santa Monica Blvd #86294
        <br />
        West Hollywood, CA 90069
        <br />
        United States
      </Text>

      <Heading variant="headline" sx={{ mt: 4 }}>Authorized Representative</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        Zach Latta, Founder
      </Text>

      <Heading variant="headline" sx={{ mt: 4 }}>Contact</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        Email: <Link href="mailto:team@hackclub.com">team@hackclub.com</Link>
        <br />
        Phone: <Link href="tel:+18556254225">+1-855-625-HACK</Link>
      </Text>

      <Heading variant="headline" sx={{ mt: 4 }}>VAT ID</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        Not applicable (U.S. nonprofit organization)
      </Text>

      <Heading variant="headline" sx={{ mt: 4 }}>Legal Status</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        Hack Club is a California nonprofit public benefit corporation, recognized as a 501(c)(3) organization under U.S. law.
        <br />
        EIN: 81-2908499
      </Text>

      <Heading variant="headline" sx={{ mt: 4 }}>Responsible for Content (§ 18 MStV)</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        Zach Latta, Founder
        <br />
        8605 Santa Monica Blvd #86294
        <br />
        West Hollywood, CA 90069
        <br />
        United States
      </Text>

      <Heading variant="headline" sx={{ mt: 4 }}>Dispute Resolution</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        Information on consumer dispute resolution entities in EU Member States is available at{' '}
        <Link href="https://consumer-redress.ec.europa.eu/dispute-resolution-bodies">consumer-redress.ec.europa.eu</Link>.
        As a U.S. nonprofit organization, Hack Club is not obligated or willing to participate in dispute resolution proceedings before a consumer arbitration board.
      </Text>

      <Heading variant="headline" sx={{ mt: 4 }}>Notes</Heading>
      <Text as="p" sx={{ mt: 2, fontSize: 2 }}>
        This imprint is provided to satisfy common EU/German transparency expectations (e.g., §5 DDG) and US best practices.
      </Text>
    </Container>
    <Footer />
  </>
)

export default Imprint
