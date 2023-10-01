import { Box, Button, Container, Heading, Text } from 'theme-ui'
import theme from '@hackclub/theme'
import Meta from '@hackclub/meta'
import Icon from '@hackclub/icons'
import Head from 'next/head'
import Nav from '../../components/nav'
import Footer from '../../components/footer'

const DeprecatedPage = ({ page: { name, desc, icon, link } = {} }) => (
  <>
    <Nav dark />
    <Meta
      as={Head}
      title={name}
      desc={`Hack Club no longer offers ${name}. Learn more here.`}
      image={`https://workshop-cards.hackclub.com/${encodeURIComponent(
        name
      )}.png?theme=dark&caption=deprecated&fontSize=250px&brand=HQ`}
    />
    <Box
      as="main"
      sx={{
        bg: 'dark',
        color: 'muted',
        pt: [5, 6],
        pb: [4, 5],
        textAlign: 'center'
      }}
    >
      <Container variant="narrow" as="article">
        <Icon size={128} glyph={icon} />
        <Heading as="h1" variant="title" sx={{ color: 'snow', my: [2, 3] }}>
          We no longer offer {name}.
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mb: 4 }}>
          {desc}
        </Heading>
        <Button as="a" href={link}>
          Check it out »
        </Button>
      </Container>
    </Box>
    <Footer dark />
  </>
)

export default DeprecatedPage

const pages = {
  cloud9: {
    name: 'Cloud9',
    desc: 'Cloud9 has been replaced by repl.it, a newer online IDE.',
    link: 'https://repl.it/?ref=hackclub',
    icon: 'terminal'
  },
  challenge: {
    name: 'Challenge',
    desc: 'If you miss Hack Club Challenge, check out Scrapbook!',
    link: 'https://scrapbook.hackclub.com/',
    icon: 'sticker'
  },
  tech_domains: {
    name: '.TECH domains',
    desc: 'If you’re looking for a domain, you can get one via the Hack Pack.',
    link: 'https://hack.af/pack',
    icon: 'web'
  },
  pack: {
    name: 'the Hack Pack',
    desc: 'GitHub still offers the GitHub Student Developer Pack through the standard application flow.',
    link: 'https://education.github.com/pack',
    icon: 'github'
  }
}

export const getStaticPaths = () => {
  const paths = Object.keys(pages).map(key => ({ params: { deprecated: key } }))
  return { paths, fallback: false }
}

export const getStaticProps = ({ params }) => {
  const page = pages[params.deprecated]
  return { props: { page } }
}
