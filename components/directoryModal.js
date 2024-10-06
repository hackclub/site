/** @jsxImportSource theme-ui */

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

badges.__proto__.forOrg = function (org) {
  return this.filter(badge => badge.match?.(org))
}


import {
  Badge as ThemeBadge,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Input
} from 'theme-ui'
import { Text, Button, Card } from 'theme-ui'
import Icon from '@hackclub/icons'
import OrganizationCard, {
  Badge
} from './fiscal-sponsorship/directory/card'
import Tooltip from './fiscal-sponsorship/tooltip'

export function OrganizationModal({ organization, onClose }) {
  return (
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
    onClick={onClose}
  >
    <Card
      sx={{
        width: 'min(640px, 90%)',
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
        <Icon glyph="view-close" size={32} onClick={onClose} />
      </Flex>
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 3
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'end',
            minHeight: '200px',
            m: -4,
            p: "24px",
            boxSizing: 'content-box',
            backgroundPosition: 'center center',
            color: 'white',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundImage: `url('${organization.branding.backgroundImage}')`
          }}
        >
          <Flex
            sx={{
              flexDirection: ['column', 'row', 'row'],
              alignItems: 'center',
              justifyContent: 'start',
              gap: "24px"
            }}
          >
            {organization.branding.logo && (
              <img
                alt={`${organization.name}'s logo`}
                src={organization.branding.logo}
                sx={{
                  width: 'auto',
                  height: '96px',
                  borderRadius: '8px'
                }}
              />
            )}
            <Flex 
              sx={{
                flexDirection: "column"
              }}
            >
              <Text
                variant="title"
                sx={{
                  wordBreak: 'break-word',
                  marginBottom: '12px',
                  textAlign: ['center', 'left', 'left'],
                  fontSize: ['36px', '36px', '36px'],
                  color: 'white',
                  textShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)'
                }}
              >
                {organization.name}
              </Text>
              <Text
                variant="subheadline"
                sx={{
                  whiteSpace: "nowrap",
                  textAlign: ['center', 'left', 'left'],
                  color: 'white',
                  textShadow: '0px 10px 10px rgba(0, 0, 0, 0.25)',
                  marginBottom: "0px"
                }}
              >
                {organization.location.country}
              </Text>
            </Flex>
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
            mt: "40px",
            mb: -2,
            flexWrap: 'wrap'
          }}
        >
          {/* hardcoded "nonprofit" badge */}
          <ThemeBadge
            as="span"
            aria-label="Nonprofit"
            sx={{
              bg: 'blue',
              color: 'snow',
              fontSize: '20px',
              textShadow: 'none',
              borderRadius: '15px',
              px: 2,
              display: 'block'
            }}
          >
            Nonprofit
          </ThemeBadge>
          
          {organization.raw.transparent && (
            <ThemeBadge
              as="span"
              aria-label="Transparent"
              sx={{
                bg: 'purple',
                color: 'snow',
                fontSize: '20px',
                textShadow: 'none',
                borderRadius: '15px',
                px: 2,
                display: 'block'
              }}
            >
              Transparent
            </ThemeBadge>
          )}
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
            {organization.branding.description && (
            <Text variant="lead" style={{ fontSize: '22px' }}>
              {organization.branding.description}
            </Text>
            )}

            <Flex
              sx={{
                flexDirection: 'column',
                alignItems: 'start',
                my: 2,
                ml: -1,
                gap: 1
              }}
            >
              {organization.links.website && (
                <Flex
                  as="a"
                  target="_blank"
                  href={organization.links.website}
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
              {organization.links.financials && (
                <Flex
                  as="a"
                  target="_blank"
                  href={organization.links.financials}
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
        </Flex>

        <Flex
          sx={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Text sx={{ display: ['none', 'none', 'block'] }}>
            All donations are tax-deductible.
          </Text>

          <Button
            as="a"
            variant="lg"
            href={organization.links.donations}
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
        </Flex>
      </Flex>
    </Card>
  </Box>
  )
}