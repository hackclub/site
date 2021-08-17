import { Box, Flex, Avatar, Container, Text, Badge } from 'theme-ui'
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
        paddingX: [null, null, 3, 4],
        paddingY: [4, null, 0],
        flexDirection: ['row', null, 'column'],
        alignItems: 'center',
        '&:before': {
          content: '""',
          background: '#3c4858',
          height: ['100%', null, '4px'],
          width: ['4px', null, '100%'],
          marginLeft: [26, null, 0],
          marginTop: [null, null, '34px'],
          position: 'absolute',
          zIndex: -1
        },
        '&:first-of-type:before': {
          top: ['50%', null, 'auto'],
          width: [0, null, '50%'],
          left: [0, null, '50%']
        },
        '&:last-of-type:before': {
          bottom: ['50%', null, 'auto'],
          left: [null, null, 0],
          width: [null, null, '50%']
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
        zIndex: 9999
      }}
    >
      {children}
    </Box>
  )
}

function Step({ icon, name, duration }) {
  return (
    <TimelineStep pb={4}>
      <Slide left>
        <Circle mr={[3, null, 0]} mb={[null, null, 4]}>
          <Icon glyph={icon} size={48} />
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
            children={duration}
          />
          <Text
            sx={{ color: 'white', fontSize: 24, maxWidth: [200, null, 300] }}
            children={name}
          />
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
        name="Sign up, explore, order debit cards"
        duration="Day 1"
      />
      <Step
        icon="welcome"
        name="Intro meeting with Hack Club Bank"
        duration="Day 3"
      />
      <Step
        icon="post"
        name="Sign the contract &amp; unlock full access"
        duration="Day 4"
      />
      <Step
        icon="card"
        name="Receive debit cards in the mail"
        duration="Day 10"
        mb={0}
      />
    </Timeline>
  )
}
