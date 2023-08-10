import { Card, Badge, Box, Heading, Text, Image } from 'theme-ui'
import { Organization } from '../../../pages/bank/climate'
import Tilt from '../../../components/tilt'

const badges = {
    "128_collective_funded": () => <></>,
    "128_collective_recommended": () => <></>,
}

const categories = {
    Climate: "#FF0080",

}

const Types = {
    Nonprofit: "#FF0080",
}

const TagRow = ({
    category,
    type,
    badgeNames
}) => {
    return (
        <>
            {badgeNames.map(name => badges[name]).map((Badge, i) => <Badge key={i} />)}
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
  organization,
  showTags = false
}) => (
  <Tilt>
    <Card
      as="a"
      href={organization.links.website}
      target="_blank"
      rel="noopener noreferrer"
      itemScope
      itemType="http://schema.org/Event"
      variant="event"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 128,
        color: 'white',
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
      <Box sx={{
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        mb: 2
      }}>

<Badge
      as="span"
      itemType="VirtualLocation"
      sx={{
        bg: 'snow',
        color: 'blue',
        fontSize: 'inherit',
        textShadow: 'none',
        borderRadius: 5,
        display: 'block'
      }}
    >
      {'Climate'}
    </Badge>
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
            {' '}
            <Text
              as="span"
              itemProp="location"
              itemScope
              itemType="http://schema.org/Place"
            >
                <span itemProp="address">
                  North America
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

export default OrganizationCard;