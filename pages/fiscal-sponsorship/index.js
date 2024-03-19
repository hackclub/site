import Meta from '@hackclub/meta'
import Head from 'next/head'
import Image from 'next/image'
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
import Tilt from '../../components/tilt'

import ContactBanner from '../../components/fiscal-sponsorship/contact'
import Features from '../../components/fiscal-sponsorship/features'
import OuternetImgFile from '../../public/home/outernet-110.jpg'

const organizations = [
  {
    id: 'org_MpJurQ',
    object: 'directory_organization',
    name: 'Reboot',
    description:
      'Publishing techno-optimism, through newsletters, magazines, and events.',
    slug: 'reboot',
    website: '',
    transparent: true,
    location: {
      readable: 'Bay Area, CA, USA',
      country_code: 'US',
      country: 'United States',
      continent: 'North America'
    },
    category: 'nonprofit',
    missions: [],
    climate: false,
    partners: {},
    logo: '/fiscal-sponsorship/reboot.png',
    background_image: '/fiscal-sponsorship/reboot-bg.jpg',
    donation_link: 'https://hcb.hackclub.com/donations/start/reboot'
  },
  {
    id: 'org_raices',
    object: 'directory_organization',
    name: 'Raices Cyber',
    description:
      'Empowering the Hispanic and Latino cyber and technology community.',
    slug: 'raices-cyber-org',
    website: 'https://raicescyber.org',
    transparent: false,
    location: {
      readable: 'Philadelphia, PA, USA',
      country_code: 'US',
      country: 'United States',
      continent: 'North America'
    },
    category: 'nonprofit',
    logo: '/fiscal-sponsorship/raices.png',
    background_image: '/fiscal-sponsorship/raices-bg.jpg',
    donation_link: 'https://hcb.hackclub.com/donations/start/raices-cyber-org'
  },

  {
    id: 'org_XDundl',
    object: 'directory_organization',
    name: 'Fridays For Future Uganda',
    description: 'Leading the environmental justice fight in Uganda.',
    slug: 'fridays-for-future-uganda',
    website: 'http://www.fridaysforfutureug.earth/',
    transparent: true,
    location: {
      readable: 'Uganda',
      country_code: 'UG',
      country: 'Uganda',
      continent: 'Africa'
    },
    category: 'nonprofit',
    missions: [],
    climate: true,
    partners: {
      '128_collective': {
        funded: false,
        recommended: true
      }
    },
    logo: '/fiscal-sponsorship/fff-uganda.png',
    background_image:
      'https://hcb.hackclub.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBc3pJIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--854fedfb94c579a004bd6c8284e55db7b640fa4f/FFF%20Uganda%20photo.jpeg',
    donation_link:
      'https://hcb.hackclub.com/donations/start/fridays-for-future-uganda'
  },
  {
    id: 'org_a29uVj',
    object: 'directory_organization',
    name: 'Hack Club HQ',
    description: 'This is us! We run our operations on HCB.',
    slug: 'hq',
    website: 'https://hackclub.com',
    transparent: true,
    location: {
      readable: 'Vermont, USA',
      country_code: 'US',
      country: 'United States',
      continent: 'North America'
    },
    category: 'hack_club_hq',
    missions: [],
    climate: false,
    partners: {},
    logo: 'https://hcb.hackclub.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa3hFIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--2455b72ac87867a346ac5ef38ae2dfdb504af3eb/icon-rounded.png',
    background_image:
      'https://hcb.hackclub.com/storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaDJrIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--84f67f8b9bd9b31e6703b5bf399f48dd2059e1ad/189933158-9f00ceaf-7f61-4bef-9911-4cf4a14e0e4d.png',
    donation_link: 'https://hcb.hackclub.com/donations/start/hq'
  }
]

export default function Page() {
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
          pb: [4, 5],
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
            <Button
              as="a"
              href="https://hcb.hackclub.com"
              variant="outline"
              sx={{ color: 'white' }}
            >
              Sign in
            </Button>
          </Flex>
        </Container>
      </Box>
      <Box id="organizations" as="section" sx={{ py: [4, 5] }}>
        <Container sx={{}}>
          {/* <Text as="p" variant="headline" sx={{ mt: 0 }}>
            Powering nonprofits at every scale
          </Text> */}
          <Flex
            sx={{
              flexWrap: 'wrap',
              rowGap: 3,
              columnGap: [4, 5],
              mb: 4
            }}
          >
            <Stat value="$20M+" label="processed transactions" reversed />
            <Stat value="1500+" label="projects" reversed />
            <Stat value="2018" label="serving nonprofits since" reversed />
          </Flex>
          <Grid columns={[1, 2]} gap={[3, 4]} sx={{ mt: 4 }}>
            {organizations
              // .map(org => new Organization(org))
              .map(organization => (
                <Tilt key={organization.id}>
                  <Card
                    as="a"
                    href={
                      organization.transparent
                        ? `https://hcb.hackclub.com/${organization.slug}`
                        : organization.donation_link
                    }
                    sx={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      minHeight: 128,
                      color: 'white',
                      cursor: 'pointer',
                      textShadow: '0 1px 4px rgba(0, 0, 0, 0.5)',
                      textDecoration: 'none',
                      backgroundColor: 'black',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      borderRadius: 'extra',
                      overflow: 'hidden',
                      position: 'relative',
                      p: 3,
                      height: '100%',
                      display: 'grid',
                      gridTemplateColumns: '64px 1fr',
                      columnGap: 3,
                      rowGap: 2
                    }}
                    style={{
                      backgroundImage: `linear-gradient(rgba(0,0,0,0.375) 0%, rgba(0,0,0,0.5) 75%), url('${organization.background_image}')`
                    }}
                  >
                    <Image
                      src={organization.logo}
                      alt={`${organization.name} logo`}
                      loading="lazy"
                      width={64}
                      height={64}
                      sx={{
                        objectFit: 'contain',
                        borderRadius: 'extra'
                      }}
                    />
                    <div>
                      <Heading
                        as="h3"
                        sx={{
                          fontSize: [3, 4],
                          m: 0,
                          overflowWrap: 'anywhere',
                          width: '100%',
                          display: 'block'
                        }}
                      >
                        {organization.name}
                      </Heading>
                      <Text
                        variant="caption"
                        sx={{
                          color: 'white',
                          opacity: 0.875
                        }}
                      >
                        {organization.location.readable}
                      </Text>
                    </div>
                    <Text as="p" sx={{ gridColumn: ['span 2', '2'] }}>
                      <Balancer>{organization.description}</Balancer>
                    </Text>
                  </Card>
                </Tilt>
              ))}
          </Grid>
        </Container>
      </Box>
      <Features />

      <Box id="fees" as="section" sx={{ position: 'relative', py: 5 }}>
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
                {['128.png', 'ycjf.png', 'first.png'].map(file => (
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
                “HCB’s Climate fiscal sponsorship program removes funding
                barriers with a blend of youth-centered, tech-savvy services and
                a deep commitment to authentic youth empowerment.”
              </Text>
              <Text
                as="p"
                variant="caption"
                sx={{ color: 'muted', mt: 3, textIndent: '-1.5ch' }}
              >
                —
                <Text as="strong" color="slate">
                  Kate Goss
                </Text>
                , Executive Director,{' '}
                <UILink href="https://128collective.org">
                  128&nbsp;Collective
                </UILink>
              </Text>
            </Card>
          </Grid>
        </Container>
      </Box>

      <Container>
        <Grid
          columns={[null, null, 2]}
          gap={[4, 5]}
          sx={{ py: 5, p: { fontSize: 2, '&:last-child': { mb: 0 } } }}
        >
          <Link href="https://outernet.hackclub.com/">
            <Photo
              src={OuternetImgFile}
              alt="Each year, 1000s of teenagers attend Hack Club events like this"
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
              over 30,000 high schoolers involved in Hack Club with over 400
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
                As part of our commitment to climate justice, funding for HCB’s
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
            <Balancer>No startup fees, no&nbsp;minimum balance.</Balancer>
          </Text>
        </Flex>
      </Box>
      <ContactBanner sx={{ justifyContent: 'center' }} />
      <Footer />
    </>
  )
}
