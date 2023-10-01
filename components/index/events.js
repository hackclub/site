import { Box, Text, Grid, Badge, Flex, Avatar, Heading } from 'theme-ui'
import tt from 'tinytime'
import Link from 'next/link'
import { keyframes } from '@emotion/react'

const past = dt => new Date(dt) < new Date()
const now = (start, end) =>
  new Date() > new Date(start) && new Date() < new Date(end)

const Event = ({ id, slug, title, desc, leader, avatar, start, end, cal }) => (
  <Link
    href={`https://events.hackclub.com/${slug}`}
    as={`https://events.hackclub.com/${slug}`}
    passHref
    target="_blank"
    rel="noopener"
  >
    <Box
      as="a"
      sx={{
        position: 'relative',
        textDecoration: 'none',
        bg: 'elevated',
        color: 'text',
        p: [3, 3]
      }}
    >
      <Box
        sx={{
          bg: past(end) ? 'sunken' : 'primary',
          color: past(end) ? 'text' : 'white',
          lineHeight: ['subheading', 'body'],
          m: -3,
          py: 2,
          px: 3,
          mb: 3,
          strong: { display: ['block', 'inline'] }
        }}
      >
        <Text>
          <strong>{tt('{MM} {Do}').render(new Date(start))}</strong>{' '}
          {tt('{h}:{mm}').render(new Date(start))}–
          {tt('{h}:{mm} {a}').render(new Date(end))}
        </Text>
      </Box>
      <Heading variant="subheadline" sx={{ mt: 0, mb: 1 }}>
        {title}
      </Heading>
      <Flex
        sx={{
          alignItems: 'center',
          color: 'muted'
        }}
      >
        {now(start, end)}
        {!avatar.includes('emoji') && (
          <Avatar
            src={avatar}
            alt={`${leader} profile picture`}
            size={24}
            sx={{ height: 24, mr: 2 }}
          />
        )}
        <Text as="span">{leader}</Text>
      </Flex>
      {/* {now(start, end) && (
        <Sparkles
          aria-hidden
          style={{
            pointerEvents: 'none',
            position: 'absolute !important',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        />
      )} */}
    </Box>
  </Link>
)

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

export default function Events({ events }) {
  return (
    <Box mb={3}>
      <Grid
        mt={3}
        mb={2}
        columns={[2, 3]}
        gap="1px"
        sx={{
          bg: 'sunken',
          borderRadius: 'extra',
          overflow: 'hidden',
          boxShadow: 'elevated'
        }}
      >
        {events
          .slice(0, 3)
          .map(event =>
            !past(event.end) ? <Event {...event} key={event.id} /> : <></>
          )}
      </Grid>
    </Box>
  )
}
