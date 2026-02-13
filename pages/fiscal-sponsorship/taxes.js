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

export default function TaxesPage() {
  return (
    <>
      <Meta
        as={Head}
        title="We File All Your Taxes – Fiscal Sponsorship"
        description="Automatic tax filing including Form 990. HCB handles all your nonprofit tax obligations so you can focus on your mission."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          pt: 6,
          pb: [5, 6],
          bg: 'orange',
          backgroundImage: 'radial-gradient(ellipse at top left, #FF8C37 0%, #EC3750 100%)',
          color: 'white'
        }}
      >
        <Container>
          <Icon glyph="docs" size={64} sx={{ mb: 3, color: 'white' }} />
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
              Taxes? We've got you covered.
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            We file all your taxes automatically, including Form 990. No accountant needed, 
            no tax stress, no surprises. Just focus on your mission.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'orange'
              }}
            >
              Get started
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 'copyPlus', mx: 'auto', mb: 5 }}>
            <Heading as="h2" variant="title" sx={{ mb: 3 }}>
              Everything we handle for you
            </Heading>
            <Text variant="lead" sx={{ color: 'slate' }}>
              Tax compliance is complex. We make it automatic.
            </Text>
          </Box>
          <Grid columns={[1, 2]} gap={4}>
            <Card sx={{ p: 4, bg: 'white', border: '1px solid', borderColor: 'smoke' }}>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'orange' }}>
                Form 990
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                The annual information return required by the IRS for all nonprofits. 
                We prepare and file it automatically—you don't lift a finger.
              </Text>
              <Flex sx={{ alignItems: 'center', gap: 2 }}>
                <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                <Text sx={{ fontSize: 1 }}>Filed on time, every year</Text>
              </Flex>
            </Card>
            <Card sx={{ p: 4, bg: 'white', border: '1px solid', borderColor: 'smoke' }}>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'red' }}>
                1099 Forms
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                Pay contractors? We generate and file 1099 forms for all payments over 
                $600, ensuring IRS compliance.
              </Text>
              <Flex sx={{ alignItems: 'center', gap: 2 }}>
                <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                <Text sx={{ fontSize: 1 }}>Automatic contractor reporting</Text>
              </Flex>
            </Card>
            <Card sx={{ p: 4, bg: 'white', border: '1px solid', borderColor: 'smoke' }}>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'blue' }}>
                State filings
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                Many states require annual reports and registrations. We monitor 
                requirements and file on your behalf.
              </Text>
              <Flex sx={{ alignItems: 'center', gap: 2 }}>
                <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                <Text sx={{ fontSize: 1 }}>Multi-state compliance</Text>
              </Flex>
            </Card>
            <Card sx={{ p: 4, bg: 'white', border: '1px solid', borderColor: 'smoke' }}>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'purple' }}>
                Tax receipts
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                We automatically send tax-deductible donation receipts to your donors 
                with all required information.
              </Text>
              <Flex sx={{ alignItems: 'center', gap: 2 }}>
                <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                <Text sx={{ fontSize: 1 }}>Instant donor receipts</Text>
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Why automatic taxes matter
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Missing a tax deadline can cost you thousands in penalties and put 
                your nonprofit status at risk. With HCB, that's impossible.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Card variant="sunken" sx={{ p: 3 }}>
                  <Flex sx={{ gap: 3, alignItems: 'start' }}>
                    <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                    <Box>
                      <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                        Never miss a deadline
                      </Text>
                      <Text sx={{ color: 'muted', fontSize: 1 }}>
                        We track all tax deadlines and file on time, automatically.
                      </Text>
                    </Box>
                  </Flex>
                </Card>
                <Card variant="sunken" sx={{ p: 3 }}>
                  <Flex sx={{ gap: 3, alignItems: 'start' }}>
                    <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                    <Box>
                      <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                        Save thousands on accountants
                      </Text>
                      <Text sx={{ color: 'muted', fontSize: 1 }}>
                        No need to hire an accountant or tax preparer.
                      </Text>
                    </Box>
                  </Flex>
                </Card>
                <Card variant="sunken" sx={{ p: 3 }}>
                  <Flex sx={{ gap: 3, alignItems: 'start' }}>
                    <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                    <Box>
                      <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                        Stay compliant effortlessly
                      </Text>
                      <Text sx={{ color: 'muted', fontSize: 1 }}>
                        Tax laws change. We keep up so you don't have to.
                      </Text>
                    </Box>
                  </Flex>
                </Card>
              </Flex>
            </Box>
            <Box
              sx={{
                bg: 'orange',
                backgroundImage: 'radial-gradient(ellipse at top left, #FF8C37 0%, #EC3750 100%)',
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Icon glyph="docs" size={72} sx={{ mb: 3, color: 'white' }} />
              <Heading as="h3" variant="headline" sx={{ mb: 3, color: 'white' }}>
                What you need to do
              </Heading>
              <Text sx={{ fontSize: 5, fontWeight: 'bold', mb: 3 }}>
                Nothing.
              </Text>
              <Text sx={{ fontSize: 2 }}>
                Seriously. HCB's automated systems track your transactions, categorize 
                expenses, and file all required tax forms. You'll get email confirmations 
                when filings are complete, but you never need to think about taxes.
              </Text>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            Compare the alternatives
          </Heading>
          <Grid columns={[1, null, 3]} gap={4}>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  bg: 'smoke',
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
                <Icon glyph="payment-transfer" size={32} sx={{ color: 'muted' }} />
              </Box>
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                DIY
              </Heading>
              <Text sx={{ color: 'slate', mb: 3, fontSize: 1 }}>
                Spend 40+ hours learning tax law, filing forms, and stressing about compliance.
              </Text>
              <Text sx={{ fontWeight: 'bold', color: 'red' }}>High risk of errors</Text>
            </Card>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Box
                sx={{
                  bg: 'smoke',
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
                <Icon glyph="admin" size={32} sx={{ color: 'muted' }} />
              </Box>
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                Hire an accountant
              </Heading>
              <Text sx={{ color: 'slate', mb: 3, fontSize: 1 }}>
                Pay $2,000-$5,000+ annually for tax preparation and filing services.
              </Text>
              <Text sx={{ fontWeight: 'bold', color: 'orange' }}>Very expensive</Text>
            </Card>
            <Card sx={{ p: 4, textAlign: 'center', bg: 'orange', color: 'white' }}>
              <Box
                sx={{
                  bg: 'white',
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
                <Icon glyph="docs" size={32} sx={{ color: 'orange' }} />
              </Box>
              <Heading as="h4" variant="subheadline" sx={{ mb: 2, color: 'white' }}>
                Use HCB
              </Heading>
              <Text sx={{ mb: 3, fontSize: 1 }}>
                Automatic filing of all tax forms. Zero work, zero stress, zero extra cost.
              </Text>
              <Text sx={{ fontWeight: 'bold' }}>✓ Included in 7% fee</Text>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box
        as="section"
        sx={{
          py: [5, 6],
          textAlign: 'center'
        }}
      >
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 3 }}>
            Stop worrying about taxes
          </Heading>
          <Text variant="lead" sx={{ color: 'slate', maxWidth: '52ch', mx: 'auto', mb: 4 }}>
            Join thousands of organizations who never think about tax filing.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'orange',
                backgroundImage: 'radial-gradient(ellipse at top left, #FF8C37 0%, #EC3750 100%)'
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
