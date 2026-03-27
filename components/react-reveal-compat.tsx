import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const kFade = keyframes({ from: { opacity: 0 }, to: { opacity: 1 } })
const kFadeLeft = keyframes({
  from: { opacity: 0, transform: 'translateX(-30px)' },
  to: { opacity: 1, transform: 'translateX(0)' }
})
const kFadeRight = keyframes({
  from: { opacity: 0, transform: 'translateX(30px)' },
  to: { opacity: 1, transform: 'translateX(0)' }
})
const kFadeUp = keyframes({
  from: { opacity: 0, transform: 'translateY(30px)' },
  to: { opacity: 1, transform: 'translateY(0)' }
})
const kFadeDown = keyframes({
  from: { opacity: 0, transform: 'translateY(-30px)' },
  to: { opacity: 1, transform: 'translateY(0)' }
})
const kSlideLeft = keyframes({
  from: { opacity: 0, transform: 'translateX(-80px)' },
  to: { opacity: 1, transform: 'translateX(0)' }
})
const kSlideRight = keyframes({
  from: { opacity: 0, transform: 'translateX(80px)' },
  to: { opacity: 1, transform: 'translateX(0)' }
})
const kSlideUp = keyframes({
  from: { opacity: 0, transform: 'translateY(60px)' },
  to: { opacity: 1, transform: 'translateY(0)' }
})
const kSlideDown = keyframes({
  from: { opacity: 0, transform: 'translateY(-60px)' },
  to: { opacity: 1, transform: 'translateY(0)' }
})
const kZoom = keyframes({
  from: { opacity: 0, transform: 'scale(0.85)' },
  to: { opacity: 1, transform: 'scale(1)' }
})

const Wrapper = styled.div<{
  $anim: ReturnType<typeof keyframes>
  $delay: number
  $duration: number
}>`
  animation: ${p => p.$anim} ${p => p.$duration}ms ease-out ${p => p.$delay}ms
    both;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

type RevealProps = {
  children?: React.ReactNode
  left?: boolean
  right?: boolean
  up?: boolean
  down?: boolean
  top?: boolean
  bottom?: boolean
  delay?: number | string
  duration?: number | string
  cascade?: boolean
  style?: React.CSSProperties
  className?: string
}

function RevealWrap({
  children,
  anim,
  delay,
  duration
}: {
  children: React.ReactNode
  anim: ReturnType<typeof keyframes>
  delay: number
  duration: number
}) {
  return (
    <Wrapper $anim={anim} $delay={delay} $duration={duration}>
      {children}
    </Wrapper>
  )
}

export function Fade({
  children,
  left,
  right,
  up,
  down,
  delay = 0,
  duration = 500,
  cascade
}: RevealProps) {
  const anim = left
    ? kFadeLeft
    : right
      ? kFadeRight
      : up
        ? kFadeUp
        : down
          ? kFadeDown
          : kFade
  const d = Number(delay)
  const dur = Number(duration)
  if (cascade) {
    return (
      <>
        {React.Children.map(children, (child, i) => (
          <RevealWrap key={i} anim={anim} delay={d + i * 150} duration={dur}>
            {child}
          </RevealWrap>
        ))}
      </>
    )
  }
  return (
    <RevealWrap anim={anim} delay={d} duration={dur}>
      {children}
    </RevealWrap>
  )
}

export function Slide({
  children,
  left,
  right,
  top,
  up,
  delay = 0,
  duration = 500
}: RevealProps) {
  const anim = left
    ? kSlideLeft
    : right
      ? kSlideRight
      : top
        ? kSlideDown
        : kSlideUp
  return (
    <RevealWrap anim={anim} delay={Number(delay)} duration={Number(duration)}>
      {children}
    </RevealWrap>
  )
}

export function Zoom({ children, delay = 0, duration = 500 }: RevealProps) {
  return (
    <RevealWrap anim={kZoom} delay={Number(delay)} duration={Number(duration)}>
      {children}
    </RevealWrap>
  )
}

export default Fade
