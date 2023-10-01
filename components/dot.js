import { Text } from 'theme-ui'
import { keyframes } from '@emotion/react'

const flashing = keyframes({
  from: { opacity: 0 },
  '50%': { opacity: 1 },
  to: { opacity: 0 }
})

export default function Dot({ hideOnMobile }) {
  return (
    <Text
      sx={{
        bg: 'green',
        color: 'white',
        borderRadius: 'circle',
        display: 'inline-block',
        lineHeight: 0,
        width: '.4em',
        height: '.4em',
        marginRight: '.4em',
        marginBottom: '.12em',
        animationName: `${flashing}`,
        animationDuration: '3s',
        animationTimingFunction: 'ease-in-out',
        animationIterationCount: 'infinite',
        display: hideOnMobile ? ['none', 'default'] : 'default'
      }}
    />
  )
}
