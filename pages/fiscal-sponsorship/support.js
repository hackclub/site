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

export default function SupportPage() {
  return (
    <>
      <Meta
        as={Head}
        title="Get 24-Hour Support – Fiscal Sponsorship"
        description="24-hour support on weekdays with a dedicated point of contact. Get help whenever you need it with HCB."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      
      <Box
        as="header"
        sx={{
          pt: 6,
          pb: [5, 6],
          bg: '#33d6a6',
          backgroundImage: 'linear-gradient(to right, #33d6a6 0%, #0BCF95 50%, #00A877 100%)',
          color: 'white'
        }}
      >
        <Container>
          <Icon glyph="leader" size={64} sx={{ mb: 3, color: 'white' }} />
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
              We're here to help
            </Balancer>
          </Heading>
          <Text as="p" variant="lead" sx={{ maxWidth: '52ch', mb: 4 }}>
            Get 24-hour support on weekdays with a dedicated point of contact. 
            Real people, real help, whenever you need it.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                color: '#33d6a6'
              }}
            >
              Join HCB
            </Button>
          </Link>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 3]} gap={4}>
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                bg: 'white',
                border: '2px solid',
                borderColor: '#33d6a6'
              }}
            >
              <Box
                sx={{
                  bg: '#33d6a6',
                  color: 'white',
                  width: 72,
                  height: 72,
                  borderRadius: 'circle',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <Icon glyph="clock" size={36} />
              </Box>
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                24-hour response
              </Heading>
              <Text sx={{ color: 'slate' }}>
                Get help within 24 hours on weekdays. Most questions answered in just a 
                few hours during business hours.
              </Text>
            </Card>
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                bg: 'white',
                border: '2px solid',
                borderColor: 'blue'
              }}
            >
              <Box
                sx={{
                  bg: 'blue',
                  color: 'white',
                  width: 72,
                  height: 72,
                  borderRadius: 'circle',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <Icon glyph="admin" size={36} />
              </Box>
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Dedicated contact
              </Heading>
              <Text sx={{ color: 'slate' }}>
                You'll have a dedicated point of contact who knows your organization 
                and can provide personalized help.
              </Text>
            </Card>
            <Card
              sx={{
                p: 4,
                textAlign: 'center',
                bg: 'white',
                border: '2px solid',
                borderColor: 'orange'
              }}
            >
              <Box
                sx={{
                  bg: 'orange',
                  color: 'white',
                  width: 72,
                  height: 72,
                  borderRadius: 'circle',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 3
                }}
              >
                <Icon glyph="message" size={36} />
              </Box>
              <Heading as="h3" variant="headline" sx={{ mb: 2 }}>
                Multiple channels
              </Heading>
              <Text sx={{ color: 'slate' }}>
                Reach us via email, Slack, or through the HCB dashboard. 
                Choose the method that works best for you.
              </Text>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container>
          <Heading as="h2" variant="title" sx={{ mb: 4, textAlign: 'center' }}>
            What we help with
          </Heading>
          <Grid columns={[1, 2]} gap={4}>
            <Box>
              <Flex sx={{ gap: 3, mb: 3 }}>
                <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                <Box>
                  <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                    Account setup & onboarding
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>
                    We'll guide you through setting up your organization and getting 
                    your first transactions flowing.
                  </Text>
                </Box>
              </Flex>
              <Flex sx={{ gap: 3, mb: 3 }}>
                <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                <Box>
                  <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                    Technical issues
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>
                    Problems with the app, website, or integrations? We'll fix it fast.
                  </Text>
                </Box>
              </Flex>
              <Flex sx={{ gap: 3, mb: 3 }}>
                <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                <Box>
                  <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                    Financial questions
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>
                    Understanding transactions, budgets, or reports? We're here to explain.
                  </Text>
                </Box>
              </Flex>
            </Box>
            <Box>
              <Flex sx={{ gap: 3, mb: 3 }}>
                <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                <Box>
                  <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                    Compliance & taxes
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>
                    Questions about tax forms, grants, or nonprofit regulations? 
                    We'll walk you through it.
                  </Text>
                </Box>
              </Flex>
              <Flex sx={{ gap: 3, mb: 3 }}>
                <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                <Box>
                  <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                    Best practices
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>
                    Learn how to use HCB effectively and follow nonprofit best practices.
                  </Text>
                </Box>
              </Flex>
              <Flex sx={{ gap: 3, mb: 3 }}>
                <Icon glyph="checkmark" size={32} sx={{ color: 'green', flexShrink: 0 }} />
                <Box>
                  <Text as="strong" sx={{ display: 'block', mb: 1 }}>
                    Custom requests
                  </Text>
                  <Text sx={{ color: 'muted', fontSize: 1 }}>
                    Need something special? We'll work with you to find a solution.
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Grid>
        </Container>
      </Box>

      <Box as="section" sx={{ py: [4, 5] }}>
        <Container>
          <Grid columns={[1, null, 2]} gap={5} sx={{ alignItems: 'center' }}>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3 }}>
                Real support from real people
              </Heading>
              <Text variant="lead" sx={{ color: 'slate', mb: 4 }}>
                No chatbots, no automated responses, no outsourced call centers. 
                You'll work directly with HCB team members who care about your success.
              </Text>
              <Card variant="sunken" sx={{ p: 4, bg: 'sunken' }}>
                <Text as="p" sx={{ fontStyle: 'italic', mb: 2, color: 'slate' }}>
                  "The HCB team has been incredibly responsive. Every time I've had a 
                  question, I get a thoughtful answer within hours. It feels like they 
                  genuinely care about our organization's success."
                </Text>
                <Text as="strong" sx={{ color: 'slate' }}>
                  — Hackathon organizer
                </Text>
              </Card>
            </Box>
            <Box
              sx={{
                bg: '#33d6a6',
                backgroundImage: 'linear-gradient(to right, #33d6a6 0%, #0BCF95 50%, #00A877 100%)',
                p: 5,
                borderRadius: 'extra',
                color: 'white'
              }}
            >
              <Heading as="h3" variant="title" sx={{ mb: 3, color: 'white' }}>
                Our support philosophy
              </Heading>
              <Flex sx={{ flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    Empowerment first
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    We don't just solve problems—we teach you how to use HCB effectively.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    Continuous improvement
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Your feedback shapes our product. We actively listen and implement 
                    suggestions.
                  </Text>
                </Box>
                <Box>
                  <Text as="strong" sx={{ fontSize: 3, display: 'block', mb: 1 }}>
                    Community driven
                  </Text>
                  <Text sx={{ opacity: 0.9 }}>
                    Join our Slack community to connect with other organizations and 
                    share knowledge.
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
            More than support—partnership
          </Heading>
          <Grid columns={[1, 2, 3]} gap={4}>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Icon glyph="docs" size={48} sx={{ color: 'blue', mb: 3 }} />
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                Documentation
              </Heading>
              <Text sx={{ color: 'muted', fontSize: 1 }}>
                Comprehensive guides, tutorials, and FAQs available 24/7.
              </Text>
            </Card>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Icon glyph="slack" size={48} sx={{ color: 'orange', mb: 3 }} />
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                Community Slack
              </Heading>
              <Text sx={{ color: 'muted', fontSize: 1 }}>
                Connect with thousands of other HCB organizations for peer support.
              </Text>
            </Card>
            <Card sx={{ p: 4, textAlign: 'center' }}>
              <Icon glyph="analytics" size={48} sx={{ color: 'purple', mb: 3 }} />
              <Heading as="h4" variant="subheadline" sx={{ mb: 2 }}>
                Office hours
              </Heading>
              <Text sx={{ color: 'muted', fontSize: 1 }}>
                Join weekly office hours to ask questions and learn from the team.
              </Text>
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
          <Icon glyph="leader" size={72} sx={{ color: '#33d6a6', mb: 3 }} />
          <Heading as="h2" variant="title" sx={{ mb: 3 }}>
            Support that scales with you
          </Heading>
          <Text variant="lead" sx={{ color: 'slate', maxWidth: '52ch', mx: 'auto', mb: 4 }}>
            Whether you're just starting out or managing millions in revenue, 
            our support team is here to help you succeed.
          </Text>
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: '#33d6a6',
                backgroundImage: 'linear-gradient(to right, #33d6a6 0%, #0BCF95 50%, #00A877 100%)'
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
