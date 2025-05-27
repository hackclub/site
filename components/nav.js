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
const slideDownFromNav = keyframes`
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Root = styled(Box, {
  shouldForwardProp: prop => !['bgColor', 'scrolled', 'toggled', 'fixed', 'dark'].includes(prop)
})`
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000;
  top: ${theme.space[2]}px;
  /* Adjust left/right to account for the border thickness */
  left: ${theme.space[2]}px;
  right: ${theme.space[2]}px;
  width: calc(100vw - ${theme.space[2] * 2}px);
  border-radius: 24px; /* Or your desired radius, e.g., theme.radii.extra */
  border-width: 4px; /* Keep width consistent for layout */
  border-style: solid; /* Keep style consistent */
  transition: background-color 0.25s ease-in-out, border-color 0.25s ease-in-out, box-shadow 0.25s ease-in-out;

  ${props =>
    !props.scrolled && !props.toggled && !props.fixed
      ? css`
          background-color: transparent;
          border-color: transparent;
          box-shadow: none;
        `
      : css`
          background-color: ${theme.colors.white};
          border-color: ${theme.colors.muted};
          box-shadow: ${theme.shadows.elevated};
        `}
  @media print {
    display: none;
  }
`

// Define navLinks with hoverColor
const navLinks = [
  { href: "/clubs", text: "Clubs", icon: "clubs", isNextLink: true, hoverColor: theme.colors.red },
  { href: "/fiscal-sponsorship", text: "Fiscal\u00a0Sponsorship", icon: "bank-account", isNextLink: true, hoverColor: theme.colors.orange },
  { href: "/hackathons", text: "Hackathons", icon: "event-code", isNextLink: true, hoverColor: theme.colors.yellow },
  { href: "/slack", text: "Community", icon: "slack-fill", isNextLink: false, hoverColor: theme.colors.green },
  { href: "https://scrapbook.hackclub.com/", text: "Scrapbook", icon: "photo", isNextLink: false, hoverColor: theme.colors.cyan },
  { href: "https://toolbox.hackclub.com/", text: "Toolbox", icon: "everything", isNextLink: true, hoverColor: theme.colors.blue },
];

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
        display: ${props.toggled ? 'flex' : 'none'} !important; // Use important to override base display: none
        flex-direction: column;
        position: absolute;
        top: calc(100% + ${theme.space[2]}px); // Increased gap below the nav
        left: 0;
        width: 100%;
        background-color: ${theme.colors.white}; /* Solid white background for dropdown */
        border: 4px solid ${theme.colors.muted}; /* Thick gray outline for dropdown */
        border-radius: 14px;
        /* Only apply border-radius to bottom corners */
        box-shadow: ${theme.shadows.elevated};
        padding: 0;
        max-height: calc(100vh - 120px); // Ensure it doesn't overflow viewport too much
        overflow-y: hidden;
        overflow-x: hidden; /* Prevent horizontal scrolling */
        z-index: 1; // Relative to Root's children like Content (z-index: 2)
        @media (prefers-reduced-motion: no-preference) {
          animation: ${slideDownFromNav} 0.2s ease-out;
        }
        a {
          color: ${theme.colors[props.dark ? 'white' : 'black']} !important;
          /* Ensure the <a> tag itself is a flex container for its content */
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: ${theme.space[2]}px ${theme.space[3]}px; /* Top/Bottom, Left/Right padding */
          margin-left: 0; /* Override base NavBar 'a' margin for mobile */
          font-size: ${theme.fontSizes[1]}px;
          width: 100%;
          border-bottom: 1px solid ${props.dark ? 'rgba(255,255,255,0.1)' : theme.colors.snow};
          &:last-child { border-bottom: none; }
          /* Individual hover styles will be applied via sx prop */

          /* Style for the text span inside the link */
          span {
            flex-grow: 1; /* Allow text to take available space */
            text-align: left;
          }
          /* Style for the icon */
          svg {
            margin-left: ${theme.space[2]}px; /* Add some space to the left of the icon */
            fill: currentColor; /* Make icon color match text */
            flex-shrink: 0; /* Prevent icon from shrinking if text is long */
            transition: transform 0.2s ease-in-out; /* Add transition for smooth transform */
          }
        }
      `
    : css`
        @media (min-width: 56em) {
          display: flex;
          justify-content: flex-end;
        }
        a { /* Desktop 'a' styles */
          font-size: 18px;
          color: ${props => props.color ? (theme.colors[props.color] || props.color) : 'inherit'};
          margin-left: ${theme.space[1]}px; /* Moved from general NavBar a */
          padding: ${theme.space[3]}px;     /* Moved from general NavBar a */
          text-decoration: none;          /* Copied from general NavBar a, if needed universally for desktop */
          &:hover {
            color: ${theme.colors[hoverColor(props.color)]};
            text-decoration: none;
          }
        }
      `
const NavBar = styled(Box, {
  shouldForwardProp: prop => !['isMobile', 'toggled'].includes(prop)
})`
  display: none;
  ${layout}; /* This now handles all specific 'a' styling for mobile/desktop */
  a {
    text-decoration: none; /* Universal for all links in NavBar if not overridden */
  }
`

const Navigation = props => ( // props will include isMobile when rendered for mobile
  <NavBar role="navigation" {...props}>
    {navLinks.map(linkItem => {
      let linkContent;
      let linkSx = {};

      if (props.isMobile) {
        linkContent = (
          <>
            <span>{linkItem.text}</span>
            <Icon glyph={linkItem.icon} size={20} />
          </>
        );
        linkSx = {
          '&:hover': {
            backgroundColor: linkItem.hoverColor,
            color: `${theme.colors.white} !important`,
            fontWeight: 'bold',
            span: { color: `${theme.colors.white} !important` },
            svg: {
              fill: `${theme.colors.white} !important`,
              transform: 'scale(1.25) rotate(-7deg)'
            }
          }
        };
      } else { // Desktop
        linkContent = (
          <>
            <Icon
              glyph={linkItem.icon}
              size={20} 
              className="desktop-nav-icon"
              sx={{
                marginRight: `${theme.space[2]}px`, // Space between icon and text when visible
                opacity: 0,
                transform: 'translateX(-100%) scale(0.5)', // Start hidden to the left, small
                transition: 'opacity 0.2s ease-in-out, transform 0.2s ease-in-out 0.05s', // Slight delay for transform
                color: linkItem.hoverColor, // Icon takes the link's hover color
              }}
            />
            <span>{linkItem.text}</span>
          </>
        );
        linkSx = {
          display: 'inline-flex', // Align icon and text
          alignItems: 'center',
          overflow: 'hidden',   // Crucial for the icon sliding effect
          position: 'relative',   // Good for children with transforms
          '&:hover': {
            color: `${linkItem.hoverColor} !important`,
            fontWeight: 'bold',
            '.desktop-nav-icon': {
              opacity: 1,
              transform: 'translateX(0) scale(1.25) rotate(-7deg)', // Icon appears, scales, and tilts
            }
          }
        };
      }

      if (linkItem.isNextLink) {
        return (
          <NextLink href={linkItem.href} passHref key={linkItem.href} legacyBehavior>
            <Link sx={linkSx}>{linkContent}</Link>
          </NextLink> // Added legacyBehavior for NextLink with styled components/sx
        );
      } else {
        return (
          <Link
            href={linkItem.href}
            key={linkItem.href}
            target={linkItem.href.startsWith('http') ? '_blank' : undefined}
            rel={linkItem.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            sx={linkSx}
          >
            {linkContent}
          </Link>
        );
      }
    })}
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
      bgColor={bgColor || (dark ? [32, 34, 36] : [255, 255, 255])}
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
        aria-hidden={!mobile}
        isMobile
        toggled={toggled}
        color={baseColor}
        dark={dark}
      />
      {toggled && <ScrollLock />}
    </Root>
  )
}

Header.defaultProps = {
  color: 'white'
}

export default Header
