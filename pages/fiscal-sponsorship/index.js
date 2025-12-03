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
  Link as UILink,
  Text
} from 'theme-ui'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Photo from '../../components/photo'
import Stat from '../../components/stat'
import ContactBanner from '../../components/fiscal-sponsorship/contact'
import Features from '../../components/fiscal-sponsorship/features'
import OuternetImgFile from '../../public/home/outernet-110.jpg'
import SignIn from '../../components/fiscal-sponsorship/sign-in'
import OrganizationSpotlight from '../../components/fiscal-sponsorship/organization-spotlight'
import { setCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import { unfold } from '../../components/announcement'
import Announcement from '../../components/announcement'
import OpenSource from '../../components/fiscal-sponsorship/open-source'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Sparkles from '../../components/sparkles'
import Icon from '../../components/icon'

const organizations = [
  {
    id: 'org_MpJurQ',
    name: 'Reboot',
    description:
      'Publishing techno-optimism, through newsletters, magazines, and events.',
    slug: 'reboot',
    location: { readable: 'Bay Area, CA, USA' },
    logo: '/fiscal-sponsorship/reboot.png',
    background_image: '/fiscal-sponsorship/reboot-bg.jpg'
  },
  {
    id: 'org_AluOql',
    name: 'Apocalypse',
    description: "Canada's largest in-person high school hackathon.",
    slug: 'apocalypse',
    location: { readable: 'Toronto, Canada' },
    logo: '/fiscal-sponsorship/apocalypse.png',
    background_image: '/fiscal-sponsorship/apocalypse-bg.png'
  },
  {
    id: 'org_BbVuWN',
    name: 'Green Mountain Robotics',
    description: 'Spreading STEM interest, one robot at a time.',
    slug: 'green-mountain-robotics',
    location: { readable: 'Chittenden County, VT, USA' },
    logo: '/fiscal-sponsorship/green-mountain-robotics.png',
    background_image: 'green-mountain-robotics-bg.png'
  },
  {
    id: 'org_a29uVj',
    name: 'Hack Club HQ',
    description: 'This is us! We run our operations on HCB.',
    slug: 'hq',
    location: { readable: 'Vermont, USA' },
    logo: 'https://cloud-91boqw8z9-hack-club-bot.vercel.app/0icon-rounded.png',
    background_image: '/fiscal-sponsorship/hq-bg.jpg'
  }
]

function MobileAppAlert() {
  return (
    <Container sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          py: ['25px', 3],
          px: 4,
          background: [
            'rgba(200, 200, 200, 0.3)',
            'linear-gradient(rgba(255,255,255,0.4), rgba(200,200,200,.3))'
          ],
          backdropFilter: 'blur(20px)',
          borderRadius: 20,
          boxShadow:
            '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          mt: [20, -50],
          transform: 'scaleY(0)',
          '@media (prefers-reduced-motion: no-preference)': {
            animation: `${unfold} 0.5s ease-out forwards`,
            animationDelay: '0.5s'
          },
          flexDirection: ['column', 'row']
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 15,
            right: -30,
            bg: 'red',
            color: 'white',
            transform: 'rotate(45deg)',
            width: 120,
            textAlign: 'center',
            py: 1,
            fontSize: 1,
            zIndex: 40,
            fontWeight: 'bold',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          New!
        </Box>
        <span style={{ fontSize: 20 }}>
          <strong style={{ fontSize: 23 }}>HCB Mobile is here!</strong>
          <br />
          Manage your HCB organizations on the go. Issue cards, view transactions, and more!
        </span>

        <Box
          sx={{
            gap: 2,
            display: 'flex',
            width: ['100%', 'auto'],
            alignItems: ['stretch', 'center'],
            flexShrink: 0,
            ml: [undefined, 'auto'],
            flexDirection: ['column', 'row'],
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <a
            href="https://apps.apple.com/us/app/hcb-by-hack-club/id6465424810"
            target="_blank"
            rel="noreferrer"
            style={{ padding: 0, margin: 0, height: 40 }}
          >
            <img
              src="apple-web-badge.svg"
              alt="Download on the App Store"
              style={{ height: 40 }}
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.hackclub.hcb"
            target="_blank"
            rel="noreferrer"
            style={{ padding: 0, margin: 0, height: 40 }}
          >
            <img
              src="google-play-web-badge.png"
              alt="Get it on Google Play"
              style={{ height: 40 }}
            />
          </a>
        </Box>
      </Box>
    </Container>
  )
}

export default function Page() {
  const [hasReferral, setHasReferral] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const tubProgram = params.get('tub_program')
    const referral = params.get('referral')
    const referralCookie = getCookie('referral')

    if (referral) {
      setCookie('referral', referral)
      setCookie('tub_program', 'GFGS')
    } else if (tubProgram) {
      setCookie('tub_program', tubProgram)
      setCookie('referral', '')
    }

    setHasReferral(!!referral || !!referralCookie)
  }, [])

  return (
    <>
      <Meta
        as={Head}
        title="Fiscal Sponsorship"
        description="Start your nonprofit with our fiscal sponsorship program, HCB: a 501(c)(3) legal entity, bank account, automatic taxes & accounting, and best-in-class app."
        image="/fiscal-sponsorship/og-image.png"
      />
      <ForceTheme theme="light" />
      <Nav />
      <Box
        as="header"
        sx={{
          position: 'relative',
          pt: 6,
          pb: [4, '90px'],
          bg: 'rgb(104, 41, 205)',
          backgroundImage:
            'radial-gradient(ellipse at 5% 5%, #ec555c 0%, rgba(236,85,92,0) 75%),radial-gradient(ellipse at 95% 5%, #dc71a1 0%, rgba(220,113,161,0) 75%),radial-gradient(ellipse at 95% 95%, #fcc8bf 0%, rgba(252,200,191,0) 75%),radial-gradient(ellipse at 5% 95%, #ffce33 0%, rgba(255,206,51,0) 75%)'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            zIndex: 0,
            backgroundSize: '48px 48px',
            backgroundImage: `linear-gradient(to right,  #fcc8bf 1px, transparent 1px),
                              linear-gradient(to bottom, #fcc8bf 1px, transparent 1px)`,
            backgroundPosition: 'top center',
            maskImage:
              'linear-gradient(to bottom, transparent 0%, hsl(0deg 0% 100% / 50%) 10%, white 100%)',
            opacity: 0.18
          }}
        />
        <Container
          sx={{
            color: 'white',
            position: 'relative',
            zIndex: 1,
            svg: {
              position: 'absolute',
              right: [3, 0],
              bottom: 0,
              width: [114, 200, 300],
              height: [114, 200, 300],
              opacity: 0.5
            }
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 31C28 31 31 28 31 16C31 4 28 1 16 1C4 1 1 4 1 16C1 28 4 31 16 31Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.0003 8.018C15.9593 8.032 15.8963 8.056 15.8063 8.096C15.5673 8.199 15.2832 8.347 14.9183 8.556C14.1762 8.98 13.2473 9.579 12.2023 10.317C10.9954 11.1683 10.4485 11.5969 9.76695 12.1311L9.76693 12.1311L9.76692 12.1311C9.26201 12.5269 8.68316 12.9806 7.70725 13.707C7.31725 14.098 6.68325 14.098 6.29325 13.707C5.90225 13.317 5.90225 12.683 6.29325 12.293C8.5005 10.5 8.89925 10.201 11.0483 8.683C12.1283 7.921 13.1373 7.27 13.9263 6.819C14.3273 6.59 14.7063 6.394 15.0033 6.264C15.2653 6.149 15.6423 6 16.0003 6C16.3583 6 16.7353 6.149 16.9973 6.264C17.2943 6.394 17.6733 6.59 18.0743 6.819C18.8632 7.27 19.8723 7.921 20.9523 8.683C23.1012 10.201 23.5 10.5 25.7073 12.293C26.0983 12.683 26.0983 13.317 25.7073 13.707C25.3173 14.098 24.6833 14.098 24.2932 13.707C23.3173 12.9806 22.7385 12.5269 22.2336 12.1311C21.552 11.5969 21.0051 11.1683 19.7983 10.317C18.7533 9.579 17.8243 8.98 17.0823 8.556C16.7173 8.347 16.4333 8.199 16.1943 8.096C16.1043 8.056 16.0413 8.032 16.0003 8.018ZM7 24C7 23.448 7.448 23 8 23H24C24.552 23 25 23.448 25 24C25 24.552 24.552 25 24 25H8C7.448 25 7 24.552 7 24ZM15 21C15 21.552 15.448 22 16 22C16.552 22 17 21.552 17 21V14C17 13.448 16.552 13 16 13C15.448 13 15 13.448 15 14V21ZM21 22C20.448 22 20 21.552 20 21V14C20 13.448 20.448 13 21 13C21.552 13 22 13.448 22 14V21C22 21.552 21.552 22 21 22ZM10 21C10 21.552 10.448 22 11 22C11.552 22 12 21.552 12 21V14C12 13.448 11.552 13 11 13C10.448 13 10 13.448 10 14V21Z"
              fill="currentColor"
            />
          </svg>
          <Heading
            as="h1"
            variant="title"
            sx={{
              fontSize: [5, 6, null, 7],
              // magic number to align with the grid
              mt: -3,
              lineHeight: [null, null, 1.03],
              span: {
                WebkitTextStroke: 'currentColor',
                WebkitTextStrokeWidth: ['2px', '3px'],
                WebkitTextFillColor: 'transparent',
                display: 'block'
              }
            }}
          >
            <span>The foundation</span> of your nonprofit.
          </Heading>
          <Text as="p" variant="lead" sx={{ my: [3, 4] }}>
            <Balancer>
              Start your nonprofit with{' '}
              <strong>our fiscal sponsorship program, HCB</strong>: a 501(c)(3)
              legal entity, bank account, automatic taxes & accounting, and
              best-in-class software.
            </Balancer>
          </Text>

          {hasReferral && (
            <Text variant="lead" sx={{ my: [3, 4] }}>
              <Box
                sx={{
                  bg: 'rgba(255, 255, 255, 0.2)',
                  p: 3,
                  borderRadius: 'default',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  mt: 3
                }}
              >
                Apply by <strong>April 16th</strong> using referral code (
                {getCookie('referral')}) and get stickers + fiscal sponsorship
                fees waived for the month of May.
                <Link
                  href="https://docs.google.com/document/d/e/2PACX-1vTPygv_qfd2FnU3Dslt4o69nBlOoKhvWDuexk67ApjuIH96ghjpLjw9wJhsRUtTZYX3XO4EVdxXVx7Q/pub"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Terms apply"
                  style={{ marginLeft: '4px' }}
                >
                  *
                </Link>
              </Box>
            </Text>
          )}

          <Flex
            sx={{
              flexDirection: ['column', 'row'],
              mt: [3, 4],
              gap: [3, 4],
              alignItems: ['start', 'center']
            }}
          >
            <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
              <Button
                as="a"
                variant="lg"
                sx={{
                  bg: 'blue',
                  backgroundImage: theme => theme.util.gx('cyan', 'blue'),
                  lineHeight: 0.9
                }}
              >
                Apply now
              </Button>
            </Link>
            <SignIn />
            <a
              href="https://hcb.hackclub.com/from/hack-club-site-fs-page/JOEHOA"
              style={{ textDecoration: 'none' }}
              target="_blank"
            >
              <Announcement
                copy="Win a 13-inch MacBook Air!"
                caption="We’re giving away a MacBook to a lucky teenager! Join the raffle by December 31st, 2025."
                imgSrc="https://hc-cdn.hel1.your-objectstorage.com/s/v3/9ef010a890d7c554a6da9328d62f9a592df9ae5d_laptop-removebg-preview.png"
                imgAlt="13-inch MacBook Air"
                color="primary"
                textColor="slate"
                sx={{ mb: [1, 1], mt: [3, 4, 1] }}
              />
            </a>
          </Flex>
        </Container>
      </Box>
      <MobileAppAlert />
      <Box as="section" sx={{ py: [4, 5], alignItems: 'center' }}>
        <Container sx={{ alignItems: 'center' }}>
          <Grid gap={[4, 5]} columns={[null, null, 2]} sx={{ alignItems: 'center'}}>
            <Box>
              <Heading as="h2" variant="title" sx={{ mb: 3, maxWidth: 'copyUltra' }}>
                HCB in your <Sparkles sx={{ color: 'red'}}>pocket</Sparkles>
              </Heading>
              <Text as="p" variant="lead" sx={{ mb: 3 }}>
                The official mobile app lets you manage your
                organization&apos;s finances, issue cards, and more!
              </Text>
              <Grid columns={[1, 2]} gap={3}>
                <Card variant="sunken" sx={{ p: '1.5rem !important', bg: 'snow', borderRadius: 'default' }}>
                  <Text as="strong" color="slate" sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1, justifyContent: 'space-between' }}>
                    <span style={{ maxWidth: 'calc(100% - 36px)' }}>See your organization's spending</span><Icon glyph="view" size={36} sx={{ color: 'red', flexShrink: 0 }} />
                  </Text>
                  <Text>
                    Stay up to date on your organization's balance and transactions.
                  </Text>
                </Card>
                <Card variant="sunken" sx={{ p: '1.5rem !important', bg: 'snow', borderRadius: 'default' }}>
                  <Text as="strong" color="slate" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1 }}>
                    <span style={{ maxWidth: 'calc(100% - 32px)' }}>Accept Tap to Pay donations</span><Icon glyph="bolt-circle" size={32} sx={{ color: 'red', flexShrink: 0 }} />
                  </Text>
                  <Text>
                    No extra hardware required! Tap any card against your phone. Great for in-person fundraisers.
                  </Text>
                </Card>
                <Card variant="sunken" sx={{ p: '1.5rem !important', bg: 'snow', borderRadius: 'default' }}>
                  <Text as="strong" color="slate" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1 }}>
                    <span style={{ maxWidth: 'calc(100% - 32px)' }}>Issue, manage, and<br />add cards</span><Icon glyph="card" size={32} sx={{ color: 'red', flexShrink: 0 }} />
                  </Text>
                  <Text>
                    You can directly add cards to Apple&nbsp;Wallet and Google&nbsp;Wallet. No more forgetting your card!
                  </Text>
                </Card>
                <Card variant="sunken" sx={{ p: '1.5rem !important', bg: 'snow', borderRadius: 'default' }}>
                  <Text as="strong" color="slate" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 1 }}>
                    <span style={{ maxWidth: 'calc(100% - 32px)' }}>Upload receipts the easy way</span><Icon glyph="docs" size={32} sx={{ color: 'red', flexShrink: 0 }} />
                  </Text>
                  <Text>Quickly snap a photo or upload a file!</Text>
                </Card>
              </Grid>
              <Button
                  as="a"
                  sx={{ flexShrink: 0, gap: 1, paddingLeft: 25, paddingRight: '5px', marginTop: '20px' }}
                  href="/hcb/mobile"
                  target="_blank"
                >
                  Read our story
                  <Icon glyph="view-forward" />
              </Button>
            </Box>
            <Card sx={{ backgroundImage: 'linear-gradient(to right, #fcc8bf, #ffce33)', px: [5, 5], py: '0 !important', height: 'fit-content', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Box as="img" src="mobile-mockup.png" sx={{ display: 'block', width: '100%', height: 'auto' }} />
            </Card>
          </Grid>
        </Container>
      </Box>
      <Box id="organizations" as="section" sx={{ py: [4, 5], bg: 'snow' }}>
        <Container sx={{}}>
          <Heading as="h2" variant="title" sx={{ mt: 0, mb: 3, maxWidth: 'copyUltra' }}>
            <Balancer>
              Powering nonprofits at every scale
            </Balancer>
          </Heading>
          <Flex sx={{ flexWrap: 'wrap', rowGap: 3, columnGap: [4, 5], mb: 4 }}>
            <Stat value="$80M+" label="processed transactions" reversed />
            <Stat value="6500+" label="projects" reversed />
            <Stat value="2018" label="serving nonprofits since" reversed />
          </Flex>
          <Grid columns={[1, 2]} gap={[3, 4]} sx={{ mt: 4 }}>
            {organizations.map(org => (
              <OrganizationSpotlight organization={org} key={org.id} />
            ))}
          </Grid>
          <Box
            sx={{
              mt: 4,
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Link href="/fiscal-sponsorship/directory" passHref legacyBehavior>
              <Button
                as="a"
                variant="lg"
                sx={{
                  bg: 'blue',
                  backgroundImage: theme => theme.util.gx('muted', 'slate'),
                  lineHeight: 0.9,
                  wordWrap: 'none'
                }}
              >
                See more organizations →
              </Button>
            </Link>

            <Box sx={{ flexGrow: '1' }}></Box>
          </Box>
        </Container>
      </Box>
      <Features />
      <Box id="fees" as="section" sx={{ position: 'relative', py: 5, bg: 'snow' }}>
        <Container>
          <Grid columns={[null, null, 2]} gap={[4, 5]}>
            <div>
              <Text
                variant="title"
                sx={{ color: 'blue', mb: 2, lineHeight: 0.96 }}
              >
                One simple, transparent fee:
                <br />
                7% of income.
              </Text>
              <Text
                as="p"
                variant="caption"
                color="slate"
                sx={{ maxWidth: '52ch' }}
              >
                This fee goes directly to Hack Club's operations staff,
                including teen interns working under mentors. This allows us to
                deliver best-in-class software and support, grow sustainably,
                while also providing paid career training for young people from
                diverse backgrounds.
              </Text>
            </div>
            <Text
              as="p"
              variant="headline"
              sx={{
                width: 'fit-content',
                gridRow: ['1', 'auto'],
                '@supports (-webkit-background-clip: text)': {
                  backgroundRepeat: 'no-repeat',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundImage:
                    'linear-gradient(to right, #f06844 0%, #ee4c54 25%, #d45e95 50%, #9c6ca6 75%, #6583c1 100%) !important'
                },
                '@supports (-webkit-background-clip: text) and (background: linear-gradient(to right in oklch, white, black)':
                {
                  backgroundImage:
                    'linear-gradient(to right in oklch, #f06844 0%, #ee4c54 25%, #d45e95 50%, #9c6ca6 75%, #6583c1 100%) !important'
                }
              }}
              style={{ margin: 0 }}
            >
              No legal fees.
              <br />
              No startup fees.
              <br />
              No transaction fees.
              <br />
              No card issuing fees.
              <br />
              No subscription fees.
              <br />
              No check deposit fees.
              <br />
              No credit card processing fees.
            </Text>
          </Grid>
        </Container>
      </Box>
      {/** removed for now
      <Box as="section" bg="snow" sx={{ py: 5 }}>
        <Container>
          <Grid columns={[null, null, 2]} gap={[4, 5]}>
            <div>
              <Heading
                variant="headline"
                as="h2"
                sx={{ marginBlockStart: [null, 4] }}
              >
                <Balancer>
                  The fiscal sponsor of&nbsp;choice for the best funders.
                </Balancer>
              </Heading>
              <Flex
                sx={{
                  alignItems: 'center',
                  gap: [3, 4],
                  mt: 4,
                  img: {
                    width: [72, 128],
                    height: [72, 128],
                    objectFit: 'contain'
                  }
                }}
              >
                {['ycjf.png', 'first.png'].map(file => (
                  <img
                    key={file}
                    src={`/fiscal-sponsorship/${file}`}
                    width={128}
                    height={128}
                    loading="lazy"
                    alt={file.split('.')[0].toUpperCase()}
                  />
                ))}
              </Flex>
            </div>
            <Card sx={{ maxWidth: 'copy', ml: [null, -4], textAlign: 'left' }}>
              <Text
                as="blockquote"
                variant="lead"
                sx={{
                  mt: '0 !important',
                  color: 'slate',
                  textIndent: '-0.33em'
                }}
              >
                “Quote goes here”
              </Text>
              <Text
                as="p"
                variant="caption"
                sx={{ color: 'muted', mt: 3, textIndent: '-1.5ch' }}
              >
                —
                <Text as="strong" color="slate">
                  FirstName LastName
                </Text>
                , Title,{' '}
                <UILink href="https://example.com">
                  Organization
                </UILink>
              </Text>
            </Card>
          </Grid>
        </Container>
      </Box>
      */}
      <Container>
        <Grid
          columns={[null, null, 2]}
          gap={[4, 5]}
          sx={{ py: 5, p: { fontSize: 2, '&:last-child': { mb: 0 } } }}
        >
          <Link href="https://outernet.hackclub.com/">
            <Photo
              src={OuternetImgFile}
              alt="Each year, thousands of teenagers attend Hack Club events like this"
              showAlt
              sx={{ height: '100%' }}
            />
          </Link>
          <div>
            <Heading as="h2" variant="headline" sx={{ mt: [0, 0] }}>
              Built by Hack Club
            </Heading>
            <p>
              As{' '}
              <Link href="/" passHref legacyBehavior>
                <UILink>Hack Club</UILink>
              </Link>{' '}
              grew, we needed a way to empower our members. We currently have
              over 60,000 high schoolers involved in Hack Club with over 400
              clubs around the world.
            </p>
            <p>
              We started HCB in 2018 to support teen-led clubs and hackathons.
              After showing it to our educational partners, we knew we had
              tapped into something much larger. Today, HCB removes financial
              and legal barriers for thousands doing good in their community.
            </p>
            <Flex
              as="footer"
              sx={{
                alignItems: 'center',
                gap: 3,
                color: 'slate',
                borderRadius: 'default',
                lineHeight: 'caption',
                textWrap: 'balance',
                svg: { flexShrink: 0, fill: 'blue' }
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={32}
                height={32}
                viewBox="0 0 16 16"
                aria-hidden
              >
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0M2.04 4.326c.325 1.329 2.532 2.54 3.717 3.19.48.263.793.434.743.484q-.121.12-.242.234c-.416.396-.787.749-.758 1.266.035.634.618.824 1.214 1.017.577.188 1.168.38 1.286.983.082.417-.075.988-.22 1.52-.215.782-.406 1.48.22 1.48 1.5-.5 3.798-3.186 4-5 .138-1.243-2-2-3.5-2.5-.478-.16-.755.081-.99.284-.172.15-.322.279-.51.216-.445-.148-2.5-2-1.5-2.5.78-.39.952-.171 1.227.182.078.099.163.208.273.318.609.304.662-.132.723-.633.039-.322.081-.671.277-.867.434-.434 1.265-.791 2.028-1.12.712-.306 1.365-.587 1.579-.88A7 7 0 1 1 2.04 4.327Z" />
              </svg>
              <span>
                As part of our commitment to the environment, funding for HCB&apos;s
                operations&nbsp;and staff will never come from the{' '}
                <UILink
                  href="https://www.ffisolutions.com/the-carbon-underground-200-500/"
                  color="blue"
                >
                  fossil fuel industry
                </UILink>
                .
              </span>
            </Flex>
          </div>
        </Grid>
      </Container>
      <OpenSource />
      <Box
        as="section"
        id="apply"
        sx={{
          py: 6,
          px: 3,
          backgroundImage:
            'radial-gradient(ellipse at 5% 5%, #e86494 0%, rgba(232,100,148,0) 75%),radial-gradient(ellipse at 95% 5%, #e86494 0%, rgba(232,100,148,0) 75%),radial-gradient(ellipse at 95% 95%, #baa8d3 0%, rgba(186,168,211,0) 75%),radial-gradient(ellipse at 5% 95%, #fa9f69 0%, rgba(250,159,105,0) 75%)',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            height: '100%',
            zIndex: 0,
            backgroundSize: '48px 48px',
            backgroundImage: `linear-gradient(to right,  #fcc8bf 1px, transparent 1px),
                              linear-gradient(to bottom, #fcc8bf 1px, transparent 1px)`,
            backgroundPosition: 'top left',
            maskImage: `linear-gradient(180deg, transparent 0%, white 3%)`,
            opacity: 0.1
          }}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 3
          }}
        >
          <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
            <Button
              as="a"
              variant="lg"
              sx={{
                bg: 'white',
                mixBlendMode: 'screen',
                color: 'black !important',
                fontSize: [58, 96],
                width: ['100%', 'auto'],
                py: 4,
                px: [4, null, 6],
                lineHeight: 0.9,
                textTransform: 'none'
              }}
            >
              Apply now
            </Button>
          </Link>
          <Text as="p" variant="lead" sx={{ color: 'white', mb: [0, 0] }}>
            <Balancer>If you apply before <strong>December 31st, 2025</strong> and complete onboarding by <strong>January 31st, 2026</strong>,<br />we'll add $20 to your organization's balance!</Balancer>
          </Text>
          <Text as="p" variant="lead" sx={{ color: 'white', mb: [0, 0] }}>
            <Balancer>No startup fees, no&nbsp;minimum balance.</Balancer>
          </Text>
        </Flex>
      </Box>
      <ContactBanner sx={{ justifyContent: 'center' }} />
      <Footer />
    </>
  )
}
