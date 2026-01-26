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

export default function PaymentsPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Send Money & Reimburse – Fiscal Sponsorship"
        description="Send payments and reimburse expenses via check, ACH, bank wire, and more. Fast, secure, and easy to track."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          pt: 6,
          pb: [5, 6],
          bg: 'green',
          backgroundImage: theme => theme.util.gx('green', 'cyan'),
          color: 'white'
        }}
      >
        <Container>
          <Icon glyph="payment-transfer" size={64} sx={{ mb: 3, color: 'white' }} />
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
              Pay anyone, anywhere
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Send money and reimburse expenses via check, ACH, bank wire, and more. 
            Fast, secure payments with full transparency and tracking.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'green'
              }}
            >
              Get started
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            Multiple payment methods
          </Heading>
          <Grid columns={[1, 2]} gap={4}>
            <Card sx={{ p: 4 }}>
              <Flex sx={{ alignItems: 'center', gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    bg: 'blue',
                    color: 'white',
                    width: 56,
                    height: 56,
                    borderRadius: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon glyph="bank-account" size={32} />
                </Box>
                <Heading as="h3" variant="headline">
                  ACH transfer
                </Heading>
              </Flex>
              <Text sx={{ color: 'slate' }}>
                Send money directly to bank accounts in 1-3 business days. Free for 
                most transactions, perfect for regular payments and reimbursements.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Flex sx={{ alignItems: 'center', gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    bg: 'orange',
                    color: 'white',
                    width: 56,
                    height: 56,
                    borderRadius: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon glyph="bolt" size={32} />
                </Box>
                <Heading as="h3" variant="headline">
                  Bank wire
                </Heading>
              </Flex>
              <Text sx={{ color: 'slate' }}>
                Fast international and domestic transfers. Ideal for large payments, 
                international vendors, or urgent transactions that need same-day processing.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Flex sx={{ alignItems: 'center', gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    bg: 'red',
                    color: 'white',
                    width: 56,
                    height: 56,
                    borderRadius: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon glyph="post" size={32} />
                </Box>
                <Heading as="h3" variant="headline">
                  Paper checks
                </Heading>
              </Flex>
              <Text sx={{ color: 'slate' }}>
                Need to pay by check? We'll print and mail checks on your behalf. 
                Great for vendors who prefer traditional payment methods.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Flex sx={{ alignItems: 'center', gap: 3, mb: 3 }}>
                <Box
                  sx={{
                    bg: 'purple',
                    color: 'white',
                    width: 56,
                    height: 56,
                    borderRadius: 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <Icon glyph="card" size={32} />
                </Box>
                <Heading as="h3" variant="headline">
                  Debit cards
                </Heading>
              </Flex>
              <Text sx={{ color: 'slate' }}>
                Issue cards to team members for direct purchases. No reimbursement needed—
                they can spend directly from your organization's funds.
              </Text>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                bg: 'cyan',
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Heading as="h3" variant="title" sx={{ mb: 3, color: 'white' }}>
                Reimburse expenses in minutes
              </Heading>
              <Text sx={{ mb: 4, fontSize: 2 }}>
                Team members can submit expenses through the HCB app. Admins review, 
                approve, and money is sent—all in one platform.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Flex sx={{ gap: 2 }}>
                  <Text sx={{ fontSize: 4, fontWeight: 'bold' }}>1.</Text>
                  <Text>Submit expense with receipt</Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Text sx={{ fontSize: 4, fontWeight: 'bold' }}>2.</Text>
                  <Text>Admin reviews and approves</Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Text sx={{ fontSize: 4, fontWeight: 'bold' }}>3.</Text>
                  <Text>Money sent automatically</Text>
                </Flex>
              </Flex>
            </Box>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Built for transparency
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Every payment is tracked, categorized, and documented. See where your 
                money goes in real-time with detailed transaction histories.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Automatic receipt collection</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Expense categorization</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Real-time balance updates</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Export to CSV for accounting</Text>
                </Flex>
              </Flex>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 'copyPlus', mx: 'auto' }}>
            <Icon glyph="payment-transfer" size={72} sx={{ color: 'green', mb: 3 }} />
            <Heading as="h2" variant="title" sx={{ mb: 3 }}>
              Say goodbye to payment headaches
            </Heading>
            <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
              No more juggling multiple payment platforms, chasing receipts, or 
              manual expense reports. HCB handles it all in one place.
            </Text>
            <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
              <Button
                as="a"
                variant="lg"
                sx={{
                  bg: 'green',
                  backgroundImage: theme => theme.util.gx('green', 'cyan')
                }}
              >
                Apply now
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  )
}
