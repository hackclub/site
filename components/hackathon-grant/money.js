// Full credit to https://joshwcomeau.com/react/animated-sparkles-in-react/
import { useState } from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { range, sample, random } from 'lodash'
import { Text } from 'theme-ui'
import theme from '@hackclub/theme'

import useRandomInterval from '../../lib/use-random-interval'
import usePrefersReducedMotion from '../../lib/use-prefers-reduced-motion'

const generateSparkle = color => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 25),
    style: {
      top: random(0, 100) + '%',
      left: random(0, 100) + '%'
    }
  }
  return sparkle
}

const MSparkles = ({
  colors = ['orange', 'yellow', 'green'],
  children,
  sx,
  props,
  ...delegated
}) => {
  const allColors = colors.map(n => theme.colors[n])
  const getColor = () => sample(allColors)
  const [sparkles, setSparkles] = useState(() => {
    return range(3).map(() => generateSparkle(getColor()))
  })
  const prefersReducedMotion = usePrefersReducedMotion()
  useRandomInterval(
    () => {
      const sparkle = generateSparkle(getColor())
      const now = Date.now()
      const nextSparkles = sparkles.filter(sp => {
        const delta = now - sp.createdAt
        return delta < 750
      })
      nextSparkles.push(sparkle)
      setSparkles(nextSparkles)
    },
    prefersReducedMotion ? null : 250,
    prefersReducedMotion ? null : 150
  )

  return (
    <Wrapper {...delegated}>
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <ChildWrapper as="strong" sx={sx} {...props}>
        {children}
      </ChildWrapper>
    </Wrapper>
  )
}

const Sparkle = ({ size, color, style }) => {
  const path =
    'M19.5 70.2785V79H24.5V70.3899C35.6051 69.7535 42.888 63.0947 42.888 52.968C42.888 41.7278 33.4349 38.3652 24.5 35.2749L24.5 12.1167C31.1014 13.1652 35.379 17.659 35.88 24.84H41.448C40.658 14.0439 34.2505 8.14315 24.5 7.21107V0H19.5V7.16625C9.78534 7.95273 3.528 14.0535 3.528 22.824C3.528 32.7125 11.3505 36.299 19.5 39.242L19.5 65.4158C12.0267 64.3658 7.09261 59.6599 6.504 52.008H0.936C1.54878 62.4253 8.70735 69.1706 19.5 70.2785ZM24.5 65.5816C32.4007 65.0218 37.608 60.4767 37.608 53.832C37.608 46.5724 31.5256 43.5962 24.5 41.0237L24.5 65.5816ZM19.5 33.4784L19.5 11.9691C12.999 12.6002 8.904 16.533 8.904 22.152C8.904 28.2897 13.5996 31.1777 19.5 33.4784Z'
  return (
    <SparkleWrapper style={style}>
      <SparkleSvg width={size} height={size} viewBox="0 0 64 64" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d={path} fill={color} />
      </SparkleSvg>
    </SparkleWrapper>
  )
}

const comeInOut = keyframes`
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg)
  }
`
const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`
const SparkleWrapper = styled.span`
  position: absolute;
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${comeInOut} 1000ms forwards;
  }
`
const SparkleSvg = styled.svg`
  display: block;
  @media (prefers-reduced-motion: no-preference) {
    animation: ${spin} 2250ms linear;
  }
`
const ChildWrapper = styled(Text)`
  position: relative;
  z-index: 1;
  font-weight: bold;
`

export default MSparkles
