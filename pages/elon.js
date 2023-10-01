import { Box, Container, Heading, Text } from 'theme-ui'
import {
  PillHolder,
  AuthorPill,
  DatePill
} from '../components/announcements/pills'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import ElonCopy from '../components/announcements/elon.mdx'
import SlackCTA from '../components/announcements/cta'
import AnnouncementHolder from '../components/announcements/holder'

const ElonPage = () => (
  <>
    <Meta
      as={Head}
      title="Elon Musk is Giving $500K"
      description="We’re thrilled to announce Elon Musk has donated $500k to Hack Club, a global nonprofit network of high school hackers & coding clubs."
      image="https://assets.hackclub.com/log/HC-500k@1080w.png"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        bg: 'rgb(104, 41, 205)',
        backgroundImage: theme => theme.util.gx('yellow', 'green')
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
          Hack Club “makes me feel <span>much more optimistic</span>{' '}
          about&nbsp;the future.”
        </Heading>
        <Text variant="headline">—Elon Musk</Text>
      </Container>
    </Box>
    <AnnouncementHolder>
      <PillHolder>
        <AuthorPill
          firstName="Zach"
          tag="Zach Latta, founder"
          image="https://hackclub.com/team/zach.jpg"
        />
        <DatePill tag="May 15, 2020" />
      </PillHolder>
      <ElonCopy />
    </AnnouncementHolder>
    <SlackCTA />
    <Footer />
  </>
)

export default ElonPage
