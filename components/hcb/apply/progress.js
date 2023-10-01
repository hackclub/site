import { useRouter } from 'next/router'
import { Box, Flex, Text } from 'theme-ui'
import FlexCol from '../../flex-col'

function StepIcon({ completed, number }) {
  let strokeColour = completed ? '#33d6a6' : '#8492a6'
  let fillColour = completed ? '#33d6a6' : 'none'

  return (
    <Box sx={{ position: 'relative' }}>
      <svg
        style={{ translate: '0 1px' }}
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
          inset: '0'
        }}
      >
        <Text
          sx={{
            color: 'white',
            fontSize: 2
          }}
        >
          {number}
        </Text>
      </Flex>
    </Box>
  )
}

function Step({ number, label, completed }) {
  return (
    <Flex sx={{ lineHeight: '1', alignItems: 'center', gap: '4' }}>
      <StepIcon completed={completed} number={number + 1} />
      <Text
        sx={{
          fontSize: '3',
          display: ['none', null, null, 'block']
        }}
      >
        {label}
      </Text>
    </Flex>
  )
}

export default function Progress() {
  const router = useRouter()
  const step = parseInt(router.query.step)

  const labels = ['Intro', 'Organization info', 'Personal info']

  return (
    <Flex
      sx={{
        gap: 3,
        translate: [0, null, null, '-1rem 0'],
        flexDirection: ['row', null, null, 'column']
      }}
    >
      {labels.map((label, i) => (
        <Step number={i} label={label} completed={step > i} key={i} />
      ))}
    </Flex>
  )
}
