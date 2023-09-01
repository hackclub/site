import { Box, Card, Container, Flex, Link, Text } from 'theme-ui'
import { useEffect, useRef, useState } from 'react'
import { keyframes } from '@emotion/react'
import FlexCol from '../../components/flex-col'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Icon from '../../components/icon'
import Tilt from '../../components/tilt'

function Bullet({ glow = true, icon, href, children }) {
  let effectColours = [
    '#ec3750',
    '#ff8c37',
    '#f1c40f',
    '#33d6a6',
    '#5bc0de',
    '#338eda',
    '#a633d6'
  ]

  function keyframeGenerator(spread, blur, colours, opacity = 0.5) {
    let hexOpacity = Math.max(Math.min(Math.round(opacity * 255), 255), 0)
      .toString(16)
      .padStart(2, '0')

    let final = {}
    for (let i = 0; i <= 100; i++) {
      let baseX = Math.sin((i * Math.PI) / 50) // 50 keyframes for each pi radians
      let baseY = -Math.cos((i * Math.PI) / 50)

      // Ensure no scientific notation
      const roundFactor = 1_000_000
      baseX = Math.round(baseX * roundFactor) / roundFactor
      baseY = Math.round(baseY * roundFactor) / roundFactor

      let boxShadow = ''
      for (let c = 0; c < colours.length; c++) {
        // Rotate by 2pi / colours.length * c radians
        let x =
          baseX * Math.cos((2 * Math.PI * c) / colours.length) -
          baseY * Math.sin((2 * Math.PI * c) / colours.length)
        let y =
          baseX * Math.sin((2 * Math.PI * c) / colours.length) +
          baseY * Math.cos((2 * Math.PI * c) / colours.length)

        boxShadow += `${x * spread}px ${y * spread}px ${blur}px ${
          colours[c]
        }${hexOpacity},`
      }

      // Remove trailing comma
      boxShadow = boxShadow.slice(0, -1)

      final[i + '%'] = { boxShadow }
    }

    return final
  }

  const shadowSpread = glow ? 5 : 0
  const shadowBlur = glow ? 10 : 0
  const animatedBoxShadow = keyframes(
    keyframeGenerator(shadowSpread, shadowBlur, effectColours)
  )

  const borderWidth = '2px'

  return (
    <Tilt>
      <Flex
        as="a"
        {...(href && { href })}
        target="_blank"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,

          width: '20rem',

          borderWidth,
          borderRadius: '8px !important',
          p: '8px !important',

          textDecoration: 'none',
          color: 'inherit',

          backgroundColor: 'var(--theme-ui-colors-darkless)',

          '&:hover::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            boxShadow: `linear-gradient(60deg, ${effectColours[0]}, ${effectColours[1]}, ${effectColours[2]}, ${effectColours[3]}, ${effectColours[4]})`,
            borderRadius: 'inherit',
            zIndex: -1,
            animation: `${animatedBoxShadow} 5s ease infinite`
          }
        }}
      >
        <Icon glyph={icon} size={42} sx={{ color: 'red', flexShrink: 0 }} />
        <Box sx={{ textAlign: 'left' }}>{children}</Box>
        {href && (
          <Icon
            glyph="external-fill"
            size={32}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              translate: '50% -50%',
              color: 'muted'
            }}
          />
        )}
      </Flex>
    </Tilt>
  )
}

function BulletBox({ padding = '2rem', children }) {
  return (
    <Box
      as="ul"
      sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gridGap: '2rem',
        padding
      }}
    >
      {children}
    </Box>
  )
}

function Section({ id, children }) {
  return (
    <Flex as="section" id={id} sx={{ flexDirection: 'column', pt: 5 }}>
      {children}
    </Flex>
  )
}

export default function FiscalSponsorship() {
  const gridRef = useRef()
  const glowRef = useRef()

  const scrollPos = useRef(0)
  const mousePos = useRef([0, 0])

  const setGlowMaskPosition = () => {
    const finalPos = [
      -mousePos.current[0],
      -mousePos.current[1] + scrollPos.current
    ]
    glowRef.current.style.maskPosition = `${finalPos[0]}px ${finalPos[1]}px`
    glowRef.current.style.WebkitMaskPosition = `${finalPos[0]}px ${finalPos[1]}px`
  }

  useEffect(() => {
    const handleScroll = e => {
      scrollPos.current = -window.scrollY / 10

      gridRef.current.style.transform = `translateY(${scrollPos.current}px)`

      setGlowMaskPosition()
    }

    const handleMouseMove = e => {
      const x = e.clientX
      const y = e.clientY
      glowRef.current.style.left = x + 'px'
      glowRef.current.style.top = y + 'px'

      mousePos.current = [x, y]
      setGlowMaskPosition()
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <Box as="main" key="main" sx={{ position: 'relative' }}>
      <style>
        {`* {
            scroll-behavior: smooth;
          }
          p {
            text-wrap: balance;
          }
        `}
      </style>
      <Box
        ref={gridRef}
        sx={{
          position: 'fixed',
          inset: 0,
          height: '1000%',
          zIndex: -2,
          backgroundSize: '20px 20px',
          backgroundImage: `linear-gradient(to right,  #23262D 1px, transparent 1px), 
                                      linear-gradient(to bottom, #23262D 1px, transparent 1px) `,
          backgroundPosition: 'top left',
          maskImage: `linear-gradient(180deg, transparent 0%, white 3%)`
        }}
      />
      <Box
        ref={glowRef}
        sx={{
          pointerEvents: 'none',
          zIndex: -2,
          position: 'fixed',
          top: '0',
          left: '0',
          width: '20rem',
          height: '20rem',
          background: 'red',
          opacity: 0.2,
          borderRadius: '50%',
          filter: 'blur(2rem)',
          translate: '-50% -50%',
          // Mask it to the grid background
          maskImage: `linear-gradient(to right, #23262D 1px, transparent 1px), 
                                linear-gradient(to bottom, #23262D 1px, transparent 1px) `,
          maskSize: '20px 20px, 20px 20px, cover',
          maskPosition: '0px 0px'
        }}
      />
      <Nav dark />
      <ForceTheme theme="dark" />
      <Meta
        as={Head}
        title="Fiscal Sponsorship"
        description="What is fiscal sponsorship?"
        image="/hcb/og-image.png"
      >
        <title>Fiscal Sponsorship | HCB</title>
      </Meta>

      <Container sx={{ textAlign: 'center', mt: 6 }}>
        <FlexCol gap={4} alignItems="center">
          <FlexCol gap={4} alignItems="center">
            <Text variant="ultratitle">Fiscal sponsorship</Text>
            <Text variant="title">
              <Text
                sx={{
                  color: 'red',
                  textShadow: '0 0 50px var(--theme-ui-colors-red)'
                }}
              >
                501(c)(3)&nbsp;nonprofit{' '}
              </Text>
              status in just 24 hours for your mission
            </Text>
          </FlexCol>
          <Text variant="headline">
            Organizing an event, project, or organization to serve the public
            good or your community? Consider fiscal sponsorship before the pain
            of paperwork distracts you from your goals.
          </Text>

          <FlexCol gap={1} alignItems="center">
            <Text variant="headline">Jump to:</Text>
            <BulletBox padding="0">
              <Link sx={{ fontSize: 2 }} href="#costs-and-perks">
                Costs and perks of 501(c)(3) status
              </Link>
              <Link sx={{ fontSize: 2 }} href="#what-is">
                How fiscal sponsorship works
              </Link>
              <Link sx={{ fontSize: 2 }} href="#requirements">
                Requirements for fiscal sponsorship
              </Link>
              <Link sx={{ fontSize: 2 }} href="#partner">
                HCB, the #1 fiscal sponsor
              </Link>
            </BulletBox>
          </FlexCol>
          <Section id="costs-and-perks">
            <Text variant="title">
              Why organizers go after 501(c)(3) status
            </Text>
            <Text variant="lead">
              Every year, 1.6 million nonprofits in the U.S. apply for and renew
              501(c)(3) status through the IRS for charitable recognition and
              tax exemption for their funding. It can take anywhere from 2-12
              months to hear a decision back from the IRS, and in general,
              nonprofit organizers should be prepared for:
            </Text>
            <BulletBox>
              <Bullet glow={false} icon="sad">
                $3,000 in <b>up-front costs</b>, from
                <Link href="https://www.irs.gov/charities-non-profits/form-1023-and-1023-ez-amount-of-user-fee">
                  {' '}
                  forms{' '}
                </Link>
                to state fees to support from legal counsel
              </Bullet>
              <Bullet glow={false} icon="sad">
                The potential for the IRS to <b>reject</b> an application
              </Bullet>
              <Bullet glow={false} icon="sad">
                <b>Hiring</b> bookkeepers and accountants to prepare taxes and
                provide upkeep annually to stay in good standing
              </Bullet>
              <Bullet glow={false} icon="sad">
                <b>Closing costs</b> averaging around $5,000 if you lose or
                terminate status
              </Bullet>
            </BulletBox>
          </Section>
          <Text variant="lead">
            Legal status sounds great and all, but why go through the hassle of
            applying when it’s so expensive and time consuming?
          </Text>
          <Text variant="lead">
            Because as a legally recognized 501(c)(3) nonprofit in the U.S.,
            your organization gains access to loads of legal tax benefits like:
          </Text>
          <BulletBox>
            <Bullet icon="payment">
              The ability to receive <b>tax deductible donations</b> from
              sponsors.
            </Bullet>
            <Bullet icon="member-add">
              Reduced taxable income for your U.S. supporters, which
              <b> incentivizes giving</b>.
            </Bullet>
            <Bullet icon="leader">
              <b>Exemption</b> from U.S. federal income tax and unemployment
              tax.
            </Bullet>
            <Bullet icon="bolt">
              Potential exemption from state income, sales, and employment
              taxes.
            </Bullet>
            <Bullet icon="email">
              Potential for reduced rates on postage, marketing, advertising,
              legal counsel, and more.
            </Bullet>
          </BulletBox>
          <Text variant="lead">
            Unfortunately between the costs and time needed to organize a
            nonprofit, many charitable initiatives are prevented from exiting an
            idea phase or progressing at a pace originally hoped. Imagine how
            much more valuable impact could happen on the world if these
            barriers didn’t exist.
          </Text>
          <Text variant="lead">
            As it turns out, there’s an alternative route for startups,
            student-led initiatives, or anyone looking to avoid a headache with
            the IRS to obtain all the benefits of 501(c)(3) status. That’s where
            fiscal sponsorship comes in.
          </Text>
          <Section id="what-is">
            <Text variant="title">Fiscal Sponsorship?</Text>
            <Text variant="lead">
              By legally working with an existing nonprofit offering fiscal
              sponsorship, projects and events can claim most of the legal
              benefits of individual 501(c)(3) status. Piggy-backing off this
              existing status, organizations also gain access to resources from
              their fiscal sponsor like:
            </Text>
            <BulletBox>
              <Bullet icon="docs">
                Bookkeeping and administration to ensure that all paperwork and
                taxes are filed
              </Bullet>
              <Bullet icon="bag">
                Fully established HR and benefits, which can vary by the fiscal
                sponsor
              </Bullet>
              <Bullet icon="admin">
                Waived responsibility to organize a board of directors
              </Bullet>
              <Bullet icon="payment">
                Fully transparent operational fees, typically ranging from 7-12%
                that prevent you from paying typical operating costs.
              </Bullet>
              <Bullet icon="door-leave">
                The ability to terminate your fiscal sponsorship agreement and
                file for separate tax-exempt status at any point.
              </Bullet>
            </BulletBox>
            <Text variant="lead">
              If you’re brand new to nonprofit organizing or unsure where your
              project will take you, fiscal sponsorship is a great tool to help
              manage your finances and gauge whether becoming an independent
              nonprofit down the line is practical or financially feasible.
            </Text>
          </Section>
          <Section id="requirements">
            <Text variant="title">Requirements for Fiscal Sponsorship</Text>
            <Text variant="lead">
              Depending on the fiscal sponsor you choose, requirements for
              working together can vary. Fiscal sponsors generally ask that your
              nonprofit’s goals be similar to theirs. They also usually ask that
              your organization or event commits to remaining charitable in
              nature and refrains from activities that may result in loss of
              501(c)(3) status.
            </Text>
          </Section>

          <Section id="partner">
            <Text variant="title">HCB, the #1 fiscal sponsor</Text>
            <Text variant="lead">
              While many fiscal sponsors require that their partners relate to
              their mission in similar ways, at HCB, we’ve built our
              infrastructure to support hundreds of causes in all areas of
              charitability.
            </Text>
            <Text variant="lead">
              Check out some of the resources we’ve built our fiscal sponsorship
              foundation on:
            </Text>
            <BulletBox>
              <Bullet icon="bank-account">
                A beautiful web interface to manage finances
              </Bullet>
              <Bullet icon="transactions">
                Fee-free invoicing, ACH or check transfers, and reimbursements
              </Bullet>
              <Bullet icon="link">
                A customizable and embeddable donations URL
              </Bullet>
              <Bullet icon="card-add">
                A fun and routing number to connect to external platforms, like
                Shopify and GoFundMe
              </Bullet>
              <Bullet icon="purse">
                Perks like PVSA certification, newsletter software, and
                1Password credits
              </Bullet>
            </BulletBox>
            <Text variant="lead">
              Looking for nonprofit status and not a religious or political
              organization? We’d love to meet you and chat about working
              together. Feel free to apply
              <Link href="https://hackclub.com/hcb/#apply"> here </Link>or
              <Link href="mailto:hcb@hackclub.com"> email our team </Link>if you
              have more questions about fiscal sponsorship!
            </Text>
          </Section>

          <Text variant="lead">
            At its core, Hack Club is a nonprofit encouraging students to learn
            how to code by building and making cool things. HCB was built out by
            teenagers at Hack&nbsp;Club and continues to be a real-world space
            that high schoolers can contribute to every day.
          </Text>
        </FlexCol>
      </Container>
      <Box
        sx={{
          height: '100px',
          position: 'relative',
          width: '100%',
          overflow: 'hidden',

          '&::after': {
            content: '""',
            width: '500%',
            height: '100%',

            position: 'absolute',
            translate: '-50% 100%',
            boxShadow: '0 -64px 64px #17171d'
          }
        }}
      />
      <Footer dark />
    </Box>
  )
}
