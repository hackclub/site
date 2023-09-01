import { Flex, Text, Image, Box, Container } from 'theme-ui'
import Slide from 'react-reveal'

function Step({ stepIndex, label }) {
  return (
    <Flex
      sx={{
        flexDirection: ['row', null, 'column'],
        flex: '1 0 0',
        alignItems: 'center',
        maxWidth: ['24rem', null, '12rem'],
        gap: 3
      }}
    >
      <Image
        src={`/hcb/timeline-steps/step${stepIndex}.svg`}
        sx={{ flexShrink: 0 }}
        alt=""
      />
      <Text
        variant="lead"
        sx={{
          textAlign: ['left', null, 'center'],
          margin: '0px !important'
        }}
      >
        {label}
      </Text>
    </Flex>
  )
}

export default function Timeline() {
  const labels = [
    'Register your organization for HCB',
    'Explore the interface in Playground mode',
    'Hop on an intro call with our team',
    'Start fundraising!'
  ]
  const stepSideLength = 64

  return (
    <Slide>
      <Flex
        sx={{
          flexDirection: ['column', null, 'row'],
          justifyContent: 'space-between',
          gap: 4,
          maxWidth: ['300px', null, '1200px'],
          mx: 'auto',
          position: 'relative'
        }}
      >
        {labels.map((label, idx) => (
          <Step stepIndex={idx + 1} label={label} key={idx} />
        ))}
        <Box
          sx={{
            border: 'solid #8492a6',
            borderWidth: '3px 3px 0 0',
            position: 'absolute',
            top: stepSideLength / 2,
            left: '10%', // TODO: make this dynamic
            right: ['auto', null, '10%'],
            bottom: [stepSideLength / 2, null, 'auto'],
            zIndex: -1
          }}
        />
      </Flex>
    </Slide>
  )
}
