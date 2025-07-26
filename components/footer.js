import React from 'react'
import styled from '@emotion/styled'
import { Box, Container, Image, Grid, Heading, Link, Text } from 'theme-ui'
import NextLink from 'next/link'
import theme from '@hackclub/theme'
import Icon from './icon'

const Base = styled(Box, { shouldForwardProp: prop => prop !== 'dark' })`
  background: ${props =>
    props.dark
      ? `${theme.colors.darker} radial-gradient(${theme.colors.black} 1px, transparent 1px)`
      : `${theme.colors.snow} url('/pattern.svg') repeat`};
  ${props =>
    props.dark &&
    `
      background-size: ${theme.space[4]}px ${theme.space[4]}px;
    `} @media print {
    display: none;
  }
`

const Logo = props => (
  <Image
    src="/branding/hhs-white-wo-white.avif"
    alt="Happy Hacking Space logo"
    width={128}
    height={45}
    {...props}
  />
)

const Service = ({ href, icon, name = '', ...props }) => (
  <Link
    target="_blank"
    rel="noopener me"
    href={href}
    title={`Happy Hacking Space on ${name ? name : icon}`}
    {...props}
  >
    <Icon glyph={icon} />
  </Link>
)

const Footer = ({
  dark = false,
  email = 'team@happyhacking.space',
  children = undefined,
  ...props
}) => (
  <Base
    color={dark ? 'muted' : 'slate'}
    py={[4, 5]}
    dark={dark}
    sx={{ textAlign: 'left' }}
    as="footer"
    {...props}
  >
    <Container px={[3, null, 4]}>
      {children}
      <Grid
        as="article"
        gap={[2, 4]}
        columns={[2, 3, 4]}
        sx={{
          px: 0,
          a: {
            textDecoration: 'none',
            color: 'muted',
            transition: '0.125s color ease-in-out',
            ':hover,:focus': { color: 'slate', textDecoration: 'underline' }
          },
          '> div > a': {
            display: 'block',
            mb: 2
          },
          'h2,p': { color: 'muted' },
          h2: { fontSize: 3 },
          'a,p': { fontSize: 2 }
        }}
      >
        <Box>
          <Heading as="h2" variant="subheadline" mb={3}>
            Happy Hacking Space
          </Heading>
          <NextLink href="/philosophy" passHref>
            <Link>Philosophy</Link>
          </NextLink>
          <NextLink href="/team" passHref>
            <Link>Our Team & Board</Link>
          </NextLink>
          {/* <NextLink href="/jobs" passHref>
            <Link>Jobs</Link>
          </NextLink> */}
          <NextLink href="/brand" passHref>
            <Link>Branding</Link>
          </NextLink>
          {/* <NextLink href="/press" passHref>
            <Link>Press Inquiries</Link>
          </NextLink> */}
          {/* <NextLink href="/philanthropy" passHref>
            <Link>Donate</Link>
          </NextLink> */}
        </Box>
        {/* <Box>
          <Heading as="h2" variant="subheadline" mb={3}>
            Resources
          </Heading>
          <Link href="https://hackclub.com/pizza">Clubs Pizza Grant</Link>
          <Link href="https://events.hackclub.com/">Community Events</Link>
          <Link href="https://jams.hackclub.com/">Jams</Link>
          <Link href="https://toolbox.hackclub.com/">Toolbox</Link>
          <Link href="https://directory.hackclub.com/">Clubs Directory</Link>
          <Link href="https://hackclub.com/conduct/">Code of Conduct</Link>
        </Box> */}
        <Box sx={{ gridColumn: ['span 2', 'span 1'] }}>
          <Logo aria-label="Happy Hacking Space logo" width={128} height={45} />
          <Grid
            columns={[8, 4]}
            gap={2}
            sx={{
              alignItems: 'center',
              ml: -1,
              my: 3,
              maxWidth: [null, 192],
              svg: { fill: 'currentColor', width: 32, height: 32 },
              a: {
                lineHeight: 0,
                mb: 0,
                transition:
                  'transform .125s ease-in-out, color .125s ease-in-out',
                ':hover,:focus': { transform: 'scale(1.125)' }
              },
              placeItems: 'center'
            }}
          >
            <Service
              href="https://join.happyhacking.space"
              icon="welcome"
              name="Community"
              target="_self"
            />
            <Service
              href="https://twitter.com/happyhackings"
              icon="twitter"
              name="Twitter"
            />
            <Service
              href="https://github.com/happyhackingspace"
              icon="github"
              name="GitHub"
            />
            {/* <Service
              href="https://figma.com/@hackclub"
              icon="figma-fill"
              name="Figma"
            /> */}
            {/* <Service
              href="https://social.dino.icu/@hackclub"
              icon="mastodon"
              name="Mastodon"
            /> */}
            <Service
              href="https://www.youtube.com/c/HappyHackingSpace"
              icon="youtube"
              name="YouTube"
            />
            <Service
              href="https://www.instagram.com/happyhackingspace"
              icon="instagram"
              name="Instagram"
            />
            <Service href={`mailto:${email}`} icon="email-fill" name="Email" />
          </Grid>
          {/* <Text my={2}>
            <Link href="tel:1-855-625-HACK">1-855-625-HACK</Link>
            <br />
            <Text as="span" color="muted">
              (call toll-free)
            </Text>
          </Text> */}
        </Box>
      </Grid>
      <Text as="p" variant="caption" sx={{ mt: 3 }}>
         © {new Date().getFullYear()} Happy Hacking Space. {/* 501(c)(3) nonprofit (EIN: 81-2908499) */}
      </Text>
    </Container>
  </Base>
)

export default Footer
