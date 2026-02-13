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

export default function PayrollPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Pay Team Members – Fiscal Sponsorship"
        description="Built-in payroll for your nonprofit. Pay team members, handle taxes, and stay compliant with ease."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          pt: 6,
          pb: [5, 6],
          bg: '#8492e6',
          backgroundImage: theme => theme.util.gx('#8492e6', '#a463bf'),
          color: 'white'
        }}
      >
        <Container>
          <Icon glyph="admin" size={64} sx={{ mb: 3, color: 'white' }} />
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
              Payroll made simple
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Pay team members with built-in payroll. Handle salaries, taxes, and compliance 
            automatically—no separate payroll service needed.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: '#8492e6'
              }}
            >
              Get started
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Payroll without the paperwork
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Traditional payroll services are expensive and complex. HCB's built-in 
                payroll is simple, affordable, and integrated with your finances.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Automatic tax withholding and filing</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Direct deposit to any bank account</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Year-end W-2 forms generated automatically</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>No separate payroll service needed</Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              sx={{
                bg: 'snow',
                p: 5,
                borderRadius: 'extra',
                border: '2px solid',
                borderColor: '#8492e6'
              }}
            >
              <Heading as="h3" variant="headline" sx={{ mb: 3, color: '#8492e6' }}>
                How it works
              </Heading>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    1. Add team members
                  </Text>
                  <Text sx={{ color: 'muted' }}>
                    Invite employees through the HCB dashboard with their tax info.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    2. Set pay schedules
                  </Text>
                  <Text sx={{ color: 'muted' }}>
                    Choose weekly, bi-weekly, or monthly payment schedules.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    3. We handle the rest
                  </Text>
                  <Text sx={{ color: 'muted' }}>
                    Payments sent automatically, taxes filed, records maintained.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            Everything included
          </Heading>
          <Grid columns={[1, 2, 3]} gap={4}>
            <Card sx={{ p: 4 }}>
              <Icon glyph="bank-account" size={48} sx={{ color: 'blue', mb: 3 }} />
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                Direct deposit
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Employees receive payments directly to their bank account on schedule.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="docs" size={48} sx={{ color: 'orange', mb: 3 }} />
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                Tax compliance
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Federal, state, and local taxes calculated and withheld automatically.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="analytics" size={48} sx={{ color: 'green', mb: 3 }} />
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                Pay stubs
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Digital pay stubs available instantly for every payment.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="payment-transfer" size={48} sx={{ color: 'purple', mb: 3 }} />
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                Flexible schedules
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Weekly, bi-weekly, semi-monthly, or monthly pay periods.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="checkmark" size={48} sx={{ color: 'cyan', mb: 3 }} />
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                Year-end forms
              </Heading>
              <Text sx={{ color: 'muted' }}>
                W-2s generated and filed automatically at year-end.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="admin" size={48} sx={{ color: 'red', mb: 3 }} />
              <Heading as="h3" variant="subheadline" sx={{ mb: 2 }}>
                Easy management
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Add, remove, or update employees right from your dashboard.
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
                bg: '#8492e6',
                backgroundImage: theme => theme.util.gx('#8492e6', '#a463bf'),
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Heading as="h3" variant="title" sx={{ mb: 3, color: 'white' }}>
                Payroll vs. Contractors
              </Heading>
              <Text sx={{ mb: 4, fontSize: 2 }}>
                Need to decide between W-2 employees and 1099 contractors? We support both!
              </Text>
              <Box sx={{ mb: 3 }}>
                <Text as="strong" sx={{ display: 'block', mb: 1, fontSize: 2 }}>
                  W-2 Employees (Payroll)
                </Text>
                <Text sx={{ fontSize: 1, opacity: 0.9 }}>
                  • Regular salaries • Automatic tax withholding • Benefits eligible
                </Text>
              </Box>
              <Box>
                <Text as="strong" sx={{ display: 'block', mb: 1, fontSize: 2 }}>
                  1099 Contractors
                </Text>
                <Text sx={{ fontSize: 1, opacity: 0.9 }}>
                  • Project-based • Pay via ACH/check • 1099 forms auto-filed
                </Text>
              </Box>
            </Box>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Grow your team with confidence
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Whether you're hiring your first employee or your tenth, HCB makes 
                payroll simple and compliant.
              </Text>
              <Card variant="sunken" sx={{ p: 4, bg: 'sunken' }}>
                <Text as="p" sx={{ fontStyle: 'italic', mb: 2, color: 'slate' }}>
                  "We were nervous about hiring employees as a small nonprofit. HCB's 
                  built-in payroll made it painless. Now we have 3 part-time employees 
                  and it just works."
                </Text>
                <Text as="strong" sx={{ color: 'slate' }}>
                  — Community Organization Director
                </Text>
              </Card>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box
        as="section"
        sx={{
          py: [5, 6],
          bg: 'dark',
          color: 'white',
          textAlign: 'center',
          backgroundImage: theme => theme.util.gx('dark', 'darker')
        }}
      >
        <Container>
          <Icon glyph="admin" size={72} sx={{ mb: 3, color: '#8492e6' }} />
          <Heading as="h2" variant="title" sx={{ mb: 3, color: 'white' }}>
            Payroll included at no extra cost
          </Heading>
          <Text variant="lead" sx={{ maxWidth: '52ch', mx: 'auto', mb: 4 }}>
            Unlike other fiscal sponsors that require expensive third-party payroll services, 
            HCB's payroll is built-in and covered by your standard 7% fee.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: '#8492e6',
                backgroundImage: theme => theme.util.gx('#8492e6', '#a463bf')
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
