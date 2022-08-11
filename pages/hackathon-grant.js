import { Box, Container, Flex, Grid, Heading } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Sparkles from '../components/sparkles'
import NextLink from 'next/link'
import { Link, Text, Button, Card } from 'theme-ui'
import Icon from '@hackclub/icons'
import Form from '../components/hackathon-grant/form'

const Requirement = ({ title, children }) => {
  return (
    <Card
      variant="primary"
      sx={{
        backgroundColor: 'darkless',
        color: 'snow',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start'
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Box mr={3} sx={{ lineHeight: 0, flexShrink: 0 }}>
          <Icon glyph="checkmark" />
        </Box>
        <Text variant="heading" sx={{ fontSize: 24, lineHeight: 1.5 }}>
          {title}
        </Text>
      </Flex>

      <Text pl={48} mt={2} sx={{ fontSize: 2 }}>
        {children}
      </Text>
    </Card>
  )
}

const HackathonGrant = () => {
  return (
    <>
      <Box as="main" key="main">
        <Nav dark />
        <ForceTheme theme="dark" />
        <Meta as={Head} title="Hackathon Grant" />
        <Box
          sx={{
            pt: [5, null, null, null, 6],
            pb: [3, 4, 5, null, 6],
            textAlign: 'center',
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-3aeson6ue-hack-club-bot.vercel.app/0lahacks3.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center'
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '42rem', mx: 'auto' }}>
            <Heading
              sx={{
                textAlign: 'center',
                mt: [2, 4],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)'
              }}
              as="h1"
              variant="title"
            >
              <Flex
                sx={{ justifyContent: 'center', alignItems: 'center', mb: 2 }}
              >
                <Box
                  width={64}
                  height={64}
                  sx={{
                    width: 72,
                    height: 72,
                    backgroundImage:
                      "url('https://assets.hackclub.com/icon-square.svg')",
                    backgroundSize: 'contain',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                    mr: 3,
                    borderRadius: 8
                  }}
                ></Box>
                <Box mr={3} opacity={0.75} sx={{ fontWeight: 'normal' }}>
                  +
                </Box>
                <NextLink
                  href="https://www.firstinspires.org"
                  target="_blank"
                  passHref
                >
                  <Box
                    as="a"
                    sx={{
                      width: 72,
                      height: 72,
                      backgroundImage: "url('/hackathon-grant/first.png')",
                      backgroundColor: '#231F20',
                      backgroundSize: '60px, cover',
                      backgroundPosition: 'center center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: 8
                    }}
                  ></Box>
                </NextLink>
              </Flex>
              A <Sparkles>$500</Sparkles> grant for your in-person hackathon.
            </Heading>
            <Button variant="ctaLg" as="a" href="#apply" sx={{ mt: 2 }}>
              Coming soon
            </Button>
          </Box>
        </Box>
        <Container sx={{ py: 5 }}>
          <Box sx={{ fontSize: '27px', textAlign: 'center', mb: 4 }}>
            Hack Club is partnering with{' '}
            <NextLink
              href="https://www.firstinspires.org"
              target="_blank"
              passHref
            >
              <Link>
                <i>FIRST</i>
              </Link>
            </NextLink>{' '}
            to provide $500 grants to in-person high-school hackathons happening
            this semester.
          </Box>
          <Text
            as="h1"
            variant="heading"
            mb={3}
            sx={{ fontSize: 50, textAlign: 'center' }}
          >
            Requirements
          </Text>

          <Grid columns={2} mb={5}>
            <Requirement title="Proof of venue">
              Provide a scan of a contract, or an{' '}
              <Link href="https://www.investopedia.com/terms/m/mou.asp">
                MOU (memorandum of understanding)
              </Link>
              .
            </Requirement>
            <Requirement title="Event must be fully in-person">
              Virtual and hybrid events aren't eligible.
            </Requirement>
            <Requirement
              title={
                <>
                  Run on{' '}
                  <NextLink href="/bank" passHref>
                    <Link>Hack Club Bank</Link>
                  </NextLink>{' '}
                  with Transparency Mode enabled
                </>
              }
            >
              You'll receive your grant through Hack Club Bank, and spend it
              transparently through{' '}
              <Link
                href="https://changelog.bank.hackclub.com/transparent-finances-(optional-feature)-151427"
                target="_blank"
              >
                Transparency Mode
              </Link>
              .
            </Requirement>
            <Requirement title="Handmade website">
              Your event's website should be coded by you— not a site builder
              like Wix or Google Sites. Need help? Check out our{' '}
              <Link href="https://workshops.hackclub.com/personal_website/">
                Personal Website workshop
              </Link>
              !
            </Requirement>
          </Grid>

          <Heading sx={{ textAlign: 'center', mb: 3, fontSize: 5 }} id="apply">
            Applications opening soon.
          </Heading>

          <Form />
        </Container>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}

export default HackathonGrant
