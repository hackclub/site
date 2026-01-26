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

export default function CardsPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Issue Physical & Virtual Debit Cards – Fiscal Sponsorship"
        description="Instantly issue physical and virtual debit cards to your team with receipt tracking and Apple Pay integration."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          position: 'relative',
          pt: 6,
          pb: [5, 6],
          bg: 'red',
          backgroundImage: theme => theme.util.gx('red', 'orange'),
          color: 'white'
        }}
      >
        <Container>
          <Heading
            as="h1"
            variant="ultratitle"
            sx={{
              fontSize: [5, 6, 7],
              lineHeight: 1.1,
              mb: 3
            }}
          >
            Issue cards your <br/>team will love
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Physical & virtual debit cards with receipt tracking, Apple Pay, and instant controls. 
            Give your team the tools they need to spend responsibly.
          </Text>
          <Flex sx={{ gap: 3, flexWrap: 'wrap' }}>
            <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
              <Button
                as="a"
                variant="lg"
                sx={{
                  bg: 'white',
                  color: 'red'
                }}
              >
                Get started
              </Button>
            </Link>
          </Flex>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={4}>
            <Card
              sx={{
                bg: 'white',
                p: 4,
                borderRadius: 'extra',
                border: '1px solid',
                borderColor: 'smoke'
              }}
            >
              <Icon glyph="card" size={56} sx={{ color: 'red', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Physical cards
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                Beautiful custom-designed cards shipped to your team. Use anywhere 
                Visa is accepted, with the Hack Club flag proudly displayed.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Free shipping worldwide</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Contactless payments</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Works with Apple & Google Pay</Text>
                </Flex>
              </Flex>
            </Card>
            <Card
              sx={{
                bg: 'white',
                p: 4,
                borderRadius: 'extra',
                border: '1px solid',
                borderColor: 'smoke'
              }}
            >
              <Icon glyph="bolt-circle" size={56} sx={{ color: 'orange', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Virtual cards
              </Heading>
              <Text sx={{ color: 'slate', mb: 3 }}>
                Create instant virtual cards for online purchases. Perfect for 
                subscriptions, software, and one-time expenses.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 2 }}>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Instant generation</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Set spending limits</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 2 }}>
                  <Icon glyph="checkmark" size={24} sx={{ color: 'green' }} />
                  <Text>Lock/unlock anytime</Text>
                </Flex>
              </Flex>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            Built-in controls & transparency
          </Heading>
          <Grid columns={[1, 2]} gap={4}>
            <Box>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'red' }}>
                <Icon glyph="photo" size={32} sx={{ mr: 2 }} />
                Receipt tracking
              </Heading>
              <Text sx={{ color: 'slate', fontSize: 2 }}>
                Every card transaction requires a receipt. Team members can snap a photo 
                from our mobile app or upload from desktop. No more chasing receipts!
              </Text>
            </Box>
            <Box>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'orange' }}>
                <Icon glyph="analytics" size={32} sx={{ mr: 2 }} />
                Real-time monitoring
              </Heading>
              <Text sx={{ color: 'slate', fontSize: 2 }}>
                See every transaction as it happens. Get instant notifications and 
                review spending patterns to keep your budget on track.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'blue' }}>
                <Icon glyph="lock" size={32} sx={{ mr: 2 }} />
                Spending limits
              </Heading>
              <Text sx={{ color: 'slate', fontSize: 2 }}>
                Set custom limits for each card. Control daily, weekly, or monthly 
                spending to prevent overages and stay within budget.
              </Text>
            </Box>
            <Box>
              <Heading as="h3" variant="headline" sx={{ mb: 2, color: 'cyan' }}>
                <Icon glyph="admin" size={32} sx={{ mr: 2 }} />
                Team management
              </Heading>
              <Text sx={{ color: 'slate', fontSize: 2 }}>
                Assign cards to specific team members. Freeze, unfreeze, or cancel 
                cards instantly if someone leaves or a card is lost.
              </Text>
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
          backgroundImage: theme => theme.util.gx('dark', 'darker')
        }}
      >
        <Container sx={{ textAlign: 'center' }}>
          <Icon glyph="card" size={72} sx={{ mb: 3, color: 'red' }} />
          <Heading as="h2" variant="title" sx={{ mb: 3, color: 'white' }}>
            No hidden fees. Ever.
          </Heading>
          <Text variant="lead" sx={{ maxWidth: '52ch', mx: 'auto', mb: 4 }}>
            Unlike traditional banks, we don't charge card issuing fees, transaction fees, 
            or monthly fees. Issue as many cards as you need, whenever you need them.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'red',
                backgroundImage: theme => theme.util.gx('red', 'orange')
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
