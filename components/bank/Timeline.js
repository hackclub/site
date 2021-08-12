import { Box, Flex, Avatar, Text, Badge } from 'theme-ui'
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

function TimelineStep() {
  return (
    <Flex
      sx={{
        paddingX: [null, null, 3, 4],
        flexDirection: ['row', null, 'column'],
        alignItems: 'center'
      }}
    ></Flex>
  )
}

function Circle({ children }) {
  return (
    <Box
      sx={{
        padding: 2,
        background: 'primary',
        color: 'white',
        backgroundImage:
          "radial-gradient(ellipse farthest-corner at top left, 'orange', 'red'",
        borderRadius: 'circle',
        display: 'inline-block',
        lineHeight: 0,
        zIndex: 9999
      }}
    >
      {children}
    </Box>
  )
}

Timeline.Step = ({ icon, name, duration, mb = 4 }) => (
  <TimelineStep pb={mb}>
    <Slide left>
      <Circle mr={[3, null, 0]} mb={[null, null, 4]}>
        <Icon glyph={icon} size={32} />
      </Circle>
      <Box align={['left', null, 'center']}>
        <Badge
          bg="muted"
          color="darker"
          fontSize={[0, 2]}
          mb={[1, 2]}
          children={duration}
        />
        <Text color="white" fontSize={[3, 4]} children={name} />
      </Box>
    </Slide>
  </TimelineStep>
)

export default function Process() {
  return (
    <Timeline px={3}>
      <Timeline.Step
        icon="send"
        name="Sign up, explore, order debit cards"
        duration="Day 1"
      />
      <Timeline.Step
        icon="welcome"
        name="Intro meeting with Hack Club Bank"
        duration="Day 3"
      />
      <Timeline.Step
        icon="post"
        name="Sign the contract & unlock full access"
        duration="Day 4"
      />
      <Timeline.Step
        icon="card"
        name="Receive debit cards in the mail"
        duration="Day 10"
        mb={0}
      />
    </Timeline>
  )
}
