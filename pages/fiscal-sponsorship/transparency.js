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

export default function TransparencyPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Make Your Finances Transparent – Fiscal Sponsorship"
        description="Share your finances with your team and optionally make them public. Build trust through transparency with HCB."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          pt: 6,
          pb: [5, 6],
          bg: 'cyan',
          backgroundImage: 'linear-gradient(to bottom right, #09AFE7, #0066FF)',
          color: 'white'
        }}
      >
        <Container>
          <Icon glyph="explore" size={64} sx={{ mb: 3, color: 'white' }} />
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
              Transparency builds trust
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Make your finances transparent to your team and optionally, the public. 
            Show donors exactly where their money goes and build credibility through openness.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'cyan'
              }}
            >
              Get transparent
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Two modes of transparency
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Choose the level of transparency that works for your organization.
              </Text>
            </Box>
            <Box />
          </Grid>
          <Grid columns={[1, null, 2]} gap={4} sx={{ mt: 4 }}>
            <Card
              sx={{
                p: 4,
                bg: 'white',
                border: '2px solid',
                borderColor: 'blue'
              }}
            >
              <Icon glyph="admin" size={56} sx={{ color: 'blue', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Team transparency
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                Share your organization's finances with team members. Everyone can see 
                the balance, transactions, and spending patterns—perfect for collaborative 
                decision-making.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>All team members can view finances</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Real-time balance updates</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Full transaction history</Text>
                </Flex>
              </Flex>
            </Card>
            <Card
              sx={{
                p: 4,
                bg: 'white',
                border: '2px solid',
                borderColor: 'cyan'
              }}
            >
              <Icon glyph="explore" size={56} sx={{ color: 'cyan', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Public transparency
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                Make your finances visible to the world. Show donors, sponsors, and the 
                community exactly how you're using funds. Build trust and attract more support.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Public financial dashboard</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Share-able transparency page</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Anonymous donor protection</Text>
                </Flex>
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            What transparency looks like
          </Heading>
          <Grid columns={[1, 2, 3]} gap={4}>
            <Box>
              <Box
                sx={{
                  bg: 'blue',
                  p: 3,
                  borderRadius: 'default',
                  mb: 3,
                  color: 'white'
                }}
              >
                <Text sx={{ fontSize: 4, fontWeight: 'bold' }}>$47,293</Text>
                <Text sx={{ fontSize: 1 }}>Current balance</Text>
              </Box>
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                Real-time balance
              </Heading>
              <Text sx={{ color: 'muted', fontSize: 1 }}>
                See your organization's current balance at any time. Updated instantly 
                with every transaction.
              </Text>
            </Box>
            <Box>
              <Card variant="sunken" sx={{ p: 3, mb: 3 }}>
                <Flex sx={{ justifyContent: 'space-between', mb: 2 }}>
                  <Text sx={{ fontWeight: 'bold' }}>Office supplies</Text>
                  <Text sx={{ color: 'red' }}>-$127.43</Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between', mb: 2 }}>
                  <Text sx={{ fontWeight: 'bold' }}>Grant received</Text>
                  <Text sx={{ color: 'green' }}>+$5,000.00</Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between' }}>
                  <Text sx={{ fontWeight: 'bold' }}>Software license</Text>
                  <Text sx={{ color: 'red' }}>-$29.99</Text>
                </Flex>
              </Card>
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                Transaction history
              </Heading>
              <Text sx={{ color: 'muted', fontSize: 1 }}>
                Every transaction, categorized and timestamped. Easy to search and filter.
              </Text>
            </Box>
            <Box>
              <Box
                sx={{
                  bg: 'cyan',
                  p: 3,
                  borderRadius: 'default',
                  mb: 3,
                  color: 'white'
                }}
              >
                <Flex sx={{ justifyContent: 'space-between', mb: 2 }}>
                  <Text>Events</Text>
                  <Text sx={{ fontWeight: 'bold' }}>47%</Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between', mb: 2 }}>
                  <Text>Operations</Text>
                  <Text sx={{ fontWeight: 'bold' }}>31%</Text>
                </Flex>
                <Flex sx={{ justifyContent: 'space-between' }}>
                  <Text>Marketing</Text>
                  <Text sx={{ fontWeight: 'bold' }}>22%</Text>
                </Flex>
              </Box>
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                Spending breakdown
              </Heading>
              <Text sx={{ color: 'muted', fontSize: 1 }}>
                See where money goes by category. Perfect for budgeting and reporting.
              </Text>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                bg: 'blue',
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Heading as="h3" variant="title" sx={{ mb: 3, color: 'white' }}>
                Why transparency matters
              </Heading>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    Build donor trust
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Donors give more when they can see exactly how their contributions 
                    are used.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    Empower your team
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    When everyone can see the finances, everyone takes ownership of 
                    the budget.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    Simplify audits
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Complete transparency makes grant reporting and audits a breeze.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Join the transparency movement
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Hundreds of HCB organizations have made their finances public. The result? 
                More donations, more trust, and more impact.
              </Text>
              <Card variant="sunken" sx={{ p: 4, bg: 'sunken' }}>
                <Text as="p" sx={{ fontStyle: 'italic', mb: 2 }}>
                  "Making our finances public was the best decision we made. Our 
                  donors love seeing where their money goes, and we've seen a 40% 
                  increase in repeat donations."
                </Text>
                <Text as="strong">— Reboot</Text>
              </Card>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box
        as="section"
        sx={{
          py: [5, 6],
          bg: 'cyan',
          backgroundImage: 'linear-gradient(to bottom right, #09AFE7, #0066FF)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 3, color: 'white' }}>
            Start with transparency from day one
          </Heading>
          <Text variant="lead" sx={{ maxWidth: '52ch', mx: 'auto', mb: 4 }}>
            HCB makes financial transparency easy. No extra setup, no hidden costs.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'cyan'
              }}
            >
              Apply now
            </Button>
          </Link>
        </Container>
      </Box>

      <Footer />
    </>
  )
}
