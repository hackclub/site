import { Box, Flex, Container, Text, Badge, Link } from 'theme-ui'
import { Slide } from 'react-reveal'
import Icon from '../icon'

function TimelineStep({ children }) {
  return (
    <Flex
      sx={{
        paddingY: 4,
        flexDirection: 'row',
        alignItems: 'center',
        '&:before': {
          content: '""',
          background: 'snow',
          height: ['420px', '320px', '320px'],
          width: '4px',
          marginLeft: 36,
          position: 'absolute',
          zIndex: 0
        },
        '&:first-of-type:before': {
          top: [0, null, 'auto'],
          width: [0, null, 0],
          left: [0, null, 0]
        },
        '&:last-of-type:before': {
          bottom: [0, null, 'auto'],
          left: [0, null, 0],
          width: [0, null, 0]
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
          'radial-gradient(ellipse farthest-corner at top left, #5bc0de, #338eda)',
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
            <Link href={href} sx={{ cursor: 'pointer', zIndex: 999 }}>
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
              bg: 'smoke',
              color: 'darker',
              fontWeight: 'normal',
              textTransform: 'uppercase',
              width: 'fit-content',
              fontSize: 18,
              px: 3
            }}
          >
            {duration}
          </Badge>
          <Text
            sx={{
              color: 'white',
              fontSize: [2, 3],
              maxWidth: [300, null, 550]
            }}
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
    <Flex sx={{ flexDirection: 'column', justifyContent: 'center', pb: 4 }}>
      <Step
        icon="post"
        name={
          <>
            RSVPs are closed. Have a question? Here are the{' '}
            <Link
              target="_blank"
              sx={{ color: 'inherit' }}
              href="https://github.com/hackclub/winter/blob/main/docs/faq.md"
            >
              FAQs
            </Link>
            .
          </>
        }
        duration="RSVP"
      />
      <Step
        icon="send"
        name="Deadline for hardware plans submission (Jan 15) has arrived, we are no longer accepting new projects."
        duration="Share your plan"
      />
      <Step
        icon="slack"
        name="From Feb 14-23, join a 10 days building in public challenge where you share daily updates of your hardware project."
        duration="Build"
      />
    </Flex>
  )
}
