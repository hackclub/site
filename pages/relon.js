import {
  Avatar,
  Badge,
  BaseStyles,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text
} from 'theme-ui'
import {
  PillHolder,
  AuthorPill,
  DatePill
} from '../components/announcements/pills'
import Head from 'next/head'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import theme from '../lib/theme'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import ElonCopy from '../components/announcements/relon.mdx'
import Amount from '../components/announcements/amount'
import SlackCTA from '../components/announcements/cta'
import AnnouncementHolder from '../components/announcements/holder'

const StyledLink = styled.a`
  text-decoration: none;
  color: ${theme.colors.white};
`

const RelonLink = props => {
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
      title="Elon Musk's $1M Donation"
      description="We’re thrilled to announce Elon Musk has donated $1M to Hack Club, a global nonprofit network of high school hackers & coding clubs."
      image="https://cloud-6w46cupdh-hack-club-bot.vercel.app/0social-card.png"
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
          Elon Musk is donating <Amount amount="$1,000,000" /> to{' '}
          <RelonLink href="/">Hack Club</RelonLink>
        </Heading>
      </Container>
    </Box>
    <AnnouncementHolder>
      <PillHolder>
        <AuthorPill
          firstName="Christina"
          tag="Christina Asquith, COO"
          image="https://hackclub.com/team/christina.jpg"
        />
        <AuthorPill
          firstName="Zach"
          tag="Zach Latta, founder"
          image="https://hackclub.com/team/zach.jpg"
        />
        <DatePill tag="Oct 8, 2021" />
      </PillHolder>
      <ElonCopy />
    </AnnouncementHolder>
    <SlackCTA />
    <Footer />
  </>
)

export default RelonPage
