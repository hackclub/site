import {
  Badge as ThemeBadge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Select
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../../components/force-theme'
import Nav from '../../../components/nav'
import Footer from '../../../components/footer'
import MSparkles from '../../../components/sparkles/money'
import { Text, Button, Card } from 'theme-ui'
import Icon from '@hackclub/icons'
import OrganizationCard, { Badge } from '../../../components/hcb/directory/card'
import Zoom from 'react-reveal/Zoom'
import fuzzysort from 'fuzzysort'
import ScrollHint from '../../../components/scroll-hint'
import { useEffect, useState } from 'react'
/** @jsxImportSource theme-ui */
import NextLink from 'next/link'
import { kebabCase, intersection } from 'lodash'
import theme from '@hackclub/theme'
import Tooltip from '../../../components/hcb/tooltip'

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
  },
  // The "128 Collective Funded" is hidden for now. It may be re-added in the
  // future after 128 Collective has more multi-year grants.
  // {
  //   label: 'Funded',
  //   id: '128CollectiveFunded',
  //   tooltip: '128 Collective Funded',
  //   match: org => org.is128Funded,
  //   image:
  //     'https://d33wubrfki0l68.cloudfront.net/5fc90935f8126233f42919a6c68601a5d735d798/fa4b2/images/logo.svg'
  // },
  {
    label: 'Recommended',
    id: '128CollectiveRecommended',
    tooltip: '128 Collective Recommended',
    match: org => org.is128Recommended,
    image:
      'https://d33wubrfki0l68.cloudfront.net/5fc90935f8126233f42919a6c68601a5d735d798/fa4b2/images/logo.svg'
  }
]

badges.__proto__.forOrg = function (org) {
  return this.filter(badge => badge.match?.(org))
}

export const tags = [
  {
    label: 'Climate',
    id: 'Climate',
    color: '#1eb36d',
    match: org => true
  },
  {
    label: 'Nonprofit',
    id: 'Nonprofit',
    color: 'blue',
    match: org => true
  }
]

tags.__proto__.forOrg = function (org) {
  return this.filter(tag => tag.match?.(org))
}

export const regions = [
  {
    label: 'North America',
    color: 'secondary',
    iconColor: 'red',
    icon: 'photo',
    image:
      'https://cloud-cberabu5z-hack-club-bot.vercel.app/3north_america.png',
    ogImage:
      'https://cloud-p9tu92fwx-hack-club-bot.vercel.app/3northamerica.png'
  },
  {
    label: 'South America',
    color: 'secondary',
    iconColor: 'orange',
    icon: 'photo',
    image:
      'https://cloud-cberabu5z-hack-club-bot.vercel.app/4south_america.png',
    ogImage:
      'https://cloud-p9tu92fwx-hack-club-bot.vercel.app/4southamerica.png'
  },
  {
    label: 'Africa',
    color: 'secondary',
    iconColor: 'purple',
    icon: 'explore',
    image: 'https://cloud-cberabu5z-hack-club-bot.vercel.app/0africa.png',
    ogImage: 'https://cloud-p9tu92fwx-hack-club-bot.vercel.app/0africa.png'
  },
  {
    label: 'Europe',
    color: 'secondary',
    iconColor: 'blue',
    icon: 'explore',
    image: 'https://cloud-oax3m4v0t-hack-club-bot.vercel.app/1europe.png',
    ogImage: 'https://cloud-p9tu92fwx-hack-club-bot.vercel.app/2europe.png'
  },
  {
    label: 'Asia & Oceania',
    color: 'secondary',
    iconColor: 'green',
    icon: 'explore',
    image:
      'https://cloud-oax3m4v0t-hack-club-bot.vercel.app/0asia___oceania.png',
    ogImage:
      'https://cloud-p9tu92fwx-hack-club-bot.vercel.app/1asia_oceania.png'
  }
]

const FilterPanel = ({ filter, mobile }) => {
  const [hiddenOnMobile, setHiddenOnMobile] = useState(mobile)
  const setStateVariable = filter[0]
  const currentSelections = filter[1]
  const title = filter[2]
  const baseData = filter[3]
  if (!baseData?.length) return <></>
  return (
    <>
      <Heading
        as="h3"
        sx={{
          fontSize: 2,
          textTransform: 'uppercase',
          color: 'muted',
          mb: hiddenOnMobile ? 1 : 3,
          cursor: mobile ? 'pointer' : 'default',
          ':hover': mobile
            ? {
                color: 'blue'
              }
            : {}
        }}
        onClick={() => setHiddenOnMobile(!hiddenOnMobile)}
      >
        {mobile && 'FILTER BY '} {title}{' '}
        <small
          style={{
            transform: 'translateY(-1px)',
            display: 'inline-block'
          }}
        >
          {mobile && (hiddenOnMobile ? '▶︎' : '▼')}
        </small>
      </Heading>
      <Flex
        sx={{
          flexDirection: mobile ? 'row' : 'column',
          gap: '12px',
          flexWrap: 'wrap',
          mb: 3,
          display: hiddenOnMobile ? 'none' : 'flex'
        }}
      >
        <Flex
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
          onClick={() => setStateVariable([...baseData.map(x => x.id)])}
        >
          <Flex
            sx={{
              bg: 'smoke',
              color: 'secondary',
              p: 1,
              borderRadius: 6
            }}
          >
            <Icon glyph="list" size={24} />
          </Flex>
          <Heading
            as="h4"
            sx={{
              color: 'inherit',
              fontSize: 3,
              color:
                currentSelections.length !== baseData.length
                  ? 'black'
                  : 'primary',
              ':hover': {
                color: 'blue'
              }
            }}
          >
            All
          </Heading>
        </Flex>
        {baseData?.map((item, idx) => (
          <Flex
            key={idx}
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
              color:
                currentSelections.length === baseData.length ||
                !currentSelections.includes(item.id)
                  ? 'black'
                  : 'primary',
              transition: 'color 0.2s',
              ':hover': {
                color: 'blue'
              },
              width: 'fit-content'
            }}
            onClick={() => {
              if (currentSelections.length === baseData.length) {
                setStateVariable([item.id])
              } else if (currentSelections.includes(item.id)) {
                let temp = currentSelections
                temp = temp.filter(selection => selection !== item.id)
                if (temp.length === 0) {
                  setStateVariable([...baseData.map(x => x.id)])
                } else {
                  setStateVariable(temp)
                }
              } else {
                setStateVariable([...currentSelections, item.id])
              }
            }}
          >
            {item.image ? (
              <Flex
                sx={{
                  backgroundImage: `url("${item.image}")`,
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
            ) : (
              <Flex
                sx={{
                  bg: item.color,
                  color: 'white',
                  p: 1,
                  borderRadius: 6
                }}
              >
                <Icon glyph={item.icon} size={24} />
              </Flex>
            )}
            <Heading as="h4" sx={{ color: 'inherit', fontSize: 3 }}>
              {item.label}
            </Heading>
          </Flex>
        ))}
      </Flex>
    </>
  )
}

const RegionPanel = ({ currentRegion, mobile }) => {
  const [hiddenOnMobile, setHiddenOnMobile] = useState(mobile)
  return (
    <>
      <Heading
        as="h3"
        sx={{
          fontSize: 2,
          textTransform: 'uppercase',
          color: 'muted',
          mb: hiddenOnMobile ? 1 : 3,
          cursor: mobile ? 'pointer' : 'default',
          ':hover': mobile
            ? {
                color: 'blue'
              }
            : {}
        }}
        onClick={() => setHiddenOnMobile(!hiddenOnMobile)}
      >
        {mobile && 'FILTER BY '} REGION{' '}
        <small
          style={{
            transform: 'translateY(-1px)',
            display: 'inline-block'
          }}
        >
          {mobile && (hiddenOnMobile ? '▶︎' : '▼')}
        </small>
      </Heading>
      <Flex
        sx={{
          flexDirection: mobile ? 'row' : 'column',
          gap: '12px',
          flexWrap: 'wrap',
          mb: 3,
          display: hiddenOnMobile ? 'none' : 'flex'
        }}
      >
        <NextLink scroll={false} href={'/hcb/climate'}>
          <Flex
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
                color: '#B72A3D'
              },
              width: 'fit-content'
            }}
            as="a"
          >
            <Flex
              sx={{
                bg: 'smoke',
                color: 'secondary',
                p: 1,
                borderRadius: 6
              }}
            >
              <Icon glyph="list" size={24} />
            </Flex>
            <Heading
              as="h4"
              sx={{
                color: 'inherit',
                fontSize: 3,
                color: !currentRegion ? 'red' : 'black',
                ':hover': {
                  color: 'blue'
                }
              }}
            >
              All
            </Heading>
          </Flex>
        </NextLink>
        {regions?.map((item, idx) => (
          <NextLink
            key={idx}
            scroll={false}
            href={`/hcb/climate/organizations-in-${kebabCase(item.label)}`}
          >
            <Flex
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
                color: currentRegion?.label === item.label ? 'red' : 'black',
                transition: 'color 0.2s',
                ':hover': {
                  color: 'blue'
                },
                width: 'fit-content'
              }}
            >
              {item.image ? (
                <Flex
                  sx={{
                    backgroundImage: `url("${item.image}")`,
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
              ) : (
                <Flex
                  sx={{
                    bg: item.color,
                    color: 'white',
                    p: 1,
                    borderRadius: 6
                  }}
                >
                  <Icon glyph={item.icon} size={24} />
                </Flex>
              )}
              <Heading as="h4" sx={{ color: 'inherit', fontSize: 3 }}>
                {item.label}
              </Heading>
            </Flex>
          </NextLink>
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
      <RegionPanel currentRegion={region} />
    </>
  )
}

export default function ClimatePage({ rawOrganizations, pageRegion }) {
  const [searchValue, setSearchValue] = useState('')
  // const [region, setRegion] = useState(pageRegion);
  const region = pageRegion

  // useEffect(() => {
  //   // history.pushState(null, null, `/hcb/climate/organizations-in-${region.toLowerCase().split(' ').join('-')}`);
  // }, [region]);
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
        title={
          'Climate-focused nonprofits' +
          (region ? ` in ${region.label}` : ' on HCB')
        }
        description={
          'Nonprofits are making real environmental impact' +
          (region ? ` in ${region.label}` : '') +
          " with HCB's fiscal sponsorship and financial tools. Explore the climate efforts running on HCB."
        }
        image={
          region?.ogImage ??
          'https://cloud-gv8bzwz6z-hack-club-bot.vercel.app/0frame_14__1_.png'
        }
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
              overflow: 'scroll'
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
                  {modalOrganization.branding.logo &&
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
                  }
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
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-ff8eau8q5-hack-club-bot.vercel.app/0jeremy-bishop-ewkxn5capa4-unsplash.jpg')",
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
                fontSize: [5, null, 6, 7]
              }}
              as="h1"
              variant="title"
            >
              <Flex
                sx={{ justifyContent: 'center', alignItems: 'center', mb: 2 }}
              >
                <MSparkles
                  colors={['green', 'teal', 'blue']}
                  path={`M491.9,156.3c-19.4-46-51.9-85-92.7-112.6C358.3,16.1,309,0,256,0c-35.3,0-69,7.2-99.7,20.1c-46,19.4-85,51.9-112.6,92.7
	C16.1,153.7,0,203,0,256c0,35.3,7.2,69,20.1,99.7c19.4,46,51.9,85,92.7,112.6C153.7,495.9,203,512,256,512c35.3,0,69-7.2,99.7-20.1
	c46-19.4,85-51.9,112.6-92.7C495.9,358.3,512,309,512,256C512,220.7,504.8,187,491.9,156.3z M123.2,81.3c-1,11.8,2.5,23.7,9.9,33.1
	c6.8,8.7,17.6,11.5,18.1,23.4c0.5,11.4-1.3,17.3-8.8,25.3c-3.2,3.4-5.5,8.3-8.8,11.5c-4,3.9-2.5,2.7-8.8,3.8
	c-11.8,2-21.9,5.1-33.4,8.2c-18,5-20.6-22.4-28.1-35.8C78.2,123.6,98.7,99.9,123.2,81.3z M74,378.8c-23.7-35-37.5-77.2-37.5-122.7
	c0-19.9,2.7-39.2,7.6-57.6c8.4,18.1,20.6,33.7,28.9,52.2c10.7,23.8,39.5,17.2,52.2,38.1c11.3,18.5-0.8,42,7.7,61.3
	c6.1,14.1,20.6,17.1,30.5,27.4c10.2,10.4,10,24.6,11.5,38.1c1.8,15.9,4.6,31.7,8.5,47.2c0,0.2,0.1,0.3,0.1,0.5
	c-4.4-1.5-8.7-3.2-12.9-5C131.2,441.7,97.7,413.8,74,378.8z M169.8,290.1c3.2-0.7,16.2,1.6,20.2,2.4c6.3,1.3,9.7,5.2,14.7,9.1
	c13,10.4,27.3,18.5,41.8,26.4c11.2,6.2,14.5,14.1,7.3,27c-6.9,12.2-22.1,20.4-31.9,30.2c-2.7,2.6-8.3,11.8-11.7,9.8
	c-2.4-1.4-3.2-13.3-4.1-16c-4.5-13.7-13.2-25.7-24.8-34.2c-3.6-2.7-12.4-6.2-14.5-9.9c-2.3-4-0.2-13.6-0.1-17.9
	c0.1-6.4-2.8-17-1.2-22.9C167.3,287.4,163.8,291.4,169.8,290.1z M378.7,438c-35,23.7-77.2,37.5-122.7,37.5
	c-12.5,0-24.7-1.1-36.7-3.1c0.1-3.1,0.2-6,0.5-8c2.8-18.2,11.9-35.9,24.1-49.5c12.1-13.4,28.7-22.5,39-37.7
	c10.2-14.9,13.2-34.9,9-52.3c-6.1-25.6-40.9-34.2-59.7-48.1c-10.8-8-20.4-20.4-34.6-21.4c-6.5-0.5-12,0.9-18.5-0.7
	c-5.9-1.5-10.6-4.7-16.9-3.9c-11.8,1.6-19.3,14.2-32,12.5c-12.1-1.6-24.5-15.7-27.2-27.2c-3.5-14.8,8.2-19.6,20.7-20.9
	c5.2-0.5,11.1-1.1,16.1,0.8c6.6,2.5,9.7,8.9,15.7,12.2c11.1,6.1,13.4-3.6,11.7-13.5c-2.5-14.8-5.5-20.8,7.7-31
	c9.1-7,17-12.1,15.5-24.7c-0.9-7.4-4.9-10.8-1.1-18.1c2.9-5.6,10.7-10.7,15.9-14c13.2-8.6,56.7-8,39-32.2
	c-5.2-7.1-14.9-19.8-24-21.5c-11.4-2.2-16.5,10.6-24.5,16.2c-8.2,5.8-24.3,12.4-32.5,3.4c-11.1-12.1,7.3-16.1,11.4-24.5
	c1.9-3.9,0-9.5-3.4-14.8c4.1-1.7,8.2-3.3,12.4-4.8c2.7,1.9,5.6,3.2,9.2,3.4c7.6,0.5,14.9-3.6,21.5,1.6c7.4,5.7,12.7,12.9,22.6,14.7
	c9.5,1.7,19.6-3.8,21.9-13.6c1.5-5.9,0-12.1-1.3-18.3c29.7,0.2,58.1,6.3,83.8,17.2c12.9,5.4,25.1,12.1,36.6,19.7
	c-2.3-1-5.2-1-8.8,0.7c-6.9,3.2-16.8,11.4-17.6,19.6c-0.8,9.2,12.8,10.5,19.2,10.5c9.7,0,19.6-4.3,16.4-15.6
	c-1.4-5-3.3-10.3-6.5-13.3c7.3,5,14.2,10.5,20.8,16.3c-0.1,0.1-0.2,0.2-0.3,0.2c-6.6,6.9-14.2,12.3-18.7,20.6
	c-3.2,5.9-6.8,8.7-13.2,10.2c-3.5,0.8-7.6,1.1-10.6,3.5c-8.3,6.8-3.5,22.4,4.3,27.1c9.9,5.9,24.6,3.1,32.1-5.3
	c5.8-6.6,9.3-18.1,19.8-18.1c4.6,0,9.1,1.8,12.4,5c4.3,4.5,3.5,8.7,4.4,14.3c1.7,10,10.4,4.6,15.8-0.5c3.9,7,7.4,14.1,10.6,21.5
	c-5.9,8.5-10.5,17.8-24.8,7.9c-8.5-5.9-13.7-14.5-24.4-17.1c-9.3-2.3-18.9,0.1-28.1,1.7c-10.5,1.8-22.9,2.6-30.8,10.5
	c-7.7,7.6-11.7,17.9-19.9,25.5c-15.8,14.9-22.4,31.1-12.2,52.1c9.8,20.2,30.4,31.2,52.6,29.7c21.8-1.5,44.4-14.1,43.8,17.6
	c-0.2,11.2,2.1,19,5.6,29.4c3.2,9.6,3,18.9,3.7,28.8c0.8,11.2,2.4,23.1,5.5,34.5C414.9,409.1,397.9,425,378.7,438z M459.4,338.5
	c-0.1-2.2-0.4-4.3-0.7-6.5c-1.5-9.8-7.3-19-8.1-28.7c-1.5-18.1,1.8-32.5-12.1-47.6c-13.4-14.6-33.1-18.1-52-15.1
	c-9.5,1.5-47.7,7.6-32.3-14.1c3-4.3,8.3-7.8,11.7-11.8c3-3.5,5.5-10,9-12.8c3.5-2.8,19.4-5.9,24-4.5c4.6,1.4,9.3,8,13.3,10.9
	c7.3,5.5,15.9,9.2,24.9,10.7c8.8,1.3,23.2-1.1,33.9-7c2.9,14.2,4.4,28.9,4.4,44C475.4,285.2,469.7,313.1,459.4,338.5z`}
                  viewBox="0 0 512 512"
                >
                  <img
                    src="/hcb/climate/earth-on-hcb.svg"
                    alt=""
                    height="82px"
                  />
                </MSparkles>
              </Flex>
              Climate-focused nonprofits on{' '}
              <span sx={{ whiteSpace: 'nowrap' }}>HCB</span>
              {region ? (
                <>
                  {' '}
                  in
                  <span
                    sx={{
                      display: ['none', 'inline'],
                      whiteSpace: 'nowrap',
                      bg: region.iconColor,
                      pl: 3,
                      pr: 18,
                      mx: -1,
                      borderRadius: 8,
                      textShadow: 'none',
                      ml: 2
                    }}
                  >
                    <img
                      src={region.image}
                      alt=""
                      sx={{ mr: 3, height: [30, 42, 42, 64] }}
                    />
                    {region.label}
                  </span>
                  <span
                    sx={{ display: ['inline', 'none'], whiteSpace: 'nowrap' }}
                  >
                    {' ' + region.label}
                  </span>
                </>
              ) : (
                ''
              )}
            </Heading>
            <Box
              sx={{
                fontSize: [2, 3, 3],
                textAlign: 'center',
                my: 4,
                maxWidth: '956px',
                mx: 'auto'
              }}
            >
              Nonprofits are making real environmental impact with HCB's fiscal
              sponsorship and financial tools. Explore the climate efforts
              running on HCB.
            </Box>
            <Button
              variant="ctaLg"
              as="a"
              href="#listings"
              sx={{
                mt: [0, 2],
                backgroundImage: t => t.util.gx('green', 'blue'),
                height: '56px'
              }}
            >
              EXPLORE IMPACT
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
          <Container pt={4}>
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
            <Grid columns={[1, 2, 3]} gap={[3, 4]} sx={{ mt: 3 }}>
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
        <Box
          sx={{
            mt: [5, 3, 0],
            pt: [5, null, null, null, 6],
            pb: [3, 4, 5, null, 6],
            minHeight: ['70vh', 'none'],
            textAlign: 'center',
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-hc1lyhwxy-hack-club-bot.vercel.app/0marita-kavelashvili-ugnrxk1129g-unsplash.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: 'calc(48rem + 312px)',
              mx: 'auto',
              px: '16px'
            }}
          >
            <Heading
              sx={{
                textAlign: 'center',
                mt: [2, 4],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)',
                fontSize: [5, null, 6, 6]
              }}
              as="h3"
              variant="subheadline"
            >
              Join us in supporting <br /> climate initiatives.
            </Heading>
            <Box
              sx={{
                fontSize: [2, 3, 3],
                textAlign: 'center',
                my: 3
              }}
            >
              Let your money work for change by donating to all climate-focused
              nonprofits on HCB. Donate to 128 Collective’s curated list of
              recommended organizations.
            </Box>
            <Button
              variant="ctaLg"
              as="a"
              href="https://hcb.hackclub.com/donations/start/128-collective-fund"
              target="_blank"
              sx={{
                ml: [0, 3],
                mt: 2,
                backgroundImage: t => t.util.gx('green', 'blue')
              }}
            >
              <Text>Donate to the climate&nbsp;fund</Text>
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer light key="footer" />
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
      backgroundImage: this.raw.background_image,
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

export async function fetchRawClimateOrganizations() {
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
  return total.filter(org => org.climate)
}

export const getStaticProps = async () => {
  return {
    props: {
      rawOrganizations: await fetchRawClimateOrganizations()
    },
    revalidate: 60 // seconds
  }
}
