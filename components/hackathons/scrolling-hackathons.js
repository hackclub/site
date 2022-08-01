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
      <Ticker>
        {() => (
          <Box as="div" sx={{ display: 'flex' }}>
            {eventData.map(({ ...props }) => (
              <EventCard key={eventData.key} {...props} />
            ))}
          </Box>
        )}
      </Ticker>
    </>
  )
}

function EventCard({
  //   name,
  //   website,
  //   start,
  //   end,
  //   logo,
  //   banner,
  //   city,
  //   state,
  //   virtual,
  //   hybrid

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
  hq = false,
  footer,
  lead,
  // distanceTo,
  invisible = false
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
        variant="event"
        sx={{
          display: invisible ? 'none' : 'flex',
          px: 4,
          mx: 4,
          borderRadius: 'extra',
          width: '500px'
        }}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,0.375) 75%), url('${banner}')`,
          textAlign: hq ? 'left' : 'center'
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
        {lead && (
          <Box
            sx={{
              mb: hq ? 0 : 'auto',
              mt: hq ? 2 : 0,
              width: '100%',
              opacity: 1,
              fontWeight: 800,
              fontSize: 2
            }}
          >
            <Text>{lead}</Text>
          </Box>
        )}
        <Heading
          as={'h3'}
          itemProp="name"
          sx={{
            fontSize: hq ? [4, 6] : [3, 4],
            mt: hq ? 0 : 2,
            mb: hq ? 0 : 3,
            overflowWrap: 'anywhere',
            width: '100%'
          }}
        >
          {name}
        </Heading>
        <Box
          as="footer"
          sx={{
            mt: hq ? 0 : 'auto',
            mb: hq ? 2 : 0,
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
              {/* distanceTo ? (
        <Text as="span">{`${humanizeDistance(distanceTo)} miles`}</Text>
      ) : ( */}
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
