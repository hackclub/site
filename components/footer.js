import React from 'react'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Box, Container, Flex, Heading, Link, Text } from 'theme-ui'
import theme from '@hackclub/theme'
import Icon from './icon'

const Base = styled(Box)`
  background: ${props =>
    props.dark
      ? `${theme.colors.darker} radial-gradient(${theme.colors.black} 1px, transparent 1px)`
      : `${theme.colors.snow} url('https://hackclub.com/pattern.svg') repeat`};
  ${props =>
    props.dark &&
    `
      background-size: ${theme.space[4]}px ${theme.space[4]}px;
      h2 {
        color: ${theme.colors.muted};
      }
    `} @media print {
    display: none;
  }
`

const Columns = styled(Container)`
  max-width: 48rem !important;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${theme.space[2]}px;
  > div:last-of-type {
    grid-column: span 2;
  }
  @media (min-width: ${theme.breakpoints[1]}) {
    grid-gap: ${theme.space[4]}px;
    grid-template-columns: repeat(3, 1fr);
    > div:last-of-type {
      grid-column: span 1;
    }
  }
  a {
    text-decoration: none;
    color: ${theme.colors.muted} !important;
  }
  h2,
  p {
    color: ${theme.colors.muted};
  }
  h2 {
    font-size: ${theme.fontSizes[3]}px;
  }
  a,
  p {
    font-size: ${theme.fontSizes[2]}px;
  }
`

const Services = styled(Flex)`
  a {
    line-height: 0;
  }
  svg {
    fill: currentColor;
    width: 32px;
    height: 32px;
  }
  @media (min-width: ${theme.breakpoints[1]}) {
    max-width: 12rem;
  }
`

const Service = ({ href, icon, ...props }) => (
  <Link
    target="_blank"
    rel="noopener"
    href={href}
    mr={2}
    mb={2}
    color="muted"
    title={`Hack Club on ${icon}`}
    children={<Icon glyph={icon} />}
    {...props}
  />
)

const Pages = styled(Box)`
  a {
    display: block;
    color: inherit;
    margin-bottom: ${theme.space[2]}px;
  }
`

const Footer = ({ dark = false, children, ...props }) => (
  <Base
    color={dark ? 'muted' : 'slate'}
    py={[4, 5]}
    dark={dark}
    sx={{ textAlign: 'left' }}
    as="footer"
    {...props}
  >
    {children}
    <Container px={[3, null, 4]}>
      <Columns px={0} as="article">
        <Box>
          <Heading as="h2" variant="subheadline" mb={3}>
            Hack Club
          </Heading>
          <Pages>
            <Link href="https://apply.hackclub.com/" children="Apply" />
            <Link href="https://hackclub.com/donate/" children="Donate" />
            <Link href="https://hackclub.com/team/" children="Team" />
            <Link href="https://hackclub.com/community/" children="Community" />
            <Link
              href="https://hackclub.com/philosophy/"
              children="Philosophy"
            />
            <Link href="https://hackclub.com/brand/" children="Branding" />
          </Pages>
        </Box>
        <Box>
          <Heading as="h2" variant="subheadline" mb={3}>
            Resources
          </Heading>
          <Pages>
            <Link
              href="https://hackclub.com/conduct/"
              children="Code of Conduct"
            />
            <Link href="https://workshops.hackclub.com/" children="Workshops" />
            <Link href="https://hackclub.com/night/" children="Hack Night" />
            <Link
              href="https://hackathons.hackclub.com/"
              children="Hackathons"
            />
            <Link href="https://hackclub.com/bank/" children="Bank" />
            <Link href="https://hackclub.com/map/" children="Map" />
          </Pages>
        </Box>
        <Box>
          <Heading as="h2" variant="subheadline" mb={3}>
            Join the Club
          </Heading>
          <Services sx={{ flexWrap: 'wrap', alignItems: 'center', ml: -1 }}>
            <Service href="/community/" icon="slack-fill" target="_self" />
            <Service href="https://twitter.com/hackclub" icon="twitter" />
            <Service href="https://github.com/hackclub" icon="github" />
            <Service
              href="https://www.facebook.com/Hack-Club-741805665870458"
              icon="facebook"
            />
            <Service href="https://medium.com/hackclub" icon="medium" />
            <Service
              href="https://www.youtube.com/channel/UCQzO0jpcRkP-9eWKMpJyB0w"
              icon="youtube"
            />
            <Service
              href="https://www.instagram.com/starthackclub"
              icon="instagram"
            />
            <Service href="mailto:team@hackclub.com" icon="email" />
          </Services>
          <Text my={2}>
            <Link href="tel:1-855-625-HACK">1-855-625-HACK</Link>
            <br />
            <Text as="span" color="muted" children="(call toll-free)" />
          </Text>
          <Text mt={[3, 4]}>
            <Link
              href="https://hackclub.com/press/"
              children="Press Inquiries"
            />
          </Text>
        </Box>
      </Columns>
      <Text as="p" fontSize={3} color="muted" mt={[3, 4]}>
        Mail: 8605 Santa Monica Blvd #86294, West Hollywood, CA 90069
      </Text>
      <Text
        as="p"
        sx={{
          borderTop: '1px solid',
          borderColor: dark ? 'black' : 'smoke',
          mt: 3,
          pt: 2
        }}
        fontSize={3}
        color="muted"
      >
        © {new Date().getFullYear()} Hack Club. 501(c)(3) nonprofit (EIN:
        81-2908499)
      </Text>
    </Container>
  </Base>
)

export default Footer
