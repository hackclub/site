import Meta from '@hackclub/meta'
import Head from 'next/head'
import Link from 'next/link'
import { Balancer } from 'react-wrap-balancer'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Text
} from 'theme-ui'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Icon from '../../components/icon'

export default function GlobalPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Operate Globally – Fiscal Sponsorship"
        description="Run your nonprofit globally with a U.S. legal entity. Accept international payments and expand your impact worldwide."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          pt: 6,
          pb: [5, 6],
          bg: 'purple',
          backgroundImage: 'radial-gradient(ellipse at top, #8492e6 0%, #a463bf 50%, #e42d42 100%)',
          color: 'white'
        }}
      >
        <Container>
          <Icon glyph="web" size={64} sx={{ mb: 3, color: 'white' }} />
          <Heading
            as="h1"
            variant="ultratitle"
            sx={{
              fontSize: [5, 6, 7],
              lineHeight: 1.1,
              mb: 3
            }}
          >
            <Balancer>
              Your nonprofit, <br/>now worldwide
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Operate globally with a U.S. legal entity. Accept donations and payments from 
            anywhere, expand your team internationally, and make impact without borders.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'purple'
              }}
            >
              Go global
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 3]} gap={4}>
            <Card variant="sunken" sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  bg: 'blue',
                  color: 'white',
                  width: 64,
                  height: 64,
                  borderRadius: 'circle',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <Icon glyph="bank-account" size={32} />
              </Box>
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                U.S. bank account
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Get a U.S. bank account through HCB, even if you're based internationally. 
                Essential for receiving U.S. grants and payments.
              </Text>
            </Card>
            <Card variant="sunken" sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  bg: 'green',
                  color: 'white',
                  width: 64,
                  height: 64,
                  borderRadius: 'circle',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <Icon glyph="payment-transfer" size={32} />
              </Box>
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                International transfers
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Send money globally via wire transfer. Pay vendors, reimburse team members, 
                and fund projects anywhere in the world.
              </Text>
            </Card>
            <Card variant="sunken" sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  bg: 'orange',
                  color: 'white',
                  width: 64,
                  height: 64,
                  borderRadius: 'circle',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <Icon glyph="analytics" size={32} />
              </Box>
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                Multi-currency support
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Accept donations in multiple currencies. We handle the conversion 
                automatically so you can focus on your mission.
              </Text>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                HCB powers nonprofits on every continent
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                From Toronto to Singapore, our fiscally sponsored organizations operate 
                globally while maintaining the benefits of U.S. nonprofit status.
              </Text>
              <Grid columns={2} gap={3}>
                <Box>
                  <Text as="div" sx={{ fontSize: 5, fontWeight: 'bold', color: 'blue' }}>
                    50+
                  </Text>
                  <Text sx={{ color: 'muted' }}>Countries represented</Text>
                </Box>
                <Box>
                  <Text as="div" sx={{ fontSize: 5, fontWeight: 'bold', color: 'green' }}>
                    100%
                  </Text>
                  <Text sx={{ color: 'muted' }}>Online operation</Text>
                </Box>
              </Grid>
            </Box>
            <Box
              sx={{
                bg: 'purple',
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Heading as="h3" variant="headline" sx={{ mb: 3, color: 'white' }}>
                Why a U.S. entity matters
              </Heading>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    Access to U.S. foundation grants and funding programs
                  </Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    501(c)(3) tax-deductible status for U.S. donors
                  </Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    Simplified banking and payment processing
                  </Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    Credibility with international partners and sponsors
                  </Text>
                </Flex>
              </Flex>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            Real stories from around the world
          </Heading>
          <Grid columns={[1, null, 2]} gap={4}>
            <Card sx={{ p: 4, bg: 'white', border: '1px solid', borderColor: 'smoke' }}>
              <Text as="p" variant="lead" sx={{ color: 'slate', mb: 3 }}>
                "As a Canadian organization, HCB gave us instant access to U.S. 
                foundations. We received our first grant within 3 months of joining."
              </Text>
              <Flex sx={{ alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 'circle',
                    bg: 'blue'
                  }}
                />
                <Box>
                  <Text as="strong" sx={{ display: 'block' }}>
                    Apocalypse
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>Toronto, Canada</Text>
                </Box>
              </Flex>
            </Card>
            <Card sx={{ p: 4, bg: 'white', border: '1px solid', borderColor: 'smoke' }}>
              <Text as="p" variant="lead" sx={{ color: 'slate', mb: 3 }}>
                "Operating globally used to mean navigating complex legal systems. 
                With HCB, we focus on our mission while they handle the paperwork."
              </Text>
              <Flex sx={{ alignItems: 'center', gap: 3 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 'circle',
                    bg: 'green'
                  }}
                />
                <Box>
                  <Text as="strong" sx={{ display: 'block' }}>
                    International Project
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>Worldwide</Text>
                </Box>
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box
        as="section"
        sx={{
          py: [5, 6],
          bg: 'purple',
          backgroundImage: 'radial-gradient(ellipse at top, #8492e6 0%, #a463bf 50%, #e42d42 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 3, color: 'white' }}>
            Ready to go global?
          </Heading>
          <Text variant="lead" sx={{ maxWidth: '52ch', mx: 'auto', mb: 4 }}>
            Join thousands of organizations operating worldwide with HCB.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'purple'
              }}
            >
              Start your application
            </Button>
          </Link>
        </Container>
      </Box>

      <Footer />
    </>
  )
}
