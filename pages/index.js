/** @jsxImportSource theme-ui */
import { useState, useRef, useEffect } from 'react'
import { Box, Button, Container, Flex, Grid, Heading, Image, Input, Text, Link } from 'theme-ui'
import { keyframes } from '@emotion/react'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
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

function AnimatedBackground() {
  // Subtle animated SVG pattern
  return (
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.08,
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
        py: [2.5, 2.5], // Slightly more vertical padding for Goldilocks feel
        px: [2, 3, 4],
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
              sx={{ height: [30, 40], width: 'auto', mr: 2, display: 'inline-block' }}
            />
            <Text sx={{ fontWeight: 800, fontSize: [2, 3, 4], color: 'orange', letterSpacing: '-0.03em', fontFamily: 'Phantom Sans, sans-serif' }}>
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
                ':hover': { bg: 'rgba(255,255,255,0.06)' }
              }}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? 'Close' : 'Menu'}
            </Button>
          </Box>
          
          {/* Desktop navigation */}
          <Flex
            as="nav"
            sx={{
              gap: [2, 3],
              alignItems: 'center',
              display: ['none', 'flex']
            }}
          >
            <Link href="https://toolbox.hackclub.com/" sx={navLinkStyle} target="_blank" rel="noopener">Toolbox</Link>
            <Link href="https://hackclub.com/clubs" sx={navLinkStyle} target="_blank" rel="noopener">Clubs</Link>
            <Link href="/hackathons" sx={navLinkStyle}>Hackathons</Link>
            <Link href="https://scrapbook.hackclub.com/" sx={navLinkStyle} target="_blank" rel="noopener">Scrapbook</Link>
            <Link href="https://hackclub.com/fiscal-sponsorship/" sx={navLinkStyle} target="_blank" rel="noopener">Fiscal Sponsorship</Link>
            <Link href="/slack" sx={navLinkStyle}>Slack</Link>
            <Link href="https://github.com/hackclub" target="_blank" rel="noopener" sx={navLinkStyle}>GitHub</Link>
          </Flex>
        </Flex>
        
        {/* Mobile navigation */}
        {menuOpen && (
          <Box sx={{
            width: '100%',
            py: 2,
            display: ['block', 'none'],
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <Flex sx={{
              flexDirection: 'column',
              gap: 2
            }}>
              <Link href="https://toolbox.hackclub.com/" sx={mobileNavLinkStyle} target="_blank" rel="noopener">Toolbox</Link>
              <Link href="https://hackclub.com/clubs" sx={mobileNavLinkStyle} target="_blank" rel="noopener">Clubs</Link>
              <Link href="/hackathons" sx={mobileNavLinkStyle}>Hackathons</Link>
              <Link href="https://scrapbook.hackclub.com/" sx={mobileNavLinkStyle} target="_blank" rel="noopener">Scrapbook</Link>
              <Link href="https://hackclub.com/fiscal-sponsorship/" sx={mobileNavLinkStyle} target="_blank" rel="noopener">Fiscal Sponsorship</Link>
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
  fontSize: [2, 3],
  textDecoration: 'none',
  px: 2,
  py: 1,
  borderRadius: 'default',
  transition: 'background 0.2s,color 0.2s',
  ':hover,:focus': {
    color: 'orange',
    background: 'rgba(255,255,255,0.06)'
  }
}

const mobileNavLinkStyle = {
  color: 'white',
  fontWeight: 600,
  fontSize: 3,
  textDecoration: 'none',
  px: 2,
  py: 2,
  borderRadius: 'default',
  transition: 'background 0.2s,color 0.2s',
  ':hover,:focus': {
    color: 'orange',
    background: 'rgba(255,255,255,0.06)'
  }
}

function Hero() {
  return (
    <Box
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
        pt: [3, 4, 5, 6], // Goldilocks: slightly more top padding
        pb: [4, 5, 6]
      }}
    >
      <AnimatedBackground />
      <Container sx={{ maxWidth: 1200, width: '100%' }}>
        <Grid columns={[1, 1, 2]} gap={[4, 5]}>
          <Box sx={{ alignSelf: 'center', textAlign: ['center', 'center', 'left'] }}>
            <Fade bottom>
              <Heading
                variant="ultratitle"
                sx={{
                  fontSize: ['2.5rem', '3rem', '3.5rem'],
                  background: orangeGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                }}
              >
                Imagine a world...
              </Heading>
            </Fade>
            <Fade bottom delay={200}>
              <Text
                variant="lead"
                sx={{
                  color: 'white',
                  opacity: 0.95,
                  mb: 2,
                  maxWidth: 500,
                }}
              >
                ...where coding is more than just <b>debugging alone at 3AM</b> with cold pizza 🍕 and Stack Overflow tabs.
              </Text>
            </Fade>
            <Fade bottom delay={400}>
              <Heading
                variant="title"
                sx={{
                  color: 'orange',
                  mb: 3,
                }}
              >
                But plot twist: teens already built that world. Welcome to Hack Club.
              </Heading>
            </Fade>
            <Fade bottom delay={600}>
              <Text
                variant="lead"
                sx={{
                  color: 'white',
                  opacity: 0.95,
                  mb: 2,
                  maxWidth: 550,
                }}
              >
                This is the <b>clubhouse for creative chaos</b>, where you can ship memes, code, and dreams. No adults running the show. No cringe. Just teens, tech, and a little bit of magic. ✨
              </Text>
            </Fade>
            <Fade bottom delay={800}>
              <Text
                variant="lead"
                sx={{
                  color: 'white',
                  opacity: 0.95,
                  mb: 4,
                  maxWidth: 550,
                }}
              >
                <span style={{ color: '#ff9900', fontWeight: 700 }}>We’re the only club where you can push code, push boundaries, and push your luck at Mario Kart—all before lunch. 🚀</span>
                <br />
                <span style={{ color: '#ff9900', fontWeight: 700 }}>No gatekeeping. No boring lectures. Just pure, unfiltered hacker energy.</span>
              </Text>
            </Fade>
            <Flex sx={{ gap: 3, flexWrap: 'wrap', mb: 4 }}>
              <Fade left delay={1000}>
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
                    ':hover': { bg: 'white', color: 'orange', transform: 'translateY(-5px)' }
                  }}
                >
                  Join our Slack 💬
                </Button>
              </Fade>
              <Fade left delay={1200}>
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
                    ml: 2,
                    color: 'orange',
                    borderColor: 'orange',
                    ':hover': { bg: 'orange', color: 'black', transform: 'translateY(-5px)' }
                  }}
                >
                  Explore Programs 🚀
                </Button>
              </Fade>
            </Flex>
            <Fade left delay={1400}>
              <Text variant="caption" sx={{ mt: 2 }}>
                <Icon glyph="github" size={20} sx={{ verticalAlign: 'middle', mr: 2 }} />
                Proudly partnered with <b>GitHub</b>, <b>Arduino</b>, and more. <br />
                <span style={{ color: '#ff9900' }}>Warning: May cause excessive creativity and lifelong friendships. 🧡</span>
              </Text>
            </Fade>
          </Box>
          {/* Mobile optimized display of hero images */}
          <Box sx={{ position: 'relative' }}>
            <Slide right>
              <Image
                src="/home/flagship_4.jpg"
                alt="Hack Clubbers at Flagship, 2019"
                sx={{
                  width: '100%',
                  maxWidth: [300, 380, 480],
                  borderRadius: '2xl',
                  boxShadow: '0 8px 48px #ff660033',
                  objectFit: 'cover',
                  mx: 'auto',
                  display: 'block'
                }}
              />
              <Image
                src="/home/zephyr-spacex.jpeg"
                alt="Hack Clubbers at SpaceX HQ"
                sx={{
                  width: ['70%', '70%', '80%'],
                  maxWidth: [240, 300, 380],
                  borderRadius: '2xl',
                  boxShadow: '0 4px 24px #ff990055',
                  objectFit: 'cover',
                  mt: 3,
                  mx: 'auto',
                  display: ['none', 'block']
                }}
              />
            </Slide>
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
        <Fade bottom>
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
        </Fade>
        <Fade bottom delay={200}>
          <Text as="p" sx={{ fontSize: [2, 3], color: 'muted', mb: 5, maxWidth: 600 }}>
            <span role="img" aria-label="sparkles">✨</span> Dive into something wild: from hackathons in forests to coding on trains, there’s always something new. <span role="img" aria-label="rocket">🚀</span>
          </Text>
        </Fade>
        <Fade bottom delay={400}>
          <Carousel cards={carouselCards || []} />
        </Fade>
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
      <Fade bottom>
        <Heading
          as="h2"
          sx={{
            fontSize: [4, 5],
            fontWeight: 700,
            mb: 3,
            background: orangeGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Ready to get started?
        </Heading>
        <Text as="p" sx={{ fontSize: [2, 3], color: 'muted', mb: 4 }}>
          Join thousands of teens building the future. Sign up for our newsletter or hop into our Slack to meet other hackers!
        </Text>
        <Flex sx={{ justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
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
              transition: '0.2s',
              ':hover': { bg: 'white', color: 'orange' }
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
              ml: 2,
              ':hover': { bg: 'orange', color: 'black' }
            }}
          >
            Subscribe to Newsletter
          </Button>
        </Flex>
      </Fade>
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
        bottom: [16, 32],
        right: [16, 32],
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
          boxShadow: '0 2px 12px #ff660033',
          p: 3,
          fontSize: 3,
          width: 56,
          height: 56,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'box-shadow 0.2s, background 0.2s, color 0.2s, transform 0.2s',
          ':hover': { bg: 'white', color: 'orange', transform: 'translateY(-4px)' }
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
      {/* Animated background dots */}
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
        <Fade bottom>
          <Flex
            sx={{
              flexDirection: ['column', 'column', 'row'],
              alignItems: ['center', 'center', 'flex-start'],
              bg: 'rgba(24,24,27,0.95)',
              borderRadius: '2xl',
              boxShadow: '0 8px 48px #ff660033',
              p: [3, 4, 5],
              gap: [3, 4, 5]
            }}
          >
            <Box sx={{ flex: '0 0 auto', textAlign: 'center', mb: [2, 3, 0] }}>
              <Text sx={{ fontSize: [5, 6, 7], mb: [1, 2] }}>💬</Text>
              {/* You can swap the emoji for an SVG or image if you want */}
            </Box>
            <Box sx={{ flex: '1 1 0', minWidth: 0 }}>
              <Heading
                as="h2"
                sx={{
                  fontSize: [3, 4, 5],
                  fontWeight: 800,
                  mb: 2,
                  background: orangeGradient,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: ['center', 'center', 'left']
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
                  textAlign: ['center', 'center', 'left']
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
                    fontSize: [2, 3],
                    px: [3, 4, 5],
                    py: [2, 3],
                    borderRadius: 'circle',
                    boxShadow: '0 4px 24px #ff660055',
                    transition: '0.2s',
                    ':hover': { bg: 'white', color: 'orange' }
                  }}
                >
                  Join our Slack &rarr;
                </Button>
              </Box>
            </Box>
          </Flex>
        </Fade>
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
      {/* Animated background dots */}
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
        <Fade bottom>
          <Box
            sx={{
              bg: 'rgba(24,24,27,0.95)',
              borderRadius: '2xl',
              boxShadow: '0 8px 48px #ff660033',
              p: [3, 4, 5],
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
                <Text sx={{ fontSize: [5, 6, 7], mb: [1, 2] }}>📬</Text>
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
                    fontSize: [3, 4, 4],
                    textAlign: ['center', 'center', 'left']
                  }}
                >
                  Stay in the Loop
                </Heading>
                <Text
                  as="p"
                  variant="lead"
                  sx={{
                    color: 'muted',
                    mb: 3,
                    maxWidth: 500,
                    fontSize: [1, 2, 3],
                    textAlign: ['center', 'center', 'left']
                  }}
                >
                  Get the latest Hack Club news, events, and opportunities delivered straight to your inbox. No spam, just pure hacker goodness!
                </Text>
                <Box
                  as="form"
                  action="https://hackclub.com/api/newsletter"
                  method="POST"
                  sx={{
                    display: 'flex',
                    flexDirection: ['column', 'column', 'row'],
                    gap: 2,
                    alignItems: ['stretch', 'stretch', 'center'],
                    mt: 2,
                    width: '100%'
                  }}
                  target="_blank"
                >
                  <Input
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    sx={{
                      variant: 'forms.input',
                      bg: 'elevated',
                      color: 'text',
                      fontSize: [2, 2, 3],
                      borderRadius: 'default',
                      border: 'none',
                      width: '100%',
                      minWidth: 0,
                      flex: 1,
                      boxShadow: '0 2px 12px #ff660022',
                      '::placeholder': { color: 'muted', opacity: 1 },
                      p: 2
                    }}
                    aria-label="Full name"
                    autoComplete="name"
                  />
                  <Input
                    name="email"
                    type="email"
                    required
                    placeholder="Your email address"
                    sx={{
                      variant: 'forms.input',
                      bg: 'elevated',
                      color: 'text',
                      fontSize: [2, 2, 3],
                      borderRadius: 'default',
                      border: 'none',
                      width: '100%',
                      minWidth: 0,
                      flex: 1,
                      boxShadow: '0 2px 12px #ff660022',
                      '::placeholder': { color: 'muted', opacity: 1 },
                      p: 2
                    }}
                    aria-label="Email address"
                    autoComplete="email"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    sx={{
                      fontSize: [2, 2, 3],
                      px: [3, 4, 5],
                      py: 2,
                      borderRadius: 'circle',
                      boxShadow: '0 4px 24px #ff660055',
                      mt: [2, 2, 0],
                      width: ['100%', '100%', 'auto'],
                      fontWeight: 700,
                      letterSpacing: 'headline',
                      transition: '0.2s',
                      ':hover': { bg: 'white', color: 'orange' }
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Fade>
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
      <Container sx={{ maxWidth: 1100, position: 'relative', zIndex: 1 }}>
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'],
            alignItems: 'center',
            gap: [3, 4, 5]
          }}
        >
          <Fade left>
            <Box
              sx={{
                flex: ['1 1 auto', '1 1 auto', '0 0 400px'],
                width: '100%',
                maxWidth: [360, 400, 500],
                borderRadius: '2xl',
                overflow: 'hidden',
                boxShadow: '0 8px 48px #ff660033',
                mb: [3, 3, 0],
                mx: ['auto', 'auto', 0]
              }}
            >
              <Image
                src={OuternetImgFile}
                alt="Hack Clubbers gather in the great outdoors of Cabot, VT, for Outernet"
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover'
                }}
              />
            </Box>
          </Fade>
          <Fade right>
            <Box sx={{ flex: '1 1 0', px: [0, 0, 4], textAlign: ['center', 'center', 'left'] }}>
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
                  transition: '0.2s',
                  ':hover': { bg: 'white', color: 'orange' }
                }}
              >
                Learn More About Outernet
              </Button>
            </Box>
          </Fade>
        </Flex>
      </Container>
      {/* Orange accent and dots */}
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
      <Container sx={{ maxWidth: 1100, position: 'relative', zIndex: 1 }}>
        <Fade bottom>
          <Heading
            as="h2"
            sx={{
              fontSize: ['2rem', '2.5rem', '3rem'],
              fontWeight: 800,
              mb: [3, 4],
              background: orangeGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center'
            }}
          >
            Hack Club JUICE: Pop-Up Hacker Café in Shanghai 🇨🇳
          </Heading>
        </Fade>
        <Grid columns={[1, 2]} gap={[4, 5]} sx={{ alignItems: 'center', mt: [3, 4] }}>
          <Box>
            <Fade left>
              <Image
                src="/home/juice-airport.jpg"
                alt="Hack Clubbers at the airport heading to Shanghai for JUICE"
                sx={{
                  width: '100%',
                  maxWidth: 420,
                  borderRadius: '2xl',
                  boxShadow: '0 8px 48px #ff660033',
                  objectFit: 'cover',
                  mb: 3,
                  mx: 'auto',
                  display: 'block'
                }}
              />
              <Image
                src="/home/juice-hotel.jpg"
                alt="Hack Clubbers at the hotel in Shanghai for JUICE"
                sx={{
                  width: '100%',
                  maxWidth: 420,
                  borderRadius: '2xl',
                  boxShadow: '0 8px 48px #ff990055',
                  objectFit: 'cover',
                  mx: 'auto',
                  display: 'block'
                }}
              />
            </Fade>
          </Box>
          <Box>
            <Fade right>
              <Text
                as="p"
                sx={{
                  fontSize: [2, 3],
                  color: 'muted',
                  mb: 3,
                  lineHeight: 1.6
                }}
              >
                <b>Announcing Hack Club’s next grand adventure, JUICE!!</b> <br />
                This April, 30+ Hack Clubbers traveled to Shanghai, China 🇨🇳, to run <b>#juice</b>—the world’s first pop-up hacker cafe! For 2 months, Hack Clubbers built their own video games, all completely <b>languageless</b> (no spoken or written words)! Then, for 7 days, we demoed our games in a pop-up cafe for anyone off the streets of Shanghai to come in and play.
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
                  transition: '0.2s',
                  ':hover': { bg: 'white', color: 'orange' }
                }}
              >
                Learn More About JUICE
              </Button>
            </Fade>
          </Box>
        </Grid>
      </Container>
      {/* Orange accent and dots */}
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

// Fix for TopicsSection function - the function was missing in our implementation
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
      <Container sx={{ maxWidth: 1100, position: 'relative', zIndex: 1 }}>
        <Fade bottom>
          <Heading
            variant="title"
            sx={{
              fontSize: ['1.75rem', '2.25rem', '2.5rem'],
              background: orangeGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
              mb: [4, 5]
            }}
          >
            What You'll Actually Do Here
          </Heading>
        </Fade>
        <Grid columns={[1, 1, 3]} gap={[4, 4, 5]}>
          {topics.map((t, i) => (
            <Slide
              key={i}
              {...(i === 0 ? { left: true } : i === 1 ? { bottom: true } : { right: true })}
              delay={i * 100}
            >
              <Box
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
                  }
                }}
              >
                <Text sx={{ fontSize: [4, 5, 6], mb: 2 }}>{t.icon}</Text>
                <Heading as="h3" sx={{ color: 'orange', mb: 2, fontSize: [2, 3] }}>{t.title}</Heading>
                <Text sx={{ color: 'muted', fontSize: [1, 2] }}>{t.desc}</Text>
              </Box>
            </Slide>
          ))}
        </Grid>
      </Container>

      {/* Orange accent and dots */}
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
      <Container sx={{ maxWidth: 1200, position: 'relative', zIndex: 1 }}>
        <Heading
          as="h2"
          sx={{
            fontSize: ['1.75rem', '2.25rem', '2.5rem', '3rem'],
            fontWeight: 800,
            mb: [3, 4, 5],
            background: orangeGradient,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
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
                gap: [3, 4, 5]
              }}
            >
              <Slide
                left={i % 2 === 0}
                right={i % 2 !== 0}
                duration={900}
              >
                <Box
                  sx={{
                    flex: ['1 1 auto', '1 1 auto', '0 0 340px'],
                    width: '100%',
                    maxWidth: [300, 340, 420],
                    borderRadius: '2xl',
                    overflow: 'hidden',
                    boxShadow: '0 8px 48px #ff660033',
                    mb: [3, 3, 0],
                    mx: ['auto', 'auto', 0]
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
              </Slide>
              <Fade bottom duration={900}>
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
                      maxWidth: [null, null, 500]
                    }}
                  >
                    {item.desc}
                  </Text>
                </Box>
              </Fade>
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
        />
        {/* Brand colors for theme-ui (optional, if not already in theme.js) */}
        <style>{`
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
            width: 100vw;
            box-sizing: border-box;
          }
          #__next {
            width: 100vw;
            overflow-x: hidden;
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
    // Use a try-catch with require for better error handling during build
    try {
      const fs = require('fs');
      const path = require('path');
      const carouselPath = path.join(process.cwd(), 'lib', 'carousel.json');
      
      if (fs.existsSync(carouselPath)) {
        carouselCards = JSON.parse(fs.readFileSync(carouselPath, 'utf8'));
      } else {
        console.warn('carousel.json file not found, using empty array instead');
      }
    } catch (err) {
      console.error("Error loading carousel data:", err.message || err);
    }
  } catch (err) {
    console.error("Error in getStaticProps:", err.message || err);
  }

  return {
    props: {
      carouselCards: carouselCards || []
    }
  }
}
