import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { Box, Container, Flex, Link } from 'theme-ui'
import theme from '../lib/theme'
import Icon from './icon'
import Flag from './flag'
import ScrollLock from 'react-scrolllock'
import NextLink from 'next/link'

// Fix: handle undefined bgColor
const rgbaBgColor = (props, opacity) => {
  const bg = props.bgColor || [253, 246, 238]
  return `rgba(${bg[0]},${bg[1]},${bg[2]},${opacity})`
}

const fixed = props =>
  (props.scrolled || props.toggled || props.fixed) &&
  css`
    background-color: ${rgbaBgColor(props, 0.99)};
    border-bottom: 1px solid rgba(48, 48, 48, 0.125);
    @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
      background-color: ${props.transparent
      ? 'transparent'
      : rgbaBgColor(props, 0.92)};
      -webkit-backdrop-filter: saturate(120%) blur(8px);
      backdrop-filter: saturate(120%) blur(8px);
    }
  `

const Root = styled(Box, {
  shouldForwardProp: prop => !['bgColor', 'scrolled', 'toggled'].includes(prop)
})`
  position: fixed;
  top: ${props => (props.scrolled ? '0.5rem' : '1.5rem')};
  left: 50%;
  transform: translateX(-50%)
    scale(${props => (props.scrolled ? 0.97 : 1)});
  width: calc(100vw - 2rem);
  max-width: 1200px;
  z-index: 1000;
  border-radius: 2.75rem;
  box-shadow: 0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10);
  border: 5px solid #e4d6c3;
  background-color: #fdf6ee;
  ${fixed};
  transition:
    top 0.25s cubic-bezier(.68,-0.55,.27,1.55),
    transform 0.25s cubic-bezier(.68,-0.55,.27,1.55),
    background-color 0.2s,
    border-color 0.2s;
  @media print {
    display: none;
  }
  @media (max-width: 600px) {
    top: ${props => (props.scrolled ? '0rem' : '0.5rem')};
    width: calc(100vw - 0.5rem);
    border-radius: 1.25rem;
    border-width: 3px;
  }
`

export const Content = styled(Container)`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  min-height: 4.5rem;
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
  flex: 1 1 0;
  justify-content: center;
  align-items: center;
  a, .nav-btn {
    margin: 0 0.15rem;
    padding: 0.7rem 1.1rem;
    border-radius: 0.8rem;
    font-size: 1.35rem;
    font-weight: 900;
    letter-spacing: 0.01em;
    text-decoration: none;
    background: transparent;
    color: ${({ color, theme, dark, scrolled }) =>
    !dark && (!scrolled && (color === 'white' || !color))
      ? theme.colors.slate || '#334E68'
      : theme.colors[color] || color};
    box-shadow: none;
    transition: 
      color 0.13s cubic-bezier(.68,-0.55,.27,1.55), 
      background 0.13s cubic-bezier(.68,-0.55,.27,1.55),
      transform 0.13s cubic-bezier(.68,-0.55,.27,1.55), 
      box-shadow 0.13s cubic-bezier(.68,-0.55,.27,1.55);
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    &:hover, &:focus {
      background: #f3ede2;
      color: #111;
      transform: translateY(-4px) scale(1.06) rotate(-1.5deg);
      box-shadow: 0 6px 18px 0 #e4d6c355;
      text-shadow: 0 1px 0 #fff7;
      cursor: pointer;
      padding-left: 1.1rem;
      padding-right: 1.1rem;
      padding-top: 0.7rem;
      padding-bottom: 0.7rem;
    }
    svg {
      width: 1.5em;
      height: 1.5em;
      vertical-align: middle;
      filter: none;
    }
    @media (max-width: 900px) {
      padding: 0.6rem 0.7rem;
      font-size: 1.15rem;
    }
    @media (max-width: 600px) {
      margin: 0.25rem 0;
      width: 100%;
      border-radius: 0.5rem;
      padding: 0.7rem 0.5rem;
    }
  }
`

const DropdownMenu = styled(Box)`
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 220px;
  background: #fffbe9;
  border-radius: 1.25rem;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 1.5px 6px rgba(0,0,0,0.08);
  padding: 0.5rem 0;
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  &:before {
    content: '';
    position: absolute;
    top: -0.75rem;
    left: 0;
    width: 100%;
    height: 0.75rem;
    background: transparent;
  }
  z-index: 1001;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  border: 3px solid #e4d6c3;
  font-size: 1.15rem;
  font-weight: 600;
  pointer-events: auto;
`

const DropdownWrapper = styled(Box)`
  position: relative;
  display: inline-block;
  &:hover .dropdown-menu,
  &:focus-within .dropdown-menu {
    display: flex !important;
    pointer-events: auto;
  }
`

// Add global style for dropdown show/hide using class selectors
import { Global } from '@emotion/react'

// Replace dropdown icons with filled chevrons
const DropdownArrow = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="#222" style={{ marginLeft: 4 }}>
    <path d="M5 8l5 5 5-5" stroke="#222" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="#222" />
  </svg>
)

// Example dropdown icons (chunky, rounded, video game style)
const ClubIcon = () => (
  <svg viewBox="0 0 32 32" fill="none">
    <rect x="6" y="10" width="20" height="12" rx="6" fill="#ffe066" stroke="#ff6bcb" strokeWidth="3" />
    <circle cx="16" cy="16" r="4" fill="#ff6bcb" stroke="#ffe066" strokeWidth="2" />
  </svg>
)
const HackathonIcon = () => (
  <svg viewBox="0 0 32 32" fill="none">
    <rect x="7" y="7" width="18" height="18" rx="7" fill="#ff6bcb" stroke="#ffe066" strokeWidth="3" />
    <rect x="13" y="13" width="6" height="6" rx="2" fill="#ffe066" stroke="#ff6bcb" strokeWidth="2" />
  </svg>
)
const CommunityIcon = () => (
  <svg viewBox="0 0 32 32" fill="none">
    <ellipse cx="16" cy="16" rx="10" ry="8" fill="#ffe066" stroke="#ff6bcb" strokeWidth="3" />
    <ellipse cx="16" cy="16" rx="4" ry="3" fill="#ff6bcb" stroke="#ffe066" strokeWidth="2" />
  </svg>
)

const Navigation = props => {
  // Only show social icons if not mobile (isMobile/toggled/aria-hidden)
  const showSocial =
    ((true && !props.toggled && (!props['aria-hidden'] || props['aria-hidden'] === false)) ||
      (true && props.toggled)) || true

  // For mobile: manage open/close state for each dropdown
  const [openMenus, setOpenMenus] = useState({})

  const handleToggleMenu = key => {
    setOpenMenus(m => ({
      ...m,
      [key]: !m[key]
    }))
  }

  // Helper for mobile: render tree menus instead of hover
  const renderDropdown = (label, key, links) => {
    if (props.isMobile) {
      return (
        <Box sx={{ width: '100%', mb: 2 }}>
          <button
            onClick={() => handleToggleMenu(key)}
            aria-expanded={!!openMenus[key]}
            style={{
              background: 'none',
              border: 'none',
              width: '100%',
              textAlign: 'left',
              padding: '0.7rem 1.1rem',
              fontSize: '1.35rem',
              fontWeight: 900,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between', // Changed to spread icon and text
              cursor: 'pointer',
              color: '#334E68',
              borderRadius: '0.5rem',
              background: '#f3ede244' // Light background for buttons
            }}
          >
            {label}
            <Icon
              glyph="down-caret"
              size={18}
              style={{
                transform: openMenus[key] ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s'
              }}
            />
          </button>
          {openMenus[key] && (
            <Box
              sx={{
                pl: 3,
                pb: 2,
                pt: 1,
                mt: 1,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderLeft: '3px solid #e4d6c3',
                ml: 2
              }}
            >
              {links.map(({ href, label }, i) =>
                href.startsWith('http') ? (
                  <Link key={i} href={href} target="_blank" rel="noopener noreferrer"
                    sx={{ py: 1, fontSize:"1rem !important", fontWeight: 700, pl: 2 }}>
                    {label}1
                  </Link>
                ) : (
                  <NextLink key={i} href={href} passHref>
                    <Link sx={{ py: 1, fontSize:"1rem !important", fontWeight: 700, pl: 2 }}>{label}2</Link>
                  </NextLink>
                )
              )}
            </Box>
          )}
        </Box>
      )
    }
    // Desktop: tabbar has caret, submenu does not
    return (
      <DropdownWrapper
        className="dropdown-wrapper"
        // Add onMouseEnter/onMouseLeave to manage open state for submenu
        onMouseEnter={e => {
          const menu = e.currentTarget.querySelector('.dropdown-menu')
          if (menu) menu.style.display = 'flex'
        }}
        onMouseLeave={e => {
          const menu = e.currentTarget.querySelector('.dropdown-menu')
          if (menu) menu.style.display = 'none'
        }}
      >
        <span className="nav-btn">
          {label}
          <Icon glyph="down-caret" size={18} style={{ marginLeft: 4, marginBottom: -2 }} />
        </span>
        <DropdownMenu className="dropdown-menu">
          {/* No caret in submenu items */}
          {links.map(({ href, label }, i) =>
            href.startsWith('http') ? (
              <Link key={i} href={href} target="_blank" rel="noopener noreferrer" sx={{ py: 1, fontWeight: 700, fontSize:"1.25rem !important"  }}>
                {label}
              </Link>
            ) : (
              <NextLink key={i} href={href} passHref>
                <Link sx={{ py: 1, fontWeight: 700,  fontSize:"1.25rem !important" }}>
                  {label}
                </Link>
              </NextLink>
            )
          )}
        </DropdownMenu>
      </DropdownWrapper>
    )
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', flexDirection: props.isMobile ? 'column' : 'row' }}>
        <NavBar
          role="navigation"
          {...props}
          sx={{
            justifyContent: 'center !important',
            width: '100%',
            gap: 0,
            overflowY: 'visible !important',
            flexDirection: props.isMobile ? 'column' : 'row',
            alignItems: props.isMobile ? 'flex-start' : 'center'
          }}
        >
          {renderDropdown('Clubs', 'clubs', [
            { href: '/clubs', label: 'All Clubs' },
            { href: '/clubs/start', label: 'Start a Club' },
            { href: '/clubs/start', label: 'HCB' },
            { href: '/clubs/start', label: 'Fiscal Sponsorship' }
          ])}
          {renderDropdown('Events', 'events', [
            { href: '/hackathons', label: 'All Hackathons' },
            { href: '/hackathons/host', label: 'Host a Hackathon' }
          ])}
          {renderDropdown('Community', 'community', [
            { href: '/slack', label: 'Slack' },
            { href: 'https://scrapbook.hackclub.com/', label: 'Scrapbook' }
          ])}
        </NavBar>
        {showSocial && (
          <Box
            sx={{
              display: ['flex'],
              alignItems: 'center',
              gap: '0.25rem',
              // ml: [0, null, 3],
              mt: props.isMobile ? 0 : 0,
              // flexShrink: 0,
              flexWrap: 'wrap',
              justifyContent: props.isMobile ? 'center' : undefined
            }}
          >
            <Link
              href="https://github.com/hackclub1"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
              aria-label="GitHub"
            >
              <Icon glyph="github" size={28} style={{ color: '#222' }} />
            </Link>
            <Link
              href="https://youtube.com/hackclub"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
              aria-label="YouTube"
            >
              <Icon glyph="youtube" size={28} style={{ color: '#222' }} />
            </Link>
            <Link
              href="https://hackclub.com/slack"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
              aria-label="Slack"
            >
              <Icon glyph="slack" size={28} style={{ color: '#222' }} />
            </Link>
            {props.toggled && (
              // <Box
              //   sx={{
              //     display: 'flex',
              //     alignItems: 'center',
              //     gap: '0.25rem',
              //     mt: 2,
              //     width: '100%',
              //     justifyContent: props.isMobile ? 'center' : undefined,
              //     flexWrap: 'wrap'
              //   }}
              // >
              <>
                <Link
                  href="https://x.com/hackclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
                  aria-label="Twitter"
                >
                  <Icon glyph="twitter" size={28} style={{ color: '#222' }} />
                </Link>
                <Link
                  href="https://instagram.com/hackclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
                  aria-label="Instagram"
                >
                  <Icon glyph="instagram" size={28} style={{ color: '#222' }} />
                </Link>
                <Link
                  href="https://hachyderm.io/@hackclub"
                  target="_blank"
                  rel="me noopener noreferrer"
                  sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
                  aria-label="Mastodon"
                >
                  <Icon glyph="mastodon" size={28} style={{ color: '#222' }} />
                </Link>
                <Link
                  href="mailto:team@hackclub.com"
                  sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
                  aria-label="Email"
                >
                  <Icon glyph="email" size={28} style={{ color: '#222' }} />
                </Link>
               
                <Link
                  href="https://www.figma.com/@hackclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
                  aria-label="Figma"
                >
                  <Icon glyph="figma" size={28} style={{ color: '#222' }} />
                </Link>
                <Link
                  href="https://www.figma.com/@hackclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#222', p: 2, display: 'flex', alignItems: 'center' }}
                  aria-label="YSWS RSS"
                >
                  <Icon glyph="rss" size={28} style={{ color: '#222' }} />
                </Link>
                {/* </Box> */}
              </>
            )}
          </Box>
        )}
      </Box>
    </>
  )
}

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

const HamburgerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 44px;
  min-height: 44px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: auto;
  z-index: 1100;
  @media (min-width: 56em) {
    display: none;
  }
  &:focus {
    outline: 2px solid #ffe066;
  }
`

function Header({ unfixed, color, bgColor, dark, fixed, ...props }) {
  const [scrolled, setScrolled] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [logoWave, setLogoWave] = useState(false)

  const onScroll = () => {
    const newState = window.scrollY >= 16
    setScrolled(newState)
    setLogoWave(window.scrollY > 0)
  }

  const handleToggleMenu = () => {
    setToggled(t => !t)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!unfixed) {
        window.addEventListener('scroll', onScroll)
      }

      const mobileQuery = window.matchMedia('(max-width: 48em)')
      mobileQuery.addEventListener('change', () => {
        setMobile(true)
        setToggled(false)
      })
    }

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [unfixed])

  // Automatically open all mobile menu sections when hamburger is toggled
  // useEffect(() => {
  //   if (mobile && toggled) {
  //     // Show all sections by default on mobile when menu is opened
  //     setOpenMenus({
  //       clubs: true,
  //       hackathons: true,
  //       community: true
  //     });
  //   }
  // }, [toggled, mobile]);

  // Determine tab color for readability at top
  const baseColor = dark
    ? color || 'white'
    : color === 'white' && !scrolled
      ? 'slate'
      : color === 'white' && scrolled
        ? 'black'
        : color
  const toggleColor = dark
    ? color || 'snow'
    : toggled || (color === 'white' && scrolled)
      ? 'slate'
      : color

  return (
    <Root
      {...props}
      fixed={fixed}
      scrolled={scrolled}
      toggled={toggled}
      dark={dark}
      sx={{
        borderRadius: (toggled ? '2.5rem 2.5rem 0rem 0rem' : '2.5rem') + " !important",
      }}
      // bgColor is now ignored for background, so no need to pass it
      as="header"
    >
      <Content>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: '0 0 auto',
            minWidth: '3.5rem',
            transition: 'transform 0.35s cubic-bezier(.68,-0.55,.27,1.55)',
            transform: logoWave
              ? 'rotate(-18deg) translateY(-10%)'
              : 'rotate(0deg) translateY(0)'
          }}
        >
          <Flag scrolled={scrolled || fixed} />
        </Box>
        <Box sx={{ flex: '1 1 0', display: ['none', null, 'flex'], justifyContent: 'center', alignItems: 'center' }}>
          <Navigation
            as="nav"
            aria-hidden={!!mobile}
            color={baseColor}
            dark={dark}
            scrolled={scrolled}
          />
        </Box>
        {/* Hamburger menu for mobile */}
        <HamburgerButton
          aria-label={toggled ? 'Close menu' : 'Open menu'}
          aria-expanded={toggled}
          aria-controls="mobile-nav"
          onClick={() => setToggled(t => !t)}
        >
          <Icon glyph={toggled ? 'view-close' : 'menu'} size={32} />
        </HamburgerButton>
      </Content>
      <Box
        id="mobile-nav"
        sx={{
          display: [toggled ? 'block' : 'none', null, 'none'],
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          bg: 'rgba(253,246,238,0.97)',
          zIndex: 1099,
          transition: 'opacity 0.2s',
          overflowY: 'auto',
          borderRadius: '0 0 2rem 2rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 1.5px 6px rgba(0,0,0,0.08)',
          maxHeight: '80vh', // Limit height to avoid covering entire screen
          border: '5px solid #e4d6c3',
          borderTopWidth: '5px',
          borderTopStyle: 'solid',
          borderTopColor: 'rgb(228, 214, 195)',
          borderTop: 'none',
          paddingLeft: '0.5rem',
          paddingRight: '0.5rem',
          paddingTop: '1rem',
          maxWidth: '1024px',
          width: 'calc(100% + 8px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          left: '-4px',
        }}
      >
        <Box sx={{
          px: 3,
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch', // Changed from center to stretch
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          paddingTop: '0px'
        }}>
          <Navigation
            as="nav"
            isMobile
            toggled={toggled}
            color={baseColor}
            dark={dark}
            scrolled={scrolled}
          />
        </Box>
      </Box>
      {toggled && <ScrollLock />}
    </Root>
  )
}

Header.defaultProps = {
  color: 'white'
}

export default Header
