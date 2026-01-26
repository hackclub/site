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

export default function DonationsPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Accept Donations of Any Size – Fiscal Sponsorship"
        description="Accept donations with a custom, embeddable online form. Make it easy for supporters to give to your nonprofit."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          pt: 6,
          pb: [5, 6],
          bg: 'red',
          backgroundImage: 'radial-gradient(ellipse at bottom right, #EC3750 0%, #FF8C37 50%, #F1C40F 100%)',
          color: 'white'
        }}
      >
        <Container>
          <Icon glyph="support" size={64} sx={{ mb: 3, color: 'white' }} />
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
              Accept donations from anyone, anywhere
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Custom, embeddable donation forms that make giving easy. Accept one-time gifts, 
            recurring donations, and everything in between—all tax-deductible.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'red'
              }}
            >
              Start accepting donations
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Beautiful donation forms
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Your custom donation page matches your brand and makes giving effortless. 
                Embed it on your website or share the link directly.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Fully customizable with your logo and colors</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Mobile-optimized for donations on any device</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Embed anywhere with a simple code snippet</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Custom messaging and impact stories</Text>
                </Flex>
              </Flex>
            </Box>
            <Card
              sx={{
                p: 4,
                bg: 'white',
                border: '2px solid',
                borderColor: 'red',
                borderRadius: 'extra'
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 'circle',
                    bg: 'red',
                    mx: 'auto',
                    mb: 3
                  }}
                />
                <Heading as="h4" variant="headline" sx={{ mb: 2 }}>
                  Support Our Mission
                </Heading>
                <Text sx={{ color: 'muted', fontSize: 1 }}>
                  Your donation helps us make a difference.
                </Text>
              </Box>
              <Grid columns={3} gap={2} sx={{ mb: 3 }}>
                <Button variant="outline" sx={{ fontSize: 1 }}>$25</Button>
                <Button variant="outline" sx={{ fontSize: 1 }}>$50</Button>
                <Button variant="outline" sx={{ fontSize: 1 }}>$100</Button>
              </Grid>
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    border: '1px solid',
                    borderColor: 'smoke',
                    p: 2,
                    borderRadius: 'default',
                    bg: 'sunken'
                  }}
                >
                  <Text sx={{ color: 'muted', fontSize: 1 }}>Custom amount</Text>
                </Box>
              </Box>
              <Button
                sx={{
                  width: '100%',
                  bg: 'red',
                  backgroundImage: 'radial-gradient(ellipse at bottom right, #EC3750 0%, #FF8C37 100%)'
                }}
              >
                Donate now
              </Button>
              <Text sx={{ textAlign: 'center', color: 'muted', fontSize: 0, mt: 2 }}>
                Tax-deductible • Secure payment
              </Text>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            Accept all types of donations
          </Heading>
          <Grid columns={[1, 2]} gap={4}>
            <Card sx={{ p: 4 }}>
              <Icon glyph="bolt-circle" size={56} sx={{ color: 'orange', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                One-time donations
              </Heading>
              <Text sx={{ color: 'slate' }}>
                Accept credit cards, debit cards, and bank transfers for one-time gifts 
                of any amount. Instant receipts sent automatically.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="analytics" size={56} sx={{ color: 'blue', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Recurring donations
              </Heading>
              <Text sx={{ color: 'slate' }}>
                Build sustainable funding with monthly recurring donations. Donors can 
                manage their subscriptions anytime.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="bank-account" size={56} sx={{ color: 'green', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Large gifts & grants
              </Heading>
              <Text sx={{ color: 'slate' }}>
                Accept major gifts via bank wire or ACH. Perfect for foundation grants 
                and large individual donations.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="card" size={56} sx={{ color: 'purple', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                In-person donations
              </Heading>
              <Text sx={{ color: 'slate' }}>
                Accept tap-to-pay donations at events using our mobile app. 
                No extra hardware needed—just tap any card on your phone.
              </Text>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box
              sx={{
                bg: 'red',
                backgroundImage: 'radial-gradient(ellipse at bottom right, #EC3750 0%, #FF8C37 50%, #F1C40F 100%)',
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Heading as="h3" variant="title" sx={{ mb: 3, color: 'white' }}>
                Donors love HCB
              </Heading>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    Instant tax-deductible receipts via email
                  </Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    Secure payment processing with bank-level encryption
                  </Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    Option to donate anonymously or publicly
                  </Text>
                </Flex>
                <Flex sx={{ gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ flexShrink: 0 }} />
                  <Text>
                    Easy recurring donation management
                  </Text>
                </Flex>
              </Flex>
            </Box>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Track every donation
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                See all donations in real-time. Track donor information, export for 
                your CRM, and send custom thank-you messages.
              </Text>
              <Grid columns={2} gap={3}>
                <Box>
                  <Text as="div" sx={{ fontSize: 5, fontWeight: 'bold', color: 'red' }}>
                    100%
                  </Text>
                  <Text sx={{ color: 'muted' }}>Tax-deductible</Text>
                </Box>
                <Box>
                  <Text as="div" sx={{ fontSize: 5, fontWeight: 'bold', color: 'orange' }}>
                    0%
                  </Text>
                  <Text sx={{ color: 'muted' }}>Processing fees*</Text>
                </Box>
              </Grid>
              <Text sx={{ fontSize: 0, color: 'muted', mt: 3 }}>
                *Covered by HCB's 7% fee on all revenue
              </Text>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 'copyPlus', mx: 'auto' }}>
            <Heading as="h2" variant="title" sx={{ mb: 3 }}>
              Start fundraising today
            </Heading>
            <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
              Your custom donation page is ready as soon as you join HCB. 
              Share it with supporters and start raising funds immediately.
            </Text>
            <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
              <Button
                as="a"
                variant="lg"
                sx={{
                  bg: 'red',
                  backgroundImage: 'radial-gradient(ellipse at bottom right, #EC3750 0%, #FF8C37 50%, #F1C40F 100%)'
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
