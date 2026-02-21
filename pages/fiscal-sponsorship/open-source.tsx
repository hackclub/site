import { Box, Container, Heading } from 'theme-ui'
import {
  PillHolder,
  AuthorPill,
  DatePill
} from '../../components/announcements/pills'
import Head from 'next/head'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import theme from '../../lib/theme'
import Meta from '@hackclub/meta'
import Nav from '../../components/nav'
import ForceTheme from '../../components/force-theme'
import Footer from '../../components/footer'
import Copy from '../../components/announcements/hcb-open-source.mdx'
import SlackCTA from '../../components/announcements/cta'
import AnnouncementHolder from '../../components/announcements/holder'
import Balancer from 'react-wrap-balancer'

const StyledLink = styled.a`
  text-decoration: underline;
  color: ${theme.colors.white};
`

const Link = props => {
  const { href } = props
  return (
    <NextLink href={href} passHref>
      <StyledLink>{props.children}</StyledLink>
    </NextLink>
  )
}

const RelonPage = () => (
  <>
    <Meta
      as={Head}
      title="HCB is now open source!"
      description="Our fiscal sponsorship platform’s codebase is now publicly available under the AGPL license and we’re continuing to encourage transparency amongst nonprofits."
      image="https://cdn.hackclub.com/019c76b8-802d-74e1-9980-f509a8d9bfd6/I2o1xg.png"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        bg: 'rgb(104, 41, 205)',
        backgroundImage: (t: any) => t.util.gx('purple', 'orange')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading
          as="h1"
          variant="title"
          sx={{
            fontSize: [5, 6, null, 7],
            span: {
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
          <Link href="/fiscal-sponsorship">HCB</Link> is now open source!
        </Heading>
        <Balancer>
          <Heading
            as="h2"
            variant="title"
            sx={{
              fontSize: [3, 4, 4, 4],
              fontWeight: 400,
              marginTop: '24px',
              maxWidth: '900px',
              mx: 'auto'
            }}
          >
            Our fiscal sponsorship platform’s{' '}
            <Link href="https://github.com/hackclub/hcb">codebase</Link> is now
            publicly available under the AGPL license and we’re continuing to
            encourage transparency amongst nonprofits.
          </Heading>
        </Balancer>
      </Container>
    </Box>
    <AnnouncementHolder>
      <PillHolder>
        <AuthorPill
          firstName="Sam"
          tag="Sam Poder"
          image="https://github.com/sampoder.png"
        />
        <AuthorPill
          firstName="Ian"
          tag="Ian Madden"
          image="https://cdn.hackclub.com/019c76b7-3337-718e-b630-818f2a4340bd/m11HEg.png"
        />
        <AuthorPill
          firstName="Gary"
          tag="Gary Tou"
          image="https://github.com/garyhtou.png"
        />
        <AuthorPill
          firstName="Manu"
          tag="Manu Gurudath"
          image="https://github.com/manuthecoder.png"
        />
        <AuthorPill
          firstName="Ruien"
          tag="Ruien Luo"
          image="https://github.com/rluodev.png"
        />
        <DatePill tag="Mar 29, 2025" />
      </PillHolder>
      <Copy />
    </AnnouncementHolder>
    <SlackCTA />
    <Footer />
  </>
)

export default RelonPage
