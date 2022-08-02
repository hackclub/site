import Ticker from 'react-ticker'
import {
  Avatar,
  Box,
  Card,
  Message,
  Text,
  Heading,
  Badge,
  Image
} from 'theme-ui'
// import Image from 'next/image'
import Tilt from '../tilt'
import { humanizedDateRange, formatAddress } from '../../lib/helpers'

export default function ScrollingHackathons({ eventData }) {
  return (
    <>
      <Heading
        variant="layout.container"
        sx={{
          fontSize: [36, 48],
          mb: 4,
          color: 'black'
        }}
      >
        Upcoming high school hackathons...
      </Heading>
      <Ticker mode="string">
        {() => (
          <Box as="div" sx={{ display: 'flex', py: 3 }}>
            {eventData.map(({ ...props }) => (
              <EventCard key={eventData.id} {...props} />
            ))}
          </Box>
        )}
      </Ticker>
    </>
  )
}

function EventCard({
  id,
  name,
  website,
  start,
  end,
  city,
  state,
  country,
  countryCode,
  mlhAssociated,
  banner,
  logo,
  virtual,
  hybrid,
  footer
}) {
  return (
    <Tilt>
      <Card
        as="a"
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        itemScope
        itemType="http://schema.org/Event"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          px: 4,
          mx: 4,
          borderRadius: 'extra',
          width: '400px',
          height: '200px',
          textDecoration: 'none',
          color: 'white'
        }}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.375) 75%), url('${banner}')`,
          textAlign: 'center'
        }}
      >
        {mlhAssociated && (
          <Image
            src="/mlh-logo-grayscale.svg"
            alt="MLH is associated"
            width={64}
            sx={{
              position: 'absolute',
              top: 16,
              left: 0,
              bg: 'snow',
              p: 2,
              borderTopRightRadius: 'default',
              borderBottomRightRadius: 'default'
            }}
          />
        )}

        <Badge
          as="span"
          itemType="VirtualLocation"
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            bg: 'snow',
            color: virtual ? 'red' : hybrid ? 'orange' : 'blue',
            fontSize: 'inherit',
            textShadow: 'none',
            borderRadius: 5
          }}
        >
          {virtual ? 'Online' : hybrid ? 'Hybrid' : 'In-Person'}
        </Badge>

        {logo && (
          <Image
            src={logo}
            alt={`${name} logo`}
            loading="lazy"
            sx={{
              minWidth: 64,
              height: 64,
              objectFit: 'contain',
              borderRadius: 'default',
              mt: 'auto'
            }}
          />
        )}

        <Heading
          variant="headline"
          as="h3"
          itemProp="name"
          sx={{
            fontSize: [3, 4],
            mt: 2,
            mb: 3,
            overflowWrap: 'anywhere',
            width: '100%',
            color: 'white',
            textDecoration: 'none'
          }}
        >
          {name}
        </Heading>
        <Box
          as="footer"
          sx={{
            mt: 'auto',
            mb: 0,
            width: '100%',
            opacity: 0.875
          }}
        >
          {footer ? (
            footer
          ) : (
            <>
              {' '}
              <Text as="span">{humanizedDateRange(start, end)}</Text>
              <Text
                as="span"
                itemProp="location"
                itemScope
                itemType="http://schema.org/Place"
              >
                {!virtual && (
                  <span itemProp="address">
                    {': '}
                    {formatAddress(city, state, country, countryCode)}
                  </span>
                )}
              </Text>
            </>
          )}
        </Box>
        <Box sx={{ display: 'none' }}>
          <span itemProp="eventAttendanceMode">
            {virtual
              ? 'https://schema.org/OnlineEventAttendanceMode'
              : 'https://schema.org/OfflineEventAttendanceMode'}
          </span>
          <span itemProp="url">{website}</span>
          <span itemProp="startDate" content={start}>
            {start}
          </span>
          <span itemProp="endDate" content={end}>
            {end}
          </span>
        </Box>
      </Card>
    </Tilt>
  )
}
