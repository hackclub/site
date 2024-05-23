import {
  Badge as ThemeBadge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Input
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../../components/force-theme'
import Nav from '../../../components/nav'
import Footer from '../../../components/footer'
import MSparkles from '../../../components/sparkles/money'
import { Text, Button, Card } from 'theme-ui'
import Icon from '@hackclub/icons'
import OrganizationCard, {
  Badge
} from '../../../components/fiscal-sponsorship/directory/card'
import fuzzysort from 'fuzzysort'
import { useEffect, useState } from 'react'
/** @jsxImportSource theme-ui */
import { kebabCase, intersection, find } from 'lodash'
import theme from '@hackclub/theme'
import Tooltip from '../../../components/fiscal-sponsorship/tooltip'
const GeoPattern = require('geopattern')
import { useRouter } from 'next/router'

const styles = `
  html {
    scroll-behavior: smooth;
  }
`

export const badges = [
  {
    label: 'Transparent',
    id: 'Transparent',
    tooltip: 'Transparent',
    color: 'purple',
    icon: 'explore',
    match: org => org.isTransparent
  }
]

export const regions = [
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
    continents: ['Asia', 'Oceania'],
    color: 'secondary',
    iconColor: 'green',
    icon: 'explore',
    image:
      'https://cloud-oax3m4v0t-hack-club-bot.vercel.app/0asia___oceania.png',
    ogImage: '/fiscal-sponsorship/climate/Asia+Oceania.png'
  }
]

badges.__proto__.forOrg = function (org) {
  return this.filter(badge => badge.match?.(org))
}

export const tags = [
  {
    label: 'Nonprofit',
    id: 'Nonprofit',
    color: 'blue',
    match: org => true
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
    icon: 'list',
    index: true
  },
  {
    label: 'FIRST Teams',
    id: 'first',
    color: 'blue',
    description:
      'Everywhere from San Jose to Boston to New York, HCB powers teams of all sizes.',
    match: org => org.category == 'robotics_team',
    icon: 'sam'
  },
  {
    label: 'Hackathons',
    id: 'hackathons',
    color: 'purple',
    description: `Hackers are using HCB to run hackathons that'll blow your mind away.`,
    match: org => org.category == 'hackathon',
    icon: 'event-code'
  }
]

tags.__proto__.forOrg = function (org) {
  return this.filter(tag => tag.match?.(org))
}

const FilterPanel = ({ filter, mobile }) => {
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
              textDecoration: 'none',
              color: 'secondary',
              textDecoration: 'none',
              transition: 'color 0.2s',
              ':hover': {
                color: 'blue'
              },
              width: 'fit-content'
            }}
            onClick={() =>
              router.push(
                availableCategory.index
                  ? `/fiscal-sponsorship/directory/`
                  : `/fiscal-sponsorship/directory/${availableCategory.id}/${region || ''}`
              )
            }
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
                color: 'inherit',
                fontSize: 3,
                color:
                  category == availableCategory.id ||
                  (availableCategory.index &&
                    category == null &&
                    region == null)
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
              textDecoration: 'none',
              color: 'secondary',
              textDecoration: 'none',
              transition: 'color 0.2s',
              ':hover': {
                color: 'blue'
              },
              width: 'fit-content'
            }}
            onClick={() =>
              router.push(
                `/fiscal-sponsorship/directory/${category || 'organizations'}/${kebabCase(availableRegion.label)}`
              )
            }
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
                color: 'inherit',
                fontSize: 3,
                color:
                  region == kebabCase(availableRegion.label)
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

const Filtering = ({ mobile, region, ...props }) => {
  return (
    <>
      {Object.values(props).map((filter, i) => (
        <FilterPanel key={`filter-${i}`} filter={filter} mobile={mobile} />
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
        <Box
          sx={{
            position: 'fixed',
            top: '0px',
            left: '0px',
            right: '0px',
            bottom: '0px',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            bg: '#00000044'
          }}
          onClick={closeModal}
        >
          <Card
            sx={{
              width: 'min(800px, 80%)',
              bg: 'elevated',
              borderRadius: '10px',
              position: 'relative',
              display: 'flex',
              boxSizing: 'border-box',
              flexDirection: 'column',
              maxHeight: '90vh',
              overflowY: 'scroll'
            }}
            onClick={e => {
              e.stopPropagation()
            }}
          >
            <Flex
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '40px',
                height: '40px',
                bg: 'smoke',
                borderRadius: '50%',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer'
              }}
            >
              <Icon glyph="view-close" size={32} onClick={closeModal} />
            </Flex>
            <Flex sx={{ flexDirection: 'column', alignItems: 'start', gap: 3 }}>
              <Flex
                sx={{
                  flexDirection: 'column',
                  justifyContent: 'end',
                  width: '100%',
                  minHeight: '200px',
                  m: -4,
                  p: 4,
                  pb: '48px',
                  boxSizing: 'content-box',
                  backgroundPosition: 'center center',
                  color: 'white',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 80%, rgba(255,255,255,1) 100%), url('${modalOrganization.branding.backgroundImage}')`
                }}
              >
                <Flex
                  sx={{
                    flexDirection: ['column', 'row', 'row'],
                    alignItems: ['center', 'end', 'end'],
                    justifyContent: 'start'
                  }}
                >
                  {modalOrganization.branding.logo && (
                    <img
                      alt={`${modalOrganization.name}'s logo`}
                      src={modalOrganization.branding.logo}
                      sx={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '8px',
                        marginRight: [0, 4, 4],
                        boxShadow: '0px 0px 45px 0px rgba(0, 0, 0, 0.72)'
                      }}
                    />
                  )}
                  <Text
                    variant="title"
                    sx={{
                      wordBreak: 'break-word',
                      marginBottom: '16px',
                      textAlign: ['center', 'left', 'left'],
                      fontSize: ['48px', '48px', '64px'],
                      color: 'white',
                      textShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)'
                    }}
                  >
                    {modalOrganization.name}
                  </Text>
                </Flex>
              </Flex>

              {/* Badges */}
              <Flex
                sx={{
                  flexDirection: 'row',
                  justifyContent: ['center', 'start', 'start'],
                  alignItems: 'center',
                  gap: 2,
                  width: '100%',
                  mt: -1,
                  mb: -2,
                  flexWrap: 'wrap'
                }}
              >
                {tags.forOrg(modalOrganization).map((tag, i) => (
                  <ThemeBadge
                    key={i}
                    as="span"
                    aria-label="Hello there"
                    sx={{
                      bg: tag.color,
                      color: 'snow',
                      fontSize: '20px',
                      textShadow: 'none',
                      borderRadius: '15px',
                      px: 2,
                      display: 'block'
                    }}
                  >
                    {tag.label}
                  </ThemeBadge>
                ))}

                {badges.forOrg(modalOrganization).map((badge, i) => {
                  return (
                    <Tooltip.N key={i} text={badge.tooltip} id={badge.id}>
                      <span class={`tooltipped-${badge.id}`}>
                        <Badge badge={badge} />
                      </span>
                    </Tooltip.N>
                  )
                })}
              </Flex>

              <Flex
                sx={{
                  flexDirection: 'row',
                  alignItems: 'start',
                  gap: 4,
                  width: '100%'
                }}
              >
                {/* info & buttons */}
                <Flex
                  sx={{
                    flexDirection: 'column',
                    alignItems: 'start',
                    flex: '1'
                  }}
                >
                  <Text variant="lead" style={{ fontSize: '22px' }}>
                    {modalOrganization.branding.description}
                  </Text>

                  {/* mobile stats */}
                  <Flex
                    sx={{
                      my: 3,
                      display: ['flex', 'flex', 'none'],
                      width: '100%',
                      gap: 2,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      alignItems: 'start',
                      alignSelf: 'start'
                    }}
                  >
                    <Text
                      variant="subheadline"
                      sx={{
                        mb: 0,
                        color: '#3b4858',
                        marginRight: 2
                      }}
                    >
                      {modalOrganization.location.country}
                    </Text>
                    <Text
                      variant="subheadline"
                      sx={{
                        mb: 0,
                        color: '#3b4858'
                      }}
                    >
                      {modalOrganization.location.continent}
                    </Text>
                  </Flex>

                  <Flex
                    sx={{
                      flexDirection: 'column',
                      alignItems: 'start',
                      my: 2,
                      ml: -1,
                      gap: 1
                    }}
                  >
                    {modalOrganization.links.website && (
                      <Flex
                        as="a"
                        target="_blank"
                        href={modalOrganization.links.website}
                        sx={{
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                          color: 'slate',
                          textDecoration: 'none'
                        }}
                      >
                        <Icon glyph="web" size={38} />
                        <Text style={{ fontSize: '20px', marginLeft: '6px' }}>
                          Website
                        </Text>
                        <Icon
                          glyph="external"
                          size={20}
                          style={{ marginLeft: '2px', marginBottom: '6px' }}
                        />
                      </Flex>
                    )}
                    {modalOrganization.links.financials && (
                      <Flex
                        as="a"
                        target="_blank"
                        href={modalOrganization.links.financials}
                        sx={{
                          flexDirection: 'row',
                          justifyContent: 'start',
                          alignItems: 'center',
                          color: 'slate',
                          textDecoration: 'none'
                        }}
                      >
                        <Icon glyph="explore" size={38} />
                        <Text style={{ fontSize: '20px', marginLeft: '6px' }}>
                          Transparent Finances
                        </Text>
                        <Icon
                          glyph="external"
                          size={20}
                          style={{ marginLeft: '2px', marginBottom: '6px' }}
                        />
                      </Flex>
                    )}
                  </Flex>
                </Flex>
                {/* desktop stats */}
                <Flex
                  sx={{
                    display: ['none', 'none', 'flex'],
                    maxWidth: '30%',
                    flexDirection: 'column',
                    alignItems: 'start',
                    alignSelf: 'start'
                  }}
                >
                  <Flex sx={{ flexDirection: 'column', alignItems: 'start' }}>
                    <Text
                      variant="headline"
                      sx={{
                        mb: 0,
                        color: '#3b4858'
                      }}
                    >
                      {modalOrganization.location.country}
                    </Text>
                    <Text
                      sx={{
                        color: '#5b616a',
                        fontSize: '20px'
                      }}
                    >
                      Country
                    </Text>
                  </Flex>
                  <Flex sx={{ flexDirection: 'column', alignItems: 'start' }}>
                    <Text
                      variant="headline"
                      sx={{
                        mb: 0,
                        color: '#3b4858'
                      }}
                    >
                      {modalOrganization.location.continent}
                    </Text>
                    <Text
                      sx={{
                        color: '#5b616a',
                        fontSize: '20px'
                      }}
                    >
                      Continent
                    </Text>
                  </Flex>
                </Flex>
              </Flex>

              <Flex
                sx={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Button
                  as="a"
                  variant="lg"
                  href={modalOrganization.links.donations}
                  target="_blank"
                  sx={{
                    backgroundImage: t => t.util.gx('green', 'blue'),
                    width: ['100%', 'auto', 'auto']
                  }}
                >
                  <Flex
                    sx={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      marginLeft: -1,
                      marginRight: 2
                    }}
                  >
                    <Icon glyph="friend" size={20} style={{ scale: '2.5' }} />
                  </Flex>
                  Make a Donation
                </Button>
                <Text sx={{ display: ['none', 'none', 'block'] }}>
                  All donations are tax-deductible.
                </Text>
              </Flex>
            </Flex>
          </Card>
        </Box>
      )}
      <Box as="main" key="main">
        {!modalOrganization && <Nav light />}
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
              {(
                <>
                  Teenagers are making an impact with HCB's fiscal sponsorship
                  and financial tools. <br /> Explore the nonprofits running on
                  HCB.
                </>
              )}
            </Box>
            <Button
              variant="ctaLg"
              as="a"
              href="/fiscal-sponsorship"
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
                  const organizationBadgeIds = badges
                    .forOrg(organization)
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
                    badges={badges.forOrg(organization)}
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
          display: searchValue == '' ? 'flex' : 'none',
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

/**
 * Represents an organization.
 */
export class Organization {
  /**
   * Creates an instance of Organization.
   * @param {object} rawOrganization - The raw organization data.
   */
  constructor(rawOrganization) {
    /**
     * The raw organization data.
     * @type {object}
     */
    this.raw = rawOrganization
  }

  /**
   * Gets the ID of the organization.
   * @type {string}
   */
  get id() {
    return this.raw.id
  }

  /**
   * Gets the name of the organization.
   * @type {string}
   */
  get name() {
    return this.raw.name
  }

  /**
   * Gets the slug of the organization.
   * @type {string}
   */
  get slug() {
    return this.raw.slug
  }

  /**
   * Checks if the organization is transparent.
   * @type {boolean}
   */
  get isTransparent() {
    return this.raw.transparent
  }

  /**
   * Checks if the organization is in demo mode.
   * @type {boolean}
   */
  get isDemo() {
    return this.raw.demo_mode
  }

  /**
   * Gets the number of users in the organization.
   * @type {number}
   */
  get users() {
    return this.raw.users.length
  }

  /**
   * Checks if the organization accepts donations.
   * @type {boolean}
   */
  get acceptsDonations() {
    return this.raw.donation_link !== null
  }

  /**
   * Gets the branding information of the organization.
   * @type {object}
   * @property {string} logo - The logo of the organization.
   * @property {string} donationHeader - The donation header of the organization.
   * @property {string} backgroundImage - The background image of the organization.
   * @property {string} publicMessage - The public message of the organization.
   */
  get branding() {
    return {
      logo: this.raw.logo,
      donationHeader: this.raw.donation_header,
      backgroundImage:
        this.raw.background_image ||
        GeoPattern.generate(this.raw.name).toDataUri(),
      description: this.raw.description
    }
  }

  /**
   * Gets the tags of the organization.
   * @type {object}
   * @property {string} type - The type of the organization.
   * @property {string} category - The category of the organization.
   * @property {string[]} badges - The badges of the organization.
   */
  get tags() {
    return {
      type: this.raw.category,
      category: 'Coding',
      badges: ['128_collective_funded']
    }
  }

  /**
   * Gets the creation date of the organization.
   * @type {Date}
   */
  get createdAt() {
    return new Date(this.raw.created_at)
  }

  /**
   * Gets the links associated with the organization.
   * @type {object}
   * @property {string} website - The website link of the organization.
   * @property {string} donations - The donation link of the organization (if it accepts donations).
   * @property {string} financials - The financials link of the organization (if it is transparent).
   */
  get links() {
    const links = {
      website: this.raw.website
    }

    if (this.acceptsDonations) links.donations = this.raw.donation_link
    if (this.isTransparent)
      links.financials = `https://hcb.hackclub.com/${this.slug}`

    return links
  }

  /**
   * Gets the location of the organization.
   * @type {object}
   * @property {string} country - The country of the organization.
   * @property {string} continent - The continent of the organization.
   * @property {string} countryCode - The country code of the organization.
   */
  get location() {
    return {
      country: this.raw.location.country,
      continent: this.raw.location.continent,
      countryCode: this.raw.location.country_code
    }
  }

  /**
   * Checks if the organization is recommended by 128 Collective.
   * @type {boolean}
   */
  get is128Recommended() {
    return this.raw.partners?.['128_collective']?.recommended
  }

  /**
   * Checks if the organization is funded by 128 Collective.
   * @type {boolean}
   */
  get is128Funded() {
    return this.raw.partners?.['128_collective']?.funded
  }

  /**
   * Updates the organization data by making an API call.
   * @returns {Organization} The updated Organization instance.
   */
  async update() {
    const response = await fetch(this.raw.href)
    const json = await response.json()
    this.raw = json

    return this
  }
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
  return total
}

export const getStaticProps = async () => {
  return {
    props: {
      rawOrganizations: await fetchRawOrganizations()
    },
    revalidate: 60 // seconds
  }
}
