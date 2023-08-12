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
      top: random(-10, 100) + '%',
      left: random(-10, 100) + '%'
    }
  }
  return sparkle
}

const MSparkles = ({
  colors = ['orange', 'yellow', 'green'],
  children,
  sx,
  path,
  viewBox,
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
          path={path}
          viewBox={viewBox}
        />
      ))}
      <ChildWrapper as="strong" sx={sx} {...props}>
        {children}
      </ChildWrapper>
    </Wrapper>
  )
}

const Sparkle = ({ size, color, style, path, viewBox }) => {
  if (!path)
    path =
      'M27 0H18V7.44119C8.56638 8.96454 2.608 15.2023 2.608 24.168C2.608 34.4553 10.2396 38.3636 18 41.2862V60.3901C14.2364 58.7919 11.8724 55.3359 11.536 50.088H0.591999C0.999374 61.0056 7.97574 68.051 18 69.933V80H27V70.2565C37.6237 69.0685 44.656 62.1891 44.656 51.912C44.656 40.3121 35.4657 36.7574 27 33.8641V16.9739C30.363 18.3007 32.5185 21.3983 32.656 26.76H43.312C43.228 15.2519 36.6759 8.81537 27 7.38614V0ZM18 16.871C14.8637 17.9425 13.072 20.2358 13.072 23.304C13.072 26.6134 15.0429 28.7127 18 30.3352V16.871ZM27 44.7132V61.0707C31.4416 60.1212 34.192 57.2657 34.192 53.16C34.192 48.9744 31.1721 46.6064 27 44.7132Z'
  return (
    <SparkleWrapper style={style}>
      <SparkleSvg
        width={size}
        height={size}
        viewBox={viewBox || '0 0 82 82'}
        fill="none"
      >
        <path fillRule="evenodd" clipRule="evenodd" d={path} fill={color} />
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
