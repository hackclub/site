import React from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { Heading, Container, Button, Text, Image } from 'theme-ui'
import NextLink from 'next/link'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import theme from '../lib/theme'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Icon from '../components/icon'
import Footer from '../components/footer'

// Credit for animation from https://codepen.io/igli/pen/mPMqGz?html-preprocessor=none
const animation1 = keyframes`
  0% {
    clip: rect(62px, 9999px, 68px, 0);
  }
  5% {
    clip: rect(45px, 9999px, 9px, 0);
  }
  10% {
    clip: rect(9px, 9999px, 76px, 0);
  }
  15% {
    clip: rect(89px, 9999px, 83px, 0);
  }
  20% {
    clip: rect(44px, 9999px, 8px, 0);
  }
  25% {
    clip: rect(59px, 9999px, 24px, 0);
  }
  30% {
    clip: rect(96px, 9999px, 51px, 0);
  }
  35% {
    clip: rect(38px, 9999px, 28px, 0);
  }
  40% {
    clip: rect(92px, 9999px, 1px, 0);
  }
  45% {
    clip: rect(63px, 9999px, 80px, 0);
  }
  50% {
    clip: rect(1px, 9999px, 49px, 0);
  }
  55% {
    clip: rect(7px, 9999px, 49px, 0);
  }
  60% {
    clip: rect(35px, 9999px, 16px, 0);
  }
  65% {
    clip: rect(93px, 9999px, 72px, 0);
  }
  70% {
    clip: rect(55px, 9999px, 52px, 0);
  }
  75% {
    clip: rect(58px, 9999px, 68px, 0);
  }
  80% {
    clip: rect(94px, 9999px, 95px, 0);
  }
  85% {
    clip: rect(81px, 9999px, 24px, 0);
  }
  90% {
    clip: rect(98px, 9999px, 12px, 0);
  }
  95% {
    clip: rect(2px, 9999px, 96px, 0);
  }
  100% {
    clip: rect(95px, 9999px, 47px, 0);
  }
`
const animation2 = keyframes`
  0% {
    clip: rect(57px, 9999px, 7px, 0);
  }
  5% {
    clip: rect(61px, 9999px, 22px, 0);
  }
  10% {
    clip: rect(34px, 9999px, 47px, 0);
  }
  15% {
    clip: rect(92px, 9999px, 40px, 0);
  }
  20% {
    clip: rect(6px, 9999px, 40px, 0);
  }
  25% {
    clip: rect(39px, 9999px, 46px, 0);
  }
  30% {
    clip: rect(33px, 9999px, 17px, 0);
  }
  35% {
    clip: rect(5px, 9999px, 17px, 0);
  }
  40% {
    clip: rect(40px, 9999px, 70px, 0);
  }
  45% {
    clip: rect(14px, 9999px, 34px, 0);
  }
  50% {
    clip: rect(26px, 9999px, 30px, 0);
  }
  55% {
    clip: rect(15px, 9999px, 100px, 0);
  }
  60% {
    clip: rect(10px, 9999px, 32px, 0);
  }
  65% {
    clip: rect(49px, 9999px, 61px, 0);
  }
  70% {
    clip: rect(61px, 9999px, 22px, 0);
  }
  75% {
    clip: rect(85px, 9999px, 36px, 0);
  }
  80% {
    clip: rect(38px, 9999px, 59px, 0);
  }
  85% {
    clip: rect(21px, 9999px, 88px, 0);
  }
  90% {
    clip: rect(46px, 9999px, 16px, 0);
  }
  95% {
    clip: rect(13px, 9999px, 35px, 0);
  }
  100% {
    clip: rect(75px, 9999px, 13px, 0);
  }
`

const Blinking = styled(Heading)`
  position: relative;
  display: inline-block;
  line-height: 1;
  &:before,
  &:after {
    content: '${props => props.children}';
    position: absolute;
    top: 0;
    color: ${theme.colors.smoke};
    background: ${theme.colors.dark};
    overflow: hidden;
    clip: rect(0, 512px, 0, 0);
  }
  &:after {
    left: 2px;
    text-shadow: -2px 0 ${theme.colors.red};
    animation: ${animation1} 2s infinite linear alternate-reverse;
  }
  &:before {
    left: -2px;
    text-shadow: -2px 0 ${theme.colors.cyan};
    animation: ${animation2} 4s infinite linear alternate-reverse;
  }
`

const Spinning = styled(Image)`
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation-name: spin;
  animation-duration: 10000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  aspect-ratio: 1;
`

const NotFoundPage = () => (
  <>
    <Meta as={Head} title="404" />
    <ForceTheme theme="dark" />
    <Nav color="primary" dark />
    <Container variant="narrow" sx={{ py: [5, 6], textAlign: 'center' }}>
      <Spinning
        sx={{ fontSize: [128, 256], textAlign: 'center', height: '1lh' }}
        src="/404/dinobox.svg"
      ></Spinning>
      <br />
      <Blinking as="h1" variant="title" sx={{ fontSize: [64, 128] }}>
        404!
      </Blinking>
      <Text
        mt={2}
        mb={4}
        color="muted"
        variant="lead"
        sx={{ display: 'block' }}
      >
        We&nbsp;couldn’t&nbsp;find&nbsp;that&nbsp;page.
      </Text>
      <NextLink href="/" passHref>
        <Button as="a" variant="cta">
          <Icon glyph="home" size={32} />
          Go Home
        </Button>
      </NextLink>
    </Container>
    <Footer dark />
  </>
)

export default NotFoundPage
