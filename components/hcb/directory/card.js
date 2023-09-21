import { Card, Badge as ThemeBadge, Box, Heading, Text, Image } from 'theme-ui'
import { Organization } from '../../../pages/hcb/climate'
import Tilt from '../../../components/tilt'
import Icon from '@hackclub/icons'
import Tooltip from '../tooltip'

export const Badge = ({ badge }) =>
  badge.image ? (
    <ThemeBadge
      as="span"
      sx={{
        backgroundImage: `url("${badge.image}")`,
        backgroundSize: 'contain',
        backgroundColor: 'unset',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        fontSize: 'inherit',
        textShadow: 'none',
        borderRadius: 5,
        display: 'block',
        height: 30,
        width: 38
      }}
    >
      <span style={{ opacity: '0' }}>.</span>
    </ThemeBadge>
  ) : (
    <ThemeBadge
      as="span"
      sx={{
        bg: badge.color,
        color: 'snow',
        fontSize: 'inherit',
        textShadow: 'none',
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Icon glyph={badge.icon} size={30} />
    </ThemeBadge>
  )

const TagRow = ({ category, type, badgeNames }) => {
  return (
    <>
      {badgeNames
        .map(name => badges[name])
        .map((Badge, i) => (
          <Badge key={i} />
        ))}
    </>
  )
}

/**
 *
 * @param {{
 * organization: Organization,
 * showTags: boolean
 * }} props
 * @returns
 */
export const OrganizationCard = ({
  openModal,
  badges,
  organization,
  showTags = false
}) => (
  <Tilt>
    <Card
      onClick={() => openModal(organization)}
      rel="noopener noreferrer"
      itemScope
      itemType="http://schema.org/Event"
      variant="event"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 128,
        color: 'white',
        cursor: 'pointer',
        textShadow: '0 1px 4px rgba(0, 0, 0, 0.375)',
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
        display: 'flex',
        px: 3,
        backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.375) 75%), url('${organization.branding.backgroundImage}')`,
        textAlign: 'center',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          width: '100%',
          gap: 2,
          flexDirection: 'row',
          mb: 3
        }}
      >
        {badges.map((badge, i) => (
          <Tooltip.W key={i} text={badge.label} id={badge.id}>
            <span class={`tooltipped-${badge.id}`}>
              <Badge badge={badge} />
            </span>
          </Tooltip.W>
        ))}
      </Box>

      {organization.branding.logo && (
        <Image
          src={organization.branding.logo}
          alt={`${organization.name} logo`}
          loading="lazy"
          sx={{
            minWidth: 64,
            height: 64,
            objectFit: 'contain',
            objectPosition: 'left',
            borderRadius: 'default',
            mt: 'auto'
          }}
        />
      )}
      <Heading
        as={'h3'}
        itemProp="name"
        sx={{
          fontSize: [3, 4],
          mt: 2,
          mb: 3,
          overflowWrap: 'anywhere',
          width: '100%',
          display: 'block'
        }}
      >
        {organization.name}
      </Heading>
      <Box
        as="footer"
        sx={{
          mt: 'auto',
          mb: 0,
          width: '100%',
          opacity: 0.875,
          textTransform: 'none'
        }}
      >
        <>
          <Text
            as="span"
            itemProp="location"
            itemScope
            itemType="http://schema.org/Place"
          >
            <span itemProp="address">
              {organization.raw.location.continent}
            </span>
          </Text>
        </>
      </Box>
      <Box sx={{ display: 'none' }}>
        <span itemProp="url">{organization.links.website}</span>
      </Box>
    </Card>
  </Tilt>
)

export default OrganizationCard
