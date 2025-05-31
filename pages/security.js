import { Box, Container, Heading } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import SecurityContent from '../components/security/content.mdx'

const SecurityPage = () => (
  <>
    <Meta
      as={Head}
      title="Security"
      description="Hack Club's Security & Vulnerability Disclosure Policy"
      image="https://workshop-cards.hackclub.com/Security.png?fontSize=350px"
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
          Hack Club Security
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          Responsible Disclosure Policy
        </Heading>
      </Container>
    </Box>
    <Container
      variant="copy"
      sx={{
        py: [4, 5],
        fontSize: [2, 3]
      }}
    >
      <SecurityContent />
    </Container>
    <Footer />
  </>
)

export default SecurityPage
