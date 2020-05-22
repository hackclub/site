import React from 'react'
import { Box } from 'theme-ui'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/core'

const slideUp = keyframes({
  from: { transform: 'translateY(100%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 }
})

const Wrapper = styled(Box)`
  @media (prefers-reduced-motion: no-preference) {
    animation-name: ${slideUp};
    animation-fill-mode: backwards;
  }
`

const SlideUp = ({ duration = 300, delay = 0, ...props }) => (
  <Wrapper
    {...props}
    style={{
      ...(props.style || {}),
      animationDuration: duration + 'ms',
      animationDelay: delay + 'ms'
    }}
  />
)

export default SlideUp
