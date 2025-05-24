import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { css, keyframes } from '@emotion/react'
import { Box, Container, Flex, Link, useColorMode } from 'theme-ui'
import theme from '../lib/theme'
import Icon from './icon'
import Flag from './flag'
import ScrollLock from 'react-scrolllock'
import NextLink from 'next/link'

const rgbaBgColor = (props, opacity) => {
  const bg = props => props.dark ? '#222' :  [253, 246, 238]
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
  box-shadow: ${props => props.dark 
    ? '0 12px 40px rgba(0,0,0,0.4), 0 2px 8px rgba(0,0,0,0.3)' 
    : '0 12px 40px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)'};
  border: 5px solid ${props => props.dark ? '#555' : '#e4d6c3'};
  background-color: ${props => props.dark ? '#222' : '#fdf6ee'};
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
      background: ${props => props.dark ? '#444' : '#f3ede2'};
      color: ${props => props.dark ? 'white' : '#111'};
      transform: translateY(-4px) scale(1.06) rotate(-1.5deg);
      box-shadow: ${props => props.dark 
        ? '0 6px 18px 0 rgba(0,0,0,0.3)' 
        : '0 6px 18px 0 #e4d6c355'};
      text-shadow: ${props => props.dark ? 'none' : '0 1px 0 #fff7'};
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
  background: ${props => props.theme.isDark ? '#333' : '#fffbe9'};
  border-radius: 1.25rem;
  box-shadow: ${props => props.theme.isDark 
    ? '0 8px 32px rgba(0,0,0,0.4), 0 1.5px 6px rgba(0,0,0,0.3)'
    : '0 8px 32px rgba(0,0,0,0.12), 0 1.5px 6px rgba(0,0,0,0.08)'};
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
  border: 3px solid ${props => props.theme.isDark ? '#555' : '#e4d6c3'};
  font-size: 1.15rem;
  font-weight: 600;
  pointer-events: auto;
  
  a {
    color: ${props => props.theme.isDark ? '#eee !important' : 'inherit !important'};
    width: 100%;
    padding: 0.75rem 1rem !important;
    transition: background 0.15s ease-in-out, color 0.15s ease-in-out;
    border-radius: 0;
    margin: 0 !important;
    
    &:hover, &:focus {
      background: ${props => props.theme.isDark ? '#444 !important' : '#f3ede2 !important'};
      color: ${props => props.theme.isDark ? 'white !important' : '#111 !important'};
      box-shadow: none !important;
      text-shadow: none !important;
    }
  }
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

const Navigation = props => {
  const showSocial =
    true

  const [openMenus, setOpenMenus] = useState({})
  const [colorMode, setColorMode] = useColorMode()
  const [systemPreference, setSystemPreference] = useState('light')

  useEffect(() => {
    const checkSystemPreference = () => {
      if (typeof window !== 'undefined' && window.matchMedia) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
        setSystemPreference(isDarkMode ? 'dark' : 'light')
      }
    }
    
    checkSystemPreference()
    
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', checkSystemPreference)
      return () => mediaQuery.removeEventListener('change', checkSystemPreference)
    }
  }, [])

  const handleToggleMenu = key => {
    setOpenMenus(m => ({
      ...m,
      [key]: !m[key]
    }))
  }

  const cycleColorMode = () => {
    const nextMode = colorMode === 'dark' ? 'light' : 'dark'
    setColorMode(nextMode)
  }

  const actualColorMode = colorMode === 'system' ? systemPreference : colorMode
  const isDarkMode = actualColorMode === 'dark'

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
              justifyContent: 'space-between',
              cursor: 'pointer',
              color: isDarkMode ? '#fff' : '#334E68',
              borderRadius: '0.5rem',
              background: isDarkMode ? 'rgba(255,255,255,0.1)' : '#f3ede244'
            }}
          >
            {label}
            <Icon
              glyph="down-caret"
              size={18}
              style={{
                transform: openMenus[key] ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
                color: isDarkMode ? '#fff' : 'inherit'
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
                borderLeft: isDarkMode ? '3px solid #555' : '3px solid #e4d6c3',
                ml: 2
              }}
            >
              {links.map(({ href, label }, i) =>
                href.startsWith('http') ? (
                  <Link key={i} href={href} target="_blank" rel="noopener noreferrer"
                    sx={{ 
                      py: 1, 
                      fontSize: "1rem !important", 
                      fontWeight: 700, 
                      pl: 2,
                      color: isDarkMode ? '#ddd !important' : 'inherit',
                      '&:hover, &:focus': {
                        background: isDarkMode ? '#444 !important' : '#f3ede2 !important',
                        color: isDarkMode ? 'white !important' : '#111 !important',
                        borderRadius: '50%'
                      }
                    }}>
                    {label}
                  </Link>
                ) : (
                  <NextLink key={i} href={href} passHref>
                    <Link sx={{ 
                      py: 1, 
                      fontSize: "1rem !important", 
                      fontWeight: 700, 
                      pl: 2,
                      color: isDarkMode ? '#ddd !important' : 'inherit',
                      '&:hover, &:focus': {
                        background: isDarkMode ? '#444 !important' : '#f3ede2 !important',
                        color: isDarkMode ? 'white !important' : '#111 !important',
                        borderRadius: '50%'
                      }
                    }}>{label}</Link>
                  </NextLink>
                )
              )}
            </Box>
          )}
        </Box>
      )
    }
    return (
      <DropdownWrapper
        className="dropdown-wrapper"
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
          <Icon 
            glyph="down-caret" 
            size={18} 
            style={{ 
              marginLeft: 4, 
              marginBottom: -2,
              color: isDarkMode ? '#fff' : 'inherit'
            }} 
          />
        </span>
        <DropdownMenu className="dropdown-menu" theme={{ isDark: isDarkMode }}>
          {links.map(({ href, label }, i) =>
            href.startsWith('http') ? (
              <Link 
                key={i} 
                href={href} 
                target="_blank" 
                rel="noopener noreferrer" 
                sx={{ 
                  py: 1, 
                  fontWeight: 700, 
                  fontSize: "1.25rem !important" 
                }}
              >
                {label}
              </Link>
            ) : (
              <NextLink key={i} href={href} passHref>
                <Link sx={{ 
                  py: 1, 
                  fontWeight: 700, 
                  fontSize: "1.25rem !important" 
                }}>
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', flexDirection: props.isMobile ? 'column' : 'row' }}>
        <NavBar
          role="navigation"
          {...props}
          dark={isDarkMode}
          sx={{
            justifyContent: 'center !important',
            width: '100%',
            gap: 0,
            overflowY: 'visible !important',
            flexDirection: props.isMobile ? 'column' : 'row',
            alignItems: props.isMobile ? 'flex-start' : 'center',
            mb: props.isMobile ? [6, 6, 2] : 0,
            a: {
              color: isDarkMode ? 'white !important' : undefined,
            },
            '.nav-btn': {
              color: isDarkMode ? 'white !important' : undefined,
            },
            button: {
              color: isDarkMode ? 'white' : undefined,
              background: isDarkMode ? 'rgba(255,255,255,0.1)' : '#f3ede244',
            }
          }}
        >
          {renderDropdown('Clubs', 'clubs', [
            { href: 'https://directory.hackclub.com', label: 'Directory' },
            { href: 'https://apply.hackclub.com', label: 'Start a Club' },
            { href: 'https://toolbox.hackclub.com', label: 'Toolbox' },
            { href: '/fiscal-sponsorship', label: 'Fiscal Sponsorship' }
          ])}
          {renderDropdown('About', 'about', [
            { href: '/philosophy', label: 'Philosophy' },
            { href: '/team', label: 'Our Team & Board' },
            { href: '/jobs', label: 'Jobs' },
            { href: '/philanthropy', label: 'Donate' }
          ])}
          {renderDropdown('Events', 'events', [
            { href: 'https://events.hackclub.com/', label: 'Online Events' },
            { href: 'https://hackathons.hackclub.com', label: 'Hackathons' },
            { href: 'https://jams.hackclub.com', label: 'Jams' },
            { href: '/hackathons', label: 'Host a Hackathon' }
          ])}
          {renderDropdown('Community', 'community', [
            { href: '/slack', label: 'Slack' },
            { href: '/conduct', label: 'Code of Conduct' },
            { href: 'https://scrapbook.hackclub.com/', label: 'Scrapbook' }
          ])}
        </NavBar>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.2rem',
            mt: props.isMobile ? 0 : 0,
            flexWrap: 'wrap',
            justifyContent: props.isMobile ? 'center' : undefined
          }}
        >
        
          
          {showSocial && (
            <>
              <Link
                href="https://github.com/hackclub"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: isDarkMode ? '#fff' : '#222', 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
                aria-label="GitHub"
              >
                <Icon glyph="github" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
              </Link>
              <Link
                href="https://youtube.com/hackclub"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ 
                  color: isDarkMode ? '#fff' : '#222', 
                  p: 2, 
                  display: 'flex', 
                  alignItems: 'center' 
                }}
                aria-label="YouTube"
              >
                <Icon glyph="youtube" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
              </Link>
              <Link
                href="/slack"
                sx={{ 
                  color: isDarkMode ? '#fff' : '#222', 
                  p: 2, 
                  display: ['flex', 'flex', 'flex'], 
                  alignItems: 'center' 
                }}
                aria-label="Slack"
              >
                <Icon glyph="slack" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
              </Link>
              
              {(props.toggled || props.isMobile) && (
                <>
                  <Link
                    href="https://x.com/hackclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: isDarkMode ? '#fff' : '#222', p: 2, display: 'flex', alignItems: 'center' }}
                    aria-label="Twitter"
                  >
                    <Icon glyph="twitter" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
                  </Link>
                  <Link
                    href="https://instagram.com/starthackclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: isDarkMode ? '#fff' : '#222', p: 2, display: 'flex', alignItems: 'center' }}
                    aria-label="Instagram"
                  >
                    <Icon glyph="instagram" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
                  </Link>
                  <Link
                    href="https://social.dino.icu/@hackclub"
                    target="_blank"
                    rel="me noopener noreferrer"
                    sx={{ color: isDarkMode ? '#fff' : '#222', p: 2, display: 'flex', alignItems: 'center' }}
                    aria-label="Mastodon"
                  >
                    <Icon glyph="mastodon" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
                  </Link>
                  <Link
                    href="mailto:team@hackclub.com"
                    sx={{ color: isDarkMode ? '#fff' : '#222', p: 2, display: 'flex', alignItems: 'center' }}
                    aria-label="Email"
                  >
                    <Icon glyph="email" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
                  </Link>

                  <Link
                    href="https://www.figma.com/@hackclub"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: isDarkMode ? '#fff' : '#222', p: 2, display: 'flex', alignItems: 'center' }}
                    aria-label="Figma"
                  >
                    <Icon glyph="figma" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
                  </Link>
                  <Link
                    href="https://ysws.hackclub.com/feed.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ color: isDarkMode ? '#fff' : '#222', p: 2, display: 'flex', alignItems: 'center' }}
                    aria-label="YSWS RSS"
                  >
                    <Icon glyph="rss" size={28} style={{ color: isDarkMode ? '#fff' : '#222' }} />
                  </Link>
                </>
              )}
            </>
          )}
            <ThemeToggle
            onClick={cycleColorMode}
            title={`Current theme: ${colorMode}. Click to switch to ${colorMode === 'dark' ? 'light' : 'dark'} mode.`}
            aria-label="Toggle theme"
            sx={{
              ml: 4,
            }}
            isDark={isDarkMode}
          >
            <ThemeIcon
              
              isDark={isDarkMode}
            >
              <Icon 
                glyph={isDarkMode ? 'view' : 'view-fill'} 
                size={32} 
                color={isDarkMode ? '#fff' : '#222'}
                className="icon"
              />
            </ThemeIcon>
          </ThemeToggle>
        </Box>
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
  margin-left: auto;
  z-index: 1100;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  
  @media (min-width: 56em) {
    display: none;
  }
  
  &:focus {
    outline: 2px solid #ffe066;
  }
`

const ThemeToggle = styled.button`
  appearance: none;
  border: 0;
  border-radius: 50%;
  background: transparent;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  transition: all 0.2s cubic-bezier(.68,-0.55,.27,1.55);
  position: relative;
  
  &:hover, &:focus {
    transform: scale(1.15) rotate(-5deg);
    background: ${props => props.isDark ? 'rgba(255,255,255,0.15)' : '#f3ede2'};
    box-shadow: ${props => props.isDark 
      ? '0 4px 12px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.2)' 
      : '0 4px 12px rgba(0,0,0,0.1), 0 0 0 2px #e4d6c3'};
    outline: none;
  }
  
  &:active {
    transform: scale(0.95);
  }
`

const ThemeIcon = styled(Box)`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(.68,-0.55,.27,1.55);
  position: relative;
  overflow: visible;
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(.68,-0.55,.27,1.55);
  }
  
  .icon {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.3s cubic-bezier(.68,-0.55,.27,1.55);
  }


`

function Header({ unfixed, color, bgColor, dark, fixed, ...props }) {
  const [scrolled, setScrolled] = useState(false)
  const [toggled, setToggled] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [logoWave, setLogoWave] = useState(false)
  const [colorMode] = useColorMode()

  const isDarkMode = colorMode === 'dark'

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
      dark={isDarkMode}
      as="header"
      theme={{ isDark: isDarkMode }}
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
              ? 'rotate(-18deg) translateY(-10%) translateX(3%)'
              : 'rotate(0deg) translateY(2%) translateX(3%)',
            zIndex: 0 
          }}
        >
          <Flag scrolled={scrolled || fixed ? true : undefined} />

        </Box>
        <Box sx={{ flex: '1 1 0', display: ['none', null, 'flex'], justifyContent: 'center', alignItems: 'center' }}>
          <Navigation
            as="nav"
            aria-hidden={!!mobile}
            color={isDarkMode ? 'white' : baseColor}
            dark={isDarkMode ? "true" : dark ? "true" : undefined}
            scrolled={scrolled}
          />
        </Box>
        <HamburgerButton
          aria-label={toggled ? 'Close menu' : 'Open menu'}
          aria-expanded={toggled}
          aria-controls="mobile-nav"
          onClick={() => setToggled(t => !t)}
          style={{ color: isDarkMode ? '#fff' : '#222' }}
        >
          <Icon glyph={toggled ? 'view-close' : 'menu'} size={36} color={isDarkMode ? '#fff' : '#222'} />
        </HamburgerButton>
      </Content>
      <Box
        id="mobile-nav"
        sx={{
          display: [toggled ? 'block' : 'none', toggled ? 'block' : 'none', 'none'],
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          bg: isDarkMode ? 'rgba(34,34,34,0.97)' : 'rgba(253,246,238,0.97)',
          zIndex: 1099,
          transition: 'opacity 0.2s',
          overflowY: 'auto',
          borderRadius: '0 0 2rem 2rem',
          boxShadow: isDarkMode 
            ? '0 8px 32px rgba(0,0,0,0.4), 0 1.5px 6px rgba(0,0,0,0.3)'
            : '0 8px 32px rgba(0,0,0,0.12), 0 1.5px 6px rgba(0,0,0,0.08)',
          maxHeight: '80vh', 
          border: isDarkMode ? '4px solid #555' : '4px solid #e4d6c3',
          borderTopWidth: '5px',
          borderTopStyle: 'solid',
          borderTopColor: isDarkMode ? '#555' : 'rgb(228, 214, 195)',
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
          alignItems: 'stretch',
          width: '100%',
          maxWidth: '480px',
          margin: '0 auto',
          paddingTop: '0px'
        }}>
          <Navigation
            as="nav"
            isMobile
            toggled={toggled}
            color={isDarkMode ? 'white' : baseColor}
            dark={isDarkMode ? "true" : dark ? "true" : undefined}
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
