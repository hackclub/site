import { Box, Flex, Text } from 'theme-ui'
import FlexCol from '../../flex-col'

function StepIcon({ completed = false, number }) {
  let strokeColour = completed ? '#33d6a6' : '#8492a6'
  let fillColour = completed ? '#33d6a6' : 'none'

  return (
    <Box id='11111111111123' sx={{ position: 'relative' }}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20 38C36.5 38 38 36.5 38 20C38 3.5 36.5 2 20 2C3.5 2 2 3.5 2 20C2 36.5 3.5 38 20 38Z"
          stroke={strokeColour}
          fill={fillColour}
          stroke-width="3"
        />
      </svg>
      <Flex
        sx={{
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          inset: '0',
        }}
      >
        <Text
          sx={{
            color: 'white',
            fontSize: 3,
          }}
        >
          { number }
        </Text>
      </Flex>
    </Box>
  )
}

function Step({ number }) {
  const labels = [
    'Intro',
    'Organization info',
    'Personal info'
  ]

  return (
    <Flex sx={{ lineHeight: '1', alignItems: 'center', gap: '4' }}>
      <StepIcon completed number={number + 1} />
      <Text sx={{ fontSize: '3' }}>{ labels[number] }</Text>
    </Flex>
  )
}

export default function Progress({ number }) {
    return (
        <FlexCol gap={3}>
            <Step number={0} />
            <Step number={1} />
            <Step number={2} />
        </FlexCol>
    )
}