import { Box, Container, Heading } from 'theme-ui'
import {
  PillHolder,
  AuthorPill,
  DatePill
} from '../../../components/announcements/pills'
import Head from 'next/head'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import theme from '../../../lib/theme'
import Meta from '@hackclub/meta'
import Nav from '../../../components/nav'
import ForceTheme from '../../../components/force-theme'
import Footer from '../../../components/footer'
import Copy from '../../../components/announcements/hcb-mobile.mdx'
import HCBCTA from '../../../components/announcements/hcb_cta'
import AnnouncementHolder from '../../../components/announcements/holder'
import Balancer from 'react-wrap-balancer'

const StyledLink = styled.a`
  text-decoration: underline;
  color: ${theme.colors.white};
`

const Link = props => {
  const { href } = props
  return (
    <NextLink href={href} passHref legacyBehavior>
      <StyledLink>{props.children}</StyledLink>
    </NextLink>
  );
}

const MobilePage = () => (
  <>
    <Meta
      as={Head}
      title="HCB Mobile is here!"
      description="Manage your HCB organizations on the go. Issue cards, view transactions, and more!"
      image="/hc-cdn/9fc32ee8cbc1a6a1ce93609b9822d6bae394dc7a_opengraph.png"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        bg: 'rgb(104, 41, 205)',
        backgroundImage: theme => theme.util.gx('purple', 'orange')
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
          <Link href="/fiscal-sponsorship">HCB</Link> Mobile is here!
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
            Manage your HCB organizations on the go. Issue cards, view
            transactions, and more!
          </Heading>
        </Balancer>
      </Container>
    </Box>
    <AnnouncementHolder>
      <PillHolder>
        <AuthorPill
          firstName="Mohamad"
          tag="Mohamad Mortada"
          image="https://github.com/thedev132.png"
        />
        <DatePill tag="Dec 2, 2025" />
      </PillHolder>
      <Copy />
    </AnnouncementHolder>
    <HCBCTA />
    <Footer />
  </>
)

export default MobilePage
