import { Box, Badge, Container, Flex, Grid, Heading } from 'theme-ui'
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
import Zoom from 'react-reveal/Zoom'
import { Slide } from 'react-reveal'

const Requirement = ({ title, children, checkmark, background }) => {
  return (
    <Zoom>
      <Card
        variant="primary"
        sx={{
          backgroundColor: 'elevated',
          backgroundImage: `url('${background}')`,
          backgroundSize: '40px 40px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '10% 10%',
          color: 'snow',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'start',
          height: '100%'
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <Box mr={3} sx={{ lineHeight: 0, flexShrink: 0 }}>
            <Icon glyph={checkmark} color="#ec3750" size={36} />
          </Box>
          <Text variant="heading" sx={{ fontSize: 24, lineHeight: 1.5 }}>
            {title}
          </Text>
        </Flex>

        <Text pl={48} mt={2} sx={{ fontSize: 2 }}>
          {children}
        </Text>
      </Card>
    </Zoom>
  )
}

function Timeline({ children }) {
  return (
    <Flex
      sx={{ flexDirection: ['column', null, 'row'], justifyContent: 'center' }}
    >
      {children}
    </Flex>
  )
}

function TimelineStep({ children }) {
  return (
    <Flex
      sx={{
        marginX: [2, null, null],
        // paddingX: [null, null, 3, 4],
        paddingY: [4, null, 0],
        flexDirection: ['row', null, 'column'],
        alignItems: 'center',
        // width: 'fit-content',
        '&:before': {
          content: '""',
          background: '#3c4858',
          height: ['420px', null, '4px'],
          width: ['4px', null, '48%'],
          marginLeft: [26, null, 0],
          marginTop: [null, null, '34px'],
          position: 'absolute',
          zIndex: -1
        },
        '&:first-of-type:before': {
          top: [0, null, 'auto'],
          width: [0, null, 0],
          left: [0, null, 0]
        },
        '&:last-of-type:before': {
          bottom: [0, null, 'auto'],
          left: [null, null, 0],
          width: [null, null, 0]
        }
      }}
    >
      {children}
    </Flex>
  )
}

function Circle({ children }) {
  return (
    <Box
      style={{
        padding: 12,
        backgroundColor: '#ec3750',
        color: 'white',
        borderRadius: '100%',
        display: 'inline-block',
        lineHeight: 0,
        position: 'relative',
        zIndex: 999
      }}
    >
      {children}
    </Box>
  )
}

function Step({ icon, name, duration, href }) {
  return (
    <TimelineStep pb={4}>
      <Slide left>
        <Circle>
          {href ? (
            <Link href={href} sx={{ cursor: 'pointer' }}>
              <Icon glyph={icon} size={48} color="white" />
            </Link>
          ) : (
            <Icon glyph={icon} size={48} />
          )}
        </Circle>
        <Container
          sx={{
            marginTop: 3,
            display: 'flex',
            justifyContent: ['left', null, 'center'],
            flexDirection: 'column',
            textAlign: ['left', null, 'center']
          }}
        >
          <Badge
            variant="pill"
            sx={{
              bg: 'muted',
              color: 'darker',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              width: 64,
              fontSize: 18,
              px: 2,
              mx: [null, null, 'auto']
            }}
          >
            {duration}
          </Badge>
          <Text
            sx={{ color: 'white', fontSize: 24, maxWidth: [300, null, 550] }}
          >
            {name}
          </Text>
        </Container>
      </Slide>
    </TimelineStep>
  )
}

const Apply = () => {
  return (
    <>
      <Heading sx={{ textAlign: 'center', mb: 5, fontSize: 5 }} id="apply">
        Get your hackathon funded.
      </Heading>
      <Timeline px={3}>
        <Step
          icon="send"
          name="Check that you meet the criteria listed above"
          duration="Step 1"
          href="/bank/apply"
        />
        <Step
          icon="post"
          name={<>Send your hackathon's website to #hackathon-grant in <Link href='https://hackclub.com/slack' target='_blank' sx={{color: 'white', textDecoration: 'none', fontStyle: 'italic'}}>slack</Link></>}
          duration="Step 2"
        />
        <Step
          icon="send"
          name="Fill in your application"
          duration="Step 3"
          href="/bank/apply"
        />
        <Step
          icon="send"
          name="Kaching!"
          duration="Step 4"
          href="/bank/apply"
        />
      </Timeline>
    </>
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
            minHeight: ['70vh', 'none'],
            textAlign: 'center',
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-gxxp8xcyl-hack-club-bot.vercel.app/0fzfm1e-ueaef1qw.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
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
                <NextLink href="https://hackclub.com" passHref>
                  <Box
                    as="a"
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
                    target="_blank"
                  ></Box>
                </NextLink>
                <Box mr={3} sx={{ fontWeight: 'normal' }}>
                  +
                </Box>
                <NextLink href="https://www.firstinspires.org" passHref>
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
                    target="_blank"
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
          <Box
            sx={{
              fontSize: ['20px', '24px', '27px'],
              textAlign: 'center',
              mb: 4
            }}
          >
            Hack Club is partnering with{' '}
            <NextLink href="https://www.firstinspires.org" passHref>
              <Link target="_blank">
                <i>FIRST®</i>
              </Link>
            </NextLink>{' '}
            to provide $500 grants to in-person high-school hackathons happening
            this semester.
          </Box>
          <Text
            as="h1"
            variant="heading"
            mb={3}
            sx={{ fontSize: [25, 30, 40], textAlign: 'center' }}
          >
            Check if your hackathon <Sparkles>qualifies:</Sparkles>
          </Text>

          <Grid columns={[1, 2, 2]} mb={5}>
            <Requirement
              title="Happening this semester"
              checkmark="clock-fill"
              background="https://icons.hackclub.com/api/icons/0x212025/glyph:clock.svg"
            >
              We are only offering the grant program for all hackathons that
              take place by December 31st 2022.
            </Requirement>
            <Requirement
              title="By and for highschool students"
              checkmark="profile-fill"
              background="https://icons.hackclub.com/api/icons/0x212025/glyph:profile.svg"
            >
              We want to bring back highschool led events across the country.
              There can be a maximum of 1 college student on your organising
              team. All attendees should be under 18 <u>AND</u> not a full-time
              college student.
            </Requirement>
            <Requirement
              title="Fully in-person"
              checkmark="flag-fill"
              background="https://icons.hackclub.com/api/icons/0x212025/glyph:flag.svg"
            >
              Hacking is a social activity, and we're supporting hackathons that
              bring hackers together IRL. We believe that fully IRL events allow
              organisers to maximise the unique hackathon experience for
              attendees.
            </Requirement>
            <Requirement
              title="Venue Secured"
              checkmark="pin-fill"
              background="https://icons.hackclub.com/api/icons/0x212025/glyph:pin.svg"
            >
              Provide a scan of an email, contract, or an{' '}
              <Link
                href="https://www.investopedia.com/terms/m/mou.asp"
                target="_blank"
              >
                MOU
              </Link>{' '}
              with your venue. The contract should have the date of your
              hackathon and address, contact details, and specific commitment
              (what they are offering your hackathon) of your venue.
            </Requirement>
            <Requirement
              title={
                <>
                  Run on{' '}
                  <NextLink href="/bank" passHref>
                    <Link target="_blank">Hack Club Bank</Link>
                  </NextLink>{' '}
                  with Transparency Mode enabled
                </>
              }
              checkmark="bank-circle"
              background="https://icons.hackclub.com/api/icons/0x212025/glyph:bank-account.svg"
            >
              You'll receive your grant through Hack Club Bank, our financial
              platform for hackathons, and spend it in the open with{' '}
              <Link
                href="https://changelog.bank.hackclub.com/transparent-finances-(optional-feature)-151427"
                target="_blank"
              >
                Transparency Mode
              </Link>
              .We'll also be waiving the standard 7% Hack Club Bank transaction
              fess.
              <br />
              <br />
              <Text
                sx={{
                  fontSize: 1
                }}
              >
                {' '}
                See Transparency Mode in action at{' '}
                <Link href="https://bank.hackclub.com/hq" target="_blank">
                  Hack Club HQ
                </Link>
                ! If due to area restrictions (like in India) you are unable to
                use Hack Club Bank, we're unfortunately unable to support you
                with this grant program.
              </Text>
            </Requirement>
            <Requirement
              title="Handmade website"
              checkmark="web"
              background="https://icons.hackclub.com/api/icons/0x212025/glyph:web.svg"
            >
              Your website is an attendee's first impression of your event, and
              it's your signature on the web.{' '}
              <strong>
                Instead of using a site builder like Wix or Google Sites, code
                your own!
              </strong>
              <br />
              <br />
              Check out our{' '}
              <Link
                href="https://notebook.lachlanjc.com/2019-09-06_making_a_hackathon_site"
                target="_blank"
              >
                a guide on building hackathon websites
              </Link>{' '}
              or ask in{' '}
              <Link href="/slack" target="_blank">
                the Slack
              </Link>{' '}
              if you need help.
            </Requirement>
          </Grid>

          <Heading sx={{ textAlign: 'center', mb: 3, fontSize: 5 }} id="apply">
            Applications opening soon.
          </Heading>

          <Form />
          <Apply />
        </Container>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}

export default HackathonGrant
