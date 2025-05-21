import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { Box, Container, Flex, Link } from 'theme-ui'
import theme from '../lib/theme'
import Icon from './icon'
import Flag from './flag'
import ScrollLock from 'react-scrolllock'
import NextLink from 'next/link'

const rgbaBgColor = (props, opacity) =>
  `rgba(
    ${props.bgColor[0]},
    ${props.bgColor[1]},
    ${props.bgColor[2]},
    ${opacity}
  )`

// const bg = (props) =>
//   props.dark
//     ? css`
//         -webkit-backdrop-filter: saturate(90%) blur(20px);
//         backdrop-filter: saturate(90%) blur(20px);
//       `
//     : css`
//         -webkit-backdrop-filter: saturate(180%) blur(20px);
//         backdrop-filter: saturate(180%) blur(20px);
//       `

const fixed = props =>
  (props.scrolled || props.toggled) &&
  css`
    background-color: ${rgbaBgColor({ bgColor: props.bgColor }, 1)};
    border-bottom: 1px solid rgba(48, 48, 48, 0.125);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: transparent;
      -webkit-backdrop-filter: saturate(180%) blur(20px);
      backdrop-filter: saturate(180%) blur(20px);
    }
  `

const Root = styled(Box, {
  shouldForwardProp: prop => !['bgColor', 'scrolled', 'toggled'].includes(prop)
})`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
  ${fixed};
  @media print {
    display: none;
  }
`

export const Content = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
`

const hoverColor = name =>
  ({
    white: 'smoke',
    smoke: 'muted',
    muted: 'slate',
    slate: 'black',
    black: 'slate',
    primary: 'error'
  })[name] || 'black'

const slide = keyframes({
  from: { transform: 'translateY(-25%)', opacity: 0 },
  to: { transform: 'translateY(0)', opacity: 1 }
})

const layout = props =>
  props.isMobile
    ? css`
        display: ${props.toggled ? 'flex' : 'none'};
        flex-direction: column;
        overflow-y: auto;
        text-align: left;
        height: 100vh;
        @media (prefers-reduced-motion: no-preference) {
          animation: ${slide} 0.25s ease-in;
        }
        a {
          color: ${theme.colors[props.dark ? 'white' : 'black']} !important;
          margin: 0 auto;
          height: 64px;
          font-weight: bold;
          font-size: ${theme.fontSizes[2]}px;
          width: 100vw;
          &:not(:last-child) {
            border-bottom: 1px solid rgba(48, 48, 48, 0.125);
          }
          @media screen and (max-width: 22em) {
            max-width: 16rem;
          }
        }
      `
    : css`
        @media (min-width: 56em) {
          display: flex;
          justify-content: flex-end;
        }
        a {
          font-size: 18px;
          &:hover {
            color: ${theme.colors[hoverColor(props.color)]};
          }
        }
      `
const NavBar = styled(Box, {
  shouldForwardProp: prop => !['isMobile', 'toggled'].includes(prop)
})`
  display: none;
  ${layout};
  a {
    margin-left: ${theme.space[1]}px;
    padding: ${theme.space[3]}px;
    text-decoration: none;
    @media (min-width: 56em) {
      color: ${props =>
    props.color && theme.colors[props.color]
      ? theme.colors[props.color]
      : props.color};
    }
  }
`

const Navigation = props => (
  // REMINDER: This should be no more than 7 links :)
  <NavBar role="navigation" {...props}>
    <NextLink href="/clubs" passHref legacyBehavior>
      <Link>Clubs</Link>
    </NextLink>
    <NextLink href="/fiscal-sponsorship" passHref legacyBehavior>
      <Link>Fiscal&nbsp;Sponsorship</Link>
    </NextLink>
    <NextLink href="/hackathons" passHref legacyBehavior>
      <Link>Hackathons</Link>
    </NextLink>
    <Link href="/slack">Community</Link>
    <Link href="https://scrapbook.hackclub.com/">Scrapbook</Link>
    <NextLink href="https://toolbox.hackclub.com/" passHref legacyBehavior>
      <Link>Toolbox</Link>
    </NextLink>
  </NavBar>
)

const ToggleContainer = styled(Flex)`
  align-items: center;
  justify-content: center;
  min-width: 64px;
  min-height: 44px;
  cursor: pointer;
  user-select: none;
  margin-left: auto;
  @media (min-width: 56em) {
    display: none;
  }
`

function Header({ unfixed, color, bgColor, dark, fixed, ...props }) {
  const [scrolled, setScrolled] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [mobile, setMobile] = useState(false)

  const onScroll = () => {
    const newState = window.scrollY >= 16
    setScrolled(newState)
  }

  const handleToggleMenu = () => {
    setToggled(t => !t)
  }

  useEffect(() => {
    let mobileQuery
    let handleMobileChange

    if (typeof window !== 'undefined') {
      if (!unfixed) {
        window.addEventListener('scroll', onScroll)
      }

      mobileQuery = window.matchMedia('(max-width: 48em)')
      setMobile(mobileQuery.matches)

      handleMobileChange = e => {
        setMobile(e.matches)
        if (!e.matches) {
          setToggled(false)
        }
      }
      mobileQuery.addEventListener('change', handleMobileChange)
    }

    return () => {
      if (typeof window !== 'undefined') {
        if (!unfixed) {
          window.removeEventListener('scroll', onScroll)
        }
        if (mobileQuery && handleMobileChange) {
          mobileQuery.removeEventListener('change', handleMobileChange)
        }
      }
    }
  }, [unfixed])

  const baseColor = dark
    ? color || 'white'
    : color === 'white' && scrolled
      ? 'black'
      : color
  const toggleColor = dark
    ? color || 'snow'
    : toggled || (color === 'white' && scrolled)
      ? 'slate'
      : color

  const effectiveBgColor = bgColor || (dark ? [32, 34, 36] : [255, 255, 255])

  return (
    <Root
      {...props}
      scrolled={scrolled}
      toggled={toggled}
      dark={dark}
      bgColor={effectiveBgColor}
      sx={{
        '--scrolled': scrolled ? 1 : 0,
        '--toggled': toggled ? 1 : 0,
        '--dark': dark ? 1 : 0
      }}
      as="header"
    >
      <Content>
        <Flag scrolled={scrolled || fixed} />
        <Navigation
          as="nav"
          aria-hidden={!!mobile}
          color={baseColor}
          dark={dark}
        />
        <ToggleContainer color={toggleColor} onClick={handleToggleMenu}>
          <Icon glyph={toggled ? 'view-close' : 'menu'} />
        </ToggleContainer>
      </Content>
      <Navigation
        as="nav"
        isMobile
        toggled={toggled && mobile}
        aria-hidden={!mobile || !toggled}
        color={baseColor}
        dark={dark}
      />
      {toggled && mobile && <ScrollLock />}
    </Root>
  )
}

Header.defaultProps = {
  color: 'white'
}

export default Header