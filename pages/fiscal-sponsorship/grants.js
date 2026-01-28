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

export default function GrantsPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Receive Foundation Grants – Fiscal Sponsorship"
        description="Access foundation grants with HCB's 501(c)(3) tax-deductible status. Unlock funding opportunities for your nonprofit project."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          bg: 'blue',
          color: 'white',
          pt: 6,
          pb: [5, 6],
          backgroundImage: theme => theme.util.gx('blue', 'cyan')
        }}
      >
        <Container>
          <Icon glyph="bank-account" size={64} sx={{ mb: 3, color: 'white' }} />
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
              Receive foundation grants
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Unlock funding opportunities with HCB's 501(c)(3) tax-deductible status. 
            Apply to foundations that require nonprofit status without setting up your own entity.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: 'blue'
              }}
            >
              Apply now
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            Why foundations love HCB
          </Heading>
          <Grid columns={[1, 2, 3]} gap={4}>
            <Card sx={{ p: 4 }}>
              <Icon glyph="checkmark" size={48} sx={{ color: 'green', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Verified 501(c)(3)
              </Heading>
              <Text sx={{ color: 'muted' }}>
                We're a registered nonprofit with the IRS. Foundations can verify our status 
                instantly, making grant processing seamless.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="docs" size={48} sx={{ color: 'blue', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Professional reporting
              </Heading>
              <Text sx={{ color: 'muted' }}>
                We provide detailed financial reports and receipts that meet foundation 
                requirements, so you stay compliant effortlessly.
              </Text>
            </Card>
            <Card sx={{ p: 4 }}>
              <Icon glyph="bolt" size={48} sx={{ color: 'orange', mb: 3 }} />
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Fast processing
              </Heading>
              <Text sx={{ color: 'muted' }}>
                Receive grants in days, not months. Our streamlined process means you 
                get funding quickly to start making impact.
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
                Foundations that fund HCB projects
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                Our fiscally sponsored organizations have successfully received grants from 
                major foundations, opening doors that would otherwise require years of 
                nonprofit paperwork.
              </Text>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>Y Combinator Junior Foundation</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>GitHub Education</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>The FIRST Foundation</Text>
                </Flex>
                <Flex sx={{ alignItems: 'center', gap: 3 }}>
                  <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                  <Text>And many more...</Text>
                </Flex>
              </Flex>
            </Box>
            <Box
              sx={{
                bg: 'cyan',
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Heading as="h3" variant="headline" sx={{ mb: 3, color: 'white' }}>
                How it works
              </Heading>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    1. Apply to HCB
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Get approved for fiscal sponsorship in as little as 24 hours.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    2. Find grants
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Search for foundations that fund projects like yours.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    3. Apply with confidence
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Use HCB's 501(c)(3) status and EIN on your applications.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    4. Receive funding
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Grants are deposited directly into your HCB account.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Box sx={{ textAlign: 'center', maxWidth: 'copyPlus', mx: 'auto' }}>
            <Heading as="h2" variant="title" sx={{ mb: 3 }}>
              Don't let legal barriers stop you
            </Heading>
            <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
              Setting up a 501(c)(3) takes months and thousands of dollars. 
              With HCB, you get instant access to the same benefits and can start 
              applying to grants today.
            </Text>
            <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
              <Button
                as="a"
                variant="lg"
                sx={{
                  bg: 'blue',
                  backgroundImage: theme => theme.util.gx('cyan', 'blue')
                }}
              >
                Start your application
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

      <Footer />
    </>
  )
}
