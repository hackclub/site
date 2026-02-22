/** @jsxImportSource theme-ui */
import { Box, Container, Flex, Grid, Heading, Input } from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../../components/force-theme'
import Nav from '../../../components/nav'
import Footer from '../../../components/footer'
import MSparkles from '../../../components/sparkles/money'
import { Text, Button } from 'theme-ui'
import Icon from '@hackclub/icons'
import fuzzysort from 'fuzzysort'
import { useEffect, useState } from 'react'
import { kebabCase, intersection, find } from 'lodash'
import theme from '@hackclub/theme'
import GeoPattern from 'geopattern'
import { useRouter } from 'next/router'
import {
  OrganizationModal,
  badges,
  getBadgesForOrg
} from '../../../components/directoryModal'
import OrganizationCard from '../../../components/fiscal-sponsorship/directory/card'
import { Organization } from '../../../lib/organization'

const styles = `
  html {
    scroll-behavior: smooth;
  }
`

type Region = {
  label: string
  color: string
  iconColor: string
  icon: string
  image: string
  ogImage: string
  continents?: string[]
  miniLabel?: string
}

export const regions: Region[] = [
  {
    label: 'North America',
    color: 'secondary',
    iconColor: 'red',
    icon: 'photo',
    image:
      'https://cloud-cberabu5z-hack-club-bot.vercel.app/3north_america.png',
    ogImage: '/fiscal-sponsorship/climate/NorthAmerica.png'
  },
  {
    label: 'South America',
    color: 'secondary',
    iconColor: 'orange',
    icon: 'photo',
    image:
      'https://cloud-cberabu5z-hack-club-bot.vercel.app/4south_america.png',
    ogImage: '/fiscal-sponsorship/climate/SouthAmerica.png'
  },
  {
    label: 'Africa',
    color: 'secondary',
    iconColor: 'purple',
    icon: 'explore',
    image: 'https://cloud-cberabu5z-hack-club-bot.vercel.app/0africa.png',
    ogImage: '/fiscal-sponsorship/climate/Africa.png'
  },
  {
    label: 'Europe',
    color: 'secondary',
    iconColor: 'blue',
    icon: 'explore',
    image: 'https://cloud-oax3m4v0t-hack-club-bot.vercel.app/1europe.png',
    ogImage: '/fiscal-sponsorship/climate/Europe.png'
  },
  {
    label: 'Asia & Oceania',
    continents: ['Asia', 'Oceania', 'Australia'],
    color: 'secondary',
    iconColor: 'green',
    icon: 'explore',
    image:
      'https://cloud-oax3m4v0t-hack-club-bot.vercel.app/0asia___oceania.png',
    ogImage: '/fiscal-sponsorship/climate/Asia+Oceania.png'
  }
]

export const categories = [
  {
    label: 'Nonprofits',
    miniLabel: 'All',
    id: 'organizations',
    color: 'purple',
    description: null,
    match: org => true,
    icon: 'list' as const,
    index: true
  },
  {
    label: 'FIRST Teams',
    id: 'first',
    color: 'blue',
    description:
      'Everywhere from San Jose to Boston to New York, HCB powers teams of all sizes.',
    match: org => org.category === 'robotics_team',
    icon: 'sam' as const
  },
  {
    label: 'Hackathons',
    id: 'hackathons',
    color: 'purple',
    description: `Hackers are using HCB to run hackathons that'll blow your mind away.`,
    match: org => org.category === 'hackathon',
    icon: 'event-code' as const
  }
]

const FilterPanel = ({ filter, mobile, clearOffset }) => {
  const [regionsHiddenOnMobile, setRegionsHiddenOnMobile] = useState(mobile)
  const [categoriesHiddenOnMobile, setCategoriesHiddenOnMobile] =
    useState(mobile)
  const router = useRouter()
  let { category, region } = router.query
  return (
    <>
      <Heading
        as="h3"
        sx={{
          fontSize: 2,
          textTransform: 'uppercase',
          color: 'muted',
          mb: categoriesHiddenOnMobile ? 1 : 3,
          cursor: mobile ? 'pointer' : 'default',
          ':hover': mobile
            ? {
                color: 'blue'
              }
            : {}
        }}
        onClick={() => setCategoriesHiddenOnMobile(!categoriesHiddenOnMobile)}
      >
        FILTER {mobile && 'BY CATEGORY'}
        <small
          style={{
            transform: 'translateY(-1px)',
            display: 'inline-block',
            marginLeft: '6px'
          }}
        >
          {mobile && (categoriesHiddenOnMobile ? '▶︎' : '▼')}
        </small>
      </Heading>
      <Flex
        sx={{
          flexDirection: mobile ? 'row' : 'column',
          gap: '12px',
          flexWrap: 'wrap',
          mb: 3,
          display: categoriesHiddenOnMobile ? 'none' : 'flex'
        }}
      >
        {categories.map(availableCategory => (
          <Flex
            key={kebabCase(availableCategory.label)}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              gap: 2,
              py: mobile ? 1 : 0,
              pl: mobile ? 1 : 0,
              pr: mobile ? 3 : 0,
              border: mobile ? '1px solid' : 'none',
              borderColor: 'sunken',
              borderRadius: '4px',
              background: mobile ? 'snow' : 'none',
              color: 'secondary',
              textDecoration: 'none',
              transition: 'color 0.2s',
              ':hover': {
                color: 'blue'
              },
              width: 'fit-content'
            }}
            onClick={() => {
              router.push(
                availableCategory.index
                  ? `/fiscal-sponsorship/directory/`
                  : `/fiscal-sponsorship/directory/${availableCategory.id}/${region || ''}`
              )
              clearOffset()
            }}
          >
            <Flex
              sx={{
                bg: 'smoke',
                color: 'secondary',
                p: 1,
                borderRadius: 6
              }}
            >
              <Icon glyph={availableCategory.icon || 'list'} size={24} />
            </Flex>
            <Heading
              as="h4"
              sx={{
                fontSize: 3,
                color:
                  category === availableCategory.id ||
                  (availableCategory.index &&
                    category === null &&
                    region === null)
                    ? 'primary'
                    : 'null',
                ':hover': {
                  color: 'blue'
                }
              }}
            >
              {availableCategory.miniLabel || availableCategory.label}
            </Heading>
          </Flex>
        ))}
      </Flex>
      <Heading
        as="h3"
        sx={{
          fontSize: 2,
          textTransform: 'uppercase',
          color: 'muted',
          mb: regionsHiddenOnMobile ? 1 : 3,
          mt: 3,
          cursor: mobile ? 'pointer' : 'default',
          ':hover': mobile
            ? {
                color: 'blue'
              }
            : {}
        }}
        onClick={() => setRegionsHiddenOnMobile(!regionsHiddenOnMobile)}
      >
        {mobile ? 'FILTER BY REGION' : 'REGIONS'}
        <small
          style={{
            transform: 'translateY(-1px)',
            display: 'inline-block',
            marginLeft: '6px'
          }}
        >
          {mobile && (regionsHiddenOnMobile ? '▶︎' : '▼')}
        </small>
      </Heading>
      <Flex
        sx={{
          flexDirection: mobile ? 'row' : 'column',
          gap: '12px',
          flexWrap: 'wrap',
          mb: 3,
          display: regionsHiddenOnMobile ? 'none' : 'flex'
        }}
      >
        {regions.map(availableRegion => (
          <Flex
            key={kebabCase(availableRegion.label)}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              gap: 2,
              py: mobile ? 1 : 0,
              pl: mobile ? 1 : 0,
              pr: mobile ? 3 : 0,
              border: mobile ? '1px solid' : 'none',
              borderColor: 'sunken',
              borderRadius: '4px',
              background: mobile ? 'snow' : 'none',
              color: 'secondary',
              textDecoration: 'none',
              transition: 'color 0.2s',
              ':hover': {
                color: 'blue'
              },
              width: 'fit-content'
            }}
            onClick={() => {
              router.push(
                `/fiscal-sponsorship/directory/${category || 'organizations'}/${kebabCase(availableRegion.label)}`
              )
              clearOffset()
            }}
          >
            <Flex
              sx={{
                backgroundImage: `url("${availableRegion.image}")`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                p: 1,
                borderRadius: 6
              }}
            >
              <Flex
                sx={{
                  width: 24,
                  height: 24
                }}
              />
            </Flex>
            <Heading
              as="h4"
              sx={{
                fontSize: 3,
                color:
                  region === kebabCase(availableRegion.label)
                    ? 'primary'
                    : 'null',
                ':hover': {
                  color: 'blue'
                }
              }}
            >
              {availableRegion.miniLabel || availableRegion.label}
            </Heading>
          </Flex>
        ))}
      </Flex>
    </>
  )
}

type FilteringProps = {
  mobile?: boolean
  region?: string
  clearOffset?: () => void
  badges: [React.Dispatch<React.SetStateAction<string[]>>, string[], string, any[], boolean?]
}

const Filtering = ({ mobile, region, clearOffset, ...props }: FilteringProps) => {
  return (
    <>
      {Object.values(props).map((filter, i) => (
        <FilterPanel
          key={`filter-${i}`}
          filter={filter}
          mobile={mobile}
          clearOffset={clearOffset}
        />
      ))}
    </>
  )
}

export default function Directory({ rawOrganizations, pageRegion, category }) {
  const [searchValue, setSearchValue] = useState('')
  const [offset, setOffset] = useState(0)
  const region = pageRegion
  category = find(categories, ['id', category])
  const [modalOrganization, setModalOrganization] = useState(null)

  useEffect(() => {
    const handle = e => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  })

  let organizations = rawOrganizations

  if (searchValue.length) {
    const search = fuzzysort.go(searchValue, rawOrganizations, {
      keys: ['name', 'description'],
      threshold: -1000
    })

    organizations = search.map(({ obj }) => obj)
  }

  const [currentBadges, setBadges] = useState([...badges.map(x => x.id)])

  const openModal = organization => {
    setModalOrganization(organization)
  }

  const closeModal = () => {
    setModalOrganization(null)
  }

  return (
    <div style={modalOrganization ? {} : {}}>
      <Meta
        as={Head}
        title={`${category ? category.label : 'Nonprofits'} ${pageRegion ? `in ${pageRegion.label}` : ''} on HCB`}
        description={
          "Teenagers are making an impact with HCB's fiscal sponsorship and financial tools. Explore the nonprofits running on HCB."
        }
        image={`https://workshop-cards.hackclub.com/${encodeURIComponent(`${category ? category.label : 'Nonprofits running'} ${pageRegion ? `in ${pageRegion.label}` : ''} on HCB`)}.png?theme=light&md=1&fontSize=250px`}
      />
      <style>{styles}</style>
      {modalOrganization && (
        <OrganizationModal
          organization={modalOrganization}
          onClose={closeModal}
        />
      )}
      <Box as="main" key="main">
        {!modalOrganization && <Nav />}
        <ForceTheme theme="light" />
        <Box
          sx={{
            pt: [5, null, null, null, 6],
            pb: [3, 4, 5, null, 6],
            minHeight: ['70vh', 'none'],
            textAlign: 'center',
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('/home/hackathons-bg.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 'calc(48rem + 512px)',
              mx: 'auto',
              px: '16px',
              backdropFilter: 'blur(1.5px)',
              color: 'white'
            }}
          >
            <Heading
              sx={{
                textAlign: 'center',
                mt: [2, 4],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)',
                fontSize: [5, null, 6, 7],
                textWrap: 'balance'
              }}
              as="h1"
              variant="title"
            >
              <Flex
                sx={{ justifyContent: 'center', alignItems: 'center', mb: 2 }}
              >
                <MSparkles colors={['green', 'teal', 'blue']}>
                  <img
                    src="/fiscal-sponsorship/hcb-icon-small.png"
                    alt=""
                    height="82px"
                  />
                </MSparkles>
              </Flex>
              {category ? category.label : 'Nonprofits'}{' '}
              {pageRegion && <>in {pageRegion.label}</>} on HCB
            </Heading>
            <Box
              sx={{
                fontSize: [2, 3, 3],
                textAlign: 'center',
                my: 2,
                maxWidth: '956px',
                mx: 'auto'
              }}
            >
              {
                <>
                  Teenagers are making an impact with HCB's fiscal sponsorship
                  and financial tools. <br /> Explore the nonprofits running on
                  HCB.
                </>
              }
            </Box>
            <Button
              variant="ctaLg"
              as="a"
              {...({ href: '/fiscal-sponsorship' } as any)}
              target="_blank"
              sx={{
                mt: [0, 2],
                height: '56px'
              }}
            >
              WHAT'S HCB?
            </Button>
          </Box>
        </Box>

        <Grid
          columns="auto 3fr"
          sx={{
            '@media screen and (max-width: 991.98px)': {
              display: 'block'
            },
            position: 'relative'
          }}
          id="listings"
        >
          <Container>
            <Box
              sx={{
                py: [0, 4],
                mb: [4, 0],
                display: 'block', // temporary - @sampoder
                marginLeft: 'max(calc(50vw - 900px), 0px)',
                '@media screen and (max-width: 991.98px)': {
                  display: 'none'
                },
                '@media screen and (min-width: 992px)': {
                  position: 'sticky',
                  top: 80,
                  alignSelf: 'start'
                }
              }}
            >
              <Filtering
                badges={[setBadges, currentBadges, 'Badges', badges, false]}
                region={region}
                clearOffset={() => setOffset(0)}
              />
            </Box>
          </Container>
          <Container py={4}>
            <Flex>
              <Box sx={{ flexGrow: 1, pr: [0, 3], mb: 3 }}>
                <Input
                  placeholder="Search Organizations"
                  onChange={e => setSearchValue(e.target.value)}
                  value={searchValue}
                  sx={{
                    border: '2px solid ' + theme.colors.muted,
                    textAlign: ['left', 'left', 'left'],
                    width: '100%',
                    height: '100%',
                    bg: 'sheet',
                    fontSize: '18px',
                    padding: '12px'
                  }}
                />
              </Box>
            </Flex>
            <Box
              sx={{
                '@media screen and (max-width: 991.99px)': {
                  display: 'block'
                },
                '@media screen and (min-width: 992px)': {
                  display: 'none'
                },
                my: 2
              }}
            >
              <Filtering
                badges={[setBadges, currentBadges, 'Badges', badges]}
                region={region}
                mobile
              />
            </Box>
            {organizations.length === 0 && (
              <Box
                sx={{
                  textAlign: 'center',
                  p: 5
                }}
              >
                <Box>
                  <Text
                    variant="headline"
                    sx={{
                      textTransform: 'unset',
                      display: 'block',
                      mb: 0
                    }}
                  >
                    No results
                  </Text>
                </Box>
              </Box>
            )}
            <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ my: 3 }}>
              {organizations
                .map(org => new Organization(org))
                .filter(organization => {
                  const organizationBadgeIds = getBadgesForOrg(organization)
                    .map(badge => badge.id)

                  return (
                    currentBadges.length === badges.length ||
                    intersection(organizationBadgeIds, currentBadges).length ===
                      currentBadges.length
                  )
                })
                .slice(offset, offset + 51)
                .map(organization => (
                  <OrganizationCard
                    organization={organization}
                    key={organization.id}
                    openModal={openModal}
                    badges={getBadgesForOrg(organization)}
                    showTags={true}
                  />
                ))}
            </Grid>
          </Container>
        </Grid>
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          mb: 4,
          display: searchValue === '' ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}
      >
        {offset > 0 && (
          <Button onClick={() => setOffset(offset - 51)}>
            <Icon
              glyph="view-back"
              size={24}
              style={{ marginRight: 0, marginLeft: '-8px' }}
            />{' '}
            Previous
          </Button>
        )}
        <Heading variant="eyebrow" as="p" sx={{ fontSize: [2, 3], mb: 0 }}>
          Page {Math.ceil((offset + 1) / 51)}/
          {Math.ceil(organizations.length / 51)}
        </Heading>
        {offset + 51 < organizations.length && (
          <Button onClick={() => setOffset(offset + 51)}>
            Next
            <Icon
              glyph="view-forward"
              size={24}
              style={{ marginRight: '-8px', marginLeft: 0 }}
            />
          </Button>
        )}
      </Box>
      <Footer />
    </div>
  )
}

export async function fetchRawOrganizations() {
  let lastLength = 100
  let total = []
  let page = 1
  while (lastLength >= 100) {
    const json = await fetch(
      'https://hcb.hackclub.com/api/v3/directory/organizations?per_page=100&page=' +
        page
    ).then(res => res.json())
    lastLength = json.length
    page++
    total = [...total, ...json]
  }
  return [
    ...total.filter(a => a.logo !== null),
    ...total.filter(a => a.logo === null)
  ]
}

export const getStaticProps = async () => {
  return {
    props: {
      rawOrganizations: await fetchRawOrganizations()
    },
    revalidate: 60 // seconds
  }
}
