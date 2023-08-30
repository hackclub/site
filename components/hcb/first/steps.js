import { Box, Flex, Container, Text, Badge, Link } from 'theme-ui'
import { Slide } from 'react-reveal'
import Icon from '../../icon'

function Timeline({ children }) {
  return (
    <Flex sx={{ flexDirection: 'column', justifyContent: 'center' }}>
      {children}
    </Flex>
  )
}

function TimelineStep({ children }) {
  return (
    <Flex
      sx={{
        marginX: 4,
        paddingY: 4,
        flexDirection: 'row',
        alignItems: 'center',
        '&:before': {
          content: '""',
          background: '#3c4858',
          height: '200px',
          width: '4px',
          marginLeft: 26,
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
      sx={{
        p: 14,
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
    <TimelineStep sx={{ pb: 1 }}>
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
            mt: 0,
            display: 'flex',
            justifyContent: 'left',
            flexDirection: 'column',
            textAlign: 'left'
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
              px: 2
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
    <Timeline sx={{ px: 3 }}>
      <Step
        icon="send"
        name="Open a demo account &amp; explore features"
        duration="Step 1"
      />
      <Step
        icon="rep"
        name="Meet with the HCB team on a call"
        duration="Step 2"
      />
      <Step
        icon="friend"
        name="Start acceping grants &amp; issue debit cards"
        duration="Step 3"
      />
    </Timeline>
  )
}
