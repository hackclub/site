import theme from '../lib/theme'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

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


const Flag = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoSrc = scrolled
    ? '/branding/hhs-black-wo-black.avif' // sticky: siyah logo
    : '/branding/hhs-white-wo-white.avif'; // en üstte: beyaz logo

  return (
    <Link href="/" passHref>
      <Base
        as="a"
        scrolled={scrolled}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <img src={logoSrc} alt="Happy Hacking Space Flag" style={{ width: '60%', height: 'auto' }} />
      </Base>
    </Link>
  );
}

export default Flag
