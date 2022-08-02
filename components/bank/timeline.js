import { Box, Flex, Container, Text, Badge, Link } from 'theme-ui'
import { Slide } from 'react-reveal'
import Icon from '../icon'

function Timeline({ children }) {
  return (
    <Flex
      sx={{ flexDirection: ['column', null, 'row'], justifyContent: 'center' }}
    >
      {children}
    </Flex>
  )
}

function TimelineStep({ children }) {
  return (
    <Flex
      sx={{
        marginX: [4, null, null],
        paddingX: [null, null, 3, 4],
        paddingY: [4, null, 0],
        flexDirection: ['row', null, 'column'],
        alignItems: 'center',
        '&:before': {
          content: '""',
          background: '#3c4858',
          height: ['420px', null, '4px'],
          width: ['4px', null, '48%'],
          marginLeft: [26, null, 0],
          marginTop: [null, null, '34px'],
          position: 'absolute',
          zIndex: -1
        },
        '&:first-of-type:before': {
          top: [0, null, 'auto'],
          width: [0, null, 0],
          left: [0, null, 0]
        },
        '&:last-of-type:before': {
          bottom: [0, null, 'auto'],
          left: [null, null, 0],
          width: [null, null, 0]
        }
      }}
    >
      {children}
    </Flex>
  )
}

function Circle({ children }) {
  return (
    <Box
      style={{
        padding: 12,
        background: 'red',
        color: 'white',
        backgroundImage:
          'radial-gradient(ellipse farthest-corner at top left, #ff8c37, #ec3750)',
        borderRadius: '100%',
        display: 'inline-block',
        lineHeight: 0,
        position: 'relative',
        zIndex: 999
      }}
    >
      {children}
    </Box>
  )
}

function Step({ icon, name, duration, href }) {
  return (
    <TimelineStep pb={4}>
      <Slide left>
        <Circle>
          {href ? (
            <Link href={href} sx={{ cursor: 'pointer' }}>
              <Icon glyph={icon} size={48} color="white" />
            </Link>
          ) : (
            <Icon glyph={icon} size={48} />
          )}
        </Circle>
        <Container
          sx={{
            marginTop: 3,
            display: 'flex',
            justifyContent: ['left', null, 'center'],
            flexDirection: 'column',
            textAlign: ['left', null, 'center']
          }}
        >
          <Badge
            variant="pill"
            sx={{
              bg: 'muted',
              color: 'darker',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              width: 64,
              fontSize: 18,
              px: 2,
              mx: [null, null, 'auto']
            }}
          >
            {duration}
          </Badge>
          <Text
            sx={{ color: 'white', fontSize: 24, maxWidth: [300, null, 550] }}
          >
            {name}
          </Text>
        </Container>
      </Slide>
    </TimelineStep>
  )
}

export default function RealTimeline() {
  return (
    <Timeline px={3}>
      <Step
        icon="send"
        name="Submit an application for your organization"
        duration="Step 1"
        href="/bank/apply"
      />
      <Step
        icon="welcome"
        name="Hop on an intro call with the Bank team"
        duration="Step 2"
      />
      <Step
        icon="post"
        name="Sign the contract &amp; unlock full access"
        duration="Step 3"
      />
      <Step
        icon="friend"
        name="Invite your team &amp; start fundraising"
        duration="Step 4"
        mb={0}
      />
    </Timeline>
  )
}
