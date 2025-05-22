/** @jsxImportSource theme-ui */
import { useState, useRef, useEffect } from 'react'
import { Box, Button, Container, Flex, Grid, Heading, Image, Input, Text, Link } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Icon from '../components/icon'
import Carousel from '../components/index/carousel'
import MailingList from '../components/index/cards/mailing-list'
import theme from '../lib/theme'
import { FaArrowUp } from 'react-icons/fa'
import Footer from '../components/footer'
import Head from 'next/head'

const orangeGradient = 'linear-gradient(90deg, #ff6600 0%, #ff9900 100%)'
const darkGradient = 'linear-gradient(135deg, #18181b 0%, #23232b 100%)'

const heroText = keyframes`
  from { opacity: 0; transform: translateY(40px);}
  to { opacity: 1; transform: translateY(0);}
`

const heroImage = keyframes`
  from { opacity: 0; transform: translateX(60px);}
  to { opacity: 1; transform: translateX(0);}
`

// A variety of background patterns for use throughout the site
function AnimatedBackground({ 
  pattern = 'dots', 
  opacity = 0.08, 
  speed = 30, 
  animationEnabled = true,
  direction = 'normal',
  customColor = 'white',
  size = 'normal'
}) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Compute pattern size multiplier
  const sizeMultiplier = size === 'small' ? 0.7 : size === 'large' ? 1.5 : 1;
  
  // Enhanced pattern collection with more variety
  const patterns = {
    dots: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='%23fff'/%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0.5H40M0 10.5H40M0 20.5H40M0 30.5H40M0.5 0V40M10.5 0V40M20.5 0V40M30.5 0V40' stroke='white' stroke-opacity='0.3'/%3E%3C/svg%3E")`,
    circuit: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 10H20M10 10V20M40 10H50M50 10V20M10 50V40M10 50H20M50 50H40M50 50V40' stroke='white' stroke-opacity='0.25'/%3E%3Ccircle cx='10' cy='10' r='2' fill='white' fill-opacity='0.5'/%3E%3Ccircle cx='50' cy='10' r='2' fill='white' fill-opacity='0.5'/%3E%3Ccircle cx='10' cy='50' r='2' fill='white' fill-opacity='0.5'/%3E%3Ccircle cx='50' cy='50' r='2' fill='white' fill-opacity='0.5'/%3E%3C/svg%3E")`,
    hexagons: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M25 2.5L43.3 13.75V36.25L25 47.5L6.7 36.25V13.75L25 2.5Z' stroke='white' stroke-opacity='0.25'/%3E%3C/svg%3E")`,
    diamonds: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 2L38 20L20 38L2 20L20 2Z' stroke='white' stroke-opacity='0.25'/%3E%3C/svg%3E")`,
    triangles: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L35 30H5L20 5Z' stroke='white' stroke-opacity='0.25'/%3E%3C/svg%3E")`,
    waves: `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10C5 5 10 15 15 10C20 5 25 15 30 10C35 5 40 15 45 10C50 5 55 15 60 10' stroke='white' stroke-opacity='0.25' stroke-width='1'/%3E%3C/svg%3E")`,
    code: `url("data:image/svg+xml,%3Csvg width='50' height='30' viewBox='0 0 50 30' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 5L5 15L15 25M35 5L45 15L35 25' stroke='white' stroke-opacity='0.25' stroke-width='1.5'/%3E%3C/svg%3E")`
  };
  
  // Animation directions
  const animationDirection = {
    normal: { 
      from: { backgroundPosition: '0 0' }, 
      to: { backgroundPosition: '200px 200px' } 
    },
    reverse: {
      from: { backgroundPosition: '200px 200px' },
      to: { backgroundPosition: '0 0' }
    },
    diagonal: {
      from: { backgroundPosition: '0 0' },
      to: { backgroundPosition: '200px -200px' }
    },
    horizontal: {
      from: { backgroundPosition: '0 0' },
      to: { backgroundPosition: '200px 0' }
    },
    vertical: {
      from: { backgroundPosition: '0 0' },
      to: { backgroundPosition: '0 200px' }
    }
  };
  
  // Select animation based on direction
  const selectedAnimation = animationDirection[direction] || animationDirection.normal;
  
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: opacity,
        backgroundImage: patterns[pattern] || patterns.dots,
        backgroundSize: `${40 * sizeMultiplier}px ${40 * sizeMultiplier}px`,
        animation: animationEnabled && !prefersReducedMotion ? 'bgmove linear infinite' : 'none',
        animationDuration: `${speed}s`
      }}
      css={{
        '@keyframes bgmove': {
          '0%': selectedAnimation.from,
          '100%': selectedAnimation.to
        }
      }}
    />
  )
}

function scrollToSection(id) {
  if (typeof window !== 'undefined') {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

function HeaderNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  
  // Close menu when clicking outside
  useEffect(() => {
    if (menuOpen) {
      const handleClickOutside = (e) => {
        if (!e.target.closest('header')) {
          setMenuOpen(false)
        }
      }
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [menuOpen])
  
  return (
    <Box
      as="header"
      sx={{
        position: 'sticky',
        top: 0,
        width: '100%',
        zIndex: 100,
        bg: 'rgba(24,24,27,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1.5px solid',
        borderColor: 'rgba(255,255,255,0.08)',
        py: [2, 2.5],
        px: [3, 3, 4],
        mb: 0
      }}
    >
      <Container sx={{ maxWidth: 1200 }}>
        <Flex sx={{ 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: ['wrap', 'nowrap']
        }}>
          <Link href="/" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            py: 2
          }}>
            <Image
              src="https://assets.hackclub.com/flag-orpheus-top.svg"
              alt="Hack Club"
              sx={{ height: [30, 35, 40], width: 'auto', mr: 2, display: 'inline-block' }}
            />
            <Text sx={{ 
              fontWeight: 800, 
              fontSize: [2, 3, 4], 
              color: 'orange', 
              letterSpacing: '-0.03em', 
              fontFamily: 'Phantom Sans, sans-serif',
              transition: 'color 0.2s ease',
              ':hover': {
                color: '#ff9900'
              }
            }}>
              Hack Club
            </Text>
          </Link>
          
          {/* Mobile menu toggle */}
          <Box sx={{ display: ['block', 'none'] }}>
            <Button
              variant="outline"
              sx={{
                color: 'white',
                p: 2,
                borderColor: 'rgba(255,255,255,0.2)',
                ':hover': { bg: 'rgba(255,255,255,0.06)' },
                borderRadius: 'default',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
              onClick={(e) => {
                e.stopPropagation()
                setMenuOpen(!menuOpen)
              }}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Close
                </>
              ) : (
                <>
                  <svg width="18" height="14" viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1H23M1 9H23M1 17H23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Menu
                </>
              )}
            </Button>
          </Box>
          
          {/* Desktop navigation - simplified with fewer items */}
          <Flex
            as="nav"
            sx={{
              gap: [2, 3, 4],
              alignItems: 'center',
              display: ['none', 'flex']
            }}
          >
            <Link href="https://hackclub.com/clubs" sx={navLinkStyle} target="_blank" rel="noopener">Clubs</Link>
            <Link href="/hackathons" sx={navLinkStyle}>Hackathons</Link>
            <Link href="https://scrapbook.hackclub.com/" sx={navLinkStyle} target="_blank" rel="noopener">Scrapbook</Link>
            <Link href="/slack" sx={navLinkStyle}>Slack</Link>
            <Link href="https://github.com/hackclub" target="_blank" rel="noopener" sx={navLinkStyle}>GitHub</Link>
          </Flex>
        </Flex>
        
        {/* Mobile navigation - simplified with fewer items */}
        {menuOpen && (
          <Box sx={{
            width: '100%',
            py: 2,
            display: ['block', 'none'],
            borderTop: '1px solid rgba(255,255,255,0.1)',
            animation: 'slideDown 0.2s ease-out'
          }}
          css={{
            '@keyframes slideDown': {
              from: { opacity: 0, transform: 'translateY(-8px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
          >
            <Flex sx={{
              flexDirection: 'column',
              gap: 1
            }}>
              <Link href="https://hackclub.com/clubs" sx={mobileNavLinkStyle} target="_blank" rel="noopener">Clubs</Link>
              <Link href="/hackathons" sx={mobileNavLinkStyle}>Hackathons</Link>
              <Link href="https://scrapbook.hackclub.com/" sx={mobileNavLinkStyle} target="_blank" rel="noopener">Scrapbook</Link>
              <Link href="/slack" sx={mobileNavLinkStyle}>Slack</Link>
              <Link href="https://github.com/hackclub" target="_blank" rel="noopener" sx={mobileNavLinkStyle}>GitHub</Link>
            </Flex>
          </Box>
        )}
      </Container>
    </Box>
  )
}

const navLinkStyle = {
  color: 'white',
  fontWeight: 600,
  fontSize: [2, 2, 3],
  textDecoration: 'none',
  px: 2,
  py: 2,
  borderRadius: 'default',
  transition: 'all 0.2s ease',
  position: 'relative',
  ':hover,:focus': {
    color: 'orange',
    background: 'rgba(255,255,255,0.06)',
    textDecoration: 'none',
    outline: 'none'
  },
  ':focus-visible': {
    boxShadow: '0 0 0 2px rgba(255, 102, 0, 0.5)'
  },
  ':after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'orange',
    transition: 'width 0.2s ease'
  },
  ':hover:after': {
    width: 'calc(100% - 20px)'
  }
}

const mobileNavLinkStyle = {
  color: 'white',
  fontWeight: 600,
  fontSize: 2,
  textDecoration: 'none',
  px: 3,
  py: 3,
  borderRadius: 'default',
  transition: 'all 0.2s ease',
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  ':hover,:focus': {
    color: 'orange',
    background: 'rgba(255,255,255,0.06)',
    textDecoration: 'none'
  },
  ':focus-visible': {
    boxShadow: '0 0 0 2px rgba(255, 102, 0, 0.5)'
  }
}

function Hero() {
  return (    <Box
      as="section"
      sx={{
        minHeight: ['auto', '80vh', '90vh'],
        width: '100%',
        bg: 'black',
        background: darkGradient,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        px: [2, 3, 4, 5],
        pt: [4, 5, 6, 6], 
        pb: [5, 5, 6]
      }}
    >
      <AnimatedBackground pattern="hexagons" speed={40} direction="diagonal" size="large" />
      <Container sx={{ maxWidth: 1200, width: '100%' }}>
        <Grid columns={[1, 1, 2]} gap={[4, 5]} sx={{ alignItems: 'center' }}>
          <Box sx={{ alignSelf: 'center', textAlign: ['center', 'center', 'left'] }}>
            <Heading
              variant="ultratitle"
              sx={{
                fontSize: ['2.2rem', '2.6rem', '3rem', '3.4rem'],
                background: orangeGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 3,
                lineHeight: 1.1,
                fontWeight: 800
              }}
            >
              This is Hack Club.
            </Heading>
            <Box
              sx={{
                borderLeft: ['none', 'none', '4px solid'],
                borderColor: 'orange',
                pl: [0, 0, 3],
                mb: 4
              }}
            >
              <Text
                variant="lead"
                sx={{
                  color: 'white',
                  opacity: 0.95,
                  mb: 2,
                  maxWidth: 500,
                  fontSize: ['1.1rem', '1.2rem', '1.3rem'],
                  lineHeight: 1.6
                }}
              >
                It's late nights. Big ideas.<br />
                Code that breaks. Then works.<br />
                Friends who cheer you on even when nothing's working.
              </Text>
              <Text
                variant="lead"
                sx={{
                  color: 'white',
                  opacity: 0.95,
                  mb: 3,
                  maxWidth: 550,
                  fontSize: ['1.1rem', '1.2rem', '1.3rem'],
                  lineHeight: 1.6
                }}
              >
                It's not a class. Not a competition.<br />
                It's a space to build whatever's on your mind—with people who actually get it. 
              </Text>
              <Text
                variant="lead"
                sx={{
                  color: '#ff9900',
                  mb: 0,
                  maxWidth: 550,
                  fontSize: ['1.1rem', '1.2rem', '1.3rem'],
                  lineHeight: 1.6,
                  fontWeight: 600
                }}
              >
                No one's telling you what to do.<br />
                You just start. And somehow, you're not alone.
              </Text>
            </Box>
            <Flex sx={{ 
              gap: 3, 
              flexWrap: 'wrap', 
              mb: 4, 
              justifyContent: ['center', 'center', 'flex-start'],
              width: '100%',
            }}
            css={{
              '@media (max-width: 32em)': {
                'button, a': {
                  width: '100%',
                  justifyContent: 'center'
                }
              }
            }}
            >
              <Button variant="primary"
                as="a"
                href="#"
                onClick={e => {
                  e.preventDefault()
                  scrollToSection('slack-section')
                }}
                sx={{
                  fontSize: [2, 3],
                  px: [4, 5],
                  py: [2, 3],
                  transition: 'all 0.3s ease',
                  ':hover': { bg: 'white', color: 'orange', transform: 'translateY(-5px)' },
                  boxShadow: '0 4px 20px rgba(255, 102, 0, 0.25)',
                  fontWeight: 600
                }}
              >
                Join Slack
              </Button>
              <Button variant="outline"
                as="a"
                href="#"
                onClick={e => {
                  e.preventDefault()
                  scrollToSection('programs')
                }}
                sx={{
                  fontSize: [2, 3],
                  px: [4, 5],
                  py: [2, 3],
                  color: 'orange',
                  borderColor: 'orange',
                  borderWidth: 2,
                  transition: 'all 0.3s ease',
                  ':hover': { bg: 'orange', color: 'black', transform: 'translateY(-5px)' },
                  fontWeight: 600
                }}
              >
                Explore Programs
              </Button>
            </Flex>
            <Box
              sx={{
                bg: 'rgba(255, 255, 255, 0.05)',
                p: 3,
                borderRadius: '8px',
                borderLeft: '3px solid',
                borderColor: 'orange',
                textAlign: ['left', 'left', 'left'],
                mt: 2
              }}
            >
              <Text 
                variant="caption" 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: [1, 2],
                  flexWrap: 'wrap'
                }}
              >
                <Icon glyph="github" size={20} sx={{ flexShrink: 0, mr: 2, color: 'orange' }} />
                <span>
                  Proudly partnered with <strong>GitHub</strong>, <strong>Arduino</strong>, and more. 
                  <span style={{ color: '#ff9900', fontWeight: 600 }}> Join our creative coding community.</span>
                </span>
              </Text>
            </Box>
          </Box>
          {/* Enhanced hero images with better mobile display */}
          <Box 
            sx={{ 
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              width: '100%',
              px: [2, 2, 0]
            }}
          >
            <Image
              src="/home/flagship_4.jpg"
              alt="Hack Clubbers at Flagship, 2019"
              sx={{
                width: '100%',
                aspectRatio: '4/3',
                maxWidth: [300, 360, 420, 500],
                height: 'auto',
                borderRadius: 'lg',
                boxShadow: '0 12px 48px rgba(255, 102, 0, 0.3)',
                objectFit: 'cover',
                mx: 'auto',
                display: 'block',                transform: 'rotate(0deg)',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 16px 56px rgba(255, 102, 0, 0.4)'
                }
              }}
            />
            <Image
              src="/home/zephyr-spacex.jpeg"
              alt="Hack Clubbers at SpaceX HQ"
              sx={{
                width: '100%',
                aspectRatio: '4/3',                maxWidth: [300, 360, 420, 500],
                height: 'auto',
                borderRadius: 'lg',
                boxShadow: '0 12px 48px rgba(255, 153, 0, 0.3)',
                objectFit: 'cover',
                mx: 'auto',
                display: 'block',                transform: 'rotate(0deg)',
                transition: 'all 0.3s ease',
                ':hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 16px 56px rgba(255, 153, 0, 0.4)'
                }
              }}
            />
          </Box>
        </Grid>
      </Container>
      {/* Orange gradient accent */}
      <Box
        sx={{
          position: 'absolute',
          top: '-10%',
          right: '-20%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.12,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </Box>
  )
}

function Programs({ carouselCards = [] }) {
  return (
    <Box
      as="section"
      id="programs"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [5, 6, 7],
        px: [2, 3, 4],
        position: 'relative'
      }}
    >
      <Container sx={{ maxWidth: 1200 }}>
        <Heading
          as="h2"
          sx={{
            fontSize: [4, 5, 6],
            fontWeight: 700,
            mb: 4,
            background: orangeGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Programs Happening Now
        </Heading>
        <Text as="p" sx={{ fontSize: [2, 3], color: 'muted', mb: 5, maxWidth: 600 }}>
          <span role="img" aria-label="sparkles">✨</span> Dive into something wild: from hackathons in forests to coding on trains, there’s always something new. <span role="img" aria-label="rocket">🚀</span>
        </Text>
        <Carousel cards={carouselCards || []} />
      </Container>
      {/* Orange accent */}
      <Box
        sx={{
          position: 'absolute',
          left: '-20%',
          bottom: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </Box>
  )
}

function CallToAction() {
  return (
    <Box
      as="section"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [5, 6],
        px: [2, 3, 4],
        textAlign: 'center',
        position: 'relative'
      }}
    >
      <AnimatedBackground pattern="dots" speed={35} opacity={0.05} />
      <Heading
        as="h2"
        sx={{
          fontSize: ['1.75rem', '2.1rem', '2.5rem'],
          fontWeight: 700,
          mb: 3,
          background: orangeGradient,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2
        }}
      >
        Ready to join us?
      </Heading>
      <Text 
        as="p" 
        sx={{ 
          fontSize: [2, 3], 
          color: 'muted', 
          mb: 4,
          maxWidth: '600px',
          mx: 'auto',
          lineHeight: 1.5
        }}
      >
        Connect with thousands of teen coders. Build projects together, share what you're learning, and find your people.
      </Text>
      <Flex 
        sx={{ 
          justifyContent: 'center', 
          gap: 3, 
          flexWrap: 'wrap',
          px: [2, 0]
        }}
        css={{
          '@media (max-width: 32em)': {
            'button, a': {
              width: '100%',
              justifyContent: 'center'
            }
          }
        }}
      >
        <Button
          as="a"
          href="/slack"
          sx={{
            bg: 'orange',
            color: 'black',
            fontWeight: 700,
            fontSize: [2, 3],
            px: [4, 5],
            py: [2, 3],
            borderRadius: 'circle',
            boxShadow: '0 4px 24px #ff660055',
            transition: 'transform 0.2s, background-color 0.2s, color 0.2s',
            ':hover': { bg: 'white', color: 'orange', transform: 'translateY(-5px)' }
          }}
        >
          Join Slack
        </Button>
        <Button
          as="a"
          href="#newsletter"
          sx={{
            bg: 'transparent',
            color: 'orange',
            border: '2px solid',
            borderColor: 'orange',
            fontWeight: 700,
            fontSize: [2, 3],
            px: [4, 5],
            py: [2, 3],
            borderRadius: 'circle',
            boxShadow: '0 2px 12px #ff660033',
            transition: 'transform 0.2s, background-color 0.2s, color 0.2s',
            ':hover': { bg: 'orange', color: 'black', transform: 'translateY(-5px)' }
          }}
        >
          Newsletter
        </Button>
      </Flex>
      {/* Orange accent */}
      <Box
        sx={{
          position: 'absolute',
          right: '-20%',
          bottom: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </Box>
  )
}

// Floating Back to Top Button
function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: [16, 24, 32],
        right: [16, 24, 32],
        zIndex: 100,
        display: show ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Button
        variant="primary"
        sx={{
          bg: 'orange',
          color: 'black',
          borderRadius: 'circle',
          boxShadow: '0 2px 16px rgba(255,102,0,0.3)',
          p: [2, 3],
          fontSize: [2, 3],
          width: [48, 56],
          height: [48, 56],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.2s, background 0.2s, color 0.2s, transform 0.2s',
          ':hover': { bg: 'white', color: 'orange', transform: 'translateY(-4px)', boxShadow: '0 4px 20px rgba(255,102,0,0.4)' },
          ':active': { transform: 'translateY(0)', boxShadow: '0 2px 8px rgba(255,102,0,0.3)' }
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <FaArrowUp style={{ margin: 0, padding: 0, display: 'block' }} />
      </Button>
    </Box>
  )
}

function SlackSection() {
  return (
    <Box
      as="section"
      id="slack-section"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [4, 5, 6],
        px: [2, 3, 4],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatedBackground pattern="dots" speed={30} opacity={0.07} />
      {/* Orange accent */}
      <Box
        sx={{
          position: 'absolute',
          left: '-20%',
          top: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Container sx={{ maxWidth: 900, position: 'relative', zIndex: 1 }}>
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'],
            alignItems: ['center', 'center', 'flex-start'],
            bg: 'rgba(24,24,27,0.95)',
            borderRadius: '2xl',
            boxShadow: '0 8px 48px #ff660033',
            p: [3, 4, 5],
            gap: [3, 4, 5],
            animation: 'fadeIn 0.8s ease-out',
          }}
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Box sx={{ flex: '0 0 auto', textAlign: 'center', mb: [2, 3, 0] }}>
            <Text sx={{ fontSize: [5, 6, 7], mb: [1, 2] }}>💬</Text>
          </Box>
          <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
            <Heading
              as="h2"
              sx={{
                fontSize: [3, 3, 4, 5],
                fontWeight: 800,
                mb: 2,
                background: orangeGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: ['center', 'center', 'left'],
                lineHeight: 1.2
              }}
            >
              The Hack Club Slack
            </Heading>
            <Text
              as="p"
              sx={{
                fontSize: [1, 2, 3],
                color: 'muted',
                mb: 3,
                maxWidth: 600,
                textAlign: ['center', 'center', 'left'],
                lineHeight: 1.5
              }}
            >
              <b>Come for the skills, stay for the people.</b><br />
              Communication and planning for our open source projects happen in the Slack. Coding is often seen as an isolating activity. Plenty of groups exist for kids who are interested in sports, theater, or chess, but the stereotype of a programmer is a person who sits alone in a dark room. It doesn't have to be this way—in the Hack Club Slack (Discord-style online groupchat), you'll find a group of <b>27,253+</b> fabulous people to talk to, active at all hours.
            </Text>
            <Box sx={{ textAlign: ['center', 'center', 'left'] }}>
              <Button
                as="a"
                href="/slack"
                sx={{
                  bg: 'orange',
                  color: 'black',
                  fontWeight: 700,
                  fontSize: [2, 2, 3],
                  px: [3, 4, 5],
                  py: [2, 3],
                  borderRadius: 'circle',
                  boxShadow: '0 4px 24px #ff660055',
                  transition: 'transform 0.2s, background-color 0.2s, color 0.2s',
                  display: 'inline-block',
                  width: ['100%', 'auto'],
                  textAlign: 'center',
                  ':hover': { bg: 'white', color: 'orange', transform: 'translateY(-5px)' }
                }}
              >
                Join our Slack &rarr;
              </Button>
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

function NewsletterSection() {
  return (
    <Box
      as="section"
      id="newsletter"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [4, 5, 6],
        px: [2, 3, 4],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatedBackground pattern="grid" speed={35} opacity={0.05} direction="horizontal" />
      {/* Orange accent */}
      <Box
        sx={{
          position: 'absolute',
          right: '-20%',
          bottom: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Container sx={{ maxWidth: 700, position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            bg: 'rgba(24,24,27,0.95)',
            borderRadius: 'lg',
            boxShadow: '0 8px 48px rgba(255, 102, 0, 0.2)',
            p: [3, 4, 5],
            animation: 'fadeIn 0.8s ease-out',
            border: '1px solid',
            borderColor: 'rgba(255, 153, 0, 0.15)'
          }}
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          <Flex
            sx={{
              flexDirection: ['column', 'column', 'row'],
              alignItems: 'center',
              gap: [3, 4, 5]
            }}
          >
            <Box sx={{ flex: '0 0 auto', textAlign: 'center', mb: [2, 3, 0] }}>
              <Box
                sx={{
                  width: [50, 60, 70],
                  height: [50, 60, 70],
                  borderRadius: '50%',
                  bg: 'rgba(255, 102, 0, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  mx: 'auto'
                }}
              >
                <Text sx={{ fontSize: [4, 5], color: 'orange' }}>📬</Text>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 0', minWidth: 0, width: '100%' }}>
              <Heading
                as="h2"
                variant="title"
                sx={{
                  background: orangeGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2,
                  fontSize: [3, 3, 4],
                  textAlign: ['center', 'center', 'left'],
                  lineHeight: 1.2,
                  fontWeight: 800
                }}
              >
                Stay Updated
              </Heading>
              <Text
                as="p"
                variant="lead"
                sx={{
                  color: 'muted',
                  mb: 3,
                  maxWidth: 500,
                  fontSize: [1, 2],
                  textAlign: ['center', 'center', 'left'],
                  lineHeight: 1.5
                }}
              >
                Get event invites, news, and opportunities for teen hackers. No spam, just the good stuff.
              </Text>
              <Box
                as="form"
                action="https://hackclub.com/api/newsletter"
                method="POST"
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'column', 'row'],
                  gap: 2,
                  alignItems: ['stretch', 'stretch', 'flex-end'],
                  mt: 2,
                  width: '100%'
                }}
                target="_blank"
              >
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Text as="label" htmlFor="newsletter-name" sx={{ display: 'block', fontSize: 1, mb: 1, color: 'muted' }}>
                    Your name
                  </Text>
                  <Input
                    id="newsletter-name"
                    name="name"
                    type="text" 
                    required
                    placeholder="Orpheus"
                    sx={{
                      variant: 'forms.input',
                      bg: 'elevated',
                      color: 'text',
                      fontSize: 2,
                      borderRadius: 'default',
                      border: '1px solid rgba(255,255,255,0.1)',
                      width: '100%',
                      minWidth: 0,
                      boxShadow: '0 2px 12px rgba(255, 102, 0, 0.1)',
                      '::placeholder': { color: 'muted', opacity: 0.7 },
                      p: 2,
                      transition: 'all 0.2s ease',
                      height: '44px',
                      ':focus': {
                        boxShadow: '0 0 0 2px rgba(255, 102, 0, 0.3)',
                        borderColor: 'orange',
                        outline: 'none'
                      }
                    }}
                    aria-label="Full name"
                    autoComplete="name"
                  />
                </Box>
                <Box sx={{ flex: 1, width: '100%' }}>
                  <Text as="label" htmlFor="newsletter-email" sx={{ display: 'block', fontSize: 1, mb: 1, color: 'muted' }}>
                    Your email
                  </Text>
                  <Input
                    id="newsletter-email"
                    name="email"
                    type="email"
                    required
                    placeholder="orpheus@hackclub.com"
                    sx={{
                      variant: 'forms.input',
                      bg: 'elevated',
                      color: 'text',
                      fontSize: 2,
                      borderRadius: 'default',
                      border: '1px solid rgba(255,255,255,0.1)',
                      width: '100%',
                      minWidth: 0,
                      boxShadow: '0 2px 12px rgba(255, 102, 0, 0.1)',
                      '::placeholder': { color: 'muted', opacity: 0.7 },
                      p: 2,
                      transition: 'all 0.2s ease',
                      height: '44px',
                      ':focus': {
                        boxShadow: '0 0 0 2px rgba(255, 102, 0, 0.3)',
                        borderColor: 'orange',
                        outline: 'none'
                      }
                    }}
                    aria-label="Email address"
                    autoComplete="email"
                  />
                </Box>
                <Button
                  type="submit"
                  variant="primary"
                  sx={{
                    fontSize: 2,
                    px: 4,
                    py: 2,
                    borderRadius: 'default',
                    boxShadow: '0 4px 16px rgba(255, 102, 0, 0.3)',
                    mt: [2, 2, '24px'], // Align with inputs
                    width: ['100%', '100%', 'auto'],
                    minWidth: ['auto', 'auto', '120px'],
                    fontWeight: 700,
                    transition: 'all 0.2s ease',
                    height: '44px',
                    ':hover': { 
                      bg: 'white', 
                      color: 'orange', 
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 102, 0, 0.4)'
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
              <Text 
                sx={{ 
                  mt: 3, 
                  fontSize: 1, 
                  color: 'muted', 
                  textAlign: ['center', 'center', 'left'],
                  opacity: 0.8
                }}
              >
                By subscribing, you agree to receive messages about Hack Club opportunities.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}

const OuternetImgFile = '/home/outernet-110.jpg';

function OuternetHighlight() {
  return (
    <Box
      as="section"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [4, 5, 6],
        px: [2, 3, 4],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatedBackground pattern="hexagons" speed={60} opacity={0.06} />
      <Container sx={{ maxWidth: 1100, position: 'relative', zIndex: 1 }}>
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'center',
            gap: [3, 4, 5],
            animation: 'fadeIn 1s ease-out',
          }}
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0 },
              to: { opacity: 1 }
            }
          }}
        >
          <Box
            sx={{
              flex: ['1 1 auto', '1 1 auto', '0 0 400px'],
              width: '100%',
              maxWidth: [360, 400, 500],
              borderRadius: '2xl',
              overflow: 'hidden',
              boxShadow: '0 8px 48px #ff660033',
              mb: [3, 3, 0],
              mx: ['auto', 'auto', 0],
              animation: 'slideInLeft 1s ease-out',
            }}
            css={{
              '@keyframes slideInLeft': {
                from: { opacity: 0, transform: 'translateX(-30px)' },
                to: { opacity: 1, transform: 'translateX(0)' }
              }
            }}
          >
            <Image
              src={OuternetImgFile}
              alt="Hack Clubbers gather in the great outdoors of Cabot, VT, for Outernet"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'cover',
                transition: 'transform 0.5s ease-out',
                ':hover': {
                  transform: 'scale(1.05)'
                }
              }}
            />
          </Box>
          <Box 
            sx={{ 
              flex: '1 1 0', 
              px: [0, 0, 4], 
              textAlign: ['center', 'center', 'left'],
              animation: 'slideInRight 1s ease-out',
            }}
            css={{
              '@keyframes slideInRight': {
                from: { opacity: 0, transform: 'translateX(30px)' },
                to: { opacity: 1, transform: 'translateX(0)' }
              }
            }}
          >
            <Heading
              as="h3"
              sx={{
                fontSize: [3, 4],
                fontWeight: 700,
                mb: 2,
                color: 'orange'
              }}
            >
              Outernet: The Ultimate Hack Club Adventure
            </Heading>
            <Text
              as="p"
              sx={{
                fontSize: [1, 2, 3],
                color: 'muted',
                mb: 3,
                maxWidth: [null, null, 500]
              }}
            >
              Hack Clubbers gather in the great outdoors of Cabot, VT, for an experience unlike any other: Outernet. Campfires, coding, and lifelong friendships—this is where the magic happens!
            </Text>
            <Button
              as="a"
              href="https://outernet.hackclub.com/"
              target="_blank"
              rel="noopener"
              sx={{
                bg: 'orange',
                color: 'black',
                fontWeight: 700,
                fontSize: [2, 2, 3],
                px: [3, 4, 5],
                py: 2,
                borderRadius: 'circle',
                boxShadow: '0 4px 24px #ff660055',
                transition: 'transform 0.2s, background-color 0.2s, color 0.2s, box-shadow 0.2s',
                ':hover': { 
                  bg: 'white', 
                  color: 'orange',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 32px #ff660088',
                }
              }}
            >
              Learn More About Outernet
            </Button>
          </Box>
        </Flex>
      </Container>
      {/* Orange accent */}
      <Box
        sx={{
          position: 'absolute',
          right: '-20%',
          bottom: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </Box>
  )
}

function JuiceAdventureSection() {
  return (
    <Box
      as="section"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [4, 5, 6],
        px: [2, 3, 4],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatedBackground pattern="dots" speed={45} opacity={0.07} />
      <Container sx={{ maxWidth: 1100, position: 'relative', zIndex: 1 }}>
        <Heading
          as="h2"
          sx={{
            fontSize: ['1.7rem', '2.1rem', '2.5rem', '3rem'],
            fontWeight: 800,
            mb: [3, 4],
            background: orangeGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            animation: 'fadeIn 0.8s ease-out',
            lineHeight: 1.2
          }}
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          Hack Club JUICE: Pop-Up Hacker Café in Shanghai 🇨🇳
        </Heading>
        <Grid 
          columns={[1, null, 2]} 
          gap={[4, 5]} 
          sx={{ 
            alignItems: 'center', 
            mt: [3, 4],
            animation: 'fadeIn 0.8s ease-out 0.2s backwards',
          }}
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >          <Box>
            <Flex sx={{ flexDirection: 'column', gap: 3 }}>
              <Image
                src="/home/juice-airport.jpg"
                alt="Hack Clubbers at the airport heading to Shanghai for JUICE"
                sx={{
                  width: '100%',
                  maxWidth: [340, 380, 420],
                  height: 'auto',
                  borderRadius: '2xl',
                  boxShadow: '0 8px 48px #ff660033',
                  objectFit: 'cover',
                  mx: 'auto',
                  display: 'block',
                  transition: 'transform 0.3s ease-out',
                  ':hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
              <Image
                src="/home/juice-hotel.jpg"
                alt="Hack Clubbers at the hotel in Shanghai for JUICE"
                sx={{
                  width: '100%',
                  maxWidth: [340, 380, 420],
                  height: 'auto',
                  borderRadius: '2xl',
                  boxShadow: '0 8px 48px #ff990055',
                  objectFit: 'cover',
                  mx: 'auto',
                  display: 'block',
                  transition: 'transform 0.3s ease-out',
                  ':hover': {
                    transform: 'scale(1.02)'
                  }
                }}
              />
            </Flex>
          </Box>
          <Box>
            <Text
              as="p"
              sx={{
                fontSize: [2, 3],
                color: 'muted',
                mb: 3,
                lineHeight: 1.6
              }}
            >
              <b>Announcing Hack Club's next grand adventure, JUICE!!</b> <br />
              This April, 30+ Hack Clubbers traveled to Shanghai, China 🇨🇳, to run <b>#juice</b>—the world's first pop-up hacker cafe! For 2 months, Hack Clubbers built their own video games, all completely <b>languageless</b> (no spoken or written words)! Then, for 7 days, we demoed our games in a pop-up cafe for anyone off the streets of Shanghai to come in and play.
              <br /><br />
              <b>BUILD A GAME:</b> From February 1st to April 1st, teens collaborated in #juice, adding their ideas to Juice's GitHub and spending 100+ hours creating epic, languageless games. Everyone who shipped a game received travel stipend support—beginners were welcome!
              <br /><br />
              <b>RUN A POP-UP CAFÉ:</b> From April 4th to 11th, Hack Clubbers ran a pop-up café in Shanghai, building custom booths for their games and welcoming visitors from all over the city. Hotel stays, food, and all travel were paid for by Hack Club, making it an unforgettable adventure for many who had never left their home country before.
              <br /><br />
              <b>This adventure was for YOU—the first-time game builder, the first-time traveler. More new adventures like JUICE are coming this year!</b>
            </Text>
            <Button
              as="a"
              href="https://juice.hackclub.com/"
              target="_blank"
              rel="noopener"
              sx={{
                bg: 'orange',
                color: 'black',
                fontWeight: 700,
                fontSize: [2, 2, 3],
                px: [3, 4, 5],
                py: 2,
                borderRadius: 'circle',
                boxShadow: '0 4px 24px #ff660055',
                transition: 'transform 0.2s, background-color 0.2s, color 0.2s, box-shadow 0.2s',
                ':hover': { 
                  bg: 'white', 
                  color: 'orange',
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 32px #ff660088',
                }
              }}
            >
              Learn More About JUICE
            </Button>
          </Box>
        </Grid>
      </Container>
      {/* Orange accent */}
      <Box
        sx={{
          position: 'absolute',
          right: '-20%',
          bottom: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </Box>
  )
}

function TopicsSection() {
  const topics = [
    {
      icon: '💬',
      title: 'Connect with other teenage coders',
      desc: (
        <>
          Got a bug? Need a meme review? Or just want to vibe? Hundreds of teens are online in our{' '}
          <Link href="/slack" sx={{ color: 'orange', textDecoration: 'underline' }}>Slack</Link> (think Discord, but for hackers), 24/7.
        </>
      )
    },
    {
      icon: '🛠️',
      title: 'Build open source learning tools',
      desc: (
        <>
          We ship wild open source projects together (
          <Link href="https://github.com/hackclub" target="_blank" sx={{ color: 'orange', textDecoration: 'underline' }}>
            3k+ PRs a year
          </Link>
          )—from game consoles to streak trackers to this very site!
        </>
      )
    },
    {
      icon: '🤝',
      title: 'Gather IRL with other makers',
      desc: (
        <>
          Meet up at one of 400+{' '}
          <Link href="https://hackclub.com/clubs" target="_blank" sx={{ color: 'orange', textDecoration: 'underline' }}>Hack&nbsp;Clubs</Link> or{' '}
          <Link href="/hackathons" sx={{ color: 'orange', textDecoration: 'underline' }}>high school hackathons</Link>. Or just hang out and eat pizza.
        </>
      )
    }
  ]
  
  return (
    <Box
      as="section"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [4, 5, 6],
        px: [2, 3, 4],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatedBackground pattern="circuit" speed={35} />
      <Container sx={{ maxWidth: 1100, position: 'relative', zIndex: 1 }}>
        <Heading
          variant="title"
          sx={{
            fontSize: ['1.6rem', '2rem', '2.5rem'],
            background: orangeGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            mb: [4, 5],
            animation: 'fadeIn 0.8s ease-out',
            lineHeight: 1.2
          }}
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          What You'll Actually Do Here
        </Heading>
        <Grid columns={[1, null, 3]} gap={[4, 4, 5]}>
          {topics.map((t, i) => (
            <Box
              key={i}
              sx={{
                bg: 'rgba(24,24,27,0.95)',
                borderRadius: '2xl',
                boxShadow: '0 4px 24px #ff660033',
                p: [3, 4, 5],
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                minHeight: [180, 200, 220],
                transition: 'transform 0.2s, box-shadow 0.2s',
                ':hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 48px #ff660055',
                },
                animation: 'fadeIn 0.8s ease-out backwards',
                animationDelay: `${Math.min(i * 0.2, 0.6)}s`, // Cap delay at 0.6s for accessibility
              }}
              css={{
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(20px)' },
                  to: { opacity: 1, transform: 'translateY(0)' }
                }
              }}
            >
              <Text sx={{ fontSize: [4, 5, 6], mb: 2 }}>{t.icon}</Text>
              <Heading as="h3" sx={{ color: 'orange', mb: 2, fontSize: [2, 3] }}>{t.title}</Heading>
              <Text sx={{ color: 'muted', fontSize: [1, 2], lineHeight: 1.5 }}>{t.desc}</Text>
            </Box>
          ))}
        </Grid>
      </Container>

      {/* Orange accent */}
      <Box
        sx={{
          position: 'absolute',
          left: '-20%',
          top: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
    </Box>
  )
}

// Add the missing ShowcaseSection function definition here
function ShowcaseSection() {
  // Showcase data: image, alt, title, description
  const showcases = [
    {
      img: '/home/map.png',
      alt: 'Map of Hack Clubs around the world',
      title: 'Global Community',
      desc: 'Hack Clubbers are everywhere! Our network spans the globe, connecting young makers from every continent.'
    },
    {
      img: '/home/zephyr-spacex.jpeg',
      alt: 'Hack Clubbers at SpaceX HQ in LA',
      title: 'Epic Field Trips',
      desc: 'From SpaceX HQ to local meetups, Hack Clubbers get hands-on with the world’s coolest tech and people.'
    },
    {
      img: '/hackathons/mahacks.jpeg',
      alt: 'MA Hacks, Hack Clubber organized hackathon',
      title: 'Student-Led Hackathons',
      desc: 'Hundreds of high school hackathons are organized by Hack Clubbers every year. Build, learn, and compete!'
    },
    {
      img: '/home/ama.png',
      alt: 'AMA with Sal Khan',
      title: 'Meet the Legends',
      desc: 'Join AMAs and workshops with tech leaders like Sal Khan, engineers from GitHub, and more.'
    },
    {
      img: '/home/flagship_4.jpg',
      alt: 'Hack Clubbers at Flagship, 2019',
      title: 'Flagship Gatherings',
      desc: 'Our annual Flagship event brings together the most passionate hackers for a week of creativity and fun.'
    }
  ]
  
  return (
    <Box
      as="section"
      sx={{
        bg: 'black',
        background: darkGradient,
        color: 'white',
        py: [4, 5, 6, 7],
        px: [2, 3, 4, 5],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <AnimatedBackground pattern="grid" speed={50} opacity={0.06} />
      <Container sx={{ maxWidth: 1200, position: 'relative', zIndex: 1 }}>
        <Heading
          as="h2"
          sx={{
            fontSize: ['1.6rem', '2rem', '2.5rem', '3rem'],
            fontWeight: 800,
            mb: [3, 4, 5],
            background: orangeGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center',
            animation: 'fadeIn 0.8s ease-out',
            lineHeight: 1.2
          }}
          css={{
            '@keyframes fadeIn': {
              from: { opacity: 0, transform: 'translateY(20px)' },
              to: { opacity: 1, transform: 'translateY(0)' }
            }
          }}
        >
          What Makes Hack Club Special?
        </Heading>
        <Box>
          {showcases.map((item, i) => (
            <Flex
              key={i}
              sx={{
                flexDirection: ['column', 'column', i % 2 === 0 ? 'row' : 'row-reverse'],
                alignItems: 'center',
                mb: [4, 5, 6],
                gap: [3, 4, 5],
                animation: i % 2 === 0 ? 'fadeInLeft 0.8s ease-out backwards' : 'fadeInRight 0.8s ease-out backwards',
                animationDelay: `${Math.min(i * 0.2, 0.8)}s`, // Cap delay at 0.8s for accessibility
              }}
              css={{
                '@keyframes fadeInLeft': {
                  from: { opacity: 0, transform: 'translateX(-20px)' }, // Reduced movement for accessibility
                  to: { opacity: 1, transform: 'translateX(0)' }
                },
                '@keyframes fadeInRight': {
                  from: { opacity: 0, transform: 'translateX(20px)' }, // Reduced movement for accessibility
                  to: { opacity: 1, transform: 'translateX(0)' }
                }
              }}
            >              <Box
                sx={{
                  flex: ['1 1 auto', '1 1 auto', '0 0 400px'],
                  width: '100%',
                  maxWidth: [260, 300, 400, 480],
                  borderRadius: '2xl',
                  overflow: 'hidden',
                  boxShadow: '0 8px 48px #ff660033',
                  mb: [3, 3, 0],
                  mx: ['auto', 'auto', 0],                  transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out',
                  ':hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 16px 60px rgba(255, 102, 0, 0.4)',
                  }
                }}
              >
                <Image
                  src={item.img}
                  alt={item.alt}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <Box sx={{ flex: '1 1 0', px: [2, 3, 4], textAlign: ['center', 'center', 'left'] }}>
                <Heading
                  as="h3"
                  sx={{
                    fontSize: [2, 3, 4],
                    fontWeight: 700,
                    mb: 2,
                    color: 'orange'
                  }}
                >
                  {item.title}
                </Heading>
                <Text
                  as="p"
                  sx={{
                    fontSize: [1, 2, 3],
                    color: 'muted',
                    mb: 0,
                    maxWidth: [null, null, 500],
                    lineHeight: 1.5
                  }}
                >
                  {item.desc}
                </Text>
              </Box>
            </Flex>
          ))}
        </Box>
      </Container>
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          left: '-20%',
          top: '-10%',
          width: '60vw',
          height: '60vw',
          background: orangeGradient,
          opacity: 0.10,
          filter: 'blur(80px)',
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.07,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='2' fill='%23fff'/%3E%3C/svg%3E")`,
          animation: 'bgmove 30s linear infinite'
        }}
        css={{
          '@keyframes bgmove': {
            '0%': { backgroundPosition: '0 0' },
            '100%': { backgroundPosition: '200px 200px' }
          }
        }}
      />
    </Box>
  )
}

// Add this global style to prevent horizontal overflow/scroll
export default function Home({ carouselCards }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Phantom Sans font */}
        <link
          rel="stylesheet"
          href="https://assets.hackclub.com/fonts/Phantom_Sans_0.7/web.css"
        />        {/* Brand colors for theme-ui (optional, if not already in theme.js) */}        <style>{`
          :root {
            --hackclub-orange: #ff8c37;
            --hackclub-red: #ec3750;
            --hackclub-yellow: #f1c40f;
            --hackclub-green: #33d6a6;
            --hackclub-cyan: #5bc0de;
            --hackclub-blue: #338eda;
            --hackclub-purple: #a633d6;
            --hackclub-muted: #8492a6;
          }
          html, body {
            font-family: 'Phantom Sans', system-ui, sans-serif;
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            overflow-x: hidden; /* Prevent horizontal scroll */
            width: 100%;
            box-sizing: border-box;
            scroll-behavior: smooth;
          }
          *, *::before, *::after {
            box-sizing: border-box;
          }
          #__next {
            width: 100%;
            overflow-x: hidden;
          }
          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
          button, a {
            touch-action: manipulation;
          }
          a:focus, button:focus, input:focus {
            outline: 2px solid var(--hackclub-orange);
            outline-offset: 2px;
          }
          @media (max-width: 32em) {
            .mobile-full-width {
              width: 100% !important;
            }
          }
          img {
            max-width: 100%;
            height: auto;
            display: block;
          }
          /* Improve mobile tap targets */
          @media (max-width: 32em) {
            button, a, input[type="submit"] {
              min-height: 44px;
              min-width: 44px;
            }
          }
          /* Smooth font rendering */
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}</style>
      </Head>
      <Box sx={{ bg: 'black', minHeight: '100vh', fontFamily: 'Phantom Sans, body' }}>
        <HeaderNav />
        <Hero />
        <TopicsSection />
        <Programs carouselCards={carouselCards} />
        <OuternetHighlight />
        <JuiceAdventureSection />
        <SlackSection />
        <ShowcaseSection />
        <CallToAction />
        <NewsletterSection />
        <BackToTop />
        <Footer darkMode={true} />
      </Box>
    </>
  )
}

export async function getStaticProps() {
  let carouselCards = [];
  
  try {
    // Import AirtablePlus
    const AirtablePlus = require('airtable-plus');
    
    // Initialize Airtable for carousel data
    const airtable = new AirtablePlus({
      apiKey: process.env.AIRTABLE_API_KEY,
      baseID: 'appGoJNyWeZQWC4c8',
      tableName: 'Carousel Cards'
    });
    
    // Fetch data from Airtable
    const records = await airtable.read({
      filterByFormula: '{Active} = TRUE()',
      sort: [{ field: 'Order', direction: 'asc' }]
    });
    
    // Transform Airtable records to the format expected by the component
    carouselCards = records.map(record => ({
      background: record.fields.Background,
      titleColor: record.fields.TitleColor,
      descriptionColor: record.fields.DescriptionColor,
      title: record.fields.Title,
      description: record.fields.Description,
      img: record.fields.Image?.[0]?.url || '',
      link: record.fields.Link
    }));
    
    // Fallback to JSON file if no Airtable records
    if (!carouselCards.length) {
      carouselCards = require('../lib/carousel.json');
    }
  } catch (err) {
    console.error("Error loading carousel data from Airtable:", err);
    // Attempt to load from JSON as fallback
    try {
      carouselCards = require('../lib/carousel.json');
    } catch (jsonErr) {
      console.error("Error loading fallback carousel data:", jsonErr);
    }
  }

  return {
    props: {
      carouselCards: carouselCards || []
    },
    // Revalidate every hour
    revalidate: 3600
  }
}
