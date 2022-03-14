import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import PrestonWernerCopy from '../components/announcements/preston-werner-2022.mdx'
import Amount from '../components/announcements/amount'
import SlackCTA from '../components/announcements/cta'
import AnnouncementHolder from '../components/announcements/holder'
import {
  PillHolder,
  AuthorPill,
  DatePill
} from '../components/announcements/pills'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Tom and Theresa Preston-Werner are Giving $500K"
      description="We’re thrilled to announce Tom and Theresa Preston-Werner have donated $500k to Hack Club, a global nonprofit network of high school hackers & coding clubs."
      image="https://workshop-cards.hackclub.com/Preston-Werner%20Gift%20Announcement.png?fontSize=175px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        bg: 'rgb(104, 41, 205)',
        backgroundImage: theme => theme.util.gx('blue', 'green')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading
          as="h1"
          variant="title"
          sx={{
            fontSize: [5, 6, null, '82px'],
            span: {
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
          Tom and Theresa{' '}
          <span style={{ whiteSpace: 'nowrap' }}>Preston-Werner</span> are
          donating <Amount amount="$500,000" /> to&nbsp;Hack&nbsp;Club
        </Heading>
      </Container>
    </Box>
    <AnnouncementHolder>
      <PillHolder>
        <AuthorPill
          firstName="Christina"
          tag="Christina Asquith, COO"
          image="https://cloud-macp9mbpq.vercel.app/0image.png"
        />
        <AuthorPill
          firstName="Zach"
          tag="Zach Latta, founder"
          image="https://hackclub.com/team/zach.jpg"
        />
        <DatePill tag="Mar 16, 2022" />
      </PillHolder>
      <PrestonWernerCopy />
    </AnnouncementHolder>
    <SlackCTA />
    <Footer />
  </>
)

export default Page
