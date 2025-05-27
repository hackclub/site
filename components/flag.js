import theme from '../lib/theme'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import Link from 'next/link'
import Image from 'next/image'

const waveFlag = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(-5deg);
  }
`

const waveFlagScaled = keyframes`
  from {
    transform: scale(.875) rotate(0deg);
  }
  to {
    transform: scale(.875) rotate(-5deg);
  }
`

const scrolled = props =>
  props.scrolled &&
  css`
    transform: scale(0.875);
    height: 56px;
    &:hover,
    &:focus {
      animation: ${waveFlagScaled} 0.5s linear infinite alternate;
    }
  `

const Base = styled('a')`
  background-repeat: no-repeat;
  background-position: top left;
  background-size: contain;
  cursor: pointer;
  flex-shrink: 0;
  width: 112px;
  height: 48px;
  transition: ${3 / 16}s cubic-bezier(0.375, 0, 0.675, 1) transform;
  transform-origin: top left;
  @media (min-width: ${theme.breakpoints[1]}) {
    width: 172px;
    height: 64px;
  }
  &:hover,
  &:focus {
    animation: ${waveFlag} 0.5s linear infinite alternate;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
  ${scrolled};
`

const Flag = ({ scrolled, alt = 'Hack Club logo', animeFlag = false }) => (
  <Link
    href="/"
    passHref
    sx={{
      alignContent: 'center',
      justifyContent: 'center',
      justifyItems: 'center'
    }}
  >
    <Base
      href="/"
      title="Homepage"
      as="a"
      aria-label={alt}
      sx={{
        lineHeight: 0,
        display: 'inline-block',
        width: ['60px', '72px', '72px'],
        height: ['38px', '44px', '44px'],
        position: 'relative',
        pl: [2, 3],
        pr: 3,
        mt: ['-2px', '-4px'],
        mr: -3
      }}
    >
      <Image
        src={
          animeFlag
            ? '/stickers/hack-club-anime.png'
            : 'https://assets.hackclub.com/flag-orpheus-top.svg'
        }
        alt={alt}
        width={animeFlag ? '140px' : '112px'}
        height={animeFlag ? '60px' : '48px'}
        objectFit="contain"
        style={{ objectFit: 'contain' }}
      />
    </Base>
  </Link>
)

export default Flag
