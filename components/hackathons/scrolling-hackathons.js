import Ticker from 'react-ticker'
import {
  Box,
  Card,
  Text,
  Heading,
  Badge,
  Container,
  Image,
  Link
} from 'theme-ui'
import { useState } from 'react'
import { keyframes } from '@emotion/react'
import Tilt from '../tilt'
import NextLink from 'next/link'
import PageVisibility from 'react-page-visibility'
import { formatAddress } from '../../lib/helpers'

export default function ScrollingHackathons({
  eventData,
  mode,
  title,
  ...props
}) {
  const [pageIsVisible, setPageIsVisible] = useState(true)
  const handleVisibilityChange = isVisible => {
    setPageIsVisible(isVisible)
  }

  return (
    <>
      {title ? (
        <Container>
          <Heading
            sx={{
              fontSize: [36, 64],
              color: 'black',
              textAlign: 'center',
              maxWidth: ['95vw', '66vw'],
              margin: 'auto',
              mt: 4
            }}
          >
            Join other high-schoolers at an upcoming hackathon.
          </Heading>
          <Box
            sx={{
              maxWidth: ['95vw', '66vw'],
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              mb: 2
            }}
          >
            <Text sx={{ display: ['none', 'flex'], alignItems: 'center' }}>
              <Dot />
            </Text>
            <Text
              variant="lead"
              sx={{ color: 'muted', mr: 2, textAlign: 'center' }}
            >
              from{' '}
              <NextLink href="https://hackathons.hackclub.com" passHref>
                <Link sx={{ color: 'currentcolor' }}>
                  hackathons.hackclub.com
                </Link>
              </NextLink>
              , last updated just now.
            </Text>
          </Box>
        </Container>
      ) : (
        <></>
      )}
      <PageVisibility onChange={handleVisibilityChange}>
        {pageIsVisible && (
          <Ticker mode={mode || 'string'} {...props}>
            {() => (
              <Box as="div" sx={{ display: 'flex', py: 3 }}>
                {eventData.map(({ ...props }) => (
                  <EventCard key={eventData.id} {...props} />
                ))}
              </Box>
            )}
          </Ticker>
        )}
      </PageVisibility>
    </>
  )
}

const flashing = keyframes({
  from: { opacity: 0 },
  '50%': { opacity: 1 },
  to: { opacity: 0 }
})

function Dot() {
  return (
    <Text
      sx={{
        bg: 'green',
        color: 'white',
        borderRadius: 'circle',
        display: 'inline-block',
        lineHeight: 0,
        width: '.5em',
        height: '.5em',
        marginRight: '.4em',
        marginBottom: '.12em',
        animationName: `${flashing}`,
        animationDuration: '3s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite'
      }}
    />
  )
}

function EventCard({
  name,
  website,
  start,
  end,
  city,
  state,
  country,
  countryCode,
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
          textAlign: 'center',
          backgroundSize: 'cover'
        }}
      >
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
              <Text
                as="span"
                itemProp="location"
                itemScope
                itemType="http://schema.org/Place"
              >
                {!virtual && (
                  <span itemProp="address">
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
