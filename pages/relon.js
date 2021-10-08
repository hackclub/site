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
import Head from 'next/head'
import NextLink from 'next/link'
import styled from '@emotion/styled'
import theme from '../lib/theme'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import Icon from '../components/icon'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'

import Amount from '../components/relon/amount' // TODO should move this file to a more logical place... maybe inline?
// FIXME: use new copy here :)
import ElonCopy from '../components/relon/copy.mdx'

const StyledLink = styled.a`
  //text-decoration: none;
  color: ${theme.colors.white};
`;

const RelonLink = (props) => {
  const {href} = props
  return (
    <NextLink href={href} passHref>
      <StyledLink>
        {props.children}
      </StyledLink>
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
          {/* TODO fix link styling */}
          Elon Musk is donating <Amount /> to <RelonLink href="/">Hack Club</RelonLink>
        </Heading>
      </Container>
    </Box>
    <Container
      as={BaseStyles}
      variant="copy"
      sx={{
        py: [4, 5],
        fontSize: [2, 3],
        h1: {
          textAlign: ['left', 'center'],
          color: 'cyan',
          my: 4,
          a: { color: 'inherit' }
        }
      }}
    >
      <Flex
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          div: {
            mt: 1,
            mb: 3,
            //bg: 'white',
            color: 'muted',
            border: '1px solid',
            borderColor: 'border',
            bg: 'snow',
            fontSize: 2,
            fontWeight: 'body',
            lineHeight: '36px'
          }
        }}
      >
        <Badge
          variant="pill"
          sx={{
            mr: [2, 3],
            pl: 0,
            pr: 3,
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            src="https://hackclub.com/team/christina.jpg"
            alt="Christina"
            size={36}
            mr={2}
          />
          Christina Asquith, COO
        </Badge>
        <Badge
          variant="pill"
          sx={{
            mr: [2, 3],
            pl: 0,
            pr: 3,
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            src="https://hackclub.com/team/zach.jpg"
            alt="Zach"
            size={36}
            mr={2}
          />
          Zach Latta, Founder
        </Badge>
      </Flex>
      <Heading as="h4" variant="headline" py={3} sx={{'textAlign': 'center',}}>
        Friday, October 8th, 2021
      </Heading>
      <ElonCopy />
    </Container>
    <Box
      as="section"
      sx={{
        bg: 'orange',
        backgroundImage: t => t.util.gx('yellow', 'orange'),
        color: 'white',
        py: [4, 5]
      }}
    >
      <Grid gap={[3, 4]} columns={[null, 'auto 1fr']} variant="layout.copy">
        <Icon glyph="welcome" size={72} />
        <Box>
          <Heading as="h2" variant="headline" mt={0}>
            Teenager? New here? Welcome!
          </Heading>
          <Text variant="subtitle" sx={{ lineHeight: 'caption', mb: 3 }}>
            Hack Club is a global community of high school makers & student-led
            coding clubs. We’ve got a 24/7 Slack chatroom of 10k+ teenagers
            learning to code & building amazing projects, & you’ll fit right in.
          </Text><br /><br />
          <NextLink href="/" passHref>
            <Button bg="cyan" as="a">
              Learn more
            </Button>
          </NextLink>
        </Box>
      </Grid>
    </Box>
    <Footer />
  </>
)

export default RelonPage
